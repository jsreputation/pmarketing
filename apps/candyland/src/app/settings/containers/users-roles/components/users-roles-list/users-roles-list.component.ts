import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { SettingsUsersRolesDataSource } from '@cl-shared/table/data-source/settings-users-roles-data-source';

@Component({
  selector: 'cl-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements AfterViewInit, OnDestroy {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: SettingsUsersRolesDataSource<IAMUser>;
  @Input() public displayedColumns = ['username', 'role', 'created_at', 'actions'];
  @Input() public config: any;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public delete = new EventEmitter<string>();
  @Output() public edit = new EventEmitter<IAMUser>();
  private destroy$ = new Subject();

  public ngAfterViewInit(): void {
    this.handleSorting();
  }

  public editItem(item: IAMUser): void {
    this.edit.emit(item);
  }

  public deleteItem(id: string): void {
    this.delete.emit(id);
  }

  public handleSorting(): void {
    if (this.sort) {
      this.sort.sortChange.pipe(takeUntil(this.destroy$))
        .subscribe((val) => this.dataSource.sort = val);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
