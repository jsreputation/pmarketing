import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { CreateMerchantComponent } from './containers/create-merchant/create-merchant.component';
// import { ListMerchantComponent } from './containers/list-merchant/list-merchant.component';
import { DetailedMerchantComponent } from './containers/detailed-merchant/detailed-merchant.component';
const routes: Routes = [
  // {
  //   path: '',
  //   component: ListMerchantComponent
  // },
  {
    path: '',
    // path: 'create-merchant',
    component: CreateMerchantComponent
  },
  {
    path: 'detail-merchant/:id',
    component: DetailedMerchantComponent
  }
];
@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class MerchantRoutingModule { }
