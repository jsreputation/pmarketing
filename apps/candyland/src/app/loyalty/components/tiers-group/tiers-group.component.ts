import { AfterViewInit, Component, EventEmitter, Input, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'cl-tiers-group',
  templateUrl: './tiers-group.component.html',
  styleUrls: ['./tiers-group.component.scss']
})
export class TiersGroupComponent implements AfterViewInit {

  public dataSource: MatTableDataSource<any>;
  @Input() public data: any = [{
    name: 'Silver',
    qualification: {
      pointsThreshold: true,
      points: 500
    },
    earnBonus: 20,
    burnRule: 10,
    pointsExpiry: {
      amount: 3,
      period: 'days',
      type: 'earned',
    }
  },
    {
      name: 'Gold',
      qualification: {
        inviteOnly: true,
      },
      earnBonus: 20,
      burnRule: 10,
      pointsExpiry: {
        amount: 6,
        period: 'months',
        type: 'earned',
      }
    }];
  @Input() public displayedColumns: string[] = ['name', 'qualification', 'earnBonus', 'burnRule', 'pointsExpiry'];
  @Output() public itemAction: EventEmitter<number> = new EventEmitter();

  constructor() {
    this.dataSource = new MatTableDataSource();
  }

  public ngAfterViewInit(): void {
    this.dataSource.data = this.data;
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

  public createTier(): void {
    console.log('create');
  }
}
