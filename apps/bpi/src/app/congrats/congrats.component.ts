import { Component } from '@angular/core';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {
  public title: string = 'CONGRATULATIONS!';
  public subTitle: string = 'You have unlocked 1 out of 6 months of Netflix rebate!';

}
