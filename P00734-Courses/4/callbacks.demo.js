import { createPublicKey } from 'crypto';
import https from 'https';
import fetch from 'node-fetch'; // run npm install to import fetch

/* 
  callback:
    - function that is passed as argument to another function (High Order Function = HOF)
    - executed as a consequence of the HOF end processing

  used for:
    - way to make the code more flexible and generic
    - uncouple implementation of components
    - extend life of variables beyond the end scope of HOF

  warning: 
    - can create memory leaks
  
  callbacks follow the when/then pattern
  when 
    the main operation is done
  then 
    execute the consequence

  can be: 
    synchronous 
      execution is liniar
    asynchronous
      execution as a consequence of an async operation
*/

console.clear();


// without callback
// inflexible, hardcoded consequence
/*
function runLongFuncWithoutCallback() {
  let readyMessage = "i'm done";
  let antet = "longExecWithoutCallback when done say: ";
  console.log('start long running op');
  for( let i = 0; i < 1000000000; i++) {
    if (i===1000000000-1) console.log(antet, readyMessage, '\n');
  } 
}

runLongFuncWithoutCallback();


//
// synchronous callbacks
// 
function showPrettyMessage(antet, message) {
  console.warn(antet, message, '\n');
}

function showAnotherPrettyMessage(antet, message) {
  console.log('another antet', antet, message, '\n')
}

function runLongFunc(fnCallback, antet, message) { // this is the High Order Function
  console.log('start long running op');
  for( let i = 0; i < 1000000000; i++) {
    if (i===1000000000-1) fnCallback(antet, message);
  } 
}

// function showMessage () { alert('cucu')}
// click(showMessage)
// click(function(){ alert('cucu')})

runLongFunc(showPrettyMessage, "runLongFunc when done say: ", "i'm done");
runLongFunc(showAnotherPrettyMessage, "runLongFunc when done say: ", "i'm done");
runLongFunc((antet, message) => console.warn(antet, message, '\n'), "runLongFunc as lambda when done say: ", "i'm done");

//(...params) => {... statements ... return something }
// (...params) => something

*/

//
// async callbacks
//

/**
  setTimeout
  setInterval
  setImmediate
    - Javascript API supplied by browser or by node
    - Not part of the Ecmascript language
  
  very important API
  Event Loop
*/

/*
function runAfterTimeout(...input) {
  console.log(...input, '\n');
}

setTimeout(function(){
  runAfterTimeout('Ana has apples')
}, 2*1000);

setTimeout(function(myMessage){
  runAfterTimeout(myMessage);
}, 2*1000, 'Ana has apples');

setTimeout((myMsg)=> {
  runAfterTimeout(myMsg);
}, 2*1000, 'Ana has pears');
*/

/**
  Callback usage when async request
*/

// ==> when on VPN the call fails so if you want it to succeed pls disconnect
let dataUrl = 'https://jsonplaceholder.typicode.com/posts/1';

//
// Using lambdas
//
/*

https
  .get(dataUrl, (resp) => {
  
    let payload = '';
    resp.on('data', buffer => { // called any number of times until transmission end or errors
      payload += buffer;
    });

    resp.on('end', () => { // called one time when transmission succeedes
      console.log(JSON.parse(payload))
    })
  })
  .on('error', err => {
    console.error(err);
  });
*/

// 
// Using named functions
//
/*
var processResponse = function(resp) {
  let payload = '';
  resp.on('data', buffer => { // called any number of times until transmission end or errors
    payload += buffer;
  });

  resp.on('end', () => { // called one time when transmission succeedes
    console.log(JSON.parse(payload))
  })
}

var processError = function(err) {
  console.error(err);
}

https
  .get(dataUrl, processResponse)
  .on('error', processError);
*/

/**
Promises 
  object encapsulating a future execution of 2 functions: resolve or reject

  futureResult ~ func [execution, callbackSuccess, callbackFailure ]

  func
    ->execute
      .onSuccess
        ->callbackSuccess
      onFailure
        ->callbackFailure

  Standardise the operation:
  Promise
    .then(callbackSuccess)
    .catch(callbackFailure)

*/

//
// Getting data from a real resource using promisses
//

fetch(dataUrl)
  .then(resp => resp.json())
  .then(json => {
    if (json) console.log(JSON.stringify(json))
    else console.log('no data')
  })
  .catch(err => console.error(err))

