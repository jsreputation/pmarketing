import { ImageControlValue } from '@cl-helpers/image-control-value';

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

  public static transformInstantReward(data: any): any {
    return {
      type: 'engagements',
      attributes: {
        type: 'game',
        title: data.name,
        description: 'Instant Reward',
        game_type: 'reward',
        image_url:
          'https://steamcommunity-a.akamaihd.net/economy/image/64vD-vz99Gh75d0LDPB0xafxvGIGZ4JlqaTIjCBH3bwEDGn1UUnad4H8OQbqscapQVxvtTYJKVgNAeDPZm67hkn8y_2GP3s/256fx256f',
        display_properties: {
          title: data.headlineMessage,
          headlineText: data.headlineMessage,
          subHeadlineText: data.subHeadlineMessage,
          cardBackground: ImageControlValue.getImagePath(data.cardBackground),
          background: ImageControlValue.getImagePath(data.background),
          callToActionText: data.buttonText
        }
      }
    };
  }

  public static transformShakeTheTree(data: any): any {
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
          closed_pinata_img_url: ImageControlValue.getImagePath(data.pinata)
          // background_img_url:  ImageControlValue.getImagePath(data.background),
        }
      }
    };
  }
}
