import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { LimitsHttpsService } from '@cl-core/http-services/limits-https.service';
import { map } from 'rxjs/operators';
import { LimitsHttpAdapter } from '@cl-core/http-adapters/limits-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class LimitsService {

  constructor(private limitsHttpsService: LimitsHttpsService) {
  }

  public getLimits(params: HttpParamsOptions, engagementType: string): Observable<ILimit[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    return this.limitsHttpsService.getLimits(httpParams, engagementType).pipe(
      map((response: IResponseApi<ILimitApi[]>) => response.data),
      map((response: ILimitApi[]) => response.map((limit: ILimitApi) => LimitsHttpAdapter.transformAPIResponseToLimit(limit)))
    );
  }
}
