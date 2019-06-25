import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStampRulesPageComponent } from './new-stamp-rules-page.component';

describe('NewStampRulesPageComponent', () => {
  let component: NewStampRulesPageComponent;
  let fixture: ComponentFixture<NewStampRulesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewStampRulesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewStampRulesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
