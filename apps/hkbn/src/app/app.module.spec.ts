// import 'jasmine';
import { async, TestBed, inject } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { MatDialogModule, MatSnackBarModule } from '@angular/material';
import { ApplicationInitStatus, APP_INITIALIZER } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { setLanguage } from './app.module';

const translateServiceStud = {
    defaultLang: null,
    setDefaultLang: function (leng) { this.defaultLang = leng }
};


describe('AppModule', () => {
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            providers: [
                { provide: TranslateService, useValue: translateServiceStud },
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
        expect(translateService.defaultLang).toBe('en');
    }));
});
