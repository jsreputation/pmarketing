import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CampaignLandingPage, ICampaign, ICampaignService } from '@perxtech/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'perx-blackcomb-pages-join-team',
  templateUrl: './join-team.component.html',
  styleUrls: ['./join-team.component.scss']
})
export class JoinTeamComponent implements OnInit {


  public campaign$: Observable<ICampaign>;
  private destroy$: Subject<void> = new Subject();
  public landingPageConfig: CampaignLandingPage | undefined;
  public joinTeamForm: FormGroup;

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
    this.joinTeamForm = this.fb.group({
      teamName: ['', Validators.required],
      teamUserName: ['', Validators.required]
    });
  }
  public joinTeam(): void {

  }
}
