import { AfterViewInit, Component, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements AfterViewInit {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public displayedColumns = ['name', 'role', 'invitedDate', 'actions'];
  @Input() public config: any;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public delete = new EventEmitter<number>();
  @Output() public edit = new EventEmitter<number>();

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public editItem(id: number): void {
    this.edit.emit(id);
  }

  public deleteItem(id: number): void {
    this.delete.emit(id);
  }

}
