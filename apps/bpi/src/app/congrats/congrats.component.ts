import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  title = 'CONGRATULATIONS!';
  subTitle = 'You have unlocked 1 out of 6 months of Netflix rebate!';
  constructor() {}

  ngOnInit() {}
}
