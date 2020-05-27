import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizModule, SecondsToStringPipe } from '@perxtech/core';
import { ResultsComponent } from './results.component';
import { TranslateModule } from '@ngx-translate/core';

describe('ResultsComponent', () => {
  let component: ResultsComponent;
  let fixture: ComponentFixture<ResultsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ResultsComponent],
      imports: [QuizModule, TranslateModule.forRoot()],
      providers: [SecondsToStringPipe]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
