import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { MatButtonModule, MatCardModule, MatDialogModule, MatDialog } from '@angular/material';
import { NewsfeedComponent } from './newsfeed.component';
import { NgxMultiLineEllipsisModule } from 'ngx-multi-line-ellipsis';
import { TranslateModule } from '@ngx-translate/core';

describe('NewsfeedComponent', () => {
  let component: NewsfeedComponent;
  let fixture: ComponentFixture<NewsfeedComponent>;

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
        TranslateModule.forRoot()
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

  it('should open dialog on readMore', () => {
    const dialog = TestBed.get(MatDialog);
    const openSpy = spyOn(dialog, 'open');
    component.readMore(items[0]);
    expect(openSpy).toHaveBeenCalled();
  });
});
