import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClHttpParams } from '@cl-helpers/http-params';
import { OutcomesHttpsService } from '@cl-core/http-services/outcomes-https.service';
import { map } from 'rxjs/operators';
import { OutcomesHttpAdapter } from '@cl-core/http-adapters/outcomes-http-adapter';

@Injectable({
  providedIn: 'root'
})
export class OutcomesService {

  constructor(private outcomesHttpsService: OutcomesHttpsService) {
  }

  public getOutcomes(params: HttpParamsOptions, id: string): Observable<IOutcome[]> {
    const httpParams = ClHttpParams.createHttpParams(params);
    httpParams.append('filter[\'campaign_entity_id\']', id);
    return this.outcomesHttpsService.getOutcomes(httpParams).pipe(
      map(response => response.data),
      map(response => response.map((outcome: IOutcomeApi) => OutcomesHttpAdapter.transformAPIResponseToOutcome(outcome)))
    );
  }
}
