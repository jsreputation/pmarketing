import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsService, RewardsModule } from '@perx/core';
import { RewardDetailComponent } from './reward-detail.component';
import { ActivatedRoute, convertToParamMap, Router } from '@angular/router';
import { of } from 'rxjs';
import { Type } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('RewardDetailComponent', () => {
  let component: RewardDetailComponent;
  let fixture: ComponentFixture<RewardDetailComponent>;
  const routerStub = {
    navigateByUrl: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RewardDetailComponent ],
      imports: [ RouterTestingModule, RewardsModule, TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: RewardsService,
          useValue: {getReward: () => of()}
        },
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(convertToParamMap({ rewardId: 1 }))
          }
        },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get reward id from paramMap and call reward service onInit', fakeAsync(() => {
    const rewardsService: RewardsService = fixture.debugElement.injector.get<RewardsService>(RewardsService as Type<RewardsService>);
    const rewardsServiceSpy = spyOn(rewardsService, 'getReward');
    component.ngOnInit();
    tick();
    expect(component.rewardId).toBe(1);
    expect(rewardsServiceSpy).toHaveBeenCalled();
  }));

  it('should onClick', () => {
    const router: Router = fixture.debugElement.injector.get(Router);
    const routerSpy = spyOn(router, 'navigateByUrl').and.stub();
    component.onClick();
    expect(routerSpy).toHaveBeenCalledWith('redeem/1');
  });
});
