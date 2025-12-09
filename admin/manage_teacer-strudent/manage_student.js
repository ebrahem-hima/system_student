const modal = document.getElementById("studentModal");
const addBtn = document.getElementById("addStudentBtn");
const closeSpan = document.getElementsByClassName("close")[0];
const form = document.getElementById("studentForm");
const modalTitle = document.getElementById("modalTitle");
const tableBody = document.getElementById("studentsBody");

let students = [
  {
    id: 6,
    name: "Amr Nabih",
    email: "amrnabih@student.com",
    framework: "طالب فرقة رابعة",
    period: "2021",
    institute: "KMA",
  },
  {
    id: 7,
    name: "Uosif Kalil",
    email: "uosifkalil@student.com",
    framework: "طالب فرقة رابعة",
    period: "2020",
    institute: "KMA",
  },
];

function renderTable() {
  tableBody.innerHTML = "";

  students.forEach((stu) => {
    const row = document.createElement("tr");
    row.id = `student-${stu.id}`;
    row.innerHTML = `
          <td>${stu.id}</td>
          <td>${stu.name}</td>
          <td>${stu.email}</td>
          <td>${stu.framework}</td>
          <td>${stu.period}</td>
          <td>${stu.institute}</td>
          <td class="actions">
            <button class="btn btn-edit btn-sm" onclick="editUser(${stu.id})">تعديل</button>
            <button class="btn btn-delete" onclick="deleteUser(${stu.id})" class="btn btn-delete btn-sm">حذف</button>
          </td>
          `;
    tableBody.appendChild(row);
  });
}
renderTable();

addBtn.addEventListener("click", function () {
  modal.style.display = "block";
  modalTitle.innerText = "إضافة طالب جديد";
  form.reset();
  document.getElementById("studentId").value = "";
});

closeSpan.addEventListener("click", function () {
  modal.style.display = "none";
});

function deleteUser(id) {
  if (confirm("هل أنت متأكد من حذف هذا الطالب؟")) {
    students = students.filter((s) => s.id !== id);
    renderTable();
  }
}

function editUser(id) {
  const studentToEdit = students.find((s) => s.id == id);
  modal.style.display = "block";
  modalTitle.innerText = "تعديل بيانات الطالب";

  document.getElementById("studentId").value = studentToEdit.id;
  document.getElementById("name").value = studentToEdit.name;
  document.getElementById("email").value = studentToEdit.email;
  document.getElementById("framework").value = studentToEdit.framework;
  document.getElementById("period").value = studentToEdit.period;
  document.getElementById("institute").value = studentToEdit.institute;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("studentId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const framework = document.getElementById("framework").value;
  const period = document.getElementById("period").value;
  const institute = document.getElementById("institute").value;

  if (id) {
    let stu = students.find((s) => s.id == id);
    stu.name = name;
    stu.email = email;
    stu.framework = framework;
    stu.period = period;
    stu.institute = institute;
  } else {
    students.push({
      id: Math.floor(Math.random() * 1000) + 30,
      name,
      email,
      framework,
      period,
      institute,
    });
  }

  modal.style.display = "none";
  form.reset();
  renderTable();
});
