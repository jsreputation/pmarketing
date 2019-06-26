import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  title = 'CONGRATULATIONS!';
  subTitle = 'You have unlocked your Netflix Rebate!';
  constructor() {}

  ngOnInit() {}
}
