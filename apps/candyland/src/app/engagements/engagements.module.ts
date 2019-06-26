import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsListPageComponent } from './containers/engagements-list-page/engagements-list-page.component';
import { CreateEngagementPopupComponent } from './containers/create-engagement-popup/create-engagement-popup.component';
import { EngagementsComponent } from './containers/engagements/engagements.component';

@NgModule({
  declarations: [EngagementsListPageComponent, CreateEngagementPopupComponent, EngagementsComponent],
  imports: [
    CommonModule,
    EngagementsRoutingModule
  ],
  entryComponents: [
    CreateEngagementPopupComponent
  ]
})
export class EngagementsModule { }
