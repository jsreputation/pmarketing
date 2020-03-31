import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetabaseComponent } from './metabase.component';
import { PerxChartModule } from '@perxtech/chart';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { DataService, IData } from '@perxtech/chart';
import { of } from 'rxjs';

describe('MetabaseComponent', () => {
  let component: MetabaseComponent;
  let fixture: ComponentFixture<MetabaseComponent>;
  const mockData: IData = {
    // columns: [],
    cols: [],
    rows: [],
    insights: null
  };
  const dataServiceStub: Partial<DataService> = {
    getData: () => of(mockData)
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [MetabaseComponent],
      imports: [
        PerxChartModule,
        NoopAnimationsModule
      ],
      providers: [
        { provide: DataService, useValue: dataServiceStub }
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MetabaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
