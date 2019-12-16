import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { ScratchCardComponent } from './scratch-card.component';

describe('ScratchCardComponent', () => {
  let component: ScratchCardComponent;
  let fixture: ComponentFixture<ScratchCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScratchCardComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScratchCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('distanceBetween', () => {
    expect(component.distanceBetween({ x: 1, y: 2 }, { x: 3, y: 4 })).toBeTruthy();
  });

  it('distanceBetween', () => {
    expect(component.angleBetween({ x: 1, y: 2 }, { x: 3, y: 4 })).toBeTruthy();
  });

  it('getFilledInPixels', () => {
    component.canvas.width = 50;
    component.canvas.height = 130;
    expect(component.getFilledInPixels(5)).toBeTruthy();
    // @ts-ignore
    component.canvas = null;
    expect(component.getFilledInPixels(5)).toBe(0);
  });

  it('lastPointOffset', fakeAsync(() => {
    component.lastPoint = { x: 1, y: 2 };
    expect(component.lastPointOffset).toBeTruthy();
  }));

  it('handleMouseMove', () => {
    const spy = spyOn(component, 'handlePercentage');
    component.lastPoint = { x: 1, y: 2 };
    component.canvas.height = 500;
    component.canvas.width = 30;
    component.handleMouseDown(new TouchEvent('touch', {
      touches: [
        new Touch({
          identifier: 1,
          target: new EventTarget(),
          clientX: 50,
          clientY: 100
        })
      ]
    }));
    expect(spy).toHaveBeenCalled();
  });

  it('handleMouseMove', () => {
    const spy = spyOn(component.canvas, 'getContext').and.returnValue(null);
    component.lastPoint = { x: 1, y: 2 };
    component.canvas.height = 500;
    component.canvas.width = 30;
    component.getFilledInPixels(-32);
    component.handleMouseDown(new TouchEvent('touch', {
      touches: [
        new Touch({
          identifier: 1,
          target: new EventTarget(),
          clientX: 50,
          clientY: 100
        })
      ]
    }));
    expect(spy).toHaveBeenCalled();
  });

});
