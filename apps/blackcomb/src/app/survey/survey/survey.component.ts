import { Component } from '@angular/core';
import { NotificationService } from '@perx/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent {
  constructor(private notificationService: NotificationService, private router: Router) { }
  public onSubmit(): void {
    this.router.navigate(['/wallet']);
    this.notificationService.addPopup({
      text: 'Here is a reward for you.',
      title: 'Thanks for completing the survey.',
      buttonTxt: 'View Reward',
      imageUrl: 'assets/congrats_image.png'
    });
  }
}
