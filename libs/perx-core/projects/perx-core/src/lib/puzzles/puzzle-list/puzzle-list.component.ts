import { Component, OnInit, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { IStampCard, CampaignService, STAMP_CARD_STATUS } from '../../campaign/campaign.service';

@Component({
  selector: 'perx-core-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.css']
})
export class PuzzleListComponent implements OnChanges {
  puzzles: IStampCard[];

  @Input()
  campaignId: number = null;
  @Input()
  iconDisplay = 'arrow_forward_ios';

  total = 6;

  @Output()
  selected: EventEmitter<IStampCard> = new EventEmitter<IStampCard>();

  constructor(private campaignService: CampaignService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.campaignId) {
      this.puzzles = null;
      if (this.campaignId !== null) {
        this.campaignService.getCards(this.campaignId)
          .subscribe((res: IStampCard[]) => { this.puzzles = res; });
      }
    }
  }

  puzzleSelected(puzzle: IStampCard) {
    this.selected.emit(puzzle);
  }

  // in the UX only mark the 1st active puzzle as active
  isActive(puzzle: IStampCard): boolean {
    // if there is no puzzle in list, it should never happen but return false
    if (!Array.isArray(this.puzzles)) {
      return false;
    }
    // get list of active puzzles
    const activePuzzles = this.puzzles.filter(p => p.state === STAMP_CARD_STATUS.active);
    // if there is no active puzzle, this one should not be active
    if (activePuzzles.length === 0) {
      return false;
    }

    // if it is the first active puzzle then make it visible
    if (puzzle.id === activePuzzles[0].id) {
      return true;
    }
  }

  indexToLetter(index: number): string {
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (index < 0) {
      return '';
    }
    return base[index % base.length];
  }
}
