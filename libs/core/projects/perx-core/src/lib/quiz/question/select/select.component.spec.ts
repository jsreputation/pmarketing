import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatInputModule } from '@angular/material/input';
import { MatRadioModule } from '@angular/material/radio';
import { MatSelectModule } from '@angular/material/select';
import { QuizSelectComponent } from './select.component';

describe('SelectComponent', () => {
  let component: QuizSelectComponent;
  let fixture: ComponentFixture<QuizSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizSelectComponent],
      imports: [
        MatCheckboxModule,
        MatRadioModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        ReactiveFormsModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
