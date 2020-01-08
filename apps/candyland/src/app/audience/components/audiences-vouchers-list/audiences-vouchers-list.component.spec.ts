import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AudiencesVouchersListComponent } from './audiences-vouchers-list.component';
import { MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@cl-shared/pipes/pipes.module';

describe('AudiencesVouchersListComponent', () => {
  let component: AudiencesVouchersListComponent;
  let fixture: ComponentFixture<AudiencesVouchersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatMenuModule,
        MatIconModule,
        RouterTestingModule,
        PipesModule,
        TranslateModule.forRoot(),
      ],
      providers: [],
      declarations: [
        AudiencesVouchersListComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesVouchersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
