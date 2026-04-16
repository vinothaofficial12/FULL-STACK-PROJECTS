let chart;

/* Load students */
async function loadStudents() {
  const sort = document.getElementById("sort").value;
  const dept = document.getElementById("department").value;

  const res = await fetch(
    `http://localhost:8080/students?sortBy=${sort}&department=${dept}`
  );
  const data = await res.json();

  const table = document.getElementById("tableBody");
  table.innerHTML = "";

  data.forEach(s => {
    table.innerHTML += `
      <tr>
        <td>${s.id}</td>
        <td>${s.name}</td>
        <td>${s.department}</td>
        <td>${s.dob}</td>
      </tr>
    `;
  });
}

/* Load chart */
async function loadChart() {
  const res = await fetch("http://localhost:8080/count");
  const data = await res.json();

  const labels = data.map(d => d.department);
  const values = data.map(d => d.total);

  const ctx = document.getElementById("myChart").getContext("2d");

  if (chart) chart.destroy(); // refresh chart

  chart = new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [{
        label: "Students Count",
        data: values,
        backgroundColor: ["red", "blue", "green"]
      }]
    }
  });
}

/* Initial Load */
loadStudents();
loadChart();