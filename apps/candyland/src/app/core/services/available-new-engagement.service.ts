import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AvailableNewEngagementService {
  private newEngagementSubject = new BehaviorSubject<IEngagement>(null);

  public setNewEngagement(engagement: IEngagement): void {
    this.newEngagementSubject.next(engagement);
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
