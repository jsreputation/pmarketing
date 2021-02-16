import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatButtonModule, MatCardModule, MatProgressBarModule, MatToolbarModule, MatListModule, MatIconModule} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { UtilsModule, QuestModule as BCPQuestModule } from '@perxtech/core';
import { QuestComponent } from './quest.component';
import { RouterModule } from '@angular/router';

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
    BCPQuestModule.forChild()
  ],
  providers: []
})
export class QuestModule { }
