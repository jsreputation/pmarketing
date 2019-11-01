import { ISurvey } from './../../survey/models/survey.model';
import { Observable } from 'rxjs';

export abstract class IFormsService {
    abstract getSignupForm(): Observable<ISurvey>;
}
