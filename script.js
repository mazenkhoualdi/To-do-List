//create a json file for collecting data

let tasks = [
  {
    title: "read a book",
    date: "22/15/2023",
    isDone: false,
  },
  {
    title: "coding",
    date: "22/15/2020",
    isDone: false,
  },
  {
    title: "cycling",
    date: "22/15/2021",
    isDone: false,
  },
];

//display tasks

let container = document.querySelector(".tasks-container");
function DisplayTasks() {
  container.innerHTML = "";
  for (task of tasks) {
    container.innerHTML += `
    <div class="task">
      <div class="info-label">
        <h4>${task.title}</h4>
        <span id="task-date"><i class="fa-regular fa-calendar"></i>${task.date}</span>
      </div>
      <div class="crud-button">
        <button style="background-color: blue" title="Edit">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button style="background-color: green" title="Confirm">
          <i class="fa-solid fa-circle-check"></i>
        </button>
        <button style="background-color: red" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    `;
  }
}
DisplayTasks();

//add task

Add_Btn = document.getElementById("add-btn");
input_task = document.getElementById("task-input");
Add_Btn.addEventListener("click", () => {
  //get current Date
  let currentHour = new Date();
  let date =
    currentHour.getDate() +
    "/" +
    (currentHour.getMonth() + 1) +
    "/" +
    currentHour.getFullYear() +
    "" +
    "-" +
    "" +
    currentHour.getHours() +
    ":" +
    currentHour.getMinutes();
  console.log(Date);
  //new obj
  let obj = {
    title: input_task.value,
    date: date,
    isDone: false,
  };
  tasks.push(obj);
  DisplayTasks();
  //hide input value after 2secondes
  setTimeout(() => {
    input_task.value = "";
  }, 2000);
});
