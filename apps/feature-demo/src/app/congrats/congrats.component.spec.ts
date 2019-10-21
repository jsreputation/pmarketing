import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatToolbarModule,
  MatCardModule,
} from '@angular/material';

import { CongratsComponent } from './congrats.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IGameService } from '@perx/core';
import { RouterTestingModule } from '@angular/router/testing';
import { GameOutcomeService } from './game-outcome/game-outcome.service';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;

  const gameServiceStub = {
    play: () => of()
  };

  const gameOutcomeServiceStub = {
    getVouchersRewarded: () => {}
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ CongratsComponent ],
      imports: [ MatToolbarModule, MatCardModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({gameId: 1}) } },
        { provide: IGameService, useValue: gameServiceStub },
        { provide: GameOutcomeService, useValue: gameOutcomeServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CongratsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
