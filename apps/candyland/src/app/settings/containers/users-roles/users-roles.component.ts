import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SettingsService } from '@cl-core/services';
import { InviteNewUsersPopupComponent } from './containers/invite-new-users-popup/invite-new-users-popup.component';
import { filter, switchMap } from 'rxjs/operators';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent implements AfterViewInit {
  public dataSource: CustomDataSource<IAMUser>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;
  public config: any;
  private groups: any;

  constructor(private settingsService: SettingsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog
  ) {
    this.dataSource = new CustomDataSource<IAMUser>(this.settingsService);
  }

  public ngAfterViewInit(): void {
    this.settingsService.getRolesOptions()
      .subscribe(config => this.config = config);
    this.getAllGroups();
  }

  public openDialogInviteNewUsers(): void {
    const dialogRef = this.dialog.open(InviteNewUsersPopupComponent, {
      panelClass: 'invite-new-users-dialog',
      data: {
        groups: this.groups
      }
    });
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
    const dialogRef = this.dialog.open(InviteNewUsersPopupComponent, {
      panelClass: 'invite-new-users-dialog',
      data: {
        user,
        groups: this.groups
      }
    });

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
        this.dataSource.updateData();
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
        this.groups = res.getModels();
      });
  }

}
