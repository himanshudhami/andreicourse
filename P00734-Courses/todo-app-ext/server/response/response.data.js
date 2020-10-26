export class ResponseData {
  code;
  hasError;
  error;
  data;

  constructor(data, error) {
    this.error = error;
    this.data = data;
    this.hasError = error ? true: false;
  }
}