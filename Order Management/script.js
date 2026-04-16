const API = "http://localhost:3000";

function loadOrders() {
    fetch(`${API}/orders`)
    .then(res => res.json())
    .then(data => {
        let html = "<h2>Order History</h2>";
        data.forEach(order => {
            html += `<p>${order.name} - ₹${order.total_amount} (${order.order_date})</p>`;
        });
        document.getElementById("output").innerHTML = html;
    });
}

function loadHighest() {
    fetch(`${API}/highest`)
    .then(res => res.json())
    .then(data => {
        let html = "<h2>Highest Order</h2>";
        data.forEach(order => {
            html += `<p>Order ID: ${order.order_id} - ₹${order.total_amount}</p>`;
        });
        document.getElementById("output").innerHTML = html;
    });
}

function loadActive() {
    fetch(`${API}/active`)
    .then(res => res.json())
    .then(data => {
        let html = "<h2>Most Active Customer</h2>";
        data.forEach(c => {
            html += `<p>${c.name}</p>`;
        });
        document.getElementById("output").innerHTML = html;
    });
}