import { Router } from 'express';
import openapi from 'openapi-comment-parser';
import openapiConfig from '../../openapirc';
import swaggerUi from 'swagger-ui-express';

export class SwaggerUiRoutes {
  public static setRoutes(router: Router): void {
    const apiSchema = openapi(openapiConfig);

    router.use('/docs', swaggerUi.serve, swaggerUi.setup(apiSchema));
  }
}
