import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatTabsModule } from '@angular/material';
import { PagesModule as PerxPagesModule } from '@perx/core';

@NgModule({
  declarations: [PagesComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTabsModule,
    PerxPagesModule
  ],
  providers: [
    {
        provide: APP_BASE_HREF,
        useValue: 'pages/what'
    }
]
})
export class PagesModule { }
