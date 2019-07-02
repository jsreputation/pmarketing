import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsListPageComponent } from './containers/engagements-list-page/engagements-list-page.component';
import { CreateEngagementPopupComponent } from './containers/create-engagement-popup/create-engagement-popup.component';
import { EngagementsComponent } from './containers/engagements/engagements.component';
import { MatDialogModule, MatIconModule } from '@angular/material';
import { EngagementTypeComponent } from './containers/create-engagement-popup/engagement-type/engagement-type.component';
import { TypeItemComponent } from './containers/create-engagement-popup/engagement-type/type-item/type-item.component';
import { InkModule } from '@cl-shared/components/ink/ink.module';

@NgModule({
  declarations: [EngagementsListPageComponent, CreateEngagementPopupComponent, EngagementsComponent, EngagementTypeComponent, TypeItemComponent],
  imports: [
    CommonModule,
    EngagementsRoutingModule,
    MatDialogModule,
    MatIconModule,
    InkModule,
  ],
  entryComponents: [
    CreateEngagementPopupComponent
  ]
})
export class EngagementsModule { }
