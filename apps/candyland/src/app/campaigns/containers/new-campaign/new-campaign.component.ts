import { ChangeDetectionStrategy, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CampaignsService } from '@cl-core-services';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { MatDialog, MatStepper } from '@angular/material';
import { NewCampaignDonePopupComponent } from '../new-campaign-done-popup/new-campaign-done-popup.component';
import { untilDestroyed } from 'ngx-take-until-destroy';
import { Router } from '@angular/router';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

@Component({
  selector: 'cl-new-campaign',
  templateUrl: './new-campaign.component.html',
  styleUrls: ['./new-campaign.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewCampaignComponent implements OnInit, OnDestroy {
  public form: FormGroup;
  public campaign;
  @ViewChild('stepper', {static: false}) private stepper: MatStepper;

  constructor(private store: CampaignCreationStoreService,
              private stepConditionService: StepConditionService,
              private campaignsService: CampaignsService,
              private router: Router,
              public dialog: MatDialog,
              private fb: FormBuilder) {
  }

  public ngOnInit(): void {
    this.initForm();
    this.store.currentCampaign$
      .asObservable()
      .pipe(untilDestroyed(this))
      .subscribe(data => {
        this.campaign = data;
      });
    this.form.valueChanges
      .pipe(untilDestroyed(this))
      .subscribe(value => {
        this.store.updateCampaign(value);
      });
  }

  public ngOnDestroy(): void {
  }

  private initForm(): void {
    this.form = this.fb.group({
      name: ['Campaign Name', [
        Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)
      ]
      ]
    });
  }

  public get name(): AbstractControl {
    return this.form.get('name');
  }

  public getStepCondition(key: number): boolean {
    return this.stepConditionService.getStepCondition(key);
  }

  public goBack(): void {
    this.stepper.previous();
  }

  public goNext(): void {
    this.stepConditionService.nextEvent(this.stepper.selectedIndex);
    this.stepper.next();
  }

  public get isLastStep(): boolean {
    return this.stepper && this.stepper.selectedIndex === this.stepper._steps.length - 1;
  }

  public save(): void {
    console.log(this.store.currentCampaign);
    this.campaignsService.createCampaign(this.store.currentCampaign).subscribe(
      data => {
        if (data) {
          this.openDialog();
        }
      },
      (error: Error) => console.warn(error.message)
    );
  }

  private getDialogData(campaign): { title: string, subTitle: string, type?: string } {
    const type = ('channel' in campaign && 'type' in campaign.channel) ? campaign.channel.type : '';
    switch (type) {
      case 'sms':
        return {
          title: 'Yay! you just created a campaign',
          subTitle: '100  Weblinks are created fo you. Please download the files.',
          type: 'download'
        };
      case 'weblink':
        return {
          title: 'Yay! you just created a campaig',
          subTitle: 'Copy the link and share your campaign.',
          type: 'weblink'
        };
      default:
        return {
          title: 'Yay! you just created a campaign',
          subTitle: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed.'
        };
    }
  }

  private openDialog(): void {
    const config = this.getDialogData(this.store.currentCampaign);
    const dialogRef = this.dialog.open(NewCampaignDonePopupComponent, {data: config});

    dialogRef.afterClosed().subscribe(() => {
      this.router.navigate(['/campaigns']);
    });
  }
}
