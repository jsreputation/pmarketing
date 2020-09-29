import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsDetailComponent } from './campaigns-detail.component';
import { SettingsService } from '@perxtech/core';

describe('CampaignsDetailComponent', () => {
  let component: CampaignsDetailComponent;
  let fixture: ComponentFixture<CampaignsDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsDetailComponent ],
      providers: [
        { provide: SettingsService, useValue: {} }
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
