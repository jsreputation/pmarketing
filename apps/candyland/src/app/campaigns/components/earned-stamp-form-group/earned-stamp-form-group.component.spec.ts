import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EarnedStampFormGroupComponent } from './earned-stamp-form-group.component';

describe('EarnedStampFormGroupComponent', () => {
  let component: EarnedStampFormGroupComponent;
  let fixture: ComponentFixture<EarnedStampFormGroupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EarnedStampFormGroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EarnedStampFormGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
