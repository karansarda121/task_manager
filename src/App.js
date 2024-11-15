import React, { useState, useEffect } from "react";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskSearch from "./components/TaskSearch";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => setTasks([...tasks, task]);
  const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));
  const toggleCompletion = (id) =>
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );

  return (
    <div className="App">
      <h1>Task Manager</h1>
      <TaskInput addTask={addTask} />
      <TaskSearch setSearch={setSearch} />
      <TaskList
        tasks={tasks}
        search={search}
        deleteTask={deleteTask}
        toggleCompletion={toggleCompletion}
      />
    </div>
  );
}

export default App;
