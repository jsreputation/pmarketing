import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IReward, RewardsService } from '@perxtech/core';
import { switchMap } from 'rxjs/operators';
import { SubCategory } from '../../models/category.model';
import { filterModel } from '../../models/filter.model';
import { FilterService } from '../../shared/services/filter.service';
import { CATALOG_CONFIGURATION } from '../constant/catalog-configuration';
import { of } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { IReward, RewardsService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bdo-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss'],
})
export class CatalogPageComponent implements OnInit {
  categoryCode: string;
  subCategoryCodeSelected: SubCategory[];
  requestPageSize = 5;
  filterResult$: Observable<IReward[]> = null;
  isLoaded = false;
  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {

    this.categoryCode = history.state.categoryCode;
    this.subCategoryCodeSelected = history.state.subCategoried;

    this.activeRoute.queryParams
      .subscribe((params) => {
        this.isLoaded = true;
        this.filterService.setParams((params));
        this.filterResult$ = this.rewardsService
          .getRewards(1, this.requestPageSize, [params.tags]);
      });
  lstCategory: filterModel[] = [
    {
      name: 'Essentials',
      linkImage: 'assets/images/grocery-enclosed-outline-fullcolor.svg',
    },
    {
      name: 'Pay Bills',
      linkImage: 'assets/images/pay_bills-enclosed-outline-fullcolor.svg',
    },
    {
      name: 'Entertainment',
      linkImage: 'assets/images/entertainment-enclosed-outline-fullcolor.svg',
    },
  ];
  constructor(
    private activeRoute: ActivatedRoute,
    private rewardsService: RewardsService,
    private filterService: FilterService
  ) {}
  ngOnInit(): void {
    this.categoryCode = history.state.categoryCode;
    this.subCategoryCodeSelected = history.state.subCategoried;
    switchMap;
    this.activeRoute.queryParams
      .pipe(
        switchMap((params) => {
          this.filterService.setParams(params);
          switch (params['type']) {
            case this.catalogConfiguation.tags.type: {
              return this.rewardsService.getRewards(1, this.requestPageSize, [
                params['tags'],
              ]);
            }
            case this.catalogConfiguation.deals.type: {
              console.log(params['tags']);
              return of([]);
            }
            case this.catalogConfiguation.category.type: {
              return of([]);
            }
          }
        })
      )
      .subscribe((rewards: IReward[]) => {
        this.rewards = rewards;
      });
  }
}
