import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsMobilePreviewComponent } from './settings-mobile-preview.component';
import { TranslateModule } from '@ngx-translate/core';
import { MockUploadFileService } from '@cl-shared/test-components/providers/mock-upload-file.service';
import { UploadFileService } from '@cl-core-services';

describe('GameMobilePreviewComponent', () => {
  let component: SettingsMobilePreviewComponent;
  let fixture: ComponentFixture<SettingsMobilePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule,
        TranslateModule.forRoot(),
      ],
      declarations: [ SettingsMobilePreviewComponent ],
      providers: [{ provide: UploadFileService, useClass: MockUploadFileService }]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SettingsMobilePreviewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
