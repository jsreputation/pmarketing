import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementItemComponent } from './engagement-item.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';

describe('EngagementItemComponent', () => {
  let component: EngagementItemComponent;
  let fixture: ComponentFixture<EngagementItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementItemComponent],
      imports: [
        PipesModule
      ],
      schemas: []
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
