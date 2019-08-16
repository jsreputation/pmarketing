import { Injectable } from '@angular/core';
import { ControlValueService } from '@cl-core-services';

@Injectable({
  providedIn: 'root'
})
export class EngagementTransformDataService {
  constructor(private controlValueService: ControlValueService) {}

  public transformReward(data: any): any {
    return {
      type: 'engagements',
      attributes: {
        title: data.name,
        game_type: 'reward',
        image_url: 'i do not know what',
        display_properties: {
          headlineText: data.headlineMessage,
          subHeadlineText: data.subHeadlineMessage,
          cardBackground: this.controlValueService.getImagePath(data.cardBackground),
          background: this.controlValueService.getImagePath(data.background),
          buttonText: data.buttonText
        }
      }
    };
  }
}
