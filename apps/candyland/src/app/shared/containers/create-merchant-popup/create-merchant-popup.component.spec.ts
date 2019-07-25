import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMerchantPopupComponent } from './create-merchant-popup.component';

describe('CreateMerchantPopupComponent', () => {
  let component: CreateMerchantPopupComponent;
  let fixture: ComponentFixture<CreateMerchantPopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateMerchantPopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMerchantPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
