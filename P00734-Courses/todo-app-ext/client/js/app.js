
import { TodoItemsFormController } from './todo-items-form/todo-items-form.controller.js';

(async () => {

  let formController = TodoItemsFormController.buildFormController();
  await formController.refreshAsync();

})()


/*

let promiseConsumer;
fetch('url')
  .then(() => payload.json())
  .then((data) => promiseConsumer = data)
  .catch(error => console.log(some error))

==

async funcName () => {
  try{
    let payload = await fetch('url');
    let data = await payload.json();
  } catch {
    ////
  }
}

separate: function declaration  + function invokation:
var fn = (a, b) => {
  return a+b;
}
(fn)()



// IIFE: Immediatelly Invoked Function Expression
function declaration and invocation in the same place
((a, b) => {
  return a+b;
})()
*/