import { Injectable } from '@angular/core';

import { IPopupConfig } from '../popup/popup.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private $popupSubject: Subject<IPopupConfig>;
  public $message: Subject<string> = new Subject();

  constructor() {
    this.$popupSubject = new Subject();
    this.$message = new Subject();
  }

  public addPopup(config: IPopupConfig): void {
    this.$popupSubject.next(config);
  }

  get $popup(): Observable<IPopupConfig> {
    return this.$popupSubject;
  }

}
