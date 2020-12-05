import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LanguageComponent } from './language.component';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatListModule, MatCardModule, MatSelectModule, MatOptionModule } from '@angular/material';
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
        MatOptionModule,
        MatSelectModule,
        NoopAnimationsModule,
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
});
