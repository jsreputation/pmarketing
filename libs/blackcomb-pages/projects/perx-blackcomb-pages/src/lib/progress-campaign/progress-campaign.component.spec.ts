import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterTestingModule } from '@angular/router/testing';
import { TranslateModule } from '@ngx-translate/core';
import { ProgressCampaignComponent } from './progress-campaign.component';
import { ICampaignService, IQuestService, NotificationService } from '@perxtech/core';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { OutcomesFromLevelPipe } from './outcomes-from-level.pipe';

const questServiceStub: Partial<IQuestService> = {};
const campaignServiceStub: Partial<ICampaignService> = {};
const notificationServiceStub: Partial<NotificationService> = {};

describe('ProgressCampaignComponent', () => {
  let component: ProgressCampaignComponent;
  let fixture: ComponentFixture<ProgressCampaignComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProgressCampaignComponent, OutcomesFromLevelPipe ],
      imports: [ MatProgressBarModule,
        MatIconModule,
        RouterTestingModule,
        MatToolbarModule,
        TranslateModule.forRoot(),
        MatListModule,
        MatTabsModule,
        MatProgressSpinnerModule,
        MatProgressBarModule,
      ],
      providers: [
        { provide: IQuestService, useValue: questServiceStub },
        { provide: NotificationService, useValue: notificationServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProgressCampaignComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
