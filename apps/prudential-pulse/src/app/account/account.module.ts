import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BadgeServiceModule, UtilsModule } from '@perxtech/core';
import { CommonModule } from '@angular/common';
import { MatListModule } from '@angular/material/list';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import { AccountComponent } from './account.component';

const routes: Routes = [{
  path: '',
  component: AccountComponent
}];

@NgModule({
  imports: [
    CommonModule,
    UtilsModule,
    MatListModule,
    MatCardModule,
    MatIconModule,
    TranslateModule.forChild(),
    RouterModule.forChild(routes),
    BadgeServiceModule.forRoot()
  ],
  declarations: [AccountComponent]
})
export class AccountModule { }
