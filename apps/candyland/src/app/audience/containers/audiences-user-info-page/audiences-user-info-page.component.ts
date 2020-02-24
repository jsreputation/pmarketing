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
import { CustomDataSource, DataSourceStates } from '@cl-shared';
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
import { LoyaltyCardService } from '@cl-core/services/loyalty-card.service';
import { IEngagementItemMenuOption } from '../../../loyalty/components/loyalty-item/loyalty-item.component';
import { AudiencesUserInfoActions } from '../../audience-user-info-actions';
import { AddLoyaltyPopupComponent } from '../add-loyalty-popup/add-loyalty-popup.component';
import { AdjustLoyaltyTierPopupComponent } from '../adjust-loyalty-tier-popup/adjust-loyalty-tier-popup.component';
import { AdjustBalancePointsPopupComponent } from '../adjust-balance-points-popup/adjust-balance-points-popup.component';
import { LoyaltyService } from '@cl-core/services/loyalty.service';
import { IAudiencesLoyalty, IAudiencesLoyaltyCard, IAudiencesTier } from '@cl-core/models/audiences/audiences-loyalty.model';
import { IAudiencesUserForm } from '@cl-core/models/audiences/user.interface';
import { IAudienceVoucher } from '@cl-core/models/vouchers/audience-voucher.interface';

@Component({
  selector: 'cl-audiences-user-info-page',
  templateUrl: './audiences-user-info-page.component.html',
  styleUrls: ['./audiences-user-info-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUserInfoPageComponent implements OnInit, AfterViewInit, OnDestroy {
  private destroy$: Subject<void> = new Subject();
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;

  public userId: string;
  public user: IAudiencesUserForm;
  public vouchersDataSource: CustomDataSource<IAudienceVoucher>;
  public communicationsDataSource: CustomDataSource<ICommMessage>;
  public loyaltyDataSource: CustomDataSource<IAudiencesLoyaltyCard>;
  public loyaltyMenuOptions: IEngagementItemMenuOption[] = [
    { action: AudiencesUserInfoActions.deleteLoyaltyCard, label: 'BTN_DELETE' },
    { action: AudiencesUserInfoActions.adjustLoyaltyTier, label: 'AUDIENCE_FEATURE.ADJUST_TIER' },
    { action: AudiencesUserInfoActions.adjustBalancePoints, label: 'AUDIENCE_FEATURE.ADJUST_POINTS' },
  ];
  public loyaltySelectOptions: IAudiencesLoyalty[];

  private async updateLocalUser(): Promise<IAudiencesUserForm> {
    this.user = await this.audiencesUserService.getUser(this.userId).toPromise();
    this.cd.detectChanges();
    return this.user;
  }

  constructor(
    private audiencesUserService: AudiencesUserService,
    private loyaltyCardService: LoyaltyCardService,
    private loyaltyService: LoyaltyService,
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
    this.initLoyaltySelectOptions();
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
        switchMap((entity: string) => this.vouchersService.updateVoucherExpiry(item.id, entity))
      )
      .subscribe(
        () => {
          this.messageService.show('Expiry voucher date successfully changed.');
          this.vouchersDataSource.updateData();
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
        () => {
        },
        () => {
        }
      );
  }

  public sendMessage(message: string): void {
    if (message && message.length > 0) {
      const msgBody: ICommMessage = {
        from: 'PerxTest',
        recipientId: this.userId ? parseInt(this.userId, 10) : undefined,
        providerId: 2,
        message,
        channel: WMessageChannel.sms
      };

      this.commsService.createMessage(msgBody).subscribe(
        (res: IJsonApiItemPayload<IWCommMessageAttributes>) => {
          if (res.data.id) {
            this.messageService.show('Message sent to user.');
            this.communicationsDataSource.updateData();
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
          this.vouchersDataSource.updateData();
        },
        () => this.messageService.show('Could not assign voucher to user. Make sure that the reward has enough stock.')
      );
  }

  public openAddLoyaltyPopup(): void {
    const freeLoyaltySelectOptions = this.getFreeLoyaltySelectOptions();
    if (freeLoyaltySelectOptions.length === 0) {
      this.messageService.show('You do not have any active loyalty program.', 'warning', 4000);
      return;
    }

    const dialogRef = this.dialog.open(AddLoyaltyPopupComponent, {
      panelClass: 'change-expiry-date-dialog',
      data: {
        loyaltySelectOptions: freeLoyaltySelectOptions,
        userId: this.userId
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.messageService.show('New Loyalty Cards successfully created.');
          this.loyaltyDataSource.updateData();
        }
      );
  }

  public openAdjustLoyaltyTierPopup(card: IAudiencesLoyaltyCard): void {
    const tiers = this.getLoyaltyTiers(card);
    if (!tiers) {
      this.messageService.show('Cannot find tiers for loyalty.', 'danger');
      return;
    }
    const dialogRef = this.dialog.open(AdjustLoyaltyTierPopupComponent, {
      panelClass: 'change-expiry-date-dialog',
      data: {
        card,
        tiers
      }
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((updatedCard: IAudiencesLoyaltyCard) => this.loyaltyCardService.updateLoyaltyCard(updatedCard.id, updatedCard)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.messageService.show('Loyalty Card Tier successfully changed.');
          this.loyaltyDataSource.updateData();
        },
        () => this.messageService.show('Failed to update Loyalty Card Tier.', 'danger')
      );
  }

  public openAdjustBalancePointsPopup(card: IAudiencesLoyaltyCard): void {
    const dialogRef = this.dialog.open(AdjustBalancePointsPopupComponent, {
      panelClass: 'change-expiry-date-dialog',
      data: card
    });

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((updatedCard: IAudiencesLoyaltyCard) => this.loyaltyCardService.updateLoyaltyCard(updatedCard.id, updatedCard)),
        takeUntil(this.destroy$)
      )
      .subscribe(
        () => {
          this.messageService.show('Loyalty Card Tier successfully changed.');
          this.loyaltyDataSource.updateData();
        },
        () => this.messageService.show('Failed to update Loyalty Card Tier.')
      );
  }

  public handleAudiencesUserInfoActions(data: { action: AudiencesUserInfoActions, payload?: any }): void {
    switch (data.action) {
      case AudiencesUserInfoActions.adjustLoyaltyTier:
        this.openAdjustLoyaltyTierPopup(data.payload);
        break;
      case AudiencesUserInfoActions.adjustBalancePoints:
        this.openAdjustBalancePointsPopup(data.payload);
        break;
      case AudiencesUserInfoActions.deleteLoyaltyCard:
        this.deleteLoyaltyCard(data.payload.id);
        break;
    }
  }

  private deleteLoyaltyCard(id: string): void {
    this.loyaltyCardService.deleteLoyalty(id)
      .pipe(takeUntil(this.destroy$))
      .subscribe(() => this.loyaltyDataSource.updateData());
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
    const vouchersDataSourceParams = this.userId ? { 'filter[assigned_to_id]': this.userId } : {};
    this.vouchersDataSource = new CustomDataSource<IAudienceVoucher>(this.vouchersService, 5, vouchersDataSourceParams);
    const loyaltyDataSourceParams = this.userId ? { 'filter[user_id]': this.userId } : {};
    this.loyaltyDataSource = new CustomDataSource<IAudiencesLoyaltyCard>(this.loyaltyCardService, 20, loyaltyDataSourceParams);
    this.communicationsDataSource = new CustomDataSource<ICommMessage>(this.commsService, 5, { 'filter[user_id]': this.userId });
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

  private initLoyaltySelectOptions(): void {
    this.loyaltyService.getAudiencesLoyaltyOption({ 'page[size]': '20' })
      .pipe(takeUntil(this.destroy$))
      .subscribe(data => this.loyaltySelectOptions = data);
  }

  private getFreeLoyaltySelectOptions(): IAudiencesLoyalty[] {
    const idsUsedLoyalties = this.loyaltyDataSource.data.map(card => card.loyalty.id);
    return this.loyaltySelectOptions.filter(loyalty => !idsUsedLoyalties.includes(loyalty.id));
  }

  private getLoyaltyTiers(card: IAudiencesLoyaltyCard): IAudiencesTier[] {
    const findLoyalty = this.loyaltySelectOptions.find(loyalty => loyalty.id === card.loyalty.id);
    return findLoyalty ? findLoyalty.tiers : null;
  }
}
