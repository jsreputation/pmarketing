import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { QuizLongTextComponent } from './long-text.component';

describe('LongTextComponent', () => {
  let component: QuizLongTextComponent;
  let fixture: ComponentFixture<QuizLongTextComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizLongTextComponent],
      imports: [
        MatFormFieldModule,
        MatInputModule,
        NoopAnimationsModule
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizLongTextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
