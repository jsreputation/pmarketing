import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IPosLoyaltyTransaction } from './models/pos.model';

@Injectable({
  providedIn: 'root'
})
export abstract class PosService {

  public abstract createTransaction(
    itemName: string,
    merchantName: string,
    outletName: string,
    transactionAmt: number,
    loyaltyProgramId: number
  ): Observable<IPosLoyaltyTransaction>;
}
