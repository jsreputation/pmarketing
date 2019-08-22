import { AfterViewInit, ChangeDetectorRef, Component } from '@angular/core';
import { MatDialog } from '@angular/material';
import { SettingsService } from '@cl-core/services/settings.service';
import { InviteNewUsersPopupComponent } from './containers/invite-new-users-popup/invite-new-users-popup.component';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent  implements AfterViewInit {
  public dataSource: CustomDataSource;
  public hasData = true;
  public config: any;

  constructor(private settingsService: SettingsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
    this.dataSource = new CustomDataSource(this.settingsService);
    this.getAllCredential();
  }

  public ngAfterViewInit(): void {
    this.settingsService.getRolesOptions()
      .subscribe( config => this.config = config);
    // this.getData();
    // this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    // this.dataSource.paginator = this.paginator;
  }

  public openDialogInviteNewUsers(): void {
    const dialogRef = this.dialog.open(InviteNewUsersPopupComponent, {panelClass: 'invite-new-users-dialog'});

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  public openDialogEditUsers(id: number): void {
    const dialogRef = this.dialog.open(InviteNewUsersPopupComponent, {panelClass: 'invite-new-users-dialog', data: id});

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  // private getData(): void {
  //   this.settingsService.getRoles()
  //     .pipe(
  //       map((data: any[]) => (
  //           data.map(item => {
  //             item.invitedDate = new Date(item.invitedDate);
  //             item.name = item.firstName + ' ' + item.lastName;
  //             return item;
  //           })
  //         )
  //       )
  //     )
  //     .subscribe((res: any[]) => {
  //       // this.dataSource.data = res;
  //       // this.hasData = !!res && res.length > 0;
  //       // this.cd.detectChanges();
  //     });
  // }

  private getAllCredential(): void {
    this.settingsService.getAllCredential('test')
      .subscribe(res => {
        console.log(res);
      });
  }
}
