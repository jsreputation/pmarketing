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

  public getLimits(params: HttpParamsOptions, campaignId: string, engagementId: string, engagementType: string): Observable<ILimit> {
    const httpParams = ClHttpParams.createHttpParams(params);
    httpParams.append('filter[\'campaign_entity_id\']', campaignId);
    httpParams.append('filter[\'engagement_id\']', engagementId);
    return this.limitsHttpsService.getLimits(httpParams, engagementType).pipe(
      map(response => response.data),
      map(response => response.map((limit: ILimitApi) => LimitsHttpAdapter.transformAPIResponseToLimit(limit)))
    );
  }
}
