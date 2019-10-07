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

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;
  // const routerStub = { navigate: () => ({}) };
  const gameServiceStub = {
    play: () => of()
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ CongratsComponent ],
      imports: [ MatToolbarModule, MatCardModule, RouterTestingModule ],
      providers: [
        { provide: ActivatedRoute, useValue: { queryParams: of({gameId: 1}) } },
        { provide: IGameService, useValue: gameServiceStub }
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
