import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter,  } from '@angular/core';


export const LOSE_PATHS: string[] = [
  'M137.5 54V89.5C115 80.5 110.5 104.333 107 117C77 125 84.5 131 77 146C63 146 56.5 168.833 62 177.5C80.5 183 90.5 198.5 95 211.5C115 218.5 115 226 115 236.5C137.5 244.5 125.5 242 145.5 250.5C131.5 250.5 126.167 260.167 125 268C115 271.5 105.5 271 98.5 275.5C111.5 275.5 115 289.5 115 294.5C137.5 300 142 313 145.5 324.5C168 337 162.333 340.833 167.5 352.5C187 357 187 365 187 380C197.4 374 214 392.333 224.5 399C203.5 406 191.5 416.5 181 426C195.4 430.8 195 433 202 447C185.5 441 189.333 461.167 187 465',
  'M139 44.5V87C119.5 87 113.5 101 107.5 117C85.5 123.5 89.5 135 89.5 150C107.5 150 111.333 167.833 114 176.5C139 184.5 139 193.5 139 205.5C152.5 211.5 157 217.5 157 237.5C130 243.5 130 248 130 264C114 273.5 101.5 273 101.5 294C87 300 89.5 307 89.5 323C114 336.5 114 342.167 118.5 352C134.5 362.5 139 368 139 380.5C157 380.5 159 388 165 408.5C181.8 408.5 181.5 419.5 196 427.5C188.8 427.5 190.833 440.167 189 446.5V464.5',
  'M138 46.5V88.5C155.5 99 159.5 98.5 159.5 118C131 130.5 131 132 128.5 148C104 162.5 111.5 159.5 106.5 176.5C84 183 87.5 196 78 206C65.5 211.5 54.3333 215.833 48 224.5C56.8 224.5 62.8333 234.333 65.5 238C75.5 234.8 88 253.234 90 265C116 278.5 117 294 117 294C138 304.5 141 310.5 138 322.5C159.5 328 170 337 170 337C154.5 337 159.5 348.717 148 356C133 365.5 132.833 366 131 382C120.5 382 107.333 390.333 101.5 395C111.9 391.098 106.5 398.541 106.5 409C86.5 409 88 440.167 84 448.5V464'
 ];

export const WIN_PATHS: string[] = [
  'M135.5 55.5V88C118 80 108 107.167 106 118.5C90.8 112.9 85.6666 131.5 81.5 146C68 146 57.5 164.333 59.5 176C81.5 188 82.5 190 87.5 205C111.5 218.5 109.5 224.5 111.5 234C124.5 237 132 244.667 144 251C132 251 130 259.167 130 264.5C111.5 270 100.333 290.333 98 298.5C98 298.5 88.5 300 76.5 311.5C86.1 311.5 92.3333 320.833 94 325.5C111.5 335.5 118 341 118 354C135.5 360.5 131.5 361.5 135.5 380.5C144 374.5 158 389.5 170 397.5C161.5 390.745 153 403 153 410C139.5 415.5 134.333 419 125.5 425C143 437 140 439 140 461.5',
  'M135 43V89.5C108 89.5 116.667 107.5 113.5 118.5C135 129 135 128.5 140.5 148.5C165.5 158 168 164.5 168 178.5C186.5 184.5 192.5 192.167 197.5 197C182 197 180.667 204.667 177 210C155.5 219 161 221.5 155.5 236C131 248 135 254 131 264.5C96.5 282.5 109.333 276.5 102.5 282.5C112 276.5 113.167 288.5 117.5 294.5C136.5 303.5 139.667 316.333 145.5 325.5C164.5 334 165.833 338.333 168 351.5C186.5 360 190.667 362.833 197.5 368.5C185.1 368.5 183 380.601 186.5 379.5C166 385 165.5 399.5 160 409C149.5 413.5 133.833 417.833 127 425C137.8 425 140.5 455.667 140.5 466.5',
  'M137.5 53.5V89.5C157.5 85 160.5 90.5 166 118C184 125 184 133.5 184 147.5C162.5 155 161.833 161.167 154.5 166C168.5 166 173 179.5 173 179.5C195.5 188.5 192.833 198.5 195.5 206C215 215.5 215 219.5 224 224C210.5 229 208 231 204 238.5C184 248.5 184 255 179 266.5C157.5 279.5 162.5 272.5 157.5 293C137.5 303.5 141.5 308.5 141.5 322C166 336 162.5 339 166 350C184 356 182.333 369 184 380.5C157.5 391.5 157.5 395.5 157.5 409C141.5 409 137.5 441.667 137.5 461.5'
];

const GAME_ANIMATION_DURATION: string = '3s';

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

  @Input()
  public gameDuration: number;

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
      this.animationDuration = this.gameDuration ? `${this.gameDuration}s` : GAME_ANIMATION_DURATION;
      const anim = <any> document.getElementById('animateEl');
      setTimeout(() =>  {
        if (typeof anim.beginElement !== 'undefined') {
          this.transformVal = 'translate(-135.5 -29.1333)';
          anim.beginElement();
        }
      }, 5);
    }
  }

  public finishedGame(): void {
    this.completed.emit();
  }

}
