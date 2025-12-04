"use client";

import { useEffect, useState, useCallback } from "react";
import { Task } from "@prisma/client";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import { signOut } from "next-auth/react";
import useRequireAuth from "./hooks/useRequireAuth";
import { Category } from "@prisma/client";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core';
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
} from '@dnd-kit/sortable';
import Link from 'next/link';

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Task["status"] | "ALL">("ALL");
  const [sortBy, setSortBy] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category[]>(["WORK", "PERSONAL", "LEARNING", "HOME", "HEALTH", "FINANCE", "TRAVEL", "ENTERTAINMENT", "SOCIAL", "OTHER"]);
  const { session, showExpiredMessage } = useRequireAuth();

  const userId = (session?.user as { id?: string })?.id;

  console.log("session:", session)

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const fetchTasks = useCallback(async () => {
    try{
      const response = await fetch(`api/tasks?userId=${userId}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();

      if (data.error) {
        console.error("API Error:", data.error);
        setTasks([]);
        return;
      }
      setTasks(data);
    } catch (error){
      console.error("Failed to fetch tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false)
    }
  }, [userId]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;

    
    if (over && active.id !== over.id) {
      const oldIndex = tasksToSort.findIndex((task) => task.id === active.id);
      const newIndex = tasksToSort.findIndex((task) => task.id === over.id);

      const newTasks = arrayMove(tasksToSort, oldIndex, newIndex);

      setTasks(newTasks);

      try {
        const taskIds = newTasks.map((task) => task.id);
        const response = await fetch("/api/tasks/reorder", {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ taskIds }),
        });

        if (!response.ok) {
          throw new Error("Failed to reorder tasks");
        }
      } catch (error) {
        console.error("Failed to reorder tasks:", error);
        fetchTasks();
      }
    }
  };

  const createTask = async ( taskData: {
    title: string;
    description: string;
    category: string | null;
    priority: Task["priority"];
    dueDate: string | null;
  }) => {
    const taskDataWithUserId = { ...taskData, userId };
    try{
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskDataWithUserId),
      })
      const newTask = await response.json();
      console.log("new task:", newTask)
      setTasks([newTask, ...tasks])
    } catch (error) {
      console.error("Failed to create task:", error);
    }
  }

  const updateTask = async (id: string, status: Task["status"]) => {
    try{
      const response = await fetch(`/api/tasks/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status })
      });
      const updatedTask = await response.json();
      setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  const deleteTask = async (id: string) => {
    try{
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Failed to delete task:", error);
    }
  }

  const filteredTasks =
    filter === "ALL" ? tasks : tasks.filter((t) => t.status === filter);

  let tasksToSort = [...filteredTasks];

  console.log("tasks to sort:", tasks)

  if (sortBy === "priority"){
    const priorityOrder = { HIGH: 1, MEDIUM: 2, LOW: 3 };
    tasksToSort.sort((a,b) => priorityOrder[a.priority] - priorityOrder[b.priority])
  }
  
  if (sortBy === "dueDate"){
    tasksToSort.sort((a,b) => {
      if(!a.dueDate) return 1;
      if(!b.dueDate) return -1;
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    })
  }

  if (sortBy === "category"){
    tasksToSort = tasksToSort.filter((task) => selectedCategory.includes(task.category));
  }

  if (showExpiredMessage){
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-lg text-gray-600 mb-2">
            Your session has expired. Redirecting to login...
          </p>
        </div>
      </div>
    );
  }


  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {session ? (
      <div className="container mx-auto px-4 py-8 max-w-full">
        <div className="flex flex-row gap-4 ml-auto justify-end mb-4">
          <Link href="/stats" className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">Stats</Link>
          <button onClick={() => signOut( {callbackUrl: "/auth/login" })} className="bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 transition">Logout</button>
        </div>
        <header className="mb-8 w-full">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 mb-2">
              Task Manager
            </h1>
            <p className="text-gray-600">
              Manage your tasks efficiently with status tracking
            </p>
          </div>
        </header>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="md:col-span-1 min-w-0">
            <TaskForm onSubmit={createTask} />
          </div>

        <div className="md:col-span-2 justify-between min-w-0">
            <div className="flex flex-col mb-4 md:flex-row flex-wrap gap-2 w-full max-w-full min-w-0">
              {(["ALL", "TODO", "IN_PROGRESS", "DONE"] as const).map(
                (status) => (
                  <button
                    key={status}
                    onClick={() => setFilter(status)}
                    className={`px-4 py-2 rounded transition ${
                      filter === status
                        ? "bg-indigo-600 text-white"
                        : "bg-white text-gray-700 hover:bg-gray-50"
                    }`}
                  >
                    {status.replace("_", " ")}
                  </button>
                )
              )}
              <div className="self-center ml-auto ">
                <select 
                  className="text-black"
                  value={sortBy}
                  onChange={(e)=> setSortBy(e.target.value)}>
                    
                  <option value="">Filter By</option>
                  <option value="priority">Priority</option>
                  <option value="dueDate">Due Date</option>
                  <option value="category">Category</option>
                </select>
              </div>
              {sortBy === "category" ? 
                <div className="flex flex-col gap-4 items-center text-black md:flex-row">
                {["WORK", "PERSONAL", "LEARNING", "HOME", "HEALTH", "FINANCE", "TRAVEL", "ENTERTAINMENT", "SOCIAL", "OTHER"].map((cat) => (
                  <label key={cat} className="flex items-center gap-1 text-sm">
                    <input
                      type="checkbox"
                      className="rounded"
                      checked={selectedCategory.includes(cat as Category)}
                      onChange={(e) => {
                        if (e.target.checked){
                          setSelectedCategory([...selectedCategory, cat as Category]);
                        } else {
                          setSelectedCategory(selectedCategory.filter((c) => c !== cat as Category));
                        }
                      }}
                    />
                    {cat}
                  </label>
                ))}
              </div>
                : null}
            </div> 

          {loading ? (
            <p className="text-center py-8">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No tasks found. Create one to get started!
            </p>
          ) : ( 
          <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={tasksToSort.map((task) => task.id)}
            strategy={verticalListSortingStrategy}
          >
            <div className="space-y-4">
              {tasksToSort.map((task) => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onUpdate={updateTask}
                  onDelete={deleteTask}
                />
              ))}
            </div>
          </SortableContext>
        </DndContext>
        )}
    </div>
  </div>
</div>) : (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center py-8 text-gray-500">
          Please <a href="/auth/login" className="text-indigo-600 hover:text-indigo-800">Login</a> or <a href="/auth/register" className="text-indigo-600 hover:text-indigo-800">Register</a> to manage your tasks 
        </p>
      </div>
    )}
  </main>
  )
}
