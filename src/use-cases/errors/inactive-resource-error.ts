export class InactiveResourceError extends Error {
  constructor() {
    super('Inactive resource')
  }
}
