import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Config } from '../config/config';
import { IVoucherService } from './ivoucher.service';
import { Observable } from 'rxjs';
import { IVoucher, IGetVoucherParams, VoucherState, RedemptionType } from './models/voucher.model';
import { IJsonApiListPayload, IJsonApiItem } from '../jsonapi.payload';
import { map } from 'rxjs/operators';

const enum VoucherStatus {
  assigned = 'assigned'
}
interface IWhistlerVoucher {
  urn: string;
  created_at: string;
  updated_at: string;
  batch_id: number;
  code: string;
  assigned_to_id: number;
  status: VoucherStatus;
}

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

  private static WVoucherStatusToState(stat: VoucherStatus): VoucherState {
    switch (stat) {
      case VoucherStatus.assigned:
        return VoucherState.issued;
      default:
        return VoucherState.redeemed;
    }
  }

  private static WVoucherToVoucher(voucher: IJsonApiItem<IWhistlerVoucher>): IVoucher {
    return {
      id: (typeof voucher.id === 'string') ? Number.parseInt(voucher.id, 10) : voucher.id,
      rewardId: -1, // use at \lib\vouchers\vouchers.service.ts
      state: WhistlerVouchersService.WVoucherStatusToState(voucher.attributes.status),
      name: 'TODO',
      code: voucher.attributes.code,
      redemptionType: RedemptionType.qr,
      thumbnailImg: 'https://picsum.photos/200/300?random=1',
      rewardBanner: 'https://picsum.photos/200/300?random=1',
      merchantImg: 'https://picsum.photos/200/300?random=1',
      merchantName: 'TODO',
      expiry: null,
      description: []
    };
  }

  // @ts-ignore
  public getAll(voucherParams?: IGetVoucherParams): Observable<IVoucher[]> {
    return this.http.get<IJsonApiListPayload<IWhistlerVoucher>>(this.vouchersUrl)
      .pipe(
        map((res) => res.data),
        map((vouchers: IJsonApiItem<IWhistlerVoucher>[]) => vouchers.map(v => WhistlerVouchersService.WVoucherToVoucher(v)))
      );
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

  private get vouchersUrl(): string {
    return `${this.config.apiHost}/voucher/entities`;
  }
}
