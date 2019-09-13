import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatSort } from '@angular/material';
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
  @Input() public displayedColumns: string[] = ['name', 'updated', 'numberUsers']; // 'format' 'status'
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public ngOnDestroy(): void {
  }
}
