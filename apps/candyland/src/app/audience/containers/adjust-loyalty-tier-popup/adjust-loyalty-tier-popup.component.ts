import { Component, ChangeDetectionStrategy, Inject, ChangeDetectorRef, AfterViewInit, OnInit, } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { FormControl } from '@angular/forms';
import { IAudiencesLoyaltyCard, IAudiencesTier } from '@cl-core/models/audiences/audiences-loyalty.model';

@Component({
  selector: 'cl-adjust-loyalty-tier-popup',
  templateUrl: './adjust-loyalty-tier-popup.component.html',
  styleUrls: ['./adjust-loyalty-tier-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdjustLoyaltyTierPopupComponent implements OnInit, AfterViewInit {
  public tierControl: FormControl;
  public currentTierIndex: number;

  constructor(
    public dialogRef: MatDialogRef<AdjustLoyaltyTierPopupComponent>,
    private cd: ChangeDetectorRef,
    @Inject(MAT_DIALOG_DATA) public data: { card: IAudiencesLoyaltyCard, tiers: IAudiencesTier[] }
  ) { }

  public close(): void {
    this.dialogRef.close(null);
  }

  public save(): void {
    const selectIndex = this.tierControl.value;
    const selectTier = this.data.tiers[selectIndex];
    const updatedCard = { id: this.data.card.id, tier: selectTier };
    this.dialogRef.close(updatedCard);
  }

  public ngOnInit(): void {
    this.tierControl = new FormControl(null);
  }

  public ngAfterViewInit(): void {
    const currentTier = this.data.card.tier;
    this.currentTierIndex = this.data.tiers.findIndex(
      tier => tier.id === currentTier.id && tier.type === currentTier.type
    );
    this.tierControl.patchValue(this.currentTierIndex);
    this.cd.detectChanges();
  }

}
