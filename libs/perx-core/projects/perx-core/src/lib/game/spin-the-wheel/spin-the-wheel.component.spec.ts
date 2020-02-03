import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SpinTheWheelComponent } from './spin-the-wheel.component';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';

describe('SpinTheWheelComponent', () => {
  let component: SpinTheWheelComponent;
  let fixture: ComponentFixture<SpinTheWheelComponent>;
  let debugElement: DebugElement;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SpinTheWheelComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SpinTheWheelComponent);
    debugElement = fixture.debugElement;
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('handle mouse event', () => {
    const eventMouseUp = new MouseEvent('mouseup');
    debugElement.query(By.css('#ng-wheel-canvas')).nativeElement.dispatchEvent(eventMouseUp);
    expect(component.dragging).toBeFalsy();
    const eventMouseStart = new MouseEvent('mousedown');
    debugElement.query(By.css('#ng-wheel-canvas')).nativeElement.dispatchEvent(eventMouseStart);
    expect(component.dragging).toBeTruthy();
    const eventMouseMove = new MouseEvent('mousemove');
    debugElement.query(By.css('#ng-wheel-canvas')).nativeElement.dispatchEvent(eventMouseMove);
    expect(component.dragging).toBeTruthy();
  });
});
