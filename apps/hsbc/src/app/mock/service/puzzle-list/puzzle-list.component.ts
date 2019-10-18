import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy } from '@angular/core';
import { StampService } from '@perx/core';
import { IStampCard , StampCardState, StampState, PuzzleCollectStampState } from '@perx/core';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'mock-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss']
})
export class PuzzleListComponent implements OnChanges, OnDestroy {
  public puzzles: IStampCard[];

  @Input()
  public campaignId: number = null;
  @Input()
  public iconDisplay: string;

  public total: number = 6;

  @Output()
  public selected: EventEmitter<IStampCard> = new EventEmitter<IStampCard>();

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();
  private destroy$: Subject<any> = new Subject();

  constructor(private stampService: StampService) { }

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.campaignId) {
      this.puzzles = null;
      if (this.campaignId !== null) {
        this.stampService.getCards(this.campaignId)
          .pipe(takeUntil(this.destroy$))
          .subscribe((res: IStampCard[]) => {
            this.puzzles = res;
            // assume all is completed
            let completed = true;
            // loop over all puzzles
            for (const puzzle of this.puzzles) {
              if (puzzle.stamps === undefined || puzzle.stamps.length === 0) {
                // if there is no stamps objet at all then, it is not completed
                completed = false;
              } else if (puzzle.stamps.some(stamp => stamp.state === StampState.issued)) {
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

  public puzzleSelected(puzzle: IStampCard): void {
    this.selected.emit(puzzle);
  }

  // in the UX only mark the 1st active puzzle as active
  public isActive(puzzle: IStampCard): boolean {
    // if there is no puzzle in list, it should never happen but return false
    if (!Array.isArray(this.puzzles)) {
      console.log('no card', puzzle.id);
      return false;
    }
    // if we have no information on stamps then it should not be active
    if (!puzzle.stamps && puzzle.displayProperties.displayCampaignAs === 'puzzle') {
      console.log('no puzzle', puzzle.id);
      return false;
    }

    if (!puzzle.collectionStamps && puzzle.displayProperties.displayCampaignAs === 'stamp_card') {
      console.log('no stamp_card', puzzle.id);
      return false;
    }

    const totalSlots = puzzle.displayProperties.totalSlots;

    // if there is no more available stamp return false
    if (puzzle.displayProperties.displayCampaignAs === 'puzzle') {

      if (puzzle.stamps.filter(st => st.state === StampState.redeemed).length >= totalSlots) {
        console.log('no available puzzle', puzzle.id);
        return false;
      }

      // get list of active puzzles
      const activePuzzles = this.puzzles.filter(p => p.state === StampCardState.active &&
        p.stamps &&
        p.stamps.filter(st => st.state === StampState.redeemed).length < totalSlots);

      // if there is no active puzzle, this one should not be active
      if (activePuzzles.length === 0) {
        console.log('no active puzzle', puzzle.id);
        return false;
      }

      // if it is the first active puzzle then make it visible
      if (puzzle.id === activePuzzles[0].id) {
        console.log('first active puzzle', puzzle.id);
        return true;
      }
    }

    if (puzzle.displayProperties.displayCampaignAs === 'stamp_card') {

      if (puzzle.collectionStamps.filter(st => st.state === PuzzleCollectStampState.redeemed).length >= totalSlots) {
        console.log('no available stamps', puzzle.id);
        return false;
      }

      // get list of active puzzles
      const activePuzzles = this.puzzles.filter(p => p.state === StampCardState.active &&
        p.collectionStamps &&
        p.collectionStamps.filter(st => st.state === PuzzleCollectStampState.redeemed).length < totalSlots);

      // if there is no active puzzle, this one should not be active
      if (activePuzzles.length === 0) {
        console.log('no active puzzle', puzzle.id);
        return false;
      }

      // if it is the first active puzzle then make it visible
      if (puzzle.id === activePuzzles[0].id) {
        console.log('first active puzzle', puzzle.id);
        return true;
      }
    }
  }

  public indexToLetter(index: number): string {
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (index < 0) {
      return '';
    }
    return base[index % base.length];
  }

  public nbAvailableStamps(puzzle: IStampCard): number {
    if (puzzle.displayProperties.displayCampaignAs === 'puzzle') {
      if (puzzle.stamps === undefined) {
        return 0;
      }
      return puzzle.stamps.filter(st => st.state === StampState.issued).length;
    }

    if (puzzle.displayProperties.displayCampaignAs === 'stamp_card') {
      if (puzzle.collectionStamps === undefined) {
        return 0;
      }
      return puzzle.collectionStamps.filter(st => st.state === PuzzleCollectStampState.issued).length;
    }

  }

  public nbPlacedStamps(puzzle: IStampCard): number {
    if (puzzle.stamps === undefined) {
      return 0;
    }
    return puzzle.stamps.filter(st => st.state === StampState.redeemed).length;
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
