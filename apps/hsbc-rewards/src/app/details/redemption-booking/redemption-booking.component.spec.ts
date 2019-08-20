import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionBookingComponent } from './redemption-booking.component';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { MatRadioModule, MatCheckboxModule } from '@angular/material';
import { RewardsModule, LocationModule, VouchersModule } from '@perx/core';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DetailAgreementModule } from '../detail-agreement/detail-agreement.module';

describe('RedemptionBookingComponent', () => {
  let component: RedemptionBookingComponent;
  let fixture: ComponentFixture<RedemptionBookingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionBookingComponent],
      imports: [
        DetailHeaderModule,
        MatRadioModule,
        MatCheckboxModule,
        RewardsModule.forRoot({ env: environment }),
        VouchersModule.forRoot({ env: environment }),
        LocationModule.forRoot({env: environment}),
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule,
        DetailAgreementModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
