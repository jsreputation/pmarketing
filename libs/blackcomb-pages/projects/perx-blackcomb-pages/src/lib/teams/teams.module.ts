import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTeamComponent } from './create-team/create-team.component';
import { JoinTeamComponent } from './join-team/join-team.component';
import { PendingTeamComponent } from './pending-team/pending-team.component';


@NgModule({
  imports: [
    CommonModule
  ],
  declarations: [ CreateTeamComponent, JoinTeamComponent, PendingTeamComponent ]
})
export class TeamsModule {}
