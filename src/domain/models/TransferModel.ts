export interface TransferModel {
  internalId: string;
  externalId: string;
  status: 'APPROVED' | 'PENDING' | 'CREATED' | 'SCHEDULED' | 'REJECTED';
  amount: number;
  expectedOn: Date;
}
