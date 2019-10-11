import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { CustomDataSource } from '@cl-shared/table';
import { RewardsService } from '@cl-core/services';

@Component({
  selector: 'cl-loyalty-list-page',
  templateUrl: './loyalty-list-page.component.html',
  styleUrls: ['./loyalty-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LoyaltyListPageComponent implements OnDestroy {
  public dataSource: CustomDataSource<any>;
  public hasData: boolean = true;

  constructor(
    private loyaltyService: RewardsService
    // public cd: ChangeDetectorRef,
  ) {
    this.dataSource = new CustomDataSource<any>(this.loyaltyService);
  }

  public ngOnDestroy(): void {
  }
}
