import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { MatDialog } from '@angular/material';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { map, switchMap, tap } from 'rxjs/operators';
import { ChangeExpiryDatePopupComponent } from '../change-expiry-date-popup/change-expiry-date-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { CustomDataSource } from '@cl-shared';
import { AudiencesVouchersService } from '@cl-core/services/audiences-vouchers.service';

@Component({
  selector: 'cl-audiences-user-info-page',
  templateUrl: './audiences-user-info-page.component.html',
  styleUrls: ['./audiences-user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUserInfoPageComponent implements OnInit, AfterViewInit, OnDestroy {
  public userId: string;
  public user;
  public vouchers;
  public tabsFilterConfig;
  public dataSource: CustomDataSource<any>;

  constructor(private audiencesUserService: AudiencesUserService,
              private vouchersService: AudiencesVouchersService,
              private route: ActivatedRoute,
              private router: Router,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  public ngOnInit(): void {
    this.dataSource = new CustomDataSource<any>(this.vouchersService);
    this.handleRouteParams();
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
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

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      untilDestroyed(this),
      map((params: ParamMap) => params.get('id')),
      tap(id => this.userId = id),
      tap(id => this.dataSource.params = {'filter[assigned_to_id]': id}),
      switchMap((id: string) => this.audiencesUserService.getUser(id))
    )
      .subscribe(
        user => {
          this.user = user;
          this.cd.detectChanges();
        },
        () => this.router.navigateByUrl('/audience')
      );
  }

}
