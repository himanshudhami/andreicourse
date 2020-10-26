import { TodoItemTemplate } from './todo-item.template.js';

export class TodoItemView {

  static renderTodo = (todoItemModel) => {
    let ul = document.querySelector('ul');
    let li = TodoItemTemplate.htmlTemplate(todoItemModel);
    ul.insertAdjacentHTML("beforeend", li);// parses the text and insert as last element in list
  }

  constructor() {
  }

  addTodo = (todoItemModel) => {
    let ul = document.querySelector('ul');
    let li = TodoItemTemplate.htmlTemplate(todoItemModel);
    ul.insertAdjacentHTML("beforeend", li);// parses the text and insert as last element in list
  }

  
  
}