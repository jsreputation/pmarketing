import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatToolbarModule,
  MatCardModule,
} from '@angular/material';

import { CongratsComponent } from './congrats.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from '@perx/core';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;
  const routerStub = { navigate: () => ({}) };
  const gameServiceStub = {
    play: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CongratsComponent ],
      imports: [ MatToolbarModule, MatCardModule ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({ id: '1' }) } },
        { provide: GameService, useValue: gameServiceStub }
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
