import { BehaviorSubject, Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Voucher, IPosLoyaltyTransaction, IProfile, IMerchantInvoice } from '@perxtech/core';

export interface IQrPayload {
  name?: string;
  id?: number;
  identifier?: string;
  voucherId?: string;
  verifiedUser?: IProfile;
}

@Injectable({
    providedIn: 'root'
  })
export class OrderService {

  private scannedUser$: BehaviorSubject<IProfile> = new BehaviorSubject<IProfile>(null);
  private reservedVoucher$: BehaviorSubject<Voucher> = new BehaviorSubject<Voucher>(null);
  private reservedPoints$: BehaviorSubject<IPosLoyaltyTransaction> = new BehaviorSubject<IPosLoyaltyTransaction>(null);
  private invoice$: BehaviorSubject<IMerchantInvoice> = new BehaviorSubject<IMerchantInvoice>(null);

  public get getScannedUser$(): Observable<IProfile | null> {
    return this.scannedUser$;
  }

  public setScannedUser(value: IProfile): void {
    this.scannedUser$.next(value);
  }

  public get getReservedVoucher$(): Observable<Voucher | null> {
    return this.reservedVoucher$;
  }

  public setReservedVoucher(value: Voucher): void {
    this.reservedVoucher$.next(value);
  }

  public get getReservedPoints$(): Observable<IPosLoyaltyTransaction | null> {
    return this.reservedPoints$;
  }

  public setReservedPoints(value: IPosLoyaltyTransaction): void {
    this.reservedPoints$.next(value);
  }

  public get getInvoice$(): Observable<IMerchantInvoice | null> {
    return this.invoice$;
  }

  public setInvoice(value: IMerchantInvoice): void {
    this.invoice$.next(value);
  }
}
