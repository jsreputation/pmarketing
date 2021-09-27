import { Component, OnInit, Input } from '@angular/core';
import { IExpiringPoints } from '@perxtech/core';

@Component({
  selector: 'app-stars',
  templateUrl: './stars.component.html',
  styleUrls: ['./stars.component.scss']
})
export class StarsComponent implements OnInit {
  @Input()
  public pointsBalance: number;
  @Input()
  public membershipTierName: string;
  @Input()
  public expiringPoints: IExpiringPoints;
  @Input()
  public nextTierPointsDiff: number;

  constructor() { }

  ngOnInit(): void {
  }

}
