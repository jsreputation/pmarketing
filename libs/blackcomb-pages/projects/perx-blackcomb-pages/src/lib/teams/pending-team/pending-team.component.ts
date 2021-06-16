import { Component, OnInit } from '@angular/core';
import { Observable, of, Subject } from 'rxjs';
import { CampaignLandingPage, ICampaign, ICampaignService, NotificationService } from '@perxtech/core';
import { ActivatedRoute } from '@angular/router';
import { map, switchMap, takeUntil } from 'rxjs/operators';
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

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    private notificationService: NotificationService,
    private campaignService: ICampaignService,
    private translate: TranslateService
  ) { }

  public ngOnInit(): void {
    this.initTranslate();
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
        this.shareText = ''; // campaign.displayProperties.pendingPage.body.text;
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
