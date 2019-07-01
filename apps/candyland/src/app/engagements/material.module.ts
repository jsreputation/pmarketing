import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  MatTabsModule,
  MatIconModule,
  MatButtonModule,
  MatTableModule,
  MatSortModule,
  MatFormFieldModule,
  MatInputModule,
  MatPaginatorModule,
  MatSelect,
  MatSelectModule,
  MatInkBar
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
    MatSelectModule,
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
    MatSelectModule,
  ],
  declarations: []
})
export class MaterialModule {
}
