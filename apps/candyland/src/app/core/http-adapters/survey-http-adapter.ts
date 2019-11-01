import { ImageControlValue } from '@cl-helpers/image-control-value';
import { WSurveyQuestionType } from '@perx/whistler';
import { ISurveyForm } from '@cl-core/models/survey/survey-common.interface';

export class SurveyHttpAdapter {
  public static transformSurvey(data: any): any {
    const cleanupQuestions = (q: { payload: any; }) => {
      if (q.payload.type === WSurveyQuestionType.phone && q.payload.default_country_code === null) {
        delete q.payload.default_country_code;
      } else if (q.payload.type === WSurveyQuestionType.longText && q.payload['max-length'] === null) {
        delete q.payload['max-length'];
      } else if (q.payload.type === WSurveyQuestionType.questionGroup) {
        q.payload.questions.forEach(cleanupQuestions);
      }
    };

    data.questions.forEach(cleanupQuestions);
    const res: any = {
      type: 'engagements',
      attributes: {
        type: 'survey',
        image_url: data.image_url,
        title: data.name,
        display_properties: {
          title: data.headlineMessage,
          progress_bar_color: data.color,
          card_background_img_url: ImageControlValue.getImagePath(data.cardBackground),
          background_img_url: ImageControlValue.getImagePath(data.background),
          questions: data.questions,
          button: data.buttonText
        }
      }
    };

    if (data.subHeadlineMessage !== null) {
      res.attributes.display_properties.sub_title = data.subHeadlineMessage;
    }

    return res;
  }

  public static transformToSurveyForm(data: any): ISurveyForm {
    return {
      id: data.id,
      type: data.attributes.type,
      created_at: data.attributes.display_properties.created_at,
      updated_at: data.attributes.display_properties.updated_at,
      name: data.attributes.title,
      attribute_type: data.attributes.type,
      headlineMessage: data.attributes.display_properties.title,
      subHeadlineMessage: data.attributes.display_properties.sub_title,
      questions: data.attributes.display_properties.questions,
      color: data.attributes.display_properties.progress_bar_color,
      cardBackground: data.attributes.display_properties.card_background_img_url,
      background: data.attributes.display_properties.background_img_url,
      buttonText: data.attributes.display_properties.button,
      description: data.attributes.display_properties.description,
    };
  }

}
