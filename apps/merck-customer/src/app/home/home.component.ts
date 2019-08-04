import { Component, OnInit } from '@angular/core';
import { PageProperties, BAR_SELECTED_ITEM } from '../page-properties';

@Component({
  selector: 'mc-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, PageProperties {

  public ngOnInit(): void {
  }

  public showHeader(): boolean {
    return true;
  }

  public bottomSelectedItem(): BAR_SELECTED_ITEM {
    return BAR_SELECTED_ITEM.HOME;
  }
}
