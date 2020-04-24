import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material';
import { PerxBlackcombPagesModule, StampCardComponent } from '@perxtech/blackcomb-pages';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    RouterModule.forChild(routes),
    PerxStampsModule,
    PerxBlackcombPagesModule
  ]
})
export class StampModule { }
