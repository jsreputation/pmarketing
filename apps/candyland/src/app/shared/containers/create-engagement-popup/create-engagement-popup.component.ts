import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';
import { EngagementsService } from '@cl-core/services';
import { getEngagementRouterLink } from '@cl-helpers/get-engagement-router-link';
import { IGraphic } from '@cl-core/models/graphic.interface';

@Component({
  selector: 'cl-create-engagement-popup',
  templateUrl: './create-engagement-popup.component.html',
  styleUrls: ['./create-engagement-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEngagementPopupComponent implements OnInit {
  public selectedType: IGraphic;
  // public engagementType = EngagementType;
  public engagementType$: Observable<IGraphic[]>;
  public gamesType$: Observable<IGraphic[]>;
  public selectedGame: IGraphic;

  constructor(
    public dialogRef: MatDialogRef<CreateEngagementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private engagementsService: EngagementsService,
    private router: Router
  ) { }

  public close(): void {
    this.dialogRef.close();
  }

  public next(): void {
    if (!this.selectedType) {
      return;
    }
    const path = getEngagementRouterLink(this.selectedType.type, this.selectedGame ? this.selectedGame.type : null);
    this.router.navigateByUrl(path);
    this.close();
  }

  public setType(type: IGraphic): void {
    this.selectedType = type;
  }

  public setGame(game: IGraphic): void {
    this.selectedGame = game;
  }

  public ngOnInit(): void {
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
