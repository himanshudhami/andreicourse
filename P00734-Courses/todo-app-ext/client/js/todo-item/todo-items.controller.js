import { TodoItemView } from "./todo-item.view.js";
import { TodoItemsRepository } from "./todo-items.repository.js";

export class TodoItemsController {
  #todoItemsRepository = new TodoItemsRepository();
  #todoItemView = new TodoItemView();

  static buildTodoItemsController() {
    let c = new TodoItemsController();
    return c;
  }

  constructor() {
  }

  /**
   * Should connect to database and get latest
   */
  refreshAsync = async () => {
    await this.#todoItemsRepository.fillAsync();

    this.#todoItemsRepository
      .list()
      .map((todoItemModel) => TodoItemView.renderTodo(todoItemModel));
  }

  /**
   * Should produce a paginated list
   */
  list = (pageIndex, pageSize) => {
  }

  newTodo = (todoText) => {
    let newTodoItemModel = this.#todoItemsRepository.newTodo(todoText);
    this.#todoItemView.addTodo(newTodoItemModel);
  }

  deleteTodo = (id) => {
    this.#todoItemsRepository.delete(id);
  }

  clear = () => {
    this.#todoItemsRepository.clear();
  }

  markTodoAsDone = (id) => {
    this.#todoItemsRepository.markTodoAsDone(id);
  }

}