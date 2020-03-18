import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { LocationModule as PerxCoreLocationModule, } from '@perxtech/core';
import { MatRadioModule, MatTabsModule, MatSlideToggleModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationRoutingModule } from './location-routing.module';
import { HomeComponent } from './home/home.component';
import { ListComponent } from './list/list.component';

@NgModule({
  declarations: [LocationsMapComponent, HomeComponent, ListComponent],
  imports: [
    RouterModule,
    CommonModule,
    PerxCoreLocationModule,
    LocationRoutingModule,
    MatRadioModule,
    MatTabsModule,
    FormsModule,
    MatSlideToggleModule
  ]
})
export class LocationModule { }
