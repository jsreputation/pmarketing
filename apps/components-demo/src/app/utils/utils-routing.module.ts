import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PinInputComponent } from './pin-input/pin-input.component';
import { UtilsComponent } from './utils.component';
import { PopupComponent } from './popup/popup.component';

const routes: Routes = [
  {
    path: '', component: UtilsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pin-input' },
      { path: 'pin-input', component: PinInputComponent },
      { path: 'popup', component: PopupComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilsRoutingModule {
}
