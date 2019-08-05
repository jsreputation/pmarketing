import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LocationsMapComponent } from './locations-map/locations-map.component';

const routes: Routes = [
  {
    path: '', component: LocationsMapComponent,
    children: [
      { path: 'map', component: LocationsMapComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LocationRoutingModule {
}
