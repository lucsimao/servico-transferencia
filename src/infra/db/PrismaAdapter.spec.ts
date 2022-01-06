import { PrismaClient, Transfer } from '@prisma/client';
import { makePrismaStub, makeTransferStub } from '../test/testHelper';

import { PrismaAdapter } from './PrismaAdapter';
import { makeFakeTransferModel } from '../../data/test/testHelper';

jest.mock('@prisma/client');

const makeSut = () => {
  const transferStub = makeTransferStub();
  const prismaStub = makePrismaStub(transferStub) as jest.Mocked<PrismaClient>;
  const sut = new PrismaAdapter(prismaStub);

  return { sut, prismaStub, transferStub };
};

describe(PrismaAdapter.name, () => {
  describe(PrismaAdapter.prototype.find.name, () => {
    it('Should call findFirst when method is called', async () => {
      const { sut, transferStub } = makeSut();
      const fakeExternalId = 'any_string';

      await sut.find(fakeExternalId);

      expect(transferStub.findFirst).toBeCalledWith({
        where: { externalId: 'any_string' },
      });
    });

    it('Should return correct value when findFirst return incomplete transfer', async () => {
      const { sut, transferStub } = makeSut();
      const fakeExternalId = 'any_string';
      transferStub.findFirst.mockResolvedValueOnce({
        externalId: '',
      } as Transfer);

      const result = await sut.find(fakeExternalId);

      expect(result).toEqual({
        amount: undefined,
        expectedOn: undefined,
        externalId: '',
        internalId: '',
        status: undefined,
      });
    });

    it('Should return correct value when method is called', async () => {
      const { sut } = makeSut();
      const fakeExternalId = 'any_string';

      const result = await sut.find(fakeExternalId);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it('Should throw Error when findFirst returns null', async () => {
      const { sut, transferStub } = makeSut();
      const fakeExternalId = 'any_string';
      transferStub.findFirst.mockResolvedValueOnce(null);

      const promise = sut.find(fakeExternalId);

      await expect(promise).rejects.toThrow(new Error('Transfer not Found'));
    });

    it('Should throw when findFirst throws', async () => {
      const { sut, transferStub } = makeSut();
      const fakeExternalId = 'any_string';
      transferStub.findFirst.mockRejectedValueOnce(
        new Error('any_find_first_error')
      );

      const promise = sut.find(fakeExternalId);

      await expect(promise).rejects.toThrow(new Error('any_find_first_error'));
    });
  });

  describe(PrismaAdapter.prototype.save.name, () => {
    it('Should call create when incomplete TransferModel is provided', async () => {
      const { sut, transferStub } = makeSut();
      const fakeModel = {};

      await sut.save(fakeModel);

      expect(transferStub.create).toBeCalledWith({
        data: {
          amount: undefined,
          expectedOn: undefined,
          externalId: undefined,
          internalId: undefined,
          status: undefined,
        },
      });
    });

    it('Should call create when method is called', async () => {
      const { sut, transferStub } = makeSut();
      const fakeModel = makeFakeTransferModel();

      await sut.save(fakeModel);

      expect(transferStub.create).toBeCalledWith({ data: fakeModel });
    });

    it('Should throw when create throws', async () => {
      const { sut, transferStub } = makeSut();
      const fakeModel = makeFakeTransferModel();
      transferStub.create.mockRejectedValueOnce(new Error('any_create_error'));

      const promise = sut.save(fakeModel);

      await expect(promise).rejects.toThrow(new Error('any_create_error'));
    });
  });

  describe(PrismaAdapter.prototype.update.name, () => {
    it('Should call create when method is created', async () => {
      const { sut, transferStub } = makeSut();
      const fakeExternalId = 'any_string';
      const fakeModel = makeFakeTransferModel();

      await sut.update(fakeExternalId, fakeModel);

      expect(transferStub.update).toBeCalledWith({
        where: {
          externalId: 'any_string',
        },
        data: makeFakeTransferModel(),
      });
    });

    it('Should return correct value when findFirst return incomplete transfer', async () => {
      const { sut, transferStub } = makeSut();
      const fakeExternalId = 'any_string';
      const fakeModel = makeFakeTransferModel();
      transferStub.findFirst.mockResolvedValueOnce({
        externalId: '',
      } as Transfer);

      const result = await sut.update(fakeExternalId, fakeModel);

      expect(result).toEqual(makeFakeTransferModel());
    });

    it('Should throw when create throws', async () => {
      const { sut, transferStub } = makeSut();
      const fakeModel = makeFakeTransferModel();
      transferStub.create.mockRejectedValueOnce(new Error('any_create_error'));

      const promise = sut.save(fakeModel);

      await expect(promise).rejects.toThrow(new Error('any_create_error'));
    });
  });
});
