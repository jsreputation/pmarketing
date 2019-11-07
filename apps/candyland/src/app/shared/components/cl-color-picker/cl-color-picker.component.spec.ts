import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClColorPickerComponent } from './cl-color-picker.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClColorPickerComponent', () => {
  let component: ClColorPickerComponent;
  let fixture: ComponentFixture<ClColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ClColorPickerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ClColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
