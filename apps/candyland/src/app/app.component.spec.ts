import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from '@cl-core-services';
import { AppComponent } from './app.component';
import { TranslateModule } from '@ngx-translate/core';
import { TenantService } from '@cl-core/services/tenant.service';
import { Observable, of } from 'rxjs';

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        HttpClientTestingModule,
        TranslateModule.forRoot()
      ],
      declarations: [
        AppComponent
      ],
      providers: [
        {
          provide: AuthService, useValue: {
            initAuth: () => {
            }
          }
        },
        {
          provide: TenantService,
          useValue: {
            getSettings(): Observable<any> {
              return of({});
            }
          }
        }
      ]
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.debugElement.componentInstance;
    expect(app).toBeTruthy();
  });
});
