import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  ViewChild,
  Output,
  EventEmitter
} from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-audiences-list',
  templateUrl: './audiences-list.component.html',
  styleUrls: ['./audiences-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesListComponent implements AfterViewInit {
  DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public displayedColumns = ['name', 'format', 'updated', 'numberUsers', 'status', ];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter();

  constructor() {
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  public editItem(id: number) {
    this.itemAction.emit(id);
  }

  public duplicateItem(id: number) {
    this.itemAction.emit(id);
  }

  public deleteItem(id: number) {
    this.itemAction.emit(id);
  }

  public useAsCaptionItem(id: number) {
    this.itemAction.emit(id);
  }

}
