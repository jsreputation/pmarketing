import {Component, Input, OnInit} from '@angular/core';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss']
})
export class AudiencesUserInfoComponent implements OnInit {
  @Input() user;

  constructor() { }

  ngOnInit() {
  }

}
