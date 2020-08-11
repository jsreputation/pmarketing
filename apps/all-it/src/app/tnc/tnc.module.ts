import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TncComponent } from './tnc.component';
import { MatIconModule, MatToolbarModule } from '@angular/material';

const routes: Routes = [{
  path: '',
  component: TncComponent
}];

@NgModule({
  declarations: [TncComponent],
  imports: [
    RouterModule.forChild(routes),
    MatIconModule,
    MatToolbarModule
  ]
})
export class TncModule { }
