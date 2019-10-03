import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsComponent } from './rewards.component';
import { RouterTestingModule } from '@angular/router/testing';
import { MatDialogModule, MatTabsModule } from '@angular/material';

describe('RewardsComponent', () => {
  let component: RewardsComponent;
  let fixture: ComponentFixture<RewardsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule,
        MatTabsModule,
        MatDialogModule
      ],
      declarations: [RewardsComponent],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
