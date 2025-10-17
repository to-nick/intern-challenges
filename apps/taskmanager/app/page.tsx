"use client";

import { useEffect, useState } from "react";
import { Task } from "@prisma/client";
import TaskCard from "./components/TaskCard";
import TaskForm from "./components/TaskForm";
import { POST } from "./api/tasks/route";

export default function Home() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<Task["status"] | "ALL">("ALL");

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try{
      const response = await fetch("api/tasks");
      const data = await response.json()
      setTasks(data);
    } catch (error){
      console.error("Failed to fetch tasks:", error);
    } finally {
      setLoading(false)
    }
  };

  const createTask = async ( taskData: {
    title: string;
    description: string;
    priority: Task["priority"];
  }) => {
    try{
      const response = await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(taskData),
      })
      const newTask = await response.json();
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


  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
    <div className="container mx-auto px-4 py-8">
      <header className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-2">
          Task Manager
        </h1>
        <p className="text-gray-600">
          Manage your tasks efficiently with status tracking
        </p>
      </header>

      <div className="grid md:grid-cols-3 gap-6">
        <div className="md:col-span-1">
          <TaskForm onSubmit={createTask} />
        </div>

        <div className="md:col-span-2">
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
          </div>

          {loading ? (
            <p className="text-center py-8">Loading tasks...</p>
          ) : filteredTasks.length === 0 ? (
            <p className="text-center py-8 text-gray-500">
              No tasks found. Create one to get started!
            </p>
          ) : (
            <div className="space-y-4">
              {filteredTasks.map((task) => (
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
    </div>
  </main>
  )
}
