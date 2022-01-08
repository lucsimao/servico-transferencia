import {
  makeCreateTransferRepositoryStub,
  makeFakeTransferDataParams,
  makeFakeTransferModel,
  makeGetTransferRepositoryStub,
  makePersistenceTransferRepository,
} from '../test/testHelper';

import { CreateTransferData } from './CreateTransferData';
import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';

jest.mock('./../helpers/DateHelper');
jest.spyOn(DateHelper, 'isDateOverdue').mockReturnValue(false);
jest.useFakeTimers().setSystemTime(new Date().getTime());

const makeSut = () => {
  const createTransferRepositoryStub = makeCreateTransferRepositoryStub();
  const getTransferRepositoryStub = makeGetTransferRepositoryStub();
  const persistenceTransferRepositoryStub = makePersistenceTransferRepository();

  const sut = new CreateTransferData(
    createTransferRepositoryStub,
    getTransferRepositoryStub,
    persistenceTransferRepositoryStub
  );

  return {
    sut,
    createTransferRepositoryStub,
    getTransferRepositoryStub,
    persistenceTransferRepositoryStub,
  };
};

describe(CreateTransferData.name, () => {
  describe(CreateTransferData.prototype.create.name, () => {
    it('Should call createTransferRepository with correct date when expectedOn is provided', async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = {
        expectedOn: new Date('03-12-15'),
        ...makeFakeTransferDataParams(),
      };

      await sut.create(transferDataParams);

      expect(createTransferRepositoryStub.create).toBeCalledWith({
        expectedOn: new Date('03-12-15'),
        ...makeFakeTransferDataParams(),
      });
    });

    it('Should call createTransferRepository with correct params when method is invoked', async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();

      await sut.create(transferDataParams);

      expect(createTransferRepositoryStub.create).toBeCalledWith({
        amount: 999,
        expectedOn: new Date(),
        externalId: 'any_external_id',
      });
    });

    it('Should call getTransferRepository with correct params when method is invoked', async () => {
      const { sut, getTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();

      await sut.create(transferDataParams);

      expect(getTransferRepositoryStub.get).toBeCalledWith('any_internal_id');
    });

    it('Should call persistenceTransferRepository with correct params when method is invoked', async () => {
      const { sut, persistenceTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();

      await sut.create(transferDataParams);

      expect(persistenceTransferRepositoryStub.save).toBeCalledWith(
        transferDataParams
      );
      expect(persistenceTransferRepositoryStub.update).toHaveBeenNthCalledWith(
        1,
        2,
        {
          internalId: 'any_internal_id',
        }
      );
      expect(persistenceTransferRepositoryStub.update).toHaveBeenNthCalledWith(
        2,
        2,
        makeFakeTransferModel()
      );
    });

    it('Should return CreateTransferModel response when expectDate is provided and not expired', async () => {
      const { sut, createTransferRepositoryStub } = makeSut();
      const transferDataParams = {
        expectedOn: new Date('03-12-15'),
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
        expectedOn: new Date(),
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

    it('Should throw when getTransferRepository throws', async () => {
      const { sut, getTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();
      getTransferRepositoryStub.get.mockRejectedValueOnce(
        new Error('any_get_error')
      );

      const promise = sut.create(transferDataParams);

      await expect(promise).rejects.toThrow(new Error('any_get_error'));
    });

    it('Should throw when persistenceTransferRepository.save throws', async () => {
      const { sut, persistenceTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();
      persistenceTransferRepositoryStub.save.mockRejectedValueOnce(
        new Error('any_save_error')
      );

      const promise = sut.create(transferDataParams);

      await expect(promise).rejects.toThrow(new Error('any_save_error'));
    });

    it('Should throw when persistenceTransferRepository.update throws', async () => {
      const { sut, persistenceTransferRepositoryStub } = makeSut();
      const transferDataParams = makeFakeTransferDataParams();
      persistenceTransferRepositoryStub.update.mockRejectedValueOnce(
        new Error('any_update_error')
      );

      const promise = sut.create(transferDataParams);

      await expect(promise).rejects.toThrow(new Error('any_update_error'));
    });
  });
});
