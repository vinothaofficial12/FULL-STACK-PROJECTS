const express = require("express");
const cors = require("cors");
const db = require("./db");

const app = express();
app.use(cors());
app.use(express.static("."));

app.get("/students", (req, res) => {
  let { sortBy, department } = req.query;

  let query = "SELECT * FROM students";

  if (department && department !== "All") {
    query += ` WHERE department='${department}'`;
  }

  if (sortBy === "name") query += " ORDER BY name ASC";
  if (sortBy === "dob") query += " ORDER BY dob ASC";

  db.query(query, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.get("/count", (req, res) => {
  const query = `
    SELECT department, COUNT(*) as total
    FROM students
    GROUP BY department
  `;

  db.query(query, (err, result) => {
    if (err) return res.send(err);
    res.json(result);
  });
});

app.listen(8080, () => console.log("Server running on http://localhost:8080"));
