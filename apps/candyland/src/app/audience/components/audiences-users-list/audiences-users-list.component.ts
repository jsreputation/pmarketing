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
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { Subject } from 'rxjs';
import { takeUntil, tap } from 'rxjs/operators';

@Component({
  selector: 'cl-audiences-users-list',
  templateUrl: './audiences-users-list.component.html',
  styleUrls: ['./audiences-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUsersListComponent implements AfterViewInit, OnDestroy {
  @Input() public dataSource: CustomDataSource;
  @Input() public displayedColumns: string[] = ['id', 'name', 'email', 'primary_identifier', 'state', 'phone', 'audienceList', 'actions'];
  @Input() public config: any;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public clickManageList: EventEmitter<number> = new EventEmitter();
  private destroy$ = new Subject();
  public ngAfterViewInit(): void {
    this.handleSorting();
  }

  // public joinList(list: string[]): string {
  //   return list.join(', ');
  // }

  public manageList(id: number): void {
    this.clickManageList.emit(id);
  }

  public deactivateItem(id: number): void {
    this.clickManageList.emit(id);
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
