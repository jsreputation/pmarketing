import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EnterPinComponent, EnterPinModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: EnterPinComponent
}];

@NgModule({
  imports: [
    EnterPinModule,
    RouterModule.forChild(routes)
  ]
})
export class OtpModule { }
