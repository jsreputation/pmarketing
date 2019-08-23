import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EngagementsGridComponent } from './engagements-grid.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableDataSource } from '@angular/material';
import { Engagement } from '@cl-core/models/engagement.model';

describe('EngagementsGridComponent', () => {
  let component: EngagementsGridComponent;
  let dataSource: MatTableDataSource<Engagement>;
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
    dataSource = new MatTableDataSource<Engagement>();
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
