import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IGame, SnakeGameComponent } from '@perxtech/core';
import { SnakeComponent } from './snake.component';

describe('SnakeComponent', () => {
  let component: SnakeComponent;
  let fixture: ComponentFixture<SnakeComponent>;
  const mockGame: IGame = {
    id: 1,
    type: 0,
    remainingNumberOfTries: 3,
    config: {
      snakeHead: 'string', // snakeWholeImage copy colorCtrls
      snakeBody: 'string',
      background: 'string',
      targetIcon: 'string',
      gameArea: 'string',
      targetRequired: 3
    },
    texts: {
      title: 'HELLO',
      subTitle: 'hello'
    },
    results: {
    }
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SnakeComponent,
        SnakeGameComponent
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SnakeComponent);
    component = fixture.componentInstance;
    component.game = mockGame;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
