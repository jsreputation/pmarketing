import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { PuzzlesModule, StampModule as PerxStampsModule } from '@perxtech/core';
import { StampCardComponent } from './stamp-card/stamp-card.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCardComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    CommonModule,
    PuzzlesModule,
    MatButtonModule,
    PerxStampsModule,
    RouterModule.forChild(routes)
  ]
})
export class StampModule { }
