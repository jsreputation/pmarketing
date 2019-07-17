import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignSelectTemplatePageComponent } from './new-campaign-select-template-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { TableFiltersModule } from '@cl-shared/table/table-filters/table-filters.module';
import { MatRadioModule, MatSelectModule } from '@angular/material';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

describe('NewCampaignSelectTemplatePageComponent', () => {
  let component: NewCampaignSelectTemplatePageComponent;
  let fixture: ComponentFixture<NewCampaignSelectTemplatePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        BrowserAnimationsModule,
        HttpClientTestingModule,
        ReactiveFormsModule,
        TableFiltersModule,
        MatRadioModule,
        MatSelectModule
      ],
      declarations: [NewCampaignSelectTemplatePageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignSelectTemplatePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
