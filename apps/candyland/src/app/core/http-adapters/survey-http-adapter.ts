import { ImageControlValue } from '@cl-helpers/image-control-value';

export class SurveyHttpAdapter {

// tslint:disable
  public static transformSurvey(data: any): any {
    return {
      type: 'engagements',
      attributes: {
        type: 'survey',
        title: data.name,
        display_properties: {
          'title': data.headlineMessage,
          'sub_title': data.subHeadlineMessage,
          'progress_bar_color': data.color,
          'card_background_img_url': ImageControlValue.getImagePath(data.cardBackground),
          'background_img_url': ImageControlValue.getImagePath(data.background),
          questions: data.questions
        }
      }
    };
  }

}
