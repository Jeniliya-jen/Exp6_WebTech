let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let filter = "all"; // "all" | "open" | "done"

const form = document.getElementById("taskForm");
const input = document.getElementById("taskInput");
const list = document.getElementById("taskList");
const counter = document.getElementById("counter");

function createTask(text) {
  return {
    id: Date.now(),
    text: text,
    done: false
  };
}

function addTask(text) {
  tasks.push(createTask(text));
  saveAndRender();
}

function toggleTask(id) {
  tasks = tasks.map(t => t.id === id ? { ...t, done: !t.done } : t);
  saveAndRender();
}

function deleteTask(id) {
  tasks = tasks.filter(t => t.id !== id);
  saveAndRender();
}

function setFilter(name) {
  filter = name;
  renderTasks();
}

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

// ---------- Functions that draw the screen ----------
function countOpen() {
  return tasks.filter(t => !t.done).length;
}

function getVisible() {
  if (filter === "open") return tasks.filter(t => !t.done);
  if (filter === "done") return tasks.filter(t => t.done);
  return tasks;
}

function taskItem(t) {
  const li = document.createElement("li");
  li.className = "task-item" + (t.done ? " done" : "");

  const box = document.createElement("input");
  box.type = "checkbox";
  box.checked = t.done;
  box.addEventListener("change", () => toggleTask(t.id));

  const label = document.createElement("span");
  label.className = "task-text";
  label.textContent = t.text;

  const del = document.createElement("button");
  del.type = "button";
  del.className = "task-del";
  del.textContent = "Delete";
  del.addEventListener("click", () => deleteTask(t.id));

  li.append(box, label, del);
  return li;
}

function renderTasks() {
  list.innerHTML = "";
  getVisible().forEach(t => {
    list.appendChild(taskItem(t));
  });
  counter.textContent = countOpen() + " left";

  document.querySelectorAll(".filter-btn").forEach(b => {
    b.classList.toggle("active", b.dataset.filter === filter);
  });
}

function handleSubmit(event) {
  event.preventDefault();
  const text = input.value.trim();
  if (text !== "") {
    addTask(text);
  }
  input.value = "";
}

if (form) {
  form.addEventListener("submit", handleSubmit);
  document.querySelectorAll(".filter-btn").forEach(b => {
    b.addEventListener("click", () => setFilter(b.dataset.filter));
  });
  renderTasks(); // start with a render
}