import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatTabsModule, MatInputModule } from '@angular/material';
import { PagesModule as PerxPagesModule } from '@perx/core';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTabsModule,
    PerxPagesModule,
    MatInputModule
  ]
})
export class PagesModule { }
