import { IPopupConfig } from '../popup/popup.component';
import { IAnswer } from '../../survey/models/survey.model';

export interface IPrePlayStateData {
    popupData: IPopupConfig;
    engagementType: string;
    collectInfo: boolean;
    transactionId?: number | null;
    surveyId?: number | null;
    campaignId?: number;
    answers?: IAnswer[];
}
