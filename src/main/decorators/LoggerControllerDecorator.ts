import { ApiHttpRequest, ApiHttpResponse } from '../../presentation/interfaces';

import { Controller } from '../../presentation/interfaces/Controller';
import { Logger } from '../../infra/interfaces/logger/Logger';

export class LoggerControllerDecorator<T, K> implements Controller<T, K> {
  constructor(
    private readonly controller: Controller<T, K>,
    private readonly logger: Logger
  ) {}

  async handle(
    apiHttpRequest: ApiHttpRequest<T>
  ): Promise<ApiHttpResponse<K | Error>> {
    try {
      const result = await this.controller.handle(apiHttpRequest);
      this.logger.info({
        msg: `Controller result: ${result.statusCode} - ${result.body}`,
      });

      return result;
    } catch (error) {
      this.logger.error({ msg: String(error) });
      throw error;
    }
  }
}
