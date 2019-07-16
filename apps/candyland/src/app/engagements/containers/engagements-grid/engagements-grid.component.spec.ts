import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsGridComponent } from './engagements-grid.component';

describe('EngagementsGridComponent', () => {
  let component: EngagementsGridComponent;
  let fixture: ComponentFixture<EngagementsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementsGridComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
