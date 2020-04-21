import { Component, Input, HostListener, OnInit } from '@angular/core';
import { FeedItem } from '../feed-reader.service';
import { MatDialog } from '@angular/material';
import { FeedItemPopupComponent } from '../feed-item-popup/feed-item-popup.component';
import { Observable } from 'rxjs';

@Component({
  selector: 'perx-core-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  // will be passed down to the dialog from readMoreClicked
  @Input()
  public items$: Observable<FeedItem[] | undefined>;

  public items: FeedItem[] = [] as FeedItem[];
  public itemSize: number;
  public newsBeforeScroll: number[];
  public newsAfterScroll: number[];
  public showButton: boolean = true;

  constructor(
    private dialog: MatDialog,
  ) { }

  public ngOnInit(): void {
    this.itemSize = window.innerWidth;
    if (this.items$) {
      this.items$.subscribe((res: FeedItem[]) => {
        this.items = res;
      });
    }
  }

  public updateScrollIndex(index: number): void {
    this.newsBeforeScroll = Array(index >= 0 ? index : 0);
    if (this.items && this.items.length > 0 && index >= 0) {
      this.newsAfterScroll = Array(this.items.length - index - 1);
    } else {
      this.newsAfterScroll = [];
    }
  }

  @HostListener('window:resize')
  public onResize(): void {
    this.itemSize = window.innerWidth;
  }

  public readMore(item: FeedItem): void {
    this.dialog.open(FeedItemPopupComponent, {
      panelClass: 'app-full-bleed-dialog',
      data: { ...item, ...(this.showButton ? {} : { hideButton: true }) },
      height: '85vh',
      minWidth: '35.5rem',
      maxWidth: '94vw'
    });
  }

  public getFirstLine(text: string): string {
    const lines = text.match(/[^\r\n]+/g) || [];
    const firstLineContent = lines && lines.length > 0 ? lines[0] : '';
    return firstLineContent.length > 120 ? `${firstLineContent.slice(0, 120)}...` : firstLineContent;
  }

}
