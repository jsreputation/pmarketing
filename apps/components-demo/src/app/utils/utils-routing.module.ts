import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PinInputComponent } from './pin-input/pin-input.component';
import { PopupComponent } from './popup/popup.component';
import { TimerComponent } from './timer/timer.component';
import { UtilsComponent } from './utils.component';

const routes: Routes = [
  {
    path: '', component: UtilsComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'pin-input' },
      { path: 'pin-input', component: PinInputComponent },
      { path: 'popup', component: PopupComponent },
      { path: 'timer', component: TimerComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UtilsRoutingModule {
}
