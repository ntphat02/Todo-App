const tasks = [
  {
    title: "Tên công việc",
    completed: false,
  },
];
const taskList = document.querySelector("#task-list");
const frm = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

taskList.onclick = function (e) {
  const taskItem = e.target.closest(".task-item");
  const taskIndex = +taskItem.getAttribute("task-index");
  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    let newtitle = prompt("Nhập tên công việc", task.title);

    if (newtitle.trim() === "") {
      alert("Không được để trống");
      newtitle = prompt("Nhập tên công việc", task.title);
    }
    task.title = newtitle;
    render();
  } else if (e.target.closest(".done")) {
    task.completed = !task.completed;
    render();
  } else if (e.target.closest(".delete")) {
    tasks.splice(taskIndex, 1);
    render();
  }
};

frm.onsubmit = function (e) {
  e.preventDefault();
  const value = input.value.trim();
  if (!value) {
    alert("Nhập gì đó đi ^^");
    return;
  }

  const newTask = {
    title: value,
    completed: false,
  };

  tasks.push(newTask);
  input.value = "";
  render();
};

function render() {
  const html = tasks
    .map(
      (task, index) => ` <li class="task-item ${
        task.completed ? "completed" : ""
      }" task-index="${index}">
          <span class="task-title">${task.title}</span>
          <div class="task-action">
            <button class="task-btn edit">Edit</button>
            <button class="task-btn done">${
              task.completed ? "Mark as undone" : "Mark as done"
            }</button>
            <button class="task-btn delete">Delete</button>
          </div>
        </li>`
    )
    .join("");

  taskList.innerHTML = html;
}
render();
