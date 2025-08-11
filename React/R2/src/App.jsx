import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home.jsx";
import Details from "./pages/[id].jsx";
import CreateTask from "./pages/CreateTask.jsx";
import { useState } from "react";

export default function App() {
  const [task, setTask] = useState([]);

  return (
    <Routes>
      <Route path="/" element={<Home task={task} setTask={setTask} />} />
      <Route path="/:id" element={<Details task={task} />} />
      <Route
        path="/crear"
        element={<CreateTask task={task} setTask={setTask} />}
      />
    </Routes>
  );
}
