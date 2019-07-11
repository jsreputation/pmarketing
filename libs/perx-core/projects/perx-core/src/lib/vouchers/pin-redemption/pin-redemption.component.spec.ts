import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { PinRedemptionComponent } from './pin-redemption.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { PinService } from '../pin.service';
import { By } from '@angular/platform-browser';
import { SimpleChange } from '@angular/core';
import { VouchersService } from '../vouchers.service';
import { of } from 'rxjs';

describe('PinRedemptionComponent', () => {
  let component: PinRedemptionComponent;
  let fixture: ComponentFixture<PinRedemptionComponent>;
  const pinServiceMock = jasmine.createSpyObj('PinService', ['getPin']);
  const vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinRedemptionComponent],
      imports: [
        ReactiveFormsModule
      ],
      providers: [
        { useValue: pinServiceMock, provide: PinService },
        { useValue: vouchersServiceMock, provide: VouchersService }
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

  it('should update the value once the input value changes detect', () => {
    const control = new FormControl('');
    fixture.componentInstance.controls[0] = control;
    fixture.detectChanges();
    const spy = spyOn(component, 'onUpdate');
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
    const spy = pinServiceMock.getPin.and.returnValue( of('1234') );
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
    const spy = spyOn(keyEvent, 'stopPropagation');
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
    const spy = spyOn(keyEvent, 'stopPropagation');
    component.onKey(keyEvent);
    fixture.whenStable().then(() => {
      expect(component.value).toBe('2');
      expect(spy).not.toHaveBeenCalled();
    });
  }));

  it('should emit false when inputs onblur', () => {
    const spy = spyOn(component.pinFocused, 'emit');
    component.onBlur();
    expect(spy).toHaveBeenCalledWith(false);
  });

  it('should emit true when inputs onFocus', () => {
    const spy = spyOn(component.pinFocused, 'emit');
    component.onFocus();
    expect(spy).toHaveBeenCalledWith(true);
  });

});
