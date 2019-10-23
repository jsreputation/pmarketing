import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClValidators } from '@cl-helpers/cl-validators';
import { LoyaltyPointsExpireTrigger } from '../models/loyalty-points-expire-trigger.enum';

@Injectable({
  providedIn: 'root'
})
export class LoyaltyCustomTierFormsService {

  public getTireForm(): FormGroup {
    return new FormGroup({
      name: new FormControl(null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      joinMethod: new FormGroup({
        pointsThreshold: new FormControl(false),
        inviteOnly: new FormControl(false),
        points: new FormControl({value: null, disabled: true},
          [Validators.required, Validators.min(1)])
      }, [ClValidators.requiredGroup]),
      imageUrl: new FormControl(null,
        [Validators.required]),
      earnBonus: new FormControl(null,
        [Validators.required, Validators.min(0), Validators.max(100)]),
      burnDiscount: new FormControl(null,
        [Validators.required, Validators.min(0), Validators.max(100)]),
      pointsExpiry: new FormGroup({
        amount: new FormControl(null, [Validators.required, Validators.min(1)]),
        type: new FormControl(null, [Validators.required]),
        trigger: new FormControl(null, [Validators.required]),
      })
    });
  }

  public getDefaultValueTireForm(): ICustomTireForm {
    return {
      name: null,
      joinMethod: {
        inviteOnly: true,
      },
      imageUrl: null,
      earnBonus: 0,
      burnDiscount: 0,
      pointsExpiry: {
        amount: 1,
        type: 'year',
        trigger: LoyaltyPointsExpireTrigger.accrual,
      }
    };
  }
}
