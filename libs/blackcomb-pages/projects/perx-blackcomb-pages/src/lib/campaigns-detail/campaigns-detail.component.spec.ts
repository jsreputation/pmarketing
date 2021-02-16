import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsDetailComponent } from './campaigns-detail.component';
import { IMicrositeSettings, SettingsService } from '@perxtech/core';
import { of } from 'rxjs';

describe('CampaignsDetailComponent', () => {
  let component: CampaignsDetailComponent;
  let fixture: ComponentFixture<CampaignsDetailComponent>;
  const settingsServiceStub: Partial<SettingsService> = {
    getTenantAppSettings: (key: string) => of({ key } as IMicrositeSettings)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsDetailComponent ],
      providers: [
        { provide: SettingsService, useValue: settingsServiceStub }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
