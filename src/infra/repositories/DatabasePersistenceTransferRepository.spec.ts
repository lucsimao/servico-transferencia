import { DatabasePersistenceTransferRepository } from './DatabasePersistenceTransferRepository';
import { makeDbClientStub } from '../test/testHelper';
import { makeFakeTransferModel } from '../../data/test/testHelper';

const makeSut = () => {
  const dbClientStub = makeDbClientStub();

  const sut = new DatabasePersistenceTransferRepository(dbClientStub);

  return { sut, dbClientStub };
};

describe(DatabasePersistenceTransferRepository.name, () => {
  describe(DatabasePersistenceTransferRepository.prototype.find.name, () => {
    it('Should call find when method is called', async () => {
      const { sut, dbClientStub } = makeSut();
      const fakeExternalId = 'any_external_id';

      await sut.find(fakeExternalId);

      expect(dbClientStub.find).toHaveBeenCalledWith('any_external_id');
    });

    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeExternalId = 'any_external_id';

      const result = await sut.find(fakeExternalId);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it('Should throw when find throws', async () => {
      const { sut, dbClientStub } = makeSut();
      const fakeExternalId = 'any_external_id';
      dbClientStub.find.mockRejectedValueOnce(new Error('any_find_error'));

      const promise = sut.find(fakeExternalId);

      await expect(promise).rejects.toThrow(new Error('any_find_error'));
    });
  });

  describe(DatabasePersistenceTransferRepository.prototype.save.name, () => {
    it('Should call save when method is called', async () => {
      const { sut, dbClientStub } = makeSut();
      const fakeTransferModel = makeFakeTransferModel();

      await sut.save(fakeTransferModel);

      expect(dbClientStub.save).toHaveBeenCalledWith(makeFakeTransferModel());
    });

    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeTransferModel = makeFakeTransferModel();

      const result = await sut.save(fakeTransferModel);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it('Should throw when save throws', async () => {
      const { sut, dbClientStub } = makeSut();
      const fakeTransferModel = makeFakeTransferModel();
      dbClientStub.save.mockRejectedValueOnce(new Error('any_find_error'));

      const promise = sut.save(fakeTransferModel);

      await expect(promise).rejects.toThrow(new Error('any_find_error'));
    });
  });

  describe(DatabasePersistenceTransferRepository.prototype.update.name, () => {
    it('Should call save when method is called', async () => {
      const { sut, dbClientStub } = makeSut();
      const fakeTransferModel = makeFakeTransferModel();
      const fakeExternalId = 'any_external_id';

      await sut.update(fakeExternalId, fakeTransferModel);

      expect(dbClientStub.update).toHaveBeenCalledWith(
        fakeExternalId,
        makeFakeTransferModel()
      );
    });

    it('Should return value when method is called', async () => {
      const { sut } = makeSut();
      const fakeTransferModel = makeFakeTransferModel();
      const fakeExternalId = 'any_external_id';

      const result = await sut.update(fakeExternalId, fakeTransferModel);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it('Should throw when update throws', async () => {
      const { sut, dbClientStub } = makeSut();
      const fakeTransferModel = makeFakeTransferModel();
      const fakeExternalId = 'any_external_id';
      dbClientStub.update.mockRejectedValueOnce(new Error('any_find_error'));

      const promise = sut.update(fakeExternalId, fakeTransferModel);

      await expect(promise).rejects.toThrow(new Error('any_find_error'));
    });
  });
});
