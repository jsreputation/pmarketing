import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MerchantBranchComponent } from './merchant-branch.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';

describe('MerchantBranchComponent', () => {
  let component: MerchantBranchComponent;
  let fixture: ComponentFixture<MerchantBranchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MerchantBranchComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MerchantBranchComponent);
    component = fixture.componentInstance;
    component.group = new FormGroup({
      name: new FormControl(),
      address: new FormControl(),
      phone: new FormControl(),
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
