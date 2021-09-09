import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PerxBlackcombPagesModule, SignInComponent } from '@perxtech/blackcomb-pages';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

const routes: Routes = [{
  path: '',
  component: SignInComponent
}];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    PerxBlackcombPagesModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ]
})
export class PiModule { }
