import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HistoryComponent, HistoryModule as BCPHistoryModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: HistoryComponent
}];

@NgModule({
  imports: [
    BCPHistoryModule,
    RouterModule.forChild(routes)
  ]
})
export class HistoryModule { }
