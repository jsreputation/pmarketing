import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsMapComponent} from './locations-map/locations-map.component';
import { LocationModule as PerxCoreLocationModule, } from '@perx/core';
import { MatRadioModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { LocationRoutingModule } from './location-routing.module';

@NgModule({
  declarations: [ LocationsMapComponent ],
  imports: [
    RouterModule,
    CommonModule,
    PerxCoreLocationModule,
    LocationRoutingModule,
    MatRadioModule,
    FormsModule
  ]
})
export class LocationModule { }
