import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChangePasswordData } from '@perx/core';
import { IChangePhoneData } from '@perx/core/dist/perx-core/lib/auth/authentication/models/authentication.model';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private data$: BehaviorSubject<IChangePasswordData | IChangePhoneData| null> = new BehaviorSubject(null);

  public get updateData$(): BehaviorSubject<any> {
    return this.data$;
  }
  public newxUpdateData(object: IChangePasswordData | IChangePhoneData | null): void {
    this.data$.next(object);
  }
}
