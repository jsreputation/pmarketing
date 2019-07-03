import { Component, OnInit, ChangeDetectionStrategy, ViewChild, AfterViewInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatDialog, MatPaginator } from '@angular/material';
import { CampaignsService } from '@cl-core/http-services/campaigns-https.service';

export interface Campaign {
  id: number;
  name: string;
  status: string;
  begin: Date;
  end: Date;
  audience: number;
  goal: string;
}

@Component({
  selector: 'cl-campaigns-list-page',
  templateUrl: './campaigns-list-page.component.html',
  styleUrls: ['./campaigns-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsListPageComponent implements OnInit, AfterViewInit {

  DATE_FORMAT = 'dd MMM yyyy';
  TIME_FORMAT = 'hh:ssa';
  form: FormGroup;
  defaulTypeFilterValue = null;

  inlineRange;
  public displayedColumns = ['name', 'status', 'begin', 'end', 'audience', 'goal', 'actions'];
  public dataSource = new MatTableDataSource<any>();
  public tabsFilterConfig;

  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) private paginator: MatPaginator;

  constructor(private campaignsService: CampaignsService,
              public dialog: MatDialog) {
  }

  ngOnInit() {
    this.form = new FormGroup({
      date: new FormControl([{begin: new Date(2018, 7, 5), end: new Date(2018, 7, 25)}], [])
    });
  }

  inlineRangeChange($event) {
    this.inlineRange = $event;
  }

  ngAfterViewInit() {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    // this.dataSource.sortingDataAccessor = (item, property) => {
    //   switch (property) {
    //     case 'begin':
    //       console.log('begin', item['begin']);
    //       return item['begin'];
    //     case 'end':
    //       console.log('end', item['end']);
    //       return new Date(item['end']);
    //     default:
    //       console.log('default', item[property]);
    //       return item[property];
    //   }
    // };
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public openDialog(): void {
    // const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    // dialogRef.afterClosed().subscribe(result => {
    //   console.log('The dialog was closed');
    // });
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

  public pauseItem(id: number) {
    console.log(id);
  }

  private getData() {
    this.campaignsService.getCampaigns()
      .pipe(
        map((response: any) => response.results)
      )
      .subscribe((res: Campaign[]) => {
        console.log(res);
        res.map(item => {
          item.begin = new Date(item.begin);
          item.end = new Date(item.end);
          return item;
        });
        // console.log(resWith);
        this.dataSource.data = res;
      });
  }
}
