const todoNameElement = document.querySelector('.JS_todoName');
const todoDateElement = document.querySelector('.JS_todoDate');
const todoListElement = document.querySelector('.JS_todoList');
const doneListElement = document.querySelector('.JS_doneList');
const todoList = JSON.parse(localStorage.getItem('todoList')) || [];
const doneList = JSON.parse(localStorage.getItem('doneList')) || [];
const dateElement = document.querySelector('.JS_dateTime');
//const todoList = [];

renderTodos();
renderDones();
setDateTime();
setMinDate();
setInterval(setDateTime, 1000);

class Todo 
{
  name = '';
  date = '';
  constructor(name, date)
  {
    this.name = name
    this.date = date
  }
}

function addTodo()
{
  const todoName = todoNameElement.value;
  const todoDate = todoDateElement.value;
  console.log(todoName + ' ' + todoDate);

  if (todoName !== '' && todoDate !== '')
  {
    const todo = new Todo(todoName, todoDate);
    todoList.push(todo);
    todoNameElement.value = '';
    todoDateElement.value = '';
    document.querySelector('.JS_errorDialog').innerText = '';
    saveLists();
    console.log('Fields complete');
    renderTodos();
  }
  else
  {
    document.querySelector('.JS_errorDialog').innerText = 'Please provide all fields to proceed';
    console.log('fieldss not complete');
  }
}

function addTodoEnterKey(event)
{
  if (event.key === "Enter")
  {
    addTodo();
  }
}

function saveLists()
{
  const todoListString = JSON.stringify(todoList);
  localStorage.setItem('todoList', todoListString);

  const doneListString = JSON.stringify(doneList);
  localStorage.setItem('doneList', doneListString);
}

function renderTodos()
{
  const length = todoList.length;
  let string = '';

  for (let i = 0; i < length; i ++)
  {
    const todo  = todoList[i];
    string += 
    `<div id="todoSec${i}">

      <section class="todoSecs">
        <article class="blockart">${todo.name.trim()}</article>
        <article class="blockart1">${todo.date.trim()}</article>
        <button class="todoBtns" onclick="completeTodo(${i});">
          <img src="images/tickIcon.png" width="20" height="20" title="Complete todo">
        </button>
        <button class="todoBtns" onclick="copytodo(${i});">
          <img src="images/copyIcon.png" width="19" height="19" title="Copy todo">
        </button>
        <button class="todoBtns" onclick="editTodo(${i});">
          <img src="images/editIcon.png" width="18" height="18" title="Edit todo">
        </button>
        <button class="todoBtns" onclick="deleteTodo(${i});">
          <img src="images/deleteIcon.png" width="18" height="18" title="Delete todo">
        </button>
      </section>

    </div>`;
  }

  todoListElement.innerHTML = string;
}

function renderDones()
{
  const length = doneList.length;
  let string = '';

  for (let i = 0; i < length; i ++)
  {
    const todo  = doneList[i];
    string += 
   `<section class="doneSecs">
      <article class="blockart stroke">${todo.name.trim()}</article>
      <article class="blockart1 stroke">${todo.date.trim()}</article>
      <button class="todoBtns" onclick="copydone(${i});">
        <img src="images/copyIcon.png" width="19" height="19" title="Copy todo">
      </button>
      <button class="todoBtns" onclick="deleteDone(${i});">
        <img src="images/deleteIcon.png" width="18" height="18" title="delete todo">
      </button>
    </section>`;
  }

  doneListElement.innerHTML = string;
}

function deleteTodo(index)
{
  todoList.splice(index, 1);
  saveLists();
  renderTodos();
}

function deleteDone(index)
{
  doneList.splice(index, 1);
  saveLists();
  renderDones();
}

function completeTodo(index)
{
  const todo = todoList[index];
  doneList.push(todo);
  deleteTodo(index);
  renderDones();
}

function copytodo(index)
{
  const todo = todoList[index];
  const newTodo = new Todo(todo.name, todo.date);
  todoList.push(newTodo);
  saveLists();
  renderTodos();
}

function copydone(index)
{
  const todo = doneList[index];
  const newTodo = new Todo(todo.name, todo.date);
  todoList.push(newTodo);
  saveLists();
  renderTodos();
}

function editTodo(index)
{
  const todo = todoList[index];
  const section = document.querySelector(`#todoSec${index}`);
  section.classList.toggle('todoListDivs');

  section.innerHTML = 
  `<section class="editSecs">
      <input type="text" class="nameInput1" value="${todo.name.trim()}" id="sec${index}Name" onkeyup="saveTodoEnterKey(event, ${index});">
      <input type="date" class="dateInput1" value="${todo.date.trim()}" id="sec${index}Date" onkeyup="saveTodoEnterKey(event, ${index});">
      <button class="doneBtn" onclick="saveTodo(${index});">
        <img src="images/doneIcon.png" width="15" height="15" title="Done">
      </button>
    </section>`;

    setFocus(document.querySelector(`#sec${index}Name`));
}

function saveTodo(index)
{
  const todo = todoList[index];
  const section = document.querySelector(`#todoSec${index}`);

  const todoName = document.querySelector(`#sec${index}Name`).value;
  const todoDate = document.querySelector(`#sec${index}Date`).value;

  todo.name = todoName;
  todoDate.date = todoDate;

  saveLists();
  //renderTodos();

  section.innerHTML = 
    `
      <section class="todoSecs">
        <article class="blockart">${todo.name.trim()}</article>
        <article class="blockart1">${todo.date.trim()}</article>
        <button class="todoBtns" onclick="completeTodo(${index});">
          <img src="images/tickIcon.png" width="20" height="20" title="Complete todo">
        </button>
        <button class="todoBtns" onclick="copytodo(${index});">
          <img src="images/copyIcon.png" width="19" height="19" title="Copy todo">
        </button>
        <button class="todoBtns" onclick="editTodo(${index});">
          <img src="images/editIcon.png" width="18" height="18" title="Edit todo">
        </button>
        <button class="todoBtns" onclick="deleteTodo(${index});">
          <img src="images/deleteIcon.png" width="18" height="18" title="Delete todo">
        </button>
      </section>
    `;
}

function saveTodoEnterKey(event, index)
{
  if (event.key === "Enter")
  {
    saveTodo(index);
  }
}

function setDateTime()
{
  const today = new Date();
  dateElement.innerText = today.toString().substring(0, 21);
}

function setMinDate()
{
  const currentDate = new Date();

  // Get the date
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth() + 1; // Months are zero-based, so add 1
  const day = currentDate.getDate();

  const minDate = `${year}-${month}-${day}`;

  todoDateElement.setAttribute('min', minDate);
}

function setFocus(element)
{
  element.focus();

  const valueLength = element.value.length;
  element.setSelectionRange(valueLength, valueLength);
}