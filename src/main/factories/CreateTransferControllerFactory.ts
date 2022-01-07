import { ApiCreateTransferRepository } from '../../infra/repositories/ApiCreateTransferRepository';
import { ApiGetTransferRepository } from '../../infra/repositories/ApiGetTransferRepository';
import { CreateTransferController } from '../../presentation/controllers/CreateTransferController';
import { CreateTransferData } from '../../data/use-cases/CreateTransferData';
import CreateTransferJoiAdapter from '../../infra/adapters/validators/CreateTransferJoiAdapter';
import { DatabasePersistenceTransferRepository } from '../../infra/repositories/DatabasePersistenceTransferRepository';
import Env from '../config/Env';
import { GotAdapter } from '../../infra/adapters/http-client/GotAdapter';
import { PrismaAdapter } from '../../infra/adapters/db/PrismaAdapter';
import { PrismaClient } from '@prisma/client';

export class CreateTransferControllerFactory {
  public static create() {
    const uri = Env.servicesAddress.paymentOrders;
    const httpClient = new GotAdapter();
    const createTransferRepository = new ApiCreateTransferRepository(
      uri,
      httpClient
    );
    const getTransferRepository = new ApiGetTransferRepository(uri, httpClient);
    const prismaClient = new PrismaAdapter(new PrismaClient());
    const persistenceTransferRepository =
      new DatabasePersistenceTransferRepository(prismaClient);

    const createTransfer = new CreateTransferData(
      createTransferRepository,
      getTransferRepository,
      persistenceTransferRepository
    );

    const createTransferValidator = new CreateTransferJoiAdapter();

    const result = new CreateTransferController(
      createTransfer,
      createTransferValidator
    );

    return result;
  }
}
