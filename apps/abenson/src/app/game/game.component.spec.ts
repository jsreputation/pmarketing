import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { ShakeComponent } from './shake/shake.component';
import { TapComponent } from './tap/tap.component';
import { GameModule, IGameService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';

import { MatDialogModule } from '@angular/material';
import { of } from 'rxjs';

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
        RouterTestingModule,
        MatDialogModule
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
