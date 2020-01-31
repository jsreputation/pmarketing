import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltiesComponent } from './loyalties.component';

describe('LoyaltiesComponent', () => {
  let component: LoyaltiesComponent;
  let fixture: ComponentFixture<LoyaltiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoyaltiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
