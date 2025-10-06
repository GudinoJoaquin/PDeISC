import { createConnection } from "mysql2";

export const conn = createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "users",
});
