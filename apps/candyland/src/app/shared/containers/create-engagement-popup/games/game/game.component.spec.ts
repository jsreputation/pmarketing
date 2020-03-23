import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GameComponent } from './game.component';
import { MatFormFieldModule, MatIconModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { ButtonModule } from '@perxtech/candyshop';
import { ReactiveFormsModule } from '@angular/forms';
import { GamesType } from '../shared/games-type';
import { TranslateModule } from '@ngx-translate/core';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatIconModule,
        MatFormFieldModule,
        MatSelectModule,
        ButtonModule,
        MatRadioModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [GameComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    component.game = GamesType[0];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
