import { Component, OnInit } from '@angular/core';
import { IQuiz, QuizQuestionType } from '@perxtech/core';
import { ReplaySubject, Subject } from 'rxjs';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent implements OnInit {
  public questions: Subject<IQuiz> = new ReplaySubject();
  public totalLength: number = 0;
  public currentPointer: number = 0;

  public ngOnInit(): void {
    const quiz: IQuiz = {
      title: 'Question pour un champion',
      questions: [
        {
          question: 'Quel est le premier doigt de la main de l\'homme et de certains vertébrés?',
          required: true,
          payload: {
            type: QuizQuestionType.multipleChoice,
            choices: [
              'Pouce',
              'Index',
              'Majeur',
              'Annulaire',
              'Auriculaire'
            ]
          }
        },
        {
          question: 'Suite à la réforme territoriale, combien la France métropolitaine compte-t-elle de régions ?',
          required: true,
          payload: {
            type: QuizQuestionType.rating,
            scale: 20
          }
        }
      ],
      results: {}
    };
    this.questions.next(quiz);
  }
}
