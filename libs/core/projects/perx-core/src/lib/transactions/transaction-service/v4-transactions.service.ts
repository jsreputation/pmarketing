import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { TransactionsService } from './transactions.service';
import { IConfig } from '../../config/models/config.model';
import { Observable } from 'rxjs';
import {
  ITransaction,
  ITransactionProperties
} from '../models/transactions.model';
import { map } from 'rxjs/operators';

export type V4TenantTransactionProperties =
  IV4TransactionPropertiesAbenson
  | IV4TransactionPropertiesMerck
  | IV4TransactionPropertiesAllit
  | IV4TransactionPropertiesCashback;

interface IV4TransactionsResponse {
  data: IV4Transaction[];
}
interface IV4Transaction {
  id: number;
  user_account_id: number;
  updated_at: Date;
  transaction_type: string;
  amount: number;
  transaction_date: Date;
  currency?: string;
  workflow_id?: string;
  created_at: Date;
  properties: V4TenantTransactionProperties;
  transaction_reference: string;
  points_earned: number;
  merchant_user_account_id?: number;
}

export interface IV4TransactionPropertiesAbenson {
  tenant: 'abenson';
  qty: number;
  reg: number;
  sku: number;
  store: number;
  trxno: number;
  untprc: number;
  cashier: number;
  company: number;
  trxdate: number;
  trxtime: number;
  mobileno: string;
  store_name: string;
}

export interface IV4TransactionPropertiesMerck {
  tenant: 'merck';
  product: string;
  pharmacy: string;
  merchant_username: string;
  merchant_account_id: number;
}

export interface IV4TransactionPropertiesAllit {
  tenant: 'allit';
  amount: number;
  quantity: number;
  item_code: number;
  item_name: string;
  amount_net: number;
  amount_std: number;
  amount_txn: number;
  guid_store: string;
  amount_json: {};
  branch_code: string;
  guid_branch: string;
  amount_signum: number;
  reference_doc: string;
  amount_tax_gst: number;
  amount_tax_wht: number;
  invoice_number: number;
  amount_discount: number;
  category_level_0: string;
  category_level_1: string;
  amount_gst_balance: number;
  amount_wht_balance: number;
  amount_open_balance: number;
  transaction_item_guid: string;
  transaction_line_guid: string;
}

export interface IV4TransactionPropertiesCashback {
  tenant: 'perx'; // temporary template tenant name?
  merchant_name: string;
  item_name: string;
  outlet_name: string;
}

@Injectable({
  providedIn: 'root'
})
export class V4TransactionsService extends TransactionsService {
  private apiHost: string;

  constructor(
    private http: HttpClient,
    private configService: ConfigService
  ) {
    super();
    this.configService.readAppConfig().subscribe(
      (config: IConfig<void>) => {
        this.apiHost = config.apiHost as string;
      });
  }

  private static v4TransactionsToTransactions(transaction: IV4Transaction): ITransaction {
    return {
      id: transaction.id,
      transactionType: transaction.transaction_type,
      transactionDate: transaction.transaction_date,
      amount: transaction.amount,
      currency: transaction.currency,
      properties: V4TransactionsService.v4TransactionPropertiesToTransactionProperties(transaction.properties),
      transactionReference: transaction.transaction_reference,
      pointsEarned: transaction.points_earned
    };
  }

  public static v4TransactionPropertiesToTransactionProperties(pthProps: V4TenantTransactionProperties): ITransactionProperties {
    let data: ITransactionProperties = {};

    if (pthProps && (pthProps as IV4TransactionPropertiesAbenson).sku) {
      const props = (pthProps as IV4TransactionPropertiesAbenson);
      data = {
        productCode: props.sku.toString(),
        // productName: undefined,
        quantity: props.qty,
        storeCode: props.store.toString(),
        storeName: props.store_name
      };
    }
    if (pthProps && (pthProps as IV4TransactionPropertiesAllit).guid_branch) {
      const props = (pthProps as IV4TransactionPropertiesAllit);
      data = {
        productCode: props.item_code.toString(),
        productName: props.item_name,
        quantity: props.quantity,
        storeCode: props.branch_code,
        // storeName: undefined
      };
    }
    if (pthProps && (pthProps as IV4TransactionPropertiesMerck).product) {
      const props = (pthProps as IV4TransactionPropertiesMerck);
      data = {
        // productCode: undefined,
        productName: props.product,
        // quantity: undefined,
        // storeCode: undefined,
        storeName: props.pharmacy
      };
    }
    if (pthProps && (pthProps as IV4TransactionPropertiesCashback).merchant_name) {
      const props = (pthProps as IV4TransactionPropertiesCashback);
      data = {
        productName: props.item_name,
        storeCode: props.merchant_name,
        storeName: props.outlet_name
      };
    }
    return data;
  }

  public getTransactions(): Observable<ITransaction[]> {
    return this.http.get(`${this.apiHost}/v4/transactions`).pipe(
      map((res: IV4TransactionsResponse) => res.data),
      map((transactions: IV4Transaction[]) =>
        transactions.map(transaction => V4TransactionsService.v4TransactionsToTransactions(transaction))
      )
    );
  }
}
