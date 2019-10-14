// tslint:disable-next-line:import-blacklist
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';
import { LoyaltyGridComponent } from 'src/app/loyalty/components/loyalty-grid/loyalty-grid.component';

describe('LoyaltyGridComponent', () => {
  let component: LoyaltyGridComponent;
  let fixture: ComponentFixture<LoyaltyGridComponent>;
  let dataSource: any;

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
    dataSource = {
      data$: of([])
    };
    component = fixture.componentInstance;
    component.dataSource = dataSource;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
