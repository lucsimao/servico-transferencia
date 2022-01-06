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
  });
});
