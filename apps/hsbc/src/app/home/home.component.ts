import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  puzzleCount = 6;
  
  constructor(private router: Router) { }

  ngOnInit() {
  }

  onRoute(id: string) {
    this.router.navigate([`/voucher/${id}`]);
  }
}
