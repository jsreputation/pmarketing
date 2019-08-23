import { AfterViewInit, Component, EventEmitter, Input, OnDestroy, Output, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material';
import { takeUntil, tap } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-users-roles-list',
  templateUrl: './users-roles-list.component.html',
  styleUrls: ['./users-roles-list.component.scss']
})
export class UsersRolesListComponent implements AfterViewInit, OnDestroy {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: CustomDataSource;
  @Input() public displayedColumns = ['name', 'role', 'invitedDate', 'actions'];
  @Input() public config: any;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public delete = new EventEmitter<number>();
  @Output() public edit = new EventEmitter<number>();
  private destroy$ = new Subject();
  public ngAfterViewInit(): void {
    this.handleSorting();
  }

  public editItem(id: number): void {
    this.edit.emit(id);
  }

  public deleteItem(id: number): void {
    this.delete.emit(id);
  }

  public handleSorting(): void {
    if (this.sort) {
      this.sort.sortChange
        .pipe(takeUntil(this.destroy$),
          tap((val) => {
          this.dataSource.sort = val;
        }))
        .subscribe();
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
