import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StampCardComponent } from '@perxtech/blackcomb-pages';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perxtech/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    PuzzlesModule,
    // MatButtonModule,
    RouterModule.forChild(routes),
    PerxStampsModule,
    // PerxBlackcombPagesModule
  ]
})
export class StampModule { }
