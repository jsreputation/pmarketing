import { Injectable } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';

@Injectable()
export class LoyaltyEarnRulesFormsService {

  public getForm(): FormGroup {
    return new FormGroup({
      // priority: new FormControl(null),
      name: new FormControl(null,
        [Validators.required, Validators.minLength(1), Validators.maxLength(60)]),
      conditions: new FormArray([]),
      pointsEarned: new FormGroup({
        typePoints: new FormControl(null, [Validators.required]),
        awardPoints: new FormControl(null, [Validators.required, Validators.min(1)]),
        typeMultiplier: new FormControl(null, [Validators.required]),
        applyMultiplier: new FormControl(null, [Validators.required, Validators.min(1)]),
        maximumPoints: new FormControl(null, [Validators.required, Validators.min(1)])
      })
    });
  }

  public getDefaultValue(): any {
    return {
      priority: 1,
      name: 'rule name',
      conditions: [],
      pointsEarned: {
        typePoints: 'bonus',
        awardPoints: 100,
        typeMultiplier: 'multiplier',
        applyMultiplier: 2,
        maximumPoints: 3
      }
    };
  }
}
