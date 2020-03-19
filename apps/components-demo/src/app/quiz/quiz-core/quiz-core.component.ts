import { Component, OnInit } from '@angular/core';
import { IQuiz } from '@perxtech/core';
import { ReplaySubject, Subject } from 'rxjs';
import { quiz } from '../mock';

@Component({
  selector: 'app-quiz-core',
  templateUrl: './quiz-core.component.html',
  styleUrls: ['./quiz-core.component.scss']
})
export class QuizCoreComponent implements OnInit {
  public questions: Subject<IQuiz> = new ReplaySubject();
  public totalLength: number = 0;
  public currentPointer: number = 0;

  public ngOnInit(): void {
    this.questions.next(quiz);
  }
}
