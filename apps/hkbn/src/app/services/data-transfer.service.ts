import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { IChangePasswordData, IChangePhoneData, ISignUpData } from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data$: BehaviorSubject<IChangePasswordData | IChangePhoneData | ISignUpData | null> = new BehaviorSubject(null);

  public get updateData$(): Observable<IChangePasswordData | IChangePhoneData | ISignUpData | null> {
    return this.data$;
  }
  public newxUpdateData(object: IChangePasswordData | IChangePhoneData | ISignUpData | null): void {
    this.data$.next(object);
  }
}
