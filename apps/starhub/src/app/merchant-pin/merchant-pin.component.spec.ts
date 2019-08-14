import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantPinComponent } from './merchant-pin.component';

describe('MerchantPinComponent', () => {
  let component: MerchantPinComponent;
  let fixture: ComponentFixture<MerchantPinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MerchantPinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantPinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
