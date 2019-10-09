import {
  Component,
  ChangeDetectionStrategy,
  OnDestroy
} from '@angular/core';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { CustomDataSource } from '@cl-shared/table';

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
    private loyaltyService: LoyaltyService
    // public cd: ChangeDetectorRef,
  ) {
    this.dataSource = new CustomDataSource<any>(this.loyaltyService);
  }

  public ngOnDestroy(): void {
  }
}
