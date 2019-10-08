import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PagesRoutingModule } from './pages-routing.module';
import { PagesComponent } from './pages.component';
import { MatTabsModule, MatInputModule, MatProgressBarModule } from '@angular/material';
import { PagesModule as PerxPagesModule, GameModule } from '@perx/core';
import { AccountComponent, GameComponent, ShakeComponent, TapComponent} from '@perx/blackcomb-pages';

@NgModule({
  declarations: [
    PagesComponent, AccountComponent, GameComponent, ShakeComponent, TapComponent],
  imports: [
    CommonModule,
    PagesRoutingModule,
    MatTabsModule,
    PerxPagesModule,
    MatInputModule,
    MatProgressBarModule,
    GameModule
  ]
})
export class PagesModule { }
