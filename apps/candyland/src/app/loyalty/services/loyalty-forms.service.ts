import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ClValidators } from '@cl-helpers/cl-validators';
import { LoyaltyPointsExpireTrigger } from '../models/loyalty-points-expire-trigger.enum';
import { StatusLabel } from '@cl-helpers/status-label.enum';
import { ILoyaltyForm } from '@cl-core/models/loyalty/loyalty-form.model';
import { LoyaltyEarnRulesFormsService } from './loyalty-earn-rules-forms.service';

@Injectable()
export class LoyaltyFormsService {

  constructor(private rulesFormsService: LoyaltyEarnRulesFormsService) {
  }

  public getFormLoyalty(): FormGroup {
    return new FormGroup({
      name: new FormControl(null, [Validators.required]),
      status: new FormControl(null),
      createdAt: new FormControl(null),
      customTiersCount: new FormControl(0),
      details: new FormGroup({
        pointsName: new FormControl(null,
          [Validators.required, Validators.minLength(1)]),
        imageUrl: new FormControl(null, [Validators.required]),
        joinMethod: new FormGroup({
          transactionAmount: new FormControl(false),
          signUp: new FormControl(false),
          inviteOnly: new FormControl(false),
          amount: new FormControl({value: null, disabled: true}, [Validators.required, Validators.min(1)])
        }, [ClValidators.requiredGroup]),
        poolId: new FormControl(null
          // [ Validators.required]
        )
      }),
      tiersConversions: new FormGroup({
        globalEarnRule: new FormGroup({
          amount: new FormControl(null, [Validators.required, Validators.min(1)]),
          points: new FormControl(null, [Validators.required, Validators.min(1)])
        }),
        globalBurnRule: new FormGroup({
          amount: new FormControl(null, [Validators.required, Validators.min(1)]),
          points: new FormControl(null, [Validators.required, Validators.min(1)])
        }),
        pointsExpiry: new FormGroup({
          amount: new FormControl(null, [Validators.required, Validators.min(1)]),
          type: new FormControl(null, [Validators.required]),
          trigger: new FormControl(null, [Validators.required])
        })
      }),
      ruleSet: this.rulesFormsService.getRuleForm()
    });
  }

  public getDefaultValueForm(): ILoyaltyForm {
    return {
      name: null,
      customTiersCount: 0,
      status: StatusLabel.DRAFT,
      details: {
        pointsName: 'Point',
        // imageUrl: 'https://test.com.jpg' ,
        imageUrl: 'https://material.angular.io/assets/img/homepage/github-circle-white-transparent.svg',
        joinMethod: {
          inviteOnly: true
        },
        poolId: null
      },
      tiersConversions: {
        globalEarnRule: {
          amount: 1,
          points: 1
        },
        globalBurnRule: {
          amount: 100,
          points: 5
        },
        pointsExpiry: {
          amount: 1,
          type: 'year',
          trigger: LoyaltyPointsExpireTrigger.accrual
        }
      }
    };
  }

  // public getStepName(index: number): string {
  //   switch (index) {
  //     case this.loyaltyFormType.stepDetails: {
  //       return this.loyaltyFormType.details;
  //     }
  //     case this.loyaltyFormType.TiersConversions: {
  //       return this.loyaltyFormType.tiers;
  //     }
  //     case this.loyaltyFormType.stepReview: {
  //       return this.loyaltyFormType.review;
  //     }
  //   }
  // }

  // public getRuleForm(): FormGroup {
  //   return new FormGroup({
  //     name: new FormControl(null),
  //     conditions: new FormArray([]),
  //     result: new FormGroup({
  //       bonus: new FormControl(null, [Validators.required]),
  //       award: new FormControl(null),
  //       points: new FormControl(null),
  //       typeMultiplier: new FormControl(null, [Validators.required]),
  //       applyMultiplier: new FormControl(null, [Validators.required]),
  //       maximumPoints: new FormControl(null, [Validators.required]),
  //     })
  //   });
  // }

  // public checkExistingStepForm(form: FormGroup, step: string): boolean {
  //   return !!form.get(step);
  // }
}
