import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HistoryComponent } from '@perx/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { VouchersModule } from '@perx/core';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: HistoryComponent
}];

@NgModule({
  declarations: [
    HistoryComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    VouchersModule,
    TranslateModule
  ]
})
export class HistoryModule {}
