export interface Validator<T> {
  isValid: (el: T) => boolean;
  tryFormat: (el: T) => T | Error;
}
