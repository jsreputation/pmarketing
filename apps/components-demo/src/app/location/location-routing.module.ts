import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

const routes: Routes = [
  {
    path: '', component: HomeComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'map'},
      { path: 'map', component: LocationsMapComponent },
      { path: 'list', component: ListComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}
