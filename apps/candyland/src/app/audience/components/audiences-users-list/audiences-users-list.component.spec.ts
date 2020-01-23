import {
  async,
  ComponentFixture,
  TestBed,
} from '@angular/core/testing';
import {
  MatTableModule,
  MatMenuModule,
  MatIconModule,
  MatDialogModule
} from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { AudiencesUserService } from '@cl-core/services/audiences-user.service';
import { TranslateModule } from '@ngx-translate/core';

import { AudiencesUsersListComponent } from './audiences-users-list.component';
import {MessageService} from '@cl-core-services';
import { MockAudiencesUserService } from '@cl-shared/test-components/providers/mock-audiences-user.service';
import { StatusLabelModule } from '@perx/candyshop';

describe('AudiencesUsersListComponent', () => {
  let component: AudiencesUsersListComponent;
  let fixture: ComponentFixture<AudiencesUsersListComponent>;
  const msgSvcStub: Partial<MessageService> = {
    show: () => ({})
  };

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        RouterTestingModule,
        StatusLabelModule,
        MatMenuModule,
        MatIconModule,
        MatDialogModule,
        HttpClientTestingModule,
        TranslateModule.forRoot(),
      ],
      providers: [
        {
          provide: MessageService, useValue: msgSvcStub
        },
        {
          provide: AudiencesUserService, useClass: MockAudiencesUserService
        }
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
