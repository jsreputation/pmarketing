import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewReviewPageComponent } from './new-review-page.component';

describe('NewReviewPageComponent', () => {
  let component: NewReviewPageComponent;
  let fixture: ComponentFixture<NewReviewPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewReviewPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewReviewPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
