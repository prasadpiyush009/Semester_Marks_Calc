const subjects = [
  { name: "OJT", paperOut: 30, vivaOut: 20 },
  { name: "Fundamental of Business", paperOut: 50, vivaOut: 0 },
  { name: "Mathematics", paperOut: 50, vivaOut: 0 },
  { name: "Programming", paperOut: 25, vivaOut: 25 },
  { name: "COA", paperOut: 25, vivaOut: 25 },
  { name: "English", paperOut: 25, vivaOut: 25 }
];

const marksBody = document.getElementById("marksBody");

function loadSubjects() {
  marksBody.innerHTML = "";
  subjects.forEach((sub, index) => {
    const totalOut = sub.paperOut + sub.vivaOut;

    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${sub.name}</td>
      <td>
        <input type="number" min="0" max="${sub.paperOut}" id="paper${index}" placeholder="0-${sub.paperOut}">
      </td>
      <td>
        <input type="number" min="0" max="${sub.vivaOut}" id="viva${index}" placeholder="0-${sub.vivaOut}">
      </td>
      <td>${totalOut}</td>
    `;
    marksBody.appendChild(row);
  });
}

function getGrade(percent) {
  if (percent >= 90) return "A+";
  if (percent >= 80) return "A";
  if (percent >= 70) return "B+";
  if (percent >= 60) return "B";
  if (percent >= 50) return "C";
  if (percent >= 40) return "D";
  return "F";
}

function getSGPA(percent) {
  if (percent >= 90) return 10;
  if (percent >= 80) return 9;
  if (percent >= 70) return 8;
  if (percent >= 60) return 7;
  if (percent >= 50) return 6;
  if (percent >= 40) return 5;
  return 0;
}

function calculateResult() {
  const name = document.getElementById("name").value.trim();
  const roll = document.getElementById("roll").value.trim();

  let totalMarks = 0;
  let totalOutOf = 0;
  let pass = true;

  subjects.forEach((sub, index) => {
    const paper = Number(document.getElementById(`paper${index}`).value || 0);
    const viva = Number(document.getElementById(`viva${index}`).value || 0);

    if (paper > sub.paperOut || viva > sub.vivaOut || paper < 0 || viva < 0) {
      pass = false;
    }

    totalMarks += (paper + viva);
    totalOutOf += (sub.paperOut + sub.vivaOut);

    const subTotal = paper + viva;
    const subPercent = (subTotal / (sub.paperOut + sub.vivaOut)) * 100;
    if (subPercent < 40) pass = false;
  });

  if (!name || !roll) {
    alert("Please enter Student Name and Roll No!");
    return;
  }

  const percent = (totalMarks / totalOutOf) * 100;
  const grade = getGrade(percent);
  const sgpa = getSGPA(percent);

  document.getElementById("rName").innerText = name;
  document.getElementById("rRoll").innerText = roll;
  document.getElementById("totalMarks").innerText = `${totalMarks} / ${totalOutOf}`;
  document.getElementById("percentage").innerText = `${percent.toFixed(2)}%`;
  document.getElementById("grade").innerText = grade;
  document.getElementById("sgpa").innerText = `${sgpa} / 10`;

  const statusEl = document.getElementById("status");
  statusEl.innerText = pass ? "PASS ✅" : "FAIL ❌";
  statusEl.style.color = pass ? "green" : "red";

  document.getElementById("resultCard").style.display = "block";
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

function resetForm() {
  document.getElementById("name").value = "";
  document.getElementById("roll").value = "";
  loadSubjects();
  document.getElementById("resultCard").style.display = "none";
}

loadSubjects();
