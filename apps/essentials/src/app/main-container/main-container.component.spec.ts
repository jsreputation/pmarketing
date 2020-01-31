import { async, ComponentFixture, TestBed } from '@angular/core/testing';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MainContainerComponent } from './main-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SidenavMenuModule } from '@perx/candyshop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
import { AuthService, LocalStorageService, SessionService } from '@es-core';
import { TestAuthService } from '@es-shared/test-components/providers/test-auth.service';

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        SidenavMenuModule,
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      providers: [
        LocalStorageService,
        SessionService,
        {
          provide: AuthService,
          useClass: TestAuthService
        }
      ],
      declarations: [MainContainerComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MainContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
