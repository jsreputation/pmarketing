import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent, ProfileModule as BCPProfileModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: ProfileComponent
}];

@NgModule({
  imports: [
    BCPProfileModule,
    RouterModule.forChild(routes)
  ]
})
export class ProfileModule { }
