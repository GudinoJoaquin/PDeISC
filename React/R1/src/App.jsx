import "./App.css";
import HolaMundo from "./components/HolaMundo";
import Card from "./components/Card";
import Count from "./components/Count";
import List from "./components/List";
import Form from "./components/Form";
import "https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4";

export default function App() {
  return (
    <main className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-10 text-gray-800">
        Mis Componentes
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-xl shadow-md p-6">
          <HolaMundo />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Form />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Card
            nombre={"Joaquin"}
            apellido={"Gudiño"}
            profesion={"Limpia vidrios"}
            img={"https://placehold.co/600x400"}
          />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6">
          <Count />
        </div>

        <div className="bg-white rounded-xl shadow-md p-6 col-span-1 md:col-span-2">
          <List />
        </div>
      </div>
    </main>
  );
}
