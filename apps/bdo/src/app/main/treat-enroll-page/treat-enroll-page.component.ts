import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ICampaign, ICampaignService, NotificationService } from '@perxtech/core';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'bdo-treat-enroll-page',
  templateUrl: './treat-enroll-page.component.html',
  styleUrls: ['./treat-enroll-page.component.scss'],
})
export class TreatEnrollPageComponent implements  OnInit{
  public campaign: ICampaign;
  enrollForm: FormGroup ;
  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService
  ) {}
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
      promoId: new FormControl('', [Validators.required]),
    });
  }
  enroll() {
    if (this.enrollForm.valid) {
      this.campaignService
        .bdoCampaignEnrol(this.campaign.id, this.enrollForm.get('promoId').value)
        .subscribe((item) => {
          if (item) {
            this.route.navigate([`treat-enroll/${this.campaign.id}/complete`],{ state:{promoId:this.enrollForm.get('promoId').value}});
          } else {
            this.notificationService.addSnack('Could not enrol in campaign');
          }
        });
    } else {
      Object.keys(this.enrollForm.controls).forEach((controlName) =>
        this.enrollForm.controls[controlName].markAsTouched()
      );
    }
  }
}
