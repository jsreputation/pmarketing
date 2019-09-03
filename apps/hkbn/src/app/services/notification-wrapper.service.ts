import { NotificationService, IPopupConfig } from '@perx/core';
import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';
@Injectable({
  providedIn: AppModule
})
export class NotificationWrapperService {

  constructor(private notificationService: NotificationService) { }

  public addPopup(config: IPopupConfig): void {
    this.notificationService.addPopup(config);
  }

}
