import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { AudiencesVouchersListComponent } from './audiences-vouchers-list.component';
import { MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';

describe('AudiencesVouchersListComponent', () => {
  let component: AudiencesVouchersListComponent;
  let fixture: ComponentFixture<AudiencesVouchersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        MatMenuModule,
        MatIconModule
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
