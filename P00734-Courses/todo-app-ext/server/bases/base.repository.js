import { DbConfig } from "../db-config/db.config.js";

export class BaseRepository {
  items = [];
  take = 10;
  dbConfig;

  constructor() {
    this.dbConfig = new DbConfig();
  }


}