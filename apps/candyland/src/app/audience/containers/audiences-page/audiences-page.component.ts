import { Component, ChangeDetectionStrategy, ViewChild, ChangeDetectorRef, AfterViewInit, OnInit } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { CreateEngagementPopupComponent } from '@cl-shared/containers/create-engagement-popup/create-engagement-popup.component';
import { FormControl } from '@angular/forms';
import { AudiencesService } from '@cl-core/services/audiences.service';

@Component({
  selector: 'cl-audiences-page',
  templateUrl: './audiences-page.component.html',
  styleUrls: ['./audiences-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesPageComponent implements OnInit, AfterViewInit {
  tabs: FormControl;
  public dataSource = new MatTableDataSource<any>();
  public tabsFilterConfig: OptionConfig[] = [
    {title: 'Users(340)', value: 'users'},
    {title: 'Audience List(3)', value: 'audience'}
    ];
  public hasData = true;
  public isGridMode = true;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private audiencesService: AudiencesService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
    this.tabs = new FormControl();
  }

  ngOnInit(): void {
  }

  ngAfterViewInit() {
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public openDialogCreate(): void {
    const dialogRef = this.dialog.open(CreateEngagementPopupComponent);

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private getData() {
    this.audiencesService.getUsers()
      .subscribe((res: Engagement[]) => {
        console.log(res);
        this.dataSource.data = res;
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }
}
