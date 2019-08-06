import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltySummaryComponent } from './loyalty-summary.component';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule, MatTabsModule } from '@angular/material';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProfileModule as PerxProfileModule, LoyaltyModule as PerxLoyaltyModule } from '@perx/core';
import { environment } from 'src/environments/environment';

describe('SummaryComponent', () => {
  let component: LoyaltySummaryComponent;
  let fixture: ComponentFixture<LoyaltySummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltySummaryComponent ],
      imports: [
        NoopAnimationsModule,
        MatButtonModule,
        MatTabsModule,
        HttpClientTestingModule,
        PerxProfileModule.forRoot({ env: environment }),
        PerxLoyaltyModule.forRoot({ env: environment })
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltySummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
