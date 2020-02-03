import {async, ComponentFixture, fakeAsync, TestBed, tick} from '@angular/core/testing';
import { SimpleChange, DebugElement } from '@angular/core';
import { ISlice } from '../game.model';
import { SpinTheWheelComponent } from './spin-the-wheel.component';
import { By } from '@angular/platform-browser';

describe('SpinTheWheelComponent', () => {
  let component: SpinTheWheelComponent;
  let fixture: ComponentFixture<SpinTheWheelComponent>;
  let debugElement: DebugElement;
  let imageOnload: (() => void)[];
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
    tick(); // will trigger onload and push the onload function onto the array
    expect(imageOnload[0]).toBeTruthy(); // emulate onload
  }));

  it('ngOnChanges', fakeAsync(() => {
    // we check that our images are actually loaded correctly
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
    // doesnt make sense to check size since it is set from an actual picture taking the dimensions * 1.2
    expect(imageOnload[1]).toBeTruthy();
  }));

  it('ngAfterViewInit', () => {
    component.ngAfterViewInit();
    // we onloaded background image and wheelImg
    expect(imageOnload.length).toBeGreaterThanOrEqual(2);
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
