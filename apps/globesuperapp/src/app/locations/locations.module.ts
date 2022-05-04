import { LocationModule } from '@perxtech/core';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FindLocationComponent, FindLocationModule } from '@perxtech/blackcomb-pages';

const routes: Routes = [{
  path: '',
  component: FindLocationComponent
}];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    LocationModule,
    FindLocationModule,
    RouterModule.forChild(routes)
  ]
})
export class LocationsModule { }
