import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { RoutingStateService } from '@cl-core/services/routing-state.service';
import { MatDialog } from '@angular/material';
import { CreateMerchantPopupComponent } from '@cl-shared/containers/create-merchant-popup/create-merchant-popup.component';

@Component({
  selector: 'cl-create-merchant',
  templateUrl: './create-merchant.component.html',
  styleUrls: ['./create-merchant.component.scss']
})
export class CreateMerchantComponent implements OnInit {
  public formMerchant: FormGroup;
  constructor(private fb: FormBuilder,
              private router: Router,
              private routingState: RoutingStateService,
              public dialog: MatDialog) { }

  ngOnInit() {
    this.createFormMerchant();
  }

  public get name(): AbstractControl {
    return this.formMerchant.get('name');
  }

  public save(): void {
    console.log(this.formMerchant.value);
    this.router.navigateByUrl('/merchants');
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  private createFormMerchant(): void {
    this.formMerchant = this.fb.group({
      name: ['Merchant 1', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      image: [null, [Validators.required]],
      description: [null, [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(120)]],
      countryCode: [null, [Validators.required]],
      contactNumber: [null, [Validators.required]]
    });
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(CreateMerchantPopupComponent, {
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed', result);
    });
  }
}
