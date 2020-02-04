import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CandyshopSimpleComponent } from './candyshop-simple/candyshop-simple.component';
import { CandyshopMenuComponent } from './candyshop-menu/candyshop-menu.component';
import { CandyshopFormsComponent } from './candyshop-forms/candyshop-forms.component';
import { CandyshopComponent } from './candyshop.component';
import { CandyshopFileUploaderComponent } from './candyshop-file-uploader/candyshop-file-uploader.component';
import { CandyshopGraphicUploaderComponent } from './candyshop-graphic-uploader/candyshop-graphic-uploader.component';

const routes: Routes = [
  {
    path: '', component: CandyshopComponent,
    children: [
      { path: '', redirectTo: 'simple', pathMatch: 'full' },
      { path: 'simple', component: CandyshopSimpleComponent },
      { path: 'menu', component:  CandyshopMenuComponent},
      { path: 'forms', component:  CandyshopFormsComponent},
      { path: 'file-uploader', component:  CandyshopFileUploaderComponent},
      { path: 'graphic-uploader', component:  CandyshopGraphicUploaderComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CandyshopRoutingModule { }
