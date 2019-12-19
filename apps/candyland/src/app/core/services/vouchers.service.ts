import { HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { VouchersHttpService } from '@cl-core/http-services/vouchers-https.service';
import { VouchersHttpAdapter } from '@cl-core/http-adapters/vouchers-http-adapter';
import { map } from 'rxjs/operators';
import { IWVouchersApi, IJsonApiPostData } from '@perx/whistler';
import { WCodeType } from '@perx/whistler';
import { SOURCE_TYPE } from 'src/app/app.constants';
import { IJsonApiItemPayload, IJsonApiItem } from '@perx/whistler';

@Injectable({
  providedIn: 'root'
})
export class VouchersService {

  constructor(private vouchersHttp: VouchersHttpService) { }

  public getVouchers(params: HttpParams): Observable<any> {
    return this.vouchersHttp.getVouchers(params);
  }

  public getVoucher(id: string): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.vouchersHttp.getVoucher(id);
  }

  public createVoucher(data: IWVouchersApi): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    const formattedVoucher: IJsonApiItem<IWVouchersApi> = VouchersHttpAdapter.transformCreateVoucher(data);
    return this.vouchersHttp.createVoucher({ data: formattedVoucher });
  }

  public uploadVouchers(url: string, rewardId: number): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    const data: IJsonApiPostData<IWVouchersApi> = {
      attributes: {
        source_type: SOURCE_TYPE,
        source_id: rewardId,
        code_type: WCodeType.user_uploaded,
        file_url: url
      }
    };
    return this.vouchersHttp.createVoucher({ data });
  }

  public getVouchersBatch(id: number): Observable<IJsonApiItemPayload<IWVouchersApi>> {
    return this.vouchersHttp.getBatch(id);
  }

  public getStats(rewardId: string): Observable<{ [k: string]: number }> {
    return this.vouchersHttp.getStats(rewardId)
      .pipe(
        map(VouchersHttpAdapter.transformToVoucherStatsObj)
      );
  }
}
