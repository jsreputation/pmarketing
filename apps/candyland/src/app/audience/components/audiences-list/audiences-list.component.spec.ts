import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import {
  MatTableModule,
} from '@angular/material';
import { AudiencesListComponent } from './audiences-list.component';
import { TranslateModule } from '@ngx-translate/core';
import { StatusLabelModule } from '@perxtech/candyshop';

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
