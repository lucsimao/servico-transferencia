import { AmountHelper } from './AmountHelper';

const makeSut = () => {
  const sut = AmountHelper;

  return { sut };
};

describe(AmountHelper.name, () => {
  describe(AmountHelper.roundToTwoDecimalPlaces.name, () => {
    it('Should round to floor when third place is less than 5', () => {
      const { sut } = makeSut();
      const number = 1.094;

      const result = sut.roundToTwoDecimalPlaces(number);

      expect(result).toBe(1.09);
    });

    it('Should round to ceil when second place is 9 and next is equal to 5', () => {
      const { sut } = makeSut();
      const number = 1.095;

      const result = sut.roundToTwoDecimalPlaces(number);

      expect(result).toBe(1.1);
    });

    it('Should round to ceil when second place is 9 and next is greater than 5', () => {
      const { sut } = makeSut();
      const number = 1.099;

      const result = sut.roundToTwoDecimalPlaces(number);

      expect(result).toBe(1.1);
    });

    it('Should round to floor when first and second places is 9 and third place is greater than 5', () => {
      const { sut } = makeSut();
      const number = 1.994;

      const result = sut.roundToTwoDecimalPlaces(number);

      expect(result).toBe(1.99);
    });

    it('Should round to ceil when first and second places is 9 and third place is greater than 5', () => {
      const { sut } = makeSut();
      const number = 1.996;

      const result = sut.roundToTwoDecimalPlaces(number);

      expect(result).toBe(2);
    });
  });
});
