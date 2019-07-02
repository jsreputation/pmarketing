import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { map, tap } from 'rxjs/operators';
import { EngagementsService } from '@cl-core/http-services/engagements-https.service';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { CreateEngagementPopupComponent } from '../create-engagement-popup/create-engagement-popup.component';



export interface Engagements {
  id: number;
  name: string;
  status: string;
  type: string;
}

@Component({
  selector: 'cl-engagements-list-page',
  templateUrl: './engagements-list-page.component.html',
  styleUrls: ['./engagements-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsListPageComponent implements AfterViewInit {

  public displayedColumns = ['name', 'status', 'type', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public tabsFilterConfig;

  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) private paginator: MatPaginator;

  constructor(private engagementsService: EngagementsService,
              public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  public editItem(id: number) {
  }

  public duplicateItem(id: number) {
  }

  public deleteItem(id: number) {
  }

  public useAsCaptionItem(id: number) {
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
      .subscribe((res: Engagements[]) => {
        this.dataSource.data = res;
      });
  }
}
