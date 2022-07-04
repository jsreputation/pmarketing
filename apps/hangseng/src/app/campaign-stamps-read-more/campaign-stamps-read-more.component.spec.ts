import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ICampaignService } from '@perxtech/core';
import { of } from 'rxjs';

import { CampaignStampsReadMoreComponent } from './campaign-stamps-read-more.component';

describe('CampaignStampsReadMoreComponent', () => {
  let component: CampaignStampsReadMoreComponent;
  let fixture: ComponentFixture<CampaignStampsReadMoreComponent>;

  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaign: () => of(),
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CampaignStampsReadMoreComponent ],
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
      ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignStampsReadMoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
