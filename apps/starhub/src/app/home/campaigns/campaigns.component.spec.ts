import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsComponent } from './campaigns.component';
import { MatCardModule, MatIconModule } from '@angular/material';
import { of } from 'rxjs';
import { CampaignService } from '@perx/core';

describe('CampaignsComponent', () => {
  let component: CampaignsComponent;
  let fixture: ComponentFixture<CampaignsComponent>;
  const campaignServiceStub = {
    getCampaigns: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsComponent ],
      imports: [
        MatCardModule,
        MatIconModule
      ],
      providers: [
        { provide: CampaignService, useValue: campaignServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
