import { TodoItemModel } from "./todo-item.model.js";

export class TodoItemsRepository {
  #items = [];

  constructor() {
    //this.__fillwithMockupData();
  }

  __fillwithMockupData = () => {
    this.#items.push(TodoItemModel.newTodoItemModel('wash face', this));
    this.#items.push(TodoItemModel.newTodoItemModel('brush teeth', this));
    this.#items.push(TodoItemModel.newTodoItemModel('make coffee', this));
  }

  fillAsync = async () => {
    try {
      const payload = await fetch('http://localhost:3335/api/todos/');
      const ret = await payload.json();
      this.#items = ret.data;
    } catch (err) {
      console.error(err);
    }
  }

  newTodo = (todoItemText) => {
    if (todoItemText) {
      let newId = this.getNewId()
      let newTodo = new TodoItemModel(todoItemText, newId);
      this.#items.push(newTodo);

      return newTodo;
    }
    return undefined;
  }

  deleteItem = (todoItem) => {
    if (this.isItemValid(todoItem)) {
      let index = this.#items.findIndex(i => i.text == todoItem.text);
      if (index !== -1) {
        this.#items.splice(index, 1);
      }
    }
  }

  delete = (id) => {
    let index = this.#items.findIndex(i => i.id == id);
    let item = this.#items[index];
    if (index !== -1) {
      this.#items.splice(index, 1);
    }

    return item;
  }

  isItemValid = (todoItem) => {
    return (todoItem && todoItem.constructor.name === 'TodoItemModel');
  }

  contains = (todoItem) => {
    if (!this.isItemValid(todoItem)) return false;
    return this.#items.findIndex(i => i.text == todoItem.text) !== -1;
  }

  list = () => {
    return this.#items;
  }

  clear = () => {
    this.#items = [];
  }

  getNewId = () => {
    let lastItem = this.#items[this.#items.length-1];
    return lastItem ? lastItem.id + 1 : 1;
  }

  findById = (id) => {
    return this.#items.find((item) => item.id === id);
  }

  markTodoAsDone = (id) => {
    let found = this.#items.find(i => i.id == id);
    if (found) found.isDone = !found.isDone;
  }

}