import { Component, Output, EventEmitter, Input, OnChanges, SimpleChanges, OnDestroy, OnInit } from '@angular/core';
import { StampService } from '../../stamp/stamp.service';
import { IStampCard, StampCardState, StampState } from '../../stamp/models/stamp.model';
import { Subject, Observable } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
  selector: 'perx-core-puzzle-list',
  templateUrl: './puzzle-list.component.html',
  styleUrls: ['./puzzle-list.component.scss']
})
export class PuzzleListComponent implements OnInit, OnChanges, OnDestroy {
  @Input('cards')
  public puzzles: Observable<IStampCard[]> | null = null;
  private cards: IStampCard[] | null = null;

  @Input()
  public repeatGhostCount: number = 10;

  @Input()
  public campaignId: number | null = null;

  @Input()
  public iconDisplay: string;

  @Input()
  public titleFn: (index?: number, totalCount?: number) => string;

  @Input()
  public puzzleTextFn: (puzzle?: IStampCard) => string;

  @Input()
  public thumbnailDefault: string = '';
  public total: number | null = null;

  @Output()
  public selected: EventEmitter<IStampCard> = new EventEmitter<IStampCard>();

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();

  private destroy$: Subject<void> = new Subject();

  constructor(private stampService: StampService) {
  }

  public ngOnInit(): void {
    if (!this.titleFn) {
      this.titleFn = (index: number) => `Puzzle #${this.indexToLetter(index)}`;
    }

    if (!this.puzzleTextFn) {
      this.puzzleTextFn = () => 'new pieces';
    }

    if (this.puzzles) {
      this.puzzles
        .pipe(takeUntil(this.destroy$))
        .subscribe((res: IStampCard[]) => {
          this.initTotal(res);
          // assume all is completed
          let completed = true;
          // loop over all puzzles
          for (const puzzle of res) {
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

  public ngOnChanges(changes: SimpleChanges): void {
    if (changes.campaignId) {
      this.puzzles = null;
      this.cards = null;
      if (this.campaignId !== null) {
        this.puzzles = this.stampService.getCards(this.campaignId);
        this.puzzles
          .pipe(takeUntil(this.destroy$))
          .subscribe((res: IStampCard[]) => {
            this.cards = res;
            this.initTotal(res);
            // assume all is completed
            let completed = true;
            // loop over all puzzles
            for (const puzzle of res) {
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
    if (changes.puzzles && this.puzzles) {
      this.puzzles.subscribe(res => this.cards = res);
    }
  }

  public puzzleSelected(puzzle: IStampCard): void {
    this.selected.emit(puzzle);
  }

  // in the UX only mark the 1st active puzzle as active
  public isActive(puzzle: IStampCard): boolean {
    // if there is no puzzle in list, it should never happen but return false
    if (!Array.isArray(this.cards)) {
      return false;
    }

    // if we have no information on stamps then it should not be active
    if (!puzzle.stamps && ['puzzle', 'stamp_card'].includes(puzzle.displayProperties.displayCampaignAs)) {
      return false;
    }

    const totalSlots = puzzle.displayProperties.totalSlots || 0;

    // if there is no more available stamp return false
    if (puzzle.displayProperties.displayCampaignAs === 'puzzle') {
      if (puzzle.stamps && puzzle.stamps.filter(st => st.state === StampState.redeemed).length >= totalSlots) {
        return false;
      }

      // get list of active puzzles
      const activePuzzles = this.cards.filter(p => p.state === StampCardState.active &&
        p.stamps &&
        p.stamps.filter(st => st.state === StampState.redeemed).length < totalSlots);

      // if there is no active puzzle, this one should not be active
      if (activePuzzles.length === 0) {
        return false;
      }

      // if it is the first active puzzle then make it visible
      if (puzzle.id === activePuzzles[0].id) {
        return true;
      }
    } else if (puzzle.displayProperties.displayCampaignAs === 'stamp_card') {
      if (puzzle.stamps && puzzle.stamps.filter(st => st.state === StampState.redeemed).length >= totalSlots) {
        return false;
      }

      // get list of active puzzles
      const activePuzzles = this.cards.filter(p => p.state === StampCardState.active &&
        p.stamps &&
        p.stamps.filter(st => st.state === StampState.redeemed).length < totalSlots);

      // if there is no active puzzle, this one should not be active
      if (activePuzzles.length === 0) {
        return false;
      }

      // if it is the first active puzzle then make it visible
      if (puzzle.id === activePuzzles[0].id) {
        return true;
      }
    }
    return false;
  }

  public indexToLetter(index: number): string {
    const base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    if (index < 0) {
      return '';
    }
    return base[index % base.length];
  }

  public nbAvailableStamps(puzzle: IStampCard): string {
    if (puzzle.stamps === undefined) {
      return '0';
    }
    return puzzle.stamps.filter(st => st.state === StampState.issued).length.toString();
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

  private initTotal(cards: IStampCard[]): void {
    if (cards !== null && cards.length > 0) {
      this.total = cards[0].displayProperties.totalSlots || null;
    } else {
      this.total = null;
    }
  }
}
