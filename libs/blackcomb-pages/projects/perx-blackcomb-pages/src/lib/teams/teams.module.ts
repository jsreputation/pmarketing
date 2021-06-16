import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team/create-team.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { PendingTeamComponent } from './pending-team/pending-team.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { UtilsModule } from '@perxtech/core';


@NgModule({
  imports: [
    CommonModule,
    MatToolbarModule,
    RouterModule,
    TranslateModule.forRoot(),
    MatButtonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    UtilsModule
  ],
  declarations: [ CreateTeamComponent, JoinTeamComponent, PendingTeamComponent ]
})
export class TeamsModule {}
