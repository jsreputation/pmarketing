import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsListComponent } from './engagements-list.component';

describe('EngagementsListComponent', () => {
  let component: EngagementsListComponent;
  let fixture: ComponentFixture<EngagementsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
