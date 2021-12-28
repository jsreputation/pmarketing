import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ErrorMessageService, ICampaign, ICampaignService, NotificationService } from '@perxtech/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bdo-treat-enroll-page',
  templateUrl: './treat-enroll-page.component.html',
  styleUrls: [ './treat-enroll-page.component.scss' ],
})
export class TreatEnrollPageComponent implements OnInit {
  public campaign: ICampaign;
  enrollForm: FormGroup;
  defaultImageUrl = 'assets/images/light-gray-color-default-image.png';
  public captchaKey = '6LdIs9EdAAAAACKoOAlAE4MrwvjwJFb9ZgKwt3Rh';
  // private captchaResponse: string;

  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService,
    private errorMessageService: ErrorMessageService
  ) {
  }

  ngOnInit() {
    this.activeRoute.params.pipe(
      switchMap((item: Params) => this.campaignService.getCampaign(item.id))
    ).subscribe(
      (campaign: ICampaign) => {
        this.campaign = campaign;
      }
    );
    this.initForm();
  }

  public initForm(): void {
    this.enrollForm = new FormGroup({
      promoId: new FormControl('', [ Validators.required ]),
      tnc: new FormControl(false, [ Validators.requiredTrue ]),
      captchaReactive: new FormControl(null, [ Validators.required ])
    });
  }

  // public captchaResolved(captchaResponse: string) {
  //   this.captchaResponse = captchaResponse;
  // }

  enroll() {
    if (this.enrollForm.valid) {
      this.campaignService
        .bdoCampaignEnrol(this.campaign.id, this.enrollForm.get('promoId').value)
        .subscribe(
          (item) => {
            if (item) {
              this.route.navigate([ `treat-enroll/${this.campaign.id}/complete` ], 
              { state: {
                  promoId: item.enrolmentReference,
                  campaignId: item.campaignId,
                  campaignName: item.campaignName,
                  tnc: this.campaign.customFields?.postEnrolText,
                }
              });
            } else {
              this.notificationService.addSnack('Could not enrol in campaign');
            }
          },
          ((err) => {
            if (err.error) {
              this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message, err.status)
                .subscribe(
                  (errMessage: string) => {
                    this.notificationService.addSnack(errMessage);
                    this.enrollForm.get(['promoId']).setErrors({apiError: errMessage});
                  });
            }
          })
        );
    } else {
      Object.keys(this.enrollForm.controls).forEach((controlName) =>
        this.enrollForm.controls[controlName].markAsTouched()
      );
    }
  }
}
