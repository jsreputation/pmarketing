import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HomeComponent } from './home.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { Router } from '@angular/router';
import { VouchersService, VouchersModule, CampaignService } from '@perx/core';
import { of } from 'rxjs';
import { MatCardModule } from '@angular/material';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const router = {
    navigate: jasmine.createSpy('navigate')
  };

  const vouchersServiceStub = {
    getAll: () => of()
  };

  const campaignServiceStub = {
    getCampaigns: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomeComponent],
      imports: [
        NoopAnimationsModule,
        MatCardModule,
        VouchersModule,
        HttpClientTestingModule
      ],
      providers: [
        { provide: Router, useValue: router },
        { provide: VouchersService, useValue: vouchersServiceStub },
        { provide: CampaignService, useValue: campaignServiceStub },
      ]
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
