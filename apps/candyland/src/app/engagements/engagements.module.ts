import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EngagementsRoutingModule } from './engagements-routing.module';
import { EngagementsListPageComponent } from './containers/engagements-list-page/engagements-list-page.component';
import { CreateEngagementPopupComponent } from './containers/create-engagement-popup/create-engagement-popup.component';
import { EngagementsComponent } from './containers/engagements/engagements.component';
import { ShareComponentsModule } from '@cl-shared/components/share-components.module';
import { MaterialModule } from './material.module';
import { TableEntitiesModule } from '@cl-shared/table-entities/table-entities.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [EngagementsListPageComponent, CreateEngagementPopupComponent, EngagementsComponent],
  imports: [
    CommonModule,
    EngagementsRoutingModule,
    ShareComponentsModule,
    MaterialModule,
    TableEntitiesModule,
    FormsModule
  ],
  entryComponents: [
    CreateEngagementPopupComponent
  ]
})
export class EngagementsModule { }
