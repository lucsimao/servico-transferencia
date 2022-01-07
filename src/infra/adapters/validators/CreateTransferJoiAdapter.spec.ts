import CreateTransferJoiAdapter from './CreateTransferJoiAdapter';
import { makeFakeTransferDataParams } from '../../../data/test/testHelper';
import schema from './schemas/TransferSchema';

jest.mock('joi', () => {
  return {
    number: jest.fn().mockReturnThis(),
    required: jest.fn().mockReturnThis(),
    date: jest.fn().mockReturnThis(),
    iso: jest.fn().mockReturnThis(),
    object: jest.fn().mockReturnThis(),
    validate: jest.fn(),
  };
});
jest
  .spyOn(schema, 'validate')
  .mockReturnValue({ value: makeFakeTransferDataParams(), error: undefined });

const makeSut = () => {
  const sut = new CreateTransferJoiAdapter();

  return { sut };
};

describe(CreateTransferJoiAdapter.name, () => {
  describe(CreateTransferJoiAdapter.prototype.validate.name, () => {
    it('Should call value when method is called', () => {
      const { sut } = makeSut();
      const validateSpy = jest.spyOn(schema, 'validate');

      const param = makeFakeTransferDataParams();

      sut.validate(param);

      expect(validateSpy).toBeCalledWith(param, {
        abortEarly: false,
        stripUnknown: true,
      });
    });

    it('Should return value when method is called', () => {
      const { sut } = makeSut();
      const param = makeFakeTransferDataParams();

      const result = sut.validate(param);

      expect(result).toEqual({ amount: 999, externalId: 'any_external_id' });
    });

    it('Should throw value when method throws', () => {
      const { sut } = makeSut();
      const param = makeFakeTransferDataParams();
      (jest.spyOn(schema, 'validate') as jest.Mock).mockReturnValueOnce({
        value: makeFakeTransferDataParams(),
        error: {
          details: [
            { message: 'any_error_message' },
            { message: 'another_error_message' },
          ],
        },
      });

      expect(() => sut.validate(param)).toThrow(
        new Error(
          'Please check the following validation errors: any_error_message another_error_message'
        )
      );
    });
  });
});
