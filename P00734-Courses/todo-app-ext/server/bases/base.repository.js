import { DbConfig } from "../db-config/db.config.js";
import { ResponseData } from "../response/response.data.js";

export class BaseRepository {
  modelSqls;
  items = [];
  take = 10;
  dbConfig;

  constructor() {
    this.dbConfig = new DbConfig();
  }

  createModel = () => {
    this.dbConfig.createModel(this.modelSqls.createTableSql);
  }

  list = (skip, take, callback) => {
    skip = skip || 0;
    take = take || this.take;
    let sql = this.modelSqls.selectAllWithPagingSql;

    this.dbConfig.connectDb();
    this.dbConfig.db.all(sql, [take, skip], (err, rows) => {
      let ro = new ResponseData(rows, err);
      this.dbConfig.disconnectDb();

      return callback(ro);
    })
  }

  getOneById = (id, callback) => {
    let sql = this.modelSqls.selectOneByIdSql;

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
      let sql = this.modelSqls.insertOneSql;
      let dbConfig = this.dbConfig;
      let params = [todoModel.text, todoModel.isDone, todoModel.createdDate, todoModel.changedDate];

      return DbPatchFunctions.runPatchedInsert(dbConfig, this.modelSqls, params, callback);
    } else {
      throw new Error (`model for Todo creation is invalid`, todoModel);
    }
  }

  update = (todoModel, callback) => {

  }

  delete = (id, callback) => {
    let sql = this.modelSqls.deleteOneByIdSql;
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
  static runPatchedInsert(dbConfig, modelSqls, params, callback) {
    dbConfig.connectDb();
    return dbConfig.db.run(modelSqls.insertOneSql, params, function(err) {
      if (err) { 
        let ro = new ResponseData(this.lastID, err);
        dbConfig.disconnectDb(); 

        return callback(ro);
      } else {
        let sql = modelSqls.selectOneByIdSql;
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
