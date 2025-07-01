async function fetchUsers(endpoint, callback) {
  try {
    const response = await fetch(endpoint);
    const data = await response.json();
    callback(data, response);
  } catch (err) {
    console.error(`Error fetching data: ${err}`);
  }
}

async function createUser(endpoint, user, callback) {
  try {
    const response = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    callback(data, response);
  } catch (err) {
    console.error(`Error creating user: ${err}`);
  }
}

fetchUsers("https://jsonplaceholder.typicode.com/users", (data, response) => {
  const table = data.map((user) => ({
    Name: user.name,
    Email: user.email,
  }));

  console.table(table);
});

const user = {
  name: "Felipe Coltrinari",
  email: "epilson@gmail.com",
};

createUser(
  "https://jsonplaceholder.typicode.com/users",
  user,
  (data, response) => {
    console.log(data);
  }
);
