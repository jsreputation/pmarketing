import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';

@Component({
  selector: 'cl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit {
  public navLinks = [
    {
      path: 'general',
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
  constructor(private cd: ChangeDetectorRef) { }

  public ngOnInit() {
    setTimeout(() => this.cd.detectChanges());
  }

}
