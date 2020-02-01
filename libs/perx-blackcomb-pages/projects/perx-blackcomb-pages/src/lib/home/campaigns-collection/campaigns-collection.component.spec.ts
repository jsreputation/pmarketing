import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsCollectionComponent } from './campaigns-collection.component';

describe('CampaignsCollectionComponent', () => {
  let component: CampaignsCollectionComponent;
  let fixture: ComponentFixture<CampaignsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsCollectionComponent ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CampaignsCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
