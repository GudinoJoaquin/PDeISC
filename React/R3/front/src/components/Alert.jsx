import { useEffect, useState } from "react";

export default function Alert({ msg, type = "success", setVisible }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(true); // Trigger entry animation
    const timer = setTimeout(() => {
      setShow(false); // Trigger exit animation
      setTimeout(() => setVisible(false), 300); // Wait for exit animation to finish
    }, 2000);
    return () => clearTimeout(timer);
  }, [setVisible, setShow]);

  return (
    <div
      className={`
        fixed top-6 left-1/2 transform -translate-x-1/2 z-50
        px-6 py-3 rounded shadow-lg flex items-center gap-2
        transition-all duration-300
        ${show ? "opacity-100 scale-100" : "opacity-0 scale-95 pointer-events-none"}
        ${type === "success" ? "bg-green-500" : "bg-red-500"}
      `}
      style={{ minWidth: 300, maxWidth: 400 }}
    >
      <h1 className="font-bold text-white text-center w-full">{msg}</h1>
    </div>
  );
}
