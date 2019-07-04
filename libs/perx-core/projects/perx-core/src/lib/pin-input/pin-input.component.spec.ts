import { async, ComponentFixture, TestBed, tick, fakeAsync } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { PinInputComponent } from './pin-input.component';
import { ReactiveFormsModule, FormControl } from '@angular/forms';
import { VouchersModule } from '../vouchers/vouchers.module';
import { PinService } from './pin.service';
import { By } from '@angular/platform-browser';
import { SimpleChange, Type } from '@angular/core';

describe('PinInputComponent', () => {
  let component: PinInputComponent;
  let fixture: ComponentFixture<PinInputComponent>;
  let pinService: PinService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PinInputComponent],
      imports: [
        VouchersModule.forRoot({ env: { apiHost: '' } }),
        ReactiveFormsModule,
        HttpClientTestingModule,
      ],
      providers: [PinService]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PinInputComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    pinService = TestBed.get<PinService>(PinService as Type<PinService>);
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
    const spy = spyOn(pinService, 'getPin').and.callThrough();
    component.ngOnChanges({
      voucherId: new SimpleChange(null, 1, true)
    });
    expect(spy).toHaveBeenCalled();
  });

});
