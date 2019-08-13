import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MetabaseComponent } from './metabase.component';
import { PerxChartModule } from '@perx/chart';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

describe('MetabaseComponent', () => {
  let component: MetabaseComponent;
  let fixture: ComponentFixture<MetabaseComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MetabaseComponent ],
      imports: [
        PerxChartModule,
        HttpClientTestingModule,
        NoopAnimationsModule
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
