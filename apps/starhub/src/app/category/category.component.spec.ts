import { async, ComponentFixture, TestBed, fakeAsync } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatToolbarModule, MatCardModule, MatBottomSheetModule } from '@angular/material';
import { RewardsService } from '@perx/core';
import { of } from 'rxjs';
import { rewards } from '../rewards.mock';
import { catalogs } from '../catalogs.mock';
import { RewardsSortPipe } from './rewards-sort.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { SortingMode } from './category.model';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const rewardsServiceStub = {
    getAllRewards: () => of(rewards),
    getCatalog: () => of(catalogs[0])
  };
  const activatedRouteStub = {
    snapshot: {
      queryParamMap: {
        get(): string {
          return 'All';
        }
      }
    }
  };
  const routerStub = {
    navigate: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryComponent, RewardsSortPipe],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatBottomSheetModule,
        MatCardModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('getMacaron', () => {
    it('should return expiring', () => {
      const currentTime = new Date();
      const validTo = new Date(currentTime.setDate(currentTime.getDate() + 1)); // set to 24hrs
      const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 4)); // set to 96hrs
      const macaronText = component.getMacaron(String(validFrom), String(validTo));
      expect(macaronText).toBe('expiring');
    });

    it('should return just-added', () => {
      const currentTime = new Date();
      const validTo = new Date(currentTime.setDate(currentTime.getDate() + 2)); // set to 48hrs
      const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 1)); // set to 24hrs
      const macaronText = component.getMacaron(String(validFrom), String(validTo));
      expect(macaronText).toBe('just-added');
    });

    it('should return empty string', () => {
      const currentTime = new Date();
      const validTo = new Date(currentTime.setDate(currentTime.getDate() + 2)); // set to 48hrs
      const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 4)); // set to 96hrs
      const macaronText = component.getMacaron(String(validFrom), String(validTo));
      expect(macaronText).toBe('');
    });
  });

  describe('onInit', () => {
    it('should get category name', fakeAsync(() => {
      expect(component.selectedCategory).toBe('All');
    }));
  });

  it('should select reward and navigate', () => {
    const reward = {
      id: 1,
      name: 'Starhub Reward',
      description: 'Cool Reward',
      subtitle: 'Get it now',
      validFrom: new Date(),
      validTo: new Date(),
      rewardThumbnail: '',
      rewardBanner: '',
      merchantImg: '',
      rewardPrice: null,
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: null,
    };

    const router = TestBed.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    component.selected(reward);
    expect(routerSpy).toHaveBeenCalledWith([ '/reward' ], { queryParams: { id: 1 } } );
  });

  it('should update category on categorySelectedCallback', () => {
    component.categorySelectedCallback('Shopping');
    expect(component.selectedCategory).toBe('Shopping');
  });

  it('should get current selected category', () => {
    const category = component.getCurrentSelectedCategory();
    expect(category).toBe('All');
  });

  it('should update sorting mode on sortOrderSelectedCallback', () => {
    component.sortOrderSelectedCallback(SortingMode.ending_soon);
    expect(component.selectedSortingCraeteria).toBe('Ending Soon');
  });

  it('should get current selected sorting mode', () => {
    const sortingMode = component.getCurrentSelectedOrder();
    expect(sortingMode).toBe('Latest');
  });

});
