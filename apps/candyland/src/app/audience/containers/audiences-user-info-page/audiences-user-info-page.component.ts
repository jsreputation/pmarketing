import {Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef, ViewChild, AfterViewInit} from '@angular/core';
import {AudiencesService} from "@cl-core/services/audiences.service";
import {MatDialog, MatPaginator, MatTableDataSource} from "@angular/material";
import {PrepareTableFilers} from "@cl-helpers/prepare-table-filers";
import {ActivatedRoute, Router} from "@angular/router";
import {tap} from "rxjs/operators";

@Component({
  selector: 'cl-audiences-user-info-page',
  templateUrl: './audiences-user-info-page.component.html',
  styleUrls: ['./audiences-user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUserInfoPageComponent implements OnInit, AfterViewInit {
  public userId: number;
  public user;
  public vouchers;
  public tabsFilterConfig;
  public dataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private audiencesService: AudiencesService,
              private route: ActivatedRoute,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {

  }

  ngOnInit() {
    this.userId = this.route.snapshot.params.id;
    this.getUser(this.userId);
    this.getVouchers(this.userId);
  }

  ngAfterViewInit() {
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  getUser(id: number) {
    this.audiencesService.getUser(id)
      .subscribe(user => this.user = user);

  }

  getVouchers(id: number) {
    this.audiencesService.getVouchers(id)
      .pipe(
        tap(data => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'type');
          this.tabsFilterConfig = PrepareTableFilers.prepareTabsFilterConfig(data, counterObject);
        }),
      )
      .subscribe(vouchers => {
        this.vouchers = vouchers;
        this.dataSource.data = this.vouchers;
        console.log(this.userId, this.user, this.vouchers, this.tabsFilterConfig);
      });
  }


}
