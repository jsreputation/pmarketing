import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { GamePlayComponent } from './game-play.component';
import { RouterTestingModule } from '@angular/router/testing';
import { PerxCoreModule, GameModule } from '@perx/core/dist/perx-core';

describe('GamePlayComponent', () => {
  let component: GamePlayComponent;
  let fixture: ComponentFixture<GamePlayComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GamePlayComponent ],
      imports: [RouterTestingModule, PerxCoreModule, GameModule]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamePlayComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
