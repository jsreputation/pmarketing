import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent {
  public title: string = 'CONGRATULATIONS!';
  public subTitle: string = 'You have unlocked 1 out of 6 months of Netflix rebate!';

  constructor(private router: Router) { }

  public onBackToGame(): void {
    this.router.navigate(['bpi/game']);
  }

}
