import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PinRedemptionComponent } from './pin-redemption.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PinService } from '../pin.service';
import { By } from '@angular/platform-browser';
import { SimpleChange, Type } from '@angular/core';
import { IVoucherService } from '../ivoucher.service';
import { of, throwError } from 'rxjs';
import { IVoucher, VoucherState } from '../models/voucher.model';
import { HttpErrorResponse } from '@angular/common/http';

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
      declarations: [PinRedemptionComponent],
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

  it('ngOnChanges should go to else if block and call getPin', () => {
    const voucher: IVoucher = {
      id: 1,
      reward: null,
      state: VoucherState.issued,
      expiry: null,
    };
    component.voucher = voucher;
    const pinService: PinService = fixture.debugElement.injector.get<PinService>(PinService as Type<PinService>);
    const spy = jest.spyOn(pinService, 'getPin').mockReturnValue(of('1234'));
    component.ngOnChanges({
      voucher: new SimpleChange(null, null, true)
    });
    expect(spy).toHaveBeenCalled();
    expect(component.pinCode).toBe('1234');
  });

  describe('redeemVoucher', () => {
    it('should call redeemVoucher and emit full', fakeAsync(() => {
      const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>(IVoucherService as Type<IVoucherService>);
      const spy = jest.spyOn(voucherService, 'redeemVoucher').mockReturnValue(of('Redeem success'));
      const fullEmitSpy = jest.spyOn(component.full, 'emit');
      component.redeemVoucher();
      tick();
      expect(spy).toHaveBeenCalled();
      expect(fullEmitSpy).toHaveBeenCalled();
    }));

    it('should throw error', fakeAsync(() => {
      const voucherService: IVoucherService = fixture.debugElement.injector.get<IVoucherService>(IVoucherService as Type<IVoucherService>);
      const spy = jest.spyOn(voucherService, 'redeemVoucher').mockReturnValue(throwError(new HttpErrorResponse({ status: 401 })));
      const fullEmitSpy = jest.spyOn(component.hasErrorEmit, 'emit');
      component.redeemVoucher();
      tick();
      expect(spy).toHaveBeenCalled();
      expect(fullEmitSpy).toHaveBeenCalled();
    }));
  });

  describe('validateCode', () => {
    it('should return false', () => {
      const isValid = component.validateCode('1234');
      expect(isValid).toBe(false);
      expect(component.hasError).toBe('error');
    });

    it('should return true', () => {
      component.pinCode = '1234';
      const isValid = component.validateCode('1234');
      expect(isValid).toBe(true);
      expect(component.hasError).toBe('');
    });
  });

  it('should reset all', () => {
    component.resetAll();
    expect(component.hasError).toBe('');
    component.controls.forEach(control => {
      expect(control.value).toBe('');
    });
  });

  it('should update the value once the input value changes detect', () => {
    const control = new FormControl('');
    fixture.componentInstance.controls[0] = control;
    fixture.detectChanges();
    const spy = jest.spyOn(component, 'onUpdate');
    component.ngOnInit();
    const firstInput = fixture.debugElement.query(By.css('input#input_0')).nativeElement;
    expect(firstInput.value).toEqual('');

    firstInput.value = '1';
    firstInput.dispatchEvent(new Event('input'));

    expect(spy).toHaveBeenCalled();
  });

  it('should update the control with new input', fakeAsync(() => {
    const firstInput = fixture.debugElement.query(By.css('input#input_0')).nativeElement;
    const secondInput = fixture.debugElement.query(By.css('input#input_1')).nativeElement;
    firstInput.value = '2';
    firstInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.value).toBe('2');
    });
    tick();
    secondInput.value = '1';
    secondInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.value).toBe('21');
    });
  }));

  it('should get new pin once voucherId from parent changed', () => {
    const pinService: PinService = fixture.debugElement.injector.get<PinService>(PinService as Type<PinService>);
    const spy = jest.spyOn(pinService, 'getPin').mockReturnValue(of('1234'));
    component.ngOnChanges({
      voucherId: new SimpleChange(null, 1, true)
    });
    expect(spy).toHaveBeenCalled();
  });

  it('should remove last digit of the value when user key backspace when the value length is greater than 0', fakeAsync(() => {
    const firstInput = fixture.debugElement.query(By.css('input#input_0')).nativeElement;
    firstInput.value = '2';
    firstInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.value).toBe('2');
    });
    tick();
    const keyEvent = new KeyboardEvent('keyUp', { key: 'Backspace' });
    const spy = jest.spyOn(keyEvent, 'stopPropagation');
    component.onKey(keyEvent);
    fixture.whenStable().then(() => {
      expect(component.value).toBe('');
      expect(spy).toHaveBeenCalled();
    });
  }));

  it('should not remove last digit of the value when user key is not backspace when the value length is greater than 0', fakeAsync(() => {
    const firstInput = fixture.debugElement.query(By.css('input#input_0')).nativeElement;
    firstInput.value = '2';
    firstInput.dispatchEvent(new Event('input'));
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      expect(component.value).toBe('2');
    });
    tick();
    const keyEvent = new KeyboardEvent('keyUp', { key: 'Enter' });
    const spy = jest.spyOn(keyEvent, 'stopPropagation');
    component.onKey(keyEvent);
    fixture.whenStable().then(() => {
      expect(component.value).toBe('2');
      expect(spy).not.toHaveBeenCalled();
    });
  }));

  it('should emit false when inputs onblur', () => {
    const spy = jest.spyOn(component.pinFocused, 'emit');
    component.onBlur();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should emit true when inputs onFocus', () => {
    const spy = jest.spyOn(component.pinFocused, 'emit');
    component.onFocus();
    expect(spy).toHaveBeenCalledWith(true);
  });

});
