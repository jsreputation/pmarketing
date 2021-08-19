import { TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import {
  ConfigService,
  ThemesService
} from '@perxtech/core';
import { of } from 'rxjs';
import { MatSnackBarModule } from '@angular/material/snack-bar';

const themesServiceStub: Partial<ThemesService> = { getThemeSetting: () => of() };

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule,
                MatSnackBarModule],
      declarations: [AppComponent],
      providers: [
          {
            provide: ConfigService,
            useValue: {
              readAppConfig: () => of()
            }
          },
          { provide: ThemesService, useValue: themesServiceStub },
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

});
