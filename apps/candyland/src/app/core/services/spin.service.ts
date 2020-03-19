import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { map } from 'rxjs/operators';
import { SpinHttpService } from '@perxtech/whistler-services';
import { IWSpinGameEngagementAttributes, IJsonApiItemPayload, IJsonApiPatchData } from '@perxtech/whistler';
import { HttpClient } from '@angular/common/http';
import { ISpinDefaultValue } from '@cl-core/models/games/spin/spin-default-value.interface';
import { ISpinEntityForm } from '@cl-core/models/games/spin/spin-form.interface';

@Injectable({
  providedIn: 'root'
})
export class SpinService {

  constructor(private http: HttpClient, private spinHttpService: SpinHttpService) { }

  public getSpinData(): Observable<ISpinDefaultValue> {
    return this.http.get<ISpinDefaultValue>('assets/actives/spin/spin-data.json');
  }

  public getSpin(id: string): Observable<Partial<ISpinEntityForm>> {
    return this.spinHttpService.getSpin(id).pipe(
      map(response => EngagementHttpAdapter.transformSpinForm(response.data))
    );
  }

  public createSpin(data: ISpinEntityForm): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    const sentData = EngagementHttpAdapter.transformFromSpinForm(data);
    return this.spinHttpService.createSpin({ data: sentData });
  }

  public updateSpin(id: string, data: ISpinEntityForm): Observable<IJsonApiItemPayload<IWSpinGameEngagementAttributes>> {
    const sendData: IJsonApiPatchData<IWSpinGameEngagementAttributes> = { ...EngagementHttpAdapter.transformFromSpinForm(data), id };
    return this.spinHttpService.updateSpin(id, { data: sendData });
  }
}
