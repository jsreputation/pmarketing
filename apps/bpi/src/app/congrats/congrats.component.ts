import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {
  public title: string = 'CONGRATULATIONS!';
  public subTitles: string[] = ['You have unlocked 1 out of 6 months', 'of Netflix rebate!'];
  public path: string;

  constructor(private router: Router, private activatedRoute: ActivatedRoute) { }

  public ngOnInit(): void {
    this.path = this.activatedRoute.snapshot.url[0].path;
  }

  public onBackToGame(): void {
    this.router.navigate(['bpi/game']);
  }

}
