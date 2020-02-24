import { TestBed, fakeAsync, inject, tick } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ConfigModule } from '../../config/config.module';
import { HttpClient } from '@angular/common/http';
import { WhistlerFormsService } from './whistler-forms.service';
import { of } from 'rxjs';
import { SurveyService } from '../../survey/survey.service';

describe('WhistlerFormsService', () => {
  beforeEach(() => TestBed.configureTestingModule({
    imports: [
      HttpClientTestingModule,
      ConfigModule.forRoot({})
    ]
  }));
  it('should get SignUpForm', fakeAsync(inject([HttpClient, WhistlerFormsService],
    (http: HttpClient, formService: WhistlerFormsService) => {
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({ data: [{ attributes: { properties: { signup: null } } }] }));
      formService.getSignupForm().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));

  it('should create form ', fakeAsync(inject([HttpClient, WhistlerFormsService],
    (http: HttpClient, formService: WhistlerFormsService) => {
      const spy = jest.spyOn(http, 'get').mockReturnValue(of({ data: [{ attributes: { properties: { signup: {} } } }] }));
      jest.spyOn(SurveyService, 'WSurveyToSurvey').mockReturnValue({ title: '', results: {}, questions: [] });
      formService.getSignupForm().subscribe(() => { });
      tick();
      expect(spy).toHaveBeenCalled();
    })));
});
