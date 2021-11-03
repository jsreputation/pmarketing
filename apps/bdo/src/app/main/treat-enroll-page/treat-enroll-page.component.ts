import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICampaignService, NotificationService } from '@perxtech/core';

@Component({
  selector: 'bdo-treat-enroll-page',
  templateUrl: './treat-enroll-page.component.html',
  styleUrls: ['./treat-enroll-page.component.scss'],
})
export class TreatEnrollPageComponent implements  OnInit{
  campaignId: number;
  enrollForm: FormGroup ;
  constructor(
    private campaignService: ICampaignService,
    private activeRoute: ActivatedRoute,
    private route: Router,
    private notificationService: NotificationService
  ) {}
  ngOnInit() {
    this.activeRoute.params.subscribe((item) => {
      this.campaignId = item.id;
    });
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
        .bdoCampaignEnrol(this.campaignId, this.enrollForm.get('promoId').value)
        .subscribe((item) => {
          if (item) {
            this.route.navigate([`treat-enroll/${this.campaignId}/complete`],{ state:{promoId:this.enrollForm.get('promoId').value}});
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
