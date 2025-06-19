import { useState } from "react";

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, newTask.trim()]);
    setNewTask("");
  };

  const removeTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 via-pink-200 to-red-200 flex flex-col items-center p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Task List</h1>

      <div className="w-full max-w-md bg-white rounded-lg shadow-lg p-6">
        <div className="flex gap-2 mb-4">
          <input
            type="text"
            className="flex-grow border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="New task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
          />
          <button
            onClick={addTask}
            className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-3">
          {tasks.length === 0 && (
            <li className="text-gray-500 italic">No tasks yet</li>
          )}
          {tasks.map((task, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-purple-50 rounded p-3 shadow-sm"
            >
              <span className="text-gray-700">{task}</span>
              <button
                onClick={() => removeTask(i)}
                className="text-red-500 hover:text-red-700 font-bold"
                aria-label={`Remove task ${task}`}
              >
                &times;
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
