import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatButtonModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';
import { ButtonModule } from '@cl-shared/components/button/button.module';
import { NoDataModule, PaginationModule } from '@cl-shared/table';
import { LoyaltyGridComponent } from 'src/app/loyalty/components/loyalty-grid/loyalty-grid.component';
import { LoyaltyItemComponent } from 'src/app/loyalty/components/loyalty-item/loyalty-item.component';
import { LoyaltyListPageComponent } from './containers/loyalty-list-page/loyalty-list-page.component';
import { LoyaltyComponent } from './containers/loyalty/loyalty.component';
import { LoyaltyRoutingModule } from './loyalty-routing.module';
import {LoyaltyFormsService} from './services/loyalty-forms.service';
import { NewLoyaltyComponent } from './containers/new-loyalty/new-loyalty.component';
import { MatStepperModule } from '@angular/material/stepper';
import { LoyaltyFormStepOneComponent } from './components/loyalty-form-step-one/loyalty-form-step-one.component';
import { LoyaltyFormStepTwoComponent } from './components/loyalty-form-step-two/loyalty-form-step-two.component';
import { LoyaltyFormStepThreeComponent } from './components/loyalty-form-step-three/loyalty-form-step-three.component';
import { LoyaltyFormStepFourComponent } from './components/loyalty-form-step-four/loyalty-form-step-four.component';
import { PointsInfoComponent } from './components/points-info/points-info.component';
import { MatExpansionModule } from '@angular/material/expansion';
import { ProgramMainImageComponent } from './components/program-main-image/program-main-image.component';
import { UploadGraphicModule } from '@cl-shared';
import { UserJoiningMethodComponent } from './components/user-joining-method/user-joining-method.component';
import { MatCheckboxModule } from '@angular/material/checkbox';

@NgModule({
  declarations: [
    LoyaltyComponent,
    LoyaltyListPageComponent,
    LoyaltyGridComponent,
    LoyaltyItemComponent,
    NewLoyaltyComponent,
    LoyaltyFormStepOneComponent,
    LoyaltyFormStepTwoComponent,
    LoyaltyFormStepThreeComponent,
    LoyaltyFormStepFourComponent,
    PointsInfoComponent,
    ProgramMainImageComponent,
    UserJoiningMethodComponent
  ],
  imports: [
    CommonModule,
    LoyaltyRoutingModule,
    ReactiveFormsModule,
    ButtonModule,
    UploadGraphicModule,

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
  ],
  providers: [
    LoyaltyFormsService
  ]
})
export class LoyaltyModule { }
