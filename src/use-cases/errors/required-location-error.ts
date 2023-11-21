export class RequiredLocationError extends Error {
  constructor() {
    super('Both city and state fields are required')
  }
}
