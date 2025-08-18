import { useState, useEffect } from "react";

export default function Home() {
  const [usuarios, setUsuarios] = useState();

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      console.log(data.data);
      setUsuarios(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  return (
    <div>
      {usuarios?.map((user) => (
        <div key={user.dni}>{user.nombre}</div>
      ))}
    </div>
  );
}
