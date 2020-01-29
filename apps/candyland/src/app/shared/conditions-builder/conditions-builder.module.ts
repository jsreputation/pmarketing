import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
  MatButtonModule, MatIconModule, MatInputModule, MatMenuModule, MatSelectModule
} from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from '@perx/candyshop';
import { TranslateModule } from '@ngx-translate/core';
import { TransactionConditionGroupComponent } from './transaction-condition-group/transaction-condition-group.component';
import { AmountConditionGroupComponent } from './amount-condition-group/amount-condition-group.component';
import { CurrencyConditionGroupComponent } from './currency-condition-group/currency-condition-group.component';
import { DateConditionGroupComponent } from './date-condition-group/date-condition-group.component';
import { ConditionsBuilderService } from './conditions-builder.service';
import { ConditionsBuilderComponent } from './conditions-builder.component';
import { DirectivesModule } from '../directives/directives.module';
import { DatePickerModule } from '../components/date-picker/date-picker.module';

@NgModule({
  declarations: [
    ConditionsBuilderComponent,
    TransactionConditionGroupComponent,
    AmountConditionGroupComponent,
    CurrencyConditionGroupComponent,
    DateConditionGroupComponent,
    DateConditionGroupComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    ButtonModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    DirectivesModule,
    DatePickerModule,
    TranslateModule,
  ],
  providers: [
    ConditionsBuilderService
  ],
  exports: [
    ConditionsBuilderComponent
  ],
  entryComponents: [
    TransactionConditionGroupComponent,
    AmountConditionGroupComponent,
    CurrencyConditionGroupComponent,
    DateConditionGroupComponent,
    DateConditionGroupComponent
  ]
})
export class ConditionsBuilderModule {
}
