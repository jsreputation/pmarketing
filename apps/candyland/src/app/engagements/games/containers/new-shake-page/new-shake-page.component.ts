import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GamesTree } from './shared/games-tree';
import { IGameTree } from './shared/models/game-tree.model';
import { GameNumberGifts } from './shared/game-number-gifts';
import { IGameGifts } from './shared/models/game-gifts.model';
import { IGraphic } from '@cl-shared/models/graphick.model';
import { GiftBox } from './shared/gift-box';

@Component({
  selector: 'cl-new-shake-page',
  templateUrl: './new-shake-page.component.html',
  styleUrls: ['./new-shake-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewShakePageComponent implements OnInit {
  public messagesForm: FormGroup;
  public gamesTree: IGameTree[] = GamesTree;
  public gameGifts: IGameGifts[] = GameNumberGifts;
  public giftBox: IGraphic[] = GiftBox;

  public selectGameTree: IGameTree;
  public selectGiftBox: IGraphic;
  public gameGift: AbstractControl;

  constructor(private fb: FormBuilder) { }

  ngOnInit() {
    this.createMessagesForm();
    this.createGameGiftField();
  }

  private createGameGiftField(): void {
    this.gameGift = this.fb.control(null, [
      Validators.required
    ])
  }

  private createMessagesForm(): void {
    this.messagesForm = this.fb.group({
      headlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      subHeadlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]]
    })
  }

  public get headlineMessage(): AbstractControl {
    return this.messagesForm.get('headlineMessage');
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.messagesForm.get('subHeadlineMessage');
  }

  public setSelectedGameTree(gameTree: IGameTree): void {
    this.selectGameTree = gameTree;
  }

  public setSelectGiftBox(giftBox: IGraphic): void {
    this.selectGiftBox = giftBox;
  }

}
