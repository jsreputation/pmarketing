import { Component, Input } from '@angular/core';
import { FeedItem } from '../feed-reader.service';
import { MatDialog } from '@angular/material';
import { FeedItemPopupComponent } from '../feed-item-popup/feed-item-popup.component';
import { Observable, of } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'perx-core-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent {
  // will be passed down to the dialog from readMoreClicked
  @Input()
  public items$: Observable<FeedItem[] | undefined>;
  public newsBeforeScroll: number[];
  public newsAfterScroll: number[];
  public showButton: boolean = true;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService
  ) { }

  public readMore(item: FeedItem): void {
    this.translate.get([item.title || '', item.description || '']).subscribe(res => {
      this.dialog.open(FeedItemPopupComponent, {
        panelClass: 'app-full-bleed-dialog',
        data: {
          ...item,
          ...(this.showButton ? {} : { hideButton: true }),
          title: item.title ? res[item.title] : '',
          description: item.description ? res[item.description] : ''
        },
        height: '85vh',
        minWidth: '35.5rem',
        maxWidth: '94vw'
      });
    });
  }

  public getFirstLineShortTxt(text: string): Observable<string> {
    if (!text) {
      return of('');
    }
    return this.translate.get(text).pipe(
      map(txt => {
        const lines = txt.match(/[^\r\n]+/g) || [];
        const firstLine = lines && lines.length > 0 ? lines[0] : '';
        return firstLine.length > 120 ? `${firstLine.slice(0, 120)}...` : firstLine;
      })
    );
  }

}
