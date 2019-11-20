import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {  Subject } from 'rxjs';
import { CampaignCreationStoreService } from 'src/app/campaigns/services/campaigns-creation-store.service';
import { StepConditionService } from 'src/app/campaigns/services/step-condition.service';

import { NewCampaignRewardsPageComponent } from './new-campaign-rewards-page.component';
// tslint:disable
import { Component, forwardRef, NO_ERRORS_SCHEMA } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
} from '@angular/material';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
//  tslint:disable
@Component({
  selector: 'cl-new-campaign-rewards-form-group',
  template: '',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NewCampaignRewardsFormGroupComponent),
      multi: true
    }
  ]
})
class NewCampaignRewardsFormGroupComponent implements ControlValueAccessor {
  registerOnChange(fn: any): void {
    console.log(fn);
  }

  registerOnTouched(fn: any): void {
    console.log(fn);
  }

  setDisabledState(isDisabled: boolean): void {
    console.log(isDisabled);
  }

  writeValue(obj: any): void {
    console.log(obj);
  }

}

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
        MatButtonModule,
        RouterModule.forRoot([]),
        TranslateModule.forRoot(),
      ],
      declarations: [NewCampaignRewardsPageComponent,
        NewCampaignRewardsFormGroupComponent],
      providers: [
        {provide: CampaignCreationStoreService, useValue: {
            updateCampaign: (data: any) => data,
            currentCampaign$: new Subject()}},
        {provide: StepConditionService, useValue: {registerStepCondition: () => ({}) }},
      ],
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
