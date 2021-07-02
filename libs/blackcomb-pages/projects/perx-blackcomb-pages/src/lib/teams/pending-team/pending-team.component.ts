import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import {
  CampaignLandingPage,
  ICampaign,
  ICampaignService,
  ITeam,
  NotificationService,
  TeamsProperties,
  TeamsService
} from '@perxtech/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { TranslateService } from '@ngx-translate/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'perx-blackcomb-pages-pending-team',
  templateUrl: './pending-team.component.html',
  styleUrls: ['./pending-team.component.scss']
})
export class PendingTeamComponent implements OnInit {

  public campaign$: Observable<ICampaign>;
  private destroy$: Subject<void> = new Subject();
  public landingPageConfig: CampaignLandingPage | undefined;
  public code: string = 'testcode';
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;
  public teamCodeShareText: string;
  public shareText: string;
  public pendingTeamForm: FormGroup;
  public teamUsername: string;
  public teamsConfig: TeamsProperties | undefined;
  public team: ITeam;

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private notificationService: NotificationService,
    private campaignService: ICampaignService,
    private translate: TranslateService,
    private teamsService: TeamsService
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
    this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('campaignId')),
      map((params: ParamMap) => params.get('campaignId')),
      switchMap((cid: string) => {
        const campaignId: number = Number.parseInt(cid, 10);
        return combineLatest([
          this.campaignService.getCampaign(campaignId),
          this.teamsService.getTeam(campaignId)
          ]);
      }),
      takeUntil(this.destroy$)
    ).subscribe(
      ([campaign , team]) => {
        this.campaign$ = of(campaign);
        this.team = team;
        console.log(team);
        this.landingPageConfig = campaign.displayProperties?.landingPage;
        this.teamsConfig = campaign.displayProperties?.teamsDetails;
        this.shareText = this.teamsConfig?.inviteMessage?.description || '';
        this.teamUsername = 'John Doe';
        this.initForm(); // switchmap(() => teamservice.getTeam());
      }
    );
  }

  public initForm(): void {
    this.pendingTeamForm = this.fb.group({
      teamName: [`${this.code}`]
    });
  }

  public leaveTeam(): void {

  }

  public share(): void {
    // @ts-ignore
    if (navigator.share) {
      const data = {
        text: `${this.shareText}\n${this.teamCodeShareText}`,
      };
      // @ts-ignore
      (navigator as any)
        .share(data)
        .then(() => { })
        .catch(() => {
          console.log('failed to use share, falling back to clipboard');
          this.copy();
        });
    } else {
      console.log('no access to share api, falling back to clipboard');
      this.copy();
    }
  }

  public copy(): void {
    navigator.clipboard
      .writeText(`${this.shareText}\n${this.teamCodeShareText}`)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.translate
      .get([
        'TEAMS.SHARE_COPY_TXT',
        'TEAMS.COPY_TO_CLIPBOARD',
        'TEAMS.CLIPBOARD_ERROR_TXT',
      ])
      .subscribe((res: any) => {
        this.teamCodeShareText = res['TEAMS.SHARE_COPY_TXT'].replace(
          '{{code}}',
          this.code
        );
        this.copyToClipboardTxt = res['TEAMS.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = res['TEAMS.CLIPBOARD_ERROR_TXT'];
      });
  }
}
