import { Component, ChangeDetectionStrategy, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { map } from 'rxjs/operators';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { CampaignsService } from '@cl-core/services/campaigns.service';

@Component({
  selector: 'cl-campaigns-list-page',
  templateUrl: './campaigns-list-page.component.html',
  styleUrls: ['./campaigns-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CampaignsListPageComponent implements  AfterViewInit {

  public DATE_FORMAT: string = 'dd MMM yyyy';
  public TIME_FORMAT: string = 'hh:ssa';
  // public form: FormGroup;
  public hasData: boolean = true;

  public inlineRange: any;
  public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];
  public dataSource: MatTableDataSource<any> = new MatTableDataSource<any>();

  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private campaignsService: CampaignsService,
              public cd: ChangeDetectorRef) {
  }

  public ngAfterViewInit(): void {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.sort = this.sort;
    this.dataSource.paginator = this.paginator;
  }

  public editItem(): void {
  }

  public duplicateItem(): void {
  }

  public deleteItem(): void {
  }

  public pauseItem(): void {
  }

  private getData(): void {
    this.campaignsService.getCampaigns()
      .pipe(
        map((response: any) => response.results),
        map((result: any) => (
          result.map((item: any) => {
              item.begin = new Date(item.begin);
              item.end = new Date(item.end);
              return item;
            })
          )
        )
      )
      .subscribe((res: Campaign[]) => {
        this.dataSource.data = res;
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }
}
