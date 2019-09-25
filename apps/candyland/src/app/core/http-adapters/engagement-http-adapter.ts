import { ImageControlValue } from '@cl-helpers/image-control-value';
import {
  IEngagementInstantReward, IEngagementShakeType, IEngagementStamps, IEngagementSurvey, IEngagementTapType
} from '@cl-core/models/engagement/engagement-interfaces';

export class EngagementHttpAdapter {

// tslint:disable
  public static transformEngagement(data: IEngagementApi): IEngagement {
    return {
      id: data.id,
      current_type: data.type,
      urn: data.attributes.urn,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      game_type: data.attributes.game_type,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      attributes_type: data.attributes.type,
      fontName: data.attributes.display_properties.fontName,
      fontColor: data.attributes.display_properties.fontColor,
      headerColor: data.attributes.display_properties.headerColor,
      headerTitle: data.attributes.display_properties.headerTitle,
      headlineText: data.attributes.display_properties.headlineText,
      mainShapeType: data.attributes.display_properties.mainShapeType,
      backgroundColor: data.attributes.display_properties.backgroundColor,
      headerLogoImage: data.attributes.display_properties.headerLogoImage,
      subHeadlineText: data.attributes.display_properties.subHeadlineText,
      callToActionText: data.attributes.display_properties.callToActionText,
      loadingHeadlineText: data.attributes.display_properties.loadingHeadlineText,
      loadingSubHeadlineText: data.attributes.display_properties.loadingSubHeadlineText,
      background: data.attributes.display_properties.background,
      cardBackground: data.attributes.display_properties.cardBackground,
      buttonText: data.attributes.display_properties.buttonText,
      nb_of_slots: data.attributes.display_properties.nb_of_slots,
      slots: data.attributes.display_properties.slots
    };
  }

  public static transformEngagementHandler(data: IEngagementApi): any {
    switch (data.attributes.type) {
      case 'game':
        return EngagementHttpAdapter.transformGameHandler(data);
      case 'survey':
        return EngagementHttpAdapter.transformToSurveyType(data);
      case 'stamps':
        return EngagementHttpAdapter.transformToStampType(data);
      case 'instant_reward':
        return EngagementHttpAdapter.transformToInstantReward(data);
    }
  }

  public static transformToInstantReward(data: any): IEngagementInstantReward {
    return {
      id: data.id,
      type: data.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      banner: data.attributes.display_properties.banner,
      attributes_type: data.attributes.type,
      background_img_url: data.attributes.display_properties.background_img_url,
      card_background_img_url: data.attributes.display_properties.card_background_img_url
    }
  }

  public static transformToSurveyType(data: any): IEngagementSurvey {
    return {
      id: data.id,
      type: data.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      background_img_url: data.attributes.display_properties.background_img_url,
      attributes_type: data.attributes.type,
      progress_bar_color: data.attributes.display_properties.progress_bar_color,
      card_background_img_url: data.attributes.display_properties.card_background_img_url,
      questions: EngagementHttpAdapter.prepareQuestion(data.attributes.display_properties.questions)
    };
  }

  public static prepareQuestion(data: any): any {
    return data[0];
  }

  public static transformToStampType(data: any): IEngagementStamps {
    return {
      id: data.id,
      type: data.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      slots: data.attributes.display_properties.slots,
      nb_of_slots: data.attributes.display_properties.nb_of_slots,
      pre_stamp_img_url: data.attributes.display_properties.pre_stamp_img_url,
      post_stamp_img_url: data.attributes.display_properties.post_stamp_img_url,
      reward_pre_stamp_img_url: data.attributes.display_properties.reward_pre_stamp_img_url,
      reward_post_stamp_img_url: data.attributes.display_properties.reward_post_stamp_img_url,
      attributes_type: data.attributes.type,
      background_img_url: data.attributes.display_properties.background_img_url
    };
  }

  public static transformGameHandler(data: IEngagementApi): any {
    switch (data.attributes.game_type) {
      case 'shake':
        return EngagementHttpAdapter.transformToShackType(data);
      case 'tap':
        return EngagementHttpAdapter.transformToPinataType(data);
    }
  }

  public static transformToShackType(data: any): IEngagementShakeType {
    return {
      id: data.id,
      type: data.type,
      game_type: data.attributes.game_type,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      tree_img_url: data.attributes.display_properties.tree_img_url,
      nb_hanged_gifts: data.attributes.display_properties.nb_hanged_gifts,
      gift_box_img_url: data.attributes.display_properties.gift_box_img_url,
      background_img_url: data.attributes.display_properties.background_img_url,
      attributes_type: data.attributes.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
    }
  }

  public static transformToPinataType(data: any): IEngagementTapType {
    return {
      id: data.id,
      type: data.type,
      game_type: data.attributes.game_type,
      title: data.attributes.title,
      description: data.attributes.description,
      image_url: data.attributes.image_url,
      title_display: data.attributes.display_properties.title,
      button: data.attributes.display_properties.button,
      sub_title: data.attributes.display_properties.sub_title,
      attributes_type: data.attributes.type,
      created_at: data.attributes.created_at,
      updated_at: data.attributes.updated_at,
      closed_pinata_img_url:  data.attributes.display_properties.closed_pinata_img_url,
      opened_pinata_img_url:  data.attributes.display_properties.opened_pinata_img_url,
      cracking_pinata_img_url: data.attributes.display_properties.cracking_pinata_img_url
    }
  }

  public static transformInstantReward(data: IInstantRewardForm): any {
    return {
      type: 'engagements', attributes: {
        type: 'instant_reward', title: data.name, display_properties: {
          banner: data.banner, title: data.headlineMessage, sub_title: data.headlineMessage, // subHeadlineText: data.subHeadlineMessage,
          card_background_img_url: 'https://miro.medium.com/fit/c/256/256/1*BTGStLRXsQUbkp0t-oxJhQ.png', // card_background_img_url: ImageControlValue.getImagePath(data.cardBackground),
          background_img_url: 'https://miro.medium.com/fit/c/256/256/1*BTGStLRXsQUbkp0t-oxJhQ.png', // background_img_url: ImageControlValue.getImagePath(data.background),
          button: data.buttonText
        }
      }
    };
  }

  public static transformShakeTheTree(data: any): any {
    return {
      type: 'engagements', attributes: {
        type: 'game',
        title: data.name,
        description: 'Spin and win',
        game_type: 'shake',
        image_url: 'https://steamcommunity-a.akamaihd.net/economy/image/64vD-vz99Gh75d0LDPB0xafxvGIGZ4JlqaTIjCBH3bwEDGn1UUnad4H8OQbqscapQVxvtTYJKVgNAeDPZm67hkn8y_2GP3s/256fx256f',
        display_properties: {
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
          tree_img_url: ImageControlValue.getImagePath(data.treeType),
          gift_box_img_url: ImageControlValue.getImagePath(data.giftBox),
          background_img_url: ImageControlValue.getImagePath(data.background),
          nb_hanged_gifts: +data.gameGift
        }
      }
    };
  }

  public static transformPinata(data: any): any {
    return {
      type: 'engagements', attributes: {
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
          closed_pinata_img_url: ImageControlValue.getImagePath(data.pinata)
          // background_img_url:  ImageControlValue.getImagePath(data.background),
        }
      }
    };
  }

  public static transformStamp(data: any): any {
    return {
      type: 'engagements', attributes: {
        type: 'stamps',
        title: data.name,
        'image_url': 'https://miro.medium.com/fit/c/256/256/1*BTGStLRXsQUbkp0t-oxJhQ.png',
        display_properties: {
          'nb_of_slots': +data.stampsNumber,
          slots: data.stampsSlotNumber.map(item => +item),
          'pre_stamp_img_url': ImageControlValue.getImagePath(data.preStamp),
          'reward_pre_stamp_img_url': ImageControlValue.getImagePath(data.rewardPreStamps),
          'post_stamp_img_url': ImageControlValue.getImagePath(data.postStamps),
          'reward_post_stamp_img_url': ImageControlValue.getImagePath(data.rewardPostStamps),
          title: data.headlineMessage,
          button: data.buttonText,
          sub_title: data.subHeadlineMessage,
        }
      }
    }
  }
}
