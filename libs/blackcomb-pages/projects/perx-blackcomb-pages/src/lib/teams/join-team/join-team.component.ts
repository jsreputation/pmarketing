import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import {
  CampaignLandingPage,
  ErrorMessageService,
  ICampaign,
  ICampaignService,
  ITeam,
  NotificationService,
  TeamsProperties,
  TeamsService
} from '@perxtech/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'perx-blackcomb-pages-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent implements OnInit {


  public campaign$: Observable<ICampaign>;
  private destroy$: Subject<void> = new Subject();
  public landingPageConfig: CampaignLandingPage | undefined;
  public teamsConfig: TeamsProperties | undefined;
  public joinTeamForm: FormGroup;
  public campaignId: number;

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private router: Router,
    private notificationService: NotificationService,
    private campaignService: ICampaignService,
    private teamsService: TeamsService,
    private errorMessageService: ErrorMessageService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('campaignId')),
      map((params: ParamMap) => params.get('campaignId')),
      switchMap((cid: string) => {
        const campaignId: number = Number.parseInt(cid, 10);
        return this.campaignService.getCampaign(campaignId);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      (campaign: ICampaign) => {
        this.campaign$ = of(campaign);
        this.campaignId = campaign.id;
        this.landingPageConfig = campaign.displayProperties?.landingPage;
        this.teamsConfig = campaign.displayProperties?.teamsDetails;
        this.initForm();
      }
    );
  }
  public initForm(): void {
    this.joinTeamForm = this.fb.group({
      teamCode: ['', Validators.required],
      // teamUserName: ['', Validators.required]
    });
  }
  public joinTeam(): void {
    this.joinTeamForm.markAllAsTouched();
    if (this.joinTeamForm.valid){
      const teamCode = this.joinTeamForm.get('teamCode')!.value;
      this.teamsService.joinATeamForCampaign(this.campaignId, teamCode).subscribe(
        (team: ITeam) => {
          if (team.id) {
            this.router.navigate([`teams/pending/${this.campaignId}`]);
          }
        },
        (err: HttpErrorResponse) => {
          this.errorMessageService.getErrorMessageByErrorCode(err.error.code, err.error.message)
            .subscribe(
              (errMessage: string) => {
                this.notificationService.addSnack(errMessage);
              });
        }
      );
    }
  }
}
