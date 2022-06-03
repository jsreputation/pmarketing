import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StampCardComponent } from '@perxtech/blackcomb-pages';
import { StampCardModule } from './stamp-card/stamp-card.module';

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
