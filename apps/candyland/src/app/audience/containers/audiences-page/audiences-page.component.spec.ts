import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesPageComponent } from './audiences-page.component';

describe('AudiencesPageComponent', () => {
  let component: AudiencesPageComponent;
  let fixture: ComponentFixture<AudiencesPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AudiencesPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
