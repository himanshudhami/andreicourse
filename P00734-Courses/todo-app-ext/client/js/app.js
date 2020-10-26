
import { TodoItemsFormController } from './todo-items-form/todo-items-form.controller.js';

(() => {

  let formController = TodoItemsFormController.buildFormController();
  formController.refresh();

})()


/*
var fn = (a, b) => {
  return a+b;
}

(fn)()

((a, b) => {
  return a+b;
})()

IIFE
*/