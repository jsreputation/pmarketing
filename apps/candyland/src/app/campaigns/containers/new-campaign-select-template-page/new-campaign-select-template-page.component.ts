import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';
import { map, tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { MatTableDataSource } from '@angular/material';
import { EngagementsService } from '@cl-core/services/engagements.service';

@Component({
  selector: 'cl-new-campaign-select-template-page',
  templateUrl: './new-campaign-select-template-page.component.html',
  styleUrls: ['./new-campaign-select-template-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignSelectTemplatePageComponent implements OnInit {
  public dataSource = new MatTableDataSource<Engagement>();
  public typeFilterConfig: OptionConfig[];

  constructor(private engagementsService: EngagementsService,
              public cd: ChangeDetectorRef) { }

  ngOnInit() {
    this.initData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.filteredData
  }

  private initData() {
    this.engagementsService.getEngagements()
      .pipe(
        map((response: any) => response.results),
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'type');
          this.typeFilterConfig = PrepareTableFilers.prepareOptionsConfig(counterObject);
        }),
      )
      .subscribe((res: Engagement[]) => {
        this.dataSource.data = res;
        // this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }

}
