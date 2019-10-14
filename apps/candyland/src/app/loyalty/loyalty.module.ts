import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ReactiveFormsModule} from '@angular/forms';
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
import {ButtonModule} from '@cl-shared/components/button/button.module';
import {StatusLabelModule} from '@cl-shared/components/status-label/status-label.module';
import {NoDataModule, PaginationModule} from '@cl-shared/table';
import {LoyaltyGridComponent} from 'src/app/loyalty/components/loyalty-grid/loyalty-grid.component';
import {LoyaltyItemComponent} from 'src/app/loyalty/components/loyalty-item/loyalty-item.component';
import {TierSetupPopupComponent} from 'src/app/loyalty/containers/tier-setup-popup/tier-setup-popup.component';
import {LoyaltyListPageComponent} from './containers/loyalty-list-page/loyalty-list-page.component';
import {LoyaltyComponent} from './containers/loyalty/loyalty.component';
import {LoyaltyRoutingModule} from './loyalty-routing.module';
import {LoyaltyFormsService} from './services/loyalty-forms.service';
import {NewLoyaltyComponent} from './containers/new-loyalty/new-loyalty.component';
import {MatStepperModule} from '@angular/material/stepper';
import {LoyaltyFormStepOneComponent} from './components/loyalty-form-step-one/loyalty-form-step-one.component';
import {LoyaltyFormStepTiersConversionsComponent} from './components/loyalty-form-step-tiers-conversions/loyalty-form-step-tiers-conversions.component';
import {LoyaltyFormStepThreeComponent} from './components/loyalty-form-step-three/loyalty-form-step-three.component';
import {LoyaltyFormStepFourComponent} from './components/loyalty-form-step-four/loyalty-form-step-four.component';
import {PointsInfoComponent} from './components/points-info/points-info.component';
import {MatExpansionModule} from '@angular/material/expansion';
import {ProgramMainImageComponent} from './components/program-main-image/program-main-image.component';
import {DatePickerModule, UploadFileModule, UploadGraphicModule} from '@cl-shared';
import {UserJoiningMethodComponent} from './components/user-joining-method/user-joining-method.component';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {SelectAudienceComponent} from './components/select-audience/select-audience.component';
import {MatRadioModule} from '@angular/material/radio';
import { GlobalEarnRuleGroupComponent } from './components/global-earn-rule-group/global-earn-rule-group.component';
import { GlobalBurnRuleGroupComponent } from './components/global-burn-rule-group/global-burn-rule-group.component';
import { PointsExpiryGroupComponent } from './components/points-expiry-group/points-expiry-group.component';
import { TiersGroupComponent } from './components/tiers-group/tiers-group.component';

@NgModule({
  declarations: [
    LoyaltyComponent,
    LoyaltyListPageComponent,
    LoyaltyGridComponent,
    LoyaltyItemComponent,
    NewLoyaltyComponent,
    LoyaltyFormStepOneComponent,
    LoyaltyFormStepTiersConversionsComponent,
    LoyaltyFormStepThreeComponent,
    LoyaltyFormStepFourComponent,
    PointsInfoComponent,
    ProgramMainImageComponent,
    UserJoiningMethodComponent,
    SelectAudienceComponent,
    TierSetupPopupComponent,
    GlobalEarnRuleGroupComponent,
    GlobalBurnRuleGroupComponent,
    PointsExpiryGroupComponent,
    TiersGroupComponent
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
    UploadGraphicModule,
    MatTabsModule,
    DatePickerModule
  ],
  providers: [
    LoyaltyFormsService
  ],
  entryComponents: [
    TierSetupPopupComponent
  ]
})
export class LoyaltyModule {
}
