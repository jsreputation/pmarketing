import { NgModule } from '@angular/core';
import { CommonModule, APP_BASE_HREF } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { AccountComponent } from './account/account.component';
import { PagesComponent } from './pages.component';
import { MatTabsModule } from '@angular/material';
import { PagesModule as PerxPagesModule } from '@perx/core';
import { ContactUsComponent } from './contact-us/contact-us.component';

@NgModule({
  declarations: [AccountComponent, PagesComponent, ContactUsComponent],
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
