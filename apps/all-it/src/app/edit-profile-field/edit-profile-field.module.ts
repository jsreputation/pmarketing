import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EditProfileFieldComponent, EditProfileFieldModule as BCPEditProfileFieldModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: EditProfileFieldComponent
}];

@NgModule({
  imports: [
    BCPEditProfileFieldModule,
    RouterModule.forChild(routes)
  ]
})
export class EditProfileFieldModule { }
