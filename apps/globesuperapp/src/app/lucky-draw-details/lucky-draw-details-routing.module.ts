import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LuckyDrawDetailsComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: LuckyDrawDetailsComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LuckyDrawDetailsRoutingModule { }
