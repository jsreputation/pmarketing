import { NgModule } from '@angular/core';
import { MatToolbarModule, MatButtonModule, MatTabsModule, MatCardModule, MatRippleModule, MatIconModule, MatFormFieldModule, MatInputModule, MatProgressSpinnerModule, MatDialogModule } from '@angular/material';
const modules = [
  MatToolbarModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatRippleModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatProgressSpinnerModule,
  MatDialogModule,
]
@NgModule({
  declarations: [],
  imports: [
   ... modules
  ],
  exports: [
    ... modules
  ]
})
export class SharedModule { }
