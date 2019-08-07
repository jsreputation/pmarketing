import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatTabsModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SettingsMobilePreviewComponent } from './settings-mobile-preview.component';

describe('GameMobilePreviewComponent', () => {
  let component: SettingsMobilePreviewComponent;
  let fixture: ComponentFixture<SettingsMobilePreviewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        MatTabsModule
      ],
      declarations: [ SettingsMobilePreviewComponent ]
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
