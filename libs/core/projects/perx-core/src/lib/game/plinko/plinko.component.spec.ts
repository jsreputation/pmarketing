import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlinkoComponent, LOSE_PATHS, WIN_PATHS} from './plinko.component';

describe('PlinkoComponent', () => {
  let component: PlinkoComponent;
  let fixture: ComponentFixture<PlinkoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PlinkoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PlinkoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should not start game animation if not enabled', () => {
    component.startGame = false;
    spyOn(component, 'finishedGame');
    component.startGameAnimation();
    expect(component.finishedGame).not.toHaveBeenCalled();
  });

  it('should animation path taken from win path if willWin is true', () => {
    component.startGame = true;
    component.willWin = true;
    component.startGameAnimation();
    expect(WIN_PATHS).toContain(component.ballPath);
  });

  it('should animation path taken from lose path if willWin is false', () => {
    component.startGame = true;
    component.willWin = false;
    component.startGameAnimation();
    expect(LOSE_PATHS).toContain(component.ballPath);
  });
});
