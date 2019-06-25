import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
  inject
} from '@angular/core/testing';

import { GameComponent } from './game.component';
import { HeaderComponent } from '../header/header.component';
import { PerxCoreModule, CampaignModule, CognitoModule, OauthModule, GameModule } from '@perx/core/dist/perx-core';
import { MatToolbarModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { Router } from '@angular/router';
import { environment } from '../../environments/environment';

describe('GameComponent', () => {
  let component: GameComponent;
  let fixture: ComponentFixture<GameComponent>;
  let spy: any;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [GameComponent, HeaderComponent],
      imports: [
        PerxCoreModule,
        MatToolbarModule,
        RouterTestingModule,
        HttpClientTestingModule,
        CampaignModule.forRoot({ env: environment }),
        CognitoModule.forRoot({ env: environment }),
        OauthModule.forRoot({ env: environment }),
        GameModule.forRoot({ env: environment }),
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should execute onTap function', () => {
    spy = spyOn(component, 'onTap').and.callThrough();
    component.onTap({ tap: 5 });
    expect(spy).toHaveBeenCalled();
  });

  // it('should execute done function', () => {
  //   spy = spyOn(component, 'done').and.callThrough();
  //   component.done();
  //   expect(spy).toHaveBeenCalled();
  // });

  it('should call setTimeout', inject(
    [Router],
    fakeAsync((router: Router) => {
      spy = spyOn(component, 'onTap').and.callThrough();
      spyOn(router, 'navigate').and.stub();
      component.onTap({ tap: 5 });
      tick(3500);
      fixture.detectChanges();

      expect(spy).toHaveBeenCalled();
    })
  ));

  // it('should call setTimeout', inject(
  //   [Router],
  //   fakeAsync((router: Router) => {
  //     spy = spyOn(component, 'onTap').and.returnValue();
  //     spyOn(router, 'navigate').and.stub();
  //     component.onTap({ tap: 5 });
  //     tick(3500);
  //     fixture.detectChanges();

  //     expect(component.onTap({ tap: 5 })).toBeFalsy();
  //   })
  // ));

  it('should onTap function to be undefined', () => {
    expect(component.onTap({ tap: 0 })).toBe(undefined);
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
