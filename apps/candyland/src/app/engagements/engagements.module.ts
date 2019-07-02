import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsListPageComponent } from './containers/engagements-list-page/engagements-list-page.component';
import { CreateEngagementPopupComponent } from './containers/create-engagement-popup/create-engagement-popup.component';
import { EngagementsComponent } from './containers/engagements/engagements.component';
import { MatDialogModule } from '@angular/material';

@NgModule({
  declarations: [EngagementsListPageComponent, CreateEngagementPopupComponent, EngagementsComponent],
  imports: [
    CommonModule,
    EngagementsRoutingModule,
    MatDialogModule,
  ],
  entryComponents: [
    CreateEngagementPopupComponent
  ]
})
export class EngagementsModule { }
