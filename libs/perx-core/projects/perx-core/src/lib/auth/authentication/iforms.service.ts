import { ISurvey } from './../../survey/models/survey.model';
import { Observable } from 'rxjs';

export abstract class IFormsService {
    public abstract getSignupForm(): Observable<ISurvey>;
    public abstract postUser(userObj): Observable<unknown>
}
