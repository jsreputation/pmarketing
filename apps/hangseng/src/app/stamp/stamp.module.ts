import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StampCardComponent } from './stamp-card/stamp-card.component';
import { StampCardModule } from './stamp-card/stamp-card.module';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: StampCardComponent },
  { path: '*', redirectTo: '' },
];

@NgModule({
  imports: [CommonModule, StampCardModule, RouterModule.forChild(routes)],
})
export class StampModule {}
