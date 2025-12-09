const modal = document.getElementById("teacherModal");
const addBtn = document.getElementById("addTeacherBtn");
const closeSpan = document.getElementsByClassName("close")[0];
const form = document.getElementById("teacherForm");
const modalTitle = document.getElementById("modalTitle");
const tableBody = document.getElementById("teachersBody"); // تم

let teachers = [
  {
    id: 1,
    name: "Dr. Ahmed Elsayed",
    email: "ahmed.e@uni.edu",
    specializtion: "Computer Science",
    work_location: "KMA",
  },
  {
    id: 2,
    name: "Prof. Laila Kamal",
    email: "laila.k@uni.edu",
    specializtion: "Computer Science",
    work_location: "KMA",
  },
];

function renderTable() {
  tableBody.innerHTML = "";

  teachers.forEach((teacher) => {
    const row = document.createElement("tr");
    row.id = `teacher-${teacher.id}`;
    row.innerHTML = `
            <td>${teacher.id}</td>
            <td>${teacher.name}</td>
            <td>${teacher.email}</td>
            <td>${teacher.specializtion}</td>
            <td>${teacher.work_location}</td>
            <td class="actions">
              <button class="btn btn-edit btn-sm" onclick="editUser(${teacher.id})">Edit</button>
              <button class="btn btn-delete btn-sm" onclick="deleteUser(${teacher.id})">Delete</button>
            </td>
            `;
    tableBody.appendChild(row);
  });
}

renderTable();

addBtn.addEventListener("click", function () {
  modal.style.display = "block";
  modalTitle.innerText = "Add New Teacher";
  form.reset();
  document.getElementById("teacherId").value = "";
});

closeSpan.addEventListener("click", function () {
  modal.style.display = "none";
});

function deleteUser(id) {
  if (confirm("Are you sure you want to delete this teacher?")) {
    teachers = teachers.filter((t) => t.id !== id);
    renderTable();
  }
}

function editUser(id) {
  const teacherToEdit = teachers.find((t) => t.id == id);
  modal.style.display = "block";
  modalTitle.innerText = "Edit Teacher Information";

  document.getElementById("teacherId").value = teacherToEdit.id;
  document.getElementById("name").value = teacherToEdit.name;
  document.getElementById("email").value = teacherToEdit.email;
  document.getElementById("specializtion").value = teacherToEdit.specializtion;
  document.getElementById("work_location").value = teacherToEdit.work_location;
}

form.addEventListener("submit", function (e) {
  e.preventDefault();

  const id = document.getElementById("teacherId").value;
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const specializtion = document.getElementById("specializtion").value;
  const work_location = document.getElementById("work_location").value;

  if (id) {
    let teacher = teachers.find((t) => t.id == id);
    teacher.name = name;
    teacher.email = email;
    teacher.specializtion = specializtion;
    teacher.work_location = work_location;
  } else {
    teachers.push({
      id: Math.floor(Math.random() * 10) + 1,
      name,
      email,
      specializtion,
      work_location,
    });
  }

  modal.style.display = "none";
  form.reset();
  renderTable();
});
