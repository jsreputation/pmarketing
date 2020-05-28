import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FindLocationModule, FindLocationComponent } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: FindLocationComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FindLocationModule,
    RouterModule.forChild(routes)
  ]
})
export class LocationsModule { }
