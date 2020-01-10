import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetaCardComponent } from './meta-card.component';
import { Component, Input } from '@angular/core';
import { Observable, of } from 'rxjs';
import { IData } from '../data.model';
import { DataService } from '../data.service';
import { MatProgressSpinnerModule, MatButtonModule, MatIconModule } from '@angular/material';

class GenericStubComponent { @Input() public data: Observable<IData>; }

@Component({ selector: 'pc-advanced-pie', template: '' })
class AdvancedPieStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-pie', template: '' })
class PieStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-grid-pie', template: '' })
class GridPieStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-horizontal-bar', template: '' })
class HorizontalBarStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-vertical-bar', template: '' })
class VerticalBarStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-line', template: '' })
class LineStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-map', template: '' })
class MapStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-trend', template: '' })
class TrendStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-table', template: '' })
class TableStubComponent extends GenericStubComponent { }
@Component({ selector: 'pc-calendar-heatmap', template: '' })
class CalendarHeatMapStubComponent extends GenericStubComponent { }

describe('MetaCardComponent', () => {
  let component: MetaCardComponent;
  let fixture: ComponentFixture<MetaCardComponent>;

  const dataServiceStub = {
    getData: () => of([])
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        MetaCardComponent,
        AdvancedPieStubComponent,
        PieStubComponent,
        GridPieStubComponent,
        HorizontalBarStubComponent,
        VerticalBarStubComponent,
        LineStubComponent,
        MapStubComponent,
        TrendStubComponent,
        TableStubComponent,
        CalendarHeatMapStubComponent
      ],
      providers: [
        { provide: DataService, useValue: dataServiceStub }
      ],
      imports: [
        MatProgressSpinnerModule,
        MatButtonModule,
        MatIconModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetaCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
