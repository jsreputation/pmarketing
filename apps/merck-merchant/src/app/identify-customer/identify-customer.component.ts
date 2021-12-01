import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, NavigationExtras } from '@angular/router';
import {
  Validators,
  FormBuilder,
  FormGroup,
  AbstractControl
} from '@angular/forms';
import { IMerchantAdminService, NotificationService, IProfile } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { HttpErrorResponse } from '@angular/common/http';
import { MatTabChangeEvent } from '@angular/material/tabs';

@Component({
  selector: 'app-identify-customer',
  templateUrl: './identify-customer.component.html',
  styleUrls: ['./identify-customer.component.scss']
})
export class IdentifyCustomerComponent implements OnInit {
  private path: string;
  public identifyUserForm: FormGroup;
  public qrCodeTxt: string;
  public mobileNumberTxt: string;
  public enableScan: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private merchantAdminService: IMerchantAdminService,
    private translate: TranslateService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.path = params.path;
    });
    this.translate.get(['IDENTIFY_USER.BY_QR_SCAN', 'IDENTIFY_USER.BY_MOBILE_NUMBER']).subscribe(
      (res) => {
        this.qrCodeTxt = res['IDENTIFY_USER.BY_QR_SCAN'];
        this.mobileNumberTxt = res['IDENTIFY_USER.BY_MOBILE_NUMBER'];
      }
    );
    this.initForm();
  }

  public get mobileNumber(): AbstractControl | null {
    return this.identifyUserForm.get('mobileNumber');
  }

  public get countryCode(): AbstractControl | null {
    return this.identifyUserForm.get('countryCode');
  }

  private initForm(): void {
    this.identifyUserForm = this.fb.group({
      mobileNumber: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      countryCode: ['852', Validators.required]
    });
  }

  public onSubmit(): void {
    const mobileNumber = this.identifyUserForm.value.mobileNumber as string;
    const countryCode = this.identifyUserForm.value.countryCode as string;
    const codeAndMobile = countryCode + mobileNumber;
    const cleanedMobileNo = Number(codeAndMobile.replace(/[^0-9]/g, ''));

    this.merchantAdminService.getCustomerDetails(cleanedMobileNo, '').subscribe(
      (customer: IProfile) => {
        const data = JSON.stringify({
          verifiedUser: customer
        });
        const navigationExtras: NavigationExtras = {
              state: {
                data
              }
            };
        this.router.navigate([`${this.path}`], navigationExtras);
      },
      (err: HttpErrorResponse) => {
          this.notificationService.addSnack(err?.error?.message);
      });
  }

  public onTabChange(event: MatTabChangeEvent): void {
    const tabLabel = event.tab.textLabel;
    this.enableScan = (tabLabel === this.qrCodeTxt) ? true : false;
  }

}
