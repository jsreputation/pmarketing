import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltiesComponent } from './loyalties.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';

describe('LoyaltiesComponent', () => {
  let component: LoyaltiesComponent;
  let fixture: ComponentFixture<LoyaltiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [LoyaltiesComponent],
      imports: [UnderConstructionModule]
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
