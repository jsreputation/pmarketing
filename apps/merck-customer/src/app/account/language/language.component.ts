import { Component, OnInit, ChangeDetectorRef, } from '@angular/core';
import { PageAppearence, PageProperties, BarSelectedItem } from '../../page-properties';
import { NotificationService } from '@perxtech/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'mc-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent implements OnInit, PageAppearence {

  public currentSelectedLanguage: string;

  constructor(
    private cd: ChangeDetectorRef,
    private translateService: TranslateService,
    private notificationService: NotificationService
  ) { }

  public ngOnInit(): void {
    this.currentSelectedLanguage = this.translateService.currentLang || this.translateService.defaultLang;
  }

  public getPageProperties(): PageProperties {
    return {
      header: true,
      backButtonEnabled: true,
      bottomSelectedItem: BarSelectedItem.ACCOUNT,
      pageTitle: 'STATIC_LANGUAGE'
    };
  }

  public switchLanguageEnglish(): void {
    this.translateService.use('en');
    this.cd.detectChanges();
    this.currentSelectedLanguage = this.translateService.currentLang || this.translateService.defaultLang;
    this.notificationService.addSnack('Language Updated.');
  }

  public switchLanguageChinese(): void {
    this.translateService.use('zh');
    this.cd.detectChanges();
    this.currentSelectedLanguage = this.translateService.currentLang || this.translateService.defaultLang;
    this.notificationService.addSnack('Language Updated.');
  }

}
