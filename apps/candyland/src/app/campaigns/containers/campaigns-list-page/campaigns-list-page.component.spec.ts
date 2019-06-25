import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsListPageComponent } from './campaigns-list-page.component';

describe('CampaignsListPageComponent', () => {
  let component: CampaignsListPageComponent;
  let fixture: ComponentFixture<CampaignsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
