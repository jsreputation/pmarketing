import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatSnackBarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule, Routes } from '@angular/router';
import { PerxBlackcombPagesModule, SignUpComponent } from '@perxtech/blackcomb-pages';
import { AuthenticationModule, GameModule, SurveyModule } from '@perxtech/core';

const routes: Routes = [
  { path: '', pathMatch: 'full', component: SignUpComponent },
  { path: '*', redirectTo: '' }
];

@NgModule({
  imports: [
    AuthenticationModule,
    PerxBlackcombPagesModule,
    CommonModule,
    SurveyModule,
    RouterModule.forChild(routes),
    MatSnackBarModule,
    MatButtonModule,
    GameModule
  ]
})
export class SignUpModule { }
