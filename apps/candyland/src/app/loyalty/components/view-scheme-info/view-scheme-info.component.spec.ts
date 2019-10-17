import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSchemeInfoComponent } from './view-scheme-info.component';

describe('ViewSchemeInfoComponent', () => {
  let component: ViewSchemeInfoComponent;
  let fixture: ComponentFixture<ViewSchemeInfoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewSchemeInfoComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewSchemeInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
