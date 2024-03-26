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

/*****************************************
DisplayTasks
*****************************************/

let container = document.querySelector(".tasks-container");
function DisplayTasks() {
  let counter = 0;
  container.innerHTML = "";
  for (task of tasks) {
    container.innerHTML += `
    <div class="task">
      <div class="info-label">
        <h4>${task.title}</h4>
        <span id="task-date"><i class="fa-regular fa-calendar"></i>${task.date}</span>
      </div>
      <div class="crud-button">
        <button  class="Edit-btn" onclick="EditTask(${counter})" style="background-color: blue" title="Edit">
          <i class="fa-solid fa-pen"></i>
        </button>
        <button style="background-color: green" title="Confirm">
          <i class="fa-solid fa-circle-check"></i>
        </button>
        <button class="delete-btn" onclick="DeleteTask(${counter})" style="background-color: red" title="Delete">
          <i class="fa-solid fa-trash"></i>
        </button>
      </div>
    </div>
    `;
    counter += 1;
  }
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
    DisplayTasks();
  }
}
