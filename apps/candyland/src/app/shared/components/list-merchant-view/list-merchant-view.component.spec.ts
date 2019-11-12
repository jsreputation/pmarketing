import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListMerchantViewComponent } from './list-merchant-view.component';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { CustomDataSource, TableFiltersModule } from '@cl-shared/table';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { MatSelectModule } from '@angular/material/select';
import { MatMenuModule } from '@angular/material/menu';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { of } from 'rxjs';

describe('ListMerchantViewComponent', () => {
  let component: ListMerchantViewComponent;
  let fixture: ComponentFixture<ListMerchantViewComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ListMerchantViewComponent],
      schemas: [NO_ERRORS_SCHEMA],
      imports: [
        StatusLabelModule,
        TableFiltersModule,
        BrowserAnimationsModule,
        MatIconModule,
        MatButtonModule,
        MatFormFieldModule,
        MatInputModule,
        MatSortModule,
        MatTableModule,
        MatSelectModule,
        MatMenuModule,
        PipesModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListMerchantViewComponent);
    component = fixture.componentInstance;
    component.dataSource = new CustomDataSource({getTableData: (params: any) => {return of({

        data: [(params)],
        meta: {
        'page_count': 1,
        'record_count': 3
      }
      })}});
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
