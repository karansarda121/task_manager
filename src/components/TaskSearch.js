// src/components/TaskSearch.js
import React from "react";

function TaskSearch({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search tasks"
      onChange={(e) => setSearch(e.target.value)}
    />
  );
}

export default TaskSearch;
