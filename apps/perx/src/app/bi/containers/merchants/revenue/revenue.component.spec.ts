import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RevenueComponent } from './revenue.component';
import { UnderConstructionModule } from '../../../../shared/under-construction/under-construction.module';

describe('RevenueComponent', () => {
  let component: RevenueComponent;
  let fixture: ComponentFixture<RevenueComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RevenueComponent],
      imports: [UnderConstructionModule]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RevenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
