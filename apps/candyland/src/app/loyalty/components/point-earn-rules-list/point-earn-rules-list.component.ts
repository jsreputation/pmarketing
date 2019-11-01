import { Component, Input, ViewChild, ViewEncapsulation } from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { CdkDragDrop, moveItemInArray } from '@angular/cdk/drag-drop';

@Component({
  selector: 'cl-point-earn-rules-list',
  templateUrl: './point-earn-rules-list.component.html',
  styleUrls: ['./point-earn-rules-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PointEarnRulesListComponent {
  @Input() public dataSource: MatTableDataSource<any>;
  @Input() public displayedColumns: string[] = ['priority', 'name', 'conditions', 'pointsEarned', 'actions'];
  @ViewChild('table', {static: false}) public table: MatTable<any>;

  public data: any = [
    {
      priority: 1,
      name: 'Main Rule Prepaid',
      conditions: ['Makes a PREPAID transaction'],
      pointsEarned: 'Apply 2x multiplier'
    },
    {
      priority: 2,
      name: 'Main Rule Accessories',
      conditions: [
        'Make a transaction for each RM100',
        'Make a transaction of product category IT Accessories'
      ],
      pointsEarned: '100 Bonus Points'
    },
    {
      priority: 3,
      name: 'Main Rule Peripherals',
      conditions: [
        'Make a transaction for each RM200',
        'Make a transaction of product category IT Accessories'
      ],
      pointsEarned: '100 Bonus Points'
    }
  ];

  constructor() {
    this.dataSource = new MatTableDataSource<any>();
    this.dataSource.data = this.data;
  }

  public dropTable(event: CdkDragDrop<any>): void {
    const prevIndex = this.data.findIndex((d) => d === event.item.data);
    moveItemInArray(this.data, prevIndex, event.currentIndex);
    this.table.renderRows();
  }
}
