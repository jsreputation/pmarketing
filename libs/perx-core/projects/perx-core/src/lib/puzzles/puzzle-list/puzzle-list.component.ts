import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges } from '@angular/core';
import { StampService } from '../../stamp/stamp.service';
import { IStampCard , STAMP_CARD_STATE, STAMP_STATE } from '../../stamp/models/stamp.model';

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

  @Output()
  completed: EventEmitter<void> = new EventEmitter<void>();

  constructor(private stampService: StampService) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.campaignId) {
      this.puzzles = null;
      if (this.campaignId !== null) {
        this.stampService.getCards(this.campaignId)
          .subscribe((res: IStampCard[]) => {
            this.puzzles = res;
            // assume all is completed
            let completed = true;
            // loop over all puzzles
            for (const puzzle of this.puzzles) {
              if (puzzle.stamps === undefined || puzzle.stamps.length === 0) {
                // if there is no stamps objet at all then, it is not completed
                completed = false;
              } else if (puzzle.stamps.some(stamp => stamp.state === STAMP_STATE.issued)) {
                // if any transction is issued, then it is not all completed
                completed = false;
              }

              // if one is not completed, we do not need to loop any further
              if (!completed) {
                break;
              }
            }
            // if completed emit an event.
            if (completed) {
              this.completed.emit();
            }
          });
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
    // if we have no information on stamps then it should not be active
    if (!puzzle.stamps) {
      return false;
    }

    const totalSlots = puzzle.display_properties.total_slots;

    // if there is no more available stamp return false
    if (puzzle.stamps.filter(st => st.state === STAMP_STATE.redeemed).length >= totalSlots) {
      return false;
    }

    // get list of active puzzles
    const activePuzzles = this.puzzles.filter(p => {
      return p.state === STAMP_CARD_STATE.active &&
        p.stamps &&
        p.stamps.filter(st => st.state === STAMP_STATE.redeemed).length < totalSlots;
    });

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

  nbAvailableStamps(puzzle: IStampCard): number {
    if (puzzle.stamps === undefined) {
      return 0;
    }
    return puzzle.stamps.filter(st => st.state === STAMP_STATE.issued).length;
  }

  nbPlacedStamps(puzzle: IStampCard): number {
    if (puzzle.stamps === undefined) {
      return 0;
    }
    return puzzle.stamps.filter(st => st.state === STAMP_STATE.redeemed).length;
  }
}
