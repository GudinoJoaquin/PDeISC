export default function Card({ nombre, apellido, img, profesion }) {
  return (
    <main>
      <div>
        <img src={img} alt="Imagen de perfil" />
      </div>
      <h1>
        Hola, soy {nombre}, {apellido}
      </h1>
      <p>Y mi profesión es: {profesion}</p>
    </main>
  );
}
