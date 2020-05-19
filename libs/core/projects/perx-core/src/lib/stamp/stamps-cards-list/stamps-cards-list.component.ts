import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IStampCard } from '../models/stamp.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-stamps-cards-list',
  templateUrl: './stamps-cards-list.component.html',
  styleUrls: ['./stamps-cards-list.component.scss']
})
export class StampsCardsListComponent {
  @Input('data') public stampCardsArr: Observable<IStampCard[]>; // mock it upstairs
  @Output() public tapped: EventEmitter<IStampCard> = new EventEmitter<IStampCard>();

  public onClick(stampCard: IStampCard): void {
    // tslint:disable-next-line: deprecation
    this.tapped.emit(stampCard);
  }
}
