import { AfterViewInit, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';

@Component({
  selector: 'cl-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'dd MMM yyyy';
  public TIME_FORMAT: string = 'hh:ssa';

  @Input() public dataSource: CustomDataSource<ICampaign>;
  @Input() public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public editAction: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();
  @Output() public duplicateAction: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();
  @Output() public deleteAction: EventEmitter<ICampaign> = new EventEmitter<ICampaign>();

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public editItem(item: ICampaign): void {
    this.editAction.emit(item);
  }

  public duplicateItem(item: ICampaign): void {
    this.duplicateAction.emit(item);
  }

  public deleteItem(item: ICampaign): void {
    this.deleteAction.emit(item);
  }

  public pauseItem(): void {
  }

}
