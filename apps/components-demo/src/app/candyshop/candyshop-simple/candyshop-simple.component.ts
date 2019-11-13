import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-candyshop-simple',
  templateUrl: './candyshop-simple.component.html',
  styleUrls: ['./candyshop-simple.component.scss']
})
export class CandyshopSimpleComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  public log(message: any): void {
    alert(message);
  }
}
