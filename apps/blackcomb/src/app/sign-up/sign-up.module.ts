import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent, SignUpModule as BCPSignUpModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignUpComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    BCPSignUpModule,
    RouterModule.forChild(routes)
  ]
})
export class SignUpModule { }
