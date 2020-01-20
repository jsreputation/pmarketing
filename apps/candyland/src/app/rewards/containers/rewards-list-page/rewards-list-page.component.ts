import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table/data-source/custom-data-source';
import { Router } from '@angular/router';
import { RewardsService } from '@cl-core/services';
import { switchMap } from 'rxjs/operators';
import { RewardsTableMenuActions } from '../../rewards-actions/rewards-table-menu-actions';
import { TranslateService } from '@ngx-translate/core';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';
import { IRewardEntity } from '@cl-core/models/reward/reward-entity.interface';

@Component({
  selector: 'cl-rewards-list-page',
  templateUrl: './rewards-list-page.component.html',
  styleUrls: ['./rewards-list-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RewardsListPageComponent {
  public dataSource: CustomDataSource<IRewardEntity>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;
  public displayedColumns: string[] = [
    'image',
    'name',
    'rewardType',
    'category',
    // temporary hide until api provides this data
    'balance',
    'actions'
  ];

  constructor(
    private rewardsService: RewardsService,
    public cd: ChangeDetectorRef,
    public dialog: MatDialog,
    private router: Router,
    private readonly translate: TranslateService,
    private translateDefaultLanguage: TranslateDefaultLanguageService
  ) {
    this.dataSource = new CustomDataSource<IRewardEntity>(this.rewardsService);
    this.setTranslateLanguage();
  }

  private setTranslateLanguage(): void {
    this.translateDefaultLanguage.defaultLanguage$
      .subscribe((language: string) => {
        this.translate.setDefaultLang(language);
      });
  }

  public actionHandler(action: { action: RewardsTableMenuActions, data: IRewardEntity }): void {
    switch (action.action) {
      case RewardsTableMenuActions.edit: {
        this.editReward(action.data);
        break;
      }
      case RewardsTableMenuActions.duplicate: {
        this.duplicateReward(action.data);
        break;
      }
    }
  }

  public detailReward(reward: IRewardEntity): void {
    this.router.navigate(['/rewards/detail', reward.id], { state: reward });
  }

  private editReward(reward: IRewardEntity): void {
    this.router.navigate(['/rewards/edit', reward.id], { state: reward });
  }

  private duplicateReward(reward: IRewardEntity): void {
    this.rewardsService.getRewardToForm(reward.id).pipe(
      switchMap(responseReward => this.rewardsService.createReward(responseReward))
    ).subscribe(() => this.dataSource.updateData());
  }
}
