import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

import { EmptyResultsComponent } from './empty-results/empty-results.component';
import { StampCardNoteComponent } from './stamp-card-note/stamp-card-note.component';
import { ActionButtonOverlayComponent } from './action-button-overlay/action-button-overlay.component';
import { PipeUtilsModule } from '@perxtech/core';
import { NativeBridgeService } from './native-bridge/native-bridge.service';

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
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  TranslateModule,
  PipeUtilsModule
];
@NgModule({
  declarations: [
    EmptyResultsComponent,
    StampCardNoteComponent,
    ActionButtonOverlayComponent,
  ],
  imports: [...modules],
  exports: [
    ...modules,
    EmptyResultsComponent,
    StampCardNoteComponent,
    ActionButtonOverlayComponent,
  ],
  providers: [
    NativeBridgeService
  ]
})
export class SharedModule { }
