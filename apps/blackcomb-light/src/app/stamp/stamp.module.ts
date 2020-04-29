import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StampCardComponent, StampCardModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    StampCardModule,
    RouterModule.forChild(routes)
  ]
})
export class StampModule { }
