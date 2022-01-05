import {
  makeFakeCreateTransferRepositoryStub,
  makeFakeTransferDataParams,
  makeFakeTransferModel,
} from '../test/testHelper';

import { CreateTransferData } from './CreateTransferData';
import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';

jest.mock('./../helpers/DateHelper');
jest.spyOn(DateHelper, 'isDateOverdue').mockReturnValue(false);

const makeSut = () => {
  const createTransferRepositoryStub = makeFakeCreateTransferRepositoryStub();
  const sut = new CreateTransferData(createTransferRepositoryStub);

  return { sut, createTransferRepositoryStub };
};

describe(CreateTransferData.name, () => {
  describe(CreateTransferData.prototype.create.name, () => {
    it('Should call createTransferRepository with correct params when method is invoked', async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();

      await sut.create(transferDataParams);

      expect(createTransferRepositoryStub.create).toBeCalledWith(
        transferDataParams
      );
    });

    it('Should return CreateTransferModel response when dueDate is provided and not expired', async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = {
        dueDate: new Date(),
        ...makeFakeTransferDataParams(),
      };
      const fakeTransferModel = makeFakeTransferModel();
      createTransferRepositoryStub.create.mockResolvedValueOnce(
        fakeTransferModel
      );

      const result = await sut.create(transferDataParams);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it('Should return CreateTransferModel response when success', async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();
      const fakeTransferModel = makeFakeTransferModel();
      createTransferRepositoryStub.create.mockResolvedValueOnce(
        fakeTransferModel
      );

      const result = await sut.create(transferDataParams);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it(`Should throw ${ExpiredTransferError.name} when transfer is expired`, async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = {
        dueDate: new Date(),
        ...makeFakeTransferDataParams(),
      };
      const fakeTransferModel = makeFakeTransferModel();
      createTransferRepositoryStub.create.mockResolvedValueOnce(
        fakeTransferModel
      );
      jest.spyOn(DateHelper, 'isDateOverdue').mockReturnValueOnce(true);

      const promise = sut.create(transferDataParams);

      await expect(promise).rejects.toThrow(new ExpiredTransferError());
    });

    it('Should throw when createTransferRepository throws', async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();
      createTransferRepositoryStub.create.mockRejectedValueOnce(
        new Error('any_createTransferRepository_error')
      );

      const promise = sut.create(transferDataParams);

      await expect(promise).rejects.toThrow(
        new Error('any_createTransferRepository_error')
      );
    });
  });
});
