/*
 * Public API Surface of perx-core
 */

export { PerxCoreModule } from './lib/perx-core.module';

/**
 * Merchants
 */
export { MerchantsModule } from './lib/merchants/merchants.module';
export { IMerchantsService } from './lib/merchants/imerchants.service';

/**
 * Vouchers
 */
export { VouchersModule } from './lib/vouchers/vouchers.module';
export { IVoucherService } from './lib/vouchers/ivoucher.service';
export { PinService } from './lib/vouchers/pin.service';
export { VouchersComponent } from './lib/vouchers/vouchers/vouchers.component';
export { VoucherComponent } from './lib/vouchers/voucher/voucher.component';
export { IVoucher as Voucher, RedemptionType, VoucherState, StatusLabelMapping } from './lib/vouchers/models/voucher.model';
export { PinRedemptionComponent } from './lib/vouchers/pin-redemption/pin-redemption.component';
/**
 * Authentication
 */
export { AuthenticationModule } from './lib/auth/authentication/authentication.module';
export { AuthenticationService } from './lib/auth/authentication/authentication.service';
export { TokenStorage } from './lib/auth/authentication/token-storage.service';
export { IChangePasswordData } from './lib/auth/authentication/models/authentication.model';
/**
 * Campaigns
 */
export { CampaignModule } from './lib/campaign/campaign.module';
export { ICampaignService } from './lib/campaign/icampaign.service';
export {
  CampaignType,
  CampaignState,
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
  StampCardState,
  StampState
} from './lib/stamp/models/stamp.model';

/**
 *  Games
 */
export { GameModule } from './lib/game/game.module';
export {
  IGame,
  GameType,
  IGameOutcome,
  IPinata,
  ITree,
  defaultTree,
  IPlayOutcome
} from './lib/game/game.model';
export { IGameService } from './lib/game/igame.service';
export { IGameComponent } from './lib/game/igame.component';

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
export { LoyaltySummaryComponent } from './lib/loyalty/loyalty-summary/loyalty-summary.component';

/**
 * Rewards
 */
export { RewardsModule } from './lib/rewards/rewards.module';
export { RewardsService } from './lib/rewards/rewards.service';
export { IReward, ICatalog, ICategoryTags, IPrice } from './lib/rewards/models/reward.model';
export { ITabConfig, ITabConfigExtended } from './lib/rewards/rewards-list-tabbed/rewards-list-tabbed.component';

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
export { FeedReaderService, FeedItem } from './lib/utils/feed-reader.service';
export { GeneralStaticDataService } from './lib/utils/general-static-data/general-static-data.service';
export { ICountryCode } from './lib/utils/general-static-data/country-code';
/**
 * Puzzles
 */
export { PuzzlesModule } from './lib/puzzles/puzzles.module';
export {
  PuzzleCollectStamp,
  PuzzleCollectReward,
  PuzzleCollectStampState
} from './lib/puzzles/models/puzzle-stamp.model';

/**
 * Locations
 */
export { LocationModule } from './lib/location/location.module';
export { LocationsService } from './lib/location/locations.service';
export { ILocation } from './lib/location/ilocation';
export { sortByDistance } from  './lib/location/sort-by-distance';
export { GeoLocationService } from './lib/location/geolocation.service';

/**
 * Survey
 */
export { SurveyModule } from './lib/survey/survey.module';
export { SurveyService } from './lib/survey/survey.service';
export { ISurvey } from './lib/survey/models/survey.model';

/**
 * Config
 */
export { ConfigModule } from './lib/config/config.module';
export { Config } from './lib/config/config';
