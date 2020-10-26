export class BaseModel {
  id;
  createdDate;
  changedDate;

  constructor() {
    this.id = -1;
    this.createdDate = Date.now();
    this.changedDate = Date.now();
  }
}