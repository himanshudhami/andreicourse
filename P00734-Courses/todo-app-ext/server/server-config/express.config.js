import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import { TodoRoutes } from '../todos/todo.routes.js';

export class ExpressConfig {
  port = process.env.PORT || 3335;// externalize to config file
  baseDir = process.cwd(); // externalize to config file // do not use __dir
  #hasConfig = false;

  constructor() {
    this.app = express();
    this.todoRoutes = new TodoRoutes(); // routes dependencies not here
  }

  config = () => {
    this.app
      .use(cors())
      .use(express.static(this.baseDir))
      .use(bodyParser.urlencoded({ extended: false }))
      .use(bodyParser.json())
      .use(this.todoRoutes.router);

    this.#hasConfig = true;

    return this;
  }

  start = () => {
    if (!this.#hasConfig) {
      console.error(`Express has not been configured. Use ExpressConfig->config() before start()`);
      return;
    }

    this.app.listen(this.port, (err) => {
      if (err) { 
        console.log(`error starting the web server`, err);
        return;
      }
      console.log(`web server listening on port ${this.port}`)
    });
  }

}




