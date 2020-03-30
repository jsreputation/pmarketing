import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuckyDrawDetailsComponent } from '@perxtech/blackcomb-pages';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{ path: '', component: LuckyDrawDetailsComponent }];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    PerxBlackcombPagesModule,
    RouterModule.forChild(routes)
  ]
})
export class LuckyDrawDetailModule { }
