import { Injectable } from '@angular/core';
import { IMerchantAdminService } from './imerchant-admin.service';
import { Observable, of } from 'rxjs';
import { IMerchantAdminTransaction } from './models/merchants-admin.model';

interface IV4MerchantAdminTransaction {
  id: number;
  user_account_id: number;
  updated_at: string;
  transaction_type: string;
  amount: number;
  transaction_date: string;
  currency: string;
  workflow_id?: number | null;
  created_at: string;
  properties?: string | null;
  transaction_reference: string;
}

interface IV4CreateTransactionResponse {
  data: IV4MerchantAdminTransaction;
}

@Injectable({
  providedIn: 'root'
})
export class V4MerchantAdminService implements IMerchantAdminService {

  public static v4TransactionToTransaction(transaction: IV4CreateTransactionResponse): IMerchantAdminTransaction {
    return {
      id: transaction.data.id,
      user_account_id: transaction.data.user_account_id,
      updated_at: new Date(transaction.data.updated_at),
      transaction_type: transaction.data.transaction_type,
      amount: transaction.data.amount,
      transaction_date: new Date(transaction.data.transaction_date),
      currency: transaction.data.currency,
      workflow_id: transaction.data.workflow_id,
      created_at: new Date(transaction.data.created_at),
      properties: transaction.data.properties,
      transaction_reference: transaction.data.transaction_reference
    };
  }

  public createTransaction(): Observable<IMerchantAdminTransaction> {
    const response: IV4CreateTransactionResponse = {
        data: {
            id: 700,
            user_account_id: 5852,
            updated_at: "2019-09-12T09:07:21.283Z",
            transaction_type: "some_cool_type",
            amount: 400,
            transaction_date: "2019-09-12T09:07:21.272Z",
            currency: "HKD",
            workflow_id: null,
            created_at: "2019-09-12T09:07:21.283Z",
            properties: null,
            transaction_reference: "some_cool_reference"
        }
    }

    const transaction = V4MerchantAdminService.v4TransactionToTransaction(response);
    return of(transaction);
    }
}
