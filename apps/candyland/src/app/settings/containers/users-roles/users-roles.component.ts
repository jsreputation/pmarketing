import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SettingsService } from '@cl-core/services';
import { InviteNewUsersPopupComponent } from './containers/invite-new-users-popup/invite-new-users-popup.component';
import { SettingsUsersRolesDataSource } from '@cl-shared/table/data-source/settings-users-roles-data-source';
// import { SettingsHttpAdapter } from '@cl-core/services/settings-transform-data.service';
import { filter, switchMap } from 'rxjs/operators';
// import { of } from 'rxjs';

@Component({
  selector: 'cl-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent  implements AfterViewInit {
  public dataSource: SettingsUsersRolesDataSource<IAMUser>;
  public hasData = true;
  public config: any;
  private groups: any;

  constructor(private settingsService: SettingsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog,
              // private settingsTransformDataService: SettingsHttpAdapter
  ) {
    this.dataSource = new SettingsUsersRolesDataSource<IAMUser>(this.settingsService);
  }

  public ngAfterViewInit(): void {
    this.settingsService.getRolesOptions()
      .subscribe( config => this.config = config);
    this.getAllGroups();
  }

  public openDialogInviteNewUsers(): void {
    const dialogRef = this.dialog.open(InviteNewUsersPopupComponent, {panelClass: 'invite-new-users-dialog',
      data: {
        groups: this.groups
    }});

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newUser: any) => this.settingsService.inviteNewUser(newUser))
      )
      .subscribe(() => {
        this.dataSource.updateData();
    });
  }

  public openDialogEditUsers(user: IAMUser): void {
    const dialogRef = this.dialog.open(InviteNewUsersPopupComponent, {panelClass: 'invite-new-users-dialog',
      data: {
      user,
        groups: this.groups
      }});

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((updatedUser: any) => this.settingsService.patchUser(user, updatedUser))
        // switchMap((value: any) => {
        //   if (value) {
        //     const newUser = this.settingsTransformDataService.transformInviteUser({...user, ...value});
        //     return this.settingsService.patchUser(newUser, user.id);
        //   }
        //   return of(null);
        // })
      )
      .subscribe(() => {
        // if (value) {
          this.dataSource.updateData();
        // }
    });
  }

  public deleteUser(id: string): void {
    this.settingsService.deleteUser(id)
      .subscribe(() => {
        this.dataSource.updateData();
      });
  }

  private getAllGroups(): void {
    this.settingsService.getAllGroups()
      .subscribe((res) => {
        this.groups = res;
      });
  }

}
