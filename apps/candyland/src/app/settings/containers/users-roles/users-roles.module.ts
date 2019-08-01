import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRolesComponent } from './users-roles.component';

@NgModule({
  declarations: [UsersRolesComponent],
  exports: [UsersRolesComponent],
  imports: [
    CommonModule
  ]
})
export class UsersRolesModule { }
