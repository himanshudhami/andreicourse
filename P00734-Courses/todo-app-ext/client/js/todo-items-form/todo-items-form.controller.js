import { TodoItemsController } from '../todo-item/todo-items.controller.js';
import { TodoItemsFormView } from './todo-items-form.view.js';

export class TodoItemsFormController {
  #todoItemsController;
  #todoItemsFormView;

  static buildFormController() {
    let fc = new TodoItemsFormController();
    fc.registerEventHandlers();

    return fc;
  }

  constructor() {
    this.#todoItemsController = TodoItemsController.buildTodoItemsController();
    this.#todoItemsFormView = TodoItemsFormView.buildView();
  }

  registerEventHandlers = () => {
    document.addEventListener('DOMContentLoaded', (e) => {
      document.querySelector('form').addEventListener('submit', this.onSubmit_Form);
      document.querySelector('ul').addEventListener('click', this.onClick_DeleteOrDone);
      document.getElementById('clearAll').addEventListener('click', this.onClick_Clear);
    })
  }

  refresh = () => {
    this.#todoItemsController.refresh();
  }

  onSubmit_Form = (e) => {
    e.preventDefault();
    let todoText = this.#todoItemsFormView.getInputValue();

    if (todoText) {
      this.#todoItemsFormView.clearInputValue();
      this.#todoItemsController.newTodo(todoText);
    }
  }

  onClick_DeleteOrDone = (e) => {
    if (e.target.name == 'btnDone')
        this.markTodoAsDone(e);
  
    if (e.target.name == 'btnDelete')
        this.deleteTodo(e);
  }

  onClick_Clear = (e) => {
    this.#todoItemsController.clear();
    this.#todoItemsFormView.clear()
  }

  markTodoAsDone = (e) => {
    let id = this.#todoItemsFormView.getIdFromEvent(e);
    this.#todoItemsController.markTodoAsDone(id);
    this.#todoItemsFormView.markTodoAsDone(e);
  }

  deleteTodo = (e) => {
    let id = this.#todoItemsFormView.getIdFromEvent(e);
    this.#todoItemsController.deleteTodo(id);
    this.#todoItemsFormView.deleteTodo(e);
  }

}