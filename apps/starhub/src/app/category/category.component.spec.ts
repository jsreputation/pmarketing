import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { CategoryComponent } from './category.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatIconModule, MatToolbarModule, MatCardModule, MatBottomSheetModule, MatBottomSheet } from '@angular/material';
import { RewardsService } from '@perx/core';
import { of } from 'rxjs';
import { rewards } from '../rewards.mock';
import { catalogs } from '../catalogs.mock';
import { RewardsSortPipe } from './rewards-sort.pipe';
import { ActivatedRoute, Router } from '@angular/router';
import { Type } from '@angular/core';
import { SortingMode } from './category.model';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CategorySelectComponent } from './category-select/category-select.component';
import { BrowserDynamicTestingModule } from '@angular/platform-browser-dynamic/testing';
import { CategorySortComponent } from './category-sort/category-sort.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

describe('CategoryComponent', () => {
  let component: CategoryComponent;
  let fixture: ComponentFixture<CategoryComponent>;
  const rewardsServiceStub = {
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
  const routerStub = {
    navigate: () => {}
  };
  const matBottomSheetStub = {
    open: () => {}
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        CategoryComponent,
        RewardsSortPipe,
        CategorySelectComponent,
        CategorySortComponent,
      ],
      imports: [
        RouterTestingModule,
        MatIconModule,
        MatToolbarModule,
        MatBottomSheetModule,
        MatCardModule,
        BrowserAnimationsModule,
        InfiniteScrollModule,
      ],
      providers: [
        { provide: RewardsService, useValue: rewardsServiceStub },
        { provide: ActivatedRoute, useValue: activatedRouteStub },
        { provide: Router, useValue: routerStub },
        { provide: MatBottomSheet, useValue: matBottomSheetStub },
      ],
    })
      .overrideModule(BrowserDynamicTestingModule, {
        set: { entryComponents: [CategorySelectComponent, CategorySortComponent] } }
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
      rewardPrice: undefined,
      merchantId: 1,
      merchantName: '',
      merchantWebsite: '',
      termsAndConditions: '',
      howToRedeem: '',
      categoryTags: undefined,
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

});
