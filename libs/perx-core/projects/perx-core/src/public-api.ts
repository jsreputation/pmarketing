/*
 * Public API Surface of perx-core
 */

export { PerxCoreModule } from './lib/perx-core.module';

/**
 * Vouchers
 */
export { VouchersModule } from './lib/vouchers/vouchers.module';
export { VouchersService } from './lib/vouchers/vouchers.service';
export { VouchersComponent } from './lib/vouchers/vouchers.component';
export { VoucherComponent } from './lib/vouchers/voucher/voucher.component';
export { IVoucher as Voucher } from './lib/vouchers/models/voucher.model';

/**
 * Authentication
 */
export { AuthenticationModule } from './lib/auth/authentication/authentication.module';
export { CognitoModule } from './lib/auth/whistler/cognito/cognito.module';
export { OauthModule } from './lib/auth/v4/oauth/oauth.module';
export { AuthenticationService } from './lib/auth/authentication/authentication.service';
export { CognitoService } from './lib/auth/whistler/cognito/cognito.service';
export { OauthService } from './lib/auth/v4/oauth/oauth.service';
export { TokenStorage } from './lib/auth/authentication/token-storage.service';

/**
 * Campaigns
 */
export { CampaignModule } from './lib/campaign/campaign.module';
export { CampaignService } from './lib/campaign/campaign.service';
export { ICampaignService } from './lib/campaign/icampaign.service';
export {
  CAMPAIGN_TYPE,
  CAMPAIGN_STATE,
  ICampaign
} from './lib/campaign/models/campaign.model';

/**
 * Stamps
 */
export { StampModule } from './lib/stamp/stamp.module';
export { StampService } from './lib/stamp/stamp.service';
export {
  IStampCard,
  IStamp,
  STAMP_CARD_STATE,
  STAMP_STATE
} from './lib/stamp/models/stamp.model';

/**
 *  Games
 */
export { GameModule } from './lib/game/game.module';
export {
  IGame,
  GAME_TYPE,
  IGameOutcome,
  IPinata,
  ITree,
  defaultTree
} from './lib/game/game.model';
export { GameService } from './lib/game/game.service';
export { IGameComponent } from './lib/game/IGame.component';

/**
 * Profile
 */
export { ProfileModule } from './lib/profile/profile.module';
export { ProfileService } from './lib/profile/profile.service';
export {
  IProfile,
  ICustomProperties
} from './lib/profile/profile.model';

/**
 * Loyalty
 */
export { LoyaltyModule } from './lib/loyalty/loyalty.module';
export { LoyaltyService } from './lib/loyalty/loyalty.service';
export {
  ILoyalty,
  ITransaction,
  IExpiringPoints
} from './lib/loyalty/models/loyalty.model';

/**
 * Rewards
 */
export { RewardsModule } from './lib/rewards/rewards.module';
export { RewardsService } from './lib/rewards/rewards.service';
export { IReward } from './lib/rewards/models/reward.model';

/**
 * Utils
 */
export { UtilsModule } from './lib/utils/utils.module';
export {
  PopupComponent,
  IPopupConfig,
  PopUpClosedCallBack
} from './lib/utils/popup/popup.component';
export { NotificationService } from './lib/utils/notification/notification.service';
export { PinInputComponent } from './lib/utils/pin-input/pin-input.component';

/**
 * Puzzles
 */
export { PuzzlesModule } from './lib/puzzles/puzzles.module';
export {
  PuzzleCollectStamp,
  PuzzleCollectReward,
  PUZZLE_COLLECT_STAMP_STATE
} from './lib/puzzles/models/puzzle-stamp.model';

/**
 * Locations
 */
export { LocationModule } from './lib/location/location.module';
export { LocationsService } from './lib/location/locations.service';
export { ILocation } from './lib/location/ilocation';
