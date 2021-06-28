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
   'M137.5 54V89.5C115 80.5 105.5 109.833 102 122.5C72.5 128 83.5 135.5 76 150.5C56.4 150.5 61 172.833 66.5 181.5C82.9 181.5 93.1667 201 95 213C115 213 115 226 115 236.5C137.5 244.5 127 236.5 145.5 250.5C131.5 250.5 126.667 262.667 125.5 270.5C106.7 265.7 109 270.5 98.5 275.5C111.7 281.1 115 292.5 115 297.5C137.5 297.5 142 315.5 145.5 327C168 333 162.833 343.833 168 355.5C187.6 355.5 188.5 369 187 380C197.4 374 214 392.333 224.5 399C203.5 406 190 417.5 179.5 427C193.9 431.8 195 433 202 447C185.5 441 189.333 461.167 187 465',
   'M138 46.5V91C159 97 159 103.833 159 123C153 103.5 130 141.5 125 154.5C104 161 106.5 162 106.5 182C101.936 162.773 80.4937 195.495 79 197.5C61 221.658 71 219.5 61 238.5C72.5 230 84 247.5 96 271C114.5 275.5 116 296 116 296C143.5 303.5 138 317 138 326.5C144 311 176 338 176 338C164 323 159 346 153 356C138 365.5 132.833 366 131 382C120.5 382 107.333 390.333 101.5 395C111.9 391.098 106.5 398.541 106.5 409C86.5 409 88 440.167 84 448.5V464',
  ];

  public winPathList: string[] = [
    'M135.5 48V88C118 80 108 108.667 106 120C90.8 114.4 85.6666 131.5 81.5 146C73.5 139 59.5 167.333 61.5 179C74.7 179 84.8333 195.5 89 206.5C104.2 206.5 110 227 112 236.5C121.6 236.5 135 239.667 144 247C128.5 259 118 267 118 279C102 279 100.333 294.333 98 302.5C80 302.5 85.5 298 73.5 309.5C89 323.5 89 309.5 98 332C111.6 332 118 341 118 354C132 367.2 135.5 357.5 135.5 382.5C144 376.5 159 389.5 171 397.5C166.2 404.3 168.5 397.5 154.5 413C144.1 413 138.333 428 135.5 435.5V458.5',
    'M137.5 51.5V89.5C157.5 79 157.5 92 163 119.5C190 119.5 184 137 184 151C167.2 151 158.333 162.167 151 167C163.8 167 196.5 204.5 190 212C194.8 200.8 212.5 215.5 223 225C199.5 235.5 190 249.667 184 266C163 266 160.333 279 157.5 294.5C137.5 302 145.5 312.333 143.5 326C169 326 159.5 343.5 163 354.5C176.5 348.5 190 364.333 198 367.5C192 367.5 186 376 184 383C157.5 389.5 157.5 397 157.5 410.5C141.5 398.5 137.5 441.667 137.5 461.5',
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
      }, 5);
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
