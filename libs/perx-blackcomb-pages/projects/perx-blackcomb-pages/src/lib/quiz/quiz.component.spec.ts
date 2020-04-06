import { HttpClientTestingModule } from '@angular/common/http/testing';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateService } from '@ngx-translate/core';
import { AuthenticationService, Config, ICampaignService, QuizModule, UtilsModule, NotificationService } from '@perxtech/core';
import { BehaviorSubject } from 'rxjs';
import { QuizComponent } from './quiz.component';

const campaignServiceStub: Partial<ICampaignService> = {};
const configStub: Partial<Config> = {};
const translateServiceStub: Partial<TranslateService> = {
  get: () => new BehaviorSubject('yo')
};
const authenticationServiceStub: Partial<AuthenticationService> = {
  getAnonymous: () => false
};
const notificationServiceStub: Partial<NotificationService> = {};
describe('QuizComponent', () => {
  let component: QuizComponent;
  let fixture: ComponentFixture<QuizComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        QuizComponent
      ],
      imports: [
        QuizModule,
        MatToolbarModule,
        MatCardModule,
        MatProgressBarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        UtilsModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: Config, useValue: configStub },
        { provide: TranslateService, useValue: translateServiceStub },
        { provide: AuthenticationService, useValue: authenticationServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
