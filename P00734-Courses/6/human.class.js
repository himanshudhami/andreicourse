import { Mammal } from "./mammal.class.js";

export class Human extends Mammal {
  constructor(name, age, gender) {
    super(age, gender);
    this.name = name;
  }

  sayName = () => {
    console.log(`My name is ${this.name} and I am ${this.constructor.name}`);
  }

  speak = (words) => {
    console.log(words);
  }
  

  getIntroduction = (words) => {
    this.speak(words);
    this.sayName();
    super.getIntroduction();

  }

}