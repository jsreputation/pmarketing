import { Component, OnInit, Input, AfterViewInit } from '@angular/core';

@Component({
  selector: 'perx-core-plinko',
  templateUrl: './plinko.component.html',
  styleUrls: ['./plinko.component.scss']
})
export class PlinkoComponent implements OnInit, AfterViewInit {

  @Input()
  public targetImg: string = 'https://cdn.perxtech.net/content/dashboard/wheel2.png';

  @Input()
  // public stageColor: string  = '#D99B0C';
  public stageColor: string = '#D99B0C';

  @Input()
  // public ballColor: string = '#5BBE0D';
  public ballColor: string = '#5BBE0D';

  @Input()
  public backgroundImg: string;

  public gameStarted: boolean = false;
  public ballPath: string = '';
  public animDuration: string = '0s';

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
    this.ballPath = 'm 8 10 V 55 C 65 150 124 160 120 200 Q 110 190 90 240 l-90 110 l30 3 l -30 35';
    this.animDuration = '6s';
    const anim = <any> document.getElementById('animateEl');
    setTimeout(() =>  anim.beginElement());
  }

  public endGame(): void {
    const anim = <any> document.getElementById('animateEl');
    anim.endElement();
  }

  public startedGame(): void {
    console.log('game started');
    this.ballColor = 'darkgreen';
  }

  public finishedGame(): void {
    console.log('game ended');
    this.ballColor = 'yellow';
  }

}
