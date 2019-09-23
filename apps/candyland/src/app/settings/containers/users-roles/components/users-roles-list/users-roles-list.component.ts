import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements AfterViewInit {
  public DATE_FORMAT = 'MMM dd, yyyy';
  @Input() public dataSource: CustomDataSource<IAMUser>;
  @Input() public displayedColumns = ['username', 'role', 'created_at', 'actions'];
  @Input() public config: any;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public delete = new EventEmitter<string>();
  @Output() public edit = new EventEmitter<IAMUser>();

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public editItem(item: IAMUser): void {
    this.edit.emit(item);
  }

  public deleteItem(id: string): void {
    this.delete.emit(id);
  }

}
