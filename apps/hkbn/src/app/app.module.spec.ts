import { async, TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setLanguage } from './app.module';
import { environment } from 'src/environments/environment';

const translateServiceStub: Partial<TranslateService> = {
  defaultLang: null,
  setDefaultLang(leng: string): void { this.defaultLang = leng; }
};

describe('AppModule', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: TranslateService, useValue: translateServiceStub },
        AppComponent,
        { provide: APP_INITIALIZER, useFactory: setLanguage, deps: [TranslateService], multi: true }
      ],
      imports: [
        MatDialogModule,
        MatSnackBarModule
      ]
    });
  }));
  beforeEach(async () => {
    await TestBed.get(ApplicationInitStatus).donePromise;
  });
  it('should be initialed', inject([AppComponent], (app: AppComponent) => {
    expect(app).toBeTruthy();
  }));

  it('should set default laguage', inject([TranslateService], (translateService: TranslateService) => {
    const defLang = environment.defaultLang || 'en';
    expect(translateService.defaultLang).toBe(defLang);
  }));
});
