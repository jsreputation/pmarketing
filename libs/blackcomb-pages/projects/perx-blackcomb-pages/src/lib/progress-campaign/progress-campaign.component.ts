import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import {
  CampaignOutcomeType,
  ICampaign,
  ICampaignOutcome,
  ICampaignService,
  IMilestone,
  IProgressTotal,
  NotificationService,
  ProgressCampaignService,
  ProgressProperties,
  QuestState
} from '@perxtech/core';
import { filter, map, switchMap, takeUntil } from 'rxjs/operators';
import { forkJoin, Observable, of, Subject } from 'rxjs';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';

enum ProgressBarDisplayMode {
  cumulative = 'cumulative',
  individual = 'individual'
}

@Component({
  selector: 'perx-blackcomb-pages-progress-campaign',
  templateUrl: './progress-campaign.component.html',
  styleUrls: ['./progress-campaign.component.scss']
})
export class ProgressCampaignComponent implements OnInit, OnDestroy, AfterViewInit {

  public campaign$: Observable<ICampaign>;

  public questCompleted: boolean = false;
  public campaignProgress: number = 0;
  public completedTaskIds: (number|undefined)[] = [];
  public questState: string = '';
  public state: typeof QuestState = QuestState;
  public outcomeType: typeof CampaignOutcomeType = CampaignOutcomeType;

  public isEnrolled: boolean = false;
  public milestones: IMilestone[];
  public activeMilestone: IMilestone | undefined;
  public currentUserPoints: number;
  public progressBarDisplayMode: ProgressBarDisplayMode = ProgressBarDisplayMode.individual;

  public progressConfig: ProgressProperties | undefined;
  private destroy$: Subject<void> = new Subject();
  @ViewChild('milestonesConnectorDiv') private milestonesConnectorDiv: ElementRef;

  constructor(protected route: ActivatedRoute,
              private router: Router,
              private notificationService: NotificationService,
              private progressCampaignService: ProgressCampaignService,
              private campaignService: ICampaignService) { }

  public ngAfterViewInit(): void {
    // update level connector height
    if (!!this.milestones) {
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
      // else there is only 1 level, don't make a line
    }
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
          );
        }
      ),
      takeUntil(this.destroy$)
    ).subscribe(([ campaign, milestones, currentUserProgress ]: [ ICampaign, IMilestone[], IProgressTotal ]) => {

      this.currentUserPoints = currentUserProgress.userTotalAccumulatedCampaignPoints;
      this.milestones = milestones;
      this.campaign$ = of(campaign);
      this.progressConfig = campaign.displayProperties?.progressDetails;

      const [ finalMilestone ] = milestones.slice(-1);
      if (!! finalMilestone) {
        this.campaignProgress = this.currentUserPoints === 0 ? 0 : (this.currentUserPoints / finalMilestone.pointsRequired) * 100;
      }

      if (!! campaign.enrolled) {
        this.isEnrolled = campaign.enrolled;
        // get first item where points required points has not been met
        this.activeMilestone = milestones.find(milestone => this.currentUserPoints < milestone.pointsRequired);
      }
    });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public outcomeClicked(outcome: ICampaignOutcome): void {
    if (outcome.type === CampaignOutcomeType.reward) {
      this.router.navigate([ '/reward-detail', outcome.id ]);
    }
  }

  public startProgress(campaignId: number): void {
    this.campaignService.enrolIntoCampaign(campaignId)
      .subscribe((isEnrolled: boolean) => {
        if (isEnrolled) {
          // set current active milestone
          this.activeMilestone = this.milestones.find(milestone => this.currentUserPoints < milestone.pointsRequired);
        } else {
          this.notificationService.addSnack('Campaign enrolment failed');
        }
      }, error => {
        this.notificationService.addSnack(error.error.message);
      });
  }

  public milestoneCompletedProgressCalculation(milestone: IMilestone): number {

    // past milestones
    if (milestone.pointsRequired < this.currentUserPoints) {
      return milestone.pointsRequired;
    }

    if (milestone.pointsRequired === this.activeMilestone?.pointsRequired && this.milestones.length > 0) {
        const currentMilestoneIndex = this.milestones.findIndex(item => item.pointsRequired === this.activeMilestone?.pointsRequired);
        const lastMilestoneIndex = currentMilestoneIndex > 0 ? currentMilestoneIndex - 1 : 0;
        return currentMilestoneIndex === lastMilestoneIndex // is the first in the list
          ? this.currentUserPoints
          : this.currentUserPoints - this.milestones[lastMilestoneIndex].pointsRequired;
    }

    if (milestone.pointsRequired === this.currentUserPoints) {
      return 100;
    }

    return 0;
  }


  public milestoneRequiredProgressCalculation(milestone: IMilestone): number {

    // past milestones
    if (milestone.pointsRequired < this.currentUserPoints) {
      return milestone.pointsRequired;
    }

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
