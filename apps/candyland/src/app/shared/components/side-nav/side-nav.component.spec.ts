import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SideNavComponent } from './side-nav.component';
import { RouterTestingModule } from '@angular/router/testing';
import { LogoModule } from '../logo/logo.module';
import { UserModule } from '../user/user.module';
import { SidenavMenuModule } from '../sidenav-menu/sidenav-menu.module';
import { MatIconModule, MatSidenavModule, MatToolbarModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@cl-core-services';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { SessionService } from '@cl-core/services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('SideNavComponent', () => {
  let component: SideNavComponent;
  let fixture: ComponentFixture<SideNavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        LogoModule,
        UserModule,
        SidenavMenuModule,
        MatToolbarModule,
        MatSidenavModule,
        MatIconModule,
        BrowserAnimationsModule,
        HttpClientModule,
        TranslateModule.forRoot(),
      ],
      providers: [ AuthService, LocalStorageService, SessionService ],
      declarations: [ SideNavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SideNavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
