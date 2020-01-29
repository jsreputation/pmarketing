import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatOptionModule,
  MatSelectModule,
  MatTabsModule, MatProgressBarModule
} from '@angular/material';
import { ButtonModule, StatusLabelModule } from '@perx/candyshop';
import { NoDataModule, PaginationModule } from '@cl-shared/table';
import { LoyaltyGridComponent } from 'src/app/loyalty/components/loyalty-grid/loyalty-grid.component';
import { LoyaltyItemComponent } from 'src/app/loyalty/components/loyalty-item/loyalty-item.component';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyListPageComponent } from './containers/loyalty-list-page/loyalty-list-page.component';
import { LoyaltyComponent } from './containers/loyalty/loyalty.component';
import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { LoyaltyFormsService } from './services/loyalty-forms.service';
import { ManageLoyaltyPageComponent } from './containers/manage-loyalty-page/manage-loyalty-page.component';
import { LoyaltyFormStepDetailsComponent } from './components/loyalty-form-step-details/loyalty-form-step-details.component';
import { LoyaltyFormStepTiersConversionsComponent } from './components/loyalty-form-step-tiers-conversions/loyalty-form-step-tiers-conversions.component';
import { PointsInfoComponent } from './components/points-info/points-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProgramMainImageComponent } from './components/program-main-image/program-main-image.component';
import { ConditionsBuilderModule, DatePickerModule, PipesModule, UploadFileModule, UploadGraphicModule } from '@cl-shared';
import { UserJoinMethodComponent } from './components/user-joining-method/user-joining-method.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { SelectAudienceComponent } from './components/select-audience/select-audience.component';
import { MatRadioModule } from '@angular/material/radio';
import { GlobalEarnRuleGroupComponent } from './components/global-earn-rule-group/global-earn-rule-group.component';
import { GlobalBurnRuleGroupComponent } from './components/global-burn-rule-group/global-burn-rule-group.component';
import { PointsExpiryGroupComponent } from './components/points-expiry-group/points-expiry-group.component';
import { TiersGroupComponent } from './components/tiers-group/tiers-group.component';
import { MatTableModule } from '@angular/material/table';
import { ViewSchemeInfoComponent } from './components/view-scheme-info/view-scheme-info.component';
import { ViewLoyaltyComponent } from './components/view-loyalty/view-loyalty.component';
import { ViewGlobalEarnBurnRulesComponent } from './components/view-global-earn-burn-rules/view-global-earn-burn-rules.component';
import { LoyaltyReviewPageComponent } from './containers/loyalty-review-page/loyalty-review-page.component';
import { LoyaltyFormStepEarnRulesComponent } from './components/loyalty-form-step-earn-rules/loyalty-form-step-earn-rules.component';
import { PointEarnRulesListComponent } from './components/point-earn-rules-list/point-earn-rules-list.component';
import { RuleSetupPopupComponent } from './containers/rule-setup-popup/rule-setup-popup.component';
import { LoyaltyCustomTierFormsService } from './services/loyalty-custom-tier-forms.service';
import { LoyaltyEarnRulesFormsService } from './services/loyalty-earn-rules-forms.service';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { LoyaltyRuleCardComponent } from './components/loyalty-rules-card/loyalty-rule-card.component';
import { ConditionInfoPipe } from './condition-info.pipe';
import { LoyaltyConfigService } from './services/loyalty-config.service';
import { MultiplierResultGroupComponent } from './components/multiplier-result-group/multiplier-result-group.component';
import { BonusResultGroupComponent } from './components/bonus-result-group/bonus-result-group.component';
import { PointsEarnedInfoPipe } from './points-earned-info.pipe';
import { PointsExpiredInfoPipe } from './points-expired-info.pipe';
import { StepperModule } from '@perx/candyshop';
import { DirectivesModule } from '@cl-shared/directives/directives.module';

@NgModule({
  declarations: [
    LoyaltyComponent,
    LoyaltyListPageComponent,
    LoyaltyGridComponent,
    LoyaltyItemComponent,
    ManageLoyaltyPageComponent,
    LoyaltyFormStepDetailsComponent,
    LoyaltyFormStepTiersConversionsComponent,
    PointsInfoComponent,
    ProgramMainImageComponent,
    UserJoinMethodComponent,
    SelectAudienceComponent,
    TierSetupPopupComponent,
    GlobalEarnRuleGroupComponent,
    GlobalBurnRuleGroupComponent,
    PointsExpiryGroupComponent,
    TiersGroupComponent,
    UserJoinMethodComponent,
    ViewSchemeInfoComponent,
    ViewLoyaltyComponent,
    ViewGlobalEarnBurnRulesComponent,
    LoyaltyReviewPageComponent,
    LoyaltyFormStepEarnRulesComponent,
    PointEarnRulesListComponent,
    RuleSetupPopupComponent,
    LoyaltyRuleCardComponent,
    ConditionInfoPipe,
    MultiplierResultGroupComponent,
    BonusResultGroupComponent,
    PointsEarnedInfoPipe,
    PointsExpiredInfoPipe,
  ],
  imports: [
    CommonModule,
    LoyaltyRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    UploadGraphicModule,
    UploadFileModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    PaginationModule,
    NoDataModule,
    StepperModule,
    MatExpansionModule,
    MatCheckboxModule,
    MatRadioModule,
    MatOptionModule,
    MatSelectModule,
    StatusLabelModule,
    MatDialogModule,
    UploadFileModule,
    MatTabsModule,
    MatTableModule,
    DatePickerModule,
    PipesModule,
    TranslateModule,
    DragDropModule,
    MatProgressBarModule,
    FormsModule,
    DirectivesModule,
    ConditionsBuilderModule
  ],
  providers: [
    LoyaltyFormsService,
    LoyaltyCustomTierFormsService,
    LoyaltyEarnRulesFormsService,
    LoyaltyConfigService
  ],
  entryComponents: [
    TierSetupPopupComponent,
    RuleSetupPopupComponent,
    MultiplierResultGroupComponent,
    BonusResultGroupComponent
  ]
})
export class LoyaltyModule {
}
