import { NgModule } from '@angular/core';
import {
  RouterModule,
  Routes
} from '@angular/router';
import { ChangeMobileComponent } from './change-mobile.component';

const routes: Routes = [{
  path: '',
  component: ChangeMobileComponent,
  data: { minLen: 10, maxLen: 10 }
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChangeMobileRoutingModule { }
