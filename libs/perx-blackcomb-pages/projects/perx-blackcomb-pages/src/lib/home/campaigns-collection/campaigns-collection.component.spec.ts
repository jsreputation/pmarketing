import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CampaignsCollectionComponent } from './campaigns-collection.component';
import {MatCardModule} from '@angular/material/card';
import {RouterTestingModule} from '@angular/router/testing';
import {TranslateModule} from '@ngx-translate/core';

describe('CampaignsCollectionComponent', () => {
  let component: CampaignsCollectionComponent;
  let fixture: ComponentFixture<CampaignsCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CampaignsCollectionComponent ],
      imports: [
        MatCardModule,
        RouterTestingModule,
        TranslateModule.forRoot()
      ]
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
