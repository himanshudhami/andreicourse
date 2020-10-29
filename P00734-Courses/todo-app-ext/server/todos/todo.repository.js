import { BaseRepository } from "../bases/base.repository.js";
import { TodoModelSql } from "./todo.model.js";

export class TodoRepository extends BaseRepository {
  modelSqls = new TodoModelSql();

  constructor() {
    super();
    console.log(`generated insert sql: \n`, this.modelSqls.insertOneSql);
  }
 
}