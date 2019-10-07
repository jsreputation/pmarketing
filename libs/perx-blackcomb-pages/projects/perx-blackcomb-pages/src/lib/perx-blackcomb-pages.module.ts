import { NgModule } from '@angular/core';
import { AccountComponent } from './account/account.component';
import { ProfileModule } from '@perx/core';

const comps: any[] = [
  AccountComponent
];

@NgModule({
  imports: [
    ProfileModule
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
