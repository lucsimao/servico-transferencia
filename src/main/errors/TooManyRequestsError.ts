export class TooManyRequestsError extends Error {
  constructor() {
    super('Too many requests to the endpoint');
    this.name = 'TooManyRequestsError';
  }
}
