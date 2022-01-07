import { CreateTransferParams } from '../../../domain/use-cases/CreateTransfer';
import { ValidationError } from 'joi';
import schema from './schemas/TransferSchema';

const errorMessage = 'Please check the following validation errors';

export default class CreateTransferJoiAdapter {
  public validate(value: CreateTransferParams): CreateTransferParams {
    const result = schema.validate(value, {
      abortEarly: false,
      stripUnknown: true,
    });

    if (result.error) {
      throw new Error(
        this.getSchemaErrorValidation(result.error, errorMessage)
      );
    }

    return result.value;
  }

  private getSchemaErrorValidation(
    validationErrors: ValidationError,
    message: string
  ): string {
    const schemaErrorDetails = validationErrors.details
      .map((errorDetail) => errorDetail.message)
      .join(' ');

    return `${message}: ${schemaErrorDetails}`;
  }
}
