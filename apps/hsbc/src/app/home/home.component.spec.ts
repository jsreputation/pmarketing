import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { CampaignModule, VouchersModule, CampaignService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule, MatCardModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const campaignServiceStub = {};

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        VouchersModule,
        CampaignModule,
      ],
      providers: [
        {provide: CampaignService, useValue: campaignServiceStub}
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
