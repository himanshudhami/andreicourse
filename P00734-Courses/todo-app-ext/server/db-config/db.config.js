import sqlite from 'sqlite3';
import path from 'path';

export class DbConfig {
  #db;
  #path = path.join(process.cwd(), '/db/todoapp.db');// cannot use __dirname with ES6 imports
  #sqlite3 = sqlite.verbose();
  
  constructor() {
  }

  connectDb = () => {
    this.#db = new this.#sqlite3.Database(this.#path, this.#sqlite3.OPEN_READWRITE, (err) => {
      if (err) {
        console.error('Database connection error', err);
      } else {
        console.log(`Database connection opened`);
      }
    })
  }

  get db(){
    return this.#db;
  }

  disconnectDb = () => {
    this.#db.close(err => {
      if (err) {
        console.error(`Error closing the database connection `, err);
      } else{
        console.log(`Database connection closed`);
      }
    })
  }

  createModel = (sql, params) => {
      const sqlParams = params;
      this.connectDb();
      this.#db.run(sql, sqlParams, (err) => {
        if (err) {
          console.error(`Error creating table Todos `, err);
        } else {
          console.log(`Todos table created succesfully`);
        }
        this.disconnectDb();
      });
  }
}