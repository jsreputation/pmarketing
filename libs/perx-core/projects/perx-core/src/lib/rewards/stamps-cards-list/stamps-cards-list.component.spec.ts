import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampsCardsListComponent } from './stamps-cards-list.component';

describe('StampsCardsListComponent', () => {
  let component: StampsCardsListComponent;
  let fixture: ComponentFixture<StampsCardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampsCardsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampsCardsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
