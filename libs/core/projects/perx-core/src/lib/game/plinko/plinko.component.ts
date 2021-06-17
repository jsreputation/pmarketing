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

  @Output()
  public completed: EventEmitter<void> = new EventEmitter<void>();

  public gameStarted: boolean = false;
  public ballPath: string;
  public animDuration: string = '0s';
  public transformVal: string = '';
  public ballPathList: string[] = [
    'M135 45.5V89.5C119.4 89.5 110.167 107.5 107 118.5C130.2 118.5 147.667 147.5 151 159.5C166.6 159.5 163.5 171 163.5 177C140.7 177 135 195.5 135 205.5C148.2 205.5 169 228.833 175 239.5C186.6 239.5 187.333 253.167 188 263C170 263 163.5 282.833 163.5 291.5C144.7 287.1 136.667 310.5 135 321.5C153.48 322.387 175 356.5 175 356.5C185.4 360.5 189.833 367.667 188 382C173.6 380.281 152.167 404.784 146 417.5H142',
    'M138 46.5V91C159 97 159 108.333 159 127.5C153 108 130 141.5 125 154.5C104 161 108.333 172.167 106.5 184.5C106.5 164 84 191.5 74.5 196.5C74.5 206.5 66 219.5 59 242.5C64.504 236.454 95.1245 253.057 93 272C111.5 276.5 116 296 116 296C143.5 303.5 133.167 317.833 138 331C138 309 180 340 180 340C168 325 159 356 153 356C136.5 370.5 134.833 369 133 385C122.5 385 94.3333 388.833 88.5 393.5C98.9 389.598 100 409.541 100 420C73 429.5 82.5 437.667 84 448.5V470'
  ];

  constructor() { }

  public ngOnInit(): void {
  }

  public ngAfterViewInit(): void {
    this.attachListener();
  }

  private attachListener(): void {
    const ball = document.getElementById('custom_ball') as Element;
    ball.addEventListener('click', () => this.startGame(), { once: true });
  }

  public startGame(): void {
    this.gameStarted = true;
    const random = Math.floor(Math.random() * this.ballPathList.length);
    this.ballPath = this.ballPathList[random];
    // this.ballPath = 'M135 43L135 90C108.5 97 115.167 110 112 121C140.5 121 138.667 135.333 140.5 148.5C158.9 148.5 158 167 158 178C135.2 178 140.5 196 140.5 206C155.5 206 165.5 235 165.5 235C177.1 235 197.5 255.5 186.5 264C170 264 163 276 152.5 283C165.5 283 171 282.5 171 298C194 298 186.5 315.5 186.5 324.5C165.5 324.5 165.5 339.5 171 355C181.4 359 194 364 186.5 385C174.1 380.6 160.833 389.167 152.5 394.5C168.1 394.5 165.5 402 165.5 411C146 411 138.667 428.833 135 439.5V459.5'; 
    // this.ballPath = 'M138 46.5V91C159 97 159 108.333 159 127.5C153 108 130 141.5 125 154.5C104 161 108.333 172.167 106.5 184.5C106.5 164 84 191.5 74.5 196.5C74.5 206.5 66 219.5 59 242.5C64.504 236.454 95.1245 253.057 93 272C111.5 276.5 116 296 116 296C143.5 303.5 133.167 317.833 138 331C138 309 180 340 180 340C168 325 159 356 153 356C136.5 370.5 134.833 369 133 385C122.5 385 94.3333 388.833 88.5 393.5C98.9 389.598 100 409.541 100 420C73 429.5 82.5 437.667 84 448.5V466';
    this.transformVal = 'translate(-135.5 -29.1333)';
    this.animDuration = '7s';
    const anim = <any> document.getElementById('animateEl');
    setTimeout(() =>  anim.beginElement());
  }

  public endGame(): void {
    const anim = <any> document.getElementById('animateEl');
    anim.endElement();
  }

  public startedGame(): void {
    console.log('game started');
  }

  public finishedGame(): void {
    this.completed.emit();
    console.log('game ended');
  }

}
