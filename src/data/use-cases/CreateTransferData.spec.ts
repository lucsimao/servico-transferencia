import { CreateTransferData } from './CreateTransferData';
import { CreateTransferParams } from '../../domain/use-cases/CreateTransfer';
import { CreateTransferRepository } from '../interfaces/repositories/CreateTransferRepository';
import { DateHelper } from './../helpers/DateHelper';
import { ExpiredTransferError } from '../errors/ExpiredTransferError';
import { TransferModel } from './../../domain/models/TransferModel';
import { TransferStatusEnum } from './../../domain/enums/TransferStatusEnum';

jest.mock('./../helpers/DateHelper');
jest.spyOn(DateHelper, 'isDateOverdue').mockReturnValue(false);

const makeFakeCreateTransferRepositoryStub =
  (): jest.Mocked<CreateTransferRepository> => ({
    create: jest.fn(),
  });

const makeFakeTransferDataParams = (): CreateTransferParams => ({
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
});

const makeFakeTransferModel = (): TransferModel => ({
  internalId: 'any_internal_id',
  externalId: 'any_external_id',
  amount: 999,
  expectedOn: new Date('03/01/2022'),
  status: TransferStatusEnum.CREATED,
});

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
