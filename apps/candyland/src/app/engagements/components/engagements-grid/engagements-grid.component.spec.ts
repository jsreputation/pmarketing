import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsGridComponent } from './engagements-grid.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { IEngagementType } from '@cl-core/models/engagement/engagement.interface';

describe('EngagementsGridComponent', () => {
  let component: EngagementsGridComponent;
  let dataSource: MatTableDataSource<IEngagementType>;
  let fixture: ComponentFixture<EngagementsGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        EngagementsGridComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EngagementsGridComponent);
    dataSource = new MatTableDataSource<IEngagementType>();
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
