/**
 * This is the naive approach to scripting the frontend.
 * It serves the purpose, and achieve a functional frontend.
 * What are the main drawbacks of this approach?
 * What are the ways to achieve separation of concerns?
 * Can we use some patterns to make the code extandable and flexible?
 * When connected to a backend what drawbacks can you identify
 *   and how can we solve them?
 */

document.querySelector('form').addEventListener('submit', onSubmit_Form);
document.querySelector('ul').addEventListener('click', onClick_DeleteOrCheck);
document.getElementById('clearAll').addEventListener('click', onClick_ClearAll);

function onSubmit_Form(e) {
  e.preventDefault();// what is the purpose of preventing default here?
  let input = document.querySelector('input');
  if (input.value != '') // is this a good validation? can it be better?
      addTodo(input.value);
  input.value = '';
}

// can we make this function more flexible and less content dependent?
function addTodo(todo) {
  let ul = document.querySelector('ul');
  let li = document.createElement('li');
  li.innerHTML = `
      <span class="todo-item">${todo}</span>
      <button name="checkButton"><i class="fas fa-check-square green"></i></button>
      <button name="deleteButton"><i class="fas fa-trash"></i></button>
  `;
  li.classList.add('todo-list-item');
  ul.appendChild(li);
}

function onClick_DeleteOrCheck(e) { // is this a candidate for generalization?
  if (e.target.name == 'checkButton')
      checkTodo(e);

  if (e.target.name == 'deleteButton')
      deleteTodo(e);
}

function checkTodo(e) {  
  let item = e.target.parentNode;
  if (item.style.textDecoration == 'line-through')
      item.style.textDecoration = 'none';
  else
      item.style.textDecoration = 'line-through';
}

// what potential issues can this function have? how can we solve them?
function deleteTodo(e) { 
  let item = e.target.parentNode;
  
  item.addEventListener('transitionend', function () {
      item.remove(); 
  });

  item.classList.add('todo-list-item-fall');
}

function onClick_ClearAll(e) {
  document.querySelector('ul').innerHTML = '';
}