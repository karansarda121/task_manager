// src/components/TaskInput.js
import React, { useState } from "react";

function TaskInput({ addTask }) {
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("Low");

  const handleAddTask = () => {
    if (!title.trim()) return;
    addTask({
      id: Date.now(),
      title,
      completed: false,
      priority,
    });
    setTitle("");
    setPriority("Low");
  };

  return (
    <div>
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter task title"
      />
      <select value={priority} onChange={(e) => setPriority(e.target.value)}>
        <option value="Low">Low</option>
        <option value="Medium">Medium</option>
        <option value="High">High</option>
      </select>
      <button onClick={handleAddTask}>Add Task</button>
    </div>
  );
}

export default TaskInput;
