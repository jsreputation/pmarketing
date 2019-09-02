import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatIconModule,
  MatToolbarModule,
} from '@angular/material';
import { GameModule, GameService } from '@perx/core';
import { GameComponent } from './game.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { Location } from '@angular/common';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  const routerStub = { navigate: () => ({}) };

  const gameServiceStub = {
    get: () => of()
  };
  const locationStub = {
    back: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GameComponent ],
      imports: [ MatIconModule, MatToolbarModule, GameModule ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: { queryParams: of() } },
        { provide: GameService, useValue: gameServiceStub },
        { provide: Location, useValue: locationStub }
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
