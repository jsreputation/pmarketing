import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabItemViewComponent } from './tab-item-view.component';

describe('TabItemViewComponent', () => {
  let component: TabItemViewComponent;
  let fixture: ComponentFixture<TabItemViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TabItemViewComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TabItemViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
