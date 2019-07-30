import {
  async,
  ComponentFixture,
  TestBed
} from '@angular/core/testing';

import { GameComponent } from './game.component';
import { HeaderComponent } from '../header/header.component';
import { CampaignModule, CognitoModule, OauthModule, GameModule, VouchersService } from '@perx/core';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { environment } from '../../environments/environment';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let spy: any;
  const vouchersServiceMock = jasmine.createSpyObj('VouchersService', ['']);

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, HeaderComponent],
      imports: [
        MatToolbarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CampaignModule.forRoot({ env: environment }),
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
        GameModule.forRoot({ env: environment }),
      ],
      providers: [
        { provide: VouchersService, useValue: vouchersServiceMock }
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
