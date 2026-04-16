
document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    let valid = true;

    // Email validation
    if (email === "") {
        document.getElementById("emailError").innerText = "Email required";
        valid = false;
    } else {
        document.getElementById("emailError").innerText = "";
    }

    // Password validation
    if (password.length < 6) {
        document.getElementById("passwordError").innerText = "Min 6 characters";
        valid = false;
    } else {
        document.getElementById("passwordError").innerText = "";
    }

    if (!valid) return;

    // Send data to backend
    const res = await fetch("http://localhost:3000/login", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ email, password })
    });

    const data = await res.json();

    document.getElementById("message").innerText = data.message;
});