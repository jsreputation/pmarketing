import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {VoucherValidityFormGroupComponent} from './voucher-validity-form-group.component';

describe('VoucherValidityFormGroupComponent', () => {
  let component: VoucherValidityFormGroupComponent;
  let fixture: ComponentFixture<VoucherValidityFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [VoucherValidityFormGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VoucherValidityFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
