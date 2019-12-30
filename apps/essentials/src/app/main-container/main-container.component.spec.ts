import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MainContainerComponent } from './main-container.component';
import { RouterTestingModule } from '@angular/router/testing';
import { SideNavModule } from '@cl-shared/components/side-nav/side-nav.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AuthService } from '@cl-core-services';
import { LocalStorageService } from '@cl-core/services/local-storage.service';
import { SessionService } from '@cl-core/services/session.service';
import { HttpClientModule } from '@angular/common/http';
import { TranslateModule } from '@ngx-translate/core';

describe('LoginPageComponent', () => {
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
      providers: [ AuthService, LocalStorageService, SessionService ],
      declarations: [MainContainerComponent]
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
