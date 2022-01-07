import { TooManyRequestsError } from './TooManyRequestsError';

const makeSut = () => {
  const sut = new TooManyRequestsError();

  return { sut };
};

describe(TooManyRequestsError.name, () => {
  it('Should have correct attributes when instantiated', async () => {
    const { sut } = makeSut();

    const message = sut.message;
    const name = sut.name;

    expect(name).toBe('TooManyRequestsError');
    expect(message).toBe('Too many requests to the endpoint');
  });
});
