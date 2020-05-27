import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { SnakeGameComponent, Number2 } from './snake.component';

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
    const spy = jest.spyOn(Math, 'floor');
    const namber = new Number2(1, 2);
    namber.randomize(3);
    expect(spy).toHaveBeenCalled();
  });

  it('should handle keyevent', fakeAsync(() => {
    const spyLeft = jest.spyOn(component, 'left');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));
    expect(spyLeft).toHaveBeenCalled();
    const spyUp = jest.spyOn(component, 'up');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));
    expect(spyUp).toHaveBeenCalled();
    const spyRight = jest.spyOn(component, 'right');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));
    expect(spyRight).toHaveBeenCalled();
    const spyDown = jest.spyOn(component, 'down');
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));
    expect(spyDown).toHaveBeenCalled();
  }));
});
