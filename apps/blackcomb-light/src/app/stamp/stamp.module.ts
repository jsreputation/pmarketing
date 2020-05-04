import { NgModule } from '@angular/core';
import { RouterModule, Routes, Router } from '@angular/router';
import { StampCardComponent, StampCardModule } from '@perxtech/blackcomb-pages';
import { AppRouter } from '../router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    StampCardModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    { provide: Router, useClass: AppRouter }
  ]
})
export class StampModule { }
