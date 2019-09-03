import { Injectable } from '@angular/core';
import { EngagementHttpAdapter } from '@cl-core/http-adapters/engagement-http-adapter';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableNewEngagementService {
  private newEngagementSubject = new BehaviorSubject<IEngagement>(null);

  public setNewEngagement(engagement: IResponseApi<IEngagementApi>): void {
    const formattedNewEngagement = EngagementHttpAdapter.transformEngagement(engagement.data);
    this.newEngagementSubject.next(formattedNewEngagement);
  }

  public get newEngagement(): IEngagement {
    return this.newEngagementSubject.value;
  }

  public get newEngagement$(): Observable<IEngagement> {
    return this.newEngagementSubject.asObservable();
  }

  public remove(): void {
    this.newEngagementSubject.next(null);
  }

  public get isAvailable(): boolean {
    return !!this.newEngagement;
  }

}
