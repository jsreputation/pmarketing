import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RewardsListComponent } from './rewards-list.component';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { ButtonModule, ProgressBarModule } from '@perx/candyshop';
import { RouterTestingModule } from '@angular/router/testing';
import { CustomDataSource } from '@cl-shared/table';
import { of } from 'rxjs';
// tslint:disable
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TranslateModule } from '@ngx-translate/core';

describe('RewardsListComponent', () => {
  let component: RewardsListComponent;
  let fixture: ComponentFixture<RewardsListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [RewardsListComponent],
      imports: [
        MatSortModule,
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        MatButtonModule,
        ButtonModule,
        ProgressBarModule,
        RouterTestingModule,
        BrowserAnimationsModule,
        TranslateModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA],
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RewardsListComponent);
    component = fixture.componentInstance;
    component.dataSource = new CustomDataSource({
      getTableData: (params: any) => {
        return of({

          data: [(params)],
          meta: {
            'page_count': 1,
            'record_count': 3
          }
        });
      }
    });
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
