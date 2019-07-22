import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';

import { GameComponent } from './game.component';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import {
  PerxCoreModule,
  IStampCard,
  VouchersModule,
  CampaignModule,
  StampModule,
  AuthenticationModule,
  CognitoModule,
  OauthModule
} from '@perx/core/dist/perx-core';
import { MatToolbarModule } from '@angular/material';
import { environment } from '../../environments/environment';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, HeaderComponent],
      imports: [
        RouterTestingModule,
        PerxCoreModule,
        MatToolbarModule,
        VouchersModule.forRoot({ env: environment }),
        CampaignModule.forRoot({ env: environment }),
        StampModule.forRoot({ env: environment }),
        AuthenticationModule,
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should execute onMoved function', () => {
    spy = spyOn(component, 'onMoved').and.callThrough();
    (component.onMoved({} as IStampCard));
    expect(spy).toHaveBeenCalled();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
