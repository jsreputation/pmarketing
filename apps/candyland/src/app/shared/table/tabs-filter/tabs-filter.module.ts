import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsFilterComponent} from './tabs-filter.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';

@NgModule({
  declarations: [TabsFilterComponent],
  exports: [TabsFilterComponent],
  imports: [
    CommonModule,
    PipesModule
  ]
})

export class TabsFilterModule {
}
