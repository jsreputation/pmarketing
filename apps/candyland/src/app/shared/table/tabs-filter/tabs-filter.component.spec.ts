import { MatTabsModule } from '@angular/material';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TabsFilterComponent } from './tabs-filter.component';
import { PipesModule } from '@cl-shared/pipes/pipes.module';

describe('TabsFilterComponent', () => {
  let component: TabsFilterComponent;
  let fixture: ComponentFixture<TabsFilterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TabsFilterComponent],
      imports: [PipesModule, MatTabsModule]
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
