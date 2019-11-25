import { AfterViewInit, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort } from '@angular/material';
import { CustomDataSource } from '@cl-shared/table/data-source/custom-data-source';
import { EngagementType } from '@cl-core/models/engagement/engagement-type.enum';
import { ICampaignTableData } from '@cl-core/models/campaign/campaign.interface';
import { StatusLabelConfig } from '@cl-shared';

@Component({
  selector: 'cl-campaigns-list',
  templateUrl: './campaigns-list.component.html',
  styleUrls: ['./campaigns-list.component.scss']
})
export class CampaignsListComponent implements AfterViewInit {
  public DATE_FORMAT: string = 'mediumDate';
  public TIME_FORMAT: string = 'shortTime';

  @Input() public statusLabel: { [key: string]: StatusLabelConfig };
  @Input() public dataSource: CustomDataSource<ICampaignTableData>;
  @Input() public displayedColumns: string[] = ['name', 'status', 'begin', 'end', 'audience', 'engagementType', 'actions'];
  @ViewChild(MatSort, {static: false}) private sort: MatSort;
  @Output() public editAction: EventEmitter<ICampaignTableData> = new EventEmitter<ICampaignTableData>();
  @Output() public duplicateAction: EventEmitter<ICampaignTableData> = new EventEmitter<ICampaignTableData>();
  @Output() public emitOpenReport: EventEmitter<string> = new EventEmitter<string>();
  @Output() public pauseCampaign: EventEmitter<ICampaignTableData> = new EventEmitter<ICampaignTableData>();
  @Output() public activateCampaign: EventEmitter<ICampaignTableData> = new EventEmitter<ICampaignTableData>();

  public ngAfterViewInit(): void {
    this.dataSource.registerSort(this.sort);
  }

  public editItem(item: ICampaignTableData): void {
    this.editAction.emit(item);
  }

  public duplicateItem(item: ICampaignTableData): void {
    this.duplicateAction.emit(item);
  }

  public pauseItem(item: ICampaignTableData): void {
    this.pauseCampaign.emit(item);
  }

  public activateItem(item: ICampaignTableData): void {
    this.activateCampaign.emit(item);
  }

  public openReport(item: ICampaignTableData): void {
    const lowerCaseType = this.lowerCaseType(item.engagementType);
    this.emitOpenReport.emit(`report/${lowerCaseType}/${item.id}`);
  }

  public canShowReportButton(item: ICampaignTableData): boolean {
    return this.compareTypeEngagements(item.engagementType);
  }

  private compareTypeEngagements(type: string): any {
    if (typeof type !== 'string') {
      return false;
    }
    const lowerCaseType = this.lowerCaseType(type);
    return lowerCaseType === EngagementType.survey || lowerCaseType === EngagementType.stamp;
  }

  private lowerCaseType(type: string): string {
    return type.toLocaleLowerCase();
  }

}
