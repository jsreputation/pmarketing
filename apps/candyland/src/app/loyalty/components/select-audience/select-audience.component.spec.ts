import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormControl, FormGroup } from '@angular/forms';
import { SelectAudienceComponent } from './select-audience.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

describe('SelectAudienceComponent', () => {
  let component: SelectAudienceComponent;
  let fixture: ComponentFixture<SelectAudienceComponent>;
  let group: FormGroup;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [SelectAudienceComponent],
      imports: [TranslateModule.forRoot()],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAudienceComponent);
    component = fixture.componentInstance;
    group = new FormGroup({poolId: new FormControl('1')});
    component.group = group;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
