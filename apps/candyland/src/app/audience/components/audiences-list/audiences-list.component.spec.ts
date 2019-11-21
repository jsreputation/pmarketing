import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTableModule,
} from '@angular/material';
import { StatusLabelModule } from '@cl-shared/components/status-label/status-label.module';
import { AudiencesListComponent } from './audiences-list.component';
import { TranslateModule } from '@ngx-translate/core';

describe('AudiencesListComponent', () => {
  let component: AudiencesListComponent;
  let fixture: ComponentFixture<AudiencesListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        MatTableModule,
        StatusLabelModule,
        TranslateModule.forRoot(),
      ],
      providers: [],
      declarations: [
        AudiencesListComponent,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AudiencesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
