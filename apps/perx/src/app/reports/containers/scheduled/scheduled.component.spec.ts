import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduledComponent } from './scheduled.component';
import { UnderConstructionModule } from '../../../shared/under-construction/under-construction.module';

describe('ScheduledComponent', () => {
  let component: ScheduledComponent;
  let fixture: ComponentFixture<ScheduledComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ScheduledComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduledComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
