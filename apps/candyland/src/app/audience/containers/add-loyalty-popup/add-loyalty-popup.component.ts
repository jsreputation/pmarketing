import { Component, OnInit, ChangeDetectionStrategy, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { AbstractControl, FormArray, FormControl, FormGroup } from '@angular/forms';
import { distinctUntilChanged, map, startWith, takeUntil } from 'rxjs/operators';
import Utils from '@cl-helpers/utils';
import { combineLatest, Subject } from 'rxjs';
import { IAudiencesLoyalty, IAudiencesLoyaltyCard } from '@cl-core/models/audiences/audiences-loyalty.model';
import { LoyaltyCardService } from '@cl-core/services/loyalty-card.service';
import { MessageService } from '@cl-core-services';

@Component({
  selector: 'cl-add-loyalty-popup',
  templateUrl: './add-loyalty-popup.component.html',
  styleUrls: ['./add-loyalty-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AddLoyaltyPopupComponent implements OnInit, OnDestroy {

  public loyaltyCards: FormArray = new FormArray([]);
  public availableLoyaltyOptions: IAudiencesLoyalty[];
  public availableLoyaltyOptionsArray: IAudiencesLoyalty[][];
  private destroy$: Subject<void> = new Subject();

  constructor(public dialogRef: MatDialogRef<AddLoyaltyPopupComponent>,
              @Inject(MAT_DIALOG_DATA) public data: { userId: number, loyaltySelectOptions: IAudiencesLoyalty[] },
              private messageService: MessageService,
              private loyaltyCardService: LoyaltyCardService) {
  }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    const cardLoyaltyAndTiers: IAudiencesLoyaltyCard[] = this.loyaltyCards.value;
    if (cardLoyaltyAndTiers.length === 0) {
      return;
    }
    const cardData: Partial<IAudiencesLoyaltyCard> = {
      userId: this.data.userId,
      balance: 0,
    };
    const sendRequests = cardLoyaltyAndTiers.map((sendLoyaltyAndTiers: IAudiencesLoyaltyCard) =>
      this.loyaltyCardService.createLoyaltyCard({...cardData, ...sendLoyaltyAndTiers} as IAudiencesLoyaltyCard)
    );
    combineLatest(sendRequests)
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        data => this.dialogRef.close(data),
        () => this.messageService.show('Failed to create Loyalty Cards.')
      );
  }

  public ngOnInit(): void {
    this.handleLoyaltySelection();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public addLoyaltyCart(loyalty: IAudiencesLoyalty): void {
    this.loyaltyCards.push(this.getLoyaltyCardsGroup(loyalty));
  }

  public getLoyaltyCardsGroup(loyalty: IAudiencesLoyalty): FormGroup {
    return new FormGroup({
      loyalty: new FormControl(loyalty),
      tier: new FormControl(loyalty.tiers[0])
    });
  }

  public updateTier(loyalty: IAudiencesLoyalty, tier: AbstractControl): void {
    tier.patchValue(loyalty.tiers[0]);
  }

  public deleteLoyaltyCard(index: number): void {
    this.loyaltyCards.removeAt(index);
  }

  private handleLoyaltySelection(): void {
    this.loyaltyCards.valueChanges
      .pipe(
        startWith([]),
        map(value => value.map(loyaltyCard => loyaltyCard.loyalty)),
        distinctUntilChanged(Utils.isEqual),
        takeUntil(this.destroy$)
      )
      .subscribe((selectedLoyalties: IAudiencesLoyalty[]) => {
        this.availableLoyaltyOptions = this.data.loyaltySelectOptions.filter(x => !selectedLoyalties.includes(x));
        this.availableLoyaltyOptionsArray = selectedLoyalties.map(
          selected => this.data.loyaltySelectOptions.filter(
            x => !selectedLoyalties.includes(x) || x === selected
          ));
      });
  }
}
