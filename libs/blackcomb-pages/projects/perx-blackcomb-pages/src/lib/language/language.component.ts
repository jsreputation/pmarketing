import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { NotificationService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';
import { MatSelectChange } from '@angular/material';

@Component({
  selector: 'mc-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit {

  public currentSelectedLanguage: string;

  constructor(
    private translateService: TranslateService,
    private notificationService: NotificationService,
    private cd: ChangeDetectorRef
  ) { }

  public ngOnInit(): void {
    this.currentSelectedLanguage = this.translateService.currentLang || this.translateService.defaultLang;
  }

  public switchLanguage({value: lang}: MatSelectChange): void {
    this.translateService.use(lang);
    this.currentSelectedLanguage = lang;
    this.notificationService.addSnack('Language Updated.');
    this.cd.detectChanges();
  }
}
