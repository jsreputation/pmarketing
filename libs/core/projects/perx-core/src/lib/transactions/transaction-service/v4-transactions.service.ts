import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../../config/config.service';
import { TransactionsService } from './transactions.service';
import { IConfig } from '../../config/models/config.model';
import { Observable } from 'rxjs';
import { ITransaction } from '../models/transactions.model';
import { map } from 'rxjs/operators';

interface IV4TransactionsResponse {
  data: IV4Transactions[];
}
interface IV4Transactions {

}
export type V4TenantTransactionProperties =
  IV4TransactionPropertiesAbenson
  | IV4TransactionPropertiesMerck
  | IV4TransactionPropertiesAllit
  | IV4TransactionPropertiesCashback;

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

  public getTransactions(): Observable<any> {
    return EMPTY
  }
}
