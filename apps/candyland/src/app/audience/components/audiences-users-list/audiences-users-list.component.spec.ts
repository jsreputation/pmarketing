import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTableModule,
  MatMenuModule,
  MatIconModule
} from '@angular/material';
import { AudiencesUsersListComponent } from './audiences-users-list.component';
import { RouterTestingModule } from '@angular/router/testing';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { TranslateModule } from '@ngx-translate/core';

describe('AudiencesUsersListComponent', () => {
  let component: AudiencesUsersListComponent;
  let fixture: ComponentFixture<AudiencesUsersListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        RouterTestingModule,
        StatusLabelModule,
        MatMenuModule,
        MatIconModule,
        TranslateModule.forRoot(),
      ],
      providers: [],
      declarations: [
        AudiencesUsersListComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesUsersListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
