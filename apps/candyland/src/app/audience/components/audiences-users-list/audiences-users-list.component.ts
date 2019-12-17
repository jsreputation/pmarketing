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
  MatSort,
} from '@angular/material';

import {
  filter,
  switchMap,
} from 'rxjs/operators';

import { IWProfileAttributes } from '@perx/whistler';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

import {
  IUpsertUserPopup,
  Type,
} from '../../audience.model';
import { UpsertUserPopupComponent } from '../../containers/upsert-user-popup/upsert-user-popup.component';
import {MessageService} from '@cl-core-services';

@Component({
  selector: 'cl-audiences-users-list',
  templateUrl: './audiences-users-list.component.html',
  styleUrls: ['./audiences-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUsersListComponent implements AfterViewInit {
  @Input() public dataSource: CustomDataSource<IWProfileAttributes>;
  @Input() public displayedColumns: string[] = [
    'id',
    'name',
    'email',
    'primary_identifier',
    'phone',
    'audienceList',
    'actions',
  ];
  @Input() public config: any;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Output() public clickManageList: EventEmitter<number> = new EventEmitter();

  constructor(
    public dialog: MatDialog,
    private audiencesUserService: AudiencesUserService,
    private messageService: MessageService
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
        this.messageService.show('User successfully updated.');
      });
  }

  public transformMailTo(email: string): string {
    return email ? `mailto:${email}` : email;
  }

  public transformTelTo(tel: string): string {
    return tel ? `tel:${tel}` : tel;
  }
}
