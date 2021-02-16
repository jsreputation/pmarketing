import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';

@Component({
    selector: 'perx-core-leaderboard-cta',
    templateUrl: './leaderboard-cta.component.html',
    styleUrls: ['./leaderboard-cta.component.scss']
})
export class LeaderboardCTAComponent implements OnInit {
    public buttonText: Observable<string>;

    constructor(
        private translate: TranslateService
    ) { }

    public ngOnInit(): void {
        this.buttonText = this.translate.get('LEADER_BOARD.CTA_BUTTON_TEXT');
    }
}
