import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule } from '@perxtech/core';
import { QuestComponent } from './quest.component';
import { RouterModule, Routes } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';


const routes: Routes = [
  {
    path: '',
    component: QuestComponent
  }
];

@NgModule({
  declarations: [QuestComponent],
  exports: [QuestComponent],
  imports: [
    CommonModule,
    TranslateModule.forChild(),
    UtilsModule,
    MatProgressBarModule,
    MatCardModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    RouterModule,
    MatListModule,
    RouterModule.forChild(routes),
    MatTabsModule
  ],
  providers: []
})
export class QuestModule { }
