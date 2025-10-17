"use client";

import { useState } from "react";
import { Priority } from "@prisma/client";

interface TaskFormProps {
    onSubmit: (task: {
      title: string;
      description: string;
      priority: Priority;
    }) => void;
  }

  export default function TaskForm({ onSubmit }: TaskFormProps ){
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [priority, setPriority] = useState<Priority>("MEDIUM");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) return;

        onSubmit({ title, description, priority });
        setTitle("");
        setDescription("");
        setPriority("MEDIUM");
    };

    return (
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-lg shadow p-6 mb-6"
        >
          <h2 className="text-xl font-bold text-black mb-4">Add New Task</h2>
          <div className="space-y-4">
            <div>
              <label htmlFor="title" className="block text-sm text-black font-medium mb-1">
                Title *
              </label>
              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full border border-gray-300 text-gray-500 rounded px-3 py-2"
                required
              />
            </div>
            <div>
              <label
                htmlFor="description"
                className="block text-sm text-black font-medium mb-1"
              >
                Description
              </label>
              <textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full border border-gray-300 text-gray-500 rounded px-3 py-2"
                rows={3}
              />
            </div>
            <div>
              <label htmlFor="priority" className="block text-sm text-black font-medium mb-1">
                Priority
              </label>
              <select
                id="priority"
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full border border-gray-300 text-gray-500 rounded px-3 py-2"
              >
                <option value="LOW">Low</option>
                <option value="MEDIUM">Medium</option>
                <option value="HIGH">High</option>
              </select>
            </div>
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700 transition"
            >
              Add Task
            </button>
          </div>
        </form>
      );
  }

