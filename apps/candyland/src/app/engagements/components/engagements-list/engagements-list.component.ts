import { AfterViewInit, Component, Input, ViewChild, Output, EventEmitter } from '@angular/core';
import { MatSort, MatTableDataSource } from '@angular/material';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';

@Component({
  selector: 'cl-engagements-list',
  templateUrl: './engagements-list.component.html',
  styleUrls: ['./engagements-list.component.scss']
})
export class EngagementsListComponent implements AfterViewInit {
  @Input() public dataSource: MatTableDataSource<IEngagementType>;
  @Input() public displayedColumns: string[] = ['name', 'status', 'attributes_type', 'actions'];
  @ViewChild(MatSort, { static: false }) private sort: MatSort;
  @Output() public itemAction: EventEmitter<number> = new EventEmitter();

  public ngAfterViewInit(): void {
    this.dataSource.sort = this.sort;
  }

  public editItem(id: number): void {
    this.itemAction.emit(id);
  }

  public duplicateItem(id: number): void {
    this.itemAction.emit(id);
  }

  public deleteItem(id: number): void {
    this.itemAction.emit(id);
  }

  public useAsCaptionItem(id: number): void {
    this.itemAction.emit(id);
  }

}
