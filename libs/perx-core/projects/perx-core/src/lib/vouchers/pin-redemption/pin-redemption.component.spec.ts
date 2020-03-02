import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PinRedemptionComponent } from './pin-redemption.component';
import { ReactiveFormsModule } from '@angular/forms';
import { PinService } from '../pin.service';
import { Type } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { PinInputComponent } from '../../utils/pin-input/pin-input.component';

describe('PinRedemptionComponent', () => {
  let component: PinRedemptionComponent;
  let fixture: ComponentFixture<PinRedemptionComponent>;
  const pinServiceMock = {
    getPin: () => of()
  };
  const vouchersServiceMock = {
    redeemVoucher: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinRedemptionComponent, PinInputComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { useValue: pinServiceMock, provide: PinService },
        { useValue: vouchersServiceMock, provide: IVoucherService }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinRedemptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // pinService = TestBed.get<PinService>(PinService as Type<PinService>);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should always has number type of length', () => {
    component.ngOnInit();
    expect(typeof component.length).toBe('number');
  });

  describe('redeemVoucher', () => {
    it('should call redeemVoucher and emit full', fakeAsync(() => {
      const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>(IVoucherService as Type<IVoucherService>);
      const spy = jest.spyOn(voucherService, 'redeemVoucher').mockReturnValue(of('Redeem success'));
      const fullEmitSpy = jest.spyOn(component.full, 'emit');
      component.redeemVoucher('1234');
      tick();
      expect(spy).toHaveBeenCalled();
      expect(fullEmitSpy).toHaveBeenCalled();
    }));

    it('should throw error', fakeAsync(() => {
      const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>(IVoucherService as Type<IVoucherService>);
      const spy = jest.spyOn(voucherService, 'redeemVoucher').mockReturnValue(throwError(new HttpErrorResponse({ status: 401 })));
      const fullEmitSpy = jest.spyOn(component.hasErrorEmit, 'emit');
      component.redeemVoucher('1234');
      tick();
      expect(spy).toHaveBeenCalled();
      expect(fullEmitSpy).toHaveBeenCalled();
    }));
  });
});
