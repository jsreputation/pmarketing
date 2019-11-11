import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FeedReaderService, FeedItem } from '@perx/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.scss']
})
export class LandingComponent implements OnInit {

  public newsFeedItems: Observable<FeedItem[]>;
  public title: string = 'Title';
  public subTitle: string = 'Subtitle';

  constructor( private router: Router, private feedService: FeedReaderService) { }

  public ngOnInit(): void {
    this.newsFeedItems = this.feedService.getFromUrl('https://cdn.perxtech.io/content/starhub/rss.xml');
  }

  public onLogin(): void {
    this.router.navigateByUrl('/signin');
  }

  public onSignUp(): void {
    this.router.navigateByUrl('/signup');
  }
}
