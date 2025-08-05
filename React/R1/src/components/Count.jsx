import { useState } from "react";

export default function Count() {
  const [count, setCount] = useState(0);

  return (
    <main className="flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white shadow-lg rounded-xl p-8 flex items-center space-x-6">
        <button
          onClick={() => setCount(count - 1)}
          className="w-8 h-8 flex items-center justify-center bg-red-500 text-white text-2xl font-bold rounded-full hover:bg-red-600 transition"
        >
          -
        </button>
        <p className="text-3xl font-semibold text-gray-800 min-w-[40px] text-center">{count}</p>
        <button
          onClick={() => setCount(count + 1)}
          className="w-8 h-8 flex items-center justify-center bg-green-500 text-white text-2xl font-bold rounded-full hover:bg-green-600 transition"
        >
          +
        </button>
      </div>
    </main>
  );
}
