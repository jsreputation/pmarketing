import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PointConversionConfirmationComponent } from './point-conversion-confirmation.component';

describe('PointConversionConfirmationComponent', () => {
  let component: PointConversionConfirmationComponent;
  let fixture: ComponentFixture<PointConversionConfirmationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PointConversionConfirmationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointConversionConfirmationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
