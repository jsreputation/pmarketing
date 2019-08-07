import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'cl-audiences-user-info',
  templateUrl: './audiences-user-info.component.html',
  styleUrls: ['./audiences-user-info.component.scss']
})
export class AudiencesUserInfoComponent implements OnInit {
  @Input() public user = {
    id: 1,
    firstName: 'John',
    lastName: 'Tan',
    email: 'john@perxtech.com',
    phone: '+65 9123 1231',
    gender: 'Male',
    race: '-',
    birthday: '01 Feb 1993',
    country: 'Singapore',
    state: '-',
    city: 'Singapore',
    audienceList: [
      'Bronze_users',
      'Silver_users'
    ],
  };

  constructor() {
  }

  public ngOnInit() {
  }

}
