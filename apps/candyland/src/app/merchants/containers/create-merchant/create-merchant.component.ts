import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { MerchantFormService } from '@cl-shared/components/create-merchant-form/shared/merchant-form.service';

@Component({
  selector: 'cl-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.scss']
})
export class CreateMerchantComponent implements OnInit {
  public formMerchant: FormGroup;
  constructor(private router: Router,
              private routingState: RoutingStateService,
              private merchantFormService: MerchantFormService) { }

  ngOnInit() {
    this.createFormMerchant();
  }

  public get name(): AbstractControl {
    return this.formMerchant.get('name');
  }

  public save(): void {
    this.router.navigateByUrl('/merchants');
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private createFormMerchant(): void {
    this.formMerchant = this.merchantFormService.getMerchantForm();
  }
}
