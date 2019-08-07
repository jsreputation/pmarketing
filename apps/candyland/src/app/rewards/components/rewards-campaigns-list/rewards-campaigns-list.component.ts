import {AfterViewInit, Component, EventEmitter, Input, Output, ViewChild} from '@angular/core';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'cl-rewards-campaigns-list',
  templateUrl: './rewards-campaigns-list.component.html',
  styleUrls: ['./rewards-campaigns-list.component.scss']
})
export class RewardsCampaignsListComponent implements AfterViewInit {
  public DATE_FORMAT = 'dd MMM yyyy';
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public displayedColumns = ['name', 'status', 'engagementType', 'duration', 'issued'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public itemAction = new EventEmitter();

  public ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }
}
