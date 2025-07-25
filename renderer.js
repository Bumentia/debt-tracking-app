function saveData() {
  const name = document.getElementById("name").value.trim();
  const plate = document.getElementById("plate").value.trim();
  const status = document.getElementById("status").value;
  const note = document.getElementById("note").value.trim();

  if (!name || !plate) {
    alert("⚠️ กรุณากรอกชื่อและทะเบียนรถให้ครบถ้วน");
    return;
  }

  const entry = {
    name,
    plate,
    status,
    note,
    time: new Date().toLocaleString()
  };

  let old = JSON.parse(localStorage.getItem("trackings") || "[]");
  old.push(entry);
  localStorage.setItem("trackings", JSON.stringify(old));

  alert("✅ บันทึกเรียบร้อยแล้ว!");

  // ล้างช่องกรอก
  document.getElementById("name").value = "";
  document.getElementById("plate").value = "";
  document.getElementById("status").value = "ติดตามสำเร็จ";
  document.getElementById("note").value = "";

  loadData(); // โหลดใหม่หลังบันทึก
}

function deleteData(index) {
  let data = JSON.parse(localStorage.getItem("trackings") || "[]");
  if (confirm("คุณต้องการลบรายการนี้หรือไม่?")) {
    data.splice(index, 1);
    localStorage.setItem("trackings", JSON.stringify(data));
    loadData();
  }
}

function renderTable(data) {
  const table = document.querySelector("#dataTable tbody");
  table.innerHTML = "";

  data.forEach((entry, index) => {
    const row = document.createElement("tr");

    row.innerHTML = `
      <td>${entry.time}</td>
      <td>${entry.name}</td>
      <td>${entry.plate}</td>
      <td>${entry.status}</td>
      <td>${entry.note}</td>
      <td><button onclick="deleteData(${index})">❌</button></td>
    `;

    table.appendChild(row);
  });
}

function loadData() {
  const data = JSON.parse(localStorage.getItem("trackings") || "[]");
  renderTable(data);
}

function filterData() {
  const keyword = document.getElementById("search").value.toLowerCase();
  const allData = JSON.parse(localStorage.getItem("trackings") || "[]");

  const filtered = allData.filter(entry =>
    entry.name.toLowerCase().includes(keyword) ||
    entry.plate.toLowerCase().includes(keyword)
  );

  renderTable(filtered);
}

window.onload = loadData;
