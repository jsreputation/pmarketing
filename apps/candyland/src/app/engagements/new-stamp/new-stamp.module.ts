import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewStampRoutingModule } from './new-stamp-routing.module';
import { NewStampComponent } from './containers/new-stamp/new-stamp.component';
import { NewStampSettingsPageComponent } from './containers/new-stamp-settings-page/new-stamp-settings-page.component';
import { NewStampRulesPageComponent } from './containers/new-stamp-rules-page/new-stamp-rules-page.component';
import { NewStampDisplayPageComponent } from './containers/new-stamp-display-page/new-stamp-display-page.component';
import { StampRulePopupComponent } from './containers/stamp-rule-popup/stamp-rule-popup.component';

@NgModule({
  declarations: [
    NewStampComponent,
    NewStampSettingsPageComponent,
    NewStampRulesPageComponent,
    NewStampDisplayPageComponent,
    StampRulePopupComponent
  ],
  imports: [
    CommonModule,
    NewStampRoutingModule
  ],
  entryComponents: [
    StampRulePopupComponent
  ]
})
export class NewStampModule {
}
