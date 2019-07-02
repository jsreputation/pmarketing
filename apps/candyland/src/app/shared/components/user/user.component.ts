import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {
  @Input() public isOpen: boolean;
  constructor() { }

  ngOnInit() {
  }

}
