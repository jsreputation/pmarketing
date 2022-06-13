import { AfterViewChecked, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CampaignOutcomeType,
  CampaignState,
  IBadge,
  ICampaign,
  ICampaignOutcome,
  ICampaignService,
  IMilestone,
  IMilestoneIssuedOutcome,
  IPoints,
  IPrizeSetItem,
  IPrizeSetOutcomeService,
  IProgressTotal,
  IVoucherService,
  NotificationService,
  PrizeSetIssuedType,
  ProgressCampaignService,
  ProgressProperties,
  Voucher
} from '@perxtech/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

enum ProgressBarDisplayMode {
  cumulative = 'cumulative',
  individual = 'individual'
}

type IssuedOutcome = (Voucher | IBadge | IPrizeSetItem[] | IPoints);

@Component({
  selector: 'hangseng-progress-campaign',
  templateUrl: './progress-campaign.component.html',
  styleUrls: [ './progress-campaign.component.scss' ]
})
export class ProgressCampaignComponent implements OnInit, OnDestroy, AfterViewChecked {

  public campaign$: Observable<ICampaign>;

  public lineDrawned: boolean = false;
  public campaignProgress: number = 0;
  public completedTaskIds: (number | undefined)[] = [];
  public state: typeof CampaignState = CampaignState;
  public outcomeType: typeof CampaignOutcomeType = CampaignOutcomeType;

  public isEnrolled: boolean = false;
  public milestones: IMilestone[];
  public issuedOutcomes: IssuedOutcome[] = [];
  public activeMilestone: IMilestone;
  public currentUserPoints: number;
  public progressBarDisplayMode: ProgressBarDisplayMode = ProgressBarDisplayMode.individual;

  public progressConfig: ProgressProperties | undefined;
  private destroy$: Subject<void> = new Subject();
  @ViewChild('milestonesConnectorDiv') private milestonesConnectorDiv: ElementRef;

  public ngAfterViewChecked(): void {
    // update level connector height
    if (!! this.milestones && !this.lineDrawned) {
      const numMilestones = this.milestones.length;
      const taskCards = [ ...this.milestonesConnectorDiv.nativeElement.parentElement.children ]
        .filter((child) => child.classList.contains('task-card'));
      if (taskCards.length > 1 && numMilestones > 1) {
        // we want the height up to the 2nd last element
        // - 1 for 0 index conversion. i.e. taskCard.length = 3, the 2nd last index is 1;
        const numElementsForHeight = taskCards.slice(0, taskCards.length - 2).length;

        if (taskCards.length === numMilestones) {
          let cumulativeHeights = 0;
          // get the heights for numElementsForHeights inclusive i.e. both 0 and 1 - from length = 2
          for (let i = 0; i <= numElementsForHeight; i++) {
            cumulativeHeights += taskCards[i].offsetHeight;
          }
          this.milestonesConnectorDiv.nativeElement.style.height = `${cumulativeHeights}px`;
        }
      }
      this.lineDrawned = true;
      // else there is only 1 level, don't make a line
    }
  }

  constructor(protected route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private progressCampaignService: ProgressCampaignService,
              private prizeSetService: IPrizeSetOutcomeService,
              private voucherService: IVoucherService,
              private campaignService: ICampaignService) {
  }

  public ngOnInit(): void {

    this.route.paramMap.pipe(
      filter((params: ParamMap) => params.has('id')),
      map((params: ParamMap) => params.get('id')),
      switchMap((cid: string) => {
          const campaignId: number = Number.parseInt(cid, 10);
          return forkJoin(
            this.campaignService.getCampaign(campaignId),
            this.progressCampaignService.getCampaignProgressMilestones(campaignId),
            this.progressCampaignService.getCampaignTotalProgress(campaignId),
            this.progressCampaignService.getCampaignMilestoneOutcomesForUser(campaignId)
          );
        }
      ),
      takeUntil(this.destroy$)
    ).subscribe(([ campaign, milestones, currentUserProgress, issuedOutcomes ]: [ ICampaign, IMilestone[], IProgressTotal, IMilestoneIssuedOutcome[] ]) => {
      this.getTangibleOutcomes(issuedOutcomes);
      this.currentUserPoints = currentUserProgress.userTotalAccumulatedCampaignPoints;
      this.milestones = milestones;
      this.campaign$ = of(campaign);
      this.progressConfig = campaign.displayProperties?.progressDetails;

      const [ finalMilestone ] = milestones.slice(-1);
      if (!! finalMilestone) {
        this.campaignProgress = this.currentUserPoints === 0 ? 0 : parseFloat(
          Number(`${
            Math.floor(
              Number(`${(this.currentUserPoints / finalMilestone.pointsRequired) * 100}e2`)
            )}e-2`
          ).toFixed(1));
        this.campaignProgress = this.campaignProgress > 100 ? 100 : this.campaignProgress;
      }

      if (!! campaign.enrolled) {
        this.isEnrolled = campaign.enrolled;
        // get first item where points required points has not been met
        const foundActiveMilestone = this.milestones.find(milestone => this.currentUserPoints < milestone.pointsRequired);

        if (foundActiveMilestone) {
          this.activeMilestone = foundActiveMilestone;
        } else {
          console.error('active milestone not found');
        }
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private getTangibleOutcomes(issuedOutcomes: IMilestoneIssuedOutcome[]): void {
    issuedOutcomes.forEach((issuedOutcome) => {
      switch (issuedOutcome.outcomeType) {
        case PrizeSetIssuedType.voucher:
          this.voucherService.get(issuedOutcome.outcomeId).subscribe(
            (voucher) => {
              this.issuedOutcomes.push(voucher);
            }
          )
          break;
        case PrizeSetIssuedType.points:
          // don't need to do anything until loyalty modules are properly made
          break;
        case PrizeSetIssuedType.badge:
          // this.badgeService.getBadge(issuedOutcome.outcomeId).subscribe(
          //   (badge: IBadge) => {
          //     if (badge !== undefined) {
          //       this.issuedOutcomes.push(badge);
          //     }
          //   }
          // )
          break;
        case PrizeSetIssuedType.prizeSet:
          this.prizeSetService.getPrizeSetIssuedOutcomes(issuedOutcome.outcomeId).subscribe(
            (prizeSetItem: IPrizeSetItem[]) => {
              if (prizeSetItem !== undefined) {
                this.issuedOutcomes.push(prizeSetItem);
              }
            }
          )
          break;
      }
    });
  }

  public outcomeClicked(outcome: ICampaignOutcome): void {
    if (outcome.type === CampaignOutcomeType.reward) {
      const voucher = this.issuedOutcomes.find(
        (issuedOutcome) => (issuedOutcome as unknown as Voucher).reward?.id === outcome.id);
      if (voucher !== undefined) {
        // we do have a issued outcome that matches the reward id
        this.router.navigate(['/voucher-detail', (voucher as unknown as Voucher).id])
      } else {
        this.router.navigate([ '/reward-detail', outcome.id ], { queryParams:  { previewReward: true } });
      }
    }
    if (outcome.type === CampaignOutcomeType.prizeSet) {
      this.router.navigate(['/prize-set-outcomes', outcome.id]);
    }
  }

  public startProgress(campaignId: number): void {
    this.campaignService.enrolIntoCampaign(campaignId)
      .subscribe((isEnrolled: boolean) => {
        if (isEnrolled) {
          // set current active milestone
          const foundActiveMilestone = this.milestones.find(milestone => this.currentUserPoints < milestone.pointsRequired);

          if (foundActiveMilestone) {
            this.activeMilestone = foundActiveMilestone;
          } else {
            console.error('active milestone not found');
          }

        } else {
          this.notificationService.addSnack('Campaign enrolment failed');
        }
      }, error => {
        this.notificationService.addSnack(error.error.message);
      });
  }

  public milestoneCompletedProgressCalculation(milestone: IMilestone): number {

    // past milestones
    if (milestone.pointsRequired <= this.currentUserPoints) {
      // same logic required as it is a completed past milestone
      return this.milestoneRequiredProgressCalculation(milestone);
    }

    if (milestone.pointsRequired === this.activeMilestone?.pointsRequired && this.milestones.length > 0) {
      const currentMilestoneIndex = this.milestones.findIndex(item => item.pointsRequired === this.activeMilestone?.pointsRequired);
      const lastMilestoneIndex = currentMilestoneIndex > 0 ? currentMilestoneIndex - 1 : 0;
      return currentMilestoneIndex === lastMilestoneIndex // is the first in the list
        ? this.currentUserPoints
        : this.currentUserPoints - this.milestones[lastMilestoneIndex].pointsRequired;
    }

    return 0;
  }


  public milestoneRequiredProgressCalculation(milestone: IMilestone): number {
    if (this.milestones.length > 0) {
      const currentMilestoneIndex = this.milestones.findIndex(item => item.pointsRequired === milestone.pointsRequired);
      const lastMilestoneIndex = currentMilestoneIndex > 0 ? currentMilestoneIndex - 1 : 0;
      return currentMilestoneIndex === lastMilestoneIndex // is the first in the list
        ? milestone.pointsRequired
        : milestone.pointsRequired - this.milestones[lastMilestoneIndex].pointsRequired;
    }

    return 0;
  }
}
