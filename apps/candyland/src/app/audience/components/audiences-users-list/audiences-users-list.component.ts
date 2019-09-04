import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  OnDestroy
} from '@angular/core';
import { MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AudiencesUsersListDataSource } from '@cl-shared/table/data-source/audiences-users-list-data-source';

@Component({
  selector: 'cl-audiences-users-list',
  templateUrl: './audiences-users-list.component.html',
  styleUrls: ['./audiences-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUsersListComponent implements AfterViewInit, OnDestroy {
  @Input() public dataSource: AudiencesUsersListDataSource<IUser>;
  @Input() public displayedColumns: string[] = ['id', 'name', 'email', 'primary_identifier', 'state', 'phone', 'audienceList', 'actions'];
  @Input() public config: any;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public clickManageList: EventEmitter<number> = new EventEmitter();
  private destroy$ = new Subject();
  public ngAfterViewInit(): void {
    this.handleSorting();
  }

  public manageList(id: number): void {
    this.clickManageList.emit(id);
  }

  public deactivateItem(id: number): void {
    this.clickManageList.emit(id);
  }

  public handleSorting(): void {
    if (this.sort) {
      this.sort.sortChange
        .pipe(takeUntil(this.destroy$))
        .subscribe(val => this.dataSource.sort = val);
    }
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
