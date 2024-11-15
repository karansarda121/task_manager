import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

function TaskList({ tasks, deleteTask, toggleCompletion }) {
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  const priorityColors = {
    Low: "bg-green-100 text-green-700",
    Medium: "bg-yellow-100 text-yellow-700",
    High: "bg-red-100 text-red-700",
  };

  const [scrollY, setScrollY] = useState(0);

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTask(taskToDelete);
    setTaskToDelete(null);
    setShowModal(false);
  };

  // Scroll effect logic
  const getScrollEffect = (index) => {
    return {
      opacity: 1,
      y: 0,
      transition: { delay: index * 0.1, duration: 0.6 },
    };
  };

  return (
    <div>
      {/* Vertical Scrollable Task List */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col gap-4 overflow-y-auto max-h-[80vh] p-4"
      >
        {tasks.length > 0 ? (
          tasks.map((task, index) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: 100 }}
              animate={getScrollEffect(index)} // Apply scroll effect
              exit={{ opacity: 0, y: -100 }}
              className="flex flex-col p-4 border rounded-lg bg-gray-50 shadow hover:shadow-lg hover:scale-105 transition-transform w-full"
            >
              <div className="flex justify-between items-center">
                <span className="text-gray-700 font-bold">{index + 1}.</span>
                <input
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => toggleCompletion(task.id)}
                  className="w-5 h-5 text-purple-500 focus:ring focus:ring-purple-300"
                />
              </div>
              <div className="mt-2">
                <span
                  className={`font-medium ${
                    task.completed ? "line-through text-gray-500" : ""
                  }`}
                >
                  {task.title}
                </span>
                <span
                  className={`mt-2 ml-2 text-xs inline-block px-2 py-1 rounded ${
                    priorityColors[task.priority]
                  }`}
                >
                  {task.priority} Priority
                </span>
                {task.completed && (
                  <span className="text-sm text-green-600 font-semibold mt-1 block">
                    Completed
                  </span>
                )}
              </div>
              <motion.button
                onClick={() => handleDelete(task.id)}
                className="mt-4 bg-red-500 text-white rounded px-3 py-2 hover:bg-red-600 transition hover:scale-105"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                Delete
              </motion.button>
            </motion.div>
          ))
        ) : (
          <p className="text-center text-gray-500">No tasks to display!</p>
        )}
      </motion.div>

      {/* Modal with Animation */}
      {showModal && (
        <motion.div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this task?
            </h3>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setShowModal(false)}
                className="bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
              >
                Confirm
              </button>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

export default TaskList;
