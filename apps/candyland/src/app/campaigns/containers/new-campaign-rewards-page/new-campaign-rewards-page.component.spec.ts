import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsPageComponent } from './new-campaign-rewards-page.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('NewCampaignRewardsPageComponent', () => {
  let component: NewCampaignRewardsPageComponent;
  let fixture: ComponentFixture<NewCampaignRewardsPageComponent>;
  // let form: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NoopAnimationsModule,
        ReactiveFormsModule,
        MatCheckboxModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule
      ],
      declarations: [NewCampaignRewardsPageComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // form = new FormGroup({}, []);
    // component.form = form;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
