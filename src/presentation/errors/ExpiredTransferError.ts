export class ExpiredTransferError extends Error {
  constructor() {
    super('This transfer is expired');
    this.name = 'ExpiredTransfer';
  }
}
