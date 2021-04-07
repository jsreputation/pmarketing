import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { QuizPictureSelectComponent } from './picture-select.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

describe('PictureSelectComponent', () => {
  let component: QuizPictureSelectComponent;
  let fixture: ComponentFixture<QuizPictureSelectComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [QuizPictureSelectComponent],
      imports: [
        MatCheckboxModule,
        MatRadioModule,
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(QuizPictureSelectComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
