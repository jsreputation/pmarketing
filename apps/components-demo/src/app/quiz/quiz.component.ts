import { Component } from '@angular/core';
import { INavLink } from '../navlink.model';

@Component({
  selector: 'app-quiz',
  templateUrl: './quiz.component.html',
  styleUrls: ['./quiz.component.css']
})
export class QuizComponent {
  public navLinks: INavLink[] = [
    { path: 'core', label: 'PerxCore' },
    { path: 'bc/1', label: 'Blackcomb' }
  ];
}
