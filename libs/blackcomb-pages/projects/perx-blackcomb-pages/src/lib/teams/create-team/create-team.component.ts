import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { ICampaign, ICampaignService } from '@perxtech/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute, ParamMap } from '@angular/router';
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
      filter((params: ParamMap) => params.has('campaignId')),
      map((params: ParamMap) => params.get('campaignId')),
      switchMap((cid: string) => {
        const campaignId: number = Number.parseInt(cid, 10);
        return this.campaignService.getCampaign(campaignId);
      }),
      takeUntil(this.destroy$),
    ).subscribe(
      (campaign: ICampaign) => {
        this.campaign = campaign;
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
    if (this.createTeamForm.valid) {
      // todo: implement when customisability is ready
    }
  }
  public initTranslate(): void {
    this.translateService.get([ 'TEAMS.CREATE_PAGE.PICK_A_TEAM_NAME', 'TEAMS.CREATE_PAGE.PREDEFINED_TEAM_NAME' ]).subscribe(
      (translations: string[]) => {
        this.teamUserNameSubtitle = translations['TEAMS.CREATE_PAGE.PICK_A_TEAM_NAME'];
        if (!this.campaign) { // temporary condition until team API is ready
          this.teamUserNameSubtitle = translations['TEAMS.CREATE_PAGE.PREDEFINED_TEAM_NAME'];
          // this.createTeamForm.get('teamUsername').value =
        }
      }
    );
  }
}
