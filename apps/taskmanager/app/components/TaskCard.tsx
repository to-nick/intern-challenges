"use client";

import { Task } from '@prisma/client';

interface TaskCardProps {
    task: Task;
    onUpdate: (id: string, status: Task["status"]) => void;
    onDelete: (id: string) => void;
  }

  const statusColors = {
    TODO: "bg-gray-100 text-gray-800",
    IN_PROGRESS: "bg-blue-100 text-blue-800",
    DONE: "bg-green-100 text-green-800",
  };
  
  const priorityColors = {
    LOW: "border-l-green-500",
    MEDIUM: "border-l-yellow-500",
    HIGH: "border-l-red-500",
  };

  export default function TaskCard({ task, onUpdate, onDelete }: TaskCardProps){
    return(
        <div
        className={`bg-white rounded-lg shadow p-4 border-l-4 ${priorityColors[task.priority]}`}>
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold text-lg text-gray-500">{task.title}</h3>
            <p className='text-md text-black'>{task.dueDate ? new Date(task.dueDate).toLocaleString() : "No due date"}</p>
            <span
              className={`px-2 py-1 rounded text-xs font-medium ${statusColors[task.status]}`}
            >
              {task.status.replace("_", " ")}
            </span>
          </div>
          {task.description && (
          <p className="text-gray-600 text-sm mb-3">{task.description}</p>
          )}
          <div className="flex justify-between items-center">
            <select
              value={task.status}
              onChange={(e) => onUpdate(task.id, e.target.value as Task["status"])}
              className="text-sm border border-gray-300 text-gray-500 rounded px-2 py-1">
                <option value="TODO">To Do</option>
                <option value="IN_PROGRESS">In Progress</option>
                <option value="DONE">Done</option>
            </select>
            <button
              onClick={() => onDelete(task.id)}
              className="text-red-600 hover:text-red-800 text-sm font-medium">
              Delete
            </button>
        </div>
      </div>
    )
  }