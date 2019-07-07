import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {TabsFilterComponent} from './tabs-filter.component';

@NgModule({
  declarations: [TabsFilterComponent],
  exports: [TabsFilterComponent],
  imports: [
    CommonModule,
  ]
})

export class TabsFilterModule {
}
