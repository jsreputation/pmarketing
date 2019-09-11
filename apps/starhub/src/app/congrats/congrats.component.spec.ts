import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import {
  MatToolbarModule,
  MatCardModule,
} from '@angular/material';

import { CongratsComponent } from './congrats.component';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { IGameService } from '@perx/core';
import { Type } from '@angular/core';
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
        // { provide: Router, useValue: routerStub },
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

  describe('onInit', () => {
    it('should call gameService play if gameId is present in params', fakeAsync(() => {
      const gameService: IGameService = fixture.debugElement.injector.get<IGameService>(IGameService as Type<IGameService>);
      const gameServiceSpy = spyOn(gameService, 'play').and.returnValue(
        of({
          vouchers: []
        })
      );
      component.ngOnInit();
      tick();
      expect(gameServiceSpy).toHaveBeenCalled();
    }));

    // it('should navigate to reward with queryParams id on viewReward', () => {
    //   const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    //   const routerSpy = spyOn(router, 'navigate');
    //   component.viewReward(1);
    //   expect(routerSpy).toHaveBeenCalledWith(['/reward'], { queryParams: { id: 1 } });
    // });
  });
});
