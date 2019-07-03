import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundComponent } from './sound.component';
import { MatIconModule, MatDialogModule, MatButtonModule } from '@angular/material';

@NgModule({
  declarations: [
    SoundComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatDialogModule,
    MatButtonModule
  ],
  entryComponents: [
    SoundComponent
  ]
})
export class SoundModule {
}
