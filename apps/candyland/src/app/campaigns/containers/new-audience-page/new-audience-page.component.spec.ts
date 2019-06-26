import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewAudiencePageComponent } from './new-audience-page.component';

describe('NewAudiencePageComponent', () => {
  let component: NewAudiencePageComponent;
  let fixture: ComponentFixture<NewAudiencePageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewAudiencePageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewAudiencePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
