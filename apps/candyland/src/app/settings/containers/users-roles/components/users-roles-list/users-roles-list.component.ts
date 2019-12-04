import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { IAMUser } from '@cl-core/models/settings/IAMUser.interface';

@Component({
  selector: 'cl-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'mediumDate';
  @Input() public dataSource: CustomDataSource<IAMUser>;
  @Input() public displayedColumns: string[] = ['username', 'role', 'created_at', 'actions'];
  @Input() public config: any;
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Output() public delete: EventEmitter<string> = new EventEmitter<string>();
  @Output() public edit: EventEmitter<IAMUser> = new EventEmitter<IAMUser>();
  @Output() public resetPassword: EventEmitter<IAMUser> = new EventEmitter<IAMUser>();

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public editItem(item: IAMUser): void {
    this.edit.emit(item);
  }

  public deleteItem(id: string): void {
    this.delete.emit(id);
  }

  public resetItemPassword(user: IAMUser): void {
    this.resetPassword.emit(user);
  }
}
