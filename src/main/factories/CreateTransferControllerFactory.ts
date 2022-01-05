import { ApiCreateTransferRepository } from '../../infra/repositories/ApiCreateTransferRepository';
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
    const createTransfer = new CreateTransferData(createTransferRepository);
    return new CreateTransferController(createTransfer);
  }
}
