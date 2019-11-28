import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
} from '@angular/core';
import {
  MatDialog,
  MatSnackBar,
  MatSort,
} from '@angular/material';

import {
  filter,
  switchMap,
} from 'rxjs/operators';

import { IWUser } from '@perx/whistler';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

import {
  IUpsertUserPopup,
  Type,
} from '../../audience.model';
import { UpsertUserPopupComponent } from '../../containers/upsert-user-popup/upsert-user-popup.component';


@Component({
  selector: 'cl-audiences-users-list',
  templateUrl: './audiences-users-list.component.html',
  styleUrls: ['./audiences-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUsersListComponent implements AfterViewInit {
  @Input() public dataSource: CustomDataSource<IWUser>;
  @Input() public displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'primary_identifier',
    'phone',
    'audienceList',
    'edit',
    'actions',
  ];
  @Input() public config: any;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Output() public clickManageList: EventEmitter<number> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    public snack: MatSnackBar,
    private audiencesUserService: AudiencesUserService,
  ) { }

  public ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.registerSort(this.sort);
    }
  }

  public manageList(id: number): void {
    this.clickManageList.emit(id);
  }

  public deactivateItem(id: number): void {
    console.log('Deactivate user with id: ', id);
  }

  public openEditUserDialog(user: any): void {
    console.log('user', user);
    const dialogData: IUpsertUserPopup = {
      panelClass: 'audience-dialog',
      data: {
        type: Type.Edit,
        formData: user,
      }
    };
    const dialogRef = this.dialog.open(UpsertUserPopupComponent, dialogData);

    dialogRef.afterClosed()
      .pipe(
        filter(Boolean),
        switchMap((newUser: IAudiencesUserForm) => this.audiencesUserService.updateUser(user.id, newUser))
      )
      .subscribe(() => {
        this.dataSource.updateData();
        this.snack.open('User successfully updated.', 'x', {duration: 2000});
      });
  }
}
