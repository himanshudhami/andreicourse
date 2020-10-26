import { BaseRepository } from "../bases/base.repository.js";
import { ResponseData } from "../response/response.data.js";

export class TodoRepository extends BaseRepository {
  #createSql = `CREATE TABLE IF NOT EXISTS Todos (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    text TEXT,
    isDone INTEGER,
    createdDate TEXT,
    changedDate TEXT
  )`;

  constructor() {
    super();
  }

  createModel = () => {
    this.dbConfig.createModel(this.#createSql);
  }

  list = (skip, take, callback) => {
    skip = skip || 0;
    take = take || this.take;
    let sql = `SELECT * from Todos 
              ORDER BY createdDate DESC
              LIMIT ${take} OFFSET ${skip} `;

    this.dbConfig.connectDb();
    this.dbConfig.db.all(sql, [], (err, rows) => {
      let ro = new ResponseData(rows, err);
      this.dbConfig.disconnectDb();

      return callback(ro);
    })
  }

  getOneById = (id, callback) => {
    let sql = `SELECT * from Todos WHERE id = ? `;

    this.dbConfig.connectDb();
    this.dbConfig.db.all(sql, [id], (err, rows) => {
      let ro = new ResponseData(rows, err);
      this.dbConfig.disconnectDb();

      return callback(ro);
    })
  }

  find = (filter, callback) => {

  }

  create = (todoModel, callback) => {
    if (todoModel) {
      let sql = 'INSERT into Todos (text, isDone, createdDate, changedDate) VALUES (?, ?, ?, ?)';
      let dbConfig = this.dbConfig;
      let params = [todoModel.text, todoModel.isDone, todoModel.createdDate, todoModel.changedDate];

      return DbPatchFunctions.runInsert(dbConfig, sql, params, callback);
    } else {
      throw new Error (`model for Todo creation is invalid`, todoModel);
    }
  }

  update = (todoModel, callback) => {

  }

  delete = (id, callback) => {
    let sql = 'DELETE from Todos WHERE id = ?';
    this.dbConfig.connectDb();
    this.dbConfig.db.run(sql, [id], (err) => {
      let ro = new ResponseData(id, err);
      this.dbConfig.disconnectDb();

      return callback(ro);
    })
  }
}

export class DbPatchFunctions {

  /**
   * Patch necessity:
   * database driver when running INSERT operation returns the lastID (newly created id)
   * as this.lastID inside the callback => it cannot be retrieved inside lambda expression
   * because "this" keyword inside lambda reffers to the containing object context 
   */
  static runInsert(dbConfig, sql, params, callback) {
    dbConfig.connectDb();
    return dbConfig.db.run(sql, params, function(err) {
      if (err) { 
        let ro = new ResponseData(this.lastID, err);
        dbConfig.disconnectDb();

        return callback(ro);
      } else {
        let sql = `SELECT * from Todos WHERE id = ? `;
        let id = this.lastID; // <- usage of this keyword to retrieve lastID

        return dbConfig.db.all(sql, [id], (err, rows) => {
          let ro = new ResponseData(rows, err);
          dbConfig.disconnectDb();

          return callback(ro);
        })
      }
    })
  }
  
}
