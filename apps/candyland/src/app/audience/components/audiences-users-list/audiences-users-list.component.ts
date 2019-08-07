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
  selector: 'cl-audiences-users-list',
  templateUrl: './audiences-users-list.component.html',
  styleUrls: ['./audiences-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUsersListComponent implements AfterViewInit {
  @Input() public dataSource: MatTableDataSource<Engagement>;
  @Input() public displayedColumns: string[] = ['id', 'name', 'state', 'phone', 'audienceList', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public clickManageList: EventEmitter<number> = new EventEmitter();

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public joinList(list: string[]): string {
    return list.join(', ');
  }

  public manageList(id: number): void {
    this.clickManageList.emit(id);
  }

  public deactivateItem(id: number): void {
    this.clickManageList.emit(id);
  }
}
