import React from "react";

function TaskSearch({ setSearch }) {
  return (
    <input
      type="text"
      placeholder="Search tasks"
      onChange={(e) => setSearch(e.target.value)}
      className="w-full p-2 mb-4 border rounded focus:ring focus:ring-blue-300"
    />
  );
}

export default TaskSearch;
