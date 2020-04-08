import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MiniRankComponent } from './mini-rank.component';

describe('MiniRankComponent', () => {
  let component: MiniRankComponent;
  let fixture: ComponentFixture<MiniRankComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MiniRankComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MiniRankComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
