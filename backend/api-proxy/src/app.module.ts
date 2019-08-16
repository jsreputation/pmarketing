import { Module, HttpModule } from '@nestjs/common';
import { EngagementController } from './engagement/engagement.controller';
import { CampaignController } from './campaign/campaign.controller';
import { GameService } from './services/game/game.service';
import { SurveyService } from './services/survey/survey.service';
import { LoyaltyService } from './services/loyalty/loyalty.service';
import { InstantOutcomeService } from './services/instant-outcome/instant-outcome.service';

@Module({
  imports: [HttpModule],
  controllers: [EngagementController, CampaignController],
  providers: [GameService, SurveyService, LoyaltyService, InstantOutcomeService],
})
export class AppModule { }
