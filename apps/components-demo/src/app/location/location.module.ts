import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LocationsMapComponent } from './locations-map/locations-map.component';
import { LocationModule as PerxCoreLocationModule, LocationServiceModule as PerxCoreLocationServiceModule } from '@perxtech/core';
import { MatRadioModule } from '@angular/material/radio';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTabsModule } from '@angular/material/tabs';
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
    PerxCoreLocationServiceModule.forRoot(),
    LocationRoutingModule,
    MatRadioModule,
    MatTabsModule,
    FormsModule,
    MatSlideToggleModule
  ]
})
export class LocationModule { }
