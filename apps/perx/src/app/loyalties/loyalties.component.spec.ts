import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltiesComponent } from './loyalties.component';
import { RouterTestingModule } from '@angular/router/testing';

describe('LoyaltiesComponent', () => {
  let component: LoyaltiesComponent;
  let fixture: ComponentFixture<LoyaltiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltiesComponent],
      imports: [RouterTestingModule]
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
