import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  ViewChild,
  OnDestroy,
} from '@angular/core';
import { MatSort } from '@angular/material';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { AudiencesListDataSource } from '@cl-shared/table/data-source/audiences-list-data-source';

@Component({
  selector: 'cl-audiences-list',
  templateUrl: './audiences-list.component.html',
  styleUrls: ['./audiences-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesListComponent implements AfterViewInit, OnDestroy {
  public DATE_FORMAT: string = 'dd MMM yyyy';
  @Input() public dataSource: AudiencesListDataSource<IAudiences>;
  @Input() public displayedColumns: string[] = ['name', 'format', 'updated', 'numberUsers', 'status'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  private destroy$ = new Subject();
  public ngAfterViewInit(): void {
    this.handleSorting();
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
