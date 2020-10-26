import { BaseModel } from "../bases/base.model.js";

export class TodoModel extends BaseModel {
  text;
  isDone;

  constructor() {
    super();
    this.isDone = 0;
  }
}

export class TodoModelFactories {
  static createFromRequest(req){
    let todoModel = new TodoModel();
    let body = req.body;
    todoModel.text = body.text;
    todoModel.isDone = body.isDone;

    return todoModel;
  }
}