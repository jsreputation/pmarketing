import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  inject
} from '@angular/core/testing';

import { GameComponent } from './game.component';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HeaderComponent } from '../header/header.component';
import {
  PerxCoreModule,
  IStampCard,
  VouchersModule,
  CampaignModule,
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
    (component.onMoved({} as IStampCard))({ nbPlayedPieces: 1, nbAvailablePieces: 1 });
    expect(spy).toHaveBeenCalled();
  });

  it('should execute onComplete function', inject(
    [Router],
    fakeAsync((router: Router) => {
      spy = spyOn(component, 'onCompleted').and.callThrough();
      spyOn(router, 'navigate').and.stub();
      component.onCompleted();
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    })
  ));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
