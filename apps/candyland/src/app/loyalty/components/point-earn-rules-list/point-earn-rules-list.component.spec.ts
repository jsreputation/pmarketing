import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { PointEarnRulesListComponent } from './point-earn-rules-list.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';

describe('PointEarnRulesListComponent', () => {
  let component: PointEarnRulesListComponent;
  let fixture: ComponentFixture<PointEarnRulesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PointEarnRulesListComponent],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PointEarnRulesListComponent);
    component = fixture.componentInstance;
    // component.dataSource = new CustomDataSource({
    //   getTableData: (params: any) => {
    //     return of({
    //
    //       data: [(params)],
    //       meta: {
    //         'page_count': 1,
    //         'record_count': 3
    //       }
    //     });
    //   }
    // });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
