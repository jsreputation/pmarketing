import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AccountComponent } from './account/account.component';
const comps: any[] = [
  AccountComponent
];

@NgModule({
  imports: [
    RouterModule,
    CommonModule
  ],
  exports: [
    ...comps
  ],
  declarations: [
    ...comps
  ]
})
export class PerxBlackcombPagesModule {

}
