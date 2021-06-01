import { async, ComponentFixture, TestBed, } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';
import { RewardsListTabbedComponent } from './rewards-list-tabbed.component';
import { RewardsListComponent } from '../rewards-list/rewards-list.component';
import { MaterialModule } from '../../shared/material.module';
import { UtilsModule } from '../../utils/utils.module';
import { ThemesService } from '../../utils/themes/themes.service';
import { SettingsService } from '@perxtech/core';

describe('RewardsListTabbedComponent', () => {
  let component: RewardsListTabbedComponent;
  let fixture: ComponentFixture<RewardsListTabbedComponent>;

  const themesServiceStub: Partial<ThemesService> = {
    getThemeSetting: () => of()
  };

  const settingsServiceStub: Partial<SettingsService> = {
    getRemoteFlagsSettings: () => of()
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        RewardsListTabbedComponent,
        RewardsListComponent,
      ],
      imports: [
        NoopAnimationsModule,
        MaterialModule,
        UtilsModule
      ],
      providers: [
        {
          provide: ThemesService,
          useValue: themesServiceStub,
        },
        { provide: SettingsService, useValue: settingsServiceStub }
      ],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListTabbedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
