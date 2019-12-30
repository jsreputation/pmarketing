import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IWEngagementAttributes, IJsonApiItemPayload } from '@perx/whistler';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';

@Injectable({
  providedIn: 'root'
})
export class AvailableNewEngagementService {
  private newEngagementSubject: BehaviorSubject<IEngagementType> = new BehaviorSubject<IEngagementType>(null);

  public setNewEngagement(engagement: IEngagementType): void {
    this.newEngagementSubject.next(engagement);
  }

  public transformAndSetNewEngagement(engagement: IJsonApiItemPayload<IWEngagementAttributes>): void {
    const formattedEngagement = EngagementHttpAdapter.transformEngagementHandler(engagement.data);
    this.newEngagementSubject.next(formattedEngagement);
  }

  public get newEngagement(): IEngagementType {
    return this.newEngagementSubject.value;
  }

  public get newEngagement$(): Observable<IEngagementType> {
    return this.newEngagementSubject.asObservable();
  }

  public remove(): void {
    this.newEngagementSubject.next(null);
  }

  public get isAvailable(): boolean {
    return !!this.newEngagement;
  }

}
