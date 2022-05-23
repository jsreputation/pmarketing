import { NgModule} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RewardsCollectionComponent } from './rewards-collection/rewards-collection.component';
import { RewardsListComponent } from './rewards-list/rewards-list.component';
import { RewardsListTabbedComponent } from './rewards-list-tabbed/rewards-list-tabbed.component';
import { MaterialModule } from '../shared/material.module';
import { RewardComponent } from './reward/reward.component';
import { UtilsModule } from '../utils/utils.module';
import { StampsCardsListComponent } from '../stamp/stamps-cards-list/stamps-cards-list.component';
import { DragScrollModule } from 'ngx-drag-scroll';
import { RewardsLargeListComponent } from './rewards-large-list/rewards-large-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { RewardVoucherComponent } from './reward-voucher/reward-voucher.component';
import { MatListModule } from '@angular/material/list';
import { ProgressBarModule } from '../progress-bar/progress-bar.module';
import { ProgressRequirePipe } from './rewards-large-list/reward-requirement.pipe';
import { PipeUtilsModule } from '../utils/pipe-utils.module';

const components = [
  RewardsCollectionComponent,
  RewardsListComponent,
  RewardsListTabbedComponent,
  RewardComponent,
  RewardsLargeListComponent,
  RewardVoucherComponent,
  StampsCardsListComponent,
  ProgressRequirePipe
];

@NgModule({
  declarations: [
    ...components,
  ],
  imports: [
    DragScrollModule,
    CommonModule,
    PipeUtilsModule,
    MaterialModule,
    UtilsModule,
    TranslateModule.forChild(),
    MatListModule,
    ProgressBarModule
  ],
  exports: [
    ...components,
  ]
})
export class RewardsModule {}
