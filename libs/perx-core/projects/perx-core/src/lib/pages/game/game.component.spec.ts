import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { of } from 'rxjs';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { MatDialogModule, MatProgressBarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { GameModule } from '../../game/game.module';
import { IGameService } from '../../game/igame.service';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const gameServiceStub = {
    getGamesFromCampaign: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, ShakeComponent, TapComponent],
      imports: [
        GameModule,
        MatDialogModule,
        MatProgressBarModule,
        RouterTestingModule.withRoutes([
          { path: 'wallet', redirectTo: '/' }
        ])
      ],
      providers: [
        {
          provide: IGameService, useValue: gameServiceStub
        }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
