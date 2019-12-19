import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SettingsService, AuthService, MessageService } from '@cl-core/services';
import { InviteNewUsersPopupComponent, InviteNewUsersPopupComponentData } from './containers/invite-new-users-popup/invite-new-users-popup.component';
import { filter, switchMap } from 'rxjs/operators';
import { CustomDataSource, DataSourceStates } from '@cl-shared/table/data-source/custom-data-source';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';
import { Role } from '@cl-helpers/role.enum';

@Component({
  selector: 'cl-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent implements AfterViewInit {
  public dataSource: CustomDataSource<IAMUser>;
  public dataSourceStates: typeof DataSourceStates = DataSourceStates;
  public config: Role[];
  private groups: any[];

  constructor(
    private settingsService: SettingsService,
    private authService: AuthService,
    public cd: ChangeDetectorRef,
    private dialog: MatDialog,
    private messageService: MessageService
  ) {
    this.dataSource = new CustomDataSource<IAMUser>(this.settingsService);
  }

  public ngAfterViewInit(): void {
    this.settingsService.getRolesOptions()
      .subscribe(config => this.config = config);
    this.getAllGroups();
  }

  public openDialogInviteNewUsers(): void {
    this.dialog.open<InviteNewUsersPopupComponent, InviteNewUsersPopupComponentData, IAMUser>(InviteNewUsersPopupComponent, {
      panelClass: 'invite-new-users-dialog',
      data: {
        groups: this.groups
      }
    })
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newUser: IAMUser) => this.settingsService.inviteNewUser(newUser))
      )
      .subscribe(() => this.dataSource.updateData());
  }

  public openDialogEditUsers(user: IAMUser): void {
    this.dialog.open<InviteNewUsersPopupComponent, InviteNewUsersPopupComponentData, IAMUser>(
      InviteNewUsersPopupComponent,
      {
        panelClass: 'invite-new-users-dialog',
        data: {
          user,
          groups: this.groups
        }
      }
    )
      .afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((updatedUser: IAMUser) => this.settingsService.patchUser(user, updatedUser))
      )
      .subscribe(() => this.dataSource.updateData());
  }

  public deleteUser(id: string): void {
    this.settingsService.deleteUser(id)
      .subscribe(() => this.dataSource.updateData());
  }

  private getAllGroups(): void {
    this.settingsService.getAllGroups()
      .subscribe((res) => this.groups = res.getModels());
  }

  public resetPassword(user: IAMUser): void {
    const urnSegments: string[] = user.urn.split(':');
    const accountId: string = urnSegments[urnSegments.length - 2];
    this.authService.resetPassword(accountId, user.username).subscribe(
      () => this.messageService.show('User will receive an email with reset instructions', 'success'),
      () => this.messageService.show('Something went wrong', 'warning')
    );
  }
}
