import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewCampaignRewardsFormGroupComponent } from 'src/app/campaigns/components/new-campaign-rewards-form-group/new-campaign-rewards-form-group.component';
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

describe('NewCampaignRewardsStampsPageComponent', () => {
  let component: NewCampaignRewardsFormGroupComponent;
  let fixture: ComponentFixture<NewCampaignRewardsFormGroupComponent>;
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
      declarations: [NewCampaignRewardsFormGroupComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewCampaignRewardsFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // form = new FormGroup({}, []);
    // component.form = form;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
