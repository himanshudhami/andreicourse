export class TodoItemModel {
  #_id;
  #_text;
  #_isDone = false;

  static newTodoItemModel(todoText, repository) {
    let id = repository.getNewId();
    return new TodoItemModel(todoText, id);
  }

  constructor(text, id) {
    if (!text) throw new Error('Wrong parameter. Expected string with content for TodoItemModel.Constructor, parameter text:', text);
    if (!id) throw new Error('Wrong parameter. Expected integer > 0 for TodoItemModel.Constructor, parameter id:', id);

    this.#_text = text;
    this.#_id = id;
  }

  get isDone() {
    return this.#_isDone;
  }

  set isDone(val) {
    if (!'boolean' === typeof val) throw new Error('Wrong parameter type. Expected boolean for TodoItemModel.isDone, parameter val:', val);
    this.#_isDone = val;
  }

  get text() {
    return this.#_text;
  }

  set text(val) {
    this.#_text = val;
  }

  get id() {
    return this.#_id;
  }

}