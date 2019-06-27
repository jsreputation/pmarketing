import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatTabsModule, MatIconModule, MatButtonModule,
  MatTableModule, MatSortModule, MatFormFieldModule, MatInputModule, MatPaginatorModule
} from '@angular/material';

@NgModule({
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
    MatPaginatorModule,
  ],
  exports: [
    MatFormFieldModule,
    MatInputModule,
    MatSortModule,
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    MatTabsModule,
    MatPaginatorModule,
  ],
  declarations: []
})
export class MaterialModule {
}
