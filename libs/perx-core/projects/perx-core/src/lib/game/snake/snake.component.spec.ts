import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SnakeGameComponent, Number2 } from './snake.component';
import { SimpleChanges, SimpleChange } from '@angular/core';
import * as GetImageCors from '../../utils/getImageCors';

describe('SnakeGameComponent', () => {
  let component: SnakeGameComponent;
  let fixture: ComponentFixture<SnakeGameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SnakeGameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeGameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Number2 should randomize', () => {
    const spy = spyOn(Math, 'floor');
    const namber = new Number2(1, 2);
    namber.randomize(3);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle ngOnChanges', () => {
    component.background = 'snake';
    let vfunction;
    const spyObj = new Proxy({ name: 'test', onload: () => { } }, {
      set(_: any, key: string, val: any): boolean {
        if ('onload' === key) {
          vfunction = val;
        }
        return true;
      }
    });
    const funcSpy = jasmine.createSpy('getImageCors').and.returnValue(spyObj);
    spyOnProperty(GetImageCors, 'getImageCors', 'get').and.returnValue(funcSpy);
    component.ngOnChanges({
      target: {
        previousValue: 1,
        currentValue: 2,
        firstChange: true,
        isFirstChange: () => true
      },
      snake: {} as SimpleChange,
      background: {} as SimpleChange
    } as SimpleChanges);
    vfunction();
    spyOn(spyObj, 'onload');
    expect(funcSpy).toHaveBeenCalled();
  });

  // change how render and depends on async fetch image and getCors
  // it('render with target', fakeAsync(() => {
  //   component.target = 'test';
  //   component.startGameAndRender();
  //   const spy = spyOn(component.ctx, 'drawImage');
  //   tick(1000);
  //   component.ngOnDestroy();
  //   expect(spy).toHaveBeenCalled();
  // }));

  it('should handle keyevent', fakeAsync(() => {
    const spyLeft = spyOn(component, 'left');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(spyLeft).toHaveBeenCalled();
    const spyUp = spyOn(component, 'up');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(spyUp).toHaveBeenCalled();
    const spyRight = spyOn(component, 'right');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(spyRight).toHaveBeenCalled();
    const spyDown = spyOn(component, 'down');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(spyDown).toHaveBeenCalled();
  }));
  afterAll(() => {
    component.ngOnDestroy();
  });

});
