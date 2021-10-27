import { Component} from '@angular/core';
import { SubCategory } from '../../models/category.model';
import { filterModel } from '../../models/filter.model';
import { ActivatedRoute } from '@angular/router';
import { IReward, RewardsService } from '@perxtech/core';
import { FilterService } from '../../shared/services/filter.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'bdo-catalog-page',
  templateUrl: './catalog-page.component.html',
  styleUrls: ['./catalog-page.component.scss']
})
export class CatalogPageComponent {
  categoryCode: string;
  subCategoryCodeSelected:SubCategory[];
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
  }
  
  lstCategory: filterModel[] = [
    {
      name: "Essentials",
      linkImage: 'assets/images/grocery-enclosed-outline-fullcolor.svg'

    },
    {
      name: "Pay Bills",
      linkImage: 'assets/images/pay_bills-enclosed-outline-fullcolor.svg'

    },
    {
      name: "Entertainment",
      linkImage: 'assets/images/entertainment-enclosed-outline-fullcolor.svg'
    }
  ]
}
