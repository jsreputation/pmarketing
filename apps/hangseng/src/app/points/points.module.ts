
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PointsModule as BCPointsModule, PointHistoryComponent, PointConversionComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  {
    path: '',
    component: PointHistoryComponent
  },
  {
    path: 'transfer',
    component: PointConversionComponent
  },
  {
    path: 'history',
    component: PointHistoryComponent
  }
];

@NgModule({
  imports: [
    BCPointsModule,
    RouterModule.forChild(routes)
  ]
})
export class PointsModule { }
