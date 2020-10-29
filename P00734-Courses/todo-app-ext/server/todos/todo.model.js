import { BaseModel } from "../bases/base.model.js";
import { SqlGenerator } from "../generators/sql.generator.js";

export class TodoModel extends BaseModel {
  get modelMeta() {
    return { 
      table: {
        name: 'Todos',
        columns: [
          {name: 'id', dataType: 'INTEGER', isPrimary: 'PRIMARY', isKey: 'KEY',  keySpec: 'AUTOINCREMENT', nullable: ''},
          {name: 'text', dataType: 'TEXT', nullable: ''},
          {name: 'isDone', dataType: 'INTEGER', nullable: ''},
          {name: 'createdDate', dataType: 'TEXT', nullable: ''},
          {name: 'changedDate', dataType: 'TEXT', nullable: ''},
        ],
        indexes: [
        ],
        foreignKeys: [
        ],
        queryCapabilities: {
          defaultOrdering: {ORDERBY: 'createdDate', direction: 'desc'},
          orderingCriterias: ['id', 'createdDate', 'changedDate', 'isDone']
        }
      }
    }
  };

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
    // add validations and other stuff like that
    let body = req.body;
    todoModel.text = body.text;
    todoModel.isDone = body.isDone;

    return todoModel;
  }
}

export class TodoModelSql extends TodoModel {
//#region already generated
  //#deleteOneByIdSentence = `DELETE from Todos WHERE id = ?`;

  #createTableSentence = `CREATE TABLE IF NOT EXISTS Todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    isDone INTEGER,
    createdDate TEXT,
    changedDate TEXT
  )`;

  //#insertOneSql = `INSERT into Todos (text, isDone, createdDate, changedDate) VALUES (?, ?, ?, ?)`;
//#endregion

  #sqlGenerator

  #selectAllWithPagingSql = `SELECT * from Todos 
    ORDER BY createdDate DESC
    LIMIT ? OFFSET ? `;

  #selectOneByIdSql = `SELECT * from Todos WHERE id = ? `;

  constructor() {
    super();
    this.#sqlGenerator = new SqlGenerator(this)
  }

  get createTableSql() {
    //return this.#sqlGenerator.generateCreateTableSql();
    return this.#createTableSentence;
  }

  get deleteOneByIdSql() {
    return this.#sqlGenerator.generateDeleteOneByIdSql();
    //return this.#deleteOneByIdSentence;
  }

  get selectAllWithPagingSql() {
    return this.#selectAllWithPagingSql;
  }

  get selectOneByIdSql() {
    return this.#selectOneByIdSql;
  }

  get insertOneSql() {
    return this.#sqlGenerator.generateInsertOneSql();
    //return this.#insertOneSql;
  }

}