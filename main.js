const tasks = [
  {
    title: "Tên công việc",
    completed: false,
  },
];
const taskList = document.querySelector(".task-list");
const frm = document.querySelector("#todo-form");
const input = document.querySelector("#todo-input");

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
      (task) => ` <li class="task-item ${task.completed ? "completed" : ""}">
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
