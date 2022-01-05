import { CreateTransferController } from '../../presentation/controllers/CreateTransferController';
import { CreateTransferData } from '../../data/use-cases/CreateTransferData';
import Env from '../config/Env';
import { GotAdapter } from '../../infra/http-client/GotAdapter';

export class CreateTransferControllerFactory {
  public static create() {
    const uri = Env.servicesAddress.paymentOrders;
    const httpClient = new GotAdapter();
    const createTransfer = new CreateTransferData(uri, httpClient);
    return new CreateTransferController(createTransfer);
  }
}
