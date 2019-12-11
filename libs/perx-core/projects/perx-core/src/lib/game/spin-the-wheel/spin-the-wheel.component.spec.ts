import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { SpinTheWheelComponent } from './spin-the-wheel.component';
import { SimpleChange, DebugElement } from '@angular/core';
import { ISlice } from '../game.model';
import { By } from '@angular/platform-browser';

describe('SpinTheWheelComponent', () => {
  let component: SpinTheWheelComponent;
  let fixture: ComponentFixture<SpinTheWheelComponent>;
  let imageOnload: (() => void)[];
  let debugElement: DebugElement;
  beforeAll(() => {
    Object.defineProperty(Image.prototype, 'onload', {
      get(): any {
        return this._onload;
      },
      set(fn: () => any): void {
        imageOnload.push(fn);
        this._onload = fn;
      }
    });
  });
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
  it('ngOnChanges else', fakeAsync(() => {
    // else flow
    imageOnload = [];
    component.ngOnChanges({
      wheelImg: {} as SimpleChange,
      pointerImg: {} as SimpleChange
    });
    component.slices = [{
      id: '1',
      backgroundImage: 'image.img'
    } as ISlice];
    component.ngOnChanges({
      slices: {} as SimpleChange,
      wheelImg: {} as SimpleChange,
      pointerImg: {} as SimpleChange
    });
    tick();
    imageOnload[0](); // emulate onload
    expect(component.size).toBeTruthy();
  }));

  it('ngOnChanges', fakeAsync(() => {
    imageOnload = [];
    spyOn(component.ctx, 'createPattern').and.returnValue({ setTransform(): void { } });
    component.ngOnChanges({
      wheelImg: {} as SimpleChange,
      pointerImg: {} as SimpleChange
    });
    component.slices = [{
      id: '1',
      backgroundImage: 'image.img',
      label: 'test'
    } as ISlice];
    component.ngOnChanges({
      slices: {} as SimpleChange,
      wheelImg: {} as SimpleChange,
      pointerImg: {} as SimpleChange
    });
    tick();
    imageOnload[0]();
    imageOnload[1]();
    expect(component.size).toBeTruthy();
  }));

  it('ngAfterViewInit', () => {
    component.ngAfterViewInit();
    expect(component.size).toBeTruthy();
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
