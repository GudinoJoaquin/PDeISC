export default function Modal({ handleClick, setModal }) {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black/40 bg-opacity-40 z-50">
      <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-sm">
        <h1 className="text-lg font-semibold mb-6 text-gray-800">
          ¿Estás seguro de que quieres eliminar?
        </h1>
        <div className="flex justify-end gap-4">
          <button
            className="px-4 py-2 rounded bg-red-500 text-white hover:bg-red-700 transition"
            onClick={() => setModal(false)}
          >
            Cancelar
          </button>
          <button
            className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700 transition"
            onClick={handleClick}
          >
            Confirmar
          </button>
        </div>
      </div>
    </div>
  );
}
