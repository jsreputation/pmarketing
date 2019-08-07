import { Component, Input, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

@Component({
  selector: 'cl-engagements-grid',
  templateUrl: './engagements-grid.component.html',
  styleUrls: ['./engagements-grid.component.scss']
})
export class EngagementsGridComponent implements OnInit {
  @Input() public dataSource: MatTableDataSource<Engagement>;

}
