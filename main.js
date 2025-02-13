const tasks = JSON.parse(localStorage.getItem("tasks")) ?? []; // Nếu về trái null thì trả về vế phải , (mặc định trả về vế trái)
const taskList = document.querySelector("#task-list");
const frm = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

function isDuplicateTask(newTitle, excludeIndex = -1) {
  const isDuplicate = tasks.some(
    (task, index) =>
      task.title.toUpperCase() === newTitle.toUpperCase() &&
      excludeIndex !== index
  );
  return isDuplicate;
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

taskList.onclick = function (e) {
  const taskItem = e.target.closest(".task-item");
  // const taskIndex = +taskItem.getAttribute("data-index");
  const taskIndex = +taskItem.dataset.index;
  console.log(taskIndex);

  const task = tasks[taskIndex];

  if (e.target.closest(".edit")) {
    let newTitle = prompt("Nhập tên công việc", task.title);

    if (newTitle === null) {
      return;
    }
    newTitle = newTitle.trim();
    if (!newTitle) {
      alert("Không được để trống");
      return;
    }

    if (isDuplicateTask(newTitle, taskIndex)) {
      alert("Công việc đã bị trùng!");
      return;
    }

    task.title = newTitle;
    render();
    saveTasks();
    return;
  }
  if (e.target.closest(".done")) {
    task.completed = !task.completed;
    render();
    saveTasks();
    return;
  }
  if (e.target.closest(".delete")) {
    tasks.splice(taskIndex, 1);
    render();
    saveTasks();
  }
};

frm.onsubmit = function (e) {
  e.preventDefault();
  const value = input.value.trim();

  if (!value) {
    alert("Nhập gì đó đi ^^");
    return;
  }

  // const isDuplicate = tasks.some(
  //   (task) => task.title.toUpperCase() === value.toUpperCase()
  // );

  if (isDuplicateTask(value)) {
    alert("Công việc đã bị trùng!");
    return;
  }
  const newTask = {
    title: value,
    completed: false,
  };

  tasks.push(newTask);
  input.value = "";
  render();
  saveTasks();
};

function render() {
  if (!tasks.length) {
    taskList.innerHTML = '<li class="empty-message">No task available</li>';
    return;
  }

  const html = tasks
    .map(
      (task, index) => ` <li class="task-item ${
        task.completed ? "completed" : ""
      }" data-index="${index}">
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
