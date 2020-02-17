import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewsFeedComponent } from './news-feed.component';
import { MatCardModule, MatButtonModule, MatDialogModule, MatDialog } from '@angular/material';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { SettingsService, FeedReaderService } from '@perx/core';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { of } from 'rxjs';

describe('NewsFeedComponent', () => {
  let component: NewsFeedComponent;
  let fixture: ComponentFixture<NewsFeedComponent>;

  const feedReaderServiceStub: Partial<FeedReaderService> = {
    getFromUrl: () => of([])
  };

  const settingsServiceStub: Partial<SettingsService> = {
    readRssFeeds: () => of()
  };

  const items = [
    {
      title: '',
      description: 'Goodbye collecting points, Hello rewards in a snap!\n\nBecause change means no more rewards points and hello to instant deals.\n\nWith rewards from all your favourite brands, you can now enjoy everything you love, anytime you want.\n\nPlus, it’s all in one place now. For you to enjoy, in a snap.',
      link: 'https://www.starhub.com/personal/rewards/starhub-rewards-programme/starhub-rewards.html',
      image: 'https://perx-cdn-staging.s3.amazonaws.com/merchant/account/photo_url/34/sh-rewards-hero-d990e310-78b7-43fe-b632-04d9b15ffd31.png',
      guid: 'TMRlovehate190813',
      pubDate: new Date('2019-09-03T09:46:03.000Z'),
    },
    {
      title: '',
      description: 'Goodbye collecting points, Hello rewards in a snap!\n\nBecause change means no more rewards points and hello to instant deals.\n\nWith rewards from all your favourite brands, you can now enjoy everything you love, anytime you want.\n\nPlus, it’s all in one place now. For you to enjoy, in a snap.',
      link: 'https://www.starhub.com/personal/rewards/starhub-rewards-programme/starhub-rewards.html',
      image: 'https://perx-cdn-staging.s3.amazonaws.com/merchant/account/photo_url/34/sh-rewards-hero-d990e310-78b7-43fe-b632-04d9b15ffd31.png',
      guid: 'TMRlovehate190813',
      pubDate: new Date('2019-09-03T09:46:03.000Z'),
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsFeedComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        NgxMultiLineEllipsisModule,
        MatDialogModule,
        ScrollingModule
      ],
      providers: [
        { provide: FeedReaderService, useValue: feedReaderServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub},
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsFeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('updateScrollIndex', () => {
    it('should update newsAfterScroll to Array(0) on updateScrollIndex', () => {
      component.items = items;
      component.updateScrollIndex(1);
      expect(component.newsAfterScroll).toEqual(Array(0));
    });

    it('should update newsAfterScroll to [] on updateScrollIndex', () => {
      component.items = [];
      component.updateScrollIndex(0);
      expect(component.newsAfterScroll).toEqual([]);
    });
  });

  it('should update itemSize onResize', () => {
    component.onResize();
    const windowWidth = window.innerWidth;
    expect(component.itemSize).toBe(windowWidth);
  });

  it('should open dialog on readMore', () => {
    const dialog = TestBed.get(MatDialog);
    const openSpy = spyOn(dialog, 'open');
    component.readMore(items[0]);
    expect(openSpy).toHaveBeenCalled();
  });

  describe('getFirstLine', () => {
    it('should return empty if string is empty', () => {
      const text: string = '';
      const firstLine = component.getFirstLine(text);
      expect(firstLine).toBe('');
    });

    it('should return the first line if there is a new line', () => {
      const text: string = 'Lorem ipsum dolor sit amet \n consectetur adipiscing elit';
      const firstLine = component.getFirstLine(text);
      expect(firstLine).toBe('Lorem ipsum dolor sit amet ');
    });
  });

});
