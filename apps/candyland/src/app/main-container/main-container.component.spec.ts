import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContainerComponent } from './main-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavModule } from '@cl-shared/components/side-nav/side-nav.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { AuthService } from '@cl-core-services';
import { TestAuthServisec } from '@cl-shared/test-components/providers/test-auth.servisec';

describe('MainContainerComponent', () => {
  let component: MainContainerComponent;
  let fixture: ComponentFixture<MainContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        BrowserAnimationsModule,
        SideNavModule,
        HttpClientModule,
        TranslateModule.forRoot()
      ],
      providers: [
        {
          provide: AuthService,
          useClass: TestAuthServisec
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
