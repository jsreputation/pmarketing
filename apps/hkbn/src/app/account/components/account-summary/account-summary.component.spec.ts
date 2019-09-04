import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { AccountSummaryComponent } from './account-summary.component';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatSlideToggleModule
} from '@angular/material';
import { ReactiveFormsModule } from '@angular/forms';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { TextMaskModule } from 'angular2-text-mask';
import { TranslateModule } from '@ngx-translate/core';
import { IProfile } from '@perx/core';

const accountDataStud: IProfile = {
  id: 0,
  firstName: 'Temp',
  state: 'issued',
  lastName: 'Temp'
};

describe('AccountSummaryComponent', () => {
  let component: AccountSummaryComponent;
  let fixture: ComponentFixture<AccountSummaryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatFormFieldModule,
        MatCheckboxModule,
        MatInputModule,
        MatIconModule,
        TextMaskModule,
        MatButtonModule,
        ReactiveFormsModule,
        NoopAnimationsModule,
        MatSlideToggleModule,
        TranslateModule.forRoot(),
      ],
      declarations: [AccountSummaryComponent]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AccountSummaryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should path accountsummary', fakeAsync(()=>{
    const spy = spyOn(component.accountSummary, 'patchValue') ;
    component.accountData = accountDataStud;
    component.ngOnChanges();
    tick();
    expect(spy).toHaveBeenCalledWith(accountDataStud);
  }));
});
