
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointTransferComponent, PointsModule as BCPointsModule, PointHistoryComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [      {
  path: 'transfer',
  component: PointTransferComponent
}, {
  path: 'history',
  component: PointHistoryComponent
}];

@NgModule({
  imports: [
    BCPointsModule,
    RouterModule.forChild(routes)
  ]
})
export class PointsModule { }
