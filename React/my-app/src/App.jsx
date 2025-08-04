import "./App.css";
import HolaMundo from "./components/HolaMundo";
import Card from "./components/Card";
import Count from "./components/Count";
import List from "./components/List";
import Form from "./components/Form";

export default function App() {
  return (
    <main>
      <HolaMundo />
      <hr />
      <Form />
      <hr />
      <Card
        nombre={"Joaquin"}
        apellido={"Gudiño"}
        profesion={"Limpia vidrios"}
        img={"https://placehold.co/600x400"}
      />
      <hr />
      <Count />
      <hr />
      <List />
    </main>
  );
}
