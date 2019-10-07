import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StampsListComponent } from './stamps-list.component';

describe('StampsListComponent', () => {
  let component: StampsListComponent;
  let fixture: ComponentFixture<StampsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StampsListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StampsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
