import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { VouchersModule, ICampaignService, IVoucherService, PuzzlesModule, StampService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { MatTabsModule, MatCardModule, MatIconModule } from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { NavigateToolbarComponent } from '../navigate-toolbar/navigate-toolbar.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  const campaignServiceStub = {
    getCampaigns: () => of([
      {
        id: 100,
        name: 'Puzzle Game',
        description: 'jahdjkashdjsahdkajhda',
        type: 'stamp',
        endsAt: '1970-01-01T00:00:00.000Z'
      }
    ])
  };
  const vouchersServiceStub = {
    getAll: () => of([])
  };

  const stampSeviceStub = {
    getCards: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent,
        NavigateToolbarComponent,
      ],
      imports: [
        RouterTestingModule,
        NoopAnimationsModule,
        MatTabsModule,
        MatIconModule,
        MatCardModule,
        VouchersModule,
        PuzzlesModule,
      ],
      providers: [
        { provide: ICampaignService, useValue: campaignServiceStub },
        { provide: IVoucherService, useValue: vouchersServiceStub },
        { provide: StampService, useValue: stampSeviceStub }
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
