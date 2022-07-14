import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProgramOptOutComponent } from './program-opt-out.component';

const routes: Routes = [{ path: '', component: ProgramOptOutComponent }];

@NgModule({
  declarations: [ProgramOptOutComponent],
  imports: [CommonModule, RouterModule.forChild(routes)],
})
export class ProgramOptOutModule {}
