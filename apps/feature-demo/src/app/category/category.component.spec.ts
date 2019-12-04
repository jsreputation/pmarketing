import {
  async,
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import {
  ActivatedRoute,
  Router,
} from '@angular/router';
import {
  MatIconModule,
  MatToolbarModule,
  MatCardModule,
  MatBottomSheetModule,
} from '@angular/material';
import { Type } from '@angular/core';
import { RouterTestingModule } from '@angular/router/testing';

import { of } from 'rxjs';

import {
  RewardsService,
  RewardsModule,
  ThemesService,
} from '@perx/core';

import { SortingMode } from './category.model';
import { CategoryComponent } from './category.component';

import { rewards } from '../rewards.mock';
import { catalogs } from '../catalogs.mock';
import { RewardsSortPipe } from './rewards-sort.pipe';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  const rewardsServiceStub = {
    getAllRewards: () => of(rewards),
    getCatalog: () => of(catalogs[0])
  };
  const themesServiceStub = {
    getThemeSetting: () => of()
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
        MatCardModule,
        RewardsModule
      ],
      providers: [
        {
          provide: RewardsService,
          useValue: rewardsServiceStub,
        },
        {
          provide: ActivatedRoute,
          useValue: activatedRouteStub,
        },
        {
          provide: Router,
          useValue: routerStub,
        },
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
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

  // describe('getMacaron', () => {
  //   it('should return expiring', () => {
  //     const currentTime = new Date();
  //     const validTo = new Date(currentTime.setDate(currentTime.getDate() + 1)); // set to 24hrs
  //     const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 4)); // set to 96hrs
  //     const macaronText = component.getMacaron((validFrom), String(validTo));
  //     expect(macaronText).toBe('expiring');
  //   });

  //   it('should return just-added', () => {
  //     const currentTime = new Date();
  //     const validTo = new Date(currentTime.setDate(currentTime.getDate() + 2)); // set to 48hrs
  //     const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 1)); // set to 24hrs
  //     const macaronText = component.getMacaron(String(validFrom), String(validTo));
  //     expect(macaronText).toBe('just-added');
  //   });

  //   it('should return empty string', () => {
  //     const currentTime = new Date();
  //     const validTo = new Date(currentTime.setDate(currentTime.getDate() + 2)); // set to 48hrs
  //     const validFrom = new Date(currentTime.setDate(currentTime.getDate() + 4)); // set to 96hrs
  //     const macaronText = component.getMacaron(String(validFrom), String(validTo));
  //     expect(macaronText).toBe('');
  //   });
  // });

  describe('onInit', () => {
    it('should get category name', fakeAsync(() => {
      expect(component.selectedCategory).toBe('All');
    }));
  });

  it('should select reward and navigate', () => {
    const reward = {
      id: 1,
      name: 'Reward',
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
    expect(sortingMode).toBe('Ending Soon');
  });

  it('should create pipe', () => {
    const sortPipe = new RewardsSortPipe();
    expect(sortPipe).toBeTruthy();
  });

  it('should sort rewards on SortingMode.latest using valid from', fakeAsync(() => {
    const sortPipe = new RewardsSortPipe();
    const returnValue = sortPipe.transform(of(rewards), SortingMode.latest);
    tick();
    returnValue.subscribe(
      (values) => {
        expect(values[0].id).toBe(2);
      }
    );
  }));

  it('should sort rewards on SortingMode.ending_soon using valid from', fakeAsync(() => {
    const sortPipe = new RewardsSortPipe();
    const returnValue = sortPipe.transform(of(rewards), SortingMode.ending_soon);
    tick();
    returnValue.subscribe(
      (values) => {
        expect(values[0].id).toBe(3);
      }
    );
  }));
});
