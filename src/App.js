// import React, { useState, useEffect } from "react";
// import { motion } from "framer-motion";
// import TaskInput from "./components/TaskInput";
// import TaskList from "./components/TaskList";

// function App() {
//   const [tasks, setTasks] = useState(() => {
//     const storedTasks = localStorage.getItem("tasks");
//     return storedTasks ? JSON.parse(storedTasks) : [];
//   });
//   const [searchQuery, setSearchQuery] = useState("");
//   const [sortCriteria, setSortCriteria] = useState("Priority");

//   // Save tasks to localStorage
//   useEffect(() => {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }, [tasks]);

//   const addTask = (task) => setTasks([...tasks, task]);

//   const deleteTask = (id) => setTasks(tasks.filter((task) => task.id !== id));

//   const toggleCompletion = (id) =>
//     setTasks(
//       tasks.map((task) =>
//         task.id === id ? { ...task, completed: !task.completed } : task
//       )
//     );

//   const filteredTasks = tasks.filter((task) =>
//     task.title.toLowerCase().includes(searchQuery.toLowerCase())
//   );

//   const sortedTasks = [...filteredTasks].sort((a, b) => {
//     if (sortCriteria === "Completion") {
//       return a.completed - b.completed; // Uncompleted tasks first
//     } else if (sortCriteria === "Priority") {
//       const priorityOrder = { High: 1, Medium: 2, Low: 3 };
//       return priorityOrder[a.priority] - priorityOrder[b.priority];
//     } else if (sortCriteria === "Title") {
//       return a.title.localeCompare(b.title);
//     }
//     return 0;
//   });

//   return (
//     <motion.div
//       initial={{ opacity: 0 }}
//       animate={{ opacity: 1 }}
//       className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 p-6 flex flex-col items-center"
//     >
//       <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
//         <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
//           Task Manager
//         </h1>
//         <TaskInput addTask={addTask} />
//         <div className="mb-4 flex items-center gap-4">
//           <input
//             type="text"
//             placeholder="Search tasks..."
//             value={searchQuery}
//             onChange={(e) => setSearchQuery(e.target.value)}
//             className="flex-grow p-3 border rounded-lg focus:ring focus:ring-purple-300 transition hover:border-purple-400 hover:shadow-lg"
//           />
//           <select
//             value={sortCriteria}
//             onChange={(e) => setSortCriteria(e.target.value)}
//             className="p-3 border rounded-lg focus:ring focus:ring-purple-300 transition hover:border-purple-400"
//           >
//             <option value="Priority">Sort by Priority</option>
//             <option value="Completion">Sort by Completion</option>
//             <option value="Title">Sort by Title</option>
//           </select>
//         </div>
//         <TaskList
//           tasks={sortedTasks}
//           deleteTask={deleteTask}
//           toggleCompletion={toggleCompletion}
//         />
//         {filteredTasks.length === 0 && (
//           <p className="text-center text-gray-500 mt-4">No tasks found!</p>
//         )}
//       </div>
//     </motion.div>
//   );
// }

// export default App;


import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState(() => {
    const storedTasks = localStorage.getItem("tasks");
    return storedTasks ? JSON.parse(storedTasks) : [];
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [sortCriteria, setSortCriteria] = useState("Priority");

  // Save tasks to localStorage
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

  const filteredTasks = tasks.filter((task) =>
    task.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTasks = [...filteredTasks].sort((a, b) => {
    if (sortCriteria === "Completion") {
      // Completed tasks first, uncompleted tasks last
      return b.completed - a.completed; // Completed tasks (true) come first
    } else if (sortCriteria === "Priority") {
      const priorityOrder = { High: 1, Medium: 2, Low: 3 };
      return priorityOrder[a.priority] - priorityOrder[b.priority];
    } else if (sortCriteria === "Title") {
      return a.title.localeCompare(b.title);
    }
    return 0;
  });

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="min-h-screen bg-gradient-to-r from-indigo-100 via-purple-50 to-pink-100 p-6 flex flex-col items-center"
    >
      <div className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-gray-800 text-center mb-6">
          Task Manager
        </h1>
        <TaskInput addTask={addTask} />
        <div className="mb-4 flex items-center gap-4">
          <input
            type="text"
            placeholder="Search tasks..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-grow p-3 border rounded-lg focus:ring focus:ring-purple-300 transition hover:border-purple-400 hover:shadow-lg"
          />
          <select
            value={sortCriteria}
            onChange={(e) => setSortCriteria(e.target.value)}
            className="p-3 border rounded-lg focus:ring focus:ring-purple-300 transition hover:border-purple-400"
          >
            <option value="Priority">Sort by Priority</option>
            <option value="Completion">Sort by Completion</option>
            <option value="Title">Sort by Title</option>
          </select>
        </div>
        <TaskList
          tasks={sortedTasks}
          deleteTask={deleteTask}
          toggleCompletion={toggleCompletion}
        />
        {filteredTasks.length === 0 && (
          <p className="text-center text-gray-500 mt-4">No tasks found!</p>
        )}
      </div>
    </motion.div>
  );
}

export default App;
