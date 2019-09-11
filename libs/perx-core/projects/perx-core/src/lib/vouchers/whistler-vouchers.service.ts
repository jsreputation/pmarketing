import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IVoucherService } from './ivoucher.service';
import { Observable } from 'rxjs';
import { IVoucher, IGetVoucherParams } from './models/voucher.model';

@Injectable({
  providedIn: 'root'
})
export class WhistlerVouchersService implements IVoucherService {
  constructor(
    // @ts-ignore
    private http: HttpClient,
    // @ts-ignore
    private config: Config
  ) { }

  // @ts-ignore
  public getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public get(id: number, useCache?: boolean): Observable<IVoucher> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public redeemVoucher(id: number): Observable<any> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public reset(vouchers?: IVoucher[]): void {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public newVouchersCreatedForReward(rewardId: number, intervalPeriod?: number): Observable<IVoucher[]> {
    throw new Error('Method not implemented.');
  }

  // @ts-ignore
  public stateChangedForVoucher(voucherId: number, intervalPeriod?: number): Observable<IVoucher> {
    throw new Error('Method not implemented.');
  }
}
