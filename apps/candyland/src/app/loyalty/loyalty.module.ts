import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
  MatTabsModule
} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { NoDataModule, PaginationModule } from '@cl-shared/table';
import { LoyaltyGridComponent } from 'src/app/loyalty/components/loyalty-grid/loyalty-grid.component';
import { LoyaltyItemComponent } from 'src/app/loyalty/components/loyalty-item/loyalty-item.component';
import { TierSetupPopupComponent } from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import { LoyaltyListPageComponent } from './containers/loyalty-list-page/loyalty-list-page.component';
import { LoyaltyComponent } from './containers/loyalty/loyalty.component';
import { LoyaltyRoutingModule } from './loyalty-routing.module';
import { LoyaltyFormsService } from './services/loyalty-forms.service';
import { ManageLoyaltyPageComponent } from './containers/manage-loyalty-page/manage-loyalty-page.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LoyaltyFormStepDetailsComponent } from './components/loyalty-form-step-details/loyalty-form-step-details.component';
import { LoyaltyFormStepTiersConversionsComponent } from './components/loyalty-form-step-tiers-conversions/loyalty-form-step-tiers-conversions.component';
import { LoyaltyFormStepReviewComponent } from './components/loyalty-form-step-review/loyalty-form-step-review.component';
import { PointsInfoComponent } from './components/points-info/points-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProgramMainImageComponent } from './components/program-main-image/program-main-image.component';
import { DatePickerModule, PipesModule, UploadFileModule, UploadGraphicModule } from '@cl-shared';
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
import { PointEarnRulesGroupComponent } from './components/point-earn-rules-group/point-earn-rules-group.component';
import { PointEarnRulesListComponent } from './components/point-earn-rules-list/point-earn-rules-list.component';
import { RuleSetupPopupComponent } from './containers/rule-setup-popup/rule-setup-popup.component';
import { LoyaltyCustomTierFormsService } from './services/loyalty-custom-tier-forms.service';
import { LoyaltyEarnRulesFormsService } from './services/loyalty-earn-rules-forms.service';
import { DateConditionGroupComponent } from './components/date-condition-group/date-condition-group.component';
import { AmountConditionGroupComponent } from './components/amount-condition-group/amount-condition-group.component';
import { TransactionConditionGroupComponent } from './components/transaction-condition-group/transaction-condition-group.component';
import { DynamicFormGroupDirective } from './dynamic-field.directive';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { TranslateModule } from '@ngx-translate/core';
import { LoyaltyRuleCardComponent } from './components/loyalty-rules-card/loyalty-rule-card.component';
import { CurrencyConditionGroupComponent } from './components/currency-condition-group/currency-condition-group.component';
import { ConditionInfoPipe } from './condition-info.pipe';

@NgModule({
  declarations: [
    LoyaltyComponent,
    LoyaltyListPageComponent,
    LoyaltyGridComponent,
    LoyaltyItemComponent,
    ManageLoyaltyPageComponent,
    LoyaltyFormStepDetailsComponent,
    LoyaltyFormStepTiersConversionsComponent,
    LoyaltyFormStepReviewComponent,
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
    PointEarnRulesGroupComponent,
    PointEarnRulesListComponent,
    RuleSetupPopupComponent,
    DateConditionGroupComponent,
    AmountConditionGroupComponent,
    TransactionConditionGroupComponent,
    CurrencyConditionGroupComponent,
    DynamicFormGroupDirective,
    LoyaltyRuleCardComponent,
    ConditionInfoPipe,
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
    MatStepperModule,
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
    DragDropModule
  ],
  providers: [
    LoyaltyFormsService,
    LoyaltyCustomTierFormsService,
    LoyaltyEarnRulesFormsService,
  ],
  entryComponents: [
    TierSetupPopupComponent,
    RuleSetupPopupComponent,
    DateConditionGroupComponent,
    AmountConditionGroupComponent,
    TransactionConditionGroupComponent,
    CurrencyConditionGroupComponent
  ]
})
export class LoyaltyModule {
}
