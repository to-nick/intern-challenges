"use client";

import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Task["status"] | "ALL">("ALL");
  const [sortBy, setSortBy] = useState("");

  const { data: session } = useSession();

  const userId = (session?.user as any)?.id;

  console.log("session:", session)

  useEffect(() => {
    fetchTasks();
  }, [userId]);

  const fetchTasks = async () => {
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
  };

  const createTask = async ( taskData: {
    title: string;
    description: string;
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


  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      {session ? (
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8 flex">
        <div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Task Manager
          </h1>
          <p className="text-gray-600">
            Manage your tasks efficiently with status tracking
          </p>
        </div>
        <button onClick={() => signOut()} className="bg-indigo-600 text-white py-2 px-4 ml-auto rounded hover:bg-indigo-700 transition">Logout</button>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TaskForm onSubmit={createTask} />
        </div>

        <div className="md:col-span-2 justify-between">
            <div className="mb-4 flex gap-2">
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
              <div className="self-center ml-auto">
                <select 
                  className="text-black"
                  value={sortBy}
                  onChange={(e)=> setSortBy(e.target.value)}>
                    
                  <option value="">Filter By</option>
                  <option value="priority">Priority</option>
                  <option value="dueDate">Due Date</option>
                </select>
              </div>
            </div> 

          {loading ? (
            <p className="text-center py-8">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No tasks found. Create one to get started!
            </p>
          ) : (
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
          )}
        </div>
      </div>
    </div>) : (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center py-8 text-gray-500">
          Please login to manage your tasks <a href="/api/auth/signin" className="text-indigo-600 hover:text-indigo-800">Login</a>
          <a href="/auth/register" className="text-indigo-600 hover:text-indigo-800">Register</a>
        </p>
      </div>
    )}
  </main>
  )
}
