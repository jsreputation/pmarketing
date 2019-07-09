import { Component, OnInit, ChangeDetectionStrategy, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';
import { IEngagementType } from './engagement-type/models/engagement-type.model';
import { EngagementType } from './shared/models/EngagementType';
import { EngagementsService } from '@cl-core/http-services/engagements-https.service';
import { Observable } from 'rxjs';
import { IGraphic } from '@cl-shared/models/graphick.model';

@Component({
  selector: 'cl-create-engagement-popup',
  templateUrl: './create-engagement-popup.component.html',
  styleUrls: ['./create-engagement-popup.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CreateEngagementPopupComponent implements OnInit {
  public selectedType: IEngagementType;
  public engagementType = EngagementType;
  public engagementType$: Observable<IGraphic[]>;
  public gamesType$: Observable<IGraphic[]>;
  public selectedGame: IGraphic;
  constructor(
    public dialogRef: MatDialogRef<CreateEngagementPopupComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private engagementsService: EngagementsService) {}

  close(): void {
    this.dialogRef.close();
  }

  public setType(type: IEngagementType): void {
    this.selectedType = type;
  }

  public setGame(game: IGraphic): void {
    this.selectedGame = game;
  }
  ngOnInit() {
    this.getEngagementType();
    this.getGamesType();
  }

  private getEngagementType(): void {
    this.engagementType$ = this.engagementsService.getEngagementType();
  }
  private getGamesType(): void {
    this.gamesType$ = this.engagementsService.getGamesType();
  }
}
