import { ImageControlValue } from '@cl-helpers/image-control-value';
import { SurveyQuestionType } from '@perx/core';

export class SurveyHttpAdapter {
  public static transformSurvey(data: any): any {
    const cleanupQuestions = (q: { payload: any; }) => {
      if (q.payload.type === SurveyQuestionType.phone && q.payload.default_country_code === null) {
        delete q.payload.default_country_code;
      } else if (q.payload.type === SurveyQuestionType.longText && q.payload['max-length'] === null) {
        delete q.payload['max-length'];
      } else if (q.payload.type === SurveyQuestionType.questionGroup) {
        q.payload.questions.forEach(cleanupQuestions);
      }
    };

    data.questions.forEach(cleanupQuestions);
    const res: any = {
      type: 'engagements',
      attributes: {
        type: 'survey',
        title: data.name,
        display_properties: {
          title: data.headlineMessage,
          progress_bar_color: data.color,
          card_background_img_url: ImageControlValue.getImagePath(data.cardBackground),
          background_img_url: ImageControlValue.getImagePath(data.background),
          questions: data.questions
        }
      }
    };

    if (data.subHeadlineMessage !== null) {
      res.attributes.display_properties.sub_title = data.subHeadlineMessage;
    }

    return res;
  }

}
