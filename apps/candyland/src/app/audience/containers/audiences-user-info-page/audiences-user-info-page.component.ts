import { DOCUMENT } from '@angular/common';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Inject,
  OnDestroy,
  OnInit,
  Renderer2
} from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
} from '@angular/material';
import {
  ActivatedRoute,
  ParamMap,
  Router,
} from '@angular/router';

import { Subject } from 'rxjs';
import {
  map,
  switchMap,
  tap,
  filter,
  distinct,
  takeUntil,
} from 'rxjs/operators';

import {
  IWAssignedAttributes,
  IWUser,
} from '@perx/whistler';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { CustomDataSource } from '@cl-shared';
import { AudiencesVouchersService } from '@cl-core/services/audiences-vouchers.service';
import { PrepareTableFilters } from '@cl-helpers/prepare-table-filters';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';

import { ChangeExpiryDatePopupComponent } from '../change-expiry-date-popup/change-expiry-date-popup.component';
import { UpsertUserPopupComponent } from '../upsert-user-popup/upsert-user-popup.component';
import {
  IUpsertUserPopup,
  Type,
} from '../../audience.model';

@Component({
  selector: 'cl-audiences-user-info-page',
  templateUrl: './audiences-user-info-page.component.html',
  styleUrls: ['./audiences-user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUserInfoPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public userId: string;
  public user: IWUser;
  public tabsFilterConfig: OptionConfig[];
  public dataSource: CustomDataSource<any>;

  private async updateLocalUser(): Promise<IWUser> {
    this.user = await this.audiencesUserService.getUser(this.userId).toPromise();
    this.cd.detectChanges();
    return this.user;
  }

  constructor(
    private audiencesUserService: AudiencesUserService,
    private vouchersService: AudiencesVouchersService,
    private route: ActivatedRoute,
    private router: Router,
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private snack: MatSnackBar,
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
  ) {
  }

  public ngOnInit(): void {
    this.handleRouteParams();
    this.renderer.addClass(this.document.body, 'no-cta');
  }

  public ngAfterViewInit(): void {
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'no-cta');
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openChangeExpiryDateDialog(item: IJsonApiItem<Partial<IWAssignedAttributes>>): void {
    const dialogRef = this.dialog.open(ChangeExpiryDatePopupComponent, {
      panelClass: 'change-expiry-date-dialog',
      data: item
    });

    dialogRef.afterClosed().pipe(takeUntil(this.destroy$))
      .pipe(
        filter(Boolean),
        switchMap((entity: string) => {
          return this.vouchersService.updateVoucherExpiry(item.id, entity);
        })
      )
      .subscribe(
        () => {
          this.snack.open('Expiry voucher date successfully changed.', 'x', { duration: 2000 });
          this.dataSource.updateData();
        },
        () => this.snack.open('Failed to update voucher expiration date.', 'x', { duration: 2000 })
      );
  }

  public openSelectRewardPopup(): void {
    this.dialog
      .open<SelectRewardPopupComponent, void, IRewardEntity>(SelectRewardPopupComponent)
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((entity: IRewardEntity) => {
          const assigned: string = this.route.snapshot.params.id;
          return this.vouchersService.voucherAssigned(entity.id, assigned);
        })
      )
      .subscribe(
        () => {
          this.snack.open('Voucher assigned to user.', 'x', { duration: 2000 });
          this.dataSource.updateData();
        },
        () => this.snack.open('Could not assign voucher to user. Make sure that the reward has enough stock.', 'x', { duration: 2000 })
      );
  }

  private handleRouteParams(): void {
    this.route.paramMap.pipe(
      map((params: ParamMap) => params.get('id')),
      tap((id: string) => this.userId = id),
      distinct(),
      tap(() => this.initDataSource()),
      switchMap((id: string) => this.audiencesUserService.getUser(id)),
      takeUntil(this.destroy$),
    )
      .subscribe(
        (user: IWUser) => {
          this.user = user;
          console.log('this.user', this.user);
          this.cd.detectChanges();
        },
        (err) => {
          console.error(err);
          this.router.navigateByUrl('/audience');
        }
      );
  }

  private initDataSource(): void {
    const params = this.userId ? { 'filter[assigned_to_id]': this.userId } : {};
    this.dataSource = new CustomDataSource<any>(this.vouchersService, undefined, params);
    this.dataSource.data$.pipe(
      takeUntil(this.destroy$)
    ).subscribe((data: any) => {
      const counterObject = PrepareTableFilters.countFieldValue(data, 'status');
      this.tabsFilterConfig = PrepareTableFilters.prepareTabsFilterConfig(counterObject);
    });
  }

  public openEditUserDialog(): void {
    const dialogData: IUpsertUserPopup = {
      panelClass: 'audience-dialog',
      data: {
        type: Type.Edit,
        formData: this.user,
      }
    };
    const dialogRef = this.dialog.open(UpsertUserPopupComponent, dialogData);

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newUser: any) => this.audiencesUserService.updateUser(this.user.id, newUser))
      )
      .subscribe(async () => {
        await this.updateLocalUser();
        this.snack.open('User successfully updated.', 'x', {duration: 2000});
      });
  }
}
