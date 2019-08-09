import { Component, OnInit } from '@angular/core';
import { BarSelectedItem } from 'src/app/page-properties';

@Component({
  selector: 'mc-condition',
  templateUrl: './condition.component.html',
  styleUrls: ['./condition.component.scss']
})
export class ConditionComponent implements OnInit {

  public ngOnInit(): void {
  }

  public showHeader(): boolean {
    return false;
  }

  public backButtonEnabled(): boolean {
    return true;
  }

  public bottomSelectedItem(): BarSelectedItem {
    return BarSelectedItem.ACCOUNT;
  }

}
