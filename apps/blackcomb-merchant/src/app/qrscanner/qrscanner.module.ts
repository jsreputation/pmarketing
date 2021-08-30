import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantQrscannerComponent, MerchantQrscannerModule } from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: MerchantQrscannerComponent
}];

@NgModule({
  imports: [
    MerchantQrscannerModule,
    RouterModule.forChild(routes)
  ]
})
export class QrscannerModule { }
