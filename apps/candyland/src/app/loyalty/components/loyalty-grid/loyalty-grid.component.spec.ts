import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoyaltyGridComponent } from 'src/app/loyalty/components/loyalty-grid/loyalty-grid.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MatTableDataSource } from '@angular/material';

describe('EngagementsGridComponent', () => {
  let component: LoyaltyGridComponent;
  let dataSource: MatTableDataSource<IEngagement>;
  let fixture: ComponentFixture<LoyaltyGridComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LoyaltyGridComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoyaltyGridComponent);
    dataSource = new MatTableDataSource<IEngagement>();
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
