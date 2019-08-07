import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-redemption',
  templateUrl: './redemption.component.html',
  styleUrls: ['./redemption.component.scss']
})
export class RedemptionComponent implements OnInit {
  public voucherId: number;

  constructor(
    private route: ActivatedRoute,
  ) {
  }

  public ngOnInit(): void {
    this.voucherId = parseInt(this.route.snapshot.paramMap.get('id'), 10);
  }
}
