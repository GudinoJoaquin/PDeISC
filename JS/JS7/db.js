import { conn } from "./connection.js";

export function getUsers(req, res) {
  try {
    const SQL = "SELECT * FROM score;";
    conn.query(SQL, (err, results) => {
      if (err) return res.status(500).json({ error: err });
      res.status(200).json({ message: "Data from database", data: results });
    });
  } catch (error) {
    res.status(500).json({ message: "Error with server", error });
  }
}

export function searchUser(req, res) {
  const { id } = req.params;
  try {
    const sql = "SELECT * FROM score WHERE id = ?;";
    conn.query(sql, [id], (error, result) => {
      if (error)
        return res.status(500).json({ message: `Error finding user`, error });
      if (!result) return res.status(404).json({ message: "User not found" });
      res.status(200).json({ message: "User found", user: result });
    });
  } catch (error) {
    res.status(500).json({ message: "Error finding user", error });
  }
}

export async function saveUserData(req, res) {
  const { tiempo, puntos, nombre } = req.body;
  try {
    const sql = "INSERT INTO score (tiempo, puntos, nombre) VALUES (?, ?, ?);";
    conn.query(sql, [tiempo, puntos, nombre], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error saving in database", error });
      }

      res.status(200).json({ message: "Data from database", data: results });
    });
  } catch (error) {
    res.status(500).json({ message: "Error with server", error });
  }
}

export function deleteFromDatabase(req, res) {
  const { id } = req.params;
  try {
    const sql = "DELETE FROM score WHERE id = ?";
    conn.query(sql, [id], (error, results) => {
      if (error) {
        return res
          .status(500)
          .json({ message: "Error deleting from database", error });
      }

      if (!results) return res.status(404).json({ message: "User not found" });

      res
        .status(200)
        .json({ message: "Deleted from database succesfully", data: results });
    });
  } catch (error) {
    res.status(500).json({ message: "Error with server", error });
  }
}

export function updateUser(req, res) {
  const { id } = req.params;
  const { tiempo, puntos } = req.body;
  try {
    const sql = "UPDATE score SET tiempo = ?, puntos = ? WHERE id = ?;";
    conn.query(sql, [tiempo, puntos, id], (error, result) => {
      
    })
  } catch (error) {
    res.status(500).json({ message: "Error updating user", error });
  }
}
