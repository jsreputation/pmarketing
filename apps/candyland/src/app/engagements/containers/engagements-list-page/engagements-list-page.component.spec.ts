import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsListPageComponent } from './engagements-list-page.component';

describe('EngagementsListPageComponent', () => {
  let component: EngagementsListPageComponent;
  let fixture: ComponentFixture<EngagementsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EngagementsListPageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
