import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  title = 'Congratulations!';
  subTitle = 'You just won a reward from us.';
  constructor() {}

  ngOnInit() {}
}
