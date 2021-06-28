import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter,  } from '@angular/core';


const LOSE_PATHS: string[] = [
  'M137.5 54V89.5C115 80.5 110.5 104.333 107 117C77 125 84.5 131 77 146C63 146 56.5 168.833 62 177.5C80.5 183 90.5 198.5 95 211.5C115 218.5 115 226 115 236.5C137.5 244.5 125.5 242 145.5 250.5C131.5 250.5 126.167 260.167 125 268C115 271.5 105.5 271 98.5 275.5C111.5 275.5 115 289.5 115 294.5C137.5 300 142 313 145.5 324.5C168 337 162.333 340.833 167.5 352.5C187 357 187 365 187 380C197.4 374 214 392.333 224.5 399C203.5 406 191.5 416.5 181 426C195.4 430.8 195 433 202 447C185.5 441 189.333 461.167 187 465',
  'M139 44.5V87C119.5 87 113.5 101 107.5 117C85.5 123.5 89.5 135 89.5 150C107.5 150 111.333 167.833 114 176.5C139 184.5 139 193.5 139 205.5C152.5 211.5 157 217.5 157 237.5C130 243.5 130 248 130 264C114 273.5 101.5 273 101.5 294C87 300 89.5 307 89.5 323C114 336.5 114 342.167 118.5 352C134.5 362.5 139 368 139 380.5C157 380.5 159 388 165 408.5C181.8 408.5 181.5 419.5 196 427.5C188.8 427.5 190.833 440.167 189 446.5V464.5'
 ];

const WIN_PATHS: string[] = [
  'M135.5 55.5V88C118 80 108 107.167 106 118.5C90.8 112.9 85.6666 131.5 81.5 146C68 146 57.5 164.333 59.5 176C81.5 188 82.5 190 87.5 205C111.5 218.5 109.5 224.5 111.5 234C124.5 237 132 244.667 144 251C132 251 130 259.167 130 264.5C111.5 270 100.333 290.333 98 298.5C98 298.5 88.5 300 76.5 311.5C86.1 311.5 92.3333 320.833 94 325.5C111.5 335.5 118 341 118 354C135.5 360.5 131.5 361.5 135.5 380.5C144 374.5 158 389.5 170 397.5C161.5 390.745 153 403 153 410C139.5 415.5 134.333 419 125.5 425C143 437 140 439 140 461.5',
  'M135 43V89.5C106.5 89.5 115.167 108 112 119C135 126.5 140.5 131 140.5 148.5C165.5 158 168 164.5 168 178.5C186.5 186 187.667 185.167 197.5 191C182 191 180.667 204.667 177 210C155.5 219 161 221.5 155.5 236C131 248 135 254 131 264.5C96.5 282.5 109.333 276.5 102.5 282.5C112 276.5 113.167 288.5 117.5 294.5C136.5 303.5 139.667 316.333 145.5 325.5C164.5 334 165.833 338.333 168 351.5C186.5 360 190.667 362.833 197.5 368.5C185.1 368.5 183 380.601 186.5 379.5C166 385 165.5 399.5 160 409C149.5 413.5 133.833 417.833 127 425C137.8 425 140.5 455.667 140.5 466.5'
];

const GAME_ANIMATION_DURATION: string = '8s';

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
      this.animationDuration = GAME_ANIMATION_DURATION;
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
