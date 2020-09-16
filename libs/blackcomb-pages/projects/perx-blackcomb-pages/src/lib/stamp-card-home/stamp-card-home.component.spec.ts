import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampCardHomeComponent } from './stamp-card-home.component';

describe('StampCardHomeComponent', () => {
  let component: StampCardHomeComponent;
  let fixture: ComponentFixture<StampCardHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampCardHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampCardHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
