import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'perx-core-stamps-cards-list',
  templateUrl: './stamps-cards-list.component.html',
  styleUrls: ['./stamps-cards-list.component.scss']
})
export class StampsCardsListComponent {
  @Input() public stampsArr: any[]; // mock it upstairs
  @Output() public route: EventEmitter<number | string> = new EventEmitter<number | string>();

  public onClick(engagementId: number): void {
    // tslint:disable-next-line: deprecation
    this.route.emit(engagementId);
  }

}
