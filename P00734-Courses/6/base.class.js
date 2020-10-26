export class Base { /* abstract */
  #className = 'Base';

  sayType() {
    console.log(`My type is :`, this.typeAsString())
  }

  typeAsString() {
    return this.constructor.name;
    //return Object.getPrototypeOf(this)
  }
}