import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TreatEnrollSuccessPageComponent } from './treat-enroll-success-page.component';

describe('TreatEnrollSuccessPageComponent', () => {
  let component: TreatEnrollSuccessPageComponent;
  let fixture: ComponentFixture<TreatEnrollSuccessPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TreatEnrollSuccessPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TreatEnrollSuccessPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
