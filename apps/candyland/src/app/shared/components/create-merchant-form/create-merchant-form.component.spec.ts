import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateMerchantFormComponent } from './create-merchant-form.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormArray, FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TestComponentsModule } from '@cl-shared/test-components/test-components.module';
import { TranslateModule } from '@ngx-translate/core';

describe('CreateMerchantFormComponent', () => {
  let component: CreateMerchantFormComponent;
  let fixture: ComponentFixture<CreateMerchantFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CreateMerchantFormComponent],
      imports: [
        HttpClientTestingModule,
        ReactiveFormsModule,
        MatSelectModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        TestComponentsModule,
        TranslateModule.forRoot(),
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateMerchantFormComponent);
    component = fixture.componentInstance;
    component.formMerchant = new FormGroup({
      name: new FormControl(),
      description: new FormControl(),
      weblink: new FormControl(),
      image: new FormControl(),
      branches: new FormArray([]),
      countryCode: new FormControl(),
      phone: new FormControl(),
      address: new FormControl(),
      city: new FormControl(),
      state: new FormControl(),
      postalCode: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
