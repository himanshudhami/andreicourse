
// To run this file:
// > node functions.demo.js


/* 
  HOISTING
  function DECLARATION and variable DECLARATION are hoisted
  variable ASSIGNMENT is NOT hoisted
*/

console.log('hoisted function: ', add2Numbers(1,2)) // usage of later declared function is legal and functional
console.log('x = ', x); // usage of declared but unnasigned variable is legal but returns undefined
try {
  // will throw ReferenceError because is not DEFINED
  console.log('y = ', y); // attempt of usage undeclared variable throws an error
} catch (error) {
  console.error('caught error:', error);
}

function add2Numbers(a, b) { //declaration and assignment of function
  return a+b;
}

var x = 2; // declaration and assignment in the same statement
var z; // declaration
z = 3; // assignment

try {
  // will throw error because function is declared as expression and only declaration is hoisted
  console.log('add numbers = ', addNumbers(1,2,3,4,5));  
} catch (error) {
  console.error('caught error:', error);
}

var addNumbers = function() {// function as expression and assignement to a variable
  return arguments.length > 0 ? Array.from(arguments).reduce((acc, cur) => acc + cur, 0) : 0
}

console.log('add numbers = ', addNumbers(1,2,3,4,5)); // works OK because function is already evaluated


/**
  callbacks
  functions passed as parameters to functions
  syncronous callbacks
  async callbacks
 */

function add2Numbers(a, b) {
  return a+b;
}

var addNumbers = function() {
  return arguments.length > 0 ? Array.from(arguments).reduce((acc, cur) => acc + cur, 0) : 0
}

function doCalculus(a, b, calculus) { //function that uses a callback (calculus) to execute generic calculations
  if ((isNaN(a) || isNaN(b) || typeof calculus !== 'function')) throw new Error('incorrect arguments'); 
  return calculus(a,b)
}

console.log('using add2Numbers: ', doCalculus(1,2, add2Numbers));
console.log('using addNumbers: ', doCalculus(1,2, addNumbers));

console.log(
  'defining the callback in place: ', 
  doCalculus(1, 2, (a, b) => a*b)// (a, b) => a*b is the callback
)

// lambda expressions and anonymous functions
console.log(
  'defining the callback in place: ', 
  doCalculus(4, 2, function(a, b) { return b/a}), // normal, anonymous function
  doCalculus(4, 2, (a, b) => b/a), // lambda expression
)


/* 
  callbacks follow the when/then pattern
  when 
    the main operation is done
  then 
    execute the consequence
*/

// synchronous callback

function showMessage(message) {
  console.log(message);
}

function longExec(doCallback) {
  let readyMessage = "i'm done";
  console.log('start long running op');
  for( let i = 0; i < 1000000000; i++) {
    if (i===1000000000-1) doCallback(readyMessage);
  } 
}

longExec(showMessage);
longExec((msg) => console.warn('more fancy message:', msg));

// async callbacks

// when the timeout expires then show the message:
setTimeout(() => {
  let messageToShow = 'greetings';
  showMessage(messageToShow);
}, 2*1000)

// same thing but shorter:
// setTimeout(() => showMessage('greetings'), 2*1000);

// PROMISES
// object encapsulating a future execution of 2 functions: resolve or reject

var cond = true;
// The promise:
var promise = new Promise(
  (resolve, reject) => {
    if (cond) {
      let payload = {data: 'something relevant'};
      resolve(payload)
    } else {
      let reason = "because I want so";
      reject(reason);
    }
  }
);

// The consumer:
var consumePromise = function () {
  promise
    .then((payload) => {
      console.log('resolved promise: ', payload)
    })
    .catch((reason) => {
      console.error('reason of rejection: ', reason)
    })
}
consumePromise();

var chainedPromise = function(payload) {
  return Promise.resolve('chained promise: ' + JSON.stringify(payload));
}

var consumePromises = function() {
  promise
    .then(chainedPromise)
    .then((payload) => console.log(payload))
    .catch((reason) => {
      console.error('reason of rejection: ', reason)
    })
}

consumePromises();