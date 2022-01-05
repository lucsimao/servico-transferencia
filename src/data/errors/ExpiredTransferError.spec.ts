import { ExpiredTransferError } from './ExpiredTransferError';

const makeSut = () => {
  const sut = new ExpiredTransferError();

  return { sut };
};

describe(ExpiredTransferError.name, () => {
  it('Should have correct attributes when instantiated', async () => {
    const { sut } = makeSut();

    const message = sut.message;
    const name = sut.name;

    expect(name).toBe('ExpiredTransfer');
    expect(message).toBe('This transfer is expired');
  });
});
