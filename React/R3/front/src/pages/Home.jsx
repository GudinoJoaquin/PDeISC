import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Modal from "../components/Modal";
import { FaTrash, FaEdit } from "react-icons/fa";

export default function Home() {
  const [usuarios, setUsuarios] = useState();
  const [search, setSearch] = useState("");
  const [modal, setModal] = useState({ view: false, dni: null });

  const fetchUsers = async () => {
    try {
      const res = await fetch("http://localhost:3000/users");
      const data = await res.json();
      setUsuarios(data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (dni) => {
    try {
      const res = await fetch(`http://localhost:3000/users/${dni}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      console.log(data.data);
      fetchUsers();
      setModal(false);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSearchDNI = (e) => {
    setSearch(e.target.value);
  };

  const filteredUsuarios = usuarios?.filter(
    (u) =>
      `${u.dni}`.includes(search) ||
      u.nombre.includes(search) ||
      u.apellido.includes(search) ||
      u.email.includes(search) ||
      u.direccion.includes(search)
  );

  return (
    <div className="overflow-x-auto p-4">
      <Link
        to={"/create"}
        className="font-semibold text-white bg-blue-500 px-4 py-1 rounded-md mb-8"
      >
        Crear usuario
      </Link>
      <input
        type="text"
        onChange={handleSearchDNI}
        value={search}
        placeholder="Buscar"
        className="ml-4 px-2 py-1 border rounded"
      />
      <div className="w-full overflow-x-auto mt-4">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md text-sm md:text-base">
          <thead>
            <tr>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100">
                DNI
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100">
                Nombre
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100">
                Apellido
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100 hidden md:table-cell">
                Email
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100 hidden lg:table-cell">
                Dirección
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100 hidden lg:table-cell">
                Teléfono
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100 hidden xl:table-cell">
                Celular
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-left bg-gray-100 hidden xl:table-cell">
                Fecha de Nacimiento
              </th>
              <th className="px-2 md:px-4 py-2 border-b text-cebter bg-gray-100">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredUsuarios?.map((user) => (
              <tr key={user.dni} className="hover:bg-gray-50 border-b">
                <td className="px-2 md:px-4 py-2">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.dni}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.nombre}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.apellido}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 hidden md:table-cell">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.email}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 hidden lg:table-cell">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.direccion}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 hidden lg:table-cell">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.telefono}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 hidden xl:table-cell">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.celular}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 hidden xl:table-cell">
                  <Link to={`/${user.dni}`} className="block w-full h-full">
                    {user.fecha_de_nacimiento}
                  </Link>
                </td>
                <td className="px-2 md:px-4 py-2 flex gap-2 items-center justify-center">
                  <button
                    onClick={() => setModal({ view: true, dni: user.dni })}
                    className="text-white bg-red-500 p-2 rounded-md hover:bg-red-600"
                    title="Borrar"
                  >
                    <FaTrash />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {modal.view && (
        <Modal
          handleClick={() => handleDelete(modal.dni)}
          setModal={setModal}
        />
      )}
    </div>
  );
}
