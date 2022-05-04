import { oc } from 'ts-optchain';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { TransactionsService } from './transactions.service';
import { IConfig } from '../../config/models/config.model';
import { Observable } from 'rxjs';
import { ITransaction, ITransactionProperties } from '../models/transactions.model';
import { map } from 'rxjs/operators';

const DEFAULT_PAGE_COUNT: number = 25;

export type V4TenantTransactionProperties =
  IV4TransactionPropertiesAbenson
  | IV4TransactionPropertiesMerck
  | IV4TransactionPropertiesAllit
  | IV4TransactionPropertiesMerchant;

interface IV4TransactionsResponse {
  data: IV4Transaction[];
  meta: {
    count: number;
    total_count: number;
  };
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
  meta?: {
    count: number;
    total_count: number;
  };
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

export interface IV4TransactionPropertiesMerchant {
  tenant: 'perx'; // temporary template tenant name?
  merchant_name: string;
  item_name: string;
  outlet_name: string;
  description: string;
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

  private static v4TransactionsToTransactions(transaction: IV4Transaction, razerStampsCount: number): ITransaction {
    return {
      id: transaction.id,
      transactionType: transaction.transaction_type,
      transactedAt: transaction.transaction_date,
      amount: transaction.amount,
      currency: transaction.currency,
      properties: V4TransactionsService.v4TransactionPropertiesToTransactionProperties(transaction.properties),
      transactionReference: transaction.transaction_reference,
      pointsEarned: transaction.points_earned,
      razerStampsCount
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
        invoiceNumber: props.invoice_number
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
    if (pthProps && (pthProps as IV4TransactionPropertiesMerchant).merchant_name) {
      const props = (pthProps as IV4TransactionPropertiesMerchant);
      data = {
        productName: props.item_name,
        storeCode: props.merchant_name,
        storeName: props.outlet_name
      };
    }
    return data;
  }

  public getTransactions(
    page: number = 1,
    pageSize: number = DEFAULT_PAGE_COUNT,
    startAmount?: number,
    state?: string,
    endDate?: Date,
    transactionType?: string
  ): Observable<ITransaction[]> {
    const razerParams: {} = startAmount !== undefined ? {
      start_amount: `${startAmount}`,
      state: state || 'pending|processed'
    } : {};
    const queryParams = {
      params: {
        page: `${page}`,
        size: `${pageSize}`,
        ...razerParams
      }
    };
    if (endDate) {
      queryParams.params = {...queryParams.params, ...{end_date: endDate.toISOString()}};
    }
    if (transactionType) {
      queryParams.params = {...queryParams.params, ...{ transaction_type: `${transactionType}`}};
    }
    return this.http.get(`${this.apiHost}/v4/transactions`,
      queryParams).pipe(
        map((res: IV4TransactionsResponse) => ({ transactions: res.data, totalCount: oc(res).meta.total_count(0) })),
        map((transactionsObj: { transactions: IV4Transaction[], totalCount: number }) => (
          transactionsObj.transactions.map(transaction => V4TransactionsService.v4TransactionsToTransactions(transaction,
            transactionsObj.totalCount)))
        )
      );
  }

  public getTransactionSummary(state?: string, endDate?: Date): Observable<{ totalAmount: number }> {
    let params = {
      state: state || 'pending|processed'
    };
    if (endDate) {
      params = {...params, ...{end_date: endDate.toISOString()}};
    }
    return this.http.get(`${this.apiHost}/v4/transaction_summary`, { params }).pipe(
      map((res: { data: { total_amount: number } }) => ({ totalAmount: +res.data.total_amount || 0 }))
    );
  }

  public getTransactionsCountByType(transactionType: string, endDate?: Date): Observable<number> {
    const queryParams = {
      params: {
        transaction_type: `${transactionType}`
      }
    };
    if (endDate) {
      queryParams.params = {...queryParams.params, ...{end_date: endDate.toISOString()}};
    }
    return this.http.get(`${this.apiHost}/v4/transactions`, queryParams).pipe(
      map((transactions: IV4TransactionsResponse) => transactions.meta.count));
  }
}
