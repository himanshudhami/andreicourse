import { Mammal } from "./mammal.class.js";

export class Cat extends Mammal {
  constructor(name, age, gender) {
    super(age, gender);
    this.name = name;
  }

  sayName = () => {
    console.log(`Miaaw name is ${this.name} and I am ${this.constructor.name}`);
  }

  miaws = (moodMiaw) => {
    console.log(moodMiaw);
  }

  purrs = () => {
    console.log('rrrrrrrrr rrrrrrrrr rrrrrrrrr');
  }


  getIntroduction = (moodMiaw) => {
    this.miaws(moodMiaw);
    this.sayName();
    super.getIntroduction();
    this.purrs()
  }
}