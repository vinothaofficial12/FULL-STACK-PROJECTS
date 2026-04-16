const express = require("express");
const mysql = require("mysql");
const cors = require("cors");

const app = express();
app.use(cors());

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "your_password",
    database: "order_management"
});

db.connect(err => {
    if (err) throw err;
    console.log("MySQL Connected");
});

// Get Order History
app.get("/orders", (req, res) => {
    const sql = `
        SELECT c.name, o.order_id, o.order_date, o.total_amount
        FROM customers c
        JOIN orders o ON c.customer_id = o.customer_id
        ORDER BY o.order_date DESC
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Highest Order
app.get("/highest", (req, res) => {
    const sql = `
        SELECT * FROM orders
        WHERE total_amount = (SELECT MAX(total_amount) FROM orders)
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

// Most Active Customer
app.get("/active", (req, res) => {
    const sql = `
        SELECT name FROM customers
        WHERE customer_id = (
            SELECT customer_id FROM orders
            GROUP BY customer_id
            ORDER BY COUNT(*) DESC
            LIMIT 1
        )
    `;
    db.query(sql, (err, result) => {
        if (err) throw err;
        res.json(result);
    });
});

app.listen(3000, () => {
    console.log("Server running on port 3000");
});