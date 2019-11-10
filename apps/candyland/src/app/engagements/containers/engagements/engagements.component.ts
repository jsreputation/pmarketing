import { Component, ChangeDetectionStrategy } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { TranslateDefaultLanguageService } from '@cl-core/translate-services/translate-default-language.service';

@Component({
  selector: 'cl-engagements',
  templateUrl: './engagements.component.html',
  styleUrls: ['./engagements.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class EngagementsComponent {
  constructor(private readonly translate: TranslateService,
              private translateDefaultLanguage: TranslateDefaultLanguageService) {
    this.setTranslateLanguage();
  }

  private setTranslateLanguage(): void {
    this.translateDefaultLanguage.defaultLanguage$
      .subscribe((language: string) => {
        this.translate.setDefaultLang(language);
      });
  }
}
