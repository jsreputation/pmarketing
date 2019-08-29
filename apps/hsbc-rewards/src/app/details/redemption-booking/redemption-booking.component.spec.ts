import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedemptionBookingComponent } from './redemption-booking.component';
import { DetailHeaderModule } from '../detail-header/detail-header.module';
import { MatRadioModule, MatCheckboxModule } from '@angular/material';
import { RewardsModule, LocationModule, VouchersModule, ILoyalty, LoyaltyService } from '@perx/core';
import { environment } from 'src/environments/environment';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';

const loyaltyServiceStub = {
  getLoyalty: (): Observable<ILoyalty> => of(null),
  getLoyalties: (): Observable<ILoyalty[]> => of([])
};

describe('RedemptionBookingComponent', () => {
  let component: RedemptionBookingComponent;
  let fixture: ComponentFixture<RedemptionBookingComponent>;
  let debugElem: DebugElement;
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RedemptionBookingComponent],
      imports: [
        DetailHeaderModule,
        MatRadioModule,
        MatCheckboxModule,
        RewardsModule.forRoot({ env: environment }),
        VouchersModule.forRoot({ env: environment }),
        LocationModule.forRoot({ env: environment }),
        HttpClientTestingModule,
        RouterTestingModule,
        ReactiveFormsModule,
        FormsModule
      ],
      providers: [{
        provide: LoyaltyService,
        useValue: loyaltyServiceStub
      }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedemptionBookingComponent);
    component = fixture.componentInstance;
    debugElem = fixture.debugElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should populate quantity', () => {
    const checkVal = 1;
    component.buildForm();
    fixture.detectChanges();
    component.bookingForm.patchValue({ quantity: checkVal });
    fixture.detectChanges();
    const elem = debugElem.query(By.css('select[formcontrolname=quantity]')).nativeElement;
    expect(elem.value).toBe(checkVal.toString());
  });

});
