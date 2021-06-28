import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter,  } from '@angular/core';


const LOSE_PATHS: string[] = [
  'M137.5 54V89.5C115 80.5 110.5 104.333 107 117C77 125 84.5 131 77 146C63 146 56.5 168.833 62 177.5C80.5 183 90.5 198.5 95 211.5C115 218.5 115 226 115 236.5C137.5 244.5 125.5 242 145.5 250.5C131.5 250.5 126.167 260.167 125 268C115 271.5 105.5 271 98.5 275.5C111.5 275.5 115 289.5 115 294.5C137.5 300 142 313 145.5 324.5C168 337 162.333 340.833 167.5 352.5C187 357 187 365 187 380C197.4 374 214 392.333 224.5 399C203.5 406 191.5 416.5 181 426C195.4 430.8 195 433 202 447C185.5 441 189.333 461.167 187 465',
  'M138 46.5V88.5C159.5 96 159.5 98.5 159.5 118C131 132 136 134.5 131 147.5C106.5 162 116 156.5 106.5 176.5C84 183 87.5 196 78 206C65.5 211.5 54.3333 215.833 48 224.5C56.8 224.5 62.8333 234.333 65.5 238C89 249 84 247.5 96 271C114.5 275.5 116 296 116 296C143.5 303.5 138 313 138 322.5C159.5 328 170 337 170 337C154.5 337 159.5 348.717 148 356C133 365.5 132.833 366 131 382C120.5 382 107.333 390.333 101.5 395C111.9 391.098 106.5 398.541 106.5 409C86.5 409 88 440.167 84 448.5V464'
 ];

const WIN_PATHS: string[] = [
  'M135.5 55.5V88C118 80 108 107.167 106 118.5C90.8 112.9 85.6666 131.5 81.5 146C68 146 57.5 164.333 59.5 176C81.5 188 82.5 190 87.5 205C111.5 218.5 109.5 224.5 111.5 234C124.5 237 132 244.667 144 251C132 251 130 259.167 130 264.5C111.5 270 100.333 290.333 98 298.5C98 298.5 88.5 300 76.5 311.5C86.1 311.5 92.3333 320.833 94 325.5C111.5 335.5 118 341 118 354C135.5 360.5 131.5 361.5 135.5 380.5C144 374.5 158 389.5 170 397.5C161.5 390.745 153 403 153 410C139.5 415.5 134.333 419 125.5 425C143 437 140 439 140 461.5',
  'M135 43V89.5C106.5 89.5 115.167 108 112 119C135 119 140.5 139 140.5 148.5C165.5 158 165.5 168 165.5 179C186.5 179 181.333 197.667 186.5 207.5C160 213 158.667 217.833 152.5 224.5C167.3 224.5 173 241.5 173 241.5C197.5 249 199.667 259.5 197.5 268C209 271 213.5 285 213.5 295.5C200.7 289.5 188.333 312.833 186.5 323C165.5 323 167.333 339.5 165.5 352.5C171.5 346.9 184.333 360.833 197.5 365C185.966 361.35 184.167 381.5 180.5 387C159.5 387 158 390.5 152.5 400C165.5 391.739 159 412.5 159 412.5C135 412.5 140.5 433.5 135 439.5V461.5'
];

@Component({
  selector: 'perx-core-plinko',
  templateUrl: './plinko.component.html',
  styleUrls: ['./plinko.component.scss']
})
export class PlinkoComponent implements OnInit, AfterViewInit {

  @Input()
  public targetImg: string;

  @Input()
  public stageColor: string;

  @Input()
  public ballColor: string;

  @Input()
  public willWin: boolean;

  @Input()
  public startGame: boolean = false;

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();

  public startedAnimation: boolean = false;
  public ballPath: string;
  public animationDuration: string = '0s';
  public transformVal: string = '';

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.attachListener();
  }

  private attachListener(): void {
    const ball = document.getElementById('custom_ball') as Element;
    ball.addEventListener('click', () => this.startGameAnimation());
  }

  public startGameAnimation(): void {
    if (this.startGame && !this.startedAnimation) {
      this.startedAnimation = true;
      if (this.willWin) {
        const random = Math.floor(Math.random() * WIN_PATHS.length);
        this.ballPath = WIN_PATHS[random];
      } else {
        const random = Math.floor(Math.random() * LOSE_PATHS.length);
        this.ballPath = LOSE_PATHS[random];
      }
      this.animationDuration = '7s';
      const anim = <any> document.getElementById('animateEl');
      setTimeout(() =>  {
        this.transformVal = 'translate(-135.5 -29.1333)';
        anim.beginElement();
      }, 5);
    }
  }

  public finishedGame(): void {
    this.completed.emit();
  }

}
