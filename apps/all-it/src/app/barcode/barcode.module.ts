import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileBarcodeComponent, ProfileBarcodeModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: ProfileBarcodeComponent
}];

@NgModule({
  imports: [
    ProfileBarcodeModule,
    RouterModule.forChild(routes),
  ]
})
export class BarcodeModule { }
