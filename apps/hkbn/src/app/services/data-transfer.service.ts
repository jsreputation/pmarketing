import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IChangePasswordData } from '@perx/core';

@Injectable({
  providedIn: 'root'
})
export class DataTransferService {
  private _updateData$: BehaviorSubject<IChangePasswordData | null> = new BehaviorSubject(null);

  public get updateData$(): BehaviorSubject<any> {
    return this._updateData$;
  }
  public newxUpdateData(object: IChangePasswordData | null): void {
    this._updateData$.next(object);
  }
}
