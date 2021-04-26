import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { QuestComponent } from './quest.component';
import { IQuestService, NotificationService, ICampaignService } from '@perxtech/core';

const questServiceStub: Partial<IQuestService> = {};
const campaignServiceStub: Partial<ICampaignService> = {};
const notificationServiceStub: Partial<NotificationService> = {};

describe('QuestComponent', () => {
  let component: QuestComponent;
  let fixture: ComponentFixture<QuestComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ QuestComponent ],
      imports: [ MatProgressBarModule,
         MatIconModule,
         RouterTestingModule,
         MatToolbarModule,
         TranslateModule.forRoot(),
         MatListModule ],
         providers: [
          { provide: IQuestService, useValue: questServiceStub },
          { provide: NotificationService, useValue: notificationServiceStub },
          { provide: ICampaignService, useValue: campaignServiceStub }
         ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
