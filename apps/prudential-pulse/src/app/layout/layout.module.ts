import { NgModule } from '@angular/core';
import { LayoutModule as BCPLayoutModule } from '@perxtech/blackcomb-pages';
import { LayoutRoutingModule } from './layout-routing.module';

@NgModule({
  imports: [
    // LayoutRoutingModule must be listed first to use its '' routing paths
    LayoutRoutingModule,
    BCPLayoutModule
  ]
})
export class LayoutModule { }
