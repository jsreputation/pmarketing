import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Type } from '@angular/core';
import { CategoriesComponent } from './categories.component';
import { MatIconModule, MatCardModule } from '@angular/material';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { RewardsModule, RewardsService } from '@perx/core';
import { rewards } from '../../rewards.mock';
import { of } from 'rxjs';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  const routerStub = {
    navigate: () => { }
  };

  const rewardsServiceStub = {
    getAllRewards: () => of(rewards)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesComponent ],
      imports: [
        MatIconModule,
        MatCardModule,
        RouterTestingModule,
        RewardsModule
      ],
      providers: [
        { provide: Router, useValue: routerStub },
        { provide: RewardsService, useValue: rewardsServiceStub}
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should emit tap with selected category', () => {
    const router: Router = fixture.debugElement.injector.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    const reward = {
      id: 1,
      name: 'Test reward',
      description: 'test description',
      subtitle: 'reward',
      validFrom: new Date(),
      validTo: new Date(),
      sellingFrom: new Date(),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      rewardPrice: [],
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: [],
      inventory: null,
    };
    component.rewardClickedHandler(reward);
    expect(routerSpy).toHaveBeenCalledWith(['/reward'], { queryParams: { id: reward.id } });
  });
});
