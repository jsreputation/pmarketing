import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  ViewChild,
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-audiences-list',
  templateUrl: './audiences-list.component.html',
  styleUrls: ['./audiences-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesListComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public displayedColumns: string[] = ['name', 'format', 'updated', 'numberUsers', 'status'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }
}
