import { InvalidParamsError } from './InvalidParamsError';

const makeSut = () => {
  const sut = new InvalidParamsError('any_message');

  return { sut };
};

describe(InvalidParamsError.name, () => {
  it('Should have correct attributes when instantiated', async () => {
    const { sut } = makeSut();

    const message = sut.message;
    const name = sut.name;

    expect(name).toBe('InvalidParamsError');
    expect(message).toBe('any_message');
  });
});
