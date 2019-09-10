import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  MatToolbarModule,
  MatCardModule,
} from '@angular/material';

import { CongratsComponent } from './congrats.component';
import { Router, ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { GameService } from '@perx/core';
import { Type } from '@angular/core';

describe('CongratsComponent', () => {
  let component: CongratsComponent;
  let fixture: ComponentFixture<CongratsComponent>;
  const routerStub = { navigate: () => ({}) };
  const gameServiceStub = {
    play: () => of()
  };

  beforeEach(async(() => {

    TestBed.configureTestingModule({
      declarations: [ CongratsComponent ],
      imports: [ MatToolbarModule, MatCardModule ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: ActivatedRoute, useValue: { queryParams: of({gameId: 1}) } },
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

  describe('onInit', () => {
    it('should call gameService play if gameId is present in params', fakeAsync(() => {
      const gameService: GameService = fixture.debugElement.injector.get<GameService>(GameService as Type<GameService>);
      const gameServiceSpy = spyOn(gameService, 'play').and.returnValue(
        of({
          data: {
            campaign_id: 1,
            game_id: 1,
            id: 1,
            outcomes: [{
              reward: '',
              voucher_code: '',
            }],
            state: '',
            use_account_id: 1,
          }
        })
      );
      component.ngOnInit();
      tick();
      expect(gameServiceSpy).toHaveBeenCalled();
    }));

    it('should navigate to reward with queryParams id on viewReward', () => {
      const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
      const routerSpy = spyOn(router, 'navigate');
      component.viewReward(1);
      expect(routerSpy).toHaveBeenCalledWith(['/reward'], { queryParams: { id: 1 } });
    });
  });
});
