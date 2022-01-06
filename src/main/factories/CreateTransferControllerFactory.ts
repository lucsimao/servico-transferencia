import { ApiCreateTransferRepository } from '../../infra/repositories/ApiCreateTransferRepository';
import { ApiGetTransferRepository } from '../../infra/repositories/ApiGetTransferRepository';
import { CreateTransferController } from '../../presentation/controllers/CreateTransferController';
import { CreateTransferData } from '../../data/use-cases/CreateTransferData';
import Env from '../config/Env';
import { GotAdapter } from '../../infra/http-client/GotAdapter';

export class CreateTransferControllerFactory {
  public static create() {
    const uri = Env.servicesAddress.paymentOrders;
    const httpClient = new GotAdapter();
    const createTransferRepository = new ApiCreateTransferRepository(
      uri,
      httpClient
    );
    const getTransferRepository = new ApiGetTransferRepository(uri, httpClient);
    const createTransfer = new CreateTransferData(
      createTransferRepository,
      getTransferRepository
    );
    const result = new CreateTransferController(createTransfer);

    return result;
  }
}
