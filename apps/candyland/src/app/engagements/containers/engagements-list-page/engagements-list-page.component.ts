import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatDialog } from '@angular/material';
import { tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { EngagementsService } from '@cl-core/services';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import { Engagement } from '@cl-core/models/engagement.model';

@Component({
  selector: 'cl-engagements-list-page',
  templateUrl: './engagements-list-page.component.html',
  styleUrls: ['./engagements-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsListPageComponent implements AfterViewInit {
  public dataSource = new MatTableDataSource<Engagement>();
  public tabsFilterConfig;
  public hasData = true;
  public isGridMode = true;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private engagementsService: EngagementsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  public ngAfterViewInit(): void {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private getData(): void {
    this.engagementsService.getEngagements()
      .pipe(
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'attributes_type');
          this.tabsFilterConfig = PrepareTableFilers.prepareTabsFilterConfig(counterObject, data);
        }),
      )
      .subscribe((res: Engagement[]) => {
        this.dataSource.data = res;
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }
}
