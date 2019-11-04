import { ISurvey } from './../../survey/models/survey.model';
import { Observable } from 'rxjs';
import { IJsonApiItem } from '../../jsonapi.payload';
import { ICognitoUserAttributes, ICognitoUObject } from '@perx/whistler';

export abstract class IFormsService {
    public abstract getSignupForm(): Observable<ISurvey>;
    public abstract postUser(userObj: ICognitoUObject): Observable<IJsonApiItem<ICognitoUserAttributes>>;
}
