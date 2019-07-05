import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsFilterComponent } from './tabs-filter.component';

describe('TabsFilterComponent', () => {
  let component: TabsFilterComponent;
  let fixture: ComponentFixture<TabsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabsFilterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabsFilterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
