import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TncComponent } from './tnc.component';

const routes: Routes = [{
  path: '',
  component: TncComponent
}];

@NgModule({
  declarations: [TncComponent],
  imports: [RouterModule.forChild(routes)]
})
export class TncModule { }
