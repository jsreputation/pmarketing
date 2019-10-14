import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectAudienceComponent } from './select-audience.component';

describe('SelectAudienceComponent', () => {
  let component: SelectAudienceComponent;
  let fixture: ComponentFixture<SelectAudienceComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SelectAudienceComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SelectAudienceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
