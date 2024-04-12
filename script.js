let $ = document;
let todosForm = $.querySelector(".todo-form");
let todosInput = $.querySelector(".todo-input");
let todolistWrapper = $.querySelector(".todolist");
let selectFilterTodos = $.querySelector(".filter-todos");
let submitBtn = $.querySelector(".add-todo");
let todosArray = [];

// Add todos by BTN
submitBtn.addEventListener("click", pushUserTodos);
// Add Todos Datas By Click
todosForm.addEventListener("submit", pushUserTodos);
function pushUserTodos(e) {
  e.preventDefault();
  if (!todosInput.value) return null;
  let newTodosObj = {
    id: Date.now(),
    createdAt: new Date().toISOString(),
    title: todosInput.value,
    isComplete: false,
  };
  todosArray.push(newTodosObj);
  todosInput.value = "";
  todosInput.focus();
  //   generate Todos to Dom
  generateTodosTODom(todosArray);
  setLocalStorage(todosArray);
}

// Appen TO Dom
function generateTodosTODom(todos) {
  todolistWrapper.innerHTML = "";
  todos.forEach(function (items) {
    let todosTemplate = `<li class="todo">

      <p class="todo__title ${items.isComplete && "completed"}">${
      items.title
    }</p>
        <span class="todo__createdAt">${new Date(
          items.createdAt
        ).toLocaleDateString("fa-IR")}</span>
        <button data-id="${
          items.id
        }" class="todo__check"><i class="far fa-check-square"></i></button>
            <button class="todo__remove" data-id="${
              items.id
            }"><i class="far fa-trash-alt"></i></button>
            </li> `;
    todolistWrapper.insertAdjacentHTML("beforeend", todosTemplate);
    // remove btn
    let removeBtns = document.querySelectorAll(".todo__remove");
    removeBtns.forEach(function (btn) {
      btn.addEventListener("click", removeTodoHandler);
    });
  });
  //   check btn
  let checkBtn = document.querySelectorAll(".todo__check");
  checkBtn.forEach(function (check) {
    check.addEventListener("click", checkTodoHandler);
  });
}

// Filtered TODOS
selectFilterTodos.addEventListener("change", filteredTodosHandler);

function filteredTodosHandler() {
  let filteredSituation = selectFilterTodos.value;
  let filteredArray;
  switch (filteredSituation) {
    case "all": {
      generateTodosTODom(todosArray);
      break;
    }
    case "completed": {
      filteredArray = todosArray.filter((items) => items.isComplete);
      generateTodosTODom(filteredArray);
      break;
    }
    case "uncompleted": {
      filteredArray = todosArray.filter((items) => !items.isComplete);
      generateTodosTODom(filteredArray);
    }
  }
}

// todolistWrapper.addEventListener("click", function (e) {
//   if (e.target.tagName === "BUTTON") {
//   }
//   console.log(todosArray);
// });
function removeTodoHandler(e) {
  let btnId = +e.target.dataset.id;
  todosArray = todosArray.filter(function (t) {
    return t.id != btnId;
  });
  generateTodosTODom(todosArray);
  setLocalStorage(todosArray);
}

// complete uncomplete
function checkTodoHandler(e) {
  let btnId = +e.target.dataset.id;
  let filteredItem = todosArray.find(function (items) {
    return btnId == items.id;
  });
  filteredItem.isComplete = !filteredItem.isComplete;

  //   generateTodosTODom(todosArray);
  filteredTodosHandler();
  setLocalStorage(todosArray);
}

function setLocalStorage(_todosArray) {
  localStorage.setItem("todos", JSON.stringify(_todosArray));
}
window.addEventListener("load", getLocalStorage);

function getLocalStorage() {
  let newLocalTodos = JSON.parse(localStorage.getItem("todos"));
  if (newLocalTodos) {
    todosArray = newLocalTodos;
  }
  generateTodosTODom(todosArray);
  setLocalStorage(todosArray);
}
