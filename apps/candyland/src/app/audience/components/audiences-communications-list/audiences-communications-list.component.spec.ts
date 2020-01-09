import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AudiencesCommunicationsListComponent } from './audiences-communications-list.component';
import { MatTableModule, MatMenuModule, MatIconModule } from '@angular/material';
import { RouterTestingModule } from '@angular/router/testing';
import { PipesModule } from '@cl-shared/pipes/pipes.module';
import { TranslateModule } from '@ngx-translate/core';

describe('AudiencesCommunicationsListComponent', () => {
  let component: AudiencesCommunicationsListComponent;
  let fixture: ComponentFixture<AudiencesCommunicationsListComponent>;

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
        AudiencesCommunicationsListComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesCommunicationsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
