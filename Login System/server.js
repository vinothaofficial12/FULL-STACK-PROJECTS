const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const db = require("./db");

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.post("/login", (req, res) => {
    const { email, password } = req.body;

    const sql = "SELECT * FROM users WHERE email = ? AND password = ?";

    db.query(sql, [email, password], (err, result) => {
        if (err) {
            return res.json({ message: "Server error" });
        }

        if (result.length > 0) {
            res.json({ message: "Login Successful ✅" });
        } else {
            res.json({ message: "Invalid Credentials ❌" });
        }
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});