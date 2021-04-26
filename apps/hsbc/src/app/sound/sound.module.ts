import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SoundComponent } from './sound.component';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';

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
