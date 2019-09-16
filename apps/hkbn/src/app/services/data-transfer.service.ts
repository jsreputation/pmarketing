import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChangePasswordData } from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data$: BehaviorSubject<IChangePasswordData | null> = new BehaviorSubject(null);

  public get updateData$(): BehaviorSubject<any> {
    return this.data$;
  }
  public newxUpdateData(object: IChangePasswordData | null): void {
    this.data$.next(object);
  }
}
