import { Component, OnInit } from '@angular/core';
import { Subject, ReplaySubject } from 'rxjs';
import { IQuiz } from '@perxtech/core';
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
    this.questions.next(quiz)
  }
}
