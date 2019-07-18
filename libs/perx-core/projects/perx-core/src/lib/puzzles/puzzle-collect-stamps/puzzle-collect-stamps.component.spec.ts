import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PuzzleCollectStampsComponent } from './puzzle-collect-stamps.component';

describe('PuzzleCollectStampsComponent', () => {
  let component: PuzzleCollectStampsComponent;
  let fixture: ComponentFixture<PuzzleCollectStampsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PuzzleCollectStampsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PuzzleCollectStampsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
