import { AfterViewInit, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { ICampaignTableData } from '@perx/whistler';

@Component({
  selector: 'cl-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'mediumDate';
  public TIME_FORMAT: string = 'shortTime';

  @Input() public dataSource: CustomDataSource<ICampaignTableData>;
  @Input() public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public editAction: EventEmitter<ICampaignTableData> = new EventEmitter<ICampaignTableData>();
  @Output() public duplicateAction: EventEmitter<ICampaignTableData> = new EventEmitter<ICampaignTableData>();

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public editItem(item: ICampaignTableData): void {
    this.editAction.emit(item);
  }

  public duplicateItem(item: ICampaignTableData): void {
    this.duplicateAction.emit(item);
  }

  public pauseItem(): void {
  }

}
