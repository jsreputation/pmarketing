import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss']
})
export class SettingsComponent implements OnInit {
  public navLinks = [
    {
      path: '/settings',
      label: 'General'
    },
    {
      path: 'branding',
      label: 'Branding'
    },
    {
      path: 'communications',
      label: 'Communications'
    },
    {
      path: 'users-roles',
      label: 'Users & Roles'
    },
  ];
  constructor() { }

  ngOnInit() {
  }

}
