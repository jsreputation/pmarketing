import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GamesComponent } from './games.component';
import { GameComponent } from './game/game.component';
import { MatFormFieldModule, MatRadioModule, MatSelectModule } from '@angular/material';
import { ButtonModule } from '@perx/candyshop';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
describe('GamesComponent', () => {
  let component: GamesComponent;
  let fixture: ComponentFixture<GamesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatSelectModule,
        ButtonModule,
        MatRadioModule,
        ReactiveFormsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [
        GamesComponent,
        GameComponent
      ],
      schemas: [ NO_ERRORS_SCHEMA ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GamesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
