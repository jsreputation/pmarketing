import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';

import { LanguageComponent } from './language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatListModule, MatCardModule } from '@angular/material';
import { of } from 'rxjs';

describe('LanguageComponent', () => {
  let component: LanguageComponent;
  let fixture: ComponentFixture<LanguageComponent>;

  const translateServiceStub: Partial<TranslateService> = {
    currentLang: 'en',
    use: () => of() 
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LanguageComponent ],
      imports: [
        MatListModule,
        MatCardModule,
        TranslateModule.forRoot()
      ],
      providers: [ { provide: TranslateService, useValue: translateServiceStub } ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LanguageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should retrieve the current selected language on init', fakeAsync(() => {
    component.ngOnInit();
    tick();
    expect(component.currentSelectedLanguage).toBe('en')
  }));

  it('should change language to english', () => {
    component.switchLanguage('en');
    expect(component.currentSelectedLanguage).toBe('en');
  });

  it('should change language to chinese', () => {
    component.switchLanguage('zh');
    expect(component.currentSelectedLanguage).toBe('zh');
  });
});
