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
import { TokenService } from '@cl-core/services/token.service';
import { HttpClientModule } from '@angular/common/http';

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
        HttpClientModule
      ],
      providers: [ AuthService, LocalStorageService, TokenService ],
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
