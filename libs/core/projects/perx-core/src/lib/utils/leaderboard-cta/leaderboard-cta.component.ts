import {
    Component,
    OnInit
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { IConfig } from '../../config/models/config.model';

@Component({
    selector: 'perx-core-leaderboard-cta',
    templateUrl: './leaderboard-cta.component.html',
    styleUrls: ['./leaderboard-cta.component.scss']
})
export class LeaderboardCTAComponent implements OnInit {
    public buttonText: Observable<string>;
    public showLeaderBoardCTA: boolean = false;

    constructor(
        private translate: TranslateService,
        private configService: ConfigService
    ) { }

    public ngOnInit(): void {
        this.configService.readAppConfig().subscribe(
            (config: IConfig<void>) => {
                this.showLeaderBoardCTA = config.enableLeaderBoard || false;
                if (this.showLeaderBoardCTA) {
                    this.buttonText = this.translate.get('LEADER_BOARD.CTA_BUTTON_TEXT');
                }
            }
        );
    }
}
