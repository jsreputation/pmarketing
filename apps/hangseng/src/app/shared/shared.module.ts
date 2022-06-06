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
import { EnrollGameButtonComponent } from './enroll-game-button/enroll-game-button.component';
import { StampCardNoteComponent } from './stamp-card-note/stamp-card-note.component';
import { CompletedStampsComponent } from './completed-stamps/completed-stamps.component';


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
];
@NgModule({
  declarations: [EmptyResultsComponent, EnrollGameButtonComponent, StampCardNoteComponent, CompletedStampsComponent],
  imports: [
    ...modules
  ],
  exports: [
    ...modules,
    EmptyResultsComponent,
    EnrollGameButtonComponent,
    StampCardNoteComponent,
    CompletedStampsComponent
  ]
})
export class SharedModule { }
