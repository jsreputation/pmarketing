import { NotificationService } from '@perx/core';
import { Injectable } from '@angular/core';
import { AppModule } from '../app.module';
@Injectable({
  providedIn: AppModule
})
export class NotificationWrapperService {

  constructor(private notificationService: NotificationService) { }

  addPopup(config) {
    this.notificationService.addPopup(config);
  }

}
