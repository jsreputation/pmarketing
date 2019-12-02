import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule,
  MatSnackBarModule,
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { TranslateModule } from '@ngx-translate/core';

import { AudiencesUsersListComponent } from './audiences-users-list.component';

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
        MatDialogModule,
        MatSnackBarModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        AudiencesUserService,
      ],
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
