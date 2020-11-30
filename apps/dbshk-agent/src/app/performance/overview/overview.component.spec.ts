import { DatePipe } from '@angular/common';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatProgressBarModule, MatProgressSpinnerModule } from '@angular/material';
import { TranslateService } from '@ngx-translate/core';
import { LoyaltyService, LoyaltySummaryComponent, ProfileService, StatisticCardComponent } from '@perxtech/core';
import { MaterialModule } from 'libs/core/projects/perx-core/src/lib/shared/material.module';
import { of } from 'rxjs';
import { OverviewComponent } from './overview.component';

describe('OverviewComponent', () => {
  let component: OverviewComponent;
  let fixture: ComponentFixture<OverviewComponent>;

  const profileServiceStub = {
    whoAmI: () => of(null)
  };

  const loyaltyServiceStub: Partial<LoyaltyService> = {
    getLoyalties: () => of([]),
    getLoyalty: () => of(),
    getTransactions: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [OverviewComponent, StatisticCardComponent, LoyaltySummaryComponent],
      imports: [
        MaterialModule,
        MatProgressBarModule,
        MatProgressSpinnerModule
      ],
      providers: [
        DatePipe,
        { provide: ProfileService, useValue: profileServiceStub },
        { provide: LoyaltyService, useValue: loyaltyServiceStub },
        { provide: TranslateService, useValue: {} },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(OverviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
