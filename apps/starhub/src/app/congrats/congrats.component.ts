import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-congrats',
  templateUrl: './congrats.component.html',
  styleUrls: ['./congrats.component.scss']
})
export class CongratsComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit() {
  }

  public viewReward(id: number): void {
    this.router.navigate(['/reward'], { queryParams: { id: id } });
  }
}
