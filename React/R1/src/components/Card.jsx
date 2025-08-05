export default function Card({ nombre, apellido, img, profesion }) {
  return (
    <main className="flex justify-center">
      <div className="bg-white rounded-2xl shadow-lg p-6 w-full max-w-sm text-center">
        <div className="w-32 h-32 mx-auto overflow-hidden rounded-full border-4 border-indigo-500 shadow-md">
          <img src={img} alt="Imagen de perfil" className="w-full h-full object-cover" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-gray-800">
          Hola, soy {nombre} {apellido}
        </h1>
        <p className="mt-2 text-gray-600">Y mi profesión es: <span className="font-medium text-indigo-600">{profesion}</span></p>
      </div>
    </main>
  );
}
