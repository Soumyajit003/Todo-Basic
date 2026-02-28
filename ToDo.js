const submit = document.querySelector("#submit");
const container = document.querySelector(".container");
const inp = document.querySelector("#inp");
const submitDiv = document.querySelector(".submitDiv");
let f = 0;
let ent = 0;

const arr = [];

submit.addEventListener("click", () => {
  if (inp.value != "") {
    taskAdd(inp.value);
    inp.value = "";
  }
});
inp.addEventListener("keypress", (enter) => {
  if (ent == 0) {
    if (enter.key === "Enter" && inp.value != "") {
      taskAdd(inp.value);
      inp.value = "";
    }
  }
});

function taskAdd(val) {
  let id = Date.now();
  const done = document.createElement("button");
  done.innerHTML = "";
  done.classList = "done btn";
  const cross = document.createElement("button");
  cross.innerHTML = "&cross;";
  cross.classList = "cross btn";
  const span = document.createElement("span");
  span.classList = "span";
  span.style = "cursor:pointer;";
  const edit = document.createElement("button");
  edit.classList = "edit-btn";
  edit.innerHTML = "Edit";

  const save = document.createElement("button");
  save.innerHTML = "Save";
  save.classList = "btn";
  save.id = "save";

  const task = document.createElement("div");
  task.classList = "task";
  task.id = id;

  task.append(done, span, edit, cross);

  span.innerText = val;
  arr.push({ val, id });
  console.log(arr);
  container.append(task);

  // <================ Done Button=================>
  done.addEventListener("click", (d) => {
    if (
      span.style.textDecoration != "line-through" &&
      span.style.textDecorationColor != "var(--btn_color)"
    ) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
      span.style.textDecorationColor = "transparent";
    }
    done.classList.toggle("checked");
    span.classList.toggle("taskDone");
  });

  // <================ Span Task =================>
  span.addEventListener("click", (d) => {
    if (
      span.style.textDecoration != "line-through" &&
      span.style.textDecorationColor != "var(--btn_color)"
    ) {
      span.style.textDecoration = "line-through";
    } else {
      span.style.textDecoration = "none";
      span.style.textDecorationColor = "transparent";
    }
    done.classList.toggle("checked");
    span.classList.toggle("taskDone");
  });

  // <================ Edit Task =================>
  let id2;
  edit.addEventListener("click", (e) => {
    if (f == 1) {
      window.alert("Please save the task first !!!");
    }
    if (f == 0) {
      id2 = e.target.parentNode;
      inp.value = span.innerHTML;
      submit.remove();
      submitDiv.append(save);
      f = 1;
      ent = 1;
    }
  });

  // <================ remove Task =================>
  cross.addEventListener("click", (c) => {
    let id1 = c.target.parentNode.id;
    c.target.parentElement.remove();
    let temp = arr.findIndex((user) => user.id == id1);
    arr.splice(temp, 1);
    localStorage.setItem("User", JSON.stringify(arr));
  });

  // <================ Save Task =================>
  save.addEventListener("click", () => {
    if (inp.value == "") {
      window.alert("Please enter tesk!!!");
    } else {
      span.innerHTML = inp.value;
      inp.value = "";
      arr.forEach((obj) => {
        if (obj.id == id2) {
          obj.task = inp.value;
        }
      });
      console.log(arr);
      save.remove();
      submitDiv.append(submit);
      f = 0;
      ent = 0;
    }
  });

  saveData(arr);
}

// <================ Save Task in local storage =================>
function saveData(arr) {
  localStorage.setItem("User", JSON.stringify(arr));
}

window.addEventListener("load", showData);

// <================ Show Task after reload =================>
function showData() {
  let t = JSON.parse(localStorage.getItem("User"));
  t.forEach((obj) => {
    taskAdd(obj.val);
  });
}
