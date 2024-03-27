//create a json file for collecting data

let tasks = [
 
];
getTask();
/*****************************************
DisplayTasks
*****************************************/

let container = document.querySelector(".tasks-container");
function DisplayTasks() {
  let counter = 0;
  container.innerHTML = "";
  for (task of tasks) {
    container.innerHTML += `
    <div class="task ${task.isDone ? "back-done" : ""}">
      <div class="info-label">
        <h4>${task.title}</h4>
        <span id="task-date"><i class="fa-regular fa-calendar"></i>${
          task.date
        }</span>
      </div>
      <div class="crud-button">
        <button  class="Edit-btn" onclick="EditTask(${counter})" style="background-color: blue" title="Edit">
          <i class="fa-solid fa-pen"></i>
        </button>
        ${
          task.isDone
            ? `<button class="Done-btn" onclick="completeTAsk(${counter})" style="background-color: #Dc143c" title="Confirm">
            <i class="fa-solid fa-circle-minus"></i></i>
          </button>`
            : `<button class="Done-btn" onclick="completeTAsk(${counter})" style="background-color: green" title="Confirm">
        <i class="fa-solid fa-circle-check"></i>
      </button>`
        }
        
        <button class="delete-btn" onclick="DeleteTask(${counter})" style="background-color: red" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    `;
    counter += 1;
  }
  container.innerHTML += `<span id="compteur">${countCompletedTasks(
    counter
  )}/${counter}</span>`;
}
DisplayTasks();
/*****************************************
add task
*****************************************/

Add_Btn = document.getElementById("add-btn");
input_task = document.getElementById("task-input");
Add_Btn.addEventListener("click", async () => {
  // add date
  const { value: date } = await Swal.fire({
    title: "select date",
    input: "date",
    didOpen: () => {
      const today = new Date().toISOString();
      Swal.getInput().min = today.split("T")[0];
    },
  });
  if (date) {
    Swal.fire("chosen date", date);
  }
  //new obj
  let obj = {
    title: input_task.value,
    date: date,
    isDone: false,
  };
  tasks.push(obj);
  setTasks();
  DisplayTasks();
  //hide input value after 2secondes
  setTimeout(() => {
    input_task.value = "";
  }, 2000);
});

/*****************************************
Delete task
*****************************************/

function DeleteTask(counter) {
  let taskIndex = tasks[counter];
  console.log(counter);
  Swal.fire({
    title: "Do you want to delete :" + taskIndex.title + "?",
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Yes",
    denyButtonText: `No`,
  }).then((result) => {
    /* Read more about isConfirmed, isDenied below */
    if (result.isConfirmed) {
      Swal.fire("Deleted!", "", "success");
      let task = tasks[counter];
      tasks.splice(counter, 1);
      setTasks();
      DisplayTasks();
    } else if (result.isDenied) {
      Swal.fire("Changes are not saved", "", "info");
    }
  });
}

/*****************************************
Edit task
*****************************************/
async function EditTask(counter) {
  const { value: text } = await Swal.fire({
    input: "textarea",
    inputLabel: "task",
    inputPlaceholder: "Type your Task here...",
    inputAttributes: {
      "aria-label": "Type your message here",
    },
    showCancelButton: true,
  });
  if (text) {
    Swal.fire("Done");
    let ETask = tasks[counter];
    ETask.title = text;
    setTasks();
    DisplayTasks();
  }
}
/*****************************************
complete task
*****************************************/
function completeTAsk(counter) {
  let compTask = tasks[counter];
  if (compTask.isDone) {
    compTask.isDone = false;
  } else {
    compTask.isDone = true;
  }
  setTasks();
  DisplayTasks();
}

/****************************************
local Storage
*****************************************/
// set items on local storage
function setTasks() {
  let StTasks = JSON.stringify(tasks);
  localStorage.setItem("tasks", StTasks);
}
//get items from local storage
function getTask() {
  let testArrays = JSON.parse(localStorage.getItem("tasks"));
  if (testArrays == null) {
    tasks = [];
  } else {
    tasks = testArrays;
  }
}
//nbr of completed tasks
function countCompletedTasks(counter) {
  let completedTasksCount = 0;
  let storedTasks = JSON.parse(localStorage.getItem("tasks"));
  if (storedTasks) {
    storedTasks.forEach((task) => {
      if (task.isDone) {
        completedTasksCount++;
      }
    });
  }
  if (completedTasksCount == counter && counter != 0) {
    const Toast = Swal.mixin({
      toast: true,
      position: "top-end",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
      didOpen: (toast) => {
        toast.onmouseenter = Swal.stopTimer;
        toast.onmouseleave = Swal.resumeTimer;
      },
    });
    Toast.fire({
      icon: "success",
      title: "Tasks completed successfully",
    });
  }
  return completedTasksCount;
}
