import { Component, OnInit } from '@angular/core';
import { combineLatest, Observable, of, Subject } from 'rxjs';
import {
  ICampaign,
  ICampaignService,
  ITeam,
  NotificationService,
  TeamsProperties,
  TeamsService,
  TeamState
} from '@perxtech/core';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
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
  public progressBarHeading: string;
  public waitingTxt: string;
  public copyToClipboardTxt: string;
  public clipboardErrorTxt: string;
  public teamCodeShareText: string;
  public shareText: string;
  public pendingTeamForm: FormGroup;
  // public teamUsername: string;
  public teamsConfig: TeamsProperties | undefined;
  public team: ITeam;

  constructor(
    private fb: FormBuilder,
    protected route: ActivatedRoute,
    protected router: Router,
    private notificationService: NotificationService,
    private campaignService: ICampaignService,
    private translate: TranslateService,
    private teamsService: TeamsService
  ) { }

  public ngOnInit(): void {
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
        if (team.state === TeamState.inProgress)
        {
          this.campaign$ = of(campaign);
          this.team = team;
          this.teamsConfig = campaign.displayProperties?.teamsDetails;
          this.shareText = this.teamsConfig?.inviteMessage?.description || '';
          this.teamCodeShareText = this.teamsConfig?.inviteMessage?.codeBlurb || '';
          // this.teamUsername = 'John Doe';
          this.initForm();
          this.initTranslate();
        } else { // team is completed
          this.router.navigate([`campaign-welcome/${campaign.id}`], { replaceUrl: true })
        }
      },
      () => { // team or campaign does not exist
        this.router.navigate(['home'], { replaceUrl: true })
      }
    );
  }

  public initForm(): void {
    this.pendingTeamForm = this.fb.group({
      teamName: [`${this.team.invitationCode}`]
    });
  }

  public leaveTeam(): void {
    this.teamsService.leaveATeam(this.team.id).pipe(
      switchMap((success: boolean) => combineLatest([of(success), this.campaign$]))
    ).subscribe(
      ([success, campaign]) => {
        if (success) {
          this.notificationService.addSnack('You are no longer part of this team');
          this.router.navigate([`campaign-welcome/${campaign.id}`])
        } else {
          this.notificationService.addSnack('Could not leave team, please try again later');
        }
      }
    )
  }

  public share(): void {
    // @ts-ignore
    if (navigator.share) {
      const data = {
        text: `${this.shareText}\n${this.teamCodeShareText} ${this.team.invitationCode}`,
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
      .writeText(`${this.shareText}\n${this.teamCodeShareText} ${this.team.invitationCode}`)
      .then(() => this.notificationService.addSnack(this.copyToClipboardTxt))
      .catch(() => this.notificationService.addSnack(this.clipboardErrorTxt));
  }

  private initTranslate(): void {
    this.translate
      .get([
        'TEAMS.PENDING_PAGE.PROGRESS_BAR_DESCRIPTION',
        'TEAMS.PENDING_PAGE.WAITING_FOR_MORE_USER',
        'TEAMS.PENDING_PAGE.COPY_TO_CLIPBOARD',
        'TEAMS.PENDING_PAGE.CLIPBOARD_ERROR_TXT',
      ])
      .pipe(
        switchMap((translateResults: any) => combineLatest([ of(translateResults), this.campaign$ ]))
      )
      .subscribe(([ translateResults, campaign ]) => {
        this.progressBarHeading = translateResults['TEAMS.PENDING_PAGE.PROGRESS_BAR_DESCRIPTION']
          .replace('{{joinedMembersCount}}', this.team.joinedMembersCount)
          .replace('{{teamSize}}', campaign.teamSize);
        this.waitingTxt = translateResults['TEAMS.PENDING_PAGE.WAITING_FOR_MORE_USER']
          .replace('{{numAdditionalRequired}}', (campaign.teamSize! - this.team.joinedMembersCount));
        this.copyToClipboardTxt = translateResults['TEAMS.PENDING_PAGE.COPY_TO_CLIPBOARD'];
        this.clipboardErrorTxt = translateResults['TEAMS.PENDING_PAGE.CLIPBOARD_ERROR_TXT'];
      });
  }
}
