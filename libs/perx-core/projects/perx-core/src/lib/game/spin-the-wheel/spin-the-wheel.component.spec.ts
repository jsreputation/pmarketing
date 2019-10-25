import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinTheWheelComponent } from './spin-the-wheel.component';

describe('SpinTheWheelComponent', () => {
  let component: SpinTheWheelComponent;
  let fixture: ComponentFixture<SpinTheWheelComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SpinTheWheelComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinTheWheelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
