import {async, ComponentFixture, TestBed} from '@angular/core/testing';

import {MerchantInfoFormGroupComponent} from './merchant-info-form-group.component';

describe('MerchantInfoFormGroupComponent', () => {
  let component: MerchantInfoFormGroupComponent;
  let fixture: ComponentFixture<MerchantInfoFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantInfoFormGroupComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantInfoFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
