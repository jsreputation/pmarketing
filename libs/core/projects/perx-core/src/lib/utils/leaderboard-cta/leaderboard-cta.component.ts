import {
    Component,
    Input,
    OnInit
} from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { forkJoin, Observable } from 'rxjs';
import { ConfigService } from '../../config/config.service';
import { IRankService } from '../../rank/irank.service';
import { SettingsService } from '../../settings/settings.service';

@Component({
    selector: 'perx-core-leaderboard-cta',
    templateUrl: './leaderboard-cta.component.html',
    styleUrls: ['./leaderboard-cta.component.scss']
})

export class LeaderboardCTAComponent implements OnInit {
    @Input() public campaignId: number;
    public buttonText: Observable<string>;
    public showLeaderBoardCTA: boolean = false;

    constructor(
        private translate: TranslateService,
        private configService: ConfigService,
        private router: Router,
        private rankService: IRankService,
        private settingsService: SettingsService,
    ) { }

    public ngOnInit(): void {
        forkJoin([
            this.configService.readAppConfig(),
            this.settingsService.getRemoteFlagsSettings()
        ]).subscribe(([config, remoteConfig]) => {
            this.showLeaderBoardCTA = (config.enableLeaderBoard && remoteConfig.showLeaderboard) || false;
            if (this.showLeaderBoardCTA) {
                // now check if current campaign has any leaderboards
                this.rankService.getLeaderBoardsByCampaignID(this.campaignId).subscribe((leaderboards) => {
                    if (leaderboards.length > 0) {
                        this.showLeaderBoardCTA = true;
                        this.buttonText = this.translate.get('LEADER_BOARD.CTA_BUTTON_TEXT');
                    } else {
                        this.showLeaderBoardCTA = false;
                    }
                });
            }
        });
    }

    public ctaClicked(): void {
        if (this.campaignId) {
            this.router.navigate([`/leaderboards/${this.campaignId}`]);
        }
    }
}
