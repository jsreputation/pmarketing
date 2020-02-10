import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleReportCardComponent } from './single-report-card.component';
// tslint:disable-next-line
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { DynamicGraphicDirective } from './shared/dynamic-graphic.directive';
import { QuestionTypeModule } from '@cl-shared';
import { TranslateModule } from '@ngx-translate/core';
describe('SingleReportCardComponent', () => {
  let component: SingleReportCardComponent;
  let fixture: ComponentFixture<SingleReportCardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        SingleReportCardComponent,
        DynamicGraphicDirective,
      ],
      imports: [
        QuestionTypeModule,
        TranslateModule.forRoot()
      ],
      schemas: [NO_ERRORS_SCHEMA]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleReportCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
