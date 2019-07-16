import { Component, OnInit, ChangeDetectionStrategy } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { IGameTree } from './shared/models/game-tree.model';
import { IGameGifts } from './shared/models/game-gifts.model';

import { ShakeDataService } from './shared/services/shake-data.service';
import { Observable } from 'rxjs';
import { RoutingStateService } from '@cl-core/services/routing-state.service';

@Component({
  selector: 'cl-new-shake-page',
  templateUrl: './new-shake-page.component.html',
  styleUrls: ['./new-shake-page.component.scss'],
  providers: [ShakeDataService],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NewShakePageComponent implements OnInit {
  public shakeTree: FormGroup;
  public gamesTree$: Observable<IGameTree[]>;
  public gameGifts$: Observable<IGameGifts[]>;
  public giftBox$: Observable<IGraphic[]>;
  public backgrounds$: Observable<IGraphic[]>;

  public selectGiftBox: IGraphic;
  public gameGift: AbstractControl;

  constructor(private fb: FormBuilder,
              private shakeDataService: ShakeDataService,
              private routingState: RoutingStateService
  ) {
  }

  public get name(): AbstractControl {
    return this.shakeTree.get('name');
  }

  public get headlineMessage(): AbstractControl {
    return this.shakeTree.get('headlineMessage');
  }

  public get subHeadlineMessage(): AbstractControl {
    return this.shakeTree.get('subHeadlineMessage');
  }

  public get buttonText(): AbstractControl {
    return this.shakeTree.get('buttonText');
  }

  ngOnInit() {
    this.createShakeTreeForm();
    this.createGameGiftField();
    this.getBackgroundData();
    this.getGiftBox();
    this.getGamesTree();
    this.getGameNumberGifts();
  }

  public save(): void {
  }

  public comeBack(): void {
    this.routingState.comeBackPreviousUrl();
  }

  public setSelectGiftBox(giftBox: IGraphic): void {
    this.selectGiftBox = giftBox;
  }

  private createGameGiftField(): void {
    this.gameGift = this.fb.control(null, [Validators.required]);
  }

  private createShakeTreeForm(): void {
    this.shakeTree = this.fb.group({
      name: ['Create Shake the Tree Template', [Validators.required,
        Validators.minLength(1),
        Validators.maxLength(60)]
      ],
      headlineMessage: [null, [Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)]
      ],
      subHeadlineMessage: [null, [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(60)
      ]],
      gameGift: [null, [Validators.required]],
      treeType: [null, [Validators.required]],
      giftBox: [null, [Validators.required]],
      background: [null, [Validators.required]],
      buttonText: [null, [
        Validators.required,
        Validators.minLength(2),
        Validators.maxLength(20)
      ]]
    });
  }

  private getBackgroundData(): void {
    this.backgrounds$ = this.shakeDataService.getBackground();
  }

  private getGiftBox(): void {
    this.giftBox$ = this.shakeDataService.getGiftBox();
  }

  private getGamesTree(): void {
    this.gamesTree$ = this.shakeDataService.getGamesTree();
  }

  private getGameNumberGifts(): void {
    this.gameGifts$ = this.shakeDataService.getGameNumberGifts();
  }

}
