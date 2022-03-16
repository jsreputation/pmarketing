import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LargeVouchersComponent, LargeVouchersModule as BCPLargeVouchersModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  pathMatch: 'full',
  component: LargeVouchersComponent
}];

@NgModule({
  imports: [
    BCPLargeVouchersModule,
    RouterModule.forChild(routes)
  ]
})
export class LargeVouchersModule { }
