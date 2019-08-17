import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
  ViewChild
} from '@angular/core';
import { AudiencesService } from '@cl-core/services/audiences.service';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs/operators';
import { ChangeExpiryDatePopupComponent } from '../change-expiry-date-popup/change-expiry-date-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';

@Component({
  selector: 'cl-audiences-user-info-page',
  templateUrl: './audiences-user-info-page.component.html',
  styleUrls: ['./audiences-user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUserInfoPageComponent implements OnInit, AfterViewInit, OnDestroy {
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

  public ngOnInit(): void {
    this.userId = this.route.snapshot.params.id;
    this.getUser(this.userId);
    this.getVouchers();
  }

  public ngAfterViewInit(): void {
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public ngOnDestroy(): void {
  }

  public getUser(id: number): void {
    this.audiencesService.getUser(id)
      .subscribe(user => this.user = user);

  }

  public getVouchers(): void {
    this.audiencesService.getVouchers()
      .pipe(
        tap((data: any) => {
          const counterObject = PrepareTableFilers.countFieldValue(data, 'status');
          this.tabsFilterConfig = PrepareTableFilers.prepareTabsFilterConfig(counterObject);
        }),
      )
      .subscribe(vouchers => {
        this.vouchers = vouchers;
        this.dataSource.data = this.vouchers;
      });
  }

  public openChangeExpiryDateDialog(item): void {
    const dialogRef = this.dialog.open(ChangeExpiryDatePopupComponent, {
      panelClass: 'change-expiry-date-dialog',
      data: item
    });

    dialogRef.afterClosed().pipe(untilDestroyed(this)).subscribe(result => {
      if (result) {
      }
    });
  }

  public openSelectRewardPopup(): void {
    this.dialog.open(SelectRewardPopupComponent);
  }

}
