import { Injectable } from '@angular/core';
import { IPopupConfig } from '@perx/core/dist/perx-core';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private $popupSubject: Subject<IPopupConfig>;

  constructor() {
    this.$popupSubject = new Subject();
  }

  addPopup(config: IPopupConfig): void {
    this.$popupSubject.next(config);
  }

  get $popup(): Observable<IPopupConfig> {
    return this.$popupSubject;
  }
}
