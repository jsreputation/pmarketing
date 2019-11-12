import { Component, Input } from '@angular/core';
import { FeedItem} from '../feed-reader.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent {

  @Input()
  public items$: Observable<FeedItem[]>;

  public readMoreClicked(): void {
    console.log('Read More clicked');
  }

}
