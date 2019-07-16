import { Component, ChangeDetectionStrategy, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource, MatSort, MatPaginator, MatDialog } from '@angular/material';
import { map, tap } from 'rxjs/operators';
import { EngagementsService } from '@cl-core/http-services/engagements-https.service';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import {
  CreateEngagementPopupComponent
} from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';



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
    this.dialog.open(CreateEngagementPopupComponent);
  }

  public editItem() {
  }

  public duplicateItem() {
  }

  public deleteItem() {
  }

  public useAsCaptionItem() {
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
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }
}
