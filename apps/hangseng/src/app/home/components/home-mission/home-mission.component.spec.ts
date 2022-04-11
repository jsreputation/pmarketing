import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeMissionComponent } from './home-mission.component';

describe('HomeMissionComponent', () => {
  let component: HomeMissionComponent;
  let fixture: ComponentFixture<HomeMissionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HomeMissionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeMissionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
