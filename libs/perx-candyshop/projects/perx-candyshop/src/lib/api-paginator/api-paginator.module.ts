import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatPaginatorModule } from '@angular/material';
import { ApiPaginatorComponent } from './api-paginator.component';


@NgModule({
  declarations: [
    ApiPaginatorComponent
  ],
  exports: [
    ApiPaginatorComponent
  ],
  imports: [
    CommonModule,
    MatPaginatorModule,
  ]
})
export class ApiPaginatorModule { }
