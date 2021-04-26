import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyComponent } from './survey.component';
import { ConfigModule, SurveyModule as PerxSurveyModule } from '@perxtech/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';

const routes: Routes = [{
  path: '',
  component: SurveyComponent
}];

@NgModule({
  declarations: [
    SurveyComponent
  ],
  imports: [
    CommonModule,
    ConfigModule.forRoot({}),
    MatCardModule,
    MatButtonModule,
    MatProgressBarModule,
    MatToolbarModule,
    PerxSurveyModule,
    TranslateModule.forRoot(),
    RouterModule.forChild(routes),
  ]
})
export class SHSurveyModule { }
