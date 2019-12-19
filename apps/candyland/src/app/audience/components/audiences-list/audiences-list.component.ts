import {
  Component,
  ChangeDetectionStrategy,
  AfterViewInit,
  Input,
  ViewChild,
  OnDestroy
} from '@angular/core';
import { MatSort } from '@angular/material';

import { IWAudiences } from '@perx/whistler';

import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-audiences-list',
  templateUrl: './audiences-list.component.html',
  styleUrls: ['./audiences-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AudiencesListComponent implements AfterViewInit, OnDestroy {
  public DATE_FORMAT: string = 'mediumDate';
  @Input() public dataSource: CustomDataSource<IWAudiences>;
  @Input() public displayedColumns: string[] = ['name', 'updated', 'numberUsers']; // 'format' 'status'
  @ViewChild(MatSort, { static: false }) private sort: MatSort;

  public ngAfterViewInit(): void {
    if (this.dataSource) {
      this.dataSource.registerSort(this.sort);
    }
  }

  public ngOnDestroy(): void {
  }
}
