import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatDialogModule, MatDialog } from '@angular/material';
import { NewsfeedComponent } from './newsfeed.component';
import { FeedReaderService } from '../feed-reader.service';
import { SettingsService } from '../../settings/settings.service';
import { of } from 'rxjs';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { TranslateModule } from '@ngx-translate/core';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;

  const feedReaderServiceStub: Partial<FeedReaderService> = {
    getFromUrl: () => of([])
  };

  const settingsServiceStub: Partial<SettingsService> = {
    readRssFeedsFromAPI: () => of()
  };

  const items = [
    {
      title: '',
      description: 'Goodbye collecting points, Hello rewards in a snap!\n\nBecause change means no more rewards points and hello to instant deals.\n\nWith rewards from all your favourite brands, you can now enjoy everything you love, anytime you want.\n\nPlus, it’s all in one place now. For you to enjoy, in a snap.',
      descriptionWithURL: '<div>Goodbye collecting points, Hello rewards in a snap!\n\nBecause change means no more rewards points and hello to instant deals.\n\nWith rewards from all your favourite brands, you can now enjoy everything you love, anytime you want.\n\nPlus, it’s all in one place now. For you to enjoy, in a snap.</div>',
      link: 'https://www.starhub.com/personal/rewards/starhub-rewards-programme/starhub-rewards.html',
      image: 'https://perx-cdn-staging.s3.amazonaws.com/merchant/account/photo_url/34/sh-rewards-hero-d990e310-78b7-43fe-b632-04d9b15ffd31.png',
      guid: 'TMRlovehate190813',
      pubDate: new Date('2019-09-03T09:46:03.000Z'),
    },
    {
      title: '',
      description: 'Goodbye collecting points, Hello rewards in a snap!\n\nBecause change means no more rewards points and hello to instant deals.\n\nWith rewards from all your favourite brands, you can now enjoy everything you love, anytime you want.\n\nPlus, it’s all in one place now. For you to enjoy, in a snap.',
      descriptionWithURL: '<div>Goodbye collecting points, Hello rewards in a snap!\n\nBecause change means no more rewards points and hello to instant deals.\n\nWith rewards from all your favourite brands, you can now enjoy everything you love, anytime you want.\n\nPlus, it’s all in one place now. For you to enjoy, in a snap.</div>',
      link: 'https://www.starhub.com/personal/rewards/starhub-rewards-programme/starhub-rewards.html',
      image: 'https://perx-cdn-staging.s3.amazonaws.com/merchant/account/photo_url/34/sh-rewards-hero-d990e310-78b7-43fe-b632-04d9b15ffd31.png',
      guid: 'TMRlovehate190813',
      pubDate: new Date('2019-09-03T09:46:03.000Z'),
    }
  ];
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [NewsfeedComponent],
      imports: [
        MatCardModule,
        MatButtonModule,
        NgxMultiLineEllipsisModule,
        MatDialogModule,
        ScrollingModule,
        TranslateModule.forRoot()
      ],
      providers: [
        { provide: FeedReaderService, useValue: feedReaderServiceStub },
        { provide: SettingsService, useValue: settingsServiceStub },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewsfeedComponent);
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
