import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChangePasswordData } from '@perx/core';
import { IChangePhoneData, ISignUpData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data$: BehaviorSubject<IChangePasswordData | IChangePhoneData| ISignUpData | null> = new BehaviorSubject(null);

  public get updateData$(): BehaviorSubject<any> {
    return this.data$;
  }
  public newxUpdateData(object: IChangePasswordData | IChangePhoneData | ISignUpData | null): void {
    this.data$.next(object);
  }
}
