import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { LoyaltyService } from '@perx/core';
import { switchMap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'hkbn-reward-confirm',
  templateUrl: './reward-confirm.component.html',
  styleUrls: ['./reward-confirm.component.scss']
})
export class RewardConfirmComponent implements OnInit {
  public loyalty: Observable<number>;
  constructor(
    private dialogRef: MatDialogRef<RewardConfirmComponent>,
    private loyaltyService: LoyaltyService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  public confirm(): void {
    this.dialogRef.close(true);
  }

  public back(): void {
    this.dialogRef.close(false);
  }

  public ngOnInit(): void {
    this.loyalty = this.loyaltyService.getLoyalties().pipe(switchMap((loyaltyes) =>
      loyaltyes && loyaltyes[0] ? this.loyaltyService.getLoyalty(loyaltyes[0].id) : of(null)
    )).pipe(map((loyalty) => {
      return loyalty && loyalty.expiringPoints && loyalty.expiringPoints.length ? loyalty.expiringPoints[0].points : null;
    }));
  }
}
