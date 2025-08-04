import { useState } from "react";
import "../styles/count.css";

export default function Count() {
  const [count, setCount] = useState(0);

  return (
    <main className="main">
      <button className="btns" onClick={() => setCount(count + 1)}>
        {"+"}
      </button>
      <p className="contador">{count}</p>
      <button className="btns" onClick={() => setCount(count - 1)}>
        {"-"}
      </button>
    </main>
  );
}
