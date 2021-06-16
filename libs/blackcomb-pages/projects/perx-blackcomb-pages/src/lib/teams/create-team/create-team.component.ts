import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CampaignLandingPage, ICampaign, ICampaignService } from '@perxtech/core';
import { map, switchMap, takeUntil } from 'rxjs/operators';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'perx-blackcomb-pages-create-team',
  templateUrl: './create-team.component.html',
  styleUrls: ['./create-team.component.scss']
})
export class CreateTeamComponent implements OnInit {

  public campaign$: Observable<ICampaign>;
  private destroy$: Subject<void> = new Subject();
  public landingPageConfig: CampaignLandingPage | undefined;
  public createTeamForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private campaignService: ICampaignService
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
      takeUntil(this.destroy$)
    ).subscribe(
      (campaign: ICampaign) => {
        this.campaign$ = of(campaign);
        this.landingPageConfig = campaign.displayProperties?.landingPage;
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
}
