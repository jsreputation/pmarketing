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
export { IMerchantAdminTransaction, IMerchantProfile } from './lib/merchant-admin/models/merchants-admin.model';
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
export { BcodeRedemptionComponent } from './lib/vouchers/bcode-redemption/bcode-redemption.component';
export { QrcodeRedemptionComponent } from './lib/vouchers/qrcode-redemption/qrcode-redemption.component';

/**
 * Authentication
 */
export { AuthenticationModule } from './lib/auth/authentication/authentication.module';
export { AuthenticationService } from './lib/auth/authentication/authentication.service';
export { TokenStorage } from './lib/auth/authentication/token-storage.service';
export { IChangePasswordData } from './lib/auth/authentication/models/authentication.model';
export { IFormsService } from './lib/auth/authentication/iforms.service';
/**
 * Campaigns
 */
export { CampaignModule } from './lib/campaign/campaign.module';
export { ICampaignService } from './lib/campaign/icampaign.service';
export {
  CampaignType,
  CampaignState,
  ICampaign,
  IDisplayProperties as ICampaignDisplayProperties
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
  StampState,
  IDisplayProperties as IStampDisplayProperties
} from './lib/stamp/models/stamp.model';
export { StampsCardsListComponent } from './lib/stamp/stamps-cards-list/stamps-cards-list.component';
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
  IScratch,
  defaultTree,
  IPlayOutcome,
  ISlice,
  IDisplayProperties as IGameDisplayProperties
} from './lib/game/game.model';
export { IGameService } from './lib/game/igame.service';
export { IGameComponent } from './lib/game/igame.component';
export { ShakeTreeComponent } from './lib/game/shake-tree/shake-tree.component';
export { PinataComponent } from './lib/game/pinata/pinata.component';
export { ScratchCardComponent } from './lib/game/scratch-card/scratch-card.component';

/**
 * Profile
 */
export { ProfileModule } from './lib/profile/profile.module';
export { ProfileService } from './lib/profile/profile.service';
export {
  IProfile,
  ICardNumber,
  ICustomProperties,
  IProfileAttributes
} from './lib/profile/profile.model';

/**
 * Loyalty
 */
export { LoyaltyModule } from './lib/loyalty/loyalty.module';
export { LoyaltyService } from './lib/loyalty/loyalty.service';
export {
  ILoyalty,
  ITransaction,
  IExpiringPoints,
  ITransactionHistory,
  IRewardTransactionHistory,
  IPurchaseTransactionHistory,
  TransactionDetailType,
  IJoinMethod
} from './lib/loyalty/models/loyalty.model';
export {
  ILoyaltyApi,
  IBasicTierApi,
  ICustomTierApi,
  IJoinMethodApi
} from './lib/loyalty/models/loyalty-api.model';
export { TransactionPipe } from './lib/loyalty/loyalty-transactions-list/transaction.pipe';
export { LoyaltySummaryComponent } from './lib/loyalty/loyalty-summary/loyalty-summary.component';

/**
 * Rewards
 */
export { RewardsModule } from './lib/rewards/rewards.module';
export { RewardsService } from './lib/rewards/rewards.service';
export {
  IReward,
  ICatalog,
  ICategoryTags,
  IPrice,
  IDisplayProperties as IRewardDisplayProperties
} from './lib/rewards/models/reward.model';
export { ITabConfig, ITabConfigExtended } from './lib/rewards/rewards-list-tabbed/rewards-list-tabbed.component';
export { RewardsCollectionComponent } from './lib/rewards/rewards-collection/rewards-collection.component';
export { RewardComponent } from './lib/rewards/reward/reward.component';
export { RewardsListTabbedComponent } from './lib/rewards/rewards-list-tabbed/rewards-list-tabbed.component';
export { RewardsListComponent } from './lib/rewards/rewards-list/rewards-list.component';
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
export { RepeatTimesDirective } from './lib/utils/directives/repeat-times.directive';
/**
 * Puzzles
 */
export { PuzzlesModule } from './lib/puzzles/puzzles.module';
export {
  PuzzleCollectStamp,
  PuzzleCollectReward,
  PuzzleCollectStampState,
} from './lib/puzzles/models/puzzle-stamp.model';
export { PuzzleCollectStampsComponent } from './lib/puzzles/puzzle-collect-stamps/puzzle-collect-stamps.component';

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
export { ISurvey, SurveyQuestionType, IQuestion, IDisplayProperties as ISurveyDisplayProperties } from './lib/survey/models/survey.model';
export { SurveyComponent } from './lib/survey/survey/survey.component';
export { QuestionComponent } from './lib/survey/question/question.component';
export { SelectComponent } from './lib/survey/question/select/select.component';
export { PictureSelectComponent } from './lib/survey/question/picture-select/picture-select.component';
export { PhoneComponent } from './lib/survey/question/phone/phone.component';
export { LongTextComponent } from './lib/survey/question/long-text/long-text.component';
export { GroupComponent } from './lib/survey/question/group/group.component';
export { RatingComponent } from './lib/survey/question/rating/rating.component';
export { DateComponent } from './lib/survey/question/date/date.component';

/**
 * Config
 */
export { ConfigModule } from './lib/config/config.module';
export { Config } from './lib/config/config';
export { ConfigService } from './lib/config/config.service';
export { IConfig, IMicrositeSettings } from './lib/config/models/config.model';

/**
 * Theme
 */
export {
  ITheme,
  PagesObject,
  AccountPageObject,
} from './lib/utils/themes/themes.model';
export { ThemesService } from './lib/utils/themes/themes.service';
/**
 * Outcome
 */
export { InstantOutcomeService } from './lib/outcome/instant-outcome.service';
export { IOutcome, IDisplayProperties as IOutcomeDisplayProperties } from './lib/outcome/models/outcome.model';
export { OutcomeModule } from './lib/outcome/outcome.module';

/**
 * Tenants
 */
