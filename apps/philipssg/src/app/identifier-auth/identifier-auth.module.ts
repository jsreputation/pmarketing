import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule } from '@perxtech/blackcomb-pages';
import { SharedModule } from '../shared/shared.module';
import { IdentifierAuthComponent } from './identifier-auth.component';

const routes: Routes = [{
  path: '',
  component: IdentifierAuthComponent
}];

@NgModule({
  declarations: [IdentifierAuthComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule,
    PerxBlackcombPagesModule
  ]
})
export class IdentifierAuthModule { }
