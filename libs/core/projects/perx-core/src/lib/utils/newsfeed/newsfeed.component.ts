import {
  Component,
  Input,
  OnInit
} from '@angular/core';
import { FeedItem } from '../feed-reader.service';
import { MatDialog } from '@angular/material/dialog';
import { FeedItemPopupComponent } from '../feed-item-popup/feed-item-popup.component';
import { Observable } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { SettingsService } from '../../settings/settings.service';
import { IFlags } from '../../settings/models/settings.model';
import { oc } from 'ts-optchain';

@Component({
  selector: 'perx-core-newsfeed',
  templateUrl: './newsfeed.component.html',
  styleUrls: ['./newsfeed.component.scss']
})
export class NewsfeedComponent implements OnInit {
  // will be passed down to the dialog from readMoreClicked
  @Input()
  public items$: Observable<FeedItem[] | undefined>;
  public newsBeforeScroll: number[];
  public newsAfterScroll: number[];
  public showButton: boolean = true;

  constructor(
    private dialog: MatDialog,
    private translate: TranslateService,
    private settingsService: SettingsService
  ) { }

  public ngOnInit(): void {
    this.settingsService.getRemoteFlagsSettings().subscribe(
      (flags: IFlags) => {
        this.showButton = oc(flags).showRSSfeedCTA(true);
      }
    );
  }

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
}
