import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CodeRedemptionComponent } from './code-redemption.component';
import { MatButtonModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { VouchersModule, VouchersService, Voucher } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';
import { Observable, of, BehaviorSubject } from 'rxjs';
import { mockVoucher } from '../voucher.mock';
import { NotificationWrapperService } from 'src/app/services/notification-wrapper.service';
import { VoucherState } from '@perx/core';
import { Location } from '@angular/common';

const NotificationWrapperServiceStud = {
  addPopup: () => { }
};

describe('CodeRedemptionComponent', () => {
  let component: CodeRedemptionComponent;
  let fixture: ComponentFixture<CodeRedemptionComponent>;
  let location: Location;
  const vouchersServiceStub = {
    state: new BehaviorSubject(mockVoucher),
    get: (): Observable<Voucher> => of(mockVoucher),
    stateChangedForVoucher: (): Observable<Voucher> => vouchersServiceStub.state,
    redeemVoucher: (): Observable<any> => of({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatButtonModule,
        RouterTestingModule.withRoutes([{
          path: 'wallet',
          component: CodeRedemptionComponent
        }]),
        HttpClientTestingModule,
        TranslateModule.forRoot(),
        VouchersModule,
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceStub },
        { provide: NotificationWrapperService, useValue: NotificationWrapperServiceStud }
      ],
      declarations: [CodeRedemptionComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CodeRedemptionComponent);
    location = TestBed.get(Location);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('expect change status', fakeAsync(() => {
    vouchersServiceStub.state.next({ ...mockVoucher, state: VoucherState.issued });
    tick();
    expect(component.previousStatus).toBe(VoucherState.issued);
  }));

  it('should navigate to wallet', fakeAsync(()=>{
    vouchersServiceStub.state.next({... mockVoucher, state: VoucherState.redeemed});
    tick();
    expect(location.path(false)).toBe('/wallet')
  }));

  // it('should call redeemVoucher', ()=>{
  //   const spy = spyOn(vouchersService, 'redeemVoucher');
  //   component.redeem();
  //   expect(spy).toHaveBeenCalled();
  // })
});
