import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { CampaignLandingPage, ICampaign, ICampaignService } from '@perxtech/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'perx-blackcomb-pages-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  public campaign: ICampaign;
  private destroy$: Subject<void> = new Subject();
  public landingPageConfig: CampaignLandingPage | undefined;
  public createTeamForm: FormGroup;
  public teamUserNameSubtitle: string;

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private campaignService: ICampaignService,
    protected translateService: TranslateService
  ) { }

  public ngOnInit(): void {
    this.route.paramMap.pipe(
      // filter((params: ParamMap) => params.has('id')),
      // map((params: ParamMap) => params.get('id')),
      map(() => '1421'),
      switchMap((cid: string) => {
        const campaignId: number = Number.parseInt(cid, 10);
        return this.campaignService.getCampaign(campaignId);
      }),
      takeUntil(this.destroy$),
    ).subscribe(
      (campaign: ICampaign) => {
        this.campaign = campaign;
        this.landingPageConfig = campaign.displayProperties?.landingPage;
        this.initTranslate();
        this.initForm();
      }
    );
  }
  public initForm(): void {
    this.createTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamUserName: ['', Validators.required]
    });
  }
  public createTeam(): void {

  }

  public initTranslate(): void {
    this.translateService.get([ 'TEAMS.CREATE_PAGE.PICK_A_TEAM_NAME', 'TEAMS.CREATE_PAGE.PREDEFINED_TEAM_NAME' ]).subscribe(
      (translations: string[]) => {
        this.teamUserNameSubtitle = translations['TEAMS.CREATE_PAGE.PICK_A_TEAM_NAME'];
        if (this.campaign) { // temporary condition until team API is ready
          this.teamUserNameSubtitle = translations['TEAMS.CREATE_PAGE.PREDEFINED_TEAM_NAME'];
        }
      }
    );
  }
}
