import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify"; // Import toast functions
import "react-toastify/dist/ReactToastify.css"; // Import toast styles

function TaskInput({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleAddTask = () => {
    if (!title.trim()) {
      // Show warning if title is missing
      toast.error("Please enter a title for the task!", {
        position: "top-center",
        autoClose: 3000, // Toast disappears after 3 seconds
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    // Add task when title is provided
    addTask({
      id: Date.now(),
      title,
      completed: false,
      priority,
    });

    // Show success toast with task title
    toast.success(`Task "${title}" Added!`, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

    setTitle(""); // Clear the input field after task is added
    setPriority("Low"); // Reset priority to "Low"
  };

  return (
    <div className="mb-4">
      {/* Toast Notifications */}
      <ToastContainer />

      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
        className="w-full p-3 mb-4 border rounded-lg focus:ring focus:ring-purple-300 transition hover:border-purple-400 hover:shadow-lg"
      />
      <div className="flex items-center gap-4">
        <select
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
          className="flex-grow p-3 border rounded-lg focus:ring focus:ring-purple-300 transition hover:border-purple-400"
        >
          <option value="Low">Low Priority</option>
          <option value="Medium">Medium Priority</option>
          <option value="High">High Priority</option>
        </select>
        <button
          onClick={handleAddTask}
          className="p-3 bg-gradient-to-r from-purple-500 to-indigo-500 text-white rounded-lg hover:from-purple-600 hover:to-indigo-600 transition hover:scale-105"
        >
          Add Task
        </button>
      </div>
    </div>
  );
}

export default TaskInput;
