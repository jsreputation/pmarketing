import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IEngagementType } from './engagement-type/models/engagement-type.model';
import { EngagementType } from './shared/models/EngagementType';
import { IGame } from './games/shared/models/game-model';

@Component({
  selector: 'cl-create-engagement-popup',
  templateUrl: './create-engagement-popup.component.html',
  styleUrls: ['./create-engagement-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEngagementPopupComponent implements OnInit {
  public selectedType: IEngagementType;
  public engagementType = EngagementType;
  public selectedGame: IGame;
  constructor(
    public dialogRef: MatDialogRef<CreateEngagementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  close(): void {
    this.dialogRef.close();
  }

  public setType(type: IEngagementType): void {
    this.selectedType = type;
  }

  public setGame(game: IGame): void {
    this.selectedGame = game;
  }
  ngOnInit() {
  }

}
