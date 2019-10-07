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
 * Merchants Admin
 */
export { MerchantAdminModule } from './lib/merchant-admin/merchant-admin.module';
export { IMerchantAdminService } from './lib/merchant-admin/imerchant-admin.service';

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
  ICardNumber,
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
export { StampsCardsListComponent } from './lib/rewards/stamps-cards-list/stamps-cards-list.component';
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
export { IMerchant } from './lib/merchants/models/merchants.model';
export { sortByDistance } from './lib/location/sort-by-distance';
export { GeoLocationService } from './lib/location/geolocation.service';

/**
 * Survey
 */
export { SurveyModule } from './lib/survey/survey.module';
export { SurveyService } from './lib/survey/survey.service';
export { ISurvey, SurveyQuestionType, IQuestion } from './lib/survey/models/survey.model';

/**
 * Config
 */
export { ConfigModule } from './lib/config/config.module';
export { Config } from './lib/config/config';

/**
 * Theme
 */
export { ITheme } from './lib/utils/themes/themes.model';
export { ThemesService } from './lib/utils/themes/themes.service';
/**
 * Outcome
 */
export { InstantOutcomeService } from './lib/outcome/instant-outcome.service';
export { IOutcome } from './lib/outcome/models/outcome.model';
export { OutcomeModule } from './lib/outcome/outcome.module';

/**
 * Outcome
 */
export { PagesModule } from './lib/pages/pages.module';
export { AccountComponent } from './lib/pages/account/account.component';
export { ContactUsComponent } from './lib/pages/contact-us/contact-us.component';
export { GameComponent } from './lib/pages/game/game.component';
export { HistoryComponent } from './lib/pages/history/history.component';
export { HomeComponent } from './lib/pages/home/home.component';
export { RewardPageComponent } from './lib/pages/reward-page/reward-page.component';
export { LoadingComponent } from './lib/pages/loading/loading.component';
export { LoginComponent } from './lib/pages/login/login.component';
export { RedeemComponent } from './lib/pages/redeem/redeem.component';
export { RewardDetailPageComponent } from './lib/pages/reward-detail-page/reward-detail-page.component';
export { StampCardComponent } from './lib/pages/stamp-card/stamp-card.component';
export { SurveyPageComponent } from './lib/pages/survey-page/survey-page.component';
export { TncComponent } from './lib/pages/tnc/tnc.component';
export { VoucherDetailPageComponent } from './lib/pages/voucher-detail-page/voucher-detail-page.component';
