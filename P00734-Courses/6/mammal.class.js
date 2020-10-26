import { Base } from './base.class.js';

export class Mammal extends Base { /* abstract */
  constructor(age, gender) {
    super();
    this.age = age; // property
    this.gender = gender; // property
  }

  /*private*/ sayAge = () => {
    console.log(`I am ${this.age} years old`);
  }

  /*private*/ sayGender = () => {
    console.log(`I am ${this.gender}`);
  }

  getIntroduction() {
    this.sayType();
    
    this.sayAge();
    this.sayGender();

  }

}