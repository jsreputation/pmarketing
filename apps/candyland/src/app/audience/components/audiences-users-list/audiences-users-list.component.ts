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
import { AudiencesUsersListDataSource } from '@cl-shared/table/data-source/audiences-users-list-data-source';

@Component({
  selector: 'cl-audiences-users-list',
  templateUrl: './audiences-users-list.component.html',
  styleUrls: ['./audiences-users-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesUsersListComponent implements AfterViewInit, OnDestroy {
  @Input() public dataSource: AudiencesUsersListDataSource<IUser>;
  @Input() public displayedColumns: string[] = ['id', 'name', 'email', 'primary_identifier', 'phone', 'audienceList', 'actions']; // 'state'
  @Input() public config: any;
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public clickManageList: EventEmitter<number> = new EventEmitter();

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public manageList(id: number): void {
    this.clickManageList.emit(id);
  }

  public deactivateItem(id: number): void {
    console.log('Deactivate user with id: ', id);
  }

  public ngOnDestroy(): void {
  }
}
