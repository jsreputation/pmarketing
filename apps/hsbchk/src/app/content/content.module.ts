import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContentComponent, PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { MatProgressSpinnerModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: ContentComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
    TranslateModule,
    MatProgressSpinnerModule
  ]
})
export class ContentModule {}
