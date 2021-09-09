import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantOrderModule, MerchantOrderComponent } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: MerchantOrderComponent
}];

@NgModule({
  imports: [
    MerchantOrderModule,
    RouterModule.forChild(routes),
  ]
})
export class OrderModule { }
