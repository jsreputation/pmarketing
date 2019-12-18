import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { NewCampaignNotificationsComponent } from './new-campaign-notifications.component';
import { CampaignChannelsFormService } from '../../services/campaign-channels-form.service';
import { CampaignCreationStoreService } from '../../services/campaigns-creation-store.service';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormGroup } from '@angular/forms';

describe('NewCampaignNotificationsComponent', () => {
  let component: NewCampaignNotificationsComponent;
  let fixture: ComponentFixture<NewCampaignNotificationsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewCampaignNotificationsComponent ],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        HttpClientTestingModule
      ],
      providers: [
        CampaignChannelsFormService,
        CampaignCreationStoreService,
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignNotificationsComponent);
    component = fixture.componentInstance;
    component.channelForm = new FormGroup({});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
