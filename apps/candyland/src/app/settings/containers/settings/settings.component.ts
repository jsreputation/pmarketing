import { DOCUMENT } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, Inject, OnDestroy, Renderer2 } from '@angular/core';

@Component({
  selector: 'cl-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {
  public navLinks: {path: string, label: string}[] = [
    {
      path: 'general',
      label: 'SETTINGS_FEATURE.GENERAL'
    },
    {
      path: 'branding',
      label: 'SETTINGS_FEATURE.BRANDING'
    },
    // {
    //  path: 'communications',
    //  label: 'Communications'
    // },
    {
      path: 'users-roles',
      label: 'SETTINGS_FEATURE.USERS_&_ROLES'
    },
  ];

  constructor(private cd: ChangeDetectorRef,
              @Inject(DOCUMENT) private document: Document,
              private renderer: Renderer2) {
  }

  public ngOnInit(): void {
    setTimeout(() => this.cd.detectChanges());
    this.renderer.addClass(this.document.body, 'no-cta');
  }

  public ngOnDestroy(): void {
    this.renderer.removeClass(this.document.body, 'no-cta');
    this.cd.detach();
  }
}
