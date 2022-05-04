import {
  async,
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick
} from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatBottomSheet, MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import {
  ConfigService,
  RewardsService,
  SettingsService,
} from '@perxtech/core';
import { of } from 'rxjs';
import { rewards } from '../rewards.mock';
import { catalogs } from '../catalogs.mock';
import {
  ActivatedRoute,
  Router
} from '@angular/router';
import { Type } from '@angular/core';
import { SortingMode } from './category.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategorySelectComponent } from './category-select/category-select.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CategorySortComponent } from './category-sort/category-sort.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { GhostCardComponent } from '../ghosts/card-ghost.component';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;

  const rewardsServiceStub: Partial<RewardsService> = {
    getRewards: () => of(rewards),
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
  const routerStub: Partial<Router> = {
    navigate: () => Promise.resolve(true)
  };
  const matBottomSheetStub = {
    open: () => { }
  };
  const configServiceStub: Partial<ConfigService> = {
    readAppConfig: () => of()
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryComponent,
        CategorySelectComponent,
        CategorySortComponent,
        GhostCardComponent
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatBottomSheetModule,
        MatCardModule,
        BrowserAnimationsModule,
        InfiniteScrollModule
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: MatBottomSheet, useValue: matBottomSheetStub },
        { provide: ConfigService, useValue: configServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub }
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [CategorySelectComponent, CategorySortComponent] }
      }
      )
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
      rewardPrice: undefined,
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: undefined,
      loyalty: []
    };

    const router = TestBed.get<Router>(Router as Type<Router>);
    const routerSpy = spyOn(router, 'navigate');
    component.selected(reward);
    expect(routerSpy).toHaveBeenCalledWith(['/reward'], { queryParams: { id: 1 } });
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

  it('should call bottomSheet on selectCategory', fakeAsync(() => {
    const bottomSheet = TestBed.get<MatBottomSheet>(MatBottomSheet as Type<MatBottomSheet>);
    const bottomSheetSpy = spyOn(bottomSheet, 'open');
    component.selectCategory();
    tick();
    expect(bottomSheetSpy).toHaveBeenCalled();
  }));

  it('should call bottomSheet on selectSort', fakeAsync(() => {
    const bottomSheet = TestBed.get<MatBottomSheet>(MatBottomSheet as Type<MatBottomSheet>);
    const bottomSheetSpy = spyOn(bottomSheet, 'open');
    component.selectSort();
    tick();
    expect(bottomSheetSpy).toHaveBeenCalled();
  }));

  describe('onScroll', () => {
    it('should be undefined', () => {
      const onScroll = component.onScroll();
      expect(onScroll).toBe(undefined);
    });

    it('should increment catalogsPageId', () => {
      component.rewardsEnded = false;
      component.onScroll();
      expect(component.rewardsPageId).toBe(2);
    });
  });

});
