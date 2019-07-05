import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent implements OnInit {
  @Input() sizeClass: string;
  constructor() { }

  ngOnInit() {
  }

}
