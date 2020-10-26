export class TodoItemsFormView {
  static buildView() {
    let v = new TodoItemsFormView();
    return v;
  }

  constructor() {
  }


  getInputValue = () => {
    let input = document.querySelector('input');
    return input.value;
  }

  clearInputValue = () => {
    let input = document.querySelector('input');
    input.value = '';
  }

  clear = () => {
    document.querySelector('ul').innerHTML = '';
  }

  deleteTodo = (e) => { 
    let liItem = e.target.parentNode;
    liItem.addEventListener('transitionend', () => {
        liItem.remove(); 
    });
  
    liItem.classList.add('todo-list-item-fall');
  }

  markTodoAsDone = (e) => {  
    let item = e.target.parentNode;
    if (item.style.textDecoration == 'line-through')
        item.style.textDecoration = 'none';
    else
        item.style.textDecoration = 'line-through';
  }

  getIdFromEvent = (e) => {
    let id = e.target.parentNode.id ? e.target.parentNode.id.substring(3): 0; //li_x
    return id;
  }

}