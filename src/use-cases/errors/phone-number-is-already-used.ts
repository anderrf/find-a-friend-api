export class PhoneNumberIsAlreadyUsedError extends Error {
  constructor() {
    super('Phone number is already used')
  }
}
