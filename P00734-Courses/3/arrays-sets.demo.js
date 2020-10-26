/*

To run this file:
 > node arrays-sets.demo.js


- Array function
  allows creation and manipulation of array datastructure
- array datastructure: 
  complex types, reference types
  list like objects 
  length is dynamic 
  has no element type
  maintains index of elements, index is numeric
  maintains order of elements
  element is accessed by index -> constant time access to element by index
*/


// using Array as constructor:
// rarely used 
let constrArray = new Array(3);
console.log(`new Array(3): ${constrArray} with length: ${constrArray.length}`);

constrArray = new Array(1,2,3);
console.log(`new Array(1,2,3): ${constrArray} with length: ${constrArray.length}`);


// in place declaration:
// used from now on


let fistArray = [1, 2, 3];
console.log(`fistArray: ${fistArray} with length: ${fistArray.length}`);
console.log(fistArray);

/* Constructor function
  Example of constructor function.
  Constructor are used for creating new objects.
  Constructors are having prototypes as objects. 
  Prototypes are used by instances to share methods of Constructor.

  See example below:

*/
function Person(name, age) {// constructor
  this.name = name;
  this.age = age;
  // this.getName = function() { return this.name }// not shared method
}

// Prototype methods definition and usage
Person.prototype.getAge = function() { return this.age };// shared method
Person.prototype.getName = function() { return this.name };// shared method

// Static methods definition and usage
// Method is defined as Constructor member directly (not by using prototype)
// Static method does not have access to "this". Instance must be passed as parameter
Person.isOnest = function(person) { return person.name && person.age ? true : false};

let basil = new Person('Basil', 35);
let jack = new Person ('Jack');

console.log('Basils age: ', basil.getAge());
console.log('Jack name:', jack.getName());

console.log('Is basil onest:', Person.isOnest(basil));
console.log('Is Jack onest:', Person.isOnest(jack));

// instance.__proto__.{collection_of_methods}.method
// jack.__proto__.Person.getAge

// Array is not typed
// can carry all types inside
let stringArray = ['cat', 'dog', 'fish', 'apple'];
let mixedArray = ['cat', 1, {a:1, b:2}];
console.log(`mixed array:`, mixedArray, `with length: ${mixedArray.length}`);

// access element by index. index starts a 0
console.log(`mixed array[0]:`, mixedArray[0]);
console.log(`mixed array[2]:`, mixedArray[2]);

// add element to end
mixedArray.push('last');
console.log(`mixed array:`, mixedArray, `with length: ${mixedArray.length}`);

// insert element at index 0 
mixedArray.splice(0, 0, 'first');
console.log(`mixed array:`, mixedArray, `with length: ${mixedArray.length}`);

// delete an element by index
mixedArray.splice(1, 1);
console.log(`mixed array:`, mixedArray, `with length: ${mixedArray.length}`);

// delete first element
mixedArray.shift();
console.log(`mixed array:`, mixedArray, `with length: ${mixedArray.length}`);

// remove last
mixedArray.pop();
console.log(`mixed array:`, mixedArray, `with length: ${mixedArray.length}`);


// copy array (shallow copy)
// shallow copy: values are copies, references are copies but point to same memory location
let copy = mixedArray.slice();
console.log(`copy array:`, copy, `with length: ${copy.length}`);

// proove this is a shallow copy
console.log(`points to the same object: `, Object.is(mixedArray[1], copy[1]));// returns true

// a change in copy changes also in mixArray
copy[1].a = 2;
copy[2] = 34;
//copy[45] = 'dddd';
//copy[40] = [1,2,3];
//mixedArray[1] = 'gg';

console.log(`mixed array:`, mixedArray, `with length: ${mixedArray.length}`);
console.log(`copy array:`, copy, `with length: ${copy.length}`);

// Deep copies create with JSON.stringify
let str = JSON.stringify(mixedArray);// serialize an object (creates a string representation of an object)
console.log(str);

let deepCopy = JSON.parse(str); //deserialize an object (recreates the object from the string)

console.log(`deepCopy array:`, deepCopy, `with length: ${deepCopy.length}`);
// proove this is a deep copy
console.log(`points to the same object: `, Object.is(mixedArray[1], deepCopy[1]));// false


// create array from string
let arrayFromString = "These are not the droids you're looking for".split(' ');
console.log(`arrayFromString: `, arrayFromString);

// and back to string
let strFromArray = arrayFromString.join(' ');
console.log(`strFromArray: `, strFromArray);

arrayFromString = Array.from(strFromArray);
console.log(`arrayFromString: `, arrayFromString);

// reverse an array
console.log(`mixedArray: `, mixedArray)
mixedArray.reverse();
console.log(`mixedArray reversed: `, mixedArray);

// check if a variable is array
console.log(`mixedArray isArray: `, Array.isArray(mixedArray));
console.log(`mixedArray object element isArray:`, Array.isArray(mixedArray[1]));

console.log('============== looping: for of:');
let droids = "These are not the droids you're looking for".split(' ');
for (const item of droids) {
  console.log(item);
}

console.log(`============== looping Array.forEach`) ;
droids.forEach(item => {//avoid when changing the item
  console.log(item);
})

console.log(`============== transforming with map`) ;
let otherArray = [{a:1, b:1}, {a:2, b:2}, {a:3, b:3}];
let mappedArray = otherArray.map(item => item.a);
console.log(`otherArray mapped `, otherArray, ' -> ', mappedArray)

console.log(`============== filter array`) ;
let filteredArray = otherArray.filter(item => item.a > 2);
console.log(`filtered array:`, filteredArray);


// Demo of how to extend the prototype and show 
// how a filter function similar to one existing in Array.prototype.filtercan be implemented

// How Array.prototype.filter is implemented 
// Predicate = expresses an action that returns boolean value
Array.prototype.supraFilter = function (predicate) {
  let ret = [];
  for (const item of this) {
    if (predicate(item)) ret.push(item)
  }
  return ret;
};

let supraArray = [1,2,3,4];
console.log('supraFilter: ', supraArray.supraFilter((item) => item > 2))

supraArray = [{a:1}, {a:2}, {a:3}];
console.log('supraFilter: ', supraArray.supraFilter((item) => item.a > 2))

console.log(`============== reduce array`) ;
let rezult = otherArray.reduce((acc, curr) => acc + curr.a, 0);
console.log(`result is: `, rezult);


/*
Sets
  collections of values
  A value in the Set may only occur once! (unique values)
  order matters (order is the one of addition in the set)
  there is no index
*/


let set = new Set();
set.add(1).add('s').add(2).add(1);
console.log('set is:', set);// we should be missing last 1 value

// we can iterate:
set.forEach((item) => console.log('current item is:', item))

// can add objects:
let o = {a:1};
set.add(o);
console.log('set is:', set);

// list and iterate keys:
console.log('set keys:', set.keys())
for (let item of set.keys()) console.log(item);

//list and iterate values
console.log('set values:', set.values())
for (let item of set.values()) console.log(item);


//delete value and clear:
set.delete({ a: 1 });
console.log('set values:', set, 'wont work because is not same object');// won't work because is not same object

set.delete(o)
console.log('set values:', set, 'deletes OK');

set.clear()
console.log('set values:', set);
