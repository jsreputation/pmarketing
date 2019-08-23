import { Injectable } from '@angular/core';
import { ControlValueService } from '@cl-core-services';

@Injectable({
  providedIn: 'root'
})
export class EngagementTransformDataService {
  constructor(private controlValueService: ControlValueService) {
  }
// tslint:disable
  public transformReward(data: any): any {
    return {
      type: 'engagements',
      attributes: {
        title: data.name,
        game_type: 'reward',
        image_url:
          'https://steamcommunity-a.akamaihd.net/economy/image/64vD-vz99Gh75d0LDPB0xafxvGIGZ4JlqaTIjCBH3bwEDGn1UUnad4H8OQbqscapQVxvtTYJKVgNAeDPZm67hkn8y_2GP3s/256fx256f',
        display_properties: {
          headlineText: data.headlineMessage,
          subHeadlineText: data.subHeadlineMessage,
          cardBackground: this.controlValueService.getImagePath(data.cardBackground),
          background: this.controlValueService.getImagePath(data.background),
          callToActionText: data.buttonText
        }
      }
    };
  }

  public transformShakeTheTree(data: any): any {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        description: 'Spin and win',
        game_type: 'shake',
        image_url:
        'https://steamcommunity-a.akamaihd.net/economy/image/64vD-vz99Gh75d0LDPB0xafxvGIGZ4JlqaTIjCBH3bwEDGn1UUnad4H8OQbqscapQVxvtTYJKVgNAeDPZm67hkn8y_2GP3s/256fx256f',
        display_properties: {
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          tree_img_url:  this.controlValueService.getImagePath(data.treeType),
          gift_box_img_url:  this.controlValueService.getImagePath(data.giftBox),
          background_img_url:  this.controlValueService.getImagePath(data.background),
          nb_hanged_gifts: +data.gameGift
        }
      }
    };
  }

  public transformPinata(data: any): any {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        game_type: 'tap',
        image_url: 'https://miro.medium.com/fit/c/256/256/1*BTGStLRXsQUbkp0t-oxJhQ.png',
        display_properties: {
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          cracking_pinata_img_url: 'https://picsum.photos/200/300',
          opened_pinata_img_url: 'https://picsum.photos/200/300',
          closed_pinata_img_url:  this.controlValueService.getImagePath(data.pinata),
          // background_img_url:  this.controlValueService.getImagePath(data.background),
        }
      }
    };
  }
}
