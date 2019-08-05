import { AfterViewInit, ChangeDetectorRef, Component, ViewChild } from '@angular/core';
import { MatDialog, MatPaginator, MatTableDataSource } from '@angular/material';
import { PrepareTableFilers } from '@cl-helpers/prepare-table-filers';
import { map } from 'rxjs/operators';
import { SettingsService } from '@cl-core/services/settings.service';
import { InviteNewUsersPopupComponent } from './containers/invite-new-users-popup/invite-new-users-popup.component';

@Component({
  selector: 'cl-users-roles',
  templateUrl: './users-roles.component.html',
  styleUrls: ['./users-roles.component.scss']
})
export class UsersRolesComponent  implements AfterViewInit {
  public dataSource = new MatTableDataSource<Engagement>();
  public hasData = true;
  public config: any;

  @ViewChild(MatPaginator, {static: false}) private paginator: MatPaginator;

  constructor(private settingsService: SettingsService,
              public cd: ChangeDetectorRef,
              public dialog: MatDialog) {
  }

  ngAfterViewInit() {
    this.settingsService.getRolesOptions()
      .subscribe( config => this.config = config);
    this.getData();
    this.dataSource.filterPredicate = PrepareTableFilers.getClientSideFilterFunction();
    this.dataSource.paginator = this.paginator;
  }

  public openDialogInviteNewUsers(): void {
    const dialogRef = this.dialog.open(InviteNewUsersPopupComponent, {panelClass: 'invite-new-users-dialog'});

    dialogRef.afterClosed().subscribe(() => {
    });
  }

  private getData() {
    this.settingsService.getRoles()
      .pipe(
        map((data: any[]) => (
            data.map(item => {
              item.invitedDate = new Date(item.invitedDate);
              item.name = item.firstName + ' ' + item.lastName;
              return item;
            })
          )
        )
      )
      .subscribe((res: any[]) => {
        this.dataSource.data = res;
        this.hasData = !!res && res.length > 0;
        this.cd.detectChanges();
      });
  }
}
