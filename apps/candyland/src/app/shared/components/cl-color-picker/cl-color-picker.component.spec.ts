import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ClColorPickerComponent } from './cl-color-picker.component';

describe('ClColorPickerComponent', () => {
  let component: ClColorPickerComponent;
  let fixture: ComponentFixture<ClColorPickerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ClColorPickerComponent ]
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
