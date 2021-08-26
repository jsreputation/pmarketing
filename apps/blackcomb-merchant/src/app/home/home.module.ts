import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MerchantLandingPageComponent, MerchantLandingPageModule} from '@perxtech/core';

const routes: Routes = [{
  path: '',
  component: MerchantLandingPageComponent
}];

@NgModule({
  imports: [
    MerchantLandingPageModule,
    RouterModule.forChild(routes)
  ]
})
export class HomeModule { }
