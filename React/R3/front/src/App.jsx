import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Create from "./pages/Create";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/create" element={<Create />} />
    </Routes>
  );
}
