import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeExpiryDatePopupComponent } from './change-expiry-date-popup.component';

describe('ChangeExpiryDatePopupComponent', () => {
  let component: ChangeExpiryDatePopupComponent;
  let fixture: ComponentFixture<ChangeExpiryDatePopupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeExpiryDatePopupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeExpiryDatePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
