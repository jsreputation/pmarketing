import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CampaignsCollectionComponent } from '../home/campaigns-collection/campaigns-collection.component';
import { UtilsModule } from '@perxtech/core';
import { MatCardModule } from '@angular/material/card';
import { TranslateModule } from '@ngx-translate/core';
import { MatButtonModule } from '@angular/material/button';
import { MatRippleModule } from '@angular/material/core';
import { GamesCollectionComponent } from '../home/games-collection/games-collection.component';
import { CatalogsComponent } from '../home/catalogs/catalogs.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [
    GamesCollectionComponent,
    CampaignsCollectionComponent,
    CatalogsComponent
  ],
  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule,
    MatRippleModule,
    TranslateModule.forChild(),
    InfiniteScrollModule,
    UtilsModule,
    RouterModule
  ],
  exports: [
    GamesCollectionComponent,
    CampaignsCollectionComponent,
    CatalogsComponent
  ]
})
export class PageComponentsModule {}
