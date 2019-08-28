import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material';
import { PaginatorComponent } from '@cl-shared/table/paginator/paginator.component';

@NgModule({
  declarations: [
    PaginatorComponent
  ],
  exports: [
    PaginatorComponent
  ],
  imports: [
    CommonModule,

    MatPaginatorModule,
  ]
})
export class PaginationModule { }
