import { Component, OnInit, Input, AfterViewInit, Output, EventEmitter,  } from '@angular/core';

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
  public losePathList: string[] = [
   'M138 46.5V91C159 97 159 103.833 159 123C153 103.5 130 141.5 125 154.5C104 161 106.5 162 106.5 182C101.936 162.773 80.4937 195.495 79 197.5C61 221.658 71 219.5 61 238.5C72.5 230 84 247.5 96 271C114.5 275.5 116 296 116 296C143.5 303.5 138 317 138 326.5C144 311 176 338 176 338C164 323 159 346 153 356C138 365.5 132.833 366 131 382C120.5 382 107.333 390.333 101.5 395C111.9 391.098 106.5 398.541 106.5 409C86.5 409 88 440.167 84 448.5V464',
   'M139 44.5V88.5C125.4 88.5 113.5 101 107.5 117C89.5 117 89.5 135 89.5 150C107.5 150 111.333 170.333 114 179C139.6 179 139 195 139 207C153.5 207 157 216.5 157 237.5C133 237.5 130 248 130 264C113 268.5 108.5 277 104 292.5C91 292.5 89.5 309 89.5 325C103.1 325 109.5 343.667 114 353.5C131 360.5 139 368 139 380.5C157 380.5 159 388 165 408.5C181.8 408.5 186.5 420.5 201 428.5C193.8 428.5 190.833 440.167 189 446.5V464.5'
  ];

  public winPathList: string[] = [
    'M137.5 51.5V86.5C157.5 76 157.5 92 163 119.5C190 119.5 184 137 184 151C167.2 151 158.333 159.667 151 164.5C163.8 164.5 196.5 204.5 190 212C194.8 200.8 212.5 215.5 223 225C199.5 235.5 190 249.667 184 266C163 266 160.333 279 157.5 294.5C137.5 302 145.5 312.333 143.5 326C169 326 165.5 343.5 169 354.5C181 354.5 189.5 358.833 197.5 362C191.5 362 186 376 184 383C157.5 389.5 157.5 397 157.5 410.5C141.5 398.5 137.5 441.667 137.5 461.5',
    'M135 43V89.5C106.5 89.5 115.167 108 112 119C135 119 140.5 139 140.5 148.5C165.5 158 165.5 168 165.5 179C186.5 179 181.333 197.667 186.5 207.5C160 213 158.667 217.833 152.5 224.5C167.3 224.5 173 241.5 173 241.5C197.5 249 199.667 259.5 197.5 268C209 271 213.5 285 213.5 295.5C200.7 289.5 188.333 312.833 186.5 323C165.5 323 167.333 339.5 165.5 352.5C171.5 346.9 184.333 360.833 197.5 365C185.966 361.35 184.167 381.5 180.5 387C159.5 387 158 390.5 152.5 400C165.5 391.739 159 412.5 159 412.5C135 412.5 140.5 433.5 135 439.5V459.5',
  ];

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
        const random = Math.floor(Math.random() * this.winPathList.length);
        this.ballPath = this.winPathList[random];
      } else {
        const random = Math.floor(Math.random() * this.losePathList.length);
        this.ballPath = this.losePathList[random];
      }
      this.animationDuration = '7s';
      const anim = <any> document.getElementById('animateEl');
      setTimeout(() =>  {
        this.transformVal = 'translate(-135.5 -29.1333)';
        anim.beginElement();
      }, 10);
    }
  }

  public endGame(): void {
    const anim = <any> document.getElementById('animateEl');
    anim.endElement();
  }

  public startedGame(): void {
  }

  public finishedGame(): void {
    this.completed.emit();
  }

}
