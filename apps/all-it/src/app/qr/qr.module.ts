import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QRComponent, QRModule as BCPQRModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: QRComponent
}];

@NgModule({
  imports: [
    BCPQRModule,
    RouterModule.forChild(routes),
  ]
})
export class QRModule { }
