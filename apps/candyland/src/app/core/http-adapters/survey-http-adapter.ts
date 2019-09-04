import { ImageControlValue } from '@cl-helpers/image-control-value';

export class SurveyHttpAdapter {

// tslint:disable
  public static transformSurvey(data: any): any {
    return {
      type: 'engagements',
      attributes: {
        type: 'survey',
        title: data.name,
        // description: 'survey',
        // image_url:
        //   'https://steamcommunity-a.akamaihd.net/economy/image/64vD-vz99Gh75d0LDPB0xafxvGIGZ4JlqaTIjCBH3bwEDGn1UUnad4H8OQbqscapQVxvtTYJKVgNAeDPZm67hkn8y_2GP3s/256fx256f',
        display_properties: {
          title: data.headlineMessage,
          'sub_title': data.subHeadlineMessage,
          'progress_bar_color': data.color,
          'card_background_img_url': ImageControlValue.getImagePath(data.cardBackground),
          'background_img_url': ImageControlValue.getImagePath(data.background),
          questions: [
            {
              id: '1.9',
              question: 'some question',
              payload: {
                type: 'long-text',
                'max-length': 15
              }
            }
          ]
        }
      }
    };
  }

}
