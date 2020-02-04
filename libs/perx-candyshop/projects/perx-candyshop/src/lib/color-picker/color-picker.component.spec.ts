import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ColorPickerComponent } from 'projects/perx-candyshop/src/lib/color-picker/color-picker.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('ClColorPickerComponent', () => {
  let component: ColorPickerComponent;
  let fixture: ComponentFixture<ColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ColorPickerComponent],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ColorPickerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
