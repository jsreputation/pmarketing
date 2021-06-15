import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PendingTeamComponent } from './pending-team.component';

describe('PendingTeamComponent', () => {
  let component: PendingTeamComponent;
  let fixture: ComponentFixture<PendingTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PendingTeamComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PendingTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
