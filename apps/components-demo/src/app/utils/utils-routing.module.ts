import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PinInputComponent } from './pin-input/pin-input.component';
import { UtilsComponent } from './utils.component';

const routes: Routes = [
  {
    path: '', component: UtilsComponent,
    children: [
      { path: 'pin-input', component: PinInputComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilsRoutingModule {
}
