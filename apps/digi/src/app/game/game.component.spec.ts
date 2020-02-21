import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { GameComponent } from './game.component';
import { HeaderComponent } from '../header/header.component';
import { CampaignModule, GameModule, IGameService, ICampaignService } from '@perx/core';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let spy: any;
  const gameServiceStub: Partial<IGameService> = {};
  const campaignServiceStub: Partial<ICampaignService> = {
    getCampaigns: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, HeaderComponent],
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        CampaignModule,
        GameModule,
      ],
      providers: [
        { provide: IGameService, useValue: gameServiceStub },
        { provide: ICampaignService, useValue: campaignServiceStub }
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should execute done function', () => {
    spy = spyOn(component, 'onComplete').and.callThrough();
    component.onComplete();
    expect(spy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
