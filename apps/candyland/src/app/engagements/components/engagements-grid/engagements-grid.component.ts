import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-engagements-grid',
  templateUrl: './engagements-grid.component.html',
  styleUrls: ['./engagements-grid.component.scss']
})
export class EngagementsGridComponent  {
  @Input() public dataSource: MatTableDataSource<IEngagement>;

}
