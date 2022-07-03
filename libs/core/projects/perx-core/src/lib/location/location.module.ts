import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsListComponent } from './locations-list/locations-list.component';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';

const comps: any[] = [LocationsListComponent, LocationsMapComponent];

@NgModule({
  declarations: comps,
  imports: [
    CommonModule,
    MatDividerModule,
    MatListModule,
    MatIconModule,
    MatCardModule,
  ],
  exports: comps
})
export class LocationModule {
}
