import { CommonModule } from '@angular/common';
import { InjectionToken, NgModule } from '@angular/core';
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
import { ConditionsBuilderFormsService } from './conditions-builder-forms.service';
import { ConditionsBuilderComponent } from './conditions-builder.component';
import { DirectivesModule } from '../directives/directives.module';
import { DatePickerModule } from '../components/date-picker/date-picker.module';
import { IConditionsBuilderComponentMap } from '@cl-shared/conditions-builder/conditions-builder.models';
import { RuleConditionType } from '@cl-core/models/loyalty/rule-condition-type.enum';

export const CONDITION_BUILDER_COMPONENT_MAP = new InjectionToken<IConditionsBuilderComponentMap>('CONDITION_BUILDER_COMPONENT_MAP');

const DefaultComponentMap: IConditionsBuilderComponentMap = {
  [RuleConditionType.transaction]: TransactionConditionGroupComponent,
  [RuleConditionType.amount]: AmountConditionGroupComponent,
  [RuleConditionType.currency]: CurrencyConditionGroupComponent,
  [RuleConditionType.fromDate]: DateConditionGroupComponent,
  [RuleConditionType.toDate]: DateConditionGroupComponent,
};

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
    { provide: CONDITION_BUILDER_COMPONENT_MAP, useValue: DefaultComponentMap },
    ConditionsBuilderFormsService
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
