import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { EngagementType } from './shared/models/EngagementType';

import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { EngagementsService } from '@cl-core/services/engagements.service';

export enum gamesRouterLink {
  shakeTheTree = 'engagements/games/new-shake',
  hitThePinata = 'engagements/games/new-pinata'
}

@Component({
  selector: 'cl-create-engagement-popup',
  templateUrl: './create-engagement-popup.component.html',
  styleUrls: ['./create-engagement-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEngagementPopupComponent implements OnInit {
  public selectedType: IGraphic;
  public engagementType = EngagementType;
  public engagementType$: Observable<IGraphic[]>;
  public gamesType$: Observable<IGraphic[]>;
  public selectedGame: IGraphic;
  constructor(
    public dialogRef: MatDialogRef<CreateEngagementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private engagementsService: EngagementsService,
    private router: Router) {}

  public close(): void {
    this.dialogRef.close();
  }

  public next(): void {
    if (!this.selectedType) {
      return;
    }

    switch (this.selectedType.type) {
      case EngagementType.stamp:
        this.router.navigateByUrl('/engagements/new-stamp/settings');
        break;
      case EngagementType.instantReward:
        this.router.navigateByUrl('/engagements/new-instant-reward/appearance');
        break;
      case EngagementType.games:
        this.router.navigateByUrl(gamesRouterLink[this.selectedGame.type]);
        break;
      case EngagementType.survey:
        this.router.navigateByUrl('/engagements/new-survey/appearance');
    }
    this.close();
  }

  public setType(type: IGraphic): void {
    this.selectedType = type;
  }

  public setGame(game: IGraphic): void {
    this.selectedGame = game;
  }

  public ngOnInit() {
    this.getEngagementType();
    this.getGamesType();
  }

  private getEngagementType(): void {
    this.engagementType$ = this.engagementsService.getEngagementType()
      .pipe(
        tap((data) => {
          this.selectedType = data[0];
        })
      );
  }
  private getGamesType(): void {
    this.gamesType$ = this.engagementsService.getGamesType()
      .pipe(
        tap((data) => {
          this.selectedGame = data[0];
        })
      );
  }
}
