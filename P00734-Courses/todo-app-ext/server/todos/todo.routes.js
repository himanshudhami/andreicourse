import { TodoRepository } from './todo.repository.js';
import { TodoModelFactories } from './todo.model.js';
import { BaseRoutes } from '../bases/base.routes.js';

export class TodoRoutes extends BaseRoutes {
  routeSegment = '/api/todos/';

  constructor() {
    super();

    this.repository = new TodoRepository();
    this.configRoutes(this.routeSegment, TodoModelFactories);
    this.repository.createModel(); // run first time with database empty
  }
}