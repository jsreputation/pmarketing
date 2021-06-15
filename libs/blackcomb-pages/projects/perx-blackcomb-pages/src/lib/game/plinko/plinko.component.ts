import { Component, OnInit, Input, Output, EventEmitter  } from '@angular/core';
import { IGame, IPlinko } from '@perxtech/core';
@Component({
  selector: 'perx-blackcomb-pages-plinko',
  templateUrl: './plinko.component.html',
  styleUrls: ['./plinko.component.scss']
})
export class PlinkoComponent implements OnInit {

  @Input() public willWin: boolean = false;

  @Input() public game: IGame;

  @Output() public broken: EventEmitter<void> = new EventEmitter();
  @Output() public loaded: EventEmitter<boolean> = new EventEmitter();

  public backgroundImgUrl: string = 'https://cdn.perxtech.io/model_image/source/1636/henry-co-odukx8c2gg-unsplash-2f6d49c0-e4c1-4ad6-958f-c2d5bac82a9b.jpg';
  public targetImg: string = 'https://cdn.perxtech.net/content/dashboard/wheel2.png';
  public stageColor: string = '#D99B0C';
  public ballColor: string = '#5BBE0D';

  constructor() { }

  public ngOnInit(): void {
    this.loaded.emit();
  }

  public get config(): IPlinko {
    return this.game.config as IPlinko;
  }

  public gameCompleted(): void {
    this.broken.emit();
  }

}
