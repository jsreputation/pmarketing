import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor() { }

 campaigns = [ 1 , 2 , 3 , 4 , 5];  // test Array

  ngOnInit() {
  }

}
