import { Injectable } from '@angular/core';

import { IPopupConfig } from '../popup/popup.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private $popupSubject: Subject<IPopupConfig>;
  private $snackSubject: Subject<string>;

  constructor() {
    this.$popupSubject = new Subject();
    this.$snackSubject = new Subject();
  }

  public addPopup(config: IPopupConfig): void {
    this.$popupSubject.next(config);
  }

  public addSnack(msg: string): void {
    this.$snackSubject.next(msg);
  }

  public get $popup(): Observable<IPopupConfig> {
    return this.$popupSubject;
  }

  public get $snack(): Observable<string> {
    return this.$snackSubject;
  }
}
