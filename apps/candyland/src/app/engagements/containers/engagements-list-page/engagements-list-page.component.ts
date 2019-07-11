import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { map, tap } from 'rxjs/operators';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { EngagementsService } from '@cl-core/services/engagements.service';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';

@Component({
  selector: 'cl-engagements-list-page',
  templateUrl: './engagements-list-page.component.html',
  styleUrls: ['./engagements-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsListPageComponent implements AfterViewInit {

  public displayedColumns = ['name', 'status', 'type', 'actions'];
  public dataSource = new MatTableDataSource<Engagement>();
  public tabsFilterConfig;
  public hasData = true;

  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) private paginator: MatPaginator;

  constructor(private engagementsService: EngagementsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }

  public editItem(id: number) {
    console.log(id);
  }

  public duplicateItem(id: number) {
    console.log(id);
  }

  public deleteItem(id: number) {
    console.log(id);
  }

  public useAsCaptionItem(id: number) {
    console.log(id);
  }

  private getData() {
    this.engagementsService.getEngagements()
      .pipe(
        map((response: any) => response.results),
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'type');
          this.tabsFilterConfig = PrepareTableFilers.prepareTabsFilterConfig(data, counterObject);
        }),
      )
      .subscribe((res: Engagement[]) => {
        this.dataSource.data = res;
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }
}
