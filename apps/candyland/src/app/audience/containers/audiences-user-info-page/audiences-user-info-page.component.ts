import { CommsService, AudiencesVouchersService, AudiencesUserService } from '@cl-core-services';
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
  MatDialog
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
  IJsonApiItem,
  WMessageChannel,
  IJsonApiItemPayload,
  IWCommMessageAttributes,
} from '@perx/whistler';
import { SelectRewardPopupComponent } from '@cl-shared/containers/select-reward-popup/select-reward-popup.component';
import { CustomDataSource } from '@cl-shared';
import { } from '@cl-core/services/audiences-vouchers.service';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';
import { MessageService } from '@cl-core/services';
import { ChangeExpiryDatePopupComponent } from '../change-expiry-date-popup/change-expiry-date-popup.component';
import { UpsertUserPopupComponent } from '../upsert-user-popup/upsert-user-popup.component';
import {
  IUpsertUserPopup,
  Type,
} from '../../audience.model';
import { SendMessagePopupComponent } from '../send-message-popup/send-message-popup.component';
import { ICommMessage } from '@cl-core/models/comm/schedule';

@Component({
  selector: 'cl-audiences-user-info-page',
  templateUrl: './audiences-user-info-page.component.html',
  styleUrls: ['./audiences-user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUserInfoPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();

  public userId: string;
  public user: IAudiencesUserForm;
  public dataSourceVouchers: CustomDataSource<any>;
  public dataSourceCommunications: CustomDataSource<any>;

  private async updateLocalUser(): Promise<IAudiencesUserForm> {
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
    private commsService: CommsService,
    private messageService: MessageService,
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
          this.messageService.show('Expiry voucher date successfully changed.');
          this.dataSourceVouchers.updateData();
        },
        () => this.messageService.show('Failed to update voucher expiration date.')
      );
  }

  public openSendMessagePopup(): void {
    this.dialog
      .open<SendMessagePopupComponent, void, IRewardEntity>(SendMessagePopupComponent)
      .afterClosed()
      .pipe(
        filter(Boolean),
        tap((message: string) => {
          if (message && message.length > 0) {
            this.sendMessage(message);
          }
        })
      )
      .subscribe(
        () => { },
        () => { }
      );
  }

  public sendMessage(message: string): void {
    if (message && message.length > 0) {
      const msgBody: ICommMessage = {
        from: "PerxTest",
        recipientId: this.userId ? parseInt(this.userId, 10) : undefined,
        providerId: 2,
        message,
        channel: WMessageChannel.sms
      };

      this.commsService.createMessage(msgBody).subscribe(
        (res: IJsonApiItemPayload<IWCommMessageAttributes>) => {
          if (res.data.id) {
            this.messageService.show('Message sent to user.');
            this.dataSourceCommunications.updateData();
          }
        },
        () => this.messageService.show('Could not send message to user. Please try again later.')
      );
    }
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
          this.messageService.show('Voucher assigned to user.');
          this.dataSourceVouchers.updateData();
        },
        () => this.messageService.show('Could not assign voucher to user. Make sure that the reward has enough stock.')
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
        (user: IAudiencesUserForm) => {
          this.user = user;
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
    this.dataSourceVouchers = new CustomDataSource<any>(this.vouchersService, undefined, params);
    this.dataSourceCommunications = new CustomDataSource<any>(this.commsService, undefined, {});
    // this.dataSource.data$.pipe(
    //   takeUntil(this.destroy$)
    // ).subscribe((data: any) => {
    //   // const counterObject = PrepareTableFilters.countFieldValue(data, 'status');
    //   // this.tabsFilterConfig = PrepareTableFilters.prepareTabsFilterConfig(counterObject);
    // });
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
        this.messageService.show('User successfully updated.');
      });
  }
}
