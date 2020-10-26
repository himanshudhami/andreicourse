export class TodoItemTemplate {

  static htmlTemplate = (todoItem) =>  `
    <li class="todo-list-item" id="li_${todoItem.id}">
      <span class="todo-item">${todoItem.text}</span>
      <button name="btnDone" id="btnDone${todoItem.id}"><i class="fas fa-check-square green"></i></button>
      <button name="btnDelete" id="btnDelete_${todoItem.id}"><i class="fas fa-trash"></i></button>
    </li>
  `;

}