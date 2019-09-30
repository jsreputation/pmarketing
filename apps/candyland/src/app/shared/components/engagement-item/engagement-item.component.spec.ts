import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementItemComponent } from './engagement-item.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { MatMenuModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';

describe('EngagementItemComponent', () => {
  let component: EngagementItemComponent;
  let fixture: ComponentFixture<EngagementItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EngagementItemComponent],
      imports: [
        RouterTestingModule,
        PipesModule,
        MatMenuModule,
        MatIconModule
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
