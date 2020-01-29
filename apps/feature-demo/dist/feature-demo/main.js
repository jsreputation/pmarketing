(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js":
/*!********************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/libs/perx-core/dist/perx-core/fesm5/perx-core.js ***!
  \********************************************************************************************/
/*! exports provided: AuthenticationModule, AuthenticationService, BarcodeRedemptionComponent, BcodeRedemptionComponent, CampaignModule, CampaignState, CampaignType, Config, ConfigModule, ConfigService, DateComponent, FeedReaderService, GameModule, GameType, GeneralStaticDataService, GeoLocationService, GroupComponent, ICampaignService, IFormsService, IGameService, IMerchantAdminService, IMerchantsService, IVoucherService, InstantOutcomeService, LanguageInterceptor, LanguageService, LocaleIdFactory, LocationModule, LocationsService, LongTextComponent, LoyaltyModule, LoyaltyService, LoyaltySummaryComponent, LoyaltyTransactionsListComponent, MerchantAdminModule, MerchantsModule, NewsfeedComponent, NotificationService, OutcomeModule, PerxCoreModule, PhoneComponent, PictureSelectComponent, PinInputComponent, PinRedemptionComponent, PinService, PinataComponent, PopupComponent, ProfileModule, ProfileService, PuzzleCollectStampState, PuzzleCollectStampsComponent, PuzzlesModule, QrcodeRedemptionComponent, QuestionComponent, RatingComponent, RedemptionType, RepeatTimesDirective, RewardComponent, RewardsCollectionComponent, RewardsListComponent, RewardsListTabbedComponent, RewardsModule, RewardsService, ScratchCardComponent, SelectComponent, ShakeTreeComponent, SpinTheWheelComponent, StampCardState, StampModule, StampService, StampState, StampsCardsListComponent, SurveyComponent, SurveyModule, SurveyQuestionType, SurveyService, ThemesService, TokenStorage, TransactionPipe, UtilsModule, VoucherComponent, VoucherState, VouchersComponent, VouchersModule, defaultTree, isEmptyArray, isEmptyString, sortByDistance, ɵa, ɵb, ɵba, ɵbb, ɵbc, ɵbd, ɵbe, ɵbf, ɵbg, ɵbh, ɵc, ɵd, ɵe, ɵf, ɵg, ɵh, ɵi, ɵj, ɵk, ɵl, ɵm, ɵn, ɵo, ɵp, ɵq, ɵr, ɵs, ɵt, ɵu, ɵv, ɵw, ɵx, ɵy, ɵz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationModule", function() { return AuthenticationModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BarcodeRedemptionComponent", function() { return BarcodeRedemptionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "BcodeRedemptionComponent", function() { return BcodeRedemptionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignModule", function() { return CampaignModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignState", function() { return CampaignState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignType", function() { return CampaignType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigModule", function() { return ConfigModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigService", function() { return ConfigService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DateComponent", function() { return DateComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedReaderService", function() { return FeedReaderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameModule", function() { return GameModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameType", function() { return GameType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralStaticDataService", function() { return GeneralStaticDataService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeoLocationService", function() { return GeoLocationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GroupComponent", function() { return GroupComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICampaignService", function() { return ICampaignService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IFormsService", function() { return IFormsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IGameService", function() { return IGameService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMerchantAdminService", function() { return IMerchantAdminService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IMerchantsService", function() { return IMerchantsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IVoucherService", function() { return IVoucherService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstantOutcomeService", function() { return InstantOutcomeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageInterceptor", function() { return LanguageInterceptor; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LanguageService", function() { return LanguageService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocaleIdFactory", function() { return LocaleIdFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationModule", function() { return LocationModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsService", function() { return LocationsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LongTextComponent", function() { return LongTextComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyModule", function() { return LoyaltyModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyService", function() { return LoyaltyService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltySummaryComponent", function() { return LoyaltySummaryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyTransactionsListComponent", function() { return LoyaltyTransactionsListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantAdminModule", function() { return MerchantAdminModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MerchantsModule", function() { return MerchantsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsfeedComponent", function() { return NewsfeedComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "OutcomeModule", function() { return OutcomeModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerxCoreModule", function() { return PerxCoreModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PhoneComponent", function() { return PhoneComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PictureSelectComponent", function() { return PictureSelectComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PinInputComponent", function() { return PinInputComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PinRedemptionComponent", function() { return PinRedemptionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PinService", function() { return PinService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PinataComponent", function() { return PinataComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupComponent", function() { return PopupComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileService", function() { return ProfileService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzleCollectStampState", function() { return PuzzleCollectStampState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzleCollectStampsComponent", function() { return PuzzleCollectStampsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzlesModule", function() { return PuzzlesModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QrcodeRedemptionComponent", function() { return QrcodeRedemptionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "QuestionComponent", function() { return QuestionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RatingComponent", function() { return RatingComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedemptionType", function() { return RedemptionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RepeatTimesDirective", function() { return RepeatTimesDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardComponent", function() { return RewardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsCollectionComponent", function() { return RewardsCollectionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsListComponent", function() { return RewardsListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsListTabbedComponent", function() { return RewardsListTabbedComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsModule", function() { return RewardsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsService", function() { return RewardsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ScratchCardComponent", function() { return ScratchCardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SelectComponent", function() { return SelectComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShakeTreeComponent", function() { return ShakeTreeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SpinTheWheelComponent", function() { return SpinTheWheelComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampCardState", function() { return StampCardState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampModule", function() { return StampModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampService", function() { return StampService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampState", function() { return StampState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampsCardsListComponent", function() { return StampsCardsListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyComponent", function() { return SurveyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyModule", function() { return SurveyModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyQuestionType", function() { return SurveyQuestionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyService", function() { return SurveyService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ThemesService", function() { return ThemesService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenStorage", function() { return TokenStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TransactionPipe", function() { return TransactionPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilsModule", function() { return UtilsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoucherComponent", function() { return VoucherComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoucherState", function() { return VoucherState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VouchersComponent", function() { return VouchersComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VouchersModule", function() { return VouchersModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTree", function() { return defaultTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyArray", function() { return isEmptyArray; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "isEmptyString", function() { return isEmptyString; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByDistance", function() { return sortByDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return merchantsServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return merchantAdminServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵba", function() { return StampComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbb", function() { return WhistlerFormsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbc", function() { return UserProfileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbd", function() { return MicroProfileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbe", function() { return LocationsListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbf", function() { return LocationsMapComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbg", function() { return V4LocationsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbh", function() { return WhistlerInstantOutcomeService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return vouchersServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return AuthServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return FormsServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return campaignServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return stampServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function() { return gameServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵi", function() { return profileServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵj", function() { return loyaltyServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵk", function() { return rewardsServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵl", function() { return themesServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵm", function() { return notificationServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵn", function() { return locationsServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵo", function() { return surveyServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵp", function() { return configServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵq", function() { return instantRewardsSvcFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵr", function() { return MaterialModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵs", function() { return NumericCharacterDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵt", function() { return DebounceClickDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵu", function() { return DistancePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵv", function() { return TokenStorageServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵw", function() { return StorageModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵx", function() { return PuzzleListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵy", function() { return PuzzlePlayComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵz", function() { return PuzzleStampComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var angularx_qrcode__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! angularx-qrcode */ "../../node_modules/angularx-qrcode/dist/index.js");
/* harmony import */ var ngx_barcode__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ngx-barcode */ "../../node_modules/ngx-barcode/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var ts_optchain__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ts-optchain */ "../../node_modules/ts-optchain/dist/proxy/index.js");
/* harmony import */ var ts_optchain__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ts_optchain__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var _perx_whistler__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! @perx/whistler */ "../../libs/perx-whistler/dist/whistler/fesm5/whistler.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var ngx_auth__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ngx-auth */ "../../node_modules/ngx-auth/fesm5/ngx-auth.js");
/* harmony import */ var ngx_multi_line_ellipsis__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-multi-line-ellipsis */ "../../node_modules/ngx-multi-line-ellipsis/index.js");
/* harmony import */ var ngx_ellipsis__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ngx-ellipsis */ "../../node_modules/ngx-ellipsis/fesm5/ngx-ellipsis.js");
/* harmony import */ var _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/material/datepicker */ "../../node_modules/@angular/material/esm5/datepicker.es5.js");

















/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
IVoucherService = /** @class */ (function () {
    function IVoucherService() {
    }
    return IVoucherService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var VoucherState = {
    issued: 'issued',
    redeemed: 'redeemed',
    expired: 'expired',
    reserved: 'reserved',
    released: 'released',
};
/**
 * @record
 */
function IVoucher() { }
if (false) {}
/**
 * @record
 */
function IGetVoucherParams() { }
if (false) {}
/**
 * @record
 */
function IRedeemOptions() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VouchersComponent = /** @class */ (function () {
    function VouchersComponent(vouchersService, datePipe) {
        var _this = this;
        this.vouchersService = vouchersService;
        this.datePipe = datePipe;
        this.showTitle = true;
        this.showMerchant = true;
        this.showExpireDate = true;
        this.showRedeemedDate = true;
        this.showRedeemedIcon = true;
        this.canSelectRedeemed = false;
        /**
         * @deprecated
         */
        this.route = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.repeatGhostCount = 10;
        this.expiryLabelFn = (/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.expiry ? "Expiry: " + _this.datePipe.transform(v.expiry, 'shortDate') : ''; });
    }
    Object.defineProperty(VouchersComponent.prototype, "filter", {
        get: /**
         * @return {?}
         */
        function () {
            return this.privateFilter;
        },
        set: /**
         * @param {?} filter
         * @return {?}
         */
        function (filter) {
            this.privateFilter = filter;
            this.vouchers$ = this.filterVoucher(this.vouchers$);
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    VouchersComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.showRedeemedIcon && !this.mapping) {
            console.warn("'mapping' is not defined");
        }
        Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(true).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["delay"])(2000)).subscribe((/**
         * @return {?}
         */
        function () { return _this.ghostTimeOut = true; }));
    };
    /**
     * @return {?}
     */
    VouchersComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function () {
        if (!this.vouchers$) {
            this.vouchers$ = this.vouchersService.getAll({ sourceType: this.sourceType, type: null });
        }
    };
    /**
     * @param {?} vouchers
     * @return {?}
     */
    VouchersComponent.prototype.isVoucherQueryComplete = /**
     * @param {?} vouchers
     * @return {?}
     */
    function (vouchers) {
        return Array.isArray(vouchers) || this.ghostTimeOut;
    };
    /**
     * @param {?} voucher
     * @return {?}
     */
    VouchersComponent.prototype.notClickable = /**
     * @param {?} voucher
     * @return {?}
     */
    function (voucher) {
        return !this.canSelectRedeemed && [VoucherState.redeemed, VoucherState.expired].includes(voucher.state);
    };
    /**
     * @param {?} voucher
     * @return {?}
     */
    VouchersComponent.prototype.onClick = /**
     * @param {?} voucher
     * @return {?}
     */
    function (voucher) {
        if (this.notClickable(voucher)) {
            return;
        }
        // tslint:disable-next-line: deprecation
        this.route.emit(voucher.id);
        this.tapped.emit(voucher);
    };
    /**
     * @private
     * @param {?} vouchers
     * @return {?}
     */
    VouchersComponent.prototype.filterVoucher = /**
     * @private
     * @param {?} vouchers
     * @return {?}
     */
    function (vouchers) {
        var _this = this;
        return vouchers ? vouchers.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} voucher
         * @return {?}
         */
        function (voucher) { return voucher.filter((/**
         * @param {?} el
         * @return {?}
         */
        function (el) { return _this.filter.includes(el.state); })); }))) : vouchers;
    };
    VouchersComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-vouchers',
                    template: "<ng-container *ngIf=\"isVoucherQueryComplete(vouchers$ | async); else elseBlock\">\n  <div class=\"card-list-container\">\n    <ng-container *ngFor=\"let voucher of vouchers$ | async\">\n      <mat-card *ngIf=\"filter === undefined || filter.includes(voucher.state)\" mat-ripple\n        [matRippleDisabled]=\"notClickable(voucher)\" (click)=\"onClick(voucher)\">\n        <div [ngClass]=\"'voucher-content ' + imageSize\">\n          <div class=\"voucher-img__wrapper\">\n            <img class=\"voucher-thumbnail\" src=\"{{voucher?.reward?.rewardThumbnail}}\">\n          </div>\n          <div class=\"voucher-details\">\n            <h1 *ngIf=\"showTitle\">\n              {{voucher?.reward?.name}}\n            </h1>\n            <p *ngIf=\"showMerchant\">\n              {{voucher?.reward?.merchantName}}\n            </p>\n            <p *ngIf=\"showExpireDate && voucher.expiry && voucher.expiry !== null\">\n              {{expiryLabelFn(voucher)}}\n            </p>\n            <p *ngIf=\"showRedeemedDate && voucher.redemptionDate\">\n              Redeemed on {{voucher.redemptionDate | date: 'shortDate'}}\n            </p>\n            <div [ngClass]=\"'ribbon ' + voucher.state\" *ngIf=\"showRedeemedIcon && mapping && mapping[voucher.state]\">\n              {{mapping[voucher.state]}}</div>\n          </div>\n        </div>\n        <mat-icon *ngIf=\"iconDisplay && voucher.state !== 'redeemed'\">\n          {{iconDisplay}}\n        </mat-icon>\n      </mat-card>\n    </ng-container>\n  </div>\n</ng-container>\n<ng-template #elseBlock>\n  <div class=\"card-list-container loading\">\n    <mat-card *perxCoreRepeatTimes=\"repeatGhostCount\">\n      <div [ngClass]=\"'voucher-content ' + imageSize\">\n        <div class=\"voucher-img__wrapper\">\n          <div class=\"img-placeholder ghost\"></div>\n        </div>\n        <div class=\"voucher-details\">\n          <h1 class=\"voucher-name ghost\"></h1>\n          <div class=\"voucher-merchantName ghost\"></div>\n          <div class=\"voucher-date-details ghost\"></div>\n        </div>\n      </div>\n    </mat-card>\n  </div>\n</ng-template>\n",
                    styles: ["mat-card{margin:1.2rem 0;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;padding:0;-webkit-box-flex:0;flex:0 0 10.5rem;height:10.5rem;-webkit-box-pack:justify;justify-content:space-between}mat-icon{color:#b2b2b2;font-size:3.6rem;height:3.6rem;-webkit-box-flex:0;flex:0 0 3.6rem}.voucher-content{display:-webkit-box;display:flex;flex-basis:auto;-webkit-box-flex:1;flex-grow:1;-webkit-box-pack:start;justify-content:flex-start}.voucher-img__wrapper{height:10.5rem;width:10.5rem}.voucher-thumbnail{width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.voucher-details{padding:0 1.6rem;font-size:1.4rem;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;margin:auto 0;-webkit-box-flex:1;flex:1}.voucher-details h1{font-size:1.4rem;color:#37474f;line-height:1.6rem;font-weight:500;margin:4px 0;padding:0}.voucher-details p{font-size:1.1rem;line-height:1.3rem;color:#858585;margin:4px 0;padding:0}.voucher-details:nth-child(1){margin-top:0}.small .voucher-img,.small .voucher-thumbnail{max-height:6rem;max-width:6rem}.small .voucher-details{padding-left:0}.voucher-expiry{color:#858585}.ribbon{position:absolute;font-size:1rem;font-style:normal;font-weight:400;width:5.7rem;bottom:1.2rem;right:1.6rem;text-align:center;line-height:1.6rem;letter-spacing:.02rem}.ribbon.redeemed{background:#bbe5b3;color:#173630}.ribbon.expired{background:#919eab;color:#212121}.ribbon.issued{background:#bbe5b3;color:#173630}.ribbon.reserved{background:#ffc58b;color:#4a1504}.ribbon.released{background:#fead9a;color:#330101}.card-list-container.loading,.card-list-container.loading .ghost{overflow:hidden}.card-list-container.loading .voucher-content .voucher-img__wrapper .img-placeholder{height:100%;width:100%}.card-list-container.loading .voucher-content .voucher-details .voucher-merchantName,.card-list-container.loading .voucher-content .voucher-details .voucher-name{height:1.6rem;margin:.4rem 0}.card-list-container.loading .voucher-content .voucher-details .voucher-date-details{height:1.6rem}"]
                }] }
    ];
    /** @nocollapse */
    VouchersComponent.ctorParameters = function () { return [
        { type: IVoucherService },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"] }
    ]; };
    VouchersComponent.propDecorators = {
        imageSize: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        iconDisplay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showTitle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showMerchant: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showExpireDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showRedeemedDate: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showRedeemedIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        canSelectRedeemed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        sourceType: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        route: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        vouchers$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['data',] }],
        filter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        mapping: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        expiryLabelFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return VouchersComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VoucherComponent = /** @class */ (function () {
    function VoucherComponent(vouchersService, datePipe) {
        this.vouchersService = vouchersService;
        this.datePipe = datePipe;
        this.redeem = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.hideMerchantImg = false;
        this.hideMerchantName = false;
        this.hideExpiry = false;
        this.hideActions = false;
        this.showRedeemedIcon = false;
        this.descriptionLabel = 'Description';
        this.tncLabel = 'Terms and Conditions';
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    VoucherComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.voucherId) {
            this.voucher$ = this.vouchersService.get(this.voucherId);
        }
    };
    /**
     * @return {?}
     */
    VoucherComponent.prototype.onClick = /**
     * @return {?}
     */
    function () {
        this.redeem.emit(this.voucherId);
    };
    /**
     * @return {?}
     */
    VoucherComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.redeemLabelFn) {
            this.redeemLabelFn = (/**
             * @return {?}
             */
            function () { return 'REDEEM NOW'; });
        }
        if (!this.expiryFn) {
            this.expiryFn = (/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return "Expires on " + _this.datePipe.transform(v.expiry, 'shortDate'); });
        }
    };
    VoucherComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-voucher',
                    template: "<ng-container *ngIf=\"voucher$ | async as voucher\">\n  <div class=\"voucher-container\">\n    <div class=\"reward-image-container\" *ngIf=\"voucher.reward.rewardBanner\">\n      <img class=\"reward-image\" src=\"{{voucher.reward.rewardBanner}}\">\n    </div>\n    <div class=\"merchant-image-container\" *ngIf=\"!hideMerchantImg && voucher.reward.merchantImg\">\n      <img class=\"merchant-image\" src=\"{{voucher.reward.merchantImg}}\">\n    </div>\n    <div class=\"details\">\n      <div class=\"reward-name\">\n        {{voucher.reward.name}}\n      </div>\n      <div class=\"merchant-name\" *ngIf=\"!hideMerchantName\">\n        {{voucher.reward.merchantName}}\n      </div>\n      <div class=\"voucher-expiry\" *ngIf=\"!hideExpiry && voucher.expiry!==null\">\n        {{expiryFn(voucher)}}\n      </div>\n      <div [ngClass]=\"'ribbon ' + voucher.state\" *ngIf=\"mapping && showRedeemedIcon && mapping[voucher.state]\">\n        {{mapping[voucher.state]}}</div>\n      <!--      <div *ngFor=\"let description of voucher.description\">-->\n      <!--        <div class=\"section-heading\">-->\n      <!--          {{description.title}}-->\n      <!--        </div>-->\n      <!--        <div [ngClass]=\"description.title == 'Description' ? 'section-content description' : ' section-content'\">-->\n      <!--          <div [innerHtml]=\"description.content\"></div>-->\n      <!--        </div>-->\n      <!--      </div>-->\n      <div class=\"section-heading\" *ngIf=\"voucher.reward.description\">\n        {{descriptionLabel}}\n      </div>\n      <div class=\"section-content\" *ngIf=\"voucher.reward.description\">\n        <div id=\"rewardDescription\" [innerHtml]=\"voucher.reward.description\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"voucher.reward.termsAndConditions\">\n        {{tncLabel}}\n      </div>\n      <div class=\"section-content\" *ngIf=\"voucher.reward.termsAndConditions\">\n        <div [innerHtml]=\"voucher.reward.termsAndConditions\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"voucher.reward.howToRedeem\">\n        How to redeem\n      </div>\n      <div class=\"section-content\" *ngIf=\"voucher.reward.howToRedeem\">\n        <div [innerHtml]=\"voucher.reward.howToRedeem\"></div>\n      </div>\n    </div>\n  </div>\n  <div class=\"actions-container\" *ngIf=\"!hideActions\">\n    <button mat-raised-button color=\"primary\" class=\"redeem-btn\" (click)=\"onClick()\">\n      {{ redeemLabelFn() }}\n    </button>\n  </div>\n</ng-container>\n",
                    styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100%}.voucher-container{margin:0 auto;background:#fff;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100%;max-width:60rem;-webkit-box-flex:1;flex-grow:1;width:100%;overflow-y:scroll;padding-bottom:2rem}.reward-image-container{position:relative;padding-top:53.33%}.reward-image{position:absolute;left:0;top:0;width:100%;height:100%;-o-object-fit:cover;object-fit:cover}.merchant-image-container{position:relative;padding-top:26.67%;margin-top:-13.33%}.merchant-image{border-radius:50%;border:.2rem solid #fff;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);position:absolute;left:37.5%;top:0;width:26.67%;height:100%}.details{padding:0 1.2rem}.reward-name{margin-top:1.5rem;font-size:1.8rem;text-align:center}.merchant-name{margin-top:1.5rem;font-size:1.8rem;text-align:center;color:#858585}.voucher-expiry{margin-top:1rem;font-size:1.6rem;text-align:center;color:#858585}.section-heading{margin-top:3rem;font-size:1.4rem;font-weight:700}.section-content{font-size:1.4rem}.section-content.description{white-space:pre-wrap}.actions-container{background-color:#fff;width:100%;padding:2rem 0 8.5rem}.actions-container button{color:#fff;width:100%}.ribbon{font-size:1rem;font-style:normal;font-weight:400;width:5.7rem;text-align:center;line-height:1.6rem;letter-spacing:.02rem;margin:1rem auto}.ribbon.redeemed{background:#bbe5b3;color:#173630}.ribbon.expired{background:#919eab;color:#212121}.ribbon.issued{background:#bbe5b3;color:#173630}.ribbon.reserved{background:#ffc58b;color:#4a1504}.ribbon.released{background:#fead9a;color:#330101}"]
                }] }
    ];
    /** @nocollapse */
    VoucherComponent.ctorParameters = function () { return [
        { type: IVoucherService },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"] }
    ]; };
    VoucherComponent.propDecorators = {
        redeem: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        hideMerchantImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        hideMerchantName: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        hideExpiry: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        hideActions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucherId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucher$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['voucher',] }],
        showRedeemedIcon: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        mapping: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        redeemLabelFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        expiryFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        descriptionLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tncLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return VoucherComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BcodeRedemptionComponent = /** @class */ (function () {
    function BcodeRedemptionComponent(vouchersService) {
        this.vouchersService = vouchersService;
        this.voucherId = null;
        this.instructions = 'Present this code to the cashier to complete your transaction.';
        this.showImage = true;
        this.showVoucherName = true;
        this.showAfterInstruction = false;
        this.showTermsAndCondition = true;
        this.useMinimalStyle = false;
        this.bCode = "";
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    BcodeRedemptionComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.voucherId && this.voucherId !== null) {
            this.voucher$ = this.vouchersService.get(this.voucherId);
        }
        if (changes.useMinimalStyle && this.useMinimalStyle) {
            this.useMinimalStyle = true;
            this.showImage = false;
            this.showVoucherName = false;
            this.showTermsAndCondition = false;
            this.showAfterInstruction = true;
        }
    };
    BcodeRedemptionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-bcode-redemption',
                    template: "<div [ngClass]=\"useMinimalStyle ? 'reward-container plain' : 'reward-container'\" *ngIf=\"voucher$ | async as voucher\">\n  <div class=\"reward-detail-container\">\n    <div class=\"reward-image-container\" *ngIf=\"showImage\">\n      <img class=\"reward-image\" src=\"{{voucher.reward.rewardBanner}}\">\n    </div>\n    <h1 *ngIf=\"showVoucherName\">{{voucher.reward.name}}</h1>\n    <div *ngIf=\"!showAfterInstruction\">\n      <pre class=\"bcode\" *ngIf=\"voucher?.code\">{{voucher.code}}</pre>\n    </div>\n    <p class=\"instruction\">{{voucher?.reward?.redemptionText || instructions}}</p>\n    <div *ngIf=\"showAfterInstruction\">\n      <div class=\"bcode\" *ngIf=\"voucher?.code\">{{voucher.code}}</div>\n    </div>\n  </div>\n  <p *ngIf=\"showTermsAndCondition\" class=\"tnc\">Terms & Conditions applies.</p>\n</div>\n",
                    styles: [":host{font-family:Roboto,sans-serif;font-style:normal}.reward-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:justify;justify-content:space-between;text-align:center;height:calc(100vh - 140px)}@media screen and (orientation:landscape){.reward-container{height:calc(100% - 140px);padding-bottom:80px}}h1{display:-webkit-box;display:flex;align-self:center;font-weight:700;font-size:2.4rem;text-align:center}.bcode{display:-webkit-box;display:flex;align-self:center;background:#fff;border:1px solid #ccc;box-sizing:border-box;border-radius:2px;text-align:center;margin:16px;font-size:1.6rem;min-height:4.5rem;-webkit-box-pack:center;justify-content:center;padding:1.5rem}.instruction{display:-webkit-box;display:flex;align-self:center;font-weight:400;font-size:1.4rem;text-align:center;color:#8f8f8f;margin-top:32px}.tnc{display:-webkit-box;display:flex;align-self:center;font-weight:400;font-size:1rem;text-align:center;color:#8f8f8f;margin-top:24px}.reward-detail-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.reward-image-container{margin-bottom:1.8rem;max-height:32rem}.reward-image{width:100%;max-height:32rem;-o-object-fit:cover;object-fit:cover}.reward-container.plain .instruction{font-size:2rem;color:#212121;font-weight:500}.reward-container.plain .bcode{font-size:2rem;font-weight:700;color:#000;border-radius:.5rem}"]
                }] }
    ];
    /** @nocollapse */
    BcodeRedemptionComponent.ctorParameters = function () { return [
        { type: IVoucherService }
    ]; };
    BcodeRedemptionComponent.propDecorators = {
        voucherId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        instructions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showTermsAndCondition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        useMinimalStyle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucher$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['voucher',] }]
    };
    return BcodeRedemptionComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinService = /** @class */ (function () {
    function PinService(vouchersService) {
        this.vouchersService = vouchersService;
    }
    /**
     * @param {?} voucherId
     * @return {?}
     */
    PinService.prototype.getPin = /**
     * @param {?} voucherId
     * @return {?}
     */
    function (voucherId) {
        var _this = this;
        return this.vouchersService.get(voucherId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} voucher
         * @return {?}
         */
        function (voucher) {
            /** @type {?} */
            var rewardId = '0000';
            if (voucher && voucher.reward) {
                // tslint:disable-next-line: radix
                rewardId = voucher.reward.id.toString();
            }
            return _this.generatePinCode(rewardId);
        })));
    };
    /**
     * @param {?} rewardId
     * @return {?}
     */
    PinService.prototype.generatePinCode = /**
     * @param {?} rewardId
     * @return {?}
     */
    function (rewardId) {
        return ('0000' + rewardId).slice(-4);
    };
    PinService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    PinService.ctorParameters = function () { return [
        { type: IVoucherService }
    ]; };
    /** @nocollapse */ PinService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function PinService_Factory() { return new PinService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(IVoucherService)); }, token: PinService, providedIn: "root" });
    return PinService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * \@todo this component currently implements its own logic, it should actually leverage pin-input component from UtilsModule
 */
var PinRedemptionComponent = /** @class */ (function () {
    function PinRedemptionComponent(element, pin, vouchersService) {
        this.element = element;
        this.pin = pin;
        this.vouchersService = vouchersService;
        this.length = 4;
        this.full = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.hasErrorEmit = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.pinFocused = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.controls = [];
        this.hasError = '';
    }
    /**
     * @return {?}
     */
    PinRedemptionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // length might not be a number
        if (typeof this.length === 'string') {
            this.length = Number.parseInt(this.length, 10);
        }
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < this.length; i++) {
            /** @type {?} */
            var ctrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
            this.controls.push(ctrl);
        }
        // listen to each FormControl
        this.controls.forEach((/**
         * @param {?} ctrl
         * @return {?}
         */
        function (ctrl) { return ctrl.valueChanges.subscribe((/**
         * @return {?}
         */
        function () { return _this.onUpdate(); })); }));
    };
    /**
     * @param {?} simpleChanges
     * @return {?}
     */
    PinRedemptionComponent.prototype.ngOnChanges = /**
     * @param {?} simpleChanges
     * @return {?}
     */
    function (simpleChanges) {
        var _this = this;
        if (simpleChanges.voucherId) {
            this.pin.getPin(this.voucherId).subscribe((/**
             * @param {?} code
             * @return {?}
             */
            function (code) {
                _this.pinCode = code;
            }));
        }
        else if (simpleChanges.voucher) {
            this.pin.getPin(this.voucher.id).subscribe((/**
             * @param {?} code
             * @return {?}
             */
            function (code) {
                _this.pinCode = code;
            }));
        }
    };
    /**
     * @return {?}
     */
    PinRedemptionComponent.prototype.onUpdate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var v = this.value;
        if (v.length === this.length) {
            // if full length reached, emit on complete
            if (this.validateCode(v)) {
                this.redeemVoucher();
            }
        }
        else {
            // move to next input box
            /** @type {?} */
            var elem = this.element.nativeElement.querySelector("#input_" + v.length);
            if (elem !== null) {
                elem.focus();
            }
        }
        this.update.emit(v);
    };
    /**
     * @return {?}
     */
    PinRedemptionComponent.prototype.redeemVoucher = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.vouchersService.redeemVoucher(this.voucherId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            _this.hasErrorEmit.emit(err.status);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])('Redeem failed');
        }))).subscribe((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res !== 'Redeem failed') {
                _this.full.emit(_this.value);
            }
        }));
    };
    /**
     * @param {?} code
     * @return {?}
     */
    PinRedemptionComponent.prototype.validateCode = /**
     * @param {?} code
     * @return {?}
     */
    function (code) {
        /** @type {?} */
        var isValid = !!(code === this.pinCode);
        this.hasError = isValid ? '' : 'error';
        return isValid;
    };
    Object.defineProperty(PinRedemptionComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.controls.reduce((/**
             * @param {?} p
             * @param {?} v
             * @return {?}
             */
            function (p, v) { return v.value === null ? p : "" + p + v.value; }), '');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    PinRedemptionComponent.prototype.onKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // remove last letter
        if (event.key === 'Backspace') {
            /** @type {?} */
            var v = this.value;
            if (v.length > 0 && v.length < this.length) {
                this.controls[v.length - 1].setValue('');
            }
            event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    PinRedemptionComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.pinFocused.emit(false);
    };
    /**
     * @return {?}
     */
    PinRedemptionComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.pinFocused.emit(true);
    };
    /**
     * @return {?}
     */
    PinRedemptionComponent.prototype.resetAll = /**
     * @return {?}
     */
    function () {
        this.hasError = '';
        this.controls.forEach((/**
         * @param {?} ctrl
         * @return {?}
         */
        function (ctrl) {
            ctrl.setValue('');
        }));
    };
    PinRedemptionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-pin-redemption',
                    template: "<div [ngClass]=\"'activation-code ' + hasError\">\n  <div class=\"activation-code__inputs\">\n    <div *ngFor=\"let ctrl of controls; let i = index\">\n      <input [ngClass]=\"hasError === '' ? 'correct': 'wrong'\" type=\"tel\" maxlength=\"1\" [formControl]=\"ctrl\" id=\"{{'input_'+i}}\" (keyup)=\"onKey($event)\"\n             (blur)=\"onBlur()\" (focus)=\"onFocus()\"\n             [attr.autofocus]=\"i === 0\" autocomplete=\"off\">\n    </div>\n  </div>\n  <div class=\"error-label\">Incorrect Code</div>\n</div>\n",
                    styles: [".activation-code{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.activation-code__inputs{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}input{width:63px;height:114px;border:2px solid rgba(0,0,0,.2);border-radius:4px;box-sizing:border-box;margin:8px;font-family:Roboto,sans-serif;font-style:normal;font-weight:400;font-size:80px;line-height:96px;text-align:center}input:focus{outline-color:#106cc8}.error input{border-color:#eb202f}.error input:focus{outline-color:#eb202f}.error-label{color:#eb202f;display:none;text-align:center;font-size:1.4rem;line-height:1.7rem;margin-top:2rem}.error .error-label{display:block}input.correct{background:#eef9e4}input.wrong{background:#fff3f9}"]
                }] }
    ];
    /** @nocollapse */
    PinRedemptionComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] },
        { type: PinService },
        { type: IVoucherService }
    ]; };
    PinRedemptionComponent.propDecorators = {
        length: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucherId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucher: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        full: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        hasErrorEmit: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        update: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        pinFocused: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PinRedemptionComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var QrcodeRedemptionComponent = /** @class */ (function () {
    function QrcodeRedemptionComponent(vouchersService) {
        this.vouchersService = vouchersService;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    QrcodeRedemptionComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.voucherId) {
            this.voucher$ = this.vouchersService.get(this.voucherId);
        }
    };
    QrcodeRedemptionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-qrcode-redemption',
                    template: "<div class=\"main-container\" *ngIf=\"voucher$ | async as voucher\">\n  <qrcode [qrdata]=\"voucher.code\" [size]=\"150\" [level]=\"'M'\"></qrcode>\n  <div\n    class=\"title\">{{voucher?.reward?.redemptionText || 'Present this QR code to the cashier to complete your redemption'}}</div>\n  <div class=\"voucher-name\">{{voucher.reward.name}}</div>\n</div>\n",
                    styles: [".main-container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center}.title{text-align:center;font-size:1.8rem;line-height:2.2rem;color:#212b36;margin-top:1rem}.voucher-name{font-size:1.2rem;line-height:1.4rem;color:#6b6b6b;margin-top:1rem}"]
                }] }
    ];
    /** @nocollapse */
    QrcodeRedemptionComponent.ctorParameters = function () { return [
        { type: IVoucherService }
    ]; };
    QrcodeRedemptionComponent.propDecorators = {
        voucherId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucher$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['voucher',] }]
    };
    return QrcodeRedemptionComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var BarcodeRedemptionComponent = /** @class */ (function () {
    function BarcodeRedemptionComponent(vouchersService) {
        this.vouchersService = vouchersService;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    BarcodeRedemptionComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.voucherId) {
            this.voucher$ = this.vouchersService.get(this.voucherId);
        }
    };
    BarcodeRedemptionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-barcode-redemption',
                    template: "<div\n  class=\"main-container\"\n  *ngIf=\"voucher$ | async as voucher\"\n>\n  <ngx-barcode\n    [bc-value]=\"voucher.code\"\n    [bc-display-value]=\"true\"\n  ></ngx-barcode>\n  <div class=\"title\">\n    {{voucher?.reward?.redemptionText || 'Present this barcode to the cashier to complete your redemption'}}\n  </div>\n  <div class=\"voucher-name\">\n    {{voucher.reward.name}}\n  </div>\n</div>\n",
                    styles: [".main-container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-align:center;align-items:center}.title{text-align:center;font-size:1.8rem;line-height:2.2rem;color:#212b36;margin-top:1rem}.voucher-name{font-size:1.2rem;line-height:1.4rem;color:#6b6b6b;margin-top:1rem}"]
                }] }
    ];
    /** @nocollapse */
    BarcodeRedemptionComponent.ctorParameters = function () { return [
        { type: IVoucherService }
    ]; };
    BarcodeRedemptionComponent.propDecorators = {
        voucherId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucher$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['voucher',] }]
    };
    return BarcodeRedemptionComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
Config = /** @class */ (function () {
    function Config() {
    }
    return Config;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
RewardsService = /** @class */ (function () {
    function RewardsService() {
    }
    return RewardsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4Tag() { }
if (false) {}
/**
 * @record
 */
function IV4Image() { }
if (false) {}
/**
 * @record
 */
function IV4RewardPrice() { }
if (false) {}
/**
 * @record
 */
function IV4Inventory() { }
if (false) {}
/**
 * @record
 */
function IV4Reward() { }
if (false) {}
/**
 * @record
 */
function IV4Price() { }
if (false) {}
/**
 * @record
 */
function IV4GetRewardsResponse() { }
if (false) {}
/**
 * @record
 */
function IV4GetRewardResponse() { }
if (false) {}
/**
 * @record
 */
function IV4GetRewardPricesResponse() { }
if (false) {}
/**
 * @record
 */
function IV4GetCatalogsResponse() { }
if (false) {}
/**
 * @record
 */
function IV4GetCatalogResponse() { }
if (false) {}
/**
 * @record
 */
function IV4Catalog() { }
if (false) {}
/**
 * @record
 */
function IV4CatalogResults() { }
if (false) {}
var V4RewardsService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4RewardsService, _super);
    function V4RewardsService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.apiHost = (/** @type {?} */ (config.apiHost));
        return _this;
    }
    /**
     * @param {?} reward
     * @return {?}
     */
    V4RewardsService.v4RewardToReward = /**
     * @param {?} reward
     * @return {?}
     */
    function (reward) {
        /** @type {?} */
        var images = reward.images || [];
        /** @type {?} */
        var thumbnail = images.find((/**
         * @param {?} image
         * @return {?}
         */
        function (image) { return image.type === 'reward_thumbnail'; }));
        if (thumbnail === undefined) {
            thumbnail = images.find((/**
             * @param {?} image
             * @return {?}
             */
            function (image) { return image.type === 'reward_logo'; }));
        }
        /** @type {?} */
        var thumbnailImg = thumbnail && thumbnail.url;
        /** @type {?} */
        var banner = images.find((/**
         * @param {?} image
         * @return {?}
         */
        function (image) { return image.type === 'reward_banner'; }));
        /** @type {?} */
        var rewardBanner = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(banner).url('');
        /** @type {?} */
        var merchantImg = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(reward).merchant_logo_url();
        /** @type {?} */
        var sellingFrom = reward.selling_from ? new Date(reward.selling_from) : undefined;
        /** @type {?} */
        var v4Invent = reward.inventory;
        /** @type {?} */
        var inventory = v4Invent ? {
            rewardTotalBalance: v4Invent.reward_total_balance !== undefined ? v4Invent.reward_total_balance : null,
            rewardTotalLimit: v4Invent.reward_total_limit !== undefined ? v4Invent.reward_total_limit : null,
            rewardLimitPerUserBalance: v4Invent.reward_limit_per_user_balance !== undefined && v4Invent.reward_limit_per_user_balance !== null ?
                v4Invent.reward_limit_per_user_balance.available_amount : null
        } : undefined;
        return {
            id: reward.id,
            name: reward.name,
            subtitle: reward.subtitle,
            description: reward.description,
            rewardPrice: reward.reward_price ? reward.reward_price.map((/**
             * @param {?} price
             * @return {?}
             */
            function (price) { return ({
                id: price.id,
                currencyCode: price.currency_code,
                price: price.price,
                points: price.points,
                identifier: price.identifier
            }); })) : undefined,
            rewardThumbnail: thumbnailImg,
            rewardBanner: rewardBanner,
            validFrom: new Date(reward.valid_from),
            validTo: new Date(reward.valid_to),
            sellingFrom: sellingFrom,
            merchantId: reward.merchant_id,
            merchantName: reward.merchant_name,
            merchantImg: merchantImg,
            merchantWebsite: reward.merchant_website,
            termsAndConditions: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(reward).terms_and_conditions(''),
            howToRedeem: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(reward).how_to_redeem(''),
            categoryTags: reward.category_tags,
            inventory: inventory,
            displayProperties: reward.display_properties,
        };
    };
    /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    V4RewardsService.v4CatalogToCatalog = /**
     * @private
     * @param {?} catalog
     * @return {?}
     */
    function (catalog) {
        /** @type {?} */
        var images = catalog.images || [];
        /** @type {?} */
        var thumbnail = images.find((/**
         * @param {?} image
         * @return {?}
         */
        function (image) { return image.type === 'catalog_thumbnail'; }));
        if (thumbnail === undefined) {
            thumbnail = images.find((/**
             * @param {?} image
             * @return {?}
             */
            function (image) { return image.type === 'catalog_logo'; }));
        }
        /** @type {?} */
        var thumbnailImg = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(thumbnail).url('');
        /** @type {?} */
        var banner = images.find((/**
         * @param {?} image
         * @return {?}
         */
        function (image) { return image.type === 'catalog_banner'; }));
        /** @type {?} */
        var catalogBanner = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(banner).url('');
        /** @type {?} */
        var rewards = catalog.rewards && catalog.rewards.map((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) { return V4RewardsService.v4RewardToReward(reward); }));
        return {
            id: catalog.id,
            name: catalog.name,
            description: catalog.description,
            catalogThumbnail: thumbnailImg,
            catalogBanner: catalogBanner,
            rewardCount: catalog.catalog_results.count,
            rewards: rewards
        };
    };
    /**
     * @param {?} price
     * @return {?}
     */
    V4RewardsService.v4PriceToPrice = /**
     * @param {?} price
     * @return {?}
     */
    function (price) {
        return {
            id: price.id,
            rewardCampaignId: price.reward_campaign_id,
            price: price.price,
            currencyCode: price.currency_code,
            points: price.points,
            identifier: price.identifier
        };
    };
    /**
     * @param {?=} tags
     * @param {?=} categories
     * @param {?=} locale
     * @return {?}
     */
    V4RewardsService.prototype.getAllRewards = /**
     * @param {?=} tags
     * @param {?=} categories
     * @param {?=} locale
     * @return {?}
     */
    function (tags, categories, locale) {
        var _this = this;
        if (locale === void 0) { locale = 'en'; }
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]((/**
         * @param {?} subject
         * @return {?}
         */
        function (subject) {
            /** @type {?} */
            var pageSize = 10;
            /** @type {?} */
            var current = [];
            /** @type {?} */
            var page = 1;
            // we do not want to get all pages in parallel, so we get pages one after the other in order not to dos the server
            /** @type {?} */
            var process = (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                current = current.concat(res);
                subject.next(current);
                // if finished close the stream
                if (res.length < pageSize) {
                    subject.complete();
                }
                else {
                    // otherwise get next page
                    page++;
                    _this.getRewards(page, undefined, tags, categories, locale)
                        .subscribe(process);
                }
            });
            // do the first query
            _this.getRewards(1, undefined, tags, categories, locale)
                .subscribe(process);
        }));
    };
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @param {?=} locale
     * @return {?}
     */
    V4RewardsService.prototype.getRewards = /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @param {?=} locale
     * @return {?}
     */
    function (page, pageSize, tags, categories, locale) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]()
            .set('page', page.toString())
            .set('size', pageSize.toString());
        if (tags) {
            params = params.set('tags', tags.join());
        }
        if (categories) {
            params = params.set('categories', categories.join());
        }
        return this.http.get(this.apiHost + "/v4/rewards", { headers: headers, params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} rewards
         * @return {?}
         */
        function (rewards) { return rewards.map((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) { return V4RewardsService.v4RewardToReward(reward); })); })));
    };
    /**
     * @param {?} id
     * @param {?=} userId
     * @param {?=} locale
     * @return {?}
     */
    V4RewardsService.prototype.getReward = /**
     * @param {?} id
     * @param {?=} userId
     * @param {?=} locale
     * @return {?}
     */
    function (id, userId, locale) {
        if (userId === void 0) { userId = ''; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Content-Type', 'application/json')
            .set('user-id', userId)
            .set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/rewards/" + id, { headers: headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) { return V4RewardsService.v4RewardToReward(reward); })));
    };
    /**
     * @param {?=} locale
     * @return {?}
     */
    V4RewardsService.prototype.getAllCatalogs = /**
     * @param {?=} locale
     * @return {?}
     */
    function (locale) {
        var _this = this;
        if (locale === void 0) { locale = 'en'; }
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]((/**
         * @param {?} subject
         * @return {?}
         */
        function (subject) {
            /** @type {?} */
            var pageSize = 100;
            /** @type {?} */
            var current = [];
            /** @type {?} */
            var page = 1;
            /** @type {?} */
            var process = (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                current = current.concat(res);
                subject.next(current);
                // if finished close the stream
                if (res.length < pageSize) {
                    subject.complete();
                }
                else {
                    // otherwise get next page
                    page++;
                    _this.getCatalogs(page + 1, pageSize, locale)
                        .subscribe(process);
                }
            });
            // do the first query
            _this.getCatalogs(1, pageSize, locale)
                .subscribe(process);
        }));
    };
    /**
     * @private
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    V4RewardsService.prototype.getCatalogs = /**
     * @private
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    function (page, pageSize, locale) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/catalogs", {
            headers: headers,
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} catalogs
         * @return {?}
         */
        function (catalogs) { return catalogs.map((/**
         * @param {?} catalog
         * @return {?}
         */
        function (catalog) { return V4RewardsService.v4CatalogToCatalog(catalog); })); })));
    };
    /**
     * @param {?} id
     * @param {?=} locale
     * @return {?}
     */
    V4RewardsService.prototype.getCatalog = /**
     * @param {?} id
     * @param {?=} locale
     * @return {?}
     */
    function (id, locale) {
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/catalogs/" + id, { headers: headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} catalog
         * @return {?}
         */
        function (catalog) { return V4RewardsService.v4CatalogToCatalog(catalog); })));
    };
    /**
     * @param {?} id
     * @param {?=} locale
     * @return {?}
     */
    V4RewardsService.prototype.getRewardPricesOptions = /**
     * @param {?} id
     * @param {?=} locale
     * @return {?}
     */
    function (id, locale) {
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/rewards/" + id + "/prices", { headers: headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} prices
         * @return {?}
         */
        function (prices) { return prices.map((/**
         * @param {?} price
         * @return {?}
         */
        function (price) { return V4RewardsService.v4PriceToPrice(price); })); })));
    };
    V4RewardsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4RewardsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4RewardsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4RewardsService_Factory() { return new V4RewardsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4RewardsService, providedIn: "root" });
    return V4RewardsService;
}(RewardsService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var RedemptionType = {
    pin: 'pin',
    txtCode: 'txtCode',
    qr: 'qrcode',
    barcode: 'barcode',
    none: 'none',
    offline: 'offline',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4Meta() { }
if (false) {}
/**
 * @record
 */
function IV4ReserveRewardResponse() { }
if (false) {}
/**
 * @record
 */
function IV4MinifiedVoucher() { }
if (false) {}
/**
 * @record
 */
function IV4VouchersResponse() { }
if (false) {}
/**
 * @record
 */
function IV4VoucherResponse() { }
if (false) {}
/**
 * @record
 */
function IV4Voucher() { }
if (false) {}
var V4VouchersService = /** @class */ (function () {
    function V4VouchersService(http, config) {
        this.http = http;
        this.config = config;
        this.vouchers = [];
    }
    /**
     * @param {?} v
     * @return {?}
     */
    V4VouchersService.v4VoucherToVoucher = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        /** @type {?} */
        var reward = v.reward ? v.reward : null;
        return {
            id: v.id,
            reward: reward ? V4RewardsService.v4RewardToReward(reward) : null,
            state: v.state,
            code: (typeof v.voucher_code === 'string') ? v.voucher_code : undefined,
            expiry: reward && reward.valid_to !== null ? new Date(reward.valid_to) : null,
            redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
            redemptionType: v.redemption_type !== null &&
                (v.redemption_type.type !== null && v.redemption_type.type !== 'offline') ? v.redemption_type.type :
                v.voucher_type.toString() === 'code' ? RedemptionType.txtCode : v.voucher_type
        };
    };
    /**
     * @param {?=} voucherParams
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.getAll = /**
     * @param {?=} voucherParams
     * @param {?=} locale
     * @return {?}
     */
    function (voucherParams, locale) {
        var _this = this;
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        if (this.vouchers.length > 0) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.vouchers);
        }
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]()
            .set('sort_by', 'id')
            .set('order', 'desc');
        if (voucherParams && voucherParams.type) {
            params = params.set('type', voucherParams.type);
        }
        if (voucherParams && voucherParams.sourceType) {
            params = params.set('source_type', voucherParams.sourceType);
        }
        return this.http.get(this.vouchersUrl, { headers: headers, params: params })
            .pipe(
        // todo change to a combination of switchMap and combineLatest
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["flatMap"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(resp.data)
            ];
            for (var i = 2; i <= resp.meta.total_pages; i++) {
                /** @type {?} */
                var stream = _this.getAllFromPage(i, voucherParams, locale);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return V4VouchersService.v4VoucherToVoucher(v); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) { return vouchers.sort((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(v1).reward.id(0) - Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(v2).reward.id(0); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) { return _this.vouchers = vouchers; })));
    };
    /**
     * @param {?} page
     * @param {?=} voucherParams
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.getAllFromPage = /**
     * @param {?} page
     * @param {?=} voucherParams
     * @param {?=} locale
     * @return {?}
     */
    function (page, voucherParams, locale) {
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]()
            .set('page', page.toString())
            .set('sort_by', 'id')
            .set('order', 'desc');
        if (voucherParams && voucherParams.type) {
            params = params.set('type', voucherParams.type);
        }
        if (voucherParams && voucherParams.sourceType) {
            params = params.set('source_type', voucherParams.sourceType);
        }
        return this.http.get(this.vouchersUrl, { headers: headers, params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })));
    };
    Object.defineProperty(V4VouchersService.prototype, "vouchersUrl", {
        get: /**
         * @return {?}
         */
        function () {
            return this.config.apiHost + "/v4/vouchers?redeemed_within=-1&expired_within=-1";
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} id
     * @param {?=} useCache
     * @param {?=} voucherParams
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.get = /**
     * @param {?} id
     * @param {?=} useCache
     * @param {?=} voucherParams
     * @param {?=} locale
     * @return {?}
     */
    function (id, useCache, voucherParams, locale) {
        var _this = this;
        if (useCache === void 0) { useCache = true; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        if (useCache) {
            /** @type {?} */
            var found = this.vouchers.find((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return "" + v.id === "" + id; }));
            if (found !== undefined) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(found);
            }
        }
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]();
        if (voucherParams && voucherParams.sourceType) {
            params = params.set('source_type', voucherParams.sourceType);
        }
        /** @type {?} */
        var url = this.config.apiHost + "/v4/vouchers/" + id;
        return this.http.get(url, { headers: headers, params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return V4VouchersService.v4VoucherToVoucher(v); })), 
        // if the vouchers list was not empty but we are here, it means it is a new voucher, so let's add it.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} v
         * @return {?}
         */
        function (v) {
            if (_this.vouchers.length > 0 && !_this.vouchers.some((/**
             * @param {?} voucher
             * @return {?}
             */
            function (voucher) { return voucher.id === v.id; }))) {
                _this.vouchers.unshift(v);
            }
        })));
    };
    /**
     * @param {?} id
     * @param {?=} options
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.redeemVoucher = /**
     * @param {?} id
     * @param {?=} options
     * @param {?=} locale
     * @return {?}
     */
    function (id, options, locale) {
        var _this = this;
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        /** @type {?} */
        var url = this.config.apiHost + "/v4/vouchers/" + id + "/redeem";
        /** @type {?} */
        var post = !options ? null : options;
        return this.http.post(url, post, { headers: headers })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return _this.reset(); })));
    };
    // resets the current cache to a new list or by default nothing, and it will filled during the next call to getAll
    // resets the current cache to a new list or by default nothing, and it will filled during the next call to getAll
    /**
     * @param {?=} vouchers
     * @return {?}
     */
    V4VouchersService.prototype.reset = 
    // resets the current cache to a new list or by default nothing, and it will filled during the next call to getAll
    /**
     * @param {?=} vouchers
     * @return {?}
     */
    function (vouchers) {
        if (vouchers === void 0) { vouchers = []; }
        this.vouchers = vouchers;
    };
    /**
     * @param {?} rewardId
     * @param {?=} intervalPeriod
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.newVouchersCreatedForReward = /**
     * @param {?} rewardId
     * @param {?=} intervalPeriod
     * @param {?=} locale
     * @return {?}
     */
    function (rewardId, intervalPeriod, locale) {
        var _this = this;
        if (intervalPeriod === void 0) { intervalPeriod = 1000; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var current = 0;
        /** @type {?} */
        var firstPageVouchers = [];
        /** @type {?} */
        var newIssued = [];
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["interval"])(intervalPeriod).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            current = val;
            return _this.getAllFromPage(1, undefined, locale);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeAll"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} v4Vouchers
         * @return {?}
         */
        function (v4Vouchers) { return v4Vouchers.map((/**
         * @param {?} v4Voucher
         * @return {?}
         */
        function (v4Voucher) { return V4VouchersService.v4VoucherToVoucher(v4Voucher); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) { return vouchers.filter((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.reward && v.reward.id === rewardId && v.state === 'issued'; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) {
            if (current === 0) {
                firstPageVouchers = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(vouchers.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return v.id; })));
                return false;
            }
            if (vouchers && vouchers.length <= 0) {
                firstPageVouchers = [];
                return false;
            }
            newIssued = vouchers.filter((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return !firstPageVouchers.includes(v.id); }));
            if (newIssued && newIssued.length <= 0) {
                return false;
            }
            firstPageVouchers = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(vouchers.map((/**
             * @param {?} v
             * @return {?}
             */
            function (v) { return v.id; })));
            return true;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} _
         * @return {?}
         */
        function (_) { return newIssued; })));
    };
    /**
     * @param {?} voucherId
     * @param {?=} intervalPeriod
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.stateChangedForVoucher = /**
     * @param {?} voucherId
     * @param {?=} intervalPeriod
     * @param {?=} locale
     * @return {?}
     */
    function (voucherId, intervalPeriod, locale) {
        var _this = this;
        if (intervalPeriod === void 0) { intervalPeriod = 1000; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var current = 0;
        /** @type {?} */
        var previousState;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["interval"])(intervalPeriod).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            current = val;
            return _this.get(voucherId, false, undefined, locale);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeAll"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
         * @param {?} voucher
         * @return {?}
         */
        function (voucher) {
            if (current === 0) {
                previousState = voucher.state;
                return false;
            }
            if (previousState === voucher.state) {
                return false;
            }
            previousState = voucher.state;
            return true;
        })));
    };
    /**
     * @param {?} rewardId
     * @param {?=} rewardParams
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.reserveReward = /**
     * @param {?} rewardId
     * @param {?=} rewardParams
     * @param {?=} locale
     * @return {?}
     */
    function (rewardId, rewardParams, locale) {
        var _this = this;
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]();
        /** @type {?} */
        var headers = (new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]()).set('Accept-Language', locale);
        if (rewardParams && rewardParams.locationId) {
            params = params.set('location_id', rewardParams.locationId.toString());
        }
        if (rewardParams && rewardParams.priceId) {
            params = params.set('price_id', rewardParams.priceId.toString());
        }
        if (rewardParams && rewardParams.sourceType) {
            params = params.set('source_type', rewardParams.sourceType);
        }
        return this.http.post(this.config.apiHost + "/v4/rewards/" + rewardId + "/reserve", null, { headers: headers, params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} minVoucher
         * @return {?}
         */
        function (minVoucher) { return _this.get(minVoucher.id, undefined, undefined, locale); })));
    };
    /**
     * @param {?} rewardId
     * @param {?=} sourceType
     * @param {?=} locale
     * @return {?}
     */
    V4VouchersService.prototype.issueReward = /**
     * @param {?} rewardId
     * @param {?=} sourceType
     * @param {?=} locale
     * @return {?}
     */
    function (rewardId, sourceType, locale) {
        var _this = this;
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]();
        if (sourceType) {
            params = params.set('source_type', sourceType);
        }
        return this.http.post(this.config.apiHost + "/v4/rewards/" + rewardId + "/issue", { headers: headers, params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} minVoucher
         * @return {?}
         */
        function (minVoucher) { return _this.get(minVoucher.id, undefined, undefined, locale); })));
    };
    V4VouchersService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4VouchersService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4VouchersService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4VouchersService_Factory() { return new V4VouchersService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4VouchersService, providedIn: "root" });
    return V4VouchersService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerVouchersService = /** @class */ (function () {
    function WhistlerVouchersService(http, config, rewardsService) {
        this.http = http;
        this.config = config;
        this.rewardsService = rewardsService;
        // quick cache
        this.vouchers = [];
    }
    /**
     * @private
     * @param {?} stat
     * @return {?}
     */
    WhistlerVouchersService.WVoucherStatusToState = /**
     * @private
     * @param {?} stat
     * @return {?}
     */
    function (stat) {
        switch (stat) {
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WAssignedStatus"].assigned:
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WAssignedStatus"].issued:
                return VoucherState.issued;
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WAssignedStatus"].reserved:
                return VoucherState.reserved;
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WAssignedStatus"].expired:
                return VoucherState.expired;
            default:
                return VoucherState.redeemed;
        }
    };
    /**
     * @private
     * @param {?} voucher
     * @param {?} reward
     * @return {?}
     */
    WhistlerVouchersService.WVoucherToVoucher = /**
     * @private
     * @param {?} voucher
     * @param {?} reward
     * @return {?}
     */
    function (voucher, reward) {
        return {
            id: (typeof voucher.id === 'string') ? Number.parseInt(voucher.id, 10) : voucher.id,
            reward: reward,
            state: WhistlerVouchersService.WVoucherStatusToState(voucher.attributes.status),
            code: voucher.attributes.value,
            expiry: voucher.attributes.valid_to ? new Date(voucher.attributes.valid_to) : null,
        };
    };
    /**
     * @private
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    WhistlerVouchersService.compare = /**
     * @private
     * @param {?} a
     * @param {?} b
     * @return {?}
     */
    function (a, b) {
        /** @type {?} */
        var merchantIdA = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(a).reward.merchantId();
        /** @type {?} */
        var merchantIdB = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(b).reward.merchantId();
        if (merchantIdA ? !merchantIdB : merchantIdB) {
            return !merchantIdA ? 1 : -1;
        }
        return 0;
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?=} voucherParams
     * @return {?}
     */
    WhistlerVouchersService.prototype.getAll = 
    // @ts-ignore
    /**
     * @param {?=} voucherParams
     * @return {?}
     */
    function (voucherParams) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]((/**
         * @param {?} subscriber
         * @return {?}
         */
        function (subscriber) {
            /** @type {?} */
            var vouchers = [];
            if (_this.vouchers.length > 0) {
                // if cache is not empty let's emit the cache first
                subscriber.next(vouchers);
            }
            /** @type {?} */
            var process = (/**
             * @param {?} p
             * @param {?} res
             * @return {?}
             */
            function (p, res) {
                /** @type {?} */
                var vsQuerries = res.data.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return _this.getFullVoucher(v); }));
                Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["combineLatest"])(vsQuerries)
                    .subscribe((/**
                 * @param {?} vs
                 * @return {?}
                 */
                function (vs) {
                    vouchers = vouchers.concat(vs).sort(WhistlerVouchersService.compare);
                    // update data in the cache
                    _this.vouchers = vouchers;
                    subscriber.next(vouchers);
                    if (!res.meta || !res.meta.page_count || p >= res.meta.page_count) {
                        subscriber.complete();
                    }
                    else {
                        // tslint:disable-next-line: rxjs-no-nested-subscribe
                        _this.getPage(p + 1).subscribe((/**
                         * @param {?} resi
                         * @return {?}
                         */
                        function (resi) { return process(p + 1, resi); }));
                    }
                }));
            });
            _this.getPage(1).subscribe((/**
             * @param {?} vs
             * @return {?}
             */
            function (vs) { return process(1, vs); }));
        }));
    };
    /**
     * @private
     * @param {?} page
     * @return {?}
     */
    WhistlerVouchersService.prototype.getPage = /**
     * @private
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var size = 10;
        return this.http.get(this.vouchersUrl + "?page[number]=" + page + "&page[size]=" + size);
    };
    /**
     * @package
     */
    /**
     * @package
     * @param {?} voucher
     * @return {?}
     */
    WhistlerVouchersService.prototype.getFullVoucher = /**
     * @package
     * @param {?} voucher
     * @return {?}
     */
    function (voucher) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["combineLatest"])(Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(voucher), this.rewardsService.getReward(voucher.attributes.source_id))
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), v = _b[0], reward = _b[1];
            return WhistlerVouchersService.WVoucherToVoucher(v, reward);
        })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @param {?=} useCache
     * @return {?}
     */
    WhistlerVouchersService.prototype.get = 
    // @ts-ignore
    /**
     * @param {?} id
     * @param {?=} useCache
     * @return {?}
     */
    function (id, useCache) {
        var _this = this;
        return this.http.get(this.vouchersUrl + "/" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} voucher
         * @return {?}
         */
        function (voucher) { return _this.getFullVoucher(voucher); })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerVouchersService.prototype.redeemVoucher = 
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        throw new Error('Method not implemented.');
    };
    /**
     * @param {?=} vouchers
     * @return {?}
     */
    WhistlerVouchersService.prototype.reset = /**
     * @param {?=} vouchers
     * @return {?}
     */
    function (vouchers) {
        this.vouchers = vouchers !== undefined ? vouchers : [];
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @param {?=} intervalPeriod
     * @return {?}
     */
    WhistlerVouchersService.prototype.newVouchersCreatedForReward = 
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @param {?=} intervalPeriod
     * @return {?}
     */
    function (rewardId, intervalPeriod) {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} voucherId
     * @param {?=} intervalPeriod
     * @return {?}
     */
    WhistlerVouchersService.prototype.stateChangedForVoucher = 
    // @ts-ignore
    /**
     * @param {?} voucherId
     * @param {?=} intervalPeriod
     * @return {?}
     */
    function (voucherId, intervalPeriod) {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @param {?=} params
     * @return {?}
     */
    WhistlerVouchersService.prototype.reserveReward = 
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @param {?=} params
     * @return {?}
     */
    function (rewardId, params) {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @param {?=} sourceType
     * @param {?=} locale
     * @param {?=} cardId
     * @return {?}
     */
    WhistlerVouchersService.prototype.issueReward = 
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @param {?=} sourceType
     * @param {?=} locale
     * @param {?=} cardId
     * @return {?}
     */
    function (rewardId, sourceType, locale, cardId) {
        var _this = this;
        if (locale === void 0) { locale = 'en'; }
        return this.http.post(this.config.apiHost + "/voucher-service/purchase_requests", {
            data: {
                type: 'purchase_request',
                attributes: {
                    loyalty_card_id: cardId,
                    reward_entity_id: rewardId
                }
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data.attributes.voucher_id; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} voucherId
         * @return {?}
         */
        function (voucherId) { return _this.get(voucherId); })));
    };
    Object.defineProperty(WhistlerVouchersService.prototype, "vouchersUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiHost + "/voucher-service/vouchers";
        },
        enumerable: true,
        configurable: true
    });
    WhistlerVouchersService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerVouchersService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config },
        { type: RewardsService }
    ]; };
    /** @nocollapse */ WhistlerVouchersService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerVouchersService_Factory() { return new WhistlerVouchersService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(RewardsService)); }, token: WhistlerVouchersService, providedIn: "root" });
    return WhistlerVouchersService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var modules = [
    _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatRippleModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatGridListModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatTabsModule"]
];
var MaterialModule = /** @class */ (function () {
    function MaterialModule() {
    }
    MaterialModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(modules),
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(modules)
                },] }
    ];
    return MaterialModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPopupConfig() { }
if (false) {}
/**
 * @record
 */
function PopUpClosedCallBack() { }
if (false) {}
/**
 * Generic Popup content to be used like this: https://material.angular.io/components/dialog/overview
 */
var PopupComponent = /** @class */ (function () {
    function PopupComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.title = null;
        this.text = null;
        this.imageUrl = null;
        this.buttonTxt = 'close';
        this.buttonTxt2 = null;
        if (data.disableOverlayClose) {
            dialogRef.disableClose = data.disableOverlayClose;
        }
        if (data.title) {
            this.title = data.title;
        }
        if (data.text) {
            this.text = data.text;
        }
        if (data.buttonTxt !== undefined) {
            this.buttonTxt = data.buttonTxt;
        }
        if (data.imageUrl) {
            this.imageUrl = data.imageUrl;
        }
        if (data.buttonTxt2) {
            this.buttonTxt2 = data.buttonTxt2;
        }
    }
    // todo: only set up host listener if disableOverlayClose = true
    // todo: only set up host listener if disableOverlayClose = true
    /**
     * @return {?}
     */
    PopupComponent.prototype.onKeyUp = 
    // todo: only set up host listener if disableOverlayClose = true
    /**
     * @return {?}
     */
    function () {
        this.dialogRef.close(false);
    };
    /**
     * @return {?}
     */
    PopupComponent.prototype.buttonPressed = /**
     * @return {?}
     */
    function () {
        if (this.data.afterClosedCallBack) {
            this.data.afterClosedCallBack.dialogClosed();
        }
    };
    PopupComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-popup',
                    template: "<h1 *ngIf=\"title\" mat-dialog-title>{{title}}</h1>\n<div *ngIf=\"imageUrl\" class=\"img-wrapper\">\n\t<img [src]=\"imageUrl\"/>\n</div>\n<mat-dialog-content *ngIf=\"text\">{{text}}</mat-dialog-content>\n<div class=\"button-group\">\n\t<button *ngIf=\"buttonTxt2\" mat-stroked-button class=\"button-secondary\" mat-dialog-close tabindex=\"-1\">{{buttonTxt2}}</button>\n\t<button mat-flat-button color=\"primary\" mat-dialog-close (click)=\"buttonPressed()\" tabindex=\"-1\">{{buttonTxt}}</button>\n</div>\n",
                    styles: ["button{margin-top:16px;width:100%;text-transform:uppercase}h1{text-align:center;font-size:2.4rem;line-height:2.8rem;margin:0 auto 2rem}.img-wrapper{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;margin:2.5rem}.img-wrapper img{display:block;margin:0 auto 2rem;max-width:100%;max-height:30rem;height:auto;width:auto}mat-dialog-content{text-align:center;font-size:1.6rem;line-height:1.8rem}.button-group{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;margin-top:2.7rem}.button-group button{margin:0 .5rem}"]
                }] }
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_11__["MAT_DIALOG_DATA"],] }] }
    ]; };
    PopupComponent.propDecorators = {
        onKeyUp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['window:keyup.esc',] }]
    };
    return PopupComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this.$popupSubject = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.$snackSubject = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    /**
     * @param {?} config
     * @return {?}
     */
    NotificationService.prototype.addPopup = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        this.$popupSubject.next(config);
    };
    /**
     * @param {?} msg
     * @return {?}
     */
    NotificationService.prototype.addSnack = /**
     * @param {?} msg
     * @return {?}
     */
    function (msg) {
        this.$snackSubject.next(msg);
    };
    Object.defineProperty(NotificationService.prototype, "$popup", {
        get: /**
         * @return {?}
         */
        function () {
            return this.$popupSubject;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(NotificationService.prototype, "$snack", {
        get: /**
         * @return {?}
         */
        function () {
            return this.$snackSubject;
        },
        enumerable: true,
        configurable: true
    });
    NotificationService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    NotificationService.ctorParameters = function () { return []; };
    /** @nocollapse */ NotificationService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function NotificationService_Factory() { return new NotificationService(); }, token: NotificationService, providedIn: "root" });
    return NotificationService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NumericCharacterDirective = /** @class */ (function () {
    function NumericCharacterDirective() {
        this.onlyNumbersRegExp = new RegExp('^\\d+$');
    }
    /**
     * @param {?} e
     * @return {?}
     */
    NumericCharacterDirective.prototype.pasteClipboard = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (!e.clipboardData) {
            return false;
        }
        /** @type {?} */
        var data = e.clipboardData.getData('text');
        return this.onlyNumbersRegExp.test(data) ? true : false;
    };
    /**
     * @param {?} e
     * @return {?}
     */
    NumericCharacterDirective.prototype.onKeyDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        return (e.ctrlKey ||
            e.metaKey ||
            e.code === 'Backspace' ||
            e.code === 'Tab' ||
            e.code === 'ArrowLeft' ||
            e.code === 'ArrowRight' ||
            e.code === 'Delete' ||
            e.code === 'Enter') ?
            true : this.onlyNumbersRegExp.test(e.key);
    };
    NumericCharacterDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[perxCoreNumericCharacter]'
                },] }
    ];
    NumericCharacterDirective.propDecorators = {
        pasteClipboard: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['paste', ['$event'],] }],
        onKeyDown: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['keydown', ['$event'],] }]
    };
    return NumericCharacterDirective;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DebounceClickDirective = /** @class */ (function () {
    function DebounceClickDirective() {
        this.debounceTime = 500;
        this.debounceClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.clicks = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    /**
     * @return {?}
     */
    DebounceClickDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.clicks.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(this.debounceTime)).subscribe((/**
         * @param {?} e
         * @return {?}
         */
        function (e) { return _this.debounceClick.emit(e); }));
    };
    /**
     * @return {?}
     */
    DebounceClickDirective.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.subscription.unsubscribe();
    };
    /**
     * @param {?} event
     * @return {?}
     */
    DebounceClickDirective.prototype.clickEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        event.preventDefault();
        event.stopPropagation();
        this.clicks.next(event);
    };
    DebounceClickDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[perxCoreAppDebounceClick]'
                },] }
    ];
    DebounceClickDirective.propDecorators = {
        debounceTime: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        debounceClick: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        clickEvent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['click', ['$event'],] }]
    };
    return DebounceClickDirective;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RepeatTimesDirective = /** @class */ (function () {
    function RepeatTimesDirective(templateRef, viewContainer) {
        this.templateRef = templateRef;
        this.viewContainer = viewContainer;
    }
    Object.defineProperty(RepeatTimesDirective.prototype, "perxCoreRepeatTimes", {
        set: /**
         * @param {?} times
         * @return {?}
         */
        function (times) {
            for (var i = 0; i < times; i++) {
                this.viewContainer.createEmbeddedView(this.templateRef);
            }
        },
        enumerable: true,
        configurable: true
    });
    RepeatTimesDirective.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Directive"], args: [{
                    selector: '[perxCoreRepeatTimes]'
                },] }
    ];
    /** @nocollapse */
    RepeatTimesDirective.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["TemplateRef"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewContainerRef"] }
    ]; };
    RepeatTimesDirective.propDecorators = {
        perxCoreRepeatTimes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return RepeatTimesDirective;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinInputComponent = /** @class */ (function () {
    function PinInputComponent(element) {
        this.element = element;
        this.length = 4;
        this.error = false;
        this.errorMessage = 'Incorrect Code';
        this.full = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.pinFocused = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.controls = [];
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    Object.defineProperty(PinInputComponent.prototype, "hasError", {
        get: /**
         * @return {?}
         */
        function () {
            return this.error ? 'error' : '';
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PinInputComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // length might not be a number
        if (typeof this.length === 'string') {
            this.length = Number.parseInt(this.length, 10);
        }
        // tslint:disable-next-line: prefer-for-of
        for (var i = 0; i < this.length; i++) {
            /** @type {?} */
            var ctrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormControl"]();
            this.controls.push(ctrl);
        }
        // listen to each FormControl
        this.controls.forEach((/**
         * @param {?} ctrl
         * @return {?}
         */
        function (ctrl) { return ctrl.valueChanges
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(_this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () { return _this.onUpdate(); })); }));
    };
    /**
     * @return {?}
     */
    PinInputComponent.prototype.onUpdate = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var v = this.value;
        if (v.length === this.length) {
            this.full.emit(this.value);
        }
        else {
            // move to next input box
            /** @type {?} */
            var elem = this.element.nativeElement.querySelector("#input_" + v.length);
            if (elem !== null) {
                elem.focus();
            }
        }
        this.update.emit(v);
    };
    Object.defineProperty(PinInputComponent.prototype, "value", {
        get: /**
         * @return {?}
         */
        function () {
            return this.controls.reduce((/**
             * @param {?} p
             * @param {?} v
             * @return {?}
             */
            function (p, v) { return v.value === null ? p : "" + p + v.value; }), '');
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} event
     * @return {?}
     */
    PinInputComponent.prototype.onKey = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        // remove last letter
        if (event.key === 'Backspace') {
            /** @type {?} */
            var v = this.value;
            if (v.length > 0 && v.length < this.length) {
                this.controls[v.length - 1].setValue('');
            }
            event.stopPropagation();
        }
    };
    /**
     * @return {?}
     */
    PinInputComponent.prototype.onBlur = /**
     * @return {?}
     */
    function () {
        this.pinFocused.emit(false);
    };
    /**
     * @return {?}
     */
    PinInputComponent.prototype.onFocus = /**
     * @return {?}
     */
    function () {
        this.pinFocused.emit(true);
    };
    /**
     * @return {?}
     */
    PinInputComponent.prototype.resetAll = /**
     * @return {?}
     */
    function () {
        this.controls.forEach((/**
         * @param {?} ctrl
         * @return {?}
         */
        function (ctrl) {
            ctrl.setValue('');
        }));
    };
    /**
     * @return {?}
     */
    PinInputComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    PinInputComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-pin-input',
                    template: "<div [ngClass]=\"'activation-code ' + hasError\">\n  <div class=\"activation-code__inputs\">\n    <div *ngFor=\"let ctrl of controls; let i = index\">\n      <input type=\"tel\" maxlength=\"1\" [formControl]=\"ctrl\" id=\"{{'input_'+i}}\" (keyup)=\"onKey($event)\"\n             (blur)=\"onBlur()\" (focus)=\"onFocus()\"\n             autofocus=\"{{i === 0 ? true : null}}\" autocomplete=\"off\">\n    </div>\n  </div>\n  <div class=\"error-label\">{{errorMessage}}</div>\n</div>\n",
                    styles: [".activation-code{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.activation-code__inputs{width:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}input{width:90%;max-width:6.3rem;height:11.4rem;border:2px solid rgba(0,0,0,.2);border-radius:4px;box-sizing:border-box;font-style:normal;font-weight:400;font-size:8rem;line-height:9.6rem;text-align:center}input:focus{outline-color:#106cc8}.error input{border-color:#eb202f}.error input:focus{outline-color:#eb202f}.error-label{color:#eb202f;display:none;text-align:center;font-size:1.4rem;line-height:1.7rem;margin-top:2rem}.error .error-label{display:block}"]
                }] }
    ];
    /** @nocollapse */
    PinInputComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    PinInputComponent.propDecorators = {
        length: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        error: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        errorMessage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        full: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        update: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        pinFocused: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PinInputComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function FeedItem() { }
if (false) {}
var FeedReaderService = /** @class */ (function () {
    function FeedReaderService(http) {
        this.http = http;
    }
    /**
     * @param {?} url
     * @return {?}
     */
    FeedReaderService.prototype.getFromUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        var _this = this;
        return this.http.get(url, { responseType: 'text' })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} content
         * @return {?}
         */
        function (content) { return _this.getFromText(content); })));
    };
    /**
     * @param {?} feed
     * @return {?}
     */
    FeedReaderService.prototype.getFromText = /**
     * @param {?} feed
     * @return {?}
     */
    function (feed) {
        /** @type {?} */
        var parser = new DOMParser();
        // parse the dom
        /** @type {?} */
        var doc = parser.parseFromString(feed, 'text/xml');
        // get the first channel
        /** @type {?} */
        var channel = doc.querySelector('rss > channel');
        if (!channel) {
            return [];
        }
        // try to extract the channel image used as a default image
        /** @type {?} */
        var channelImg = channel.querySelector('image > url');
        /** @type {?} */
        var channelImgUrl = channelImg ? channelImg.textContent : null;
        /** @type {?} */
        var items = Array.from(channel.querySelectorAll('item'));
        return items.map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var dateStr = item.getElementsByTagName('pubDate')[0].textContent;
            /** @type {?} */
            var imageTag = item.getElementsByTagName('image')[0];
            /** @type {?} */
            var image = imageTag ? imageTag.textContent : channelImgUrl;
            /** @type {?} */
            var it = {
                title: item.getElementsByTagName('title')[0].textContent,
                description: item.getElementsByTagName('description')[0].textContent,
                link: item.getElementsByTagName('link')[0].textContent,
                image: image,
                guid: item.getElementsByTagName('guid')[0].textContent,
                pubDate: dateStr ? new Date(dateStr) : null
            };
            // cure the content
            for (var k in it) {
                if ((typeof it[k]) === 'string') {
                    it[k] = it[k].trim();
                }
            }
            return it;
        }));
    };
    FeedReaderService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    FeedReaderService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }
    ]; };
    /** @nocollapse */ FeedReaderService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function FeedReaderService_Factory() { return new FeedReaderService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); }, token: FeedReaderService, providedIn: "root" });
    return FeedReaderService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DistancePipe = /** @class */ (function () {
    function DistancePipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    DistancePipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        if (value < 1000) {
            return Math.floor(value / 10) * 10 + " m";
        }
        if (value < 5000) {
            return Math.floor(value / 100) / 10 + " km";
        }
        return Math.floor(value / 1000) + " km";
    };
    DistancePipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{ name: 'distance' },] }
    ];
    return DistancePipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ICountryCode() { }
if (false) {}
/** @type {?} */
var countryCodes = [
    {
        id: 1,
        name: 'Afghanistan',
        phone: '+93'
    },
    {
        id: 2,
        name: 'Armenia',
        phone: '+374'
    },
    {
        id: 3,
        name: 'Azerbaijan',
        phone: '+994'
    },
    {
        id: 4,
        name: 'Bahrain',
        phone: '+973'
    },
    {
        id: 5,
        name: 'Bangladesh',
        phone: '+880'
    },
    {
        id: 6,
        name: 'Bhutan',
        phone: '+975'
    },
    {
        id: 7,
        name: 'Brunei',
        phone: '+673'
    },
    {
        id: 8,
        name: 'Cambodia',
        phone: '+855'
    },
    {
        id: 9,
        name: 'China',
        phone: '+86'
    },
    {
        id: 10,
        name: 'Georgia',
        phone: '+995'
    },
    {
        id: 11,
        name: 'Hong Kong',
        phone: '+852'
    },
    {
        id: 12,
        name: 'India',
        phone: '+91'
    },
    {
        id: 13,
        name: 'Indonesia',
        phone: '+62'
    },
    {
        id: 14,
        name: 'Iran',
        phone: '+98'
    },
    {
        id: 15,
        name: 'Iraq',
        phone: '+964'
    },
    {
        id: 16,
        name: 'Israel',
        phone: '+972'
    },
    {
        id: 17,
        name: 'Japan',
        phone: '+81'
    },
    {
        id: 18,
        name: 'Jordan',
        phone: '+962'
    },
    {
        id: 19,
        name: 'Kazakhstan',
        phone: '+7'
    },
    {
        id: 20,
        name: 'Kuwait',
        phone: '+965'
    },
    {
        id: 21,
        name: 'Kyrgyzstan',
        phone: '+996'
    },
    {
        id: 22,
        name: 'Laos',
        phone: '+856'
    },
    {
        id: 23,
        name: 'Lebanon',
        phone: '+961'
    },
    {
        id: 24,
        name: 'Macau',
        phone: '+853'
    },
    {
        id: 25,
        name: 'Malaysia',
        phone: '+60'
    },
    {
        id: 26,
        name: 'Maldives',
        phone: '+960'
    },
    {
        id: 27,
        name: 'Mongolia',
        phone: '+976'
    },
    {
        id: 28,
        name: 'Myanmar [Burma]',
        phone: '+95'
    },
    {
        id: 29,
        name: 'Nepal',
        phone: '+977'
    },
    {
        id: 30,
        name: 'North Korea',
        phone: '+850'
    },
    {
        id: 31,
        name: 'Oman',
        phone: '+968'
    },
    {
        id: 32,
        name: 'Pakistan',
        phone: '+92'
    },
    {
        id: 33,
        name: 'Philippines',
        phone: '+63'
    },
    {
        id: 34,
        name: 'Qatar',
        phone: '+974'
    },
    {
        id: 35,
        name: 'Saudi Arabia',
        phone: '+966'
    },
    {
        id: 36,
        name: 'Singapore',
        phone: '+65'
    },
    {
        id: 37,
        name: 'South Korea',
        phone: '+82'
    },
    {
        id: 38,
        name: 'Sri Lanka',
        phone: '+94'
    },
    {
        id: 39,
        name: 'Syria',
        phone: '+963'
    },
    {
        id: 40,
        name: 'Taiwan',
        phone: '+886'
    },
    {
        id: 41,
        name: 'Tajikistan',
        phone: '+992'
    },
    {
        id: 42,
        name: 'Thailand',
        phone: '+66'
    },
    {
        id: 43,
        name: 'Turkey',
        phone: '+90'
    },
    {
        id: 44,
        name: 'Turkmenistan',
        phone: '+993'
    },
    {
        id: 45,
        name: 'United Arab Emirates',
        phone: '+971'
    },
    {
        id: 46,
        name: 'Uzbekistan',
        phone: '+998'
    },
    {
        id: 47,
        name: 'Vietnam',
        phone: '+84'
    },
    {
        id: 48,
        name: 'Yemen',
        phone: '+967'
    }
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GeneralStaticDataService = /** @class */ (function () {
    function GeneralStaticDataService() {
    }
    /**
     * @param {?=} countries
     * @return {?}
     */
    GeneralStaticDataService.prototype.getCountriesList = /**
     * @param {?=} countries
     * @return {?}
     */
    function (countries) {
        if (!countries || !countries.length) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(countryCodes);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(countryCodes.filter((/**
         * @param {?} code
         * @return {?}
         */
        function (code) { return countries.includes(code.name); })));
    };
    GeneralStaticDataService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ GeneralStaticDataService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function GeneralStaticDataService_Factory() { return new GeneralStaticDataService(); }, token: GeneralStaticDataService, providedIn: "root" });
    return GeneralStaticDataService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ITheme() { }
if (false) {}
/**
 * @record
 */
function IThemeProperties() { }
if (false) {}
/**
 * @record
 */
function IStampCardTheme() { }
if (false) {}
/** @type {?} */
var LIGHT = {
    name: 'Light',
    properties: {
        '--background': '#fafafa',
        '--font_color': '#333'
    }
};
/** @type {?} */
var DARK = {
    name: 'Dark',
    properties: {
        '--background': '#1f2935',
        '--font_color': '#fff'
    }
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
ThemesService = /** @class */ (function () {
    function ThemesService() {
        this.active = new rxjs__WEBPACK_IMPORTED_MODULE_7__["BehaviorSubject"](LIGHT);
        this.availableThemes = [LIGHT, DARK];
    }
    /**
     * @return {?}
     */
    ThemesService.prototype.getAvailableThemes = /**
     * @return {?}
     */
    function () {
        return this.availableThemes;
    };
    /**
     * @return {?}
     */
    ThemesService.prototype.getActiveTheme = /**
     * @return {?}
     */
    function () {
        return this.active;
    };
    /**
     * @param {?} theme
     * @return {?}
     */
    ThemesService.prototype.setActiveTheme = /**
     * @param {?} theme
     * @return {?}
     */
    function (theme) {
        this.active.next(theme);
        Object.entries(theme.properties).forEach((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), k = _b[0], v = _b[1];
            document.documentElement.style.setProperty(k, v);
        }));
    };
    return ThemesService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerThemesService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(WhistlerThemesService, _super);
    function WhistlerThemesService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        if (!config.production) {
            _this.themeSettingEndpoint = 'http://localhost:4000/themes';
        }
        else {
            _this.themeSettingEndpoint = config.baseHref + 'themes';
        }
        return _this;
    }
    /**
     * @private
     * @param {?} setting
     * @return {?}
     */
    WhistlerThemesService.WThemeToTheme = /**
     * @private
     * @param {?} setting
     * @return {?}
     */
    function (setting) {
        if (!setting) {
            return LIGHT;
        }
        /** @type {?} */
        var backgroundColor = LIGHT.properties['--background'];
        /** @type {?} */
        var fontColor = LIGHT.properties['--font_color'];
        if (setting['theme.style'] === DARK.name) {
            backgroundColor = DARK.properties['--background'];
            fontColor = DARK.properties['--font_color'];
        }
        return {
            name: setting['theme.style'],
            properties: {
                '--font': setting['theme.font'],
                '--logo': setting['theme.logo'],
                '--title': setting['theme.title'],
                '--accent': setting['theme.accent'],
                '--primary': setting['theme.primary'],
                '--button_text_color': setting['theme.button_text_color'],
                '--button_background_color': setting['theme.button_background_color'],
                '--header_color': setting['theme.header_color'],
                '--login_background_colour': setting['theme.login_background_colour'],
                '--background': backgroundColor,
                '--font_color': fontColor
            }
        };
    };
    /**
     * @return {?}
     */
    WhistlerThemesService.prototype.getThemeSetting = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var themesRequest = {
            url: location.host
        };
        return this.http.post(this.themeSettingEndpoint, themesRequest).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data && res.data[0].attributes.display_properties; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} setting
         * @return {?}
         */
        function (setting) { return WhistlerThemesService.WThemeToTheme(setting); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return _this.setActiveTheme(theme); })));
    };
    WhistlerThemesService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerThemesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerThemesService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerThemesService_Factory() { return new WhistlerThemesService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerThemesService, providedIn: "root" });
    return WhistlerThemesService;
}(ThemesService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var V4ThemesService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4ThemesService, _super);
    function V4ThemesService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.themeSettingEndpoint = config.baseHref + "assets/theme.json";
        return _this;
    }
    /**
     * @param {?=} config
     * @return {?}
     */
    V4ThemesService.prototype.getThemeSetting = /**
     * @param {?=} config
     * @return {?}
     */
    function (config) {
        var _this = this;
        /** @type {?} */
        var url = this.themeSettingEndpoint;
        if (config && config.sourceType) {
            url = config.baseHref + ("assets/" + config.sourceType + "-theme.json");
        }
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return (/** @type {?} */ (res)); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return _this.setActiveTheme(theme); })));
    };
    V4ThemesService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4ThemesService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4ThemesService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4ThemesService_Factory() { return new V4ThemesService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4ThemesService, providedIn: "root" });
    return V4ThemesService;
}(ThemesService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NewsfeedComponent = /** @class */ (function () {
    function NewsfeedComponent() {
    }
    /**
     * @return {?}
     */
    NewsfeedComponent.prototype.readMoreClicked = /**
     * @return {?}
     */
    function () {
        console.log('Read More clicked');
    };
    NewsfeedComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-newsfeed',
                    template: "<div *ngIf=\"items$ | async as items\" class=\"cards-container\">\n  <mat-card *ngFor=\"let item of items\" class=\"mat-item mat-elevation-z2\">\n    <img mat-card-image [src]=\"item.image\" *ngIf=\"item.image\">\n    <mat-card-content>\n      <p>{{ (item.description.length > 120) ? (item.description | slice:0:120)+'...':(item.description) }}</p>\n    </mat-card-content>\n    <mat-card-actions>\n      <div class=\"more-text\" (click)=\"readMoreClicked()\">Read More</div>\n    </mat-card-actions>\n  </mat-card>\n</div>",
                    styles: [".cards-container{margin:1.6rem;overflow:scroll;display:-webkit-box;display:flex;overflow-x:auto;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.mat-card{margin:0 1.6rem 1.6rem 0;flex-basis:calc(100% - 3.2rem);flex-shrink:0;-webkit-box-flex:0;flex-grow:0}.mat-card .mat-card-content{padding:0 .8rem;min-height:5rem;margin-bottom:0;line-height:2rem;letter-spacing:.025rem;color:#666}.mat-card .mat-card-image{height:15rem;-o-object-fit:cover;object-fit:cover}.mat-card .mat-card-actions{padding:.8rem 1.4rem}.mat-card .more-text{color:#186de1;font-size:1.4rem}"]
                }] }
    ];
    NewsfeedComponent.propDecorators = {
        items$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return NewsfeedComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IAppInfo() { }
if (false) {}
/**
 * @abstract
 */
var  /**
 * @abstract
 */
TokenStorage = /** @class */ (function () {
    function TokenStorage() {
    }
    return TokenStorage;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IAppInfo$1() { }
if (false) {}
var LocalTokenStorage = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(LocalTokenStorage, _super);
    function LocalTokenStorage(config) {
        var _this = _super.call(this) || this;
        if (config && config.storageType) {
            _this.storageType = config.storageType;
        }
        return _this;
    }
    /**
     * @return {?}
     */
    LocalTokenStorage.prototype.getAppInfo = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var appInfo = localStorage.getItem('appInfo');
        this.appInfo = appInfo ? JSON.parse(appInfo) : { appAccessToken: '', userAccessToken: '' };
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.appInfo);
    };
    /**
     * @param {?} key
     * @return {?}
     */
    LocalTokenStorage.prototype.getAppInfoProperty = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.getAppInfo();
        return this.appInfo[key];
    };
    /**
     * @param {?} value
     * @param {?} key
     * @return {?}
     */
    LocalTokenStorage.prototype.setAppInfoProperty = /**
     * @param {?} value
     * @param {?} key
     * @return {?}
     */
    function (value, key) {
        this.getAppInfo();
        this.appInfo[key] = value;
        localStorage.setItem('appInfo', JSON.stringify(this.appInfo));
    };
    /**
     * @param {?} keys
     * @return {?}
     */
    LocalTokenStorage.prototype.clearAppInfoProperty = /**
     * @param {?} keys
     * @return {?}
     */
    function (keys) {
        var _this = this;
        this.getAppInfo();
        if (keys.length) {
            keys.forEach((/**
             * @param {?} key
             * @return {?}
             */
            function (key) { return delete _this.appInfo[key]; }));
        }
        else {
            this.appInfo = {};
        }
        localStorage.setItem('appInfo', JSON.stringify(this.appInfo));
    };
    LocalTokenStorage.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    /** @nocollapse */
    LocalTokenStorage.ctorParameters = function () { return [
        { type: undefined }
    ]; };
    return LocalTokenStorage;
}(TokenStorage));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} config
 * @return {?}
 */
function TokenStorageServiceFactory(config) {
    switch (config.storageType) {
        case 'local':
            return new LocalTokenStorage(config);
        default:
            return new LocalTokenStorage(null);
    }
}
var StorageModule = /** @class */ (function () {
    function StorageModule() {
    }
    StorageModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    providers: [{
                            provide: TokenStorage,
                            useFactory: TokenStorageServiceFactory,
                            deps: [Config]
                        }]
                },] }
    ];
    return StorageModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function themesServiceFactory(http, config) {
    if (config.isWhistler) {
        return new WhistlerThemesService(http, config);
    }
    return new V4ThemesService(http, config);
}
/** @type {?} */
var directives = [
    NumericCharacterDirective,
    DebounceClickDirective,
    RepeatTimesDirective,
];
/** @type {?} */
var components = [
    PopupComponent,
    PinInputComponent,
    NewsfeedComponent
];
// make sure we have only one instance of the NotificationService
/**
 * @return {?}
 */
function notificationServiceFactory() {
    // @ts-ignore
    if (window.notificationService === undefined) {
        // @ts-ignore
        window.notificationService = new NotificationService();
    }
    // @ts-ignore
    return window.notificationService;
}
var UtilsModule = /** @class */ (function () {
    function UtilsModule() {
    }
    UtilsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(directives, components, [
                        DistancePipe
                    ]),
                    entryComponents: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components),
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDialogModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
                        StorageModule
                    ],
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(directives, components, [
                        DistancePipe
                    ]),
                    providers: [
                        { provide: NotificationService, useFactory: notificationServiceFactory },
                        FeedReaderService,
                        GeneralStaticDataService,
                        {
                            provide: ThemesService,
                            useFactory: themesServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config]
                        }
                    ]
                },] }
    ];
    return UtilsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} rewardsService
 * @return {?}
 */
function vouchersServiceFactory(http, config, rewardsService) {
    if (config.isWhistler) {
        return new WhistlerVouchersService(http, config, rewardsService);
    }
    // Make decision on what to instantiate base on config
    return new V4VouchersService(http, config);
}
/** @type {?} */
var components$1 = [
    VouchersComponent,
    VoucherComponent,
    BcodeRedemptionComponent,
    PinRedemptionComponent,
    QrcodeRedemptionComponent,
    BarcodeRedemptionComponent,
];
var VouchersModule = /** @class */ (function () {
    function VouchersModule() {
    }
    VouchersModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$1),
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        angularx_qrcode__WEBPACK_IMPORTED_MODULE_5__["QRCodeModule"],
                        ngx_barcode__WEBPACK_IMPORTED_MODULE_6__["NgxBarcodeModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["ReactiveFormsModule"],
                        MaterialModule,
                        UtilsModule
                    ],
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$1),
                    providers: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
                        {
                            provide: IVoucherService,
                            useFactory: vouchersServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, RewardsService]
                        }
                    ]
                },] }
    ];
    return VouchersModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
StampService = /** @class */ (function () {
    function StampService() {
    }
    return StampService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IReward() { }
if (false) {}
/** @enum {string} */
var StampState = {
    redeemed: 'redeemed',
    issued: 'issued',
};
/** @enum {string} */
var StampCardState = {
    completed: 'completed',
    active: 'active',
    inactive: 'inactive',
};
/**
 * @record
 */
function IStamp() { }
if (false) {}
/**
 * @record
 */
function ICampaignConfig() { }
if (false) {}
/**
 * @record
 */
function IStampCard() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PuzzleListComponent = /** @class */ (function () {
    function PuzzleListComponent(stampService) {
        this.stampService = stampService;
        this.repeatGhostCount = 10;
        this.campaignId = null;
        this.total = null;
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.completed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    /**
     * @private
     * @return {?}
     */
    PuzzleListComponent.prototype.initTotal = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.puzzles !== null && this.puzzles.length > 0) {
            this.total = this.puzzles[0].displayProperties.totalSlots || null;
        }
        else {
            this.total = null;
        }
    };
    /**
     * @return {?}
     */
    PuzzleListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.titleFn) {
            this.titleFn = (/**
             * @param {?} index
             * @return {?}
             */
            function (index) { return 'Puzzle #' + _this.indexToLetter(index); });
        }
        if (!this.puzzleTextFn) {
            this.puzzleTextFn = (/**
             * @return {?}
             */
            function () { return 'new pieces'; });
        }
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PuzzleListComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        var _this = this;
        if (changes.campaignId) {
            this.puzzles = null;
            if (this.campaignId !== null) {
                this.stampService.getCards(this.campaignId)
                    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$))
                    .subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    var e_1, _a;
                    _this.puzzles = res;
                    _this.initTotal();
                    // assume all is completed
                    /** @type {?} */
                    var completed = true;
                    try {
                        // loop over all puzzles
                        for (var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__values"])(_this.puzzles), _c = _b.next(); !_c.done; _c = _b.next()) {
                            var puzzle = _c.value;
                            if (puzzle.stamps === undefined || puzzle.stamps.length === 0) {
                                // if there is no stamps objet at all then, it is not completed
                                completed = false;
                            }
                            else if (puzzle.stamps.some((/**
                             * @param {?} stamp
                             * @return {?}
                             */
                            function (stamp) { return stamp.state === StampState.issued; }))) {
                                // if any transction is issued, then it is not all completed
                                completed = false;
                            }
                            // if one is not completed, we do not need to loop any further
                            if (!completed) {
                                break;
                            }
                        }
                    }
                    catch (e_1_1) { e_1 = { error: e_1_1 }; }
                    finally {
                        try {
                            if (_c && !_c.done && (_a = _b.return)) _a.call(_b);
                        }
                        finally { if (e_1) throw e_1.error; }
                    }
                    // if completed emit an event.
                    if (completed) {
                        _this.completed.emit();
                    }
                }));
            }
        }
    };
    /**
     * @param {?} puzzle
     * @return {?}
     */
    PuzzleListComponent.prototype.puzzleSelected = /**
     * @param {?} puzzle
     * @return {?}
     */
    function (puzzle) {
        this.selected.emit(puzzle);
    };
    // in the UX only mark the 1st active puzzle as active
    // in the UX only mark the 1st active puzzle as active
    /**
     * @param {?} puzzle
     * @return {?}
     */
    PuzzleListComponent.prototype.isActive = 
    // in the UX only mark the 1st active puzzle as active
    /**
     * @param {?} puzzle
     * @return {?}
     */
    function (puzzle) {
        // if there is no puzzle in list, it should never happen but return false
        if (!Array.isArray(this.puzzles)) {
            return false;
        }
        // if we have no information on stamps then it should not be active
        if (!puzzle.stamps && puzzle.displayProperties.displayCampaignAs === 'puzzle') {
            return false;
        }
        if (!puzzle.stamps && puzzle.displayProperties.displayCampaignAs === 'stamp_card') {
            return false;
        }
        /** @type {?} */
        var totalSlots = puzzle.displayProperties.totalSlots || 0;
        // if there is no more available stamp return false
        if (puzzle.displayProperties.displayCampaignAs === 'puzzle') {
            if (puzzle.stamps && puzzle.stamps.filter((/**
             * @param {?} st
             * @return {?}
             */
            function (st) { return st.state === StampState.redeemed; })).length >= totalSlots) {
                return false;
            }
            // get list of active puzzles
            /** @type {?} */
            var activePuzzles = this.puzzles.filter((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.state === StampCardState.active &&
                p.stamps &&
                p.stamps.filter((/**
                 * @param {?} st
                 * @return {?}
                 */
                function (st) { return st.state === StampState.redeemed; })).length < totalSlots; }));
            // if there is no active puzzle, this one should not be active
            if (activePuzzles.length === 0) {
                return false;
            }
            // if it is the first active puzzle then make it visible
            if (puzzle.id === activePuzzles[0].id) {
                return true;
            }
        }
        if (puzzle.displayProperties.displayCampaignAs === 'stamp_card') {
            if (puzzle.stamps && puzzle.stamps.filter((/**
             * @param {?} st
             * @return {?}
             */
            function (st) { return st.state === StampState.redeemed; })).length >= totalSlots) {
                return false;
            }
            // get list of active puzzles
            /** @type {?} */
            var activePuzzles = this.puzzles.filter((/**
             * @param {?} p
             * @return {?}
             */
            function (p) { return p.state === StampCardState.active &&
                p.stamps &&
                p.stamps.filter((/**
                 * @param {?} st
                 * @return {?}
                 */
                function (st) { return st.state === StampState.redeemed; })).length < totalSlots; }));
            // if there is no active puzzle, this one should not be active
            if (activePuzzles.length === 0) {
                return false;
            }
            // if it is the first active puzzle then make it visible
            if (puzzle.id === activePuzzles[0].id) {
                return true;
            }
        }
        return false;
    };
    /**
     * @param {?} index
     * @return {?}
     */
    PuzzleListComponent.prototype.indexToLetter = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var base = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        if (index < 0) {
            return '';
        }
        return base[index % base.length];
    };
    /**
     * @param {?} puzzle
     * @return {?}
     */
    PuzzleListComponent.prototype.nbAvailableStamps = /**
     * @param {?} puzzle
     * @return {?}
     */
    function (puzzle) {
        if (puzzle.stamps === undefined) {
            return '0';
        }
        return puzzle.stamps.filter((/**
         * @param {?} st
         * @return {?}
         */
        function (st) { return st.state === StampState.issued; })).length.toString();
    };
    /**
     * @param {?} puzzle
     * @return {?}
     */
    PuzzleListComponent.prototype.nbPlacedStamps = /**
     * @param {?} puzzle
     * @return {?}
     */
    function (puzzle) {
        if (puzzle.stamps === undefined) {
            return 0;
        }
        return puzzle.stamps.filter((/**
         * @param {?} st
         * @return {?}
         */
        function (st) { return st.state === StampState.redeemed; })).length;
    };
    /**
     * @return {?}
     */
    PuzzleListComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    PuzzleListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-puzzle-list',
                    template: "<div [class]=\"puzzles ? 'card-list-container' : 'card-list-container loading'\">\n  <div *ngIf=\"puzzles; then thenBlock else elseBlock\"></div>\n  <ng-template #thenBlock>\n    <mat-card matRipple *ngFor=\"let puzzle of puzzles; let i=index\"\n      [matRippleDisabled]=\"!isActive(puzzle)\"\n      [class.disabled]=\"!isActive(puzzle)\"\n      [tabindex]=\"isActive(puzzle) ? 0 : -1\"\n      (click)=\"isActive(puzzle) && puzzleSelected(puzzle)\">\n      <div class=\"puzzle-content\">\n        <div class=\"puzzle-img__wrapper\">\n          <img [ngClass]=\"isActive(puzzle) ? 'puzzle-img' : 'puzzle-img grayscale' \"\n               src=\"{{puzzle.displayProperties.thumbnailImg ? puzzle.displayProperties.thumbnailImg : puzzle.displayProperties.cardImage.value.imageUrl}}\">\n        </div>\n        <div class=\"puzzle-details\">\n          <h1>\n            <ng-container>\n              {{titleFn(i)}}\n            </ng-container>\n            <span class=\"badge-warn\">\n              {{nbPlacedStamps(puzzle)}}/{{total}}\n            </span>\n          </h1>\n          <p>{{nbAvailableStamps(puzzle)}} {{puzzleTextFn(puzzle)}}</p>\n          <p class=\"play-now\">Play Now!</p>\n        </div>\n      </div>\n      <mat-icon *ngIf=\"iconDisplay\">\n        {{iconDisplay}}\n      </mat-icon>\n    </mat-card>\n  </ng-template>\n\n  <ng-template #elseBlock>\n    <mat-card *perxCoreRepeatTimes=\"repeatGhostCount\">\n      <div class=\"reward-content\">\n        <div class=\"reward-img__wrapper\">\n          <div class=\"img-placeholder ghost\"></div>\n        </div>\n        <div class=\"reward-preview-details\">\n          <div class=\"reward-name ghost\"></div>\n          <div class=\"reward-subtitle ghost\"></div>\n          <div class=\"reward-price-details ghost\"></div>\n        </div>\n      </div>\n    </mat-card>\n  </ng-template>\n</div>\n",
                    styles: ["mat-card{margin:1.2rem 0;display:-webkit-box;display:flex;padding:0;-webkit-box-flex:0;flex:0 0 10.5rem;height:10.5rem;cursor:pointer;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between}mat-card.disabled{background-color:#ebebeb;pointer-events:none}mat-icon{color:#b2b2b2;font-size:3.6rem;height:3.6rem;-webkit-box-flex:0;flex:0 0 3.6rem}.puzzle-content{display:-webkit-box;display:flex;flex-basis:auto;-webkit-box-flex:1;flex-grow:1;-webkit-box-pack:start;justify-content:flex-start}.puzzle-img__wrapper{-webkit-box-flex:0;flex:0 0 10.5rem;height:10.5rem;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:10.5rem}.puzzle-img{margin:auto;width:100%}.grayscale{-webkit-filter:grayscale(100%);filter:grayscale(100%)}.puzzle-details{font-size:1.4rem;display:-webkit-box;display:flex;margin:auto 0;padding-left:1.6rem;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.puzzle-details h1{font-size:1.4rem;line-height:1.6rem;padding:0;font-weight:500;margin:4px 0}.puzzle-details p{font-size:1.2rem;line-height:1.6rem;color:#666;margin:4px 0;padding:0}.puzzle-details .play-now{margin-top:1rem}.puzzle-details:nth-child(1){margin-top:0}.badge-warn{background-color:rgba(228,39,19,.1);color:#e42713;padding:.2rem .6rem;font-size:1.2rem;border-radius:.8rem;margin-left:.5rem}.card-list-container.loading{overflow:hidden}.card-list-container.loading .ghost{overflow:hidden;background-color:#ededed}.card-list-container.loading .reward-content{display:-webkit-box;display:flex;flex-basis:auto;-webkit-box-flex:1;flex-grow:1;-webkit-box-pack:start;justify-content:flex-start}.card-list-container.loading .reward-content .reward-img__wrapper{-webkit-box-flex:0;flex:0 0 10.5rem;height:10.5rem;width:10.5rem;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;overflow:hidden}.card-list-container.loading .reward-content .reward-img__wrapper .img-placeholder{height:100%;width:100%}.card-list-container.loading .reward-content .reward-preview-details{font-size:1.4rem;display:-webkit-box;display:flex;margin:1.6rem 0 1.6rem .8rem;padding-left:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1}.card-list-container.loading .reward-content .reward-preview-details:nth-child(1){margin-top:0}.card-list-container.loading .reward-content .reward-preview-details .reward-name,.card-list-container.loading .reward-content .reward-preview-details .reward-subtitle{height:1.6rem;margin:.4rem 0}.card-list-container.loading .reward-content .reward-preview-details .reward-price-details{height:1.4rem;font-size:1rem;line-height:1.4rem;min-height:1.4rem;align-content:flex-end;margin-top:auto}"]
                }] }
    ];
    /** @nocollapse */
    PuzzleListComponent.ctorParameters = function () { return [
        { type: StampService }
    ]; };
    PuzzleListComponent.propDecorators = {
        campaignId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        iconDisplay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        titleFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        puzzleTextFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        completed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PuzzleListComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function DrawTile() { }
if (false) {}
var PuzzlePlayComponent = /** @class */ (function () {
    function PuzzlePlayComponent() {
        this.showHint = false;
        this.rows = 2;
        this.cols = 3;
        this.nbPlayedPieces = 0;
        this.nbAvailablePieces = 0;
        this.moved = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.completed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.tileWidth = 0;
        this.tileHeight = 0;
        this.boardPuzzleTiles = [];
        this.remainingPuzzleTiles = [];
        this.imageWidth = 300;
        this.imageHeight = 200;
        this.imageReady = false;
        this.staticPuzzleDummyTiles = [];
    }
    Object.defineProperty(PuzzlePlayComponent.prototype, "hasRemainingPuzzleTiles", {
        get: /**
         * @return {?}
         */
        function () {
            return this.remainingPuzzleTiles.length > 0;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.ngOnChanges = /**
     * @return {?}
     */
    function (
    // changes: SimpleChanges
    ) {
        // if (this.img) {
        // if (this.nbAvailablePieces !== 0 && this.showHint) {
        // this.imageReady = true;
        // }
        // this.getImageSizeRatioFromURL(this.img).subscribe(ratio => {
        //     this.imageHeight = this.imageWidth * ratio;
        /*
              this.tileWidth = this.imageWidth / this.cols;
              this.tileHeight = this.imageHeight / this.rows;
              this.totalPieces = this.rows * this.cols;
    
              for (let x = 0; x < this.totalPieces; x++) {
                this.boardPuzzleTiles[x] = { puzzleLocation: x, isSelected: (x < this.nbPlayedPieces) };
              }
              for (let i = 0; i < this.nbAvailablePieces; i++) {
                const location = this.nbPlayedPieces + i;
                this.remainingPuzzleTiles[i] = { puzzleLocation: location, isSelected: false };
              }
              for (let i = 0; i < this.totalPieces; i++) {
                this.staticPuzzleDummyTiles[i] = [i];
              }*/
        // },
        // err => console.error('Observer got an error: ' + err));
        // }
    };
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.nextStampClicked = /**
     * @return {?}
     */
    function () {
        if (this.isAllPuzzleCompleted()) {
            this.completed.emit();
        }
        else if ((this.remainingPuzzleTiles.length) > 0) {
            /** @type {?} */
            var puzzleLocation_1 = this.remainingPuzzleTiles[0].puzzleLocation;
            this.moved.emit();
            this.boardPuzzleTiles[puzzleLocation_1].isSelected = true;
            this.remainingPuzzleTiles = this.remainingPuzzleTiles
                .filter((/**
             * @param {?} currentValue
             * @return {?}
             */
            function (currentValue) { return currentValue.puzzleLocation !== puzzleLocation_1; }));
        }
    };
    /**
     * @param {?} tile
     * @return {?}
     */
    PuzzlePlayComponent.prototype.getPuzzleTileStyle = /**
     * @param {?} tile
     * @return {?}
     */
    function (tile) {
        /** @type {?} */
        var leftPosition = (tile.puzzleLocation % this.cols) * this.tileWidth;
        /** @type {?} */
        var topPosition = Math.floor((tile.puzzleLocation / this.cols)) * this.tileHeight;
        if (tile.isSelected) {
            return {
                // tslint:disable: object-literal-key-quotes
                width: this.tileWidth + 'px',
                height: this.tileHeight + 'px',
                'background-position': (-leftPosition) + 'px ' + (-topPosition) + 'px',
                'background-image': 'url(' + this.img + ')',
                'background-size': this.imageWidth + 'px ' + this.imageHeight + 'px',
                'background-repeat': 'no-repeat',
                '-webkit-filter': 'none',
                filter: 'none',
                '-webkit-transform': 'translateZ(0)'
            };
        }
        return {
            width: this.tileWidth + 'px',
            height: this.tileHeight + 'px',
            'background-position': (-leftPosition) + 'px ' + (-topPosition) + 'px',
            'background-image': 'url(' + this.img + ')',
            'background-size': this.imageWidth + 'px ' + this.imageHeight + 'px',
            'background-repeat': 'no-repeat',
            '-webkit-filter': 'grayscale(100%)',
            filter: 'grayscale(100%)',
            '-webkit-transform': 'translateZ(0)' // Hacky way to make filter work on iOS
        };
    };
    /**
     * @param {?} index
     * @return {?}
     */
    PuzzlePlayComponent.prototype.getBottomTilesStyle = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if ((this.remainingPuzzleTiles.length) > index) {
            /** @type {?} */
            var puzzlePosition = this.remainingPuzzleTiles[index].puzzleLocation;
            /** @type {?} */
            var leftPosition = (puzzlePosition % this.cols) * this.tileWidth;
            /** @type {?} */
            var topPositionIndex = Math.floor((puzzlePosition / this.cols));
            /** @type {?} */
            var topPosition = topPositionIndex * this.tileHeight;
            return {
                width: this.tileWidth + 'px',
                height: this.tileHeight + 'px',
                'background-position': (-leftPosition) + 'px ' + (-topPosition) + 'px',
                'background-image': 'url(' + this.img + ')',
                'background-size': this.imageWidth + 'px ' + this.imageHeight + 'px',
                'background-repeat': 'no-repeat'
            };
        }
        return {
            background: '#ebebeb'
        };
    };
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.getImageSize = /**
     * @return {?}
     */
    function () {
        return {
            width: (this.imageWidth) + 'px',
            height: (this.imageHeight) + 'px'
        };
    };
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.getTileSize = /**
     * @return {?}
     */
    function () {
        return {
            width: (this.tileWidth) + 'px',
            height: (this.tileHeight) + 'px'
        };
    };
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.getWidthHeightRatio = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var ratioValue = (this.tileWidth / this.tileHeight);
        return ratioValue.toString() + ':1';
    };
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.isAllPuzzleCompleted = /**
     * @return {?}
     */
    function () {
        for (var i = 0; i < this.totalPieces; i++) {
            if (!this.boardPuzzleTiles[i].isSelected) {
                return false;
            }
        }
        return true;
    };
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.dismissOverlayHint = /**
     * @return {?}
     */
    function () {
        this.showHint = false;
    };
    /**
     * @return {?}
     */
    PuzzlePlayComponent.prototype.onImageLoad = /**
     * @return {?}
     */
    function () {
        this.imageReady = true;
        this.imageWidth = this.puzzleView.nativeElement.width;
        if (this.puzzleView.nativeElement.naturalHeight > this.puzzleView.nativeElement.clientHeight) {
            // console.log(`Height: ${this.puzzleView.nativeElement.height}`);
            this.imageHeight = this.puzzleView.nativeElement.height;
        }
        else {
            // console.log(`Height: ${this.puzzleView.nativeElement.naturalHeight}`);
            this.imageHeight = this.puzzleView.nativeElement.naturalHeight;
        }
        this.tileWidth = this.imageWidth / this.cols;
        this.tileHeight = this.imageHeight / this.rows;
        this.totalPieces = this.rows * this.cols;
        for (var x = 0; x < this.totalPieces; x++) {
            this.boardPuzzleTiles[x] = { puzzleLocation: x, isSelected: (x < this.nbPlayedPieces) };
        }
        for (var i = 0; i < this.nbAvailablePieces; i++) {
            /** @type {?} */
            var location_1 = this.nbPlayedPieces + i;
            this.remainingPuzzleTiles[i] = { puzzleLocation: location_1, isSelected: false };
        }
        for (var i = 0; i < this.totalPieces; i++) {
            this.staticPuzzleDummyTiles[i] = [i];
        }
    };
    PuzzlePlayComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-puzzle-play',
                    template: "<div class=\"center-board\" [ngStyle]=\"getImageSize()\">\n  <mat-grid-list *ngIf=\"imageReady\" [cols]=\"cols\" [rowHeight]=\"getWidthHeightRatio()\" gutterSize=\"1px\">\n    <mat-grid-tile *ngFor=\"let tile of boardPuzzleTiles\">\n      <img class=\"custom-puzzle-image\" [ngStyle]=\"getPuzzleTileStyle(tile)\"/>\n    </mat-grid-tile>\n  </mat-grid-list>\n  <div class=\"dummy-container\">\n    <img class=\"dummy-image\" [src]=\"img\" (load)=\"onImageLoad()\" #puzzleBoard/>\n  </div>\n</div>\n<div class=\"bottom-container\">\n  <div class=\"static-content\">\n    <div class=\"red-color-font\">\n      <div class=\"vertically-aligned-row\">\n        PUZZLE PIECES\n      </div>\n      <div class=\"static-collect-pieces\">Collect pieces and complete the puzzle</div>\n    </div>\n    <div class=\"badge-warn\">\n      {{ remainingPuzzleTiles.length }}/{{totalPieces}}\n    </div>\n  </div>\n  <div class=\"scrolling-wrapper-flexbox\">\n    <div class=\"remaining-puzzle-piece-container\" *ngFor=\"let staticIndex of staticPuzzleDummyTiles; let i = index\"\n         [ngStyle]=\"getTileSize()\">\n      <div *ngIf=\"i === 0;then firstImage else moreImages\"></div>\n      <ng-template #firstImage>\n        <img class=\"custom-puzzle-image mat-elevation-z8\" [ngStyle]=\"getBottomTilesStyle(staticIndex)\" (click)=\"nextStampClicked()\"/>\n      </ng-template>\n      <ng-template #moreImages>\n        <img class=\"custom-puzzle-image greyscale\" [ngStyle]=\"getBottomTilesStyle(staticIndex)\"/>\n      </ng-template>\n    </div>\n  </div>\n</div>\n<div class=\"overlay\" *ngIf=\"showHint && imageReady && hasRemainingPuzzleTiles\" (click)=\"dismissOverlayHint()\">\n  <div class=\"hint-group\">\n    <div class=\"hand-pointer-hint\">\n      <img src=\"assets/pointer-touch-hint.png\">\n    </div>\n    <div class=\"speech-bubble\">\n      <div class=\"triangle-tip\"></div>\n      <div class=\"rounded-rect\">\n        <p>Click on the piece to place it on the puzzle</p>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".custom-puzzle-image{width:100%;height:100%}.greyscale{filter:grayscale(100%);-webkit-filter:grayscale(100%);-webkit-transform:translateZ(0)}.red-color-font{color:#e42713;font-weight:700}.center-board{float:none;margin:0 auto;display:block}.center-board .mat-grid-list{width:100%;display:inline-block;z-index:1}.center-board .dummy-container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;position:relative;top:-100%;left:0;z-index:0;-webkit-filter:grayscale(100%);filter:grayscale(100%);overflow:hidden;visibility:hidden}.center-board .dummy-container .dummy-image{max-width:100%;max-height:100%;-o-object-fit:contain;object-fit:contain;background-repeat:no-repeat}.vertically-aligned-row{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.bottom-container{background:#fff;border-radius:16px 16px 0 0;padding:2rem;margin-top:2rem}.bottom-container .static-content{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-align:center;align-items:center}.bottom-container .static-content .help-logo{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;width:20px;height:20px;background:#e3dfdf;border-radius:50%;margin-left:10px}.bottom-container .static-content .static-collect-pieces{color:#959595}.bottom-container .static-content .badge-warn{background-color:rgba(228,39,19,.1);color:#e42713;padding:10px 20px;font-size:1.2rem;border-radius:20px}.bottom-container .scrolling-wrapper-flexbox{display:-webkit-box;display:flex;flex-wrap:nowrap;overflow-x:auto;-webkit-box-pack:start;justify-content:flex-start}.bottom-container .scrolling-wrapper-flexbox .remaining-puzzle-piece-container{-webkit-box-flex:0;flex:0 0 auto;margin-right:1em;border:2px dotted #e42713;-webkit-transform:scale(.65);transform:scale(.65)}.overlay{position:absolute;top:0;width:100%;height:100%;background-color:rgba(128,128,128,.5);margin:0;z-index:2}.overlay .hint-group{position:absolute;bottom:8rem;left:4rem;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.overlay .hint-group .hand-pointer-hint{width:7rem;height:7rem;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;align-content:center;position:relative;top:4rem}.overlay .hint-group .hand-pointer-hint img{width:auto;margin:auto;max-height:100%;max-width:100%}.overlay .hint-group .speech-bubble{position:relative;z-index:3;display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row}.overlay .hint-group .speech-bubble .triangle-tip{position:relative;top:2.5rem;left:1rem;width:0;height:0;border-left:1.7rem solid transparent;border-right:1.7rem solid transparent;border-top:5rem solid #fff;-webkit-transform:rotateZ(70deg);transform:rotateZ(70deg);z-index:3}.overlay .hint-group .speech-bubble .rounded-rect{position:relative;width:15rem;background:#fff;border-radius:15px;padding:0 1rem;z-index:4;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:center;justify-content:center}.overlay .hint-group .speech-bubble .rounded-rect p{font-size:1.45rem}:host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:auto}:host .center-board{-webkit-box-flex:1;flex:1}:host .bottom-container{-webkit-box-flex:1;flex:1}"]
                }] }
    ];
    PuzzlePlayComponent.propDecorators = {
        img: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showHint: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cols: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbPlayedPieces: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbAvailablePieces: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        moved: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        completed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        puzzleView: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['puzzleBoard', { static: false },] }]
    };
    return PuzzlePlayComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IStyleObject() { }
/**
 * @record
 */
function IMove() { }
if (false) {}
var PuzzleStampComponent = /** @class */ (function () {
    function PuzzleStampComponent() {
        this.moved = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.completed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.stampAll = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isUnlockedAll = false;
        this.count = 0;
        this.buttonText = 'Tap here to use all earned keys';
        this.movedItems = [];
    }
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (this.nbPlayedPieces > 0) {
            this.movedItems = Array.from(Array(this.nbPlayedPieces).keys());
        }
        this.currentClick = this.nbPlayedPieces;
    };
    /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    PuzzleStampComponent.prototype.isStampAvailable = /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    function (r, c) {
        return (this.getCurrentColumn(r, c) < this.nbAvailablePieces + this.nbPlayedPieces);
    };
    /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    PuzzleStampComponent.prototype.styleObject = /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    function (r, c) {
        /** @type {?} */
        var style = { 'border-color': this.borderColor };
        if (this.isStampAvailable(r, c)) {
            style['background-color'] = this.highlightColor;
        }
        return style;
    };
    /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    PuzzleStampComponent.prototype.getCurrentColumn = /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    function (r, c) {
        return (r + 1 - 1) * this.cols + c + 1 - 1;
    };
    /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    PuzzleStampComponent.prototype.isStampClicked = /**
     * @param {?} r
     * @param {?} c
     * @return {?}
     */
    function (r, c) {
        return this.movedItems.includes(this.getCurrentColumn(r, c));
    };
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.isWon = /**
     * @return {?}
     */
    function () {
        this.moved.emit({
            nbPlayedPieces: this.nbPlayedPieces,
            nbAvailablePieces: this.nbAvailablePieces
        });
        if (this.nbPlayedPieces >= this.rows * this.cols) {
            this.completed.emit();
        }
    };
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.cardClick = /**
     * @return {?}
     */
    function () {
        if (this.currentClick < this.nbAvailablePieces + this.nbPlayedPieces) {
            this.movedItems.push(this.currentClick++);
            this.nbPlayedPieces++;
            this.nbAvailablePieces--;
            this.isWon();
        }
    };
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.unlockAllAvailable = /**
     * @return {?}
     */
    function () {
        this.isUnlockedAll = true;
    };
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.unlockAvailable = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var i = 0;
        while (i < this.nbAvailablePieces) {
            if (i === this.cols * this.rows - this.nbPlayedPieces) {
                break;
            }
            this.movedItems.push(this.currentClick++);
            i++;
        }
        this.nbPlayedPieces = this.nbPlayedPieces + i;
        this.nbAvailablePieces = this.nbAvailablePieces - i;
        this.stampAll.emit();
    };
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.stampStyle = /**
     * @return {?}
     */
    function () {
        return this.bgImage && !this.isCompleted ?
            { 'background-image': 'url(' + this.bgImage + ')', 'background-color': '#000' } :
            { 'background-image': 'none', 'background-color': 'transparent' };
    };
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.availablePieces = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var redeemdStamp = this.stamps.filter((/**
         * @param {?} stamp
         * @return {?}
         */
        function (stamp) { return stamp.state === 'redeemed'; }));
        this.buttonText = redeemdStamp.length >= this.cols ? 'Netflix rebate earned' : this.buttonText;
        if (redeemdStamp.length >= this.cols) {
            return 'btn-redeemed';
        }
        if (!this.isCurrent) {
            return 'btn-unavailable';
        }
        return '';
    };
    /**
     * @return {?}
     */
    PuzzleStampComponent.prototype.isDisabled = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var issuedStamp = this.stamps.filter((/**
         * @param {?} stamp
         * @return {?}
         */
        function (stamp) { return stamp.state === 'issued'; }));
        return this.isCurrent && issuedStamp.length > 0;
    };
    PuzzleStampComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-puzzle-stamp',
                    template: "<mat-card class=\"example-card\">\n  <div class=\"inner\">\n    <mat-card-content [ngStyle]=\"{ 'background-image': 'url(' + img + ')' }\">\n      <img [src]=\"img\" class=\"bg-img\"/>\n      <div class=\"stamp-container\">\n        <div class=\"stamps\"\n             *ngFor=\"let row of [].constructor(rows); index as stampRow\"\n             [ngStyle]=\"{ height: 100 / rows + '%' }\">\n          <div class=\"stamp\"\n               *ngFor=\"let col of [].constructor(cols); index as stampColumn\" [ngStyle]=\"stampStyle()\">\n            <div [ngClass]=\"isStampClicked(stampRow, stampColumn) ? 'hidden content' : 'content'\"\n                 [ngStyle]=\"styleObject(stampRow, stampColumn)\">\n              <perx-core-stamp [lockImg]=\"lockImg\"\n                               [unlockImg]=\"unlockImg\"\n                               [ngClass]=\"isStampAvailable(stampRow, stampColumn) ? 'available' : ''\"\n                               [available]=\"isStampAvailable(stampRow, stampColumn)\"\n                               [isUnlockedAll]=\"isStampAvailable(stampRow, stampColumn) && isUnlockedAll\"\n                               [isCurrent]=\"isCurrent\"\n                               [stampColumn]=\"stampColumn\"\n                               [stamps]=\"stamps\"\n                               (moveCard)=\"cardClick()\">\n              </perx-core-stamp>\n            </div>\n          </div>\n        </div>\n      </div>\n    </mat-card-content>\n    <mat-card-actions>\n      <button mat-button\n              perxCoreAppDebounceClick\n              [debounceTime]=\"400\"\n              [ngClass]=\"availablePieces()\"\n              [disabled]=\"!isDisabled()\"\n              (debounceClick)=\"unlockAvailable()\"\n              (click)=\"unlockAllAvailable()\">\n        {{buttonText}}\n      </button>\n    </mat-card-actions>\n  </div>\n</mat-card>\n",
                    styles: [".mat-card{box-shadow:none}.mat-card .inner{border:.1rem solid #cac6c6;border-radius:.3rem}.mat-card .inner mat-card-content{background-size:cover;background-repeat:no-repeat;position:relative}.mat-card .inner mat-card-content .bg-img{visibility:hidden;width:100%}.mat-card .inner mat-card-content .stamp-container{position:absolute;top:0;width:100%;height:100%}.mat-card .inner mat-card-content .stamp-container .stamps{display:-webkit-box;display:flex}.mat-card .inner mat-card-content .stamp-container .stamps .stamp{-webkit-box-flex:1;flex-grow:1;flex-basis:0;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center;display:-webkit-box;display:flex;padding:.5rem;background-color:transparent;background-position:center;background-repeat:no-repeat}.mat-card .inner mat-card-content .stamp-container .stamps .stamp .content{border-radius:.3rem;border:.2rem solid;height:100%;width:100%;background-color:#000}.mat-card .inner mat-card-content .stamp-container .stamps .stamp .content perx-core-stamp{height:100%;width:100%}.mat-card-actions{margin:0 0 1rem;padding:0 1.5rem;text-align:center}.mat-card-actions button{background-color:#b20000;color:#fff;border:0;padding:.5rem 1rem;width:100%}.mat-card-actions button.btn-redeemed{background-color:transparent;color:#b20000!important}.mat-card-actions button.btn-unavailable,.mat-card-actions button:disabled,.mat-card-actions button[disabled]{background-color:#d6d6d6;color:#a8a8a8}.hidden{visibility:hidden}"]
                }] }
    ];
    PuzzleStampComponent.propDecorators = {
        img: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        lockImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        unlockImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        highlightColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        borderColor: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rows: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cols: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbPlayedPieces: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbAvailablePieces: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        bgImage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        isCompleted: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        isCurrent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        stamps: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        moved: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        completed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        stampAll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PuzzleStampComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PuzzleCollectStampsComponent = /** @class */ (function () {
    function PuzzleCollectStampsComponent() {
        // This dummy array is describing the slots templates
        this.stampsOrientations = [
            [1, 2],
            [2, 2],
            [2, 1, 2],
            [3, 3],
            [3, 3, 1],
            [4, 4],
            [3, 3, 3],
            [3, 3, 3, 1]
        ];
        this.stamps = [];
        this.showStampsCounter = false;
        this.rewards = [];
        this.nbSlots = null;
        this.preStampImg = null;
        this.postStampImg = null;
        this.rewardPreStamp = null;
        this.rewardPostStamp = null;
        this.backgroundImage = null;
        this.cardBgImage = null;
        this.title = null;
        this.subTitle = null;
        this.availableStampImg = null;
        this.availableRewardImg = null;
        this.availableStampClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.currentActiveOrientation = null;
        this.stampCardImage = null;
        this.availableStampCount = 0;
    }
    /**
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!Array.isArray(this.stamps)) {
            this.stamps = [];
        }
        /** @type {?} */
        var availableStamps = this.stamps.filter((/**
         * @param {?} stamp
         * @return {?}
         */
        function (stamp) { return stamp.state === StampState.issued; }));
        this.availableStampCount = availableStamps.length;
        this.stampCardImage = this.postStampImg;
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.nbSlots && this.nbSlots) {
            this.currentActiveOrientation = this.stampsOrientations[this.nbSlots - 3];
        }
        if (changes.stamps && this.stamps) {
            this.availableStampCount = this.stamps.filter((/**
             * @param {?} stamp
             * @return {?}
             */
            function (stamp) { return stamp.state === StampState.issued; })).length;
        }
    };
    /**
     * @param {?} i
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.counter = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return new Array(i);
    };
    /**
     * @private
     * @param {?} index
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.isIndexPresentInRewards = /**
     * @private
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var isPresent = false;
        this.rewards.forEach((/**
         * @param {?} element
         * @return {?}
         */
        function (element) {
            if (element.rewardPosition === index) {
                isPresent = true;
            }
        }));
        return isPresent;
    };
    /**
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.getStampImage = /**
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    function (index, rowNum) {
        /** @type {?} */
        var itemIndex = this.getItemIndex(index, rowNum);
        /** @type {?} */
        var stamped = (this.stamps !== null &&
            itemIndex < this.stamps.length &&
            this.stamps[itemIndex].state === StampState.redeemed);
        /** @type {?} */
        var isIssued = this.isIssued(index, rowNum);
        if (this.isIndexPresentInRewards(itemIndex)) {
            /** @type {?} */
            var rewardPreStampImage = isIssued && this.availableRewardImg && this.availableStampCount > 0
                ? this.availableRewardImg : this.rewardPreStamp;
            return stamped ? this.rewardPostStamp : rewardPreStampImage;
        }
        /** @type {?} */
        var preImage = this.availableStampImg ? this.availableStampImg : this.preStampImg;
        /** @type {?} */
        var preStampImage = isIssued ? preImage : this.preStampImg;
        return stamped ? this.postStampImg : preStampImage;
    };
    /**
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.isIssued = /**
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    function (index, rowNum) {
        /** @type {?} */
        var itemIndex = this.getItemIndex(index, rowNum);
        if (this.stamps && itemIndex < this.stamps.length) {
            return this.stamps[itemIndex].state === StampState.issued;
        }
        return false;
    };
    /**
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.onAvailableStampClicked = /**
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    function (index, rowNum) {
        if (!this.isIssued(index, rowNum)) {
            return;
        }
        /** @type {?} */
        var itemIndex = this.getItemIndex(index, rowNum);
        if (this.stamps && itemIndex < this.stamps.length) {
            //   this.stamps[itemIndex].state = StampState.redeemed;
            this.availableStampClicked.emit(this.stamps[itemIndex]);
        }
    };
    /**
     * @private
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.getItemIndex = /**
     * @private
     * @param {?} index
     * @param {?} rowNum
     * @return {?}
     */
    function (index, rowNum) {
        /** @type {?} */
        var itemIndex = index;
        if (this.currentActiveOrientation === null) {
            return itemIndex;
        }
        for (var i = 0; i < this.currentActiveOrientation.length; i++) {
            if (rowNum > i) {
                itemIndex += this.currentActiveOrientation[i];
            }
        }
        return itemIndex;
    };
    /**
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.hasCustomStamp = /**
     * @return {?}
     */
    function () {
        return this.availableStampImg != null;
    };
    PuzzleCollectStampsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-puzzle-collect-stamps',
                    template: "<div class=\"main-container\" [ngStyle]=\"{'background-image': backgroundImage? 'url(' + backgroundImage + ')': '' }\">\n\n  <div class=\"content\">\n    <div class=\"stamps\" [ngStyle]=\"{'background-image': cardBgImage? 'url(' + cardBgImage + ')': '' }\">\n      <h1 *ngIf=\"title\">{{title}}</h1>\n      <p class=\"subtitle\" *ngIf=\"subTitle\">{{subTitle}}</p>\n      <p class=\"available-stamp\" *ngIf=\"showStampsCounter\">\n        <img *ngIf=\"stampCardImage\" class=\"stampCountImage\" [src]=\"stampCardImage\" alt=\"\">\n        <span>= {{availableStampCount}}</span>\n      </p>\n      <div class=\"row\" *ngFor=\"let rowItemsCount of currentActiveOrientation; let rowNum = index\">\n        <div class=\"dummy-container\" *ngFor=\"let box of counter(rowItemsCount); let i = index\">\n          <ng-container *ngIf=\"hasCustomStamp() else defaultStamp\">\n            <img\n              (click)=\"onAvailableStampClicked(i, rowNum)\"\n              [src]=\"getStampImage(i, rowNum)\" />\n          </ng-container>\n          <ng-template #defaultStamp>\n            <img [src]=\"getStampImage(i, rowNum)\" />\n            <div (click)=\"onAvailableStampClicked(i, rowNum)\" *ngIf=\"isIssued(i, rowNum)\" class=\"add\">\n              <span>+</span>\n            </div>\n          </ng-template>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".main-container{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;background-size:cover;background-repeat:no-repeat;height:100%;-webkit-box-pack:center;justify-content:center}.content{padding:0 1.5rem;text-align:center}.content h1{color:#212121}.available-stamp .stampCountImage{width:2.4rem}.available-stamp img{vertical-align:middle}.available-stamp span{font-size:1.6rem;color:#000;padding-left:1rem;vertical-align:middle}.content p.subtitle{font-size:1.6rem;color:#212121}.stamps{background-color:rgba(255,255,255,.8);background-position:center;background-size:cover;background-repeat:no-repeat;border-radius:1rem;padding:1.7rem 0 3.2rem}.row{width:100%;display:-webkit-box;display:flex;-webkit-box-pack:space-evenly;justify-content:space-evenly;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;margin-top:1rem}.add{position:absolute;left:0;right:0;margin:auto;bottom:10%;font-size:3rem;text-align:center;color:#2665ee;height:100%}.add span{position:absolute;bottom:0;left:0;right:0}.dummy-container{position:relative;max-width:50%}.dummy-container .add{height:6rem;width:6rem}.dummy-container>img{width:100%}.button-stamp button{width:100%;background-color:#db0010;color:#fff;margin-top:4rem;margin-bottom:4rem}"]
                }] }
    ];
    PuzzleCollectStampsComponent.propDecorators = {
        stamps: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showStampsCounter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rewards: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbSlots: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        preStampImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        postStampImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rewardPreStamp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rewardPostStamp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        backgroundImage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        cardBgImage: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        title: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        subTitle: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        availableStampImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        availableRewardImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        availableStampClicked: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PuzzleCollectStampsComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StampComponent = /** @class */ (function () {
    function StampComponent() {
        this.moveCard = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    StampComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.imageLock = this.lockImg;
    };
    /**
     * @return {?}
     */
    StampComponent.prototype.ngDoCheck = /**
     * @return {?}
     */
    function () {
        // lock to unlock animation on unlock all button click
        if (this.isUnlockedAll) {
            this.imageLock = this.unlockImg;
        }
    };
    /**
     * @private
     * @return {?}
     */
    StampComponent.prototype.isCurrentStamp = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var selectedStamp = this.stamps[this.stampColumn].id;
        /** @type {?} */
        var activeStamp = this.stamps.filter((/**
         * @param {?} stamp
         * @return {?}
         */
        function (stamp) { return stamp.state === 'issued'; }))[0].id;
        return selectedStamp === activeStamp;
    };
    /**
     * @return {?}
     */
    StampComponent.prototype.changeLockImage = /**
     * @return {?}
     */
    function () {
        // lock to unlock animation on card click
        if (this.isCurrent && this.isCurrentStamp()) {
            this.imageLock = this.unlockImg;
        }
    };
    /**
     * @return {?}
     */
    StampComponent.prototype.onCardUnlock = /**
     * @return {?}
     */
    function () {
        if (this.isCurrent && this.isCurrentStamp()) {
            this.moveCard.emit();
        }
    };
    /**
     * @return {?}
     */
    StampComponent.prototype.unlockAllAvailableCards = /**
     * @return {?}
     */
    function () {
        if (this.available) {
            this.imageLock = this.unlockImg;
        }
    };
    StampComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-stamp',
                    template: "<div \n  perxCoreAppDebounceClick\n  [debounceTime]=\"400\"\n  (debounceClick)=\"onCardUnlock()\"\n  (click)=\"changeLockImage()\"\n>\n  <img\n    [src]=\"imageLock\"\n    alt=\"\"\n  />\n</div>",
                    styles: ["div{height:100%;display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center;-webkit-box-pack:center;justify-content:center}"]
                }] }
    ];
    StampComponent.propDecorators = {
        lockImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        unlockImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        available: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        isUnlockedAll: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        isCurrent: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        stampColumn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        stamps: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        moveCard: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return StampComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PuzzlesModule = /** @class */ (function () {
    function PuzzlesModule() {
    }
    PuzzlesModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        PuzzleListComponent,
                        PuzzlePlayComponent,
                        PuzzleStampComponent,
                        PuzzleCollectStampsComponent,
                        StampComponent
                    ],
                    imports: [_angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"], MaterialModule, UtilsModule],
                    exports: [
                        PuzzleListComponent,
                        PuzzlePlayComponent,
                        PuzzleStampComponent,
                        PuzzleCollectStampsComponent
                    ]
                },] }
    ];
    return PuzzlesModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
AuthenticationService = /** @class */ (function () {
    function AuthenticationService() {
    }
    return AuthenticationService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
ProfileService = /** @class */ (function () {
    function ProfileService() {
    }
    return ProfileService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4Profile() { }
if (false) {}
/**
 * @record
 */
function IV4ProfileResponse() { }
if (false) {}
var V4ProfileService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4ProfileService, _super);
    function V4ProfileService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.apiHost = (/** @type {?} */ (config.apiHost));
        return _this;
    }
    /**
     * @param {?} profile
     * @return {?}
     */
    V4ProfileService.v4ProfileToProfile = /**
     * @param {?} profile
     * @return {?}
     */
    function (profile) {
        return {
            id: profile.id,
            identifier: profile.identifier,
            state: profile.state,
            firstName: profile.first_name,
            lastName: profile.last_name,
            middleName: profile.middle_name,
            phone: profile.phone,
            email: profile.email,
            birthDate: profile.birthday ? new Date(profile.birthday) : undefined,
            gender: profile.gender,
            joinedDate: profile.joined_at,
            passwordExpiryDate: profile.password_expires_at,
            customProperties: profile.personal_properties
        };
    };
    /**
     * @return {?}
     */
    V4ProfileService.prototype.whoAmI = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.apiHost + "/v4/customers/me";
        return this.http.get(url)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return V4ProfileService.v4ProfileToProfile(resp.data); })));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    V4ProfileService.prototype.setCustomProperties = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return _this.http.patch(_this.apiHost + "/v4/customers/" + profile.id, {
            personal_properties: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, profile.customProperties, data)
        }); })));
    };
    /**
     * @return {?}
     */
    V4ProfileService.prototype.getCustomProperties = /**
     * @return {?}
     */
    function () {
        return this.whoAmI()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return profile.customProperties || {}; })));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    V4ProfileService.prototype.updateUserInfo = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return _this.http.patch(_this.apiHost + "/v4/customers/" + profile.id, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, profile, data)); })));
    };
    /**
     * @param {?} data
     * @return {?}
     */
    V4ProfileService.prototype.setCardNumber = /**
     * @param {?} data
     * @return {?}
     */
    function (data) {
        var _this = this;
        return this.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return _this.http.patch(_this.apiHost + "/v4/customers/" + profile.id + "/map_cardnumber", {
            data: data
        }); })));
    };
    V4ProfileService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4ProfileService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4ProfileService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4ProfileService_Factory() { return new V4ProfileService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4ProfileService, providedIn: "root" });
    return V4ProfileService;
}(ProfileService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4SignUpData() { }
if (false) {}
/**
 * @record
 */
function IV4AuthenticateUserRequest() { }
if (false) {}
/**
 * @record
 */
function IV4AuthenticatePiRequest() { }
if (false) {}
var V4AuthenticationService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4AuthenticationService, _super);
    function V4AuthenticationService(config, http, tokenStorage, profileService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.tokenStorage = tokenStorage;
        _this.profileService = profileService;
        _this.retries = 0;
        _this.maxRetries = 2;
        if (!config.production) {
            _this.appAuthEndPoint = 'http://localhost:4000/v2/oauth';
            _this.userAuthEndPoint = 'http://localhost:4000/v4/oauth';
        }
        else {
            _this.appAuthEndPoint = config.baseHref + 'v2/oauth';
            _this.userAuthEndPoint = config.baseHref + 'v4/oauth';
        }
        _this.customersEndPoint = config.apiHost + '/v4/customers';
        _this.$failedAuthObservable = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]();
        return _this;
    }
    Object.defineProperty(V4AuthenticationService.prototype, "$failedAuth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.$failedAuthObservable;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.isAuthorized = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = this.tokenStorage
            .getAppInfoProperty('userAccessToken');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(!!token);
    };
    // To be refactor, current not in use
    // To be refactor, current not in use
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.refreshToken = 
    // To be refactor, current not in use
    /**
     * @return {?}
     */
    function () {
        console.log('No refresh token function required for v*, always pass true to ngx-auth');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(true);
    };
    /**
     * @param {?} response
     * @return {?}
     */
    V4AuthenticationService.prototype.refreshShouldHappen = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        return this.retries < this.maxRetries && response.status === 401;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    V4AuthenticationService.prototype.verifyTokenRequest = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token');
    };
    /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @param {?=} scope
     * @return {?}
     */
    V4AuthenticationService.prototype.login = /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @param {?=} scope
     * @return {?}
     */
    function (user, pass, mechId, campaignId, scope) {
        var _this = this;
        return this.authenticateUser(user, pass, mechId, campaignId, scope).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var userBearer = res && res.bearer_token;
            if (!userBearer) {
                throw new Error('Get authentication token failed!');
            }
            _this.saveUserAccessToken(userBearer);
        }), (/**
         * @return {?}
         */
        function () {
            _this.$failedAuthObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(true);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])(err); })));
    };
    /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @param {?=} scope
     * @return {?}
     */
    V4AuthenticationService.prototype.authenticateUser = /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @param {?=} scope
     * @return {?}
     */
    function (user, pass, mechId, campaignId, scope) {
        /** @type {?} */
        var authenticateBody = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ url: location.host, username: user, password: pass }, mechId && { mech_id: mechId }, campaignId && { campaign_id: campaignId }, scope && { scope: scope });
        return this.http.post(this.userAuthEndPoint + '/token', authenticateBody);
    };
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.autoLogin = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var user = ((/** @type {?} */ (window))).primaryIdentifier;
        return this.authenticateUserWithPI(user).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var userBearer = res && res.bearer_token;
            if (!userBearer) {
                throw new Error('Get authentication token failed!');
            }
            _this.saveUserAccessToken(userBearer);
        }), (/**
         * @return {?}
         */
        function () {
            _this.$failedAuthObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(true);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])(err); })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} pi
     * @param {?=} userObj
     * @param {?=} anonymous
     * @return {?}
     */
    V4AuthenticationService.prototype.createUserAndAutoLogin = 
    // @ts-ignore
    /**
     * @param {?} pi
     * @param {?=} userObj
     * @param {?=} anonymous
     * @return {?}
     */
    function (pi, userObj, anonymous) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    /**
     * @param {?} user
     * @return {?}
     */
    V4AuthenticationService.prototype.authenticateUserWithPI = /**
     * @param {?} user
     * @return {?}
     */
    function (user) {
        /** @type {?} */
        var authenticatePiRequest = {
            url: location.host,
            identifier: user
        };
        return this.http.post(this.userAuthEndPoint + '/token', authenticatePiRequest);
    };
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.getAppToken = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var authenticateRequest = {
            url: location.host
        };
        return this.http.post(this.appAuthEndPoint + '/token', authenticateRequest).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) {
            _this.saveAppAccessToken(resp.access_token);
        })));
    };
    /**
     * @param {?} url
     * @return {?}
     */
    V4AuthenticationService.prototype.setInterruptedUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        this.lastURL = url;
    };
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.getInterruptedUrl = /**
     * @return {?}
     */
    function () {
        return this.lastURL;
    };
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.tokenStorage.clearAppInfoProperty(['userAccessToken', 'pi', 'anonymous']);
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    V4AuthenticationService.prototype.forgotPassword = 
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        return this.http.get(this.customersEndPoint + "/forget_password", { params: { phone: phone } })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((
        // Log the result or error
        /**
         * @param {?} data
         * @return {?}
         */
        function (// Log the result or error
        data) { return console.log(data); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return console.log(error); })));
    };
    /**
     * @param {?} resetPasswordInfo
     * @return {?}
     */
    V4AuthenticationService.prototype.resetPassword = /**
     * @param {?} resetPasswordInfo
     * @return {?}
     */
    function (resetPasswordInfo) {
        return this.http.patch(this.customersEndPoint + "/reset_password", {
            phone: resetPasswordInfo.phone,
            password: resetPasswordInfo.newPassword,
            password_confirmation: resetPasswordInfo.passwordConfirmation,
            confirmation_token: resetPasswordInfo.otp
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((
        // Log the result or error
        /**
         * @param {?} data
         * @return {?}
         */
        function (// Log the result or error
        data) { return console.log(data); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return console.log(error); })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    V4AuthenticationService.prototype.resendOTP = 
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        return this.http.get(this.customersEndPoint + "/resend_confirmation", { params: { phone: phone } })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((
        // Log the result or error
        /**
         * @param {?} data
         * @return {?}
         */
        function (// Log the result or error
        data) { return console.log(data); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return console.log(error); })));
    };
    /**
     * @private
     * @param {?} data
     * @return {?}
     */
    V4AuthenticationService.prototype.signUpDataToV4SignUpData = /**
     * @private
     * @param {?} data
     * @return {?}
     */
    function (data) {
        if (data.title && data.postcode) {
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ last_name: data.lastName || '', first_name: data.firstName, birthday: data.birthDay, password_confirmation: data.passwordConfirmation, personal_properties: {
                    title: data.title,
                    postcode: data.postcode
                } }, data);
        }
        return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ last_name: data.lastName || '', first_name: data.firstName, birthday: data.birthDay, password_confirmation: data.passwordConfirmation }, data);
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} profile
     * @return {?}
     */
    V4AuthenticationService.prototype.signup = 
    // @ts-ignore
    /**
     * @param {?} profile
     * @return {?}
     */
    function (profile) {
        /** @type {?} */
        var profileV4 = this.signUpDataToV4SignUpData(profile);
        return this.http.post(this.customersEndPoint + "/signup", profileV4)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((
        // Log the result or error
        /**
         * @param {?} data
         * @return {?}
         */
        function (// Log the result or error
        data) { return console.log(data); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return console.log(error); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return V4ProfileService.v4ProfileToProfile(resp.data); })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} phone
     * @param {?} otp
     * @return {?}
     */
    V4AuthenticationService.prototype.verifyOTP = 
    // @ts-ignore
    /**
     * @param {?} phone
     * @param {?} otp
     * @return {?}
     */
    function (phone, otp) {
        return this.http.patch(this.customersEndPoint + "/confirm", { phone: phone, confirmation_token: otp })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((
        // Log the result or error
        /**
         * @param {?} data
         * @return {?}
         */
        function (// Log the result or error
        data) { return console.log(data); }), (/**
         * @param {?} error
         * @return {?}
         */
        function (error) { return console.log(error); })));
    };
    /**
     * @param {?=} phone
     * @return {?}
     */
    V4AuthenticationService.prototype.requestVerificationToken = /**
     * @param {?=} phone
     * @return {?}
     */
    function (phone) {
        var _this = this;
        return this.profileService.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return _this.http.get(_this.customersEndPoint + "/" + profile.id + "/request_verification_token" + (phone ? '?phone=' + phone : '')); })));
    };
    /**
     * @param {?} changePhoneData
     * @return {?}
     */
    V4AuthenticationService.prototype.changePhone = /**
     * @param {?} changePhoneData
     * @return {?}
     */
    function (changePhoneData) {
        var _this = this;
        return this.profileService.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return _this.http.patch(_this.customersEndPoint + "/" + profile.id + "/change_phone", {
            phone: changePhoneData.phone,
            confirmation_token: changePhoneData.otp
        }); })));
    };
    /**
     * @param {?} changePasswordData
     * @return {?}
     */
    V4AuthenticationService.prototype.changePassword = /**
     * @param {?} changePasswordData
     * @return {?}
     */
    function (changePasswordData) {
        var _this = this;
        return this.profileService.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return _this.http.patch(_this.customersEndPoint + "/" + profile.id + "/change_password", {
            old_password: changePasswordData.oldPassword,
            password: changePasswordData.newPassword,
            password_confirmation: changePasswordData.passwordConfirmation,
            confirmation_token: changePasswordData.otp
        }); })));
    };
    /**
     * Get access token
     * @description Should return user access token in Observable from e.g.
     * localStorage
     */
    /**
     * Get access token
     * \@description Should return user access token in Observable from e.g.
     * localStorage
     * @return {?}
     */
    V4AuthenticationService.prototype.getAccessToken = /**
     * Get access token
     * \@description Should return user access token in Observable from e.g.
     * localStorage
     * @return {?}
     */
    function () {
        /** @type {?} */
        var userAccessToken = this.getUserAccessToken();
        /** @type {?} */
        var appAccessToken = this.getAppAccessToken();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(userAccessToken ? userAccessToken : appAccessToken);
    };
    /**
     * Get user access token
     * @description Should return user access token in Observable from e.g.
     * localStorage
     */
    /**
     * Get user access token
     * \@description Should return user access token in Observable from e.g.
     * localStorage
     * @return {?}
     */
    V4AuthenticationService.prototype.getUserAccessToken = /**
     * Get user access token
     * \@description Should return user access token in Observable from e.g.
     * localStorage
     * @return {?}
     */
    function () {
        return this.tokenStorage.getAppInfoProperty('userAccessToken') || '';
    };
    /**
     * Set user access token
     * @description Should set user access token in Observable from e.g.
     * localStorage
     */
    /**
     * Set user access token
     * \@description Should set user access token in Observable from e.g.
     * localStorage
     * @param {?} accessToken
     * @return {?}
     */
    V4AuthenticationService.prototype.saveUserAccessToken = /**
     * Set user access token
     * \@description Should set user access token in Observable from e.g.
     * localStorage
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        this.tokenStorage.setAppInfoProperty(accessToken, 'userAccessToken');
    };
    /**
     * Get user access token
     * @description Should return user access token in Observable from e.g.
     * localStorage
     */
    /**
     * Get user access token
     * \@description Should return user access token in Observable from e.g.
     * localStorage
     * @return {?}
     */
    V4AuthenticationService.prototype.getAppAccessToken = /**
     * Get user access token
     * \@description Should return user access token in Observable from e.g.
     * localStorage
     * @return {?}
     */
    function () {
        return this.tokenStorage.getAppInfoProperty('appAccessToken') || '';
    };
    /**
     * Set access token
     * @description Should set user access token in Observable from e.g.
     * localStorage
     */
    /**
     * Set access token
     * \@description Should set user access token in Observable from e.g.
     * localStorage
     * @param {?} accessToken
     * @return {?}
     */
    V4AuthenticationService.prototype.saveAppAccessToken = /**
     * Set access token
     * \@description Should set user access token in Observable from e.g.
     * localStorage
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
    };
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.getPI = /**
     * @return {?}
     */
    function () {
        return this.tokenStorage.getAppInfoProperty('pi') || '';
    };
    /**
     * @param {?} pi
     * @return {?}
     */
    V4AuthenticationService.prototype.savePI = /**
     * @param {?} pi
     * @return {?}
     */
    function (pi) {
        this.tokenStorage.setAppInfoProperty(pi, 'pi');
    };
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.getAnonymous = /**
     * @return {?}
     */
    function () {
        return !!this.tokenStorage.getAppInfoProperty('anonymous');
    };
    /**
     * @param {?} anonymous
     * @return {?}
     */
    V4AuthenticationService.prototype.saveAnonymous = /**
     * @param {?} anonymous
     * @return {?}
     */
    function (anonymous) {
        this.tokenStorage.setAppInfoProperty(anonymous, 'anonymous');
    };
    /**
     * @return {?}
     */
    V4AuthenticationService.prototype.getUserId = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var id = this.tokenStorage.getAppInfoProperty('id');
        return id ? Number.parseInt(id, 10) : null;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    V4AuthenticationService.prototype.saveUserId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.tokenStorage.setAppInfoProperty(id, 'id');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} fromIds
     * @param {?} toId
     * @return {?}
     */
    V4AuthenticationService.prototype.mergeUserById = 
    // @ts-ignore
    /**
     * @param {?} fromIds
     * @param {?} toId
     * @return {?}
     */
    function (fromIds, toId) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    V4AuthenticationService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4AuthenticationService.ctorParameters = function () { return [
        { type: Config },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: TokenStorage },
        { type: ProfileService }
    ]; };
    /** @nocollapse */ V4AuthenticationService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4AuthenticationService_Factory() { return new V4AuthenticationService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(TokenStorage), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(ProfileService)); }, token: V4AuthenticationService, providedIn: "root" });
    return V4AuthenticationService;
}(AuthenticationService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IUserJWTRequest() { }
if (false) {}
/** @enum {string} */
var APIAttributesMap = {
    fistName: 'first_name',
    first_name: 'first_name',
    lastName: 'last_name',
    last_name: 'last_name',
    primary_identifier: 'primary_identifier',
    primaryIdentifier: 'primary_identifier',
    phone_number: 'phone_number',
    phoneNumber: 'phone_number',
    email_address: 'email_address',
    emailAddress: 'email_address',
    title: 'title',
};
var WhistlerAuthenticationService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(WhistlerAuthenticationService, _super);
    function WhistlerAuthenticationService(config, http, tokenStorage) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.tokenStorage = tokenStorage;
        _this.retries = 0;
        _this.maxRetries = 2;
        _this.apiHost = (/** @type {?} */ (config.apiHost));
        if (!config.production) {
            _this.preAuthEndpoint = 'http://localhost:4000/cognito/login';
            _this.createUsersEndPoint = 'http://localhost:4000/cognito/users';
        }
        else {
            _this.preAuthEndpoint = config.baseHref + 'cognito/login';
            _this.createUsersEndPoint = config.baseHref + 'cognito/users';
        }
        _this.$failedAuthObservableSubject = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        return _this;
    }
    Object.defineProperty(WhistlerAuthenticationService.prototype, "$failedAuth", {
        get: /**
         * @return {?}
         */
        function () {
            return this.$failedAuthObservableSubject;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} userObj
     * @param {?} PI
     * @return {?}
     */
    WhistlerAuthenticationService.UsertoWUser = /**
     * @private
     * @param {?} userObj
     * @param {?} PI
     * @return {?}
     */
    function (userObj, PI) {
        /** @type {?} */
        var profile = {
            title: null,
            first_name: null,
            last_name: null,
            phone_number: null,
            email_address: null,
            primary_identifier: PI,
            properties: {}
        };
        Object.entries(userObj).forEach((/**
         * @param {?} field
         * @return {?}
         */
        function (field) {
            if (APIAttributesMap[field[0]] !== undefined) {
                profile[APIAttributesMap[field[0]]] = field[1];
            }
            else {
                if (!profile.properties) {
                    profile.properties = {};
                }
                profile.properties[field[0]] = field[1];
            }
        }));
        return profile;
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.isAuthorized = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = this.tokenStorage
            .getAppInfoProperty('userAccessToken');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(!!token);
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.refreshToken = /**
     * @return {?}
     */
    function () {
        /**
         * Conditions
         * login success, but Token expired, when API return 401, this function will be trigged.
         *  1 IAM user need to redirect to login page
         *  2 Cognito user we store PI at localStorage when user auto login, then help user to auto login.
         *
         * TODO: Andrew, failedAuthObservableSubject is not working, affect refresh page when token is not valid
         */
        /**
         * Conditions
         * login success, but Token expired, when API return 401, this function will be trigged.
         *  1 IAM user need to redirect to login page
         *  2 Cognito user we store PI at localStorage when user auto login, then help user to auto login.
         *
         * TODO: Andrew, failedAuthObservableSubject is not working, affect refresh page when token is not valid
         * @type {?}
         */
        var isRefreshTokenComplete = true;
        this.retries++;
        if (this.retries <= this.maxRetries && this.getPI()) {
            this.autoLogin().subscribe((/**
             * @return {?}
             */
            function () { return console.log('finished refresh token'); }));
        }
        else {
            isRefreshTokenComplete = false;
            this.logout();
        }
        this.$failedAuthObservableSubject.next(!isRefreshTokenComplete);
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(isRefreshTokenComplete);
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.autoLogin = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.getUserWithPI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var userBearer = res.data[0].attributes.jwt;
            if (!userBearer) {
                throw new Error('Get authentication token failed!');
            }
            /** @type {?} */
            var pi = ((/** @type {?} */ (window))).primaryIdentifier || _this.getPI();
            _this.savePI(pi);
            _this.saveUserId(Number.parseInt(res.data[0].id, 10));
            _this.saveUserAccessToken(userBearer);
        })));
    };
    /**
     * @param {?} pi
     * @param {?=} userObj
     * @param {?=} anonymous
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.createUserAndAutoLogin = /**
     * @param {?} pi
     * @param {?=} userObj
     * @param {?=} anonymous
     * @return {?}
     */
    function (pi, userObj, anonymous) {
        var _this = this;
        return this.createUserWithPI(pi, userObj, anonymous).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var userBearer = res.data[0].attributes.jwt;
            if (!userBearer) {
                throw new Error('Get authentication token failed!');
            }
            if (anonymous === undefined) {
                anonymous = false;
            }
            _this.savePI(pi);
            _this.saveAnonymous(anonymous);
            _this.saveUserId(Number.parseInt(res.data[0].id, 10));
            _this.saveUserAccessToken(userBearer);
        })));
    };
    /**
     * @private
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getUserWithPI = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var user = ((/** @type {?} */ (window))).primaryIdentifier || this.getPI();
        /** @type {?} */
        var userJWTRequest = {
            url: location.host,
            identifier: user
        };
        return this.http.post(this.preAuthEndpoint, userJWTRequest);
    };
    /**
     * @private
     * @param {?} pi
     * @param {?=} userObj
     * @param {?=} anonymous
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.createUserWithPI = /**
     * @private
     * @param {?} pi
     * @param {?=} userObj
     * @param {?=} anonymous
     * @return {?}
     */
    function (pi, userObj, anonymous) {
        /** @type {?} */
        var userJWTRequest = {
            url: location.host,
            identifier: pi,
            anonymous: anonymous
        };
        if (userObj) {
            userJWTRequest.profile = WhistlerAuthenticationService.UsertoWUser(userObj, pi);
        }
        return this.http.post(this.createUsersEndPoint, userJWTRequest);
    };
    /**
     * @param {?} response
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.refreshShouldHappen = /**
     * @param {?} response
     * @return {?}
     */
    function (response) {
        return this.retries < this.maxRetries && response.status === 401;
    };
    /**
     * @param {?} url
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.verifyTokenRequest = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token') || url.endsWith('/cognito/login');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.login = 
    // @ts-ignore
    /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @return {?}
     */
    function (user, pass, mechId, campaignId) {
        var _this = this;
        return this.getIamUser(user, pass, mechId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var userBearer = res.headers.get('Authorization');
            if (!userBearer) {
                throw new Error('Get authentication token failed!');
            }
            _this.saveUserAccessToken(userBearer);
        }), (/**
         * @return {?}
         */
        function () { return _this.$failedAuthObservableSubject.next(true); })));
    };
    /**
     * @private
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getIamUser = /**
     * @private
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @return {?}
     */
    function (user, pass, mechId) {
        return this.http.post(this.apiHost + '/iam/users/sign_in', {
            data: {
                attributes: {
                    tenant_id: mechId,
                    username: user,
                    password: pass
                }
            }
        }, { observe: 'response' });
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getAppToken = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    /**
     * @param {?} url
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.setInterruptedUrl = /**
     * @param {?} url
     * @return {?}
     */
    function (url) {
        this.lastURL = url;
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getInterruptedUrl = /**
     * @return {?}
     */
    function () {
        return this.lastURL;
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.logout = /**
     * @return {?}
     */
    function () {
        this.tokenStorage.clearAppInfoProperty(['userAccessToken', 'pi', 'anonymous']);
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.forgotPassword = 
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} resetPasswordInfo
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.resetPassword = 
    // @ts-ignore
    /**
     * @param {?} resetPasswordInfo
     * @return {?}
     */
    function (resetPasswordInfo) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.resendOTP = 
    // @ts-ignore
    /**
     * @param {?} phone
     * @return {?}
     */
    function (phone) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} profile
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.signup = 
    // @ts-ignore
    /**
     * @param {?} profile
     * @return {?}
     */
    function (profile) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?=} phone
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.requestVerificationToken = 
    // @ts-ignore
    /**
     * @param {?=} phone
     * @return {?}
     */
    function (phone) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} changePhoneData
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.changePhone = 
    // @ts-ignore
    /**
     * @param {?} changePhoneData
     * @return {?}
     */
    function (changePhoneData) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} phone
     * @param {?} otp
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.verifyOTP = 
    // @ts-ignore
    /**
     * @param {?} phone
     * @param {?} otp
     * @return {?}
     */
    function (phone, otp) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} changePasswordData
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.changePassword = 
    // @ts-ignore
    /**
     * @param {?} changePasswordData
     * @return {?}
     */
    function (changePasswordData) {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getAccessToken = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var userAccessToken = this.getUserAccessToken();
        /** @type {?} */
        var appAccessToken = this.getAppAccessToken();
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(userAccessToken ? userAccessToken : appAccessToken);
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getUserAccessToken = /**
     * @return {?}
     */
    function () {
        return this.tokenStorage.getAppInfoProperty('userAccessToken') || '';
    };
    /**
     * @param {?} accessToken
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.saveUserAccessToken = /**
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        this.tokenStorage.setAppInfoProperty(accessToken, 'userAccessToken');
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getAppAccessToken = /**
     * @return {?}
     */
    function () {
        return this.tokenStorage.getAppInfoProperty('appAccessToken') || '';
    };
    /**
     * @param {?} accessToken
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.saveAppAccessToken = /**
     * @param {?} accessToken
     * @return {?}
     */
    function (accessToken) {
        this.tokenStorage.setAppInfoProperty(accessToken, 'appAccessToken');
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getPI = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pi = this.tokenStorage.getAppInfoProperty('pi') || '';
        // eventually refresh window param for GTM
        if (pi !== undefined && pi !== '') {
            ((/** @type {?} */ (window))).primaryIdentifier = pi;
        }
        return pi;
    };
    /**
     * @param {?} pi
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.savePI = /**
     * @param {?} pi
     * @return {?}
     */
    function (pi) {
        this.tokenStorage.setAppInfoProperty(pi, 'pi');
        // update global property for GTM
        ((/** @type {?} */ (window))).primaryIdentifier = pi;
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getAnonymous = /**
     * @return {?}
     */
    function () {
        return !!this.tokenStorage.getAppInfoProperty('anonymous');
    };
    /**
     * @param {?} anonymous
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.saveAnonymous = /**
     * @param {?} anonymous
     * @return {?}
     */
    function (anonymous) {
        this.tokenStorage.setAppInfoProperty(anonymous, 'anonymous');
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getUserId = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var id = this.tokenStorage.getAppInfoProperty('id');
        return id ? Number.parseInt(id, 10) : null;
    };
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.saveUserId = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        this.tokenStorage.setAppInfoProperty(id, 'id');
    };
    /**
     * @param {?} fromIds
     * @param {?} toId
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.mergeUserById = /**
     * @param {?} fromIds
     * @param {?} toId
     * @return {?}
     */
    function (fromIds, toId) {
        return this.http.post(this.apiHost + '/cognito/chown_requests', {
            data: {
                type: 'chown_requests',
                attributes: {
                    from_ids: fromIds,
                    to_id: toId
                }
            }
        }, {
            headers: {
                'Content-Type': 'application/vnd.api+json'
            }
        });
    };
    WhistlerAuthenticationService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerAuthenticationService.ctorParameters = function () { return [
        { type: Config },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: TokenStorage }
    ]; };
    /** @nocollapse */ WhistlerAuthenticationService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerAuthenticationService_Factory() { return new WhistlerAuthenticationService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(TokenStorage)); }, token: WhistlerAuthenticationService, providedIn: "root" });
    return WhistlerAuthenticationService;
}(AuthenticationService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
IFormsService = /** @class */ (function () {
    function IFormsService() {
    }
    return IFormsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IAnswer() { }
if (false) {}
/**
 * @record
 */
function IPoints() { }
if (false) {}
/**
 * @record
 */
function IDateRange() { }
if (false) {}
/**
 * @record
 */
function ITracker() { }
/**
 * @record
 */
function IQuestion() { }
if (false) {}
/** @enum {string} */
var MaterialColor = {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
};
/**
 * @record
 */
function ISurvey() { }
if (false) {}
/** @enum {string} */
var SurveyQuestionType = {
    rating: 'rating',
    pictureChoice: 'picture-select',
    longText: 'long-text',
    multipleChoice: 'select',
    questionGroup: 'group',
    date: 'date',
    phone: 'phone',
};
/**
 * @record
 */
function IErrors() { }
if (false) {}
/**
 * @record
 */
function IPayload() { }
if (false) {}
/** @enum {string} */
var SurveyRatingIcons = {
    star: 'star_border',
    star_selected: 'star',
    heart: 'favorite_border',
    heart_selected: 'favorite',
    circle: 'panorama_fish_eye',
    circle_selected: 'brightness_1',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
ICampaignService = /** @class */ (function () {
    function ICampaignService() {
    }
    return ICampaignService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SurveyService = /** @class */ (function () {
    function SurveyService(http, campaignService, config) {
        this.http = http;
        this.campaignService = campaignService;
        this.baseUrl = config.apiHost || '';
    }
    /**
     * @private
     * @param {?} t
     * @return {?}
     */
    SurveyService.WQTypeToQType = /**
     * @private
     * @param {?} t
     * @return {?}
     */
    function (t) {
        // todo have a smarter mapping
        return (/** @type {?} */ ((/** @type {?} */ (t))));
    };
    /**
     * @param {?} survey
     * @return {?}
     */
    SurveyService.WSurveyToSurvey = /**
     * @param {?} survey
     * @return {?}
     */
    function (survey) {
        /** @type {?} */
        var dp = survey.data.attributes.display_properties;
        if (dp) {
            /** @type {?} */
            var questions = dp.questions.map((/**
             * @param {?} q
             * @return {?}
             */
            function (q) {
                /** @type {?} */
                var payload = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, q.payload, { type: SurveyService.WQTypeToQType(q.payload.type) });
                return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, q, { payload: payload });
            }));
            return {
                id: survey.data.id,
                title: survey.data.attributes.title || '',
                subTitle: dp.sub_title,
                progressBarColor: MaterialColor[dp.progress_bar_color],
                cardBackgroundImgUrl: dp.card_background_img_url,
                backgroundImgUrl: dp.background_img_url,
                questions: questions
            };
        }
        throw new Error('Display properties does not exist for mapping to occur');
    };
    /**
     * @param {?} id
     * @return {?}
     */
    SurveyService.prototype.getSurveyFromCampaign = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        /** @type {?} */
        var disProp;
        return this.campaignService.getCampaign(id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) {
            disProp = campaign.displayProperties;
            return _this.http.get(_this.baseUrl + "/survey/engagements/" + campaign.engagementId + "?campaign_id=" + id);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} s
         * @return {?}
         */
        function (s) { return console.error('got survey', s); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var surveyData = SurveyService.WSurveyToSurvey(res);
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, surveyData, { displayProperties: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, surveyData.displayProperties, disProp) });
        })));
    };
    /**
     * @param {?} answers
     * @param {?} campaignId
     * @param {?} surveyId
     * @return {?}
     */
    SurveyService.prototype.postSurveyAnswer = /**
     * @param {?} answers
     * @param {?} campaignId
     * @param {?} surveyId
     * @return {?}
     */
    function (answers, campaignId, surveyId) {
        /** @type {?} */
        var body = {
            data: {
                type: 'answers',
                attributes: {
                    engagement_id: surveyId,
                    campaign_entity_id: campaignId,
                    content: answers
                }
            }
        };
        return this.http.post(this.baseUrl + '/survey/answers', body, {
            headers: { 'Content-Type': 'application/vnd.api+json' }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var hasOutcomes = res.data.attributes.results.attributes.results.length > 0;
            return {
                hasOutcomes: hasOutcomes
            };
        })));
    };
    SurveyService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SurveyService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: ICampaignService },
        { type: Config }
    ]; };
    /** @nocollapse */ SurveyService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function SurveyService_Factory() { return new SurveyService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(ICampaignService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: SurveyService, providedIn: "root" });
    return SurveyService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerFormsService = /** @class */ (function () {
    // @ts-ignore
    function WhistlerFormsService(config, http) {
        this.config = config;
        this.http = http;
        this.baseUrl = (/** @type {?} */ (config.apiHost));
    }
    /**
     * @return {?}
     */
    WhistlerFormsService.prototype.getSignupForm = /**
     * @return {?}
     */
    function () {
        return this.http.get(this.baseUrl + "/cognito/tenants/")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res[0]; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.attributes.properties.signup; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} form
         * @return {?}
         */
        function (form) { return form ? SurveyService.WSurveyToSurvey({
            data: {
                id: '',
                type: '',
                links: { self: '' },
                attributes: {
                    display_properties: form
                }
            }
        }) : undefined; })));
    };
    WhistlerFormsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerFormsService.ctorParameters = function () { return [
        { type: Config },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] }
    ]; };
    /** @nocollapse */ WhistlerFormsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerFormsService_Factory() { return new WhistlerFormsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"])); }, token: WhistlerFormsService, providedIn: "root" });
    return WhistlerFormsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} tokenStorage
 * @param {?} profileService
 * @return {?}
 */
function AuthServiceFactory(http, config, tokenStorage, profileService) {
    // Make decision on what to instantiate base on config
    if (config.isWhistler) {
        return new WhistlerAuthenticationService(config, http, tokenStorage);
    }
    return new V4AuthenticationService(config, http, tokenStorage, profileService);
}
/**
 * @param {?} config
 * @param {?} http
 * @return {?}
 */
function FormsServiceFactory(config, http) {
    return new WhistlerFormsService(config, http);
}
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [ngx_auth__WEBPACK_IMPORTED_MODULE_12__["AuthModule"], UtilsModule],
                    declarations: [],
                    exports: [],
                    providers: [
                        { provide: ngx_auth__WEBPACK_IMPORTED_MODULE_12__["PROTECTED_FALLBACK_PAGE_URI"], useValue: '/' },
                        { provide: ngx_auth__WEBPACK_IMPORTED_MODULE_12__["PUBLIC_FALLBACK_PAGE_URI"], useValue: '/login' },
                        {
                            provide: AuthenticationService,
                            useFactory: AuthServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, TokenStorage, ProfileService]
                        },
                        {
                            provide: ngx_auth__WEBPACK_IMPORTED_MODULE_12__["AUTH_SERVICE"],
                            useFactory: AuthServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, TokenStorage, ProfileService]
                        },
                        { provide: IFormsService, useFactory: FormsServiceFactory, deps: [Config, _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]] }
                    ]
                },] }
    ];
    return AuthenticationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var modules$1 = [VouchersModule, PuzzlesModule, AuthenticationModule];
var PerxCoreModule = /** @class */ (function () {
    function PerxCoreModule() {
    }
    PerxCoreModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(modules$1),
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(modules$1)
                },] }
    ];
    return PerxCoreModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} value
 * @return {?}
 */
function isEmptyString(value) {
    return value === '' || (value === null || value === undefined);
}
/**
 * @param {?} array
 * @return {?}
 */
function isEmptyArray(array) {
    return array === undefined || array === null || array.length === 0;
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerMerchantsService = /** @class */ (function () {
    function WhistlerMerchantsService(http, config) {
        this.http = http;
        this.config = config;
        this.merchants = {};
        this.historyMeta = {};
    }
    /**
     * @private
     * @param {?} merchant
     * @return {?}
     */
    WhistlerMerchantsService.WMerchantToMerchant = /**
     * @private
     * @param {?} merchant
     * @return {?}
     */
    function (merchant) {
        return {
            id: (typeof merchant.id === 'string') ? Number.parseInt(merchant.id, 10) : merchant.id,
            name: merchant.attributes.name,
            description: merchant.attributes.description,
            images: merchant.attributes.properties.logo_image ? [
                {
                    type: 'banner',
                    url: merchant.attributes.properties.logo_image
                }
            ] : []
        };
    };
    /**
     * @return {?}
     */
    WhistlerMerchantsService.prototype.getAllMerchants = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var i = 1;
        /** @type {?} */
        var current = {};
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]((/**
         * @param {?} sub
         * @return {?}
         */
        function (sub) {
            _this.getMerchantsPage(i).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["expand"])((/**
             * @param {?} response
             * @return {?}
             */
            function (response) {
                return (response.meta && response.meta.page_count && response.meta.page_count > i) ? _this.getMerchantsPage(++i) : rxjs__WEBPACK_IMPORTED_MODULE_7__["EMPTY"];
            })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
             * @param {?} value
             * @return {?}
             */
            function (value) { return value.data.map((/**
             * @param {?} el
             * @return {?}
             */
            function (el) { return WhistlerMerchantsService.WMerchantToMerchant(el); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data.forEach((/**
             * @param {?} el
             * @return {?}
             */
            function (el) { return current[el.id] = el; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["finalize"])((/**
             * @return {?}
             */
            function () { return _this.merchants = current; }))).subscribe((/**
             * @return {?}
             */
            function () {
                sub.next(Object.values(Object.assign(current, _this.merchants)));
            }));
        }));
    };
    /**
     * @private
     * @param {?} page
     * @return {?}
     */
    WhistlerMerchantsService.prototype.getMerchantsPage = /**
     * @private
     * @param {?} page
     * @return {?}
     */
    function (page) {
        /** @type {?} */
        var pageSize = 10;
        /** @type {?} */
        var params = {
            page_number: "" + page,
            page_size: "" + pageSize
        };
        return this.http.get(this.config.apiHost + "/organization/orgs", { params: params });
    };
    /**
     * @param {?=} page
     * @return {?}
     */
    WhistlerMerchantsService.prototype.getMerchants = /**
     * @param {?=} page
     * @return {?}
     */
    function (page) {
        var _this = this;
        if (page === void 0) { page = 1; }
        /** @type {?} */
        var pageSize = 10;
        return this.http.get(this.config.apiHost + "/organization/orgs", {
            params: {
                page_number: "" + page,
                page_size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.meta) {
                _this.historyMeta = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.historyMeta, res.meta);
            }
            return res.data;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) { return merchants.map((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return WhistlerMerchantsService.WMerchantToMerchant(res); })); })));
    };
    /**
     * @param {?} merchantId
     * @return {?}
     */
    WhistlerMerchantsService.prototype.getMerchant = /**
     * @param {?} merchantId
     * @return {?}
     */
    function (merchantId) {
        var _this = this;
        if (this.merchants[merchantId]) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.merchants[merchantId]);
        }
        return this.http.get(this.config.apiHost + "/organization/orgs/" + merchantId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return WhistlerMerchantsService.WMerchantToMerchant(res.data); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) { return _this.merchants[merchantId] = merchant; })));
    };
    WhistlerMerchantsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerMerchantsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerMerchantsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerMerchantsService_Factory() { return new WhistlerMerchantsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerMerchantsService, providedIn: "root" });
    return WhistlerMerchantsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4GetMerchantsResponse() { }
if (false) {}
/**
 * @record
 */
function IV4GetMerchantResponse() { }
if (false) {}
/**
 * @record
 */
function IV4Merchant() { }
if (false) {}
/**
 * @record
 */
function IV4Outlet() { }
if (false) {}
var V4MerchantsService = /** @class */ (function () {
    function V4MerchantsService(http, config) {
        this.http = http;
        this.config = config;
        this.merchants = {};
        this.merchantsWithoutId = [];
    }
    /**
     * @param {?} outlets
     * @return {?}
     */
    V4MerchantsService.v4OutletsToOutlets = /**
     * @param {?} outlets
     * @return {?}
     */
    function (outlets) {
        if (!outlets) {
            console.log('Data to map outlet is not valid');
            return null;
        }
        return outlets.map((/**
         * @param {?} outlet
         * @return {?}
         */
        function (outlet) { return ({
            outletId: outlet.outlet_id,
            outletName: outlet.outlet_name,
            outletAddress1: outlet.outlet_address1,
            outletAddress2: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(outlet).outlet_address2(),
            outletAddress3: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(outlet).outlet_address3(),
            postalCode: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(outlet).postal_code(),
            tel: outlet.tel,
            coordinates: outlet.coordinates,
            tags: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(outlet).tags()
        }); }));
    };
    /**
     * @return {?}
     */
    V4MerchantsService.prototype.getAllMerchants = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]((/**
         * @param {?} subject
         * @return {?}
         */
        function (subject) {
            /** @type {?} */
            var current = [];
            /** @type {?} */
            var pageSize = 25;
            /** @type {?} */
            var page = 1;
            // we do not want to get all pages in parallel, so we get pages one after the other in order not to ddos the server
            /** @type {?} */
            var process = (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                current = current.concat(res);
                subject.next(current);
                // if finished close the stream
                if (res.length < pageSize) {
                    subject.complete();
                }
                else {
                    // otherwise get next page
                    page++;
                    _this.getMerchants(page, false)
                        .subscribe(process);
                }
            });
            // do the first query
            _this.getMerchants(1, false)
                .subscribe(process);
        }));
    };
    /**
     * @param {?=} page
     * @param {?=} useCache
     * @return {?}
     */
    V4MerchantsService.prototype.getMerchants = /**
     * @param {?=} page
     * @param {?=} useCache
     * @return {?}
     */
    function (page, useCache) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (useCache === void 0) { useCache = true; }
        if (useCache && this.merchantsWithoutId.length > 0) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.merchantsWithoutId.map((/**
             * @param {?} merchant
             * @return {?}
             */
            function (merchant) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, merchant, { outlets: V4MerchantsService.v4OutletsToOutlets(merchant.outlets) })); })));
        }
        return this.http.get(this.config.apiHost + "/v4/merchants", {
            params: {
                page: "" + page
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            _this.merchantsWithoutId = res.data;
            return res.data;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) { return merchants.map((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, merchant, { outlets: V4MerchantsService.v4OutletsToOutlets(merchant.outlets) })); })); })));
    };
    /**
     * @param {?} merchantId
     * @param {?=} useCache
     * @param {?=} page
     * @return {?}
     */
    V4MerchantsService.prototype.getMerchant = /**
     * @param {?} merchantId
     * @param {?=} useCache
     * @param {?=} page
     * @return {?}
     */
    function (merchantId, useCache, page) {
        var _this = this;
        if (useCache === undefined) {
            useCache = true;
        }
        page = page || 1;
        if (useCache && this.merchants[merchantId] && this.merchants[merchantId][page]) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.merchants[merchantId][page]);
        }
        return this.http.get(this.config.apiHost + "/v4/merchants/" + merchantId + "?page=" + page)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) { return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, merchant, { outlets: V4MerchantsService.v4OutletsToOutlets(merchant.outlets) })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) {
            if (!_this.merchants[merchantId]) {
                _this.merchants[merchantId] = {};
            }
            //  make sure that page is a number
            page = page || 1;
            _this.merchants[merchant.id][page] = merchant;
        })));
    };
    V4MerchantsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4MerchantsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4MerchantsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4MerchantsService_Factory() { return new V4MerchantsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4MerchantsService, providedIn: "root" });
    return V4MerchantsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
IMerchantsService = /** @class */ (function () {
    function IMerchantsService() {
    }
    return IMerchantsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function merchantsServiceFactory(http, config) {
    if (config.isWhistler) {
        return new WhistlerMerchantsService(http, config);
    }
    // Make decision on what to instantiate base on config
    return new V4MerchantsService(http, config);
}
var MerchantsModule = /** @class */ (function () {
    function MerchantsModule() {
    }
    MerchantsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    providers: [
                        {
                            provide: IMerchantsService,
                            useFactory: merchantsServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config]
                        }
                    ]
                },] }
    ];
    return MerchantsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerMerchantAdminService = /** @class */ (function () {
    function WhistlerMerchantAdminService() {
    }
    /**
     * @param {?} userId
     * @param {?} merchantUsername
     * @param {?} amount
     * @param {?} currency
     * @param {?} type
     * @param {?} reference
     * @param {?} pharmacy
     * @param {?} productName
     * @return {?}
     */
    WhistlerMerchantAdminService.prototype.createTransaction = /**
     * @param {?} userId
     * @param {?} merchantUsername
     * @param {?} amount
     * @param {?} currency
     * @param {?} type
     * @param {?} reference
     * @param {?} pharmacy
     * @param {?} productName
     * @return {?}
     */
    function (
    // @ts-ignore
    userId, 
    // @ts-ignore
    merchantUsername, 
    // @ts-ignore
    amount, 
    // @ts-ignore
    currency, 
    // @ts-ignore
    type, 
    // @ts-ignore
    reference, 
    // @ts-ignore
    pharmacy, 
    // @ts-ignore
    productName) {
        throw new Error("createTransaction Method not implemented.");
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerMerchantAdminService.prototype.redeemVoucher = 
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        throw new Error("redeemVoucher Method not implemented.");
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @param {?} userId
     * @return {?}
     */
    WhistlerMerchantAdminService.prototype.issueVoucher = 
    // @ts-ignore
    /**
     * @param {?} id
     * @param {?} userId
     * @return {?}
     */
    function (id, userId) {
        throw new Error("issueVoucher Method not implemented.");
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} token
     * @param {?} clientId
     * @return {?}
     */
    WhistlerMerchantAdminService.prototype.validateInvite = 
    // @ts-ignore
    /**
     * @param {?} token
     * @param {?} clientId
     * @return {?}
     */
    function (token, clientId) {
        throw new Error("validateInvite Method not implemented.");
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} token
     * @param {?} clientId
     * @param {?} password
     * @return {?}
     */
    WhistlerMerchantAdminService.prototype.setupNewMerchantsPassword = 
    // @ts-ignore
    /**
     * @param {?} token
     * @param {?} clientId
     * @param {?} password
     * @return {?}
     */
    function (token, clientId, password) {
        throw new Error("setupNewMerchantsPassword Method not implemented.");
    };
    /**
     * @return {?}
     */
    WhistlerMerchantAdminService.prototype.getMerchantProfile = /**
     * @return {?}
     */
    function () {
        throw new Error("getMerchantProfile Method not implemented.");
    };
    WhistlerMerchantAdminService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ WhistlerMerchantAdminService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerMerchantAdminService_Factory() { return new WhistlerMerchantAdminService(); }, token: WhistlerMerchantAdminService, providedIn: "root" });
    return WhistlerMerchantAdminService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4MerchantAdminTransaction() { }
if (false) {}
/**
 * @record
 */
function IV4CreateTransactionResponse() { }
if (false) {}
/**
 * @record
 */
function IV4MerchantAdminVoucher() { }
if (false) {}
/**
 * @record
 */
function IV4RedeemVoucherResponse() { }
if (false) {}
/**
 * @record
 */
function IV4MerchantUserInvitationResponse() { }
if (false) {}
/**
 * @record
 */
function IV4MerchantAccount() { }
if (false) {}
/**
 * @record
 */
function IV4MerchantTag() { }
if (false) {}
/**
 * @record
 */
function IV4MerchantProfile() { }
if (false) {}
var V4MerchantAdminService = /** @class */ (function () {
    function V4MerchantAdminService(http, config) {
        this.http = http;
        this.config = config;
    }
    /**
     * @param {?} transaction
     * @return {?}
     */
    V4MerchantAdminService.v4TransactionToTransaction = /**
     * @param {?} transaction
     * @return {?}
     */
    function (transaction) {
        return {
            id: transaction.id,
            userAccountId: transaction.user_account_id,
            updatedAt: new Date(transaction.updated_at),
            transactionType: transaction.transaction_type,
            amount: transaction.amount,
            transactionDate: new Date(transaction.transaction_date),
            currency: transaction.currency,
            workflowId: transaction.workflow_id,
            createdAt: new Date(transaction.created_at),
            properties: transaction.properties,
            transactionReference: transaction.transaction_reference
        };
    };
    /**
     * @param {?} v
     * @return {?}
     */
    V4MerchantAdminService.v4VoucherToVoucher = /**
     * @param {?} v
     * @return {?}
     */
    function (v) {
        /** @type {?} */
        var reward = v.reward;
        return {
            id: v.id,
            reward: reward ? V4RewardsService.v4RewardToReward(reward) : null,
            state: v.state,
            code: v.voucher_code,
            expiry: (reward && reward.valid_to !== null) ? new Date(reward.valid_to) : null,
            redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
        };
    };
    /**
     * @param {?} profile
     * @return {?}
     */
    V4MerchantAdminService.v4MerchantProfileToMerchantProfile = /**
     * @param {?} profile
     * @return {?}
     */
    function (profile) {
        return {
            id: profile.id,
            email: profile.email,
            username: profile.username,
            mobile: profile.mobile,
            locationId: profile.location_id,
            merchantAccountId: profile.merchant_account_id,
            merchantAccount: ((/** @type {?} */ ((/** @type {?} */ (profile.merchant_account))))),
            createdAt: new Date(profile.created_at),
            updatedAt: new Date(profile.updated_at),
            state: profile.state
        };
    };
    /**
     * @param {?} userId
     * @param {?} merchantUsername
     * @param {?} amount
     * @param {?} currency
     * @param {?} type
     * @param {?} reference
     * @param {?} pharmacy
     * @param {?} productName
     * @return {?}
     */
    V4MerchantAdminService.prototype.createTransaction = /**
     * @param {?} userId
     * @param {?} merchantUsername
     * @param {?} amount
     * @param {?} currency
     * @param {?} type
     * @param {?} reference
     * @param {?} pharmacy
     * @param {?} productName
     * @return {?}
     */
    function (userId, merchantUsername, amount, currency, type, reference, pharmacy, productName) {
        /** @type {?} */
        var url = this.config.apiHost + "/v4/merchant_admin/transactions";
        /** @type {?} */
        var body = {
            user_account_id: userId,
            transaction_data: {
                transaction_type: type,
                transaction_reference: reference,
                amount: amount,
                currency: currency,
                properties: {
                    merchant_username: merchantUsername,
                    pharmacy: pharmacy,
                    product: productName
                }
            }
        };
        return this.http.post(url, body).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4MerchantAdminService.v4TransactionToTransaction(res.data); })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    V4MerchantAdminService.prototype.redeemVoucher = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        /** @type {?} */
        var url = this.config.apiHost + "/v4/merchant_admin/vouchers/" + id + "/redeem";
        return this.http.put(url, null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4MerchantAdminService.v4VoucherToVoucher(res.data); })));
    };
    /**
     * @param {?} id
     * @param {?=} userId
     * @return {?}
     */
    V4MerchantAdminService.prototype.issueVoucher = /**
     * @param {?} id
     * @param {?=} userId
     * @return {?}
     */
    function (id, userId) {
        if (userId === void 0) { userId = ''; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('user-id', userId);
        /** @type {?} */
        var url = this.config.apiHost + "/v4/merchant_admin/rewards/" + id + "/issue";
        return this.http.post(url, null, { headers: headers }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4MerchantAdminService.v4VoucherToVoucher(res.data); })));
    };
    /**
     * @param {?} token
     * @param {?} clientId
     * @return {?}
     */
    V4MerchantAdminService.prototype.validateInvite = /**
     * @param {?} token
     * @param {?} clientId
     * @return {?}
     */
    function (token, clientId) {
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]()
            .set('invitation_token', token)
            .set('client_id', clientId);
        /** @type {?} */
        var url = this.config.apiHost + "/v4/merchant_user_account_invitations/accept";
        return this.http.get(url, { params: params }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4MerchantAdminService.v4MerchantProfileToMerchantProfile(res.data); })));
    };
    /**
     * @param {?} token
     * @param {?} clientId
     * @param {?} password
     * @return {?}
     */
    V4MerchantAdminService.prototype.setupNewMerchantsPassword = /**
     * @param {?} token
     * @param {?} clientId
     * @param {?} password
     * @return {?}
     */
    function (token, clientId, password) {
        /** @type {?} */
        var body = {
            invitation_token: token,
            client_id: clientId,
            password: password,
            password_confirmation: password,
        };
        /** @type {?} */
        var url = this.config.apiHost + "/v4/merchant_user_account_invitations";
        return this.http.put(url, body).pipe(
        // response is always HTTP 200 in this format regardless if it is a error or success and backend should resolve this
        // @ts-ignore
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.message; })));
    };
    /**
     * @return {?}
     */
    V4MerchantAdminService.prototype.getMerchantProfile = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var url = this.config.apiHost + "/v4/merchant_admin/me";
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4MerchantAdminService.v4MerchantProfileToMerchantProfile(res.data); })));
    };
    V4MerchantAdminService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4MerchantAdminService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4MerchantAdminService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4MerchantAdminService_Factory() { return new V4MerchantAdminService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4MerchantAdminService, providedIn: "root" });
    return V4MerchantAdminService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
IMerchantAdminService = /** @class */ (function () {
    function IMerchantAdminService() {
    }
    return IMerchantAdminService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function merchantAdminServiceFactory(http, config) {
    if (config.isWhistler) {
        return new WhistlerMerchantAdminService();
    }
    // Make decision on what to instantiate base on config
    return new V4MerchantAdminService(http, config);
}
var MerchantAdminModule = /** @class */ (function () {
    function MerchantAdminModule() {
    }
    MerchantAdminModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    providers: [
                        {
                            provide: IMerchantAdminService,
                            useFactory: merchantAdminServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config]
                        }
                    ]
                },] }
    ];
    return MerchantAdminModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4Image$1() { }
if (false) {}
/**
 * @record
 */
function IV4Campaign() { }
if (false) {}
/**
 * @record
 */
function IV4CampaignResponse() { }
if (false) {}
/**
 * @record
 */
function IV4CampaignsResponse() { }
if (false) {}
var V4CampaignService = /** @class */ (function () {
    function V4CampaignService(http, config) {
        this.http = http;
        this.baseUrl = (/** @type {?} */ (config.apiHost));
    }
    /**
     * @param {?} campaign
     * @return {?}
     */
    V4CampaignService.v4CampaignToCampaign = /**
     * @param {?} campaign
     * @return {?}
     */
    function (campaign) {
        /** @type {?} */
        var thumbnail = campaign.images.find((/**
         * @param {?} image
         * @return {?}
         */
        function (image) { return ['catalog_thumbnail', 'campaign_thumbnail'].some((/**
         * @param {?} ty
         * @return {?}
         */
        function (ty) { return ty === image.type; })); }));
        /** @type {?} */
        var thumbnailUrl = thumbnail ? thumbnail.url : undefined;
        /** @type {?} */
        var rewards = campaign.rewards && campaign.rewards.map((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) { return V4RewardsService.v4RewardToReward(reward); }));
        return {
            id: campaign.id,
            name: campaign.name,
            description: campaign.description,
            type: campaign.campaign_type,
            state: campaign.state,
            endsAt: campaign.ends_at ? new Date(campaign.ends_at) : null,
            beginsAt: campaign.begins_at ? new Date(campaign.begins_at) : null,
            rewards: rewards,
            thumbnailUrl: thumbnailUrl,
        };
    };
    /**
     * @return {?}
     */
    V4CampaignService.prototype.getCampaigns = /**
     * @return {?}
     */
    function () {
        return this.http.get(this.baseUrl + "/v4/campaigns")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} campaigns
         * @return {?}
         */
        function (campaigns) { return campaigns.map((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) { return V4CampaignService.v4CampaignToCampaign(campaign); })); })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    V4CampaignService.prototype.getCampaign = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get(this.baseUrl + "/v4/campaigns/" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) { return V4CampaignService.v4CampaignToCampaign(campaign); })));
    };
    V4CampaignService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{ providedIn: 'root' },] }
    ];
    /** @nocollapse */
    V4CampaignService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4CampaignService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4CampaignService_Factory() { return new V4CampaignService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4CampaignService, providedIn: "root" });
    return V4CampaignService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var WhistlerCampaignType = {
    survey: 'survey',
    loyalty: 'stamp',
    instant_outcome: 'give_reward',
    game: 'game',
};
var WhistlerCampaignService = /** @class */ (function () {
    function WhistlerCampaignService(http, config) {
        this.http = http;
        this.pagesCache = {};
        this.baseUrl = (/** @type {?} */ (config.apiHost));
    }
    /**
     * @private
     * @param {?} ty
     * @return {?}
     */
    WhistlerCampaignService.WhistlerTypeToType = /**
     * @private
     * @param {?} ty
     * @return {?}
     */
    function (ty) {
        return WhistlerCampaignType[ty];
    };
    /**
     * @param {?} campaign
     * @return {?}
     */
    WhistlerCampaignService.WhistlerCampaignToCampaign = /**
     * @param {?} campaign
     * @return {?}
     */
    function (campaign) {
        /** @type {?} */
        var cAttributes = campaign.attributes;
        return {
            id: Number.parseInt(campaign.id, 10),
            name: cAttributes.name,
            description: cAttributes.goal || null,
            type: WhistlerCampaignService.WhistlerTypeToType(cAttributes.engagement_type),
            state: (/** @type {?} */ (cAttributes.status)),
            endsAt: cAttributes.end_date_time ? new Date(cAttributes.end_date_time) : null,
            engagementId: cAttributes.engagement_id,
            rawPayload: cAttributes,
            displayProperties: cAttributes.display_properties,
        };
    };
    /**
     * @private
     * @param {?} c
     * @param {?} ts
     * @return {?}
     */
    WhistlerCampaignService.startsAfter = /**
     * @private
     * @param {?} c
     * @param {?} ts
     * @return {?}
     */
    function (c, ts) {
        if (c.attributes.start_date_time === null) {
            return true;
        }
        /** @type {?} */
        var start = (new Date(c.attributes.start_date_time)).getTime();
        return start < ts;
    };
    /**
     * @private
     * @param {?} c
     * @param {?} ts
     * @return {?}
     */
    WhistlerCampaignService.expiresBefore = /**
     * @private
     * @param {?} c
     * @param {?} ts
     * @return {?}
     */
    function (c, ts) {
        if (!c.attributes.end_date_time || c.attributes.end_date_time === null) {
            return true;
        }
        /** @type {?} */
        var end = (new Date(c.attributes.end_date_time)).getTime();
        return end > ts;
    };
    /**
     * @return {?}
     */
    WhistlerCampaignService.prototype.getCampaigns = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]((/**
         * @param {?} subject
         * @return {?}
         */
        function (subject) {
            /** @type {?} */
            var current = [];
            /** @type {?} */
            var now = (new Date()).getTime();
            /** @type {?} */
            var process = (/**
             * @param {?} p
             * @param {?} cs
             * @return {?}
             */
            function (p, cs) {
                /** @type {?} */
                var campaigns = cs.data
                    // filter out by campaign date
                    .filter((/**
                 * @param {?} c
                 * @return {?}
                 */
                function (c) { return WhistlerCampaignService.startsAfter(c, now) && WhistlerCampaignService.expiresBefore(c, now); }))
                    .map(WhistlerCampaignService.WhistlerCampaignToCampaign);
                current = current.concat(campaigns);
                subject.next(current);
                if (!cs.meta || !cs.meta.page_count || p >= cs.meta.page_count) {
                    subject.complete();
                }
                else {
                    _this.getPage(p + 1).subscribe((/**
                     * @param {?} res
                     * @return {?}
                     */
                    function (res) { return process(p + 1, res); }));
                }
            });
            _this.getPage(1).subscribe((/**
             * @param {?} cs
             * @return {?}
             */
            function (cs) { return process(1, cs); }));
        }));
    };
    /**
     * @private
     * @param {?} n
     * @return {?}
     */
    WhistlerCampaignService.prototype.getPage = /**
     * @private
     * @param {?} n
     * @return {?}
     */
    function (n) {
        var _this = this;
        if (this.pagesCache[n]) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.pagesCache[n]);
        }
        return this.http.get(this.baseUrl + "/campaign/entities?page[number]=" + n)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} page
         * @return {?}
         */
        function (page) { return _this.pagesCache[n] = page; })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerCampaignService.prototype.getCampaign = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get(this.baseUrl + "/campaign/entities/" + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} campaigns
         * @return {?}
         */
        function (campaigns) { return campaigns.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) { return WhistlerCampaignService.WhistlerCampaignToCampaign(campaign); })));
    };
    WhistlerCampaignService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerCampaignService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerCampaignService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerCampaignService_Factory() { return new WhistlerCampaignService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerCampaignService, providedIn: "root" });
    return WhistlerCampaignService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function campaignServiceFactory(http, config) {
    if (config.isWhistler) {
        return new WhistlerCampaignService(http, config);
    }
    // Make decision on what to instantiate base on config
    return new V4CampaignService(http, config);
}
var CampaignModule = /** @class */ (function () {
    function CampaignModule() {
    }
    CampaignModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    providers: [
                        {
                            provide: ICampaignService,
                            useFactory: campaignServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config]
                        }
                    ],
                    exports: []
                },] }
    ];
    return CampaignModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var CampaignType = {
    // eslint-disable-next-line
    give_reward: 'give_reward',
    stamp: 'stamp',
    game: 'game',
    survey: 'survey',
};
/** @enum {string} */
var CampaignState = {
    active: 'active',
    inactive: 'inactive',
    draft: 'draft',
};
/**
 * @record
 */
function ICampaign() { }
if (false) {}
/** @enum {string} */
var CommChannel = {
    sms: 'sms',
    email: 'email',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4GetStampCardResponse() { }
if (false) {}
/**
 * @record
 */
function IV4GetStampCardsResponse() { }
if (false) {}
/**
 * @record
 */
function IV4Stamp() { }
if (false) {}
/**
 * @record
 */
function IV4GetStampTransactionsResponse() { }
if (false) {}
/**
 * @record
 */
function IV4PutStampTransactionResponse() { }
if (false) {}
/**
 * @record
 */
function IV4StampAllTransactionResponse() { }
if (false) {}
/**
 * @record
 */
function IV4Reward$1() { }
if (false) {}
/**
 * @record
 */
function IV4StampCard() { }
if (false) {}
// tslint:disable-next-line:max-line-length
// https://github.com/markwhitfeld/store/blob/15101c2a03624730366df1fd634b6bf6047d2e37/docs/concepts/select.md#angular-libraries-use-of-lambdas-in-static-functions
// @dynamic
var V4StampService = /** @class */ (function () {
    function V4StampService(http, config, vouchersService) {
        this.http = http;
        this.vouchersService = vouchersService;
        this.baseUrl = (/** @type {?} */ (config.apiHost));
    }
    /**
     * @private
     * @param {?} stamp
     * @return {?}
     */
    V4StampService.v4StampToStamp = /**
     * @private
     * @param {?} stamp
     * @return {?}
     */
    function (stamp) {
        return {
            id: stamp.id,
            userAccountId: stamp.user_account_id,
            stampCardId: stamp.stamp_card_id,
            state: stamp.state,
            createdAt: stamp.created_at,
            updatedAt: stamp.updated_at,
            campaignId: stamp.campaign_id,
            vouchers: stamp.vouchers,
        };
    };
    /**
     * @private
     * @param {?} reward
     * @return {?}
     */
    V4StampService.v4RewardToReward = /**
     * @private
     * @param {?} reward
     * @return {?}
     */
    function (reward) {
        return {
            id: reward.id,
            campaignId: reward.campaign_id,
            modularizableType: reward.modularizable_type,
            modularizableId: reward.modularizable_id,
            createdAt: reward.created_at,
            updatedAt: reward.updated_at,
            refereeRequiredForReward: reward.referee_required_for_reward,
            totalRewardLimit: reward.total_reward_limit,
            totalUserLimit: reward.total_user_limit,
            awardToTeferral: reward.award_to_referral,
            awardToReferee: reward.award_to_referee,
            totalReferreeLimit: reward.total_referree_limit,
            stampNumber: reward.stamp_number,
        };
    };
    /**
     * @private
     * @param {?} stampCard
     * @return {?}
     */
    V4StampService.v4StampCardToStampCard = /**
     * @private
     * @param {?} stampCard
     * @return {?}
     */
    function (stampCard) {
        /** @type {?} */
        var cardImageUrl = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard).display_properties.card_image.value.image_url();
        /** @type {?} */
        var cardImage = cardImageUrl ? { value: { imageUrl: cardImageUrl } } : undefined;
        /** @type {?} */
        var backgroundImgUrl = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard).display_properties.background_img.value.image_url();
        /** @type {?} */
        var backgroundImg = backgroundImgUrl ? { value: { imageUrl: backgroundImgUrl } } : undefined;
        return {
            id: stampCard.id,
            userAccountId: stampCard.user_account_id,
            state: stampCard.state,
            campaignId: stampCard.campaign_id,
            cardNumber: stampCard.card_number,
            campaignConfig: {
                totalSlots: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard).campaign_config.total_slots(0),
                rewards: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard).campaign_config.rewards([])
                    .map((/**
                 * @param {?} rewards
                 * @return {?}
                 */
                function (rewards) { return V4StampService.v4RewardToReward(rewards); })),
            },
            displayProperties: {
                numberOfCols: stampCard.display_properties.number_of_cols,
                numberOfRows: stampCard.display_properties.number_of_rows,
                cardImage: cardImage,
                totalSlots: stampCard.display_properties.total_slots,
                displayCampaignAs: stampCard.display_properties.display_campaign_as,
                backgroundImg: backgroundImg,
                rewardPositions: stampCard.display_properties.reward_positions,
                thumbnailImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard).display_properties.thumbnail_img.value.image_url()
            },
            stamps: stampCard.stamps ? stampCard.stamps.map((/**
             * @param {?} stamp
             * @return {?}
             */
            function (stamp) { return V4StampService.v4StampToStamp(stamp); })) : undefined
        };
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    V4StampService.prototype.getCards = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        if (!campaignId) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Invalid campaign Id');
        }
        return this.http.get(this.baseUrl + "/v4/campaigns/" + campaignId + "/stamp_cards", { params: { size: '100' } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} stampCards
         * @return {?}
         */
        function (stampCards) { return stampCards.map((/**
         * @param {?} stampCard
         * @return {?}
         */
        function (stampCard) { return V4StampService.v4StampCardToStampCard(stampCard); })); })));
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    V4StampService.prototype.getCurrentCard = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        return this.http.get(this.baseUrl + "/v4/campaigns/" + campaignId + "/stamp_cards/current").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4StampService.v4StampCardToStampCard(res.data); })));
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    V4StampService.prototype.getStamps = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        var _this = this;
        return this.http.get(this.baseUrl + "/v4/campaigns/" + campaignId + "/stamp_transactions", { params: { size: '100' } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["flatMap"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(resp.data.map((/**
                 * @param {?} stamp
                 * @return {?}
                 */
                function (stamp) { return V4StampService.v4StampToStamp(stamp); })))
            ];
            for (var i = 2; i <= resp.meta.total_pages; i++) {
                /** @type {?} */
                var stream = _this.getAllFromPage(campaignId, i);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} stamps
         * @return {?}
         */
        function (stamps) { return stamps.sort((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.id - v2.id; })); })));
    };
    /**
     * @private
     * @param {?} campaignId
     * @param {?} page
     * @return {?}
     */
    V4StampService.prototype.getAllFromPage = /**
     * @private
     * @param {?} campaignId
     * @param {?} page
     * @return {?}
     */
    function (campaignId, page) {
        return this.http.get(this.baseUrl + "/v4/campaigns/" + campaignId + "/stamp_transactions", {
            params: {
                page: "" + page,
                size: '100'
            }
        })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} stamps
         * @return {?}
         */
        function (stamps) { return stamps.map((/**
         * @param {?} stamp
         * @return {?}
         */
        function (stamp) { return V4StampService.v4StampToStamp(stamp); })); })));
    };
    /**
     * @param {?} stampId
     * @param {?=} sourceType
     * @return {?}
     */
    V4StampService.prototype.putStamp = /**
     * @param {?} stampId
     * @param {?=} sourceType
     * @return {?}
     */
    function (stampId, sourceType) {
        var _this = this;
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpParams"]();
        if (sourceType) {
            params = params.set('source_type', sourceType);
        }
        return this.http.put(this.baseUrl + "/v4/stamp_transactions/" + stampId, sourceType ? params : null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.data.vouchers && res.data.vouchers.length > 0) {
                _this.vouchersService.reset();
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4StampService.v4StampToStamp(res.data); })));
    };
    /**
     * @param {?} cardId
     * @return {?}
     */
    V4StampService.prototype.stampAll = /**
     * @param {?} cardId
     * @return {?}
     */
    function (cardId) {
        var _this = this;
        return this.http.post(this.baseUrl + "/v4/stamp_cards/" + cardId + "/redeem_all_stamps", null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data.stamps; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
         * @param {?} stamps
         * @return {?}
         */
        function (stamps) { return stamps !== undefined; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} stamps
         * @return {?}
         */
        function (stamps) {
            if (stamps.some((/**
             * @param {?} s
             * @return {?}
             */
            function (s) { return s.vouchers !== undefined && s.vouchers.length > 0; }))) {
                _this.vouchersService.reset();
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} stamps
         * @return {?}
         */
        function (stamps) { return stamps.map((/**
         * @param {?} stamp
         * @return {?}
         */
        function (stamp) { return V4StampService.v4StampToStamp(stamp); })); })));
    };
    /**
     * @return {?}
     */
    V4StampService.prototype.play = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(true);
    };
    V4StampService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4StampService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config },
        { type: IVoucherService }
    ]; };
    /** @nocollapse */ V4StampService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4StampService_Factory() { return new V4StampService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(IVoucherService)); }, token: V4StampService, providedIn: "root" });
    return V4StampService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerStampService = /** @class */ (function () {
    function WhistlerStampService(http, config) {
        this.http = http;
        this.cache = {};
        this.baseUrl = "" + config.apiHost;
    }
    /**
     * @private
     * @param {?} stampCard
     * @return {?}
     */
    WhistlerStampService.WStampCardToStampCard = /**
     * @private
     * @param {?} stampCard
     * @return {?}
     */
    function (stampCard) {
        /** @type {?} */
        var attributesObj = (/** @type {?} */ (stampCard.attributes));
        return {
            title: attributesObj.display_properties.title,
            subTitle: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(attributesObj).display_properties.sub_title(),
            buttonText: attributesObj.display_properties.button,
            id: +stampCard.id,
            state: StampCardState.active,
            campaignConfig: {
                totalSlots: attributesObj.display_properties.nb_of_slots,
                collectionRewards: attributesObj.display_properties.slots.map((/**
                 * @param {?} position
                 * @return {?}
                 */
                function (position) { return ({ rewardPosition: position - 1 }); }))
            },
            displayProperties: {
                preStampImg: attributesObj.display_properties.pre_stamp_img_url,
                postStampImg: attributesObj.display_properties.post_stamp_img_url,
                rewardPreStamp: attributesObj.display_properties.reward_pre_stamp_img_url,
                rewardPostStamp: attributesObj.display_properties.reward_post_stamp_img_url,
                bgImage: attributesObj.display_properties.background_img_url,
                cardBgImage: attributesObj.display_properties.card_background_img_url,
                displayCampaignAs: attributesObj.display_properties.display_campaign_as,
            }
        };
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    WhistlerStampService.prototype.getCards = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        return this.getCurrentCard(campaignId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} card
         * @return {?}
         */
        function (card) { return [card]; })));
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    WhistlerStampService.prototype.getCurrentCard = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        var _this = this;
        /** @type {?} */
        var disProp;
        if (this.cache[campaignId]) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.cache[campaignId]);
        }
        return this.http.get(this.baseUrl + "/campaign/entities/" + campaignId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data.attributes; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} correctEntityAttribute
         * @return {?}
         */
        function (correctEntityAttribute) {
            disProp = correctEntityAttribute.display_properties;
            return _this.http.get(_this.baseUrl + "/loyalty/engagements/" + correctEntityAttribute.engagement_id);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var stampData = WhistlerStampService.WStampCardToStampCard(res.data);
            return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, stampData, { campaignId: campaignId, displayProperties: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, stampData.displayProperties, disProp) });
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} sc
         * @return {?}
         */
        function (sc) { return _this.cache[campaignId] = sc; })));
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    WhistlerStampService.prototype.getStamps = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        throw new Error("Method not implemented. " + campaignId);
    };
    /**
     * @param {?} stampId
     * @return {?}
     */
    WhistlerStampService.prototype.putStamp = /**
     * @param {?} stampId
     * @return {?}
     */
    function (stampId) {
        throw new Error("Method not implemented. " + stampId);
    };
    /**
     * @param {?} cardId
     * @return {?}
     */
    WhistlerStampService.prototype.stampAll = /**
     * @param {?} cardId
     * @return {?}
     */
    function (cardId) {
        throw new Error("Method not implemented. " + cardId);
    };
    /**
     * @return {?}
     */
    WhistlerStampService.prototype.play = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(true);
    };
    WhistlerStampService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerStampService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerStampService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerStampService_Factory() { return new WhistlerStampService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerStampService, providedIn: "root" });
    return WhistlerStampService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} vouchersService
 * @return {?}
 */
function stampServiceFactory(http, config, vouchersService) {
    // Make decision on what to instantiate base on config
    if (config.isWhistler) {
        return new WhistlerStampService(http, config);
    }
    return new V4StampService(http, config, vouchersService);
}
var StampModule = /** @class */ (function () {
    function StampModule() {
    }
    StampModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    providers: [
                        {
                            provide: StampService,
                            useFactory: stampServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, IVoucherService]
                        }
                    ]
                },] }
    ];
    return StampModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var StampsCardsListComponent = /** @class */ (function () {
    function StampsCardsListComponent() {
        // mock it upstairs
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /**
     * @param {?} stampCard
     * @return {?}
     */
    StampsCardsListComponent.prototype.onClick = /**
     * @param {?} stampCard
     * @return {?}
     */
    function (stampCard) {
        // tslint:disable-next-line: deprecation
        this.tapped.emit(stampCard);
    };
    StampsCardsListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-stamps-cards-list',
                    template: "<div class=\"card-list-container\">\n  <mat-card\n    *ngFor=\"let stampCard of stampCardsArr | async\"\n    mat-ripple\n    (click)=\"onClick(stampCard)\"\n  >\n    <div class=\"stamp-content\">\n      <div class=\"stamp-img__wrapper\">\n        <img src=\"{{ stampCard.displayProperties.cardBgImage }}\" alt=\"stampimg\" />\n      </div>\n      <div class=\"stamp-details\">\n        <h1>\n          {{ stampCard.title }}\n        </h1>\n        <p *ngIf=\"stampCard.subTitle\">\n          {{ stampCard.subTitle }}\n        </p>\n      </div>\n    </div>\n  </mat-card>\n</div>\n",
                    styles: ["mat-card{margin:1.2rem 0;display:-webkit-box;display:flex;padding:0 1.3rem 1.3rem;height:10.5rem;-webkit-box-pack:justify;justify-content:space-between}.stamp-details{padding:0 1.6rem;font-size:1.4rem;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:start;justify-content:flex-start;margin:auto 0}.stamp-details h1{font-size:1.4rem;color:#37474f;line-height:1.6rem;font-weight:500;margin:2px 0;padding:0}.stamp-details p{font-size:1.1rem;line-height:1.3rem;color:#858585;margin:2px 0;padding:0}.stamp-details:nth-child(1){margin-top:0}.stamp-content{width:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.stamp-content .stamp-img__wrapper{display:-webkit-box;display:flex;width:100%;height:4rem;-webkit-box-flex:2;flex:2 2;align-self:flex-start;margin:0 auto;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.stamp-content .stamp-img__wrapper img{-ms-grid-row-align:unsafe center;align-self:unsafe center;width:100%;height:100%;-o-object-fit:cover;object-fit:cover;-webkit-box-flex:1;flex:1}.stamp-content .stamp-details{width:100%;display:-webkit-box;display:flex;align-self:center;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1 1}"]
                }] }
    ];
    StampsCardsListComponent.propDecorators = {
        stampCardsArr: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['data',] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return StampsCardsListComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {?} */
var GameType = {
    unknown: -1,
    shakeTheTree: 'shake',
    pinata: 'tap',
    scratch: 'scratch',
    spin: 'spin',
};
GameType[GameType.unknown] = 'unknown';
/**
 * @record
 */
function IEngagementTransaction() { }
if (false) {}
/**
 * @record
 */
function IGameOutcome() { }
if (false) {}
/**
 * @record
 */
function IGame() { }
if (false) {}
/**
 * @return {?}
 */
function defaultTree() {
    return {
        nbHangedGift: 6,
        nbGiftsToDrop: 6,
        nbTaps: 5,
        treeImg: '',
        giftImg: ''
    };
}
/**
 * @return {?}
 */
function defaultPinata() {
    return {
        stillImg: '',
        brokenImg: '',
        nbTaps: 5
    };
}
/**
 * @return {?}
 */
function defaultScratch() {
    return {
        coverImg: '',
        underlyingFailImg: '',
        underlyingSuccessImg: '',
        uncoverPortionToTrigger: 90,
        nbTaps: 5
    };
}
/**
 * @return {?}
 */
function defaultSpin() {
    return {
        numberOfWedges: 5,
        rewardSlots: [2, 4],
        colorCtrls: {
            0: 'red',
            1: 'yellow',
            2: 'green',
            3: 'blue',
            4: 'black'
        },
        rewardIcon: '',
        wheelImg: '',
        wheelPosition: '',
        pointerImg: '',
        background: ''
    };
}
/**
 * @record
 */
function ISpin() { }
if (false) {}
/**
 * @record
 */
function ITree() { }
if (false) {}
/**
 * @record
 */
function IPinata() { }
if (false) {}
/**
 * @record
 */
function IScratch() { }
if (false) {}
/**
 * @record
 */
function IPlayOutcome() { }
if (false) {}
/**
 * @record
 */
function ISlice() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var GameType$1 = {
    shakeTheTree: 'shake_the_tree',
    pinata: 'hit_the_pinata',
};
/**
 * @record
 */
function Asset() { }
if (false) {}
/**
 * @record
 */
function Outcome() { }
if (false) {}
/**
 * @record
 */
function GameProperties() { }
if (false) {}
/**
 * @record
 */
function TreeDisplayProperties() { }
if (false) {}
/**
 * @record
 */
function PinataDisplayProperties() { }
if (false) {}
/**
 * @record
 */
function Game() { }
if (false) {}
/**
 * @record
 */
function GamesResponse() { }
if (false) {}
/**
 * @record
 */
function GameResponse() { }
if (false) {}
/**
 * @record
 */
function IV4PlayResponse() { }
if (false) {}
var V4GameService = /** @class */ (function () {
    function V4GameService(httpClient, config) {
        this.httpClient = httpClient;
        this.hostName = (/** @type {?} */ (config.apiHost));
    }
    /**
     * @private
     * @param {?} game
     * @return {?}
     */
    V4GameService.v4GameToGame = /**
     * @private
     * @param {?} game
     * @return {?}
     */
    function (game) {
        /** @type {?} */
        var type = GameType.unknown;
        /** @type {?} */
        var config;
        if (game.game_type === "shake_the_tree" /* shakeTheTree */) {
            type = GameType.shakeTheTree;
            /** @type {?} */
            var dpts = (/** @type {?} */ (game.display_properties));
            /** @type {?} */
            var defaultTr = defaultTree();
            config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultTr, { treeImg: dpts.tree_image.value.image_url || dpts.tree_image.value.file, giftImg: dpts.gift_image.value.image_url || dpts.gift_image.value.file, nbHangedGift: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).number_of_gifts_shown(defaultTr.nbHangedGift), nbGiftsToDrop: dpts.number_of_gifts_to_drop, nbTaps: dpts.number_of_taps || 5, waitingAccessoryImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).waiting_image.value.image_url() || Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).waiting_image.value.file(), celebratingAccessoryImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).celebrating_image.value.image_url() || Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).celebrating_image.value.file() });
        }
        else if (game.game_type === "hit_the_pinata" /* pinata */) {
            type = GameType.pinata;
            /** @type {?} */
            var dpps = (/** @type {?} */ (game.display_properties));
            config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultPinata(), { stillImg: dpps.still_image.value.image_url || dpps.still_image.value.file, brokenImg: dpps.opened_image.value.image_url || dpps.opened_image.value.file, breakingImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpps).cracking_image.value.image_url() || Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpps).cracking_image.value.file(), nbTaps: dpps.number_of_taps || 5 });
        }
        else {
            throw new Error(game.game_type + " is not mapped yet");
        }
        /** @type {?} */
        var texts = {};
        if (game.display_properties.header) {
            texts.title = game.display_properties.header.value.title;
            texts.subTitle = game.display_properties.header.value.description;
        }
        if (game.display_properties.play_button_text) {
            texts.button = game.display_properties.play_button_text;
        }
        /** @type {?} */
        var results = {};
        if (game.display_properties.outcome) {
            results.outcome = V4GameService.outcomeToGameOutcome(game.display_properties.outcome);
        }
        if (game.display_properties.nooutcome) {
            results.noOutcome = V4GameService.outcomeToGameOutcome(game.display_properties.nooutcome);
        }
        return {
            id: game.id,
            campaignId: game.campaign_id,
            type: type,
            backgroundImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(game).display_properties.background_image.value.image_url() ||
                Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(game).display_properties.background_image.value.file(),
            remainingNumberOfTries: game.number_of_tries,
            config: config,
            texts: texts,
            results: results
        };
    };
    /**
     * @private
     * @param {?} outcome
     * @return {?}
     */
    V4GameService.outcomeToGameOutcome = /**
     * @private
     * @param {?} outcome
     * @return {?}
     */
    function (outcome) {
        /** @type {?} */
        var res = {
            title: outcome.title,
            subTitle: outcome.description,
            button: outcome.button_text
        };
        if (outcome.type === 'image') {
            res.image = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(outcome).value.image_url() || Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(outcome).value.file();
        }
        return res;
    };
    /**
     * @param {?} gameId
     * @return {?}
     */
    V4GameService.prototype.play = /**
     * @param {?} gameId
     * @return {?}
     */
    function (gameId) {
        return this.httpClient.put(this.hostName + "/v4/games/" + gameId + "/play", null)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            // @ts-ignore
            /** @type {?} */
            var vs = res.data.outcomes.filter((/**
             * @param {?} out
             * @return {?}
             */
            function (out) { return out.outcome_type === 'reward'; }));
            return {
                vouchers: vs.map((/**
                 * @param {?} v
                 * @return {?}
                 */
                function (v) { return V4VouchersService.v4VoucherToVoucher(v); })),
                rawPayload: res
            };
        })));
    };
    /**
     * @param {?} gameId
     * @return {?}
     */
    V4GameService.prototype.get = /**
     * @param {?} gameId
     * @return {?}
     */
    function (gameId) {
        return this.httpClient.get(this.hostName + "/v4/games/" + gameId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} game
         * @return {?}
         */
        function (game) { return V4GameService.v4GameToGame(game); })));
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    V4GameService.prototype.getGamesFromCampaign = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        return this.httpClient.get(this.hostName + "/v4/campaigns/" + campaignId + "/games")
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} games
         * @return {?}
         */
        function (games) { return games.map((/**
         * @param {?} game
         * @return {?}
         */
        function (game) { return V4GameService.v4GameToGame(game); })); })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} engagementId
     * @param {?=} campaignId
     * @return {?}
     */
    V4GameService.prototype.prePlay = 
    // @ts-ignore
    /**
     * @param {?} engagementId
     * @param {?=} campaignId
     * @return {?}
     */
    function (engagementId, campaignId) {
        throw new Error('Not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} transactionId
     * @return {?}
     */
    V4GameService.prototype.prePlayConfirm = 
    // @ts-ignore
    /**
     * @param {?} transactionId
     * @return {?}
     */
    function (transactionId) {
        throw new Error('Not implemented.');
    };
    V4GameService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4GameService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4GameService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4GameService_Factory() { return new V4GameService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4GameService, providedIn: "root" });
    return V4GameService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IShakeOptions() { }
if (false) {}
/**
 * From https://github.com/alexgibson/shake.js
 */
var Shake = /** @class */ (function () {
    function Shake(options) {
        // use date to prevent multiple shakes firing
        this.lastTime = new Date();
        // accelerometer values
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
        // feature detect
        this.hasDeviceMotion = 'ondevicemotion' in window;
        this.options = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, options, { threshold: 15, timeout: 1000 // default interval between events
         });
        // create custom event
        // @ts-ignore
        if (typeof document.CustomEvent === 'function') {
            // @ts-ignore
            this.event = new document.CustomEvent(Shake.EVENT, {
                bubbles: true,
                cancelable: true
            });
        }
        else if (typeof document.createEvent === 'function') {
            this.event = document.createEvent('Event');
            this.event.initEvent(Shake.EVENT, true, true);
        }
    }
    // reset timer values
    // reset timer values
    /**
     * @private
     * @return {?}
     */
    Shake.prototype.reset = 
    // reset timer values
    /**
     * @private
     * @return {?}
     */
    function () {
        this.lastTime = new Date();
        this.lastX = null;
        this.lastY = null;
        this.lastZ = null;
    };
    // start listening for devicemotion
    // start listening for devicemotion
    /**
     * @return {?}
     */
    Shake.prototype.start = 
    // start listening for devicemotion
    /**
     * @return {?}
     */
    function () {
        this.reset();
        if (this.hasDeviceMotion) {
            window.addEventListener('devicemotion', this, false);
        }
    };
    // stop listening for devicemotion
    // stop listening for devicemotion
    /**
     * @return {?}
     */
    Shake.prototype.stop = 
    // stop listening for devicemotion
    /**
     * @return {?}
     */
    function () {
        if (this.hasDeviceMotion) {
            window.removeEventListener('devicemotion', this, false);
        }
        this.reset();
    };
    // calculates if shake did occur
    // calculates if shake did occur
    /**
     * @protected
     * @param {?} e
     * @return {?}
     */
    Shake.prototype.devicemotion = 
    // calculates if shake did occur
    /**
     * @protected
     * @param {?} e
     * @return {?}
     */
    function (e) {
        /** @type {?} */
        var current = e.accelerationIncludingGravity;
        if (current === null || current.x === null || current.y === null || current.z === null) {
            return;
        }
        if ((this.lastX === null) || (this.lastY === null) || (this.lastZ === null)) {
            this.lastX = current.x;
            this.lastY = current.y;
            this.lastZ = current.z;
            return;
        }
        /** @type {?} */
        var deltaX = Math.abs(this.lastX - current.x);
        /** @type {?} */
        var deltaY = Math.abs(this.lastY - current.y);
        /** @type {?} */
        var deltaZ = Math.abs(this.lastZ - current.z);
        /** @type {?} */
        var delta = Math.sqrt([deltaX, deltaY, deltaZ].reduce((/**
         * @param {?} p
         * @param {?} c
         * @return {?}
         */
        function (p, c) { return p + c * c; }), 0));
        if (delta > this.options.threshold) {
            // calculate time in milliseconds since last shake registered
            /** @type {?} */
            var currentTime = new Date();
            /** @type {?} */
            var timeDifference = currentTime.getTime() - this.lastTime.getTime();
            if (timeDifference > this.options.timeout) {
                window.dispatchEvent(this.event);
                this.lastTime = new Date();
            }
        }
        this.lastX = current.x;
        this.lastY = current.y;
        this.lastZ = current.z;
    };
    // event handler
    // event handler
    /**
     * @param {?} e
     * @return {?}
     */
    Shake.prototype.handleEvent = 
    // event handler
    /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (typeof (this[e.type]) === 'function') {
            return this[e.type](e);
        }
    };
    Shake.EVENT = 'shake';
    return Shake;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var GiftStatus = {
    hang: 'hang',
    drop: 'drop',
};
/**
 * @record
 */
function IManStyle() { }
if (false) {}
/**
 * @record
 */
function IGift() { }
if (false) {}
var ShakeTreeComponent = /** @class */ (function () {
    function ShakeTreeComponent() {
        this.nbShakes = 1;
        this.nbHangedGifts = 3;
        this.nbFallingGifts = 3;
        this.enabled = true;
        this.distanceFromTree = 16;
        this.bottomDistance = 5;
        this.completed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.tap = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.gifts = [
            { id: 1, status: "hang" /* hang */, display: true },
            { id: 2, status: "hang" /* hang */, display: true },
            { id: 3, status: "hang" /* hang */, display: true },
            { id: 4, status: "hang" /* hang */, display: true },
            { id: 5, status: "hang" /* hang */, display: true },
            { id: 6, status: "hang" /* hang */, display: true },
            { id: 7, status: "hang" /* hang */, display: true },
            { id: 8, status: "hang" /* hang */, display: true },
            { id: 9, status: "hang" /* hang */, display: true },
            { id: 10, status: "hang" /* hang */, display: true }
        ];
        this.celebrate = false;
        this.shakeAnimationClass = '';
        this.n = 0;
        this.shake = new Shake({ threshold: 5, timeout: 500 });
        this.tapped = this.tapped.bind(this);
    }
    /**
     * @return {?}
     */
    ShakeTreeComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.updateGifts();
        this.shake.start();
        window.addEventListener(Shake.EVENT, this.tapped, false);
    };
    /**
     * @return {?}
     */
    ShakeTreeComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.shake.stop();
        this.tap.complete();
        this.completed.complete();
        window.removeEventListener(Shake.EVENT, this.tapped, false);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    ShakeTreeComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.nbHangedGifts) {
            this.updateGifts();
        }
    };
    /**
     * @return {?}
     */
    ShakeTreeComponent.prototype.tapped = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.enabled) {
            this.tap.emit(this.n);
            this.n++;
            this.shakeAnimationClass = '';
            this.getCurrentShakeAction(this.n).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["delay"])(100)).subscribe((/**
             * @param {?} className
             * @return {?}
             */
            function (className) { return _this.shakeAnimationClass = className; }));
            // @ts-ignore
            if (this.n === Number.parseInt(this.nbShakes, 10)) {
                this.gifts
                    .filter((/**
                 * @param {?} gift
                 * @return {?}
                 */
                function (gift) { return gift.id <= _this.nbFallingGifts; }))
                    .forEach((/**
                 * @param {?} gift
                 * @return {?}
                 */
                function (gift) { return gift.status = "drop" /* drop */; }));
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.celebrate = true;
                    _this.completed.emit();
                }), 300);
            }
        }
    };
    /**
     * @return {?}
     */
    ShakeTreeComponent.prototype.getManStyle = /**
     * @return {?}
     */
    function () {
        return {
            left: this.distanceFromTree + '%',
            bottom: this.bottomDistance + '%',
        };
    };
    /**
     * @return {?}
     */
    ShakeTreeComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.gifts
            .filter((/**
         * @param {?} gift
         * @return {?}
         */
        function (gift) { return gift.id <= _this.nbHangedGifts; }))
            .forEach((/**
         * @param {?} gift
         * @return {?}
         */
        function (gift) { return gift.status = "hang" /* hang */; }));
        this.n = 0;
        this.celebrate = false;
        this.shakeAnimationClass = '';
    };
    /**
     * @private
     * @param {?} ngTap
     * @return {?}
     */
    ShakeTreeComponent.prototype.getCurrentShakeAction = /**
     * @private
     * @param {?} ngTap
     * @return {?}
     */
    function (ngTap) {
        if (ngTap < this.nbShakes) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])('shake');
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])('');
    };
    /**
     * @private
     * @return {?}
     */
    ShakeTreeComponent.prototype.updateGifts = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.gifts
            .forEach((/**
         * @param {?} gift
         * @return {?}
         */
        function (gift) { return gift.display = gift.id <= _this.nbHangedGifts; }));
    };
    ShakeTreeComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-shake-tree',
                    template: "<div class=\"shake-tree-container\" (click)=\"tapped()\">\n  <div class=\"tree\" [ngClass]=\"shakeAnimationClass\">\n    <img [src]=\"treeImg\" class=\"tree__img\" *ngIf=\"treeImg\" />\n    <div *ngFor=\"let gift of gifts\" [ngClass]=\"'gift-wrapper gift-wrapper__' + gift.id + ' ' + gift.status\">\n      <img *ngIf=\"gift.display && giftImg\" [src]=\"giftImg\" [ngClass]=\"'gift-img gift-img__' + gift.id\" />\n    </div>\n  </div>\n  <div class=\"man\">\n    <img *ngIf=\"!celebrate && waitingManImg\" [src]=\"waitingManImg\" class=\"man__img\" [ngStyle]=\"getManStyle()\" />\n    <img *ngIf=\"celebrate && waitingManCelebrateImg\" [src]=\"waitingManCelebrateImg\" class=\"man__img\"\n      [ngStyle]=\"getManStyle()\" />\n  </div>\n</div>",
                    styles: [":host{height:100%}.tree__img{display:block;max-width:100%;max-height:100%;margin:auto}.gift-wrapper{display:inline-block;position:absolute;max-width:40px;width:12%;height:100%;top:0;background:0 0}.gift-img{display:block;width:100%;height:auto;position:absolute;left:0}.shake-tree-container{position:relative;height:100%;width:100%;display:block;text-align:center;overflow:hidden}.shake-tree-container .tree{max-height:100%;max-width:100%;display:inline-block;position:relative;height:100%}.shake-tree-container .tree.shake{-webkit-animation:.4s cubic-bezier(.36,.07,.19,.97) both shake;animation:.4s cubic-bezier(.36,.07,.19,.97) both shake}.shake-tree-container .tree .gift-wrapper.drop{-webkit-transition:.5s ease-in;transition:.5s ease-in}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__1{-webkit-transform:translateY(70%);transform:translateY(70%)}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__2{-webkit-transform:translateY(60%);transform:translateY(60%)}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__3{-webkit-transform:translateY(45%);transform:translateY(45%)}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__4{-webkit-transform:translateY(43%);transform:translateY(43%);z-index:2}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__5{-webkit-transform:translateY(64%);transform:translateY(64%);z-index:2}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__6{-webkit-transform:translateY(59%);transform:translateY(59%);z-index:3}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__7{-webkit-transform:translateY(75%);transform:translateY(75%);z-index:2}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__8{-webkit-transform:translateY(49%);transform:translateY(49%);z-index:3}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__9{-webkit-transform:translateY(54%);transform:translateY(54%);z-index:1}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__10{-webkit-transform:translateY(59%);transform:translateY(59%)}.shake-tree-container .tree .gift-wrapper__1{left:35%}.shake-tree-container .tree .gift-wrapper__1 .gift-img__1{top:18%}.shake-tree-container .tree .gift-wrapper__2{left:60%}.shake-tree-container .tree .gift-wrapper__2 .gift-img__2{top:28%}.shake-tree-container .tree .gift-wrapper__3{left:31%;z-index:3}.shake-tree-container .tree .gift-wrapper__3 .gift-img__3{top:46%}.shake-tree-container .tree .gift-wrapper__4{left:73%}.shake-tree-container .tree .gift-wrapper__4 .gift-img__4{top:45%}.shake-tree-container .tree .gift-wrapper__5{left:24%}.shake-tree-container .tree .gift-wrapper__5 .gift-img__5{top:25%}.shake-tree-container .tree .gift-wrapper__6{left:75%}.shake-tree-container .tree .gift-wrapper__6 .gift-img__6{top:32%}.shake-tree-container .tree .gift-wrapper__7{left:55%}.shake-tree-container .tree .gift-wrapper__7 .gift-img__7{top:14%}.shake-tree-container .tree .gift-wrapper__8{left:57%}.shake-tree-container .tree .gift-wrapper__8 .gift-img__8{top:41%}.shake-tree-container .tree .gift-wrapper__9{left:15%}.shake-tree-container .tree .gift-wrapper__9 .gift-img__9{top:36%}.shake-tree-container .tree .gift-wrapper__10{left:40%}.shake-tree-container .tree .gift-wrapper__10 .gift-img__10{top:32%}.man{display:block;width:100%;height:20%;position:absolute;bottom:0;left:0}.man__img{height:100%;position:absolute}@-webkit-keyframes shake{10%,90%{-webkit-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0)}20%,80%{-webkit-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0)}30%,50%,70%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}40%,60%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes shake{10%,90%{-webkit-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0)}20%,80%{-webkit-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0)}30%,50%,70%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}40%,60%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}"]
                }] }
    ];
    /** @nocollapse */
    ShakeTreeComponent.ctorParameters = function () { return []; };
    ShakeTreeComponent.propDecorators = {
        treeImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        giftImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        waitingManImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        waitingManCelebrateImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbShakes: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbHangedGifts: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbFallingGifts: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        enabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        distanceFromTree: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        bottomDistance: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        completed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        tap: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return ShakeTreeComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinataComponent = /** @class */ (function () {
    function PinataComponent() {
        this.nbTaps = 5;
        this.enabled = true;
        this.tap = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.broken = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.shakeAnimationClass = '';
        this.n = 0;
    }
    /**
     * @return {?}
     */
    PinataComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.currentImg = this.stillImg;
    };
    /**
     * @return {?}
     */
    PinataComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        [this.tap, this.broken].forEach((/**
         * @param {?} emitter
         * @return {?}
         */
        function (emitter) { return emitter.complete(); }));
    };
    /**
     * @return {?}
     */
    PinataComponent.prototype.shake = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.enabled) {
            this.n++;
            if (this.n < this.nbTaps) {
                if (this.movingImg !== undefined && this.movingImg !== null) {
                    this.currentImg = this.movingImg;
                }
                this.shakeAnimationClass = '';
                this.tap.emit(this.n);
                setTimeout((/**
                 * @return {?}
                 */
                function () {
                    _this.shakeAnimationClass = 'shake';
                }), 0);
                // @ts-ignore
            }
            else if (this.n === Number.parseInt(this.nbTaps, 10)) {
                this.tap.emit(this.n);
                this.broken.emit();
                this.currentImg = this.openedImg;
            }
        }
    };
    /**
     * @return {?}
     */
    PinataComponent.prototype.reset = /**
     * @return {?}
     */
    function () {
        this.n = 0;
        this.currentImg = this.stillImg;
        this.shakeAnimationClass = '';
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PinataComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.stillImg || changes.movingImg || changes.openedImg) {
            this.updateImage();
        }
    };
    /**
     * @private
     * @return {?}
     */
    PinataComponent.prototype.updateImage = /**
     * @private
     * @return {?}
     */
    function () {
        if (this.n === 0) {
            this.currentImg = this.stillImg;
        }
        else if (this.n < this.nbTaps) {
            if (this.movingImg !== undefined && this.movingImg !== null) {
                this.currentImg = this.movingImg;
            }
            // @ts-ignore
        }
        else if (this.n >= Number.parseInt(this.nbTaps, 10)) {
            this.currentImg = this.openedImg;
        }
    };
    PinataComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-pinata',
                    template: "<div (click)=\"shake()\">\n  <div class=\"tree\">\n    <div [className]=\"shakeAnimationClass\">\n      <img [src]=\"currentImg\" class=\"img\" />\n    </div>\n  </div>\n</div>\n",
                    styles: [".shake{-webkit-animation:.2s cubic-bezier(.36,.07,.19,.97) both shake;animation:.2s cubic-bezier(.36,.07,.19,.97) both shake}@-webkit-keyframes shake{10%,90%{-webkit-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0)}20%,80%{-webkit-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0)}30%,50%,70%{-webkit-transform:translate3d(-4px,0,0);transform:translate3d(-4px,0,0)}40%,60%{-webkit-transform:translate3d(4px,0,0);transform:translate3d(4px,0,0)}}@keyframes shake{10%,90%{-webkit-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0)}20%,80%{-webkit-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0)}30%,50%,70%{-webkit-transform:translate3d(-4px,0,0);transform:translate3d(-4px,0,0)}40%,60%{-webkit-transform:translate3d(4px,0,0);transform:translate3d(4px,0,0)}}.img{display:block;max-width:100%;max-height:100%;margin:auto}"]
                }] }
    ];
    PinataComponent.propDecorators = {
        stillImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        movingImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        openedImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbTaps: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        enabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tap: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        broken: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PinataComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
IGameService = /** @class */ (function () {
    function IGameService() {
    }
    return IGameService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerGameService = /** @class */ (function () {
    function WhistlerGameService(http, config, voucherService) {
        this.http = http;
        this.voucherService = voucherService;
        // basic cache
        this.cache = {};
        this.hostName = (/** @type {?} */ (config.apiHost));
    }
    Object.defineProperty(WhistlerGameService.prototype, "whistlerVoucherService", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return (/** @type {?} */ (this.voucherService));
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} game
     * @return {?}
     */
    WhistlerGameService.WGameToGame = /**
     * @private
     * @param {?} game
     * @return {?}
     */
    function (game) {
        /** @type {?} */
        var type = GameType.unknown;
        /** @type {?} */
        var config = null;
        var attributes = game.attributes;
        if (attributes.game_type === "shake" /* shakeTheTree */) {
            type = GameType.shakeTheTree;
            /** @type {?} */
            var treedp = (/** @type {?} */ (attributes.display_properties));
            config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultTree(), { treeImg: treedp.tree_img_url, giftImg: treedp.gift_box_img_url, nbHangedGift: treedp.nb_hanged_gifts, nbGiftsToDrop: treedp.nb_gifts_to_drop || 1 });
        }
        else if (attributes.game_type === "tap" /* pinata */) {
            type = GameType.pinata;
            /** @type {?} */
            var pinatadp = (/** @type {?} */ (attributes.display_properties));
            config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultPinata(), { stillImg: pinatadp.closed_pinata_img_url, breakingImg: pinatadp.cracking_pinata_img_url, brokenImg: pinatadp.opened_pinata_img_url });
        }
        else if (attributes.game_type === "scratch" /* scratch */) {
            type = GameType.scratch;
            /** @type {?} */
            var scratchdp = (/** @type {?} */ (attributes.display_properties));
            config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultScratch(), { underlyingSuccessImg: scratchdp.post_scratch_success_img_url, underlyingFailImg: scratchdp.post_scratch_fail_img_url, coverImg: scratchdp.pre_scratch_img_url });
        }
        else if (attributes.game_type === "spin" /* spin */) {
            type = GameType.spin;
            /** @type {?} */
            var spindp = (/** @type {?} */ (attributes.display_properties));
            config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultSpin(), { numberOfWedges: spindp.nb_of_wedges, rewardSlots: spindp.slots, colorCtrls: Object.assign(spindp.wedge_colors), rewardIcon: spindp.reward_icon, wheelImg: spindp.wheel_img, wheelPosition: spindp.wheel_position, pointerImg: spindp.pointer_img });
        }
        /** @type {?} */
        var texts = {};
        if (attributes.display_properties.title) {
            texts.title = attributes.display_properties.title;
            texts.subTitle = attributes.display_properties.sub_title;
        }
        if (attributes.display_properties.button) {
            texts.button = attributes.display_properties.button;
        }
        /** @type {?} */
        var imgUrl = attributes.image_url ? attributes.image_url : undefined;
        /** @type {?} */
        var backgroundImg = attributes.display_properties.background_img_url ?
            attributes.display_properties.background_img_url : undefined;
        return {
            id: +game.id,
            type: type,
            remainingNumberOfTries: 1,
            config: config,
            texts: texts,
            backgroundImg: backgroundImg,
            imgUrl: imgUrl,
            results: {}
        };
    };
    /**
     * @param {?} campaignId
     * @param {?} gameId
     * @return {?}
     */
    WhistlerGameService.prototype.play = /**
     * @param {?} campaignId
     * @param {?} gameId
     * @return {?}
     */
    function (campaignId, gameId) {
        var _this = this;
        /** @type {?} */
        var body = {
            data: {
                type: 'transactions',
                attributes: {
                    engagement_id: gameId,
                    campaign_entity_id: campaignId,
                    status: 'confirmed'
                }
            }
        };
        return this.http.post(this.hostName + "/game/transactions", body, { headers: { 'Content-Type': 'application/vnd.api+json' } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return (rxjs__WEBPACK_IMPORTED_MODULE_7__["combineLatest"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(res.data.attributes.results.attributes.results.map((/**
         * @param {?} outcome
         * @return {?}
         */
        function (outcome) { return _this.whistlerVoucherService.getFullVoucher(outcome); })))).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} vouchArr
         * @return {?}
         */
        function (vouchArr) { return vouchArr.reduce((/**
         * @param {?} acc
         * @param {?} currVouch
         * @return {?}
         */
        function (acc, currVouch) {
            return (Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, acc, { vouchers: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(acc.vouchers, [currVouch]) }));
        }), { vouchers: [], rawPayload: res }); })))); })));
    };
    /**
     * @param {?} engagementId
     * @param {?=} campaignId
     * @return {?}
     */
    WhistlerGameService.prototype.get = /**
     * @param {?} engagementId
     * @param {?=} campaignId
     * @return {?}
     */
    function (engagementId, campaignId) {
        var _this = this;
        if (this.cache[engagementId]) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.cache[engagementId]);
        }
        /** @type {?} */
        var campaignIdParams = campaignId ? "?campaign_id=" + campaignId : '';
        return this.http.get(this.hostName + "/game/engagements/" + engagementId + campaignIdParams)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} game
         * @return {?}
         */
        function (game) { return WhistlerGameService.WGameToGame(game); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} game
         * @return {?}
         */
        function (game) { return _this.cache[engagementId] = game; })));
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    WhistlerGameService.prototype.getGamesFromCampaign = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        var _this = this;
        /** @type {?} */
        var disProp = null;
        return this.http.get(this.hostName + "/campaign/entities/" + campaignId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data.attributes; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} entity
         * @return {?}
         */
        function (entity) {
            disProp = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, entity.display_properties);
            return entity.engagement_id;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} correctId
         * @return {?}
         */
        function (correctId) { return _this.get(correctId, campaignId); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} game
         * @return {?}
         */
        function (game) { return ([Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, game, { campaignId: campaignId, displayProperties: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, game.displayProperties, disProp) })]); })));
    };
    /**
     * @param {?} engagementId
     * @param {?=} campaignId
     * @return {?}
     */
    WhistlerGameService.prototype.prePlay = /**
     * @param {?} engagementId
     * @param {?=} campaignId
     * @return {?}
     */
    function (engagementId, campaignId) {
        /** @type {?} */
        var body = {
            data: {
                type: 'transactions',
                attributes: {
                    engagement_id: engagementId,
                    campaign_entity_id: campaignId,
                    status: 'reserved'
                }
            }
        };
        return this.http.post(this.hostName + "/game/transactions", body, { headers: { 'Content-Type': 'application/vnd.api+json' } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return ({
            id: Number.parseInt(res.data.id, 10),
            voucherIds: res.data.attributes.results.attributes.results.map((/**
             * @param {?} outcome
             * @return {?}
             */
            function (outcome) { return Number.parseInt(outcome.id, 10); }))
        }); })));
    };
    /**
     * @param {?} transactionId
     * @return {?}
     */
    WhistlerGameService.prototype.prePlayConfirm = /**
     * @param {?} transactionId
     * @return {?}
     */
    function (transactionId) {
        /** @type {?} */
        var body = {
            data: {
                type: 'transactions',
                id: transactionId,
                attributes: {
                    status: 'confirmed'
                }
            }
        };
        return this.http.patch(this.hostName + "/game/transactions/" + transactionId, body, { headers: { 'Content-Type': 'application/vnd.api+json' } }).pipe(
        // @
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @return {?}
         */
        function () { return void 0; })));
    };
    WhistlerGameService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerGameService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config },
        { type: IVoucherService }
    ]; };
    /** @nocollapse */ WhistlerGameService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerGameService_Factory() { return new WhistlerGameService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(IVoucherService)); }, token: WhistlerGameService, providedIn: "root" });
    return WhistlerGameService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function Coords() { }
if (false) {}
/** @type {?} */
var RADIUS = 10;
var ScratchCardComponent = /** @class */ (function () {
    function ScratchCardComponent() {
        this.uncoverPortionToTrigger = 90;
        this.enabled = true;
        this.completed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(ScratchCardComponent.prototype, "lastPointOffset", {
        get: /**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var randomPoint = this.randomPoint(RADIUS);
            return {
                x: (this.lastPoint.x - RADIUS) + randomPoint.x,
                y: (this.lastPoint.y - RADIUS) + randomPoint.y,
            };
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} radius
     * @return {?}
     */
    ScratchCardComponent.prototype.randomPoint = /**
     * @private
     * @param {?} radius
     * @return {?}
     */
    function (radius) {
        /** @type {?} */
        var angle = Math.random() * Math.PI * 2;
        return {
            x: Math.cos(angle) * radius,
            y: Math.sin(angle) * radius
        };
    };
    /**
     * @private
     * @param {?} e
     * @param {?=} lastPoint
     * @return {?}
     */
    ScratchCardComponent.prototype.scratch = /**
     * @private
     * @param {?} e
     * @param {?=} lastPoint
     * @return {?}
     */
    function (e, lastPoint) {
        if (lastPoint === void 0) { lastPoint = this.lastPoint; }
        if (!this.isDrawing || !this.enabled || !this.canvas) {
            return;
        }
        e.preventDefault();
        /** @type {?} */
        var currentPoint = this.getMouse(e, this.canvas);
        /** @type {?} */
        var dist = this.distanceBetween(lastPoint, currentPoint);
        /** @type {?} */
        var angle = this.angleBetween(lastPoint, currentPoint);
        /** @type {?} */
        var x;
        /** @type {?} */
        var y;
        /** @type {?} */
        var canvas2dContext = this.canvas.getContext('2d');
        if (canvas2dContext) {
            for (var i = 0; i < dist; i++) {
                x = lastPoint.x + (Math.sin(angle) * i) - 25;
                y = lastPoint.y + (Math.cos(angle) * i) - 25;
                canvas2dContext.globalCompositeOperation = 'destination-out';
                canvas2dContext.drawImage(this.brush, x, y);
            }
        }
        if (this.lastPoint === lastPoint) {
            this.lastPoint = currentPoint;
        }
        /** @type {?} */
        var constFilledInPixels = this.getFilledInPixels(32);
        if (constFilledInPixels) {
            this.handlePercentage(constFilledInPixels);
        }
    };
    /**
     * @return {?}
     */
    ScratchCardComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.generateCanvas();
        /** @type {?} */
        var image = new Image();
        this.brush = new Image();
        /** @type {?} */
        var container = this.scContainer.nativeElement;
        image.src = this.coverImg;
        image.crossOrigin = 'Anonymous';
        /** @type {?} */
        var canvas2dContext = this.canvas.getContext('2d');
        image.onload = (/**
         * @return {?}
         */
        function () {
            if (_this.canvas && canvas2dContext) {
                canvas2dContext.imageSmoothingEnabled = false;
                canvas2dContext.drawImage(image, 0, 0, container.offsetWidth, container.offsetHeight);
            }
            // Show the form when Image is loaded.
            _this.underImg.nativeElement.style.visibility = 'visible';
        });
        this.brush.src = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAAAxCAYAAABNuS5SAAAKFklEQVR42u2aCXCcdRnG997NJtlkk83VJE3apEma9CQlNAR60UqrGSqW4PQSO9iiTkE8BxWtlGMqYCtYrLRQtfVGMoJaGRFliijaViwiWgQpyCEdraI1QLXG52V+n/5nzd3ENnX/M8/sJvvt933/533e81ufL7MyK7NOzuXPUDD0FQCZlVn/+xUUQhkXHny8M2TxGsq48MBjXdAhL9/7YN26dd5nI5aVRrvEc0GFEBNKhbDjwsHh3qP/FJK1EdYIedOFlFAOgREhPlICifZDYoBjTna3LYe4xcI4oSpNcf6RvHjuAJRoVszD0qFBGmgMChipZGFxbqzQkJWVZUSOF7JRX3S4LtLTeyMtkkqljMBkPzHRs2aYY5PcZH/qLY1EIo18byQ6hBytIr3WCAXcV4tQHYvFxg3w3N6+Bh3OQolEoqCoqCinlw16JzTFJSE6PYuZKqvztbC2ex7bzGxhKu+rerjJrEEq+r9ieElJSXFDQ0Mh9zYzOzu7FBUWcO4Q9xbD6HYvhXhGLccVD5ZAPyfMqaioyOrBUgEv8FZXV8caGxtz8vLykhCWTnZIKmsKhUJnEYeKcKk2YYERH41G7UYnck1/WvAPOxsdLJm2+bEY0Ay0RNeqkytXQkoBZM4U5oOaoYSUkBGRtvnesrBZK4e4F6ypqSkuLy+v4KI99ZQxkfc6vZ4jNAl1wkbhG8LrhfNBCdkxmhYacvj/GOce+3K9MHHbDHUmicOufREELRIWch/DljzMsglutr+VIJO5KjGrVfZAnpF8mnCd8G5hrnC60Cl8T/iw8C1hKd9P9eDCMcgo5HwBx8BB/g7xeRPkrBbeJ3xTeAxjvRGVV3NcshfPG1JX4tVDQae47GuVOknCi23xHr5nyrxe2C1sFlYJ7xe+Jlwm7BRulItP0ms957RzTMK1ws41jMS8eDxehopaOCYfxc3AIHcIX+K6nxW+ImyVF1i8PQ8DTuwtdC1atCja3NwcHkq5EuXmo85G+jq+yMm28V4q/zcIPxV+K9zPxnbgTi0ocybu6wX66fx/vfAB4T1gHt8xI1wlXMF5zEXnQKC56ruEjwhvEa4WrrXvK/Yt5Pt5I1UveeVKyKmT+lpG2gQ2npMmez8ZzFT3e+HXwj7hKXNf6rFZbDpJUjESLdFsFX4mfFv4Fd/7qPBm4UPCJ4RNwncwym4UfYVUtiAcDk/T+3NRmylwWzAY7BCBCwYYogZPnrJoRNm2IDc3tw4FVKXFm95UmGLzkTTFpog524WnhQPCQeGvwiPCCuFCYmk5GbEJt3tOeF54HPVeLLyXxHOv8BPhYaFLeFU4gsI7OWeZk3g+hpJNvVMGIIqhdRvy+biVISouq2TBqWxoIL1wgBhU5AR1SzJvFR4UnhX+Bl4RfsFGP0npUkTymIQ7fh8Cf4l6F0LgXkj6o3O+buGfwj+ElzGQETaNeJqPhxiahckYq8KJ9V6mP+4pTIATjsGCA8lCQVy9VbhB2CM8itu9IBxlkx6O4nbmmpcSi0KUExa3Psfn23DZC4lhlhRuIWs/R1Y9BrpR4WHcfiOq34bLl5DJm1B7BANPGO4+2OJfDcVwX+RZkL5d+DRqeRJ360IJx1CFp4w/8/lhVGXxay1xKp8asQ31rSbgz2az1aBBWCZsgKTfEFe7uM4xYus9KHWXcBv3eolwJe67hJLIN6yubMVpW1tbbllZWVxtzjRquvQe9981IG3RZHUQttH7hB8IP0cdLwp/YnNHcdsjEP1xsEruO56i2Fy3UWXMskAgYAH/EjOiCD6NDc/XZ4v12RqSy3WQ9rJD3jPClwkZz2Aoy8JnUEjPcwYWfgfHvcIW84h308mABQP4Xp02OY44M4tSZSfx7UXIewU3NpXuxw0vJzauYDP1XM8y8Ttx67fhylYrdlAMW1x7h/BF3NWI+4PwFwjbSha26/xQuBmib6HDqeI+m4m5wzrj9A/xO+O5qbm4yizcbDOKfAjVWeC/WzAFLSeI+4hN9WzQ65EvED7D8Tt4vwE33O64rIfD1JW3k6xeQoX3UN6chyG8In4tcbHuRAyKw2ktVIIM2U5XcA7t2FKy5vWQeBexbbrTpvmZiJwN6e3EwKspW/ajqBuAKfKQk8m7KIce5bgnMNQDkLWPUmkj511DSVV5HJOd417FzrDAK7RjZLMZiURigmLVFCYs5tI2PFhpcUj/n6z6sp72LwJKiU2rUdp62rA7IX4XytpJ3Weh4XfE1/0kk/uoFX8kbCHudZLld5E8vJIs2+mbT8iznaR60DHMBt0EE1DySVlSsOBvyrL6zkZG5qI2T/QSBYTHMYAlq2tw1+0MFO4kVj5GSbSbgvkA8fQQr1uIdfdD5mZ1GhZbP0XfuwlPmOp0SNkYbkQV2JdlEsq69VJS+rTER+NtZVC+TX+NRFq1XGeiHXbGUHMg6lk2/DiZ+mHU8wTueoTXLtS3F5e9l2PNZW9lyrOB5LGSmJokzMQ6OjqCA3wsMXLLhqrWoZgKe3lyZ5YtLiwsLLfMLhJL0ibW3rKa7oMQ+Ajq6gKHcMeHeP8qZcpRMvyt1J97SRabcNP1ZGsbKhSb6lF+5GR6shUnlqTSyPM7LZxV/PUqjOfTH6cvqx+XyN3aCfBPUWh3UZIcxC2/jgu/BJ7Eve/G1R/EXS9gaLCc0dgySqIm7jV4MhEYdAaN4R4eRHkBusJp3GNp56iSOscyYN0DaUch8Ai13X6yrg0PvotCO8nme0geKymBaulc1qO+NbxOOpHZtrcHR+nT6+wePvcnk8k8qv6iNBdyH4/OoGR5gXbv75D4NIX3NoruLSjtKmLlbTwCKER1NmV+QIqfS13aai0izUHsRKksAQE5g0w4fuehj9f+xb25Ym1tbcIhuw2COmkBn2cAcQAFbsclV1BTns49JZio3EQWPkgCySJpFIu8aor0UfeLigDTlUTa/8eimhRGuUiKOZPYtYNabh9EGik3Mkk+A9I8JTWoAiik/LEpzY8tY4uwWc4AJMjxQd8oXRHU8JqbW32orNyAiubZo0WR5wX9KyHrLpLD52nrxhFHa1CVV5w3081cRu/7BYichpEqfafA7/sCzhT7tVkhLZvhTeB8Gv1r6U+ty/gqtWHQCSNTcPOl9NmXM1S4hgRjBjjL1MdUJ8cx3uhe3d3dfh5Meb8qyKWsuJRidwtN/h20XEtxvTwya7tKncU8ACqmXVwLict5fy6TnFhra2uW7xT8dWk2BHptVBOx8GLKjo3g7bhrBQq1sdVsCvEkhLZIac1y/zmUSO0oO8fX/0P2Ub3cwaWpZSITnLnOpDlBWTIfMleJqFb10jXCBJUlMyORSIP14LhqNef6v/05bpZTdHulUyXKsufDNdRxZ4vIhSKwhQFG5vfLfcwZsx2X92Jhje8/P8OI+TK/oO+zeA84WTzkvI/6RuB3y6f68qf11xnyMiuzMms4178AwArmZmkkdGcAAAAASUVORK5CYII=';
        if (this.canvas) {
            this.canvas.addEventListener('mousedown', this.handleMouseDown.bind(this), false);
            this.canvas.addEventListener('touchstart', this.handleMouseDown.bind(this), false);
            this.canvas.addEventListener('mousemove', this.handleMouseMove.bind(this), false);
            this.canvas.addEventListener('touchmove', this.handleMouseMove.bind(this), false);
            this.canvas.addEventListener('mouseup', this.handleMouseUp.bind(this), false);
            this.canvas.addEventListener('touchend', this.handleMouseUp.bind(this), false);
        }
    };
    /**
     * @private
     * @return {?}
     */
    ScratchCardComponent.prototype.generateCanvas = /**
     * @private
     * @return {?}
     */
    function () {
        this.canvas = document.createElement('canvas');
        if (this.canvas) {
            this.canvas.classList.add('canvas');
            // Add canvas into container
            this.canvas.width = this.scContainer.nativeElement.offsetWidth;
            this.canvas.height = this.scContainer.nativeElement.offsetHeight;
            this.scContainer.nativeElement.appendChild(this.canvas);
        }
    };
    /**
     * @param {?} point1
     * @param {?} point2
     * @return {?}
     */
    ScratchCardComponent.prototype.distanceBetween = /**
     * @param {?} point1
     * @param {?} point2
     * @return {?}
     */
    function (point1, point2) {
        return Math.sqrt(Math.pow(point2.x - point1.x, 2) + Math.pow(point2.y - point1.y, 2));
    };
    /**
     * @param {?} point1
     * @param {?} point2
     * @return {?}
     */
    ScratchCardComponent.prototype.angleBetween = /**
     * @param {?} point1
     * @param {?} point2
     * @return {?}
     */
    function (point1, point2) {
        return Math.atan2(point2.x - point1.x, point2.y - point1.y);
    };
    /**
     * @param {?} stride
     * @return {?}
     */
    ScratchCardComponent.prototype.getFilledInPixels = /**
     * @param {?} stride
     * @return {?}
     */
    function (stride) {
        if (!this.canvas) {
            return 0;
        }
        if (!stride || stride < 1) {
            stride = 1;
        }
        /** @type {?} */
        var canvas2dContext = this.canvas.getContext('2d');
        if (canvas2dContext) {
            /** @type {?} */
            var pixels = canvas2dContext.getImageData(0, 0, this.canvas.width, this.canvas.height);
            /** @type {?} */
            var pdata = pixels.data;
            /** @type {?} */
            var l = pdata.length;
            /** @type {?} */
            var total = (l / stride);
            /** @type {?} */
            var count = 0;
            // Iterate over all pixels
            for (var i = 0; i < l; i += stride) {
                if (pdata[i] === 0) {
                    count++;
                }
            }
            return Math.round((count / total) * 100);
        }
    };
    /**
     * @param {?} e
     * @param {?} canvas
     * @return {?}
     */
    ScratchCardComponent.prototype.getMouse = /**
     * @param {?} e
     * @param {?} canvas
     * @return {?}
     */
    function (e, canvas) {
        /** @type {?} */
        var offsetX = 0;
        /** @type {?} */
        var offsetY = 0;
        while (canvas) {
            offsetY += canvas.offsetTop;
            offsetX += canvas.offsetLeft;
            canvas = (/** @type {?} */ (canvas.offsetParent));
        }
        /** @type {?} */
        var mx = (e.pageX || e.touches[0].clientX) - offsetX;
        /** @type {?} */
        var my = (e.pageY || e.touches[0].clientY) - offsetY;
        return { x: mx, y: my };
    };
    /**
     * @param {?} filledInPixels
     * @return {?}
     */
    ScratchCardComponent.prototype.handlePercentage = /**
     * @param {?} filledInPixels
     * @return {?}
     */
    function (filledInPixels) {
        /** @type {?} */
        var cont = document.getElementById('js_container');
        filledInPixels = filledInPixels || 0;
        // console.log(filledInPixels + '%');
        if (filledInPixels > this.uncoverPortionToTrigger && ((/** @type {?} */ (cont))).children.length > 1 && this.canvas) {
            ((/** @type {?} */ (this.canvas.parentNode))).removeChild(this.canvas);
            this.completed.emit();
        }
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ScratchCardComponent.prototype.handleMouseDown = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.isDrawing = true;
        this.lastPoint = this.getMouse(e, this.canvas);
        this.scratch(e, this.lastPointOffset);
    };
    /**
     * @param {?} e
     * @return {?}
     */
    ScratchCardComponent.prototype.handleMouseMove = /**
     * @param {?} e
     * @return {?}
     */
    function (e) {
        this.scratch(e);
    };
    /**
     * @return {?}
     */
    ScratchCardComponent.prototype.handleMouseUp = /**
     * @return {?}
     */
    function () {
        this.isDrawing = false;
    };
    ScratchCardComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-scratch-card',
                    template: "<div class=\"sc-wrapper\">\n    <div #js_container id=\"js_container\" class=\"container-scratch\">\n      <img #under_img style=\"visibility: hidden;\" [src]=\"underlyingImg\" />\n    </div>\n</div>\n",
                    styles: [":host{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:100%;height:100%}.sc-wrapper{display:block;width:100%;height:100%;margin:0 auto}.container-scratch{width:100%;height:100%;position:relative;overflow:hidden}.container-scratch ::ng-deep img{position:absolute;top:0;left:0;width:100%;height:auto}.container-scratch ::ng-deep canvas{position:absolute;top:0;left:0;width:100%;height:auto}"]
                }] }
    ];
    ScratchCardComponent.propDecorators = {
        coverImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        underlyingImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        uncoverPortionToTrigger: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        enabled: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        completed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        scContainer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['js_container', { static: false },] }],
        underImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['under_img', { static: false },] }]
    };
    return ScratchCardComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ImageForPattern() { }
if (false) {}
/**
 * @record
 */
function Pattern() { }
if (false) {}
var SpinTheWheelComponent = /** @class */ (function () {
    function SpinTheWheelComponent() {
        this.slices = [];
        this.spinDuration = 2;
        this.slotToLand = this.slices.length - 1;
        this.patternImg = [];
        this.dragging = false;
        this.spinTimeTotal = 0;
        this.spinAngleStart = 0;
    }
    Object.defineProperty(SpinTheWheelComponent.prototype, "canvas", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this.canvasEl.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinTheWheelComponent.prototype, "canvasArrow", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this.canvasArrowEl.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinTheWheelComponent.prototype, "canvasWheelWrap", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this.canvasWheelWrapEl.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinTheWheelComponent.prototype, "wheel", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this.wheelEl.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinTheWheelComponent.prototype, "container", {
        get: /**
         * @private
         * @return {?}
         */
        function () { return this.containerEl.nativeElement; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinTheWheelComponent.prototype, "ctx", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.ctx_ && this.canvas.getContext) {
                this.ctx_ = (/** @type {?} */ (this.canvas.getContext('2d')));
            }
            return this.ctx_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinTheWheelComponent.prototype, "ctxArrow", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.ctxArrow_ && this.canvasArrow.getContext) {
                this.ctxArrow_ = (/** @type {?} */ (this.canvasArrow.getContext('2d')));
            }
            return this.ctxArrow_;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SpinTheWheelComponent.prototype, "ctxWheelWrap", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            if (!this.ctxWheelWrap_ && this.canvasWheelWrap.getContext) {
                this.ctxWheelWrap_ = (/** @type {?} */ (this.canvasWheelWrap.getContext('2d')));
            }
            return this.ctxWheelWrap_;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    SpinTheWheelComponent.findTop = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var rec = element.getBoundingClientRect();
        return rec.top + window.scrollY;
    };
    /**
     * @private
     * @param {?} element
     * @return {?}
     */
    SpinTheWheelComponent.findLeft = /**
     * @private
     * @param {?} element
     * @return {?}
     */
    function (element) {
        /** @type {?} */
        var rec = element.getBoundingClientRect();
        return rec.left + window.scrollX;
    };
    /**
     * @private
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    SpinTheWheelComponent.easeOut = /**
     * @private
     * @param {?} t
     * @param {?} b
     * @param {?} c
     * @param {?} d
     * @return {?}
     */
    function (t, b, c, d) {
        /** @type {?} */
        var ts = (t /= d) * t;
        /** @type {?} */
        var tc = ts * t;
        return b + c * (tc + -3 * ts + 3 * t);
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    SpinTheWheelComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if ((changes.slices && this.slices)
            || (changes.wheelImg && this.wheelImg)
            || (changes.pointerImg && this.pointerImg)) {
            this.init();
        }
    };
    /**
     * @return {?}
     */
    SpinTheWheelComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        this.generateCanvas();
        this.attachListeners();
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.generateCanvas = /**
     * @private
     * @return {?}
     */
    function () {
        this.size = this.wheel.offsetWidth;
        this.canvas.width = this.wheel.offsetWidth;
        this.canvas.height = this.wheel.offsetWidth;
        this.canvasArrow.width = this.wheel.offsetWidth;
        this.canvasArrow.height = this.wheel.offsetWidth;
        this.canvasWheelWrap.height = this.wheel.offsetWidth * 1.15;
        this.canvasWheelWrap.width = this.wheel.offsetWidth * 1.15;
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.attachListeners = /**
     * @private
     * @return {?}
     */
    function () {
        this.canvasArrow.style.cursor = 'move';
        this.canvasArrow.addEventListener('touchstart', this.handleStart.bind(this), { once: true });
        this.canvasArrow.addEventListener('mousedown', this.handleStart.bind(this), { once: true });
        // listen while dragging
        this.canvasArrow.addEventListener('touchend', this.handleEnd.bind(this), { once: true });
        this.canvasArrow.addEventListener('mouseup', this.handleEnd.bind(this), { once: true });
        // listen after dragging is complete
        this.canvasArrow.addEventListener('touchmove', this.handleMove.bind(this), { once: true });
        this.canvasArrow.addEventListener('mousemove', this.handleMove.bind(this), { once: true });
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.init = /**
     * @private
     * @return {?}
     */
    function () {
        this.arcDeg = 360 / this.slices.length;
        this.startAngle = this.arcDeg / 2 * Math.PI / 180;
        this.arc = this.arcDeg * Math.PI / 180; // converting back to radians
        // converting back to radians
        /** @type {?} */
        var angleNeeded = this.getAngleNeeded(this.slotToLand);
        this.spinTimeout = 0;
        // the latter part after angleToBeSpun makes it spin for x amt more rounds;
        this.angleToBeSpun = angleNeeded + (Math.floor(Math.random() * 5) + 1) * 360;
        this.loadImg();
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.loadImg = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var slicesWithImg = this.slices.filter((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return item.backgroundImage; }));
        /** @type {?} */
        var count = 0;
        /** @type {?} */
        var images = [];
        this.fillArrowStyle();
        this.fillWheelWrapStyle();
        slicesWithImg.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            /** @type {?} */
            var image = new Image();
            image.src = item.backgroundImage ? item.backgroundImage : '';
            images.push({ id: item.id, image: image });
            image.onload = (/**
             * @return {?}
             */
            function () {
                count++;
                if (count === slicesWithImg.length) {
                    _this.createPatterns(images);
                }
            });
        }));
    };
    /**
     * @private
     * @param {?} arr
     * @return {?}
     */
    SpinTheWheelComponent.prototype.createPatterns = /**
     * @private
     * @param {?} arr
     * @return {?}
     */
    function (arr) {
        var _this = this;
        /** @type {?} */
        var patternImg = arr.filter((/**
         * @param {?} __0
         * @return {?}
         */
        function (_a) {
            var id = _a.id, image = _a.image;
            return id && image;
        }))
            .map((/**
         * @param {?} item
         * @return {?}
         */
        function (item) { return ({
            id: item.id,
            pattern: _this.ctx && _this.ctx.createPattern(item.image, 'no-repeat')
        }); })).filter((/**
         * @param {?} imagePattern
         * @return {?}
         */
        function (imagePattern) {
            if (imagePattern.pattern) {
                return imagePattern;
            }
        }));
        this.patternImg = ((/** @type {?} */ (patternImg)));
        this.drawWheel();
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.drawWheel = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var outsideRadius = this.size / 2 - 5;
        this.ctx.translate(this.size / 2, this.size / 2);
        this.ctx.rotate(this.startAngle); // why have a start angle, just center it if dont have?
        // draw slices
        this.slices.forEach((/**
         * @param {?} slice
         * @param {?} i
         * @return {?}
         */
        function (slice, i) {
            /** @type {?} */
            var angle = i * _this.arc;
            // render background color
            _this.ctx.fillStyle = slice.backgroundColor || 'white';
            _this.ctx.beginPath();
            _this.ctx.arc(0, 0, outsideRadius, angle, angle + _this.arc, false);
            _this.ctx.arc(0, 0, 0, angle + _this.arc, angle, true);
            _this.ctx.stroke();
            _this.ctx.fill();
            // render background image
            if (slice.backgroundImage) {
                /** @type {?} */
                var currentPattern = _this.patternImg.find((/**
                 * @param {?} item
                 * @return {?}
                 */
                function (item) { return item.id === slice.id; }));
                if (currentPattern) {
                    _this.ctx.save();
                    _this.ctx.rotate(angle + _this.arc / 2);
                    /** @type {?} */
                    var stampSize = 500 / _this.slices.length;
                    _this.ctx.translate(outsideRadius / 1.8, -(Math.floor(outsideRadius / 5))); // 25 looks okay
                    _this.ctx.globalCompositeOperation = 'source-atop';
                    _this.ctx.fillStyle = currentPattern.pattern;
                    _this.ctx.beginPath();
                    _this.ctx.rect(0, 0, stampSize, stampSize);
                    _this.ctx.fill();
                    _this.ctx.restore();
                }
            }
            if (_this.wheelImgLoaded) {
                _this.ctxWheelWrap.save();
                _this.ctxWheelWrap.clearRect(0, 0, _this.canvasWheelWrap.width, _this.canvasWheelWrap.height);
                _this.ctxWheelWrap.translate(_this.canvasWheelWrap.width / 2, _this.canvasWheelWrap.width / 2);
                _this.ctxWheelWrap.rotate(Math.PI / 180 * (_this.startAngle));
                _this.ctxWheelWrap.translate(-(_this.canvasWheelWrap.width / 2), -(_this.canvasWheelWrap.width / 2));
                _this.ctxWheelWrap
                    .drawImage(_this.wheelImgLoaded, 0, 0, _this.canvasWheelWrap.width, _this.canvasWheelWrap.height);
                _this.ctxWheelWrap.restore();
            }
            // render label
            if (slice.label) {
                _this.ctx.save();
                _this.ctx.shadowOffsetX = -1;
                _this.ctx.shadowOffsetY = -1;
                _this.ctx.shadowBlur = 0;
                _this.ctx.fillStyle = slice.labelColor || 'black';
                _this.ctx.rotate(angle + _this.arc / 2);
                _this.ctx.translate(_this.size / 4, 0);
                _this.ctx.font = 'bold 15px Helvetica, Arial';
                /** @type {?} */
                var text = slice.label || '';
                /** @type {?} */
                var textArray = text.split(' ');
                for (var index = 0; index < textArray.length; index++) {
                    /** @type {?} */
                    var element = textArray[index];
                    _this.ctx.fillText(element, -_this.ctx.measureText(element).width / 2, index * 15);
                }
                _this.ctx.restore();
            }
        }));
        this.ctx.resetTransform();
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.fillArrowStyle = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var arrowImage = new Image();
        arrowImage.src = this.pointerImg;
        arrowImage.onload = (/**
         * @return {?}
         */
        function () { return _this.ctxArrow.drawImage(arrowImage, _this.canvasArrow.width / 2 - 20, 0, 50, 70); });
        if (this.ctxArrow) {
            this.ctxArrow.clearRect(0, 0, this.canvasArrow.width, this.canvasArrow.height);
            this.ctxArrow.fillStyle = ((/** @type {?} */ (this.ctxArrow.createPattern(arrowImage, 'no-repeat'))));
            this.ctxArrow.fill();
        }
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.fillWheelWrapStyle = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var wheelImg = new Image();
        wheelImg.src = this.wheelImg; // this.wheelImg suppose
        wheelImg.onload = (/**
         * @return {?}
         */
        function () {
            if (_this.wheelImgLoaded !== wheelImg) {
                _this.wheelImgLoaded = wheelImg;
                _this.ctxWheelWrap.clearRect(0, 0, _this.canvasWheelWrap.width, _this.canvasWheelWrap.height); // critical to clear first to not ghost
                _this.ctxWheelWrap
                    .drawImage(_this.wheelImgLoaded, 0, 0, _this.canvasWheelWrap.width, _this.canvasWheelWrap.height);
            }
        });
    };
    /**
     * @private
     * @param {?} neededIndex
     * @return {?}
     */
    SpinTheWheelComponent.prototype.getAngleNeeded = /**
     * @private
     * @param {?} neededIndex
     * @return {?}
     */
    function (neededIndex) {
        /** @type {?} */
        var degrees = this.startAngle * 180 / Math.PI + 90;
        /** @type {?} */
        var arcd = this.arc * 180 / Math.PI;
        /** @type {?} */
        var currentIndex = Math.floor((360 - degrees % 360) / arcd);
        if (this.slices.length === 6) {
            arcd -= 10;
        }
        if (this.slices.length === 9) {
            arcd -= 4;
        }
        if (this.slices.length === 10) {
            arcd -= 4;
        }
        if (currentIndex === neededIndex) {
            return 0;
        }
        if (currentIndex > neededIndex) {
            return arcd * (currentIndex - neededIndex);
        }
        return (arcd * (currentIndex + (this.slices.length - neededIndex)));
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.spin = /**
     * @private
     * @return {?}
     */
    function () {
        // this.spinAngleStart = Math.random() * 10 + 10;
        this.spinAngleStart = this.angleToBeSpun / 32.807503994186335;
        this.spinTime = 0;
        this.spinTimeTotal = this.spinDuration * 3 + 4 * 1000;
        this.rotateWheel();
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.rotateWheel = /**
     * @private
     * @return {?}
     */
    function () {
        this.spinTime += 30;
        if (this.spinTime >= this.spinTimeTotal) {
            this.stopRotateWheel();
            return;
        }
        /** @type {?} */
        var spinAngle = this.spinAngleStart -
            SpinTheWheelComponent.easeOut(this.spinTime, 0, this.spinAngleStart, this.spinTimeTotal);
        this.startAngle += spinAngle * Math.PI / 180;
        this.drawWheel();
        /** @type {?} */
        var that = this;
        this.spinTimeout = window.setTimeout((/**
         * @return {?}
         */
        function () {
            that.rotateWheel();
        }), 10); // change from 30
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.stopRotateWheel = /**
     * @private
     * @return {?}
     */
    function () {
        if (!this.ctx) {
            return;
        }
        clearTimeout(this.spinTimeout);
        this.ctx.save();
        this.ctx.font = 'bold 20px Helvetica, Arial';
        this.ctx.fillStyle = 'black';
        /** @type {?} */
        var text = this.slices[this.slotToLand].label || '';
        this.ctx.fillText(text, this.size / 2 - this.ctx.measureText(text).width / 2, this.size / 2 + 10);
        this.ctx.restore();
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.handleStart = /**
     * @private
     * @return {?}
     */
    function () {
        this.dragging = true;
    };
    /**
     * @private
     * @param {?} e
     * @return {?}
     */
    SpinTheWheelComponent.prototype.handleMove = /**
     * @private
     * @param {?} e
     * @return {?}
     */
    function (e) {
        if (this.dragging) {
            // get the center of the wheel as an array of [x, y]
            /** @type {?} */
            var targetCenter = [
                SpinTheWheelComponent.findLeft(this.container) + this.container.offsetWidth / 2,
                SpinTheWheelComponent.findTop(this.container) + this.container.offsetHeight / 2
            ];
            // get the angle needed to rotate the wheel to follow the mouse/touch
            /** @type {?} */
            var angle = Math.round(Math.atan2(e.pageX - targetCenter[0], -(e.pageY - targetCenter[1])) *
                (180 / Math.PI));
            // add css to rotate
            /** @type {?} */
            var styleString = '';
            styleString += '-webkit-transform: rotate(' + angle + 'deg);';
            styleString += '-moz-transform: rotate(' + angle + 'deg);';
            styleString += 'transform: rotate(' + angle + 'deg);';
            this.canvas.setAttribute('style', styleString);
        }
        e.preventDefault();
    };
    /**
     * @private
     * @return {?}
     */
    SpinTheWheelComponent.prototype.handleEnd = /**
     * @private
     * @return {?}
     */
    function () {
        // set the dragging to false
        this.dragging = false;
        // create css to rotate the wheel back to how it was
        /** @type {?} */
        var degree = 0;
        /** @type {?} */
        var styleString = '';
        styleString += '-moz-transform: rotate(' + degree + 'deg);';
        styleString += '-moz-transform-origin: 50% 50%;';
        styleString += '-webkit-transform: rotate(' + degree + 'deg);';
        styleString += '-webkit-transform-origin: 50% 50%;';
        styleString += '-o-transform: rotate(' + degree + 'deg);';
        styleString += '-o-transform-origin: 50% 50%;';
        styleString += '-ms-transform: rotate(' + degree + 'deg);';
        styleString += '-ms-transform-origin: 50% 50%;';
        this.canvas.setAttribute('style', styleString);
        this.spin();
    };
    SpinTheWheelComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-spin-the-wheel',
                    template: "<div id=\"container\" #container [ngClass]=\"{'down': classPosition === 'mobile-preview-v2'}\">\n  <canvas id=\"wheel-canvas-stop\" #arrow [ngClass]=\"{'down': classPosition === 'mobile-preview-v2'}\"></canvas>\n  <div id=\"wheel\" #wheel [ngClass]=\"{'down': classPosition === 'mobile-preview-v2'}\">\n    <canvas #wheelWrap id=\"wheelwrap-canvas\">\n    </canvas>\n    <canvas id=\"ng-wheel-canvas\" #canvas></canvas>\n  </div>\n</div>\n",
                    styles: [":host{display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;width:100%;height:100%;border:1px solid salmon}#wheel{position:relative;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;-webkit-box-align:center;align-items:center;margin:0 auto;top:-15%;left:0;right:0;bottom:0;width:100%;height:100%}#wheel.down{zoom:1.55;top:25%}#ng-wheel-canvas,#wheel-canvas-stop{z-index:2;position:absolute}#wheel-canvas-stop{z-index:3}#wheel-canvas-stop.down{top:15%}#container{width:100%;height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-flow:column nowrap;text-align:center}#container.down{height:90%;overflow:hidden}#wheelwrap-canvas{z-index:1;position:absolute}"]
                }] }
    ];
    SpinTheWheelComponent.propDecorators = {
        slices: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        spinDuration: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        wheelImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        pointerImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        classPosition: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        slotToLand: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        canvasEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['canvas', { static: true },] }],
        canvasArrowEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['arrow', { static: true },] }],
        canvasWheelWrapEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['wheelWrap', { static: true },] }],
        wheelEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['wheel', { static: true },] }],
        containerEl: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['container', { static: true },] }]
    };
    return SpinTheWheelComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} vouchSvc
 * @return {?}
 */
function gameServiceFactory(http, config, vouchSvc) {
    // Make decision on what to instantiate base on config
    if (config.isWhistler) {
        return new WhistlerGameService(http, config, vouchSvc);
    }
    return new V4GameService(http, config);
}
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        ShakeTreeComponent,
                        PinataComponent,
                        ScratchCardComponent,
                        SpinTheWheelComponent,
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    providers: [
                        {
                            provide: IGameService,
                            useFactory: gameServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, IVoucherService]
                        }
                    ],
                    exports: [
                        ShakeTreeComponent,
                        PinataComponent,
                        ScratchCardComponent,
                        SpinTheWheelComponent,
                    ]
                },] }
    ];
    return GameModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var UserProfileComponent = /** @class */ (function () {
    function UserProfileComponent() {
    }
    /**
     * @return {?}
     */
    UserProfileComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    UserProfileComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-user-profile',
                    template: "<ng-container *ngIf=\"profile\">\n    <perx-core-micro-profile [profile]=\"profile\"></perx-core-micro-profile>\n    <div class=\"profile-item\" *ngIf=\"profile.customProperties && profile.customProperties['code']\">\n        <div class=\"profile-item_label\">\n            Player Code\n        </div>\n        <div class=\"profile-item_detail\">\n            {{profile.customProperties['code']}}\n        </div>\n    </div>\n    <div class=\"profile-item\" *ngIf=\"profile.customProperties && profile.customProperties['last_4']\">\n        <div class=\"profile-item_label\">\n            Card Last 4 Digit\n        </div>\n        <div class=\"profile-item_detail\">\n            {{profile.customProperties['last_4']}}\n        </div>\n    </div>\n</ng-container>\n",
                    styles: [":host{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;width:100%}perx-core-micro-profile{margin-bottom:1rem}.profile-item{display:block;width:100%;height:4.4rem;margin:0 0 1rem;padding:0 1rem;background-color:#ebebeb;overflow:hidden;box-sizing:border-box}.profile-item_label{font-size:1.2rem;line-height:2.1rem;color:#7d7d89;white-space:nowrap;text-overflow:ellipsis;width:100%;overflow:hidden}.profile-item_detail{font-size:1.4rem;line-height:2.3rem;color:#1b1b25;white-space:nowrap;text-overflow:ellipsis;width:100%;overflow:hidden}"]
                }] }
    ];
    UserProfileComponent.propDecorators = {
        profile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return UserProfileComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var MicroProfileComponent = /** @class */ (function () {
    function MicroProfileComponent() {
    }
    MicroProfileComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-micro-profile',
                    template: "<div class=\"user\" *ngIf=\"profile\">\n    <mat-icon class=\"user-icon\">account_circle</mat-icon>\n    <p class=\"name\">{{profile.lastName}}</p>\n</div>",
                    styles: [".user{display:-webkit-box;display:flex;-webkit-box-align:center;align-items:center}.user-icon{font-size:4.4rem;height:4.4rem;width:4.4rem}.name{-webkit-box-flex:1;flex-grow:1;text-align:left;font-size:1.8rem;font-weight:500;margin-left:1rem}"]
                }] }
    ];
    MicroProfileComponent.propDecorators = {
        profile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return MicroProfileComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerProfileService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(WhistlerProfileService, _super);
    function WhistlerProfileService(http, config, tokenStorage) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.tokenStorage = tokenStorage;
        _this.apiHost = (/** @type {?} */ (config.apiHost));
        return _this;
    }
    /**
     * @param {?} profile
     * @return {?}
     */
    WhistlerProfileService.WhistlerProfileToProfile = /**
     * @param {?} profile
     * @return {?}
     */
    function (profile) {
        return {
            id: +profile.id,
            identifier: profile.attributes.primary_identifier,
            firstName: profile.attributes.first_name || '',
            lastName: profile.attributes.last_name || '',
            phone: profile.attributes.phone_number || '',
            email: profile.attributes.email_address || '',
            joinedDate: profile.attributes.created_at // not sure correct?
        };
    };
    /**
     * @return {?}
     */
    WhistlerProfileService.prototype.whoAmI = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var pi = this.tokenStorage.getAppInfoProperty('pi');
        /** @type {?} */
        var url = this.apiHost + "/cognito/users";
        /** @type {?} */
        var params = {};
        if (pi) {
            params['filter[primary_identifier]'] = pi;
        }
        return this.http.get(url, { params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.data.length > 0) {
                return res.data[0];
            }
            throw new Error("There is no user with pi '" + pi + "'");
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} JsonApiUser
         * @return {?}
         */
        function (JsonApiUser) { return WhistlerProfileService.WhistlerProfileToProfile(JsonApiUser); })));
    };
    /**
     * @return {?}
     */
    WhistlerProfileService.prototype.setCustomProperties = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    /**
     * @return {?}
     */
    WhistlerProfileService.prototype.getCustomProperties = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    /**
     * @return {?}
     */
    WhistlerProfileService.prototype.updateUserInfo = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    /**
     * @return {?}
     */
    WhistlerProfileService.prototype.setCardNumber = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Not implement yet');
    };
    WhistlerProfileService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerProfileService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config },
        { type: TokenStorage }
    ]; };
    /** @nocollapse */ WhistlerProfileService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerProfileService_Factory() { return new WhistlerProfileService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(TokenStorage)); }, token: WhistlerProfileService, providedIn: "root" });
    return WhistlerProfileService;
}(ProfileService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} tokenStorage
 * @return {?}
 */
function profileServiceFactory(http, config, tokenStorage) {
    // Make decision on what to instantiate base on config
    if (config.isWhistler) {
        return new WhistlerProfileService(http, config, tokenStorage);
    }
    return new V4ProfileService(http, config);
}
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"]
                    ],
                    providers: [
                        {
                            provide: ProfileService,
                            useFactory: profileServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, TokenStorage]
                        }
                    ],
                    declarations: [UserProfileComponent, MicroProfileComponent],
                    exports: [UserProfileComponent, MicroProfileComponent]
                },] }
    ];
    return ProfileModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
LoyaltyService = /** @class */ (function () {
    function LoyaltyService() {
    }
    return LoyaltyService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_PAGE_COUNT = 10;
/**
 * @record
 */
function IV4Meta$1() { }
if (false) {}
/**
 * @record
 */
function IV4AgingPoints() { }
if (false) {}
/**
 * @record
 */
function IV4Loyalty() { }
if (false) {}
/**
 * @record
 */
function IV4GetLoyaltiesResponse() { }
if (false) {}
/**
 * @record
 */
function IV4GetLoyaltyResponse() { }
if (false) {}
/**
 * @record
 */
function IV4PointHistory() { }
if (false) {}
/**
 * @record
 */
function IV4RewardTransactionHistory() { }
if (false) {}
/**
 * @record
 */
function IV4PurchaseTransactionHistory() { }
if (false) {}
/**
 * @record
 */
function IV4TransactionHistory() { }
if (false) {}
/**
 * @record
 */
function IV4TransactionHistoryResponse() { }
if (false) {}
var V4LoyaltyService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4LoyaltyService, _super);
    function V4LoyaltyService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.historyMeta = {};
        _this.apiHost = (/** @type {?} */ (config.apiHost));
        return _this;
    }
    /**
     * @param {?} loyalty
     * @return {?}
     */
    V4LoyaltyService.v4LoyaltyToLoyalty = /**
     * @param {?} loyalty
     * @return {?}
     */
    function (loyalty) {
        return {
            id: loyalty.id,
            name: loyalty.name,
            description: loyalty.description,
            beginDate: loyalty.begins_at,
            endDate: loyalty.ends_at,
            membershipTierName: loyalty.current_membership_tier_name,
            membershipIdentifier: loyalty.membership_number,
            pointsBalance: loyalty.points_balance,
            currencyBalance: loyalty.points_balance_converted_to_currency,
            currency: loyalty.points_currency,
            expiringPoints: loyalty.aging_points && loyalty.aging_points.map((/**
             * @param {?} aging
             * @return {?}
             */
            function (aging) { return ({
                expireDate: aging.expiring_on_date,
                points: aging.points_expiring
            }); }))
        };
    };
    /**
     * @param {?} pointHistory
     * @return {?}
     */
    V4LoyaltyService.v4PointHistoryToPointHistory = /**
     * @param {?} pointHistory
     * @return {?}
     */
    function (pointHistory) {
        return {
            id: pointHistory.id,
            name: pointHistory.name,
            points: pointHistory.points,
            pointsBalance: pointHistory.points_balance,
            currencyBalance: pointHistory.points_balance_converted_to_currency,
            earnedDate: pointHistory.points_date,
            properties: pointHistory.properties
        };
    };
    /**
     * @param {?} transactionHistory
     * @return {?}
     */
    V4LoyaltyService.v4TransactionHistoryToTransactionHistory = /**
     * @param {?} transactionHistory
     * @return {?}
     */
    function (transactionHistory) {
        /** @type {?} */
        var transactionDetails = Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(transactionHistory).transaction_details.data();
        /** @type {?} */
        var data;
        if (transactionDetails) {
            switch (transactionHistory.transaction_details.type) {
                case "Reward::Transaction" /* reward */:
                    /** @type {?} */
                    var rthDetails = (/** @type {?} */ (transactionDetails));
                    data = {
                        id: transactionDetails.id,
                        state: rthDetails.state,
                        voucherExpiry: rthDetails.voucher_expires_at,
                        userAccount: rthDetails.user_account.identifier,
                        rewardName: rthDetails.reward.name,
                        redemptionLocation: rthDetails.redemption_location,
                    };
                    break;
                case "Transaction" /* transaction */:
                    /** @type {?} */
                    var pthDetails = (/** @type {?} */ (transactionDetails));
                    /** @type {?} */
                    var pthProps = (/** @type {?} */ (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(pthDetails).properties()));
                    data = {
                        id: transactionDetails.id,
                        productName: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(pthProps).product(),
                        pharmacyName: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(pthProps).pharmacy(),
                        issuerName: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(pthProps).merchant_username(),
                        transactionDate: pthDetails.transaction_date,
                        transactionRef: pthDetails.transaction_reference,
                        price: pthDetails.amount,
                        currency: pthDetails.currency,
                    };
                    break;
            }
        }
        return {
            id: transactionHistory.id,
            name: transactionHistory.name,
            identifier: transactionHistory.identifier,
            transactedAt: transactionHistory.transacted_at,
            pointsAmount: transactionHistory.amount,
            properties: transactionHistory.properties,
            transactionDetails: {
                type: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(transactionHistory).transaction_details.type(),
                data: data
            }
        };
    };
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    V4LoyaltyService.prototype.getLoyalties = /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    function (page, pageSize, locale) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = DEFAULT_PAGE_COUNT; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/loyalty", {
            headers: headers,
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} loyalties
         * @return {?}
         */
        function (loyalties) { return loyalties.map((/**
         * @param {?} loyalty
         * @return {?}
         */
        function (loyalty) { return V4LoyaltyService.v4LoyaltyToLoyalty(loyalty); })); })));
    };
    /**
     * @param {?=} id
     * @param {?=} locale
     * @return {?}
     */
    V4LoyaltyService.prototype.getLoyalty = /**
     * @param {?=} id
     * @param {?=} locale
     * @return {?}
     */
    function (id, locale) {
        if (id === void 0) { id = 1; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/loyalty/" + id, {
            headers: headers
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4LoyaltyService.v4LoyaltyToLoyalty(res.data); })));
    };
    /**
     * @param {?=} loyaltyId
     * @param {?=} locale
     * @return {?}
     */
    V4LoyaltyService.prototype.getAllTransactions = /**
     * @param {?=} loyaltyId
     * @param {?=} locale
     * @return {?}
     */
    function (loyaltyId, locale) {
        var _this = this;
        if (loyaltyId === void 0) { loyaltyId = 1; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var pageSize = 100;
        return this.getTransactions(loyaltyId, 1, pageSize, locale).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} histories
         * @return {?}
         */
        function (histories) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(histories)
            ];
            for (var i = 2; i <= ((_this.historyMeta && _this.historyMeta.total_pages) ? _this.historyMeta.total_pages : 0); i++) {
                /** @type {?} */
                var stream = _this.getTransactions((loyaltyId ? loyaltyId : 1), i, pageSize);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["concatAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["reduce"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []));
    };
    /**
     * @param {?} loyaltyId
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    V4LoyaltyService.prototype.getTransactions = /**
     * @param {?} loyaltyId
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    function (loyaltyId, page, pageSize, locale) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/loyalty/" + loyaltyId + "/transactions", {
            headers: headers,
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.meta) {
                _this.historyMeta = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.historyMeta, res.meta);
            }
            return res.data;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} loyalty
         * @return {?}
         */
        function (loyalty) { return Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(loyalty).points_history([]).map((/**
         * @param {?} history
         * @return {?}
         */
        function (history) { return V4LoyaltyService.v4PointHistoryToPointHistory(history); })); })));
    };
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    V4LoyaltyService.prototype.getTransactionHistory = /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} locale
     * @return {?}
     */
    function (page, pageSize, locale) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        if (locale === void 0) { locale = 'en'; }
        /** @type {?} */
        var headers = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]().set('Accept-Language', locale);
        return this.http.get(this.apiHost + "/v4/loyalty/transactions_history", {
            headers: headers,
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} transactionHistories
         * @return {?}
         */
        function (transactionHistories) { return transactionHistories.map((/**
         * @param {?} transactionHistory
         * @return {?}
         */
        function (transactionHistory) { return V4LoyaltyService.v4TransactionHistoryToTransactionHistory(transactionHistory); })); })));
    };
    V4LoyaltyService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4LoyaltyService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] }
    ]; };
    /** @nocollapse */ V4LoyaltyService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4LoyaltyService_Factory() { return new V4LoyaltyService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config, 8)); }, token: V4LoyaltyService, providedIn: "root" });
    return V4LoyaltyService;
}(LoyaltyService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoyaltySummaryComponent = /** @class */ (function () {
    function LoyaltySummaryComponent(profileService, loyaltyService, datePipe) {
        this.profileService = profileService;
        this.loyaltyService = loyaltyService;
        this.datePipe = datePipe;
    }
    /**
     * @return {?}
     */
    LoyaltySummaryComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.subTitleFn) {
            this.subTitleFn = (/**
             * @return {?}
             */
            function () { return "Your total points as of " + _this.datePipe.transform(new Date(), 'mediumDate'); });
        }
        if (!this.titleFn) {
            this.titleFn = (/**
             * @param {?=} profile
             * @return {?}
             */
            function (profile) {
                if (profile && profile.firstName) {
                    return "Welcome " + profile.firstName;
                }
                if (profile && profile.lastName) {
                    return "Welcome " + profile.lastName;
                }
                return 'Welcome';
            });
        }
        if (!this.summaryExpiringFn) {
            this.summaryExpiringFn = (/**
             * @param {?} loyalty
             * @return {?}
             */
            function (loyalty) {
                /** @type {?} */
                var expiringPoints = loyalty && loyalty.expiringPoints && loyalty.expiringPoints.length ? loyalty.expiringPoints[0] : null;
                return expiringPoints && expiringPoints.expireDate && expiringPoints.points !== 0 ?
                    expiringPoints.points + " points will expire on " + _this.datePipe.transform(expiringPoints.expireDate, 'mediumDate') : '';
            });
        }
        if (!this.profile$) {
            this.profile$ = this.profileService.whoAmI();
        }
        if (!this.loyalty$) {
            this.loyalty$ = this.loyaltyId === undefined ?
                this.loyaltyService.getLoyalties().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
                 * @param {?} loyalties
                 * @return {?}
                 */
                function (loyalties) { return loyalties && loyalties.length > 0; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
                 * @param {?} loyalties
                 * @return {?}
                 */
                function (loyalties) { return loyalties[0]; }))) : this.loyaltyService.getLoyalty(this.loyaltyId);
        }
    };
    LoyaltySummaryComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-loyalty-summary',
                    template: "<div class=\"container\">\n  <ng-container *ngIf=\"profile$ | async as profile; else elseBlockProfile\">\n    <div class=\"welcome-text\">\n      <ng-container>\n        {{titleFn(profile)}}\n      </ng-container>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"loyalty$ | async as loyalty; else elseBlockLoyalty\">\n    <div class=\"points\">\n      {{loyalty.pointsBalance ? loyalty.pointsBalance.toLocaleString('en-sg') : 0 }}\n    </div>\n    <div>\n      {{subTitleFn(loyalty)}}\n    </div>\n    <div class=\"expiring-points\">\n      {{summaryExpiringFn(loyalty)}}\n    </div>\n  </ng-container>\n\n  <ng-template #elseBlockProfile>\n    <div class=\"welcome-text ghost\"></div>\n  </ng-template>\n\n  <ng-template #elseBlockLoyalty>\n    <div class=\"points ghost\"></div>\n    <div class=\"expiring-points ghost\"></div>\n  </ng-template>\n</div>\n",
                    styles: [".container{font-size:1.2rem;padding:1.6rem;line-height:2.1rem}.welcome-text{font-size:1.4rem;font-weight:900;line-height:1.7rem}.points{font-size:4rem;font-weight:900;line-height:4.8rem}.expiring-points{color:rgba(0,0,0,.5)}.points.ghost{height:4.8rem}.welcome-text.ghost{height:1.7rem}.expiring-points.ghost{height:2.1rem}"]
                }] }
    ];
    /** @nocollapse */
    LoyaltySummaryComponent.ctorParameters = function () { return [
        { type: ProfileService },
        { type: LoyaltyService },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"] }
    ]; };
    LoyaltySummaryComponent.propDecorators = {
        loyaltyId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        profile$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['profile',] }],
        loyalty$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['loyalty',] }],
        subTitleFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        titleFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        summaryExpiringFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return LoyaltySummaryComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var TransactionPipe = /** @class */ (function () {
    function TransactionPipe() {
    }
    /**
     * @param {?} value
     * @return {?}
     */
    TransactionPipe.prototype.transform = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        return Math.abs(value) + " Points " + (value < 0 ? 'spent' : 'earned');
    };
    TransactionPipe.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"], args: [{ name: 'transaction' },] }
    ];
    return TransactionPipe;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LoyaltyTransactionsListComponent = /** @class */ (function () {
    function LoyaltyTransactionsListComponent(datePipe, transactionPipe) {
        this.datePipe = datePipe;
        this.transactionPipe = transactionPipe;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    LoyaltyTransactionsListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (!this.titleFn) {
            this.titleFn = (/**
             * @param {?} tr
             * @return {?}
             */
            function (tr) { return "" + tr.name; });
        }
        if (!this.descFn) {
            this.descFn = (/**
             * @return {?}
             */
            function () { return ''; });
        }
        if (!this.subTitleFn) {
            this.subTitleFn = (/**
             * @param {?} tr
             * @return {?}
             */
            function (tr) { return "" + _this.datePipe.transform(tr.earnedDate, 'shortDate'); });
        }
        if (!this.priceLabelFn) {
            this.priceLabelFn = (/**
             * @param {?} tr
             * @return {?}
             */
            function (tr) { return "" + _this.transactionPipe.transform(tr.points); });
        }
    };
    LoyaltyTransactionsListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-loyalty-transactions-list',
                    template: "<ng-container *ngIf=\"transactions$ | async as transactions\">\n  <div *ngFor=\"let transaction of transactions\" class=\"transaction\">\n    <div class=\"transaction-info\">\n      <div class=\"transaction-name\">\n        {{titleFn(transaction)}}\n      </div>\n      <div class=\"transaction-description\">\n        {{descFn(transaction)}}\n      </div>\n      <div class=\"transaction-point\">\n        {{transaction.points}} {{priceLabelFn(transaction)}}\n      </div>\n    </div>\n    <div class=\"transaction-date\">\n      {{subTitleFn(transaction)}}\n    </div>\n  </div>\n</ng-container>\n",
                    styles: ["cdk-virtual-scroll-viewport{height:100%}.transaction{display:-webkit-box;display:flex;border-bottom:1px solid rgba(0,0,0,.12);height:10rem;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-align:stretch;align-items:stretch;box-sizing:border-box;padding:1.6rem;position:relative}.transaction-info{-webkit-box-flex:2;flex:2 1 0;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:justify;justify-content:space-between}.transaction-name{font-style:normal;font-size:1.4rem;line-height:1.7rem;font-weight:900;font-family:Lato,sans-serif;color:#1b1b25}.transaction-description{font-size:1.2rem;line-height:2.1rem}.transaction-point{font-style:normal;font-weight:400;font-size:1.2rem;line-height:1.4rem;letter-spacing:.2px;margin-top:1.6rem;font-family:Lato,sans-serif;color:#666}.transaction-date{-webkit-box-flex:1;flex:1 1 0;font-style:normal;font-weight:400;font-size:1.2rem;line-height:1.4rem;text-align:right;letter-spacing:.2px;font-family:Lato,sans-serif;color:#1b1b25}"]
                }] }
    ];
    /** @nocollapse */
    LoyaltyTransactionsListComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"] },
        { type: TransactionPipe }
    ]; };
    LoyaltyTransactionsListComponent.propDecorators = {
        transactions$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['transactions',] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        titleFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        descFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        subTitleFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        priceLabelFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return LoyaltyTransactionsListComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var DEFAULT_PAGE_COUNT$1 = 10;
var WhistlerLoyaltyService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(WhistlerLoyaltyService, _super);
    function WhistlerLoyaltyService(http, config, authService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.authService = authService;
        _this.hostName = (/** @type {?} */ (config.apiHost));
        return _this;
    }
    // Each program may have multiple cards, here only take first one
    // Each program may have multiple cards, here only take first one
    /**
     * @param {?} loyalty
     * @param {?} userId
     * @param {?=} cards
     * @return {?}
     */
    WhistlerLoyaltyService.WLoyaltyToLoyalty = 
    // Each program may have multiple cards, here only take first one
    /**
     * @param {?} loyalty
     * @param {?} userId
     * @param {?=} cards
     * @return {?}
     */
    function (loyalty, userId, cards) {
        /** @type {?} */
        var card = cards && cards.find((/**
         * @param {?} cardTemp
         * @return {?}
         */
        function (cardTemp) {
            return cardTemp.type === 'cards' && cardTemp.attributes.user_id === userId &&
                ((/** @type {?} */ (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(loyalty).relationships.cards.data([]))))
                    .filter((/**
                 * @param {?} rCard
                 * @return {?}
                 */
                function (rCard) { return rCard.type === 'cards' && rCard.id === cardTemp.id; })).length > 0;
        }));
        return {
            id: Number.parseInt(loyalty.id, 10),
            name: loyalty.attributes.name,
            pointsBalance: card && card.attributes.balance || 0,
            cardId: card && Number.parseInt(card.id, 10)
        };
    };
    // Here has multiple programs found, will only take the first one in app. Will find the mapping logic later to have multiple programs
    // Here has multiple programs found, will only take the first one in app. Will find the mapping logic later to have multiple programs
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    WhistlerLoyaltyService.prototype.getLoyalties = 
    // Here has multiple programs found, will only take the first one in app. Will find the mapping logic later to have multiple programs
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    function (page, pageSize) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = DEFAULT_PAGE_COUNT$1; }
        /** @type {?} */
        var userId = this.authService.getUserId() || 0;
        return this.http.get(this.hostName + "/loyalty/programs", {
            params: {
                'page[number]': page.toString(),
                'page[size]': pageSize.toString(),
                include: 'cards'
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} loyalty
         * @return {?}
         */
        function (loyalty) {
            return loyalty.data.map((/**
             * @param {?} res
             * @return {?}
             */
            function (res) { return WhistlerLoyaltyService.WLoyaltyToLoyalty(res, userId, loyalty.included); }));
        })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?=} id
     * @param {?=} locale
     * @return {?}
     */
    WhistlerLoyaltyService.prototype.getLoyalty = 
    // @ts-ignore
    /**
     * @param {?=} id
     * @param {?=} locale
     * @return {?}
     */
    function (id, locale) {
        // if there is no id, query for the user's list of loyalties and return the first one
        if (!id) {
            return this.getLoyalties()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
             * @param {?} loyalties
             * @return {?}
             */
            function (loyalties) { return loyalties.length > 0; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
             * @param {?} loyalties
             * @return {?}
             */
            function (loyalties) { return loyalties[0]; })));
        }
        /** @type {?} */
        var userId = this.authService.getUserId() || 0;
        return this.http.get(this.hostName + "/loyalty/programs/" + id + "?include=cards").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return WhistlerLoyaltyService.WLoyaltyToLoyalty(res.data, userId, res.included); })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?=} loyaltyId
     * @return {?}
     */
    WhistlerLoyaltyService.prototype.getAllTransactions = 
    // @ts-ignore
    /**
     * @param {?=} loyaltyId
     * @return {?}
     */
    function (loyaltyId) {
        throw new Error('Not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} loyaltyId
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    WhistlerLoyaltyService.prototype.getTransactions = 
    // @ts-ignore
    /**
     * @param {?} loyaltyId
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    function (loyaltyId, page, pageSize) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        throw new Error('Not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    WhistlerLoyaltyService.prototype.getTransactionHistory = 
    // @ts-ignore
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    function (page, pageSize) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 10; }
        throw new Error('Not implemented.');
    };
    WhistlerLoyaltyService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerLoyaltyService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config },
        { type: AuthenticationService }
    ]; };
    /** @nocollapse */ WhistlerLoyaltyService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerLoyaltyService_Factory() { return new WhistlerLoyaltyService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(AuthenticationService)); }, token: WhistlerLoyaltyService, providedIn: "root" });
    return WhistlerLoyaltyService;
}(LoyaltyService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} auth
 * @return {?}
 */
function loyaltyServiceFactory(http, config, auth) {
    // Make decision on what to instantiate base on config
    if (config.isWhistler) {
        return new WhistlerLoyaltyService(http, config, auth);
    }
    return new V4LoyaltyService(http, config);
}
var LoyaltyModule = /** @class */ (function () {
    function LoyaltyModule() {
    }
    LoyaltyModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        TransactionPipe,
                        LoyaltySummaryComponent,
                        LoyaltyTransactionsListComponent
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                    ],
                    exports: [
                        LoyaltySummaryComponent,
                        LoyaltyTransactionsListComponent
                    ],
                    providers: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["DatePipe"],
                        TransactionPipe,
                        {
                            provide: LoyaltyService,
                            useFactory: loyaltyServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, AuthenticationService]
                        }
                    ]
                },] }
    ];
    return LoyaltyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var Colors = {
    Primary: '#007bff',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RewardsCollectionComponent = /** @class */ (function () {
    function RewardsCollectionComponent(themesService) {
        this.themesService = themesService;
        this.repeatGhostCount = 10;
        this.colorPrimary = Colors.Primary;
        this.theme = null;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(RewardsCollectionComponent.prototype, "themeFontColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this.theme ? this.theme.properties['--font_color'] : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    RewardsCollectionComponent.prototype.initTheme = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.themesService.getThemeSetting().subscribe((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return _this.theme = theme; }));
    };
    /**
     * @return {?}
     */
    RewardsCollectionComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initTheme();
        if (!this.displayPriceFn) {
            this.displayPriceFn = (/**
             * @param {?} rewardPrice
             * @return {?}
             */
            function (rewardPrice) {
                if (rewardPrice.price && rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points && rewardPrice.points > 0) {
                    return rewardPrice.points + " points";
                }
                return '0 points'; // is actually 0 or invalid value default
            });
        }
    };
    /**
     * @param {?} reward
     * @return {?}
     */
    RewardsCollectionComponent.prototype.rewardClickedHandler = /**
     * @param {?} reward
     * @return {?}
     */
    function (reward) {
        this.tapped.emit(reward);
    };
    RewardsCollectionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-rewards-collection',
                    template: "<div [class]=\" rewards$ ? 'card-collection-container' : 'card-collection-container loading'\">\n  <ng-container *ngIf=\"rewards$ | async as rewards; else elseBlock\">\n    <mat-card matRipple *ngFor=\"let reward of rewards\" (click)=\"rewardClickedHandler(reward)\">\n      <img mat-card-image *ngIf=\"reward.rewardThumbnail || defaultImg\" [class.no-image]=\"!reward.rewardThumbnail\"\n        [src]=\"reward.rewardThumbnail || defaultImg\" />\n      <div class=\"no-default-img\" mat-card-image *ngIf=\"!reward.rewardThumbnail && !defaultImg\">\n        <svg width=\"375\" height=\"200\" viewBox=\"0 0 375 200\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M0 0H375V200H0V0Z\" fill=\"#4E4E4E\" />\n          <path\n            d=\"M190.4 90.1401L184.5 98.0001L189 104C189.66 104.88 189.48 106.14 188.6 106.8C187.72 107.46 186.46 107.3 185.8 106.4C183.7 103.6 181.18 100.26 179.6 98.1201C178.8 97.0601 177.2 97.0601 176.4 98.1201L168.4 108.78C167.42 110.12 168.36 112 170 112H206C207.64 112 208.58 110.12 207.6 108.8L193.6 90.1401C192.8 89.0601 191.2 89.0601 190.4 90.1401Z\"\n            fill=\"white\" />\n        </svg>\n      </div>\n      <mat-card-content>\n        <div class=\"subtitle-1\" ngxEllipsis [lines]=\"1\">{{reward.name}}</div>\n        <!--\n        have to repeat div declaration because the directive reads the\n        dom to insert ellipsis and will otherwise render angular logic code\n        -->\n        <div class=\"description mat-caption\"\n          ngxEllipsis\n          [lines]=\"2\"\n          *ngIf=\"reward.merchantName; else showDescription\">\n          {{reward.merchantName}}\n        </div>\n        <ng-template #showDescription>\n          <div *ngIf=\"reward.description\">\n            <div class=\"description mat-caption\"> {{reward.description | slice: 0 : 16}}</div>\n            <div class=\"description mat-caption overflow-text\" *ngIf=\"reward.description.length > 16\">\n              {{ reward.description | slice : 16 }}</div>\n          </div>\n        </ng-template>\n        <div\n          *ngIf=\"reward.rewardPrice && reward.rewardPrice.length > 0\"\n          class=\"points overline\"\n          [ngStyle]=\"{'color': themeFontColor ? themeFontColor : colorPrimary}\"\n        >\n          <div *ngFor=\"let rewardPrice of reward.rewardPrice\">\n            {{displayPriceFn(rewardPrice)}}</div>\n        </div>\n      </mat-card-content>\n    </mat-card>\n  </ng-container>\n  <ng-template #elseBlock>\n    <mat-card *perxCoreRepeatTimes=\"repeatGhostCount\">\n      <div class=\"img-placeholder ghost\"></div>\n      <mat-card-content>\n        <div class=\"subtitle-1 ghost\"></div>\n        <div class=\"description mat-caption ghost\"></div>\n        <div class=\"points overline ghost\"></div>\n      </mat-card-content>\n    </mat-card>\n  </ng-template>\n</div>\n",
                    styles: [".mat-caption{line-height:1.6rem;color:#666}.overline{font-size:1rem;line-height:1.6rem;color:#666}.subtitle-1{font-weight:500;font-size:1.6rem;line-height:2.4rem;color:#212121}.ghost{background:#ededed}.mat-card-content .title{-webkit-box-flex:0;flex:0 auto;margin:0 0 .5rem;color:#212121}.mat-card-content .description{-webkit-box-flex:1;flex:1}.mat-card-content .points{-webkit-box-flex:0;flex:0 auto;position:absolute;bottom:.8rem;font-size:1rem;line-height:1.2rem;min-height:1.2rem;color:#ddac27;white-space:nowrap}.card-collection-container.loading,.card-collection-container.loading .ghost{overflow:hidden}.card-collection-container.loading .img-placeholder{min-height:calc(100px - .8rem);margin-bottom:.8rem}.card-collection-container.loading .subtitle-1{height:1.5rem;margin-bottom:.5rem}.card-collection-container.loading .points{height:1.2rem;margin-top:.9rem}.card-collection-container{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;overflow-x:auto;padding:1.5rem 0}.card-collection-container .mat-card{max-width:calc(200px - 32px);width:calc(200px - 32px);min-width:calc(200px - 32px);height:calc(200px - 24px);min-height:calc(200px - 24px);display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;padding-bottom:8px;margin:0 1rem}.card-collection-container .mat-card img.mat-card-image{width:auto;height:100px;max-height:100px;margin-bottom:.8rem;-o-object-fit:cover;object-fit:cover}.card-collection-container .mat-card .mat-card-content{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.card-collection-container .no-image{background-color:#4e4e4e}.card-collection-container .no-default-img{display:-webkit-box;display:flex;margin-bottom:.8rem}.card-collection-container .no-default-img svg{height:10rem;background:#4e4e4e}.card-collection-container .overflow-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
                }] }
    ];
    /** @nocollapse */
    RewardsCollectionComponent.ctorParameters = function () { return [
        { type: ThemesService }
    ]; };
    RewardsCollectionComponent.propDecorators = {
        rewards$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['rewardsList',] }],
        defaultImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        displayPriceFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return RewardsCollectionComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RewardsListComponent = /** @class */ (function () {
    function RewardsListComponent(themesService) {
        this.themesService = themesService;
        this.repeatGhostCount = 10;
        this.theme = null;
        this.colorPrimary = Colors.Primary;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    Object.defineProperty(RewardsListComponent.prototype, "themeFontColor", {
        get: /**
         * @return {?}
         */
        function () {
            return this.theme ? this.theme.properties['--font_color'] : null;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @private
     * @return {?}
     */
    RewardsListComponent.prototype.initTheme = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        this.themesService.getThemeSetting().subscribe((/**
         * @param {?} theme
         * @return {?}
         */
        function (theme) { return _this.theme = theme; }));
    };
    /**
     * @return {?}
     */
    RewardsListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.initTheme();
        if (!this.displayPriceFn) {
            this.displayPriceFn = (/**
             * @param {?} rewardPrice
             * @return {?}
             */
            function (rewardPrice) {
                if (rewardPrice.price && rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points && rewardPrice.points > 0) {
                    return rewardPrice.points + " points";
                }
                return '0 points'; // is actually 0 or invalid value default
            });
        }
    };
    /**
     * @param {?} reward
     * @return {?}
     */
    RewardsListComponent.prototype.rewardClickedHandler = /**
     * @param {?} reward
     * @return {?}
     */
    function (reward) {
        this.tapped.emit(reward);
    };
    RewardsListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-rewards-list',
                    template: "<div [class]=\" rewards$ ? 'card-list-container' : 'card-list-container loading'\">\n  <div *ngIf=\"rewards$; then thenBlock else elseBlock\"></div>\n  <ng-template #thenBlock>\n    <ng-container *ngIf=\"rewards$ | async as rewards\">\n      <mat-card matRipple *ngFor=\"let reward of rewards\" (click)=\"rewardClickedHandler(reward)\">\n        <div class=\"reward-content\">\n          <div class=\"reward-img__wrapper\">\n            <img *ngIf=\"reward.rewardThumbnail || defaultImg\"\n              [class.no-image]=\"!reward.rewardThumbnail\"\n              [src]=\"reward.rewardThumbnail || defaultImg\" />\n            <div *ngIf=\"!reward.rewardThumbnail && !defaultImg\">\n              <svg width=\"375\" height=\"200\" viewBox=\"0 0 375 200\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M0 0H375V200H0V0Z\" fill=\"#4E4E4E\" />\n                <path\n                  d=\"M190.4 90.1401L184.5 98.0001L189 104C189.66 104.88 189.48 106.14 188.6 106.8C187.72 107.46 186.46 107.3 185.8 106.4C183.7 103.6 181.18 100.26 179.6 98.1201C178.8 97.0601 177.2 97.0601 176.4 98.1201L168.4 108.78C167.42 110.12 168.36 112 170 112H206C207.64 112 208.58 110.12 207.6 108.8L193.6 90.1401C192.8 89.0601 191.2 89.0601 190.4 90.1401Z\"\n                  fill=\"white\" />\n              </svg>\n            </div>\n          </div>\n          <div class=\"reward-preview-details\">\n            <h1>{{ reward.name }}</h1>\n            <div class=\"description\" *ngIf=\"reward.merchantName; else showDescription\">\n              {{reward.merchantName}}\n            </div>\n            <ng-template #showDescription>\n              <div class=\"description\" ellipsis>\n                {{reward.description}}\n              </div>\n            </ng-template>\n            <div\n              class=\"reward-price-details\"\n              [ngStyle]=\"{'color': themeFontColor ? themeFontColor : colorPrimary}\"\n            >\n              <div *ngIf=\"reward.rewardPrice && reward.rewardPrice.length > 0\">\n                <div *ngFor=\"let rewardPrice of reward.rewardPrice\">\n                  {{displayPriceFn(rewardPrice)}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </mat-card>\n    </ng-container>\n  </ng-template>\n  <ng-template #elseBlock>\n    <mat-card *perxCoreRepeatTimes=\"repeatGhostCount\">\n      <div class=\"reward-content\">\n        <div class=\"reward-img__wrapper\">\n          <div class=\"img-placeholder ghost\"></div>\n        </div>\n        <div class=\"reward-preview-details\">\n          <div class=\"reward-name ghost\"></div>\n          <div class=\"reward-subtitle ghost\"></div>\n          <div class=\"reward-price-details ghost\"></div>\n        </div>\n      </div>\n    </mat-card>\n  </ng-template>\n</div>\n",
                    styles: [".reward-content{display:-webkit-box;display:flex;flex-basis:auto;-webkit-box-flex:1;flex-grow:1;-webkit-box-pack:start;justify-content:flex-start;height:100%}.reward-content .reward-img__wrapper{-webkit-box-flex:0;flex:0 0 10.5rem;height:10.5rem;width:10.5rem;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center;overflow:hidden}.reward-content .reward-img__wrapper img{margin:auto;height:10.5rem}.reward-content .reward-img__wrapper .no-image{background-color:#4e4e4e}.reward-content .reward-img__wrapper svg{height:10.5rem;background:#4e4e4e}.reward-content .reward-preview-details{font-size:1.4rem;display:-webkit-box;display:flex;margin:1.6rem 0 1.6rem .8rem;padding-left:0;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-flex:1;flex:1}.reward-content .reward-preview-details:nth-child(1){margin-top:0}.reward-content .reward-preview-details h1{font-size:1.6rem;line-height:1.6rem;padding:0;font-weight:500;margin:4px 0}.reward-content .reward-preview-details p{font-size:1.2rem;line-height:1.6rem;min-height:1.6rem;margin:4px 0;padding:0}.reward-content .reward-preview-details .description{height:100%;width:70%;font-size:1.2rem}.reward-content .reward-preview-details .reward-price-details{font-size:1rem;line-height:1.4rem;min-height:1.4rem;color:#ddac27;align-content:flex-end;margin-top:auto}.card-list-container{padding:0 .2rem}.card-list-container.loading,.card-list-container.loading .ghost{overflow:hidden}.card-list-container.loading .reward-content .reward-img__wrapper .img-placeholder{height:100%;width:100%}.card-list-container.loading .reward-content .reward-preview-details .reward-name,.card-list-container.loading .reward-content .reward-preview-details .reward-subtitle{height:1.6rem;margin:.4rem 0}.card-list-container.loading .reward-content .reward-preview-details .reward-price-details{height:1.4rem}mat-card{margin:1.2rem 0;display:-webkit-box;display:flex;padding:0;-webkit-box-flex:0;flex:0 0 10.5rem;height:10.5rem;cursor:pointer;-webkit-box-align:center;align-items:center;-webkit-box-pack:justify;justify-content:space-between}mat-card.disabled{background-color:#ebebeb;pointer-events:none;opacity:.5}.badge-warn{background-color:rgba(228,39,19,.1);padding:2px 4px;font-size:1.2rem;border-radius:8px}"]
                }] }
    ];
    /** @nocollapse */
    RewardsListComponent.ctorParameters = function () { return [
        { type: ThemesService }
    ]; };
    RewardsListComponent.propDecorators = {
        rewards$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['rewardsList',] }],
        defaultImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        displayPriceFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return RewardsListComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function ITabConfig() { }
if (false) {}
/**
 * @record
 */
function ITabConfigExtended() { }
if (false) {}
var RewardsListTabbedComponent = /** @class */ (function () {
    function RewardsListTabbedComponent() {
        this.tabs$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])([
            {
                filterKey: null,
                filterValue: null,
                tabName: 'All Rewards',
            }
        ]);
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.tabChanged = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.selectedIndex = 0;
    }
    /**
     * @return {?}
     */
    RewardsListTabbedComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        /**
         * todo: check if list exists in this.tabs, and if this.rewards also has an input,
         * throw warning that this.rewards is ignored
         */
        if (!this.displayPriceFn) {
            this.displayPriceFn = (/**
             * @param {?} rewardPrice
             * @return {?}
             */
            function (rewardPrice) {
                if (rewardPrice.price && rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points && rewardPrice.points > 0) {
                    return rewardPrice.points + " points";
                }
                return '0 points'; // is actually 0 or invalid value default
            });
        }
    };
    /**
     * @param {?} tab
     * @return {?}
     */
    RewardsListTabbedComponent.prototype.filterRewards = /**
     * @param {?} tab
     * @return {?}
     */
    function (tab) {
        /** @type {?} */
        var rewardsList = tab.rewardsList || this.rewards;
        if (!rewardsList) {
            throw new Error('Rewards list is empty. Provide a list using [rewards] or [tabs]');
        }
        return rewardsList.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} rewards
         * @return {?}
         */
        function (rewards) {
            if (tab.filterValue === null || tab.filterKey === null) {
                return rewards;
            }
            /** @type {?} */
            var filterValue = tab.filterValue.toLowerCase();
            /** @type {?} */
            var filterBy = tab.filterKey;
            return rewards.filter((/**
             * @param {?} reward
             * @return {?}
             */
            function (reward) { return reward[filterBy] && reward[filterBy].toLowerCase() === filterValue; }));
        })));
    };
    /**
     * @param {?} event
     * @return {?}
     */
    RewardsListTabbedComponent.prototype.tabChangedHandler = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        this.tabChanged.emit(event);
    };
    /**
     * @param {?} reward
     * @return {?}
     */
    RewardsListTabbedComponent.prototype.rewardTappedHandler = /**
     * @param {?} reward
     * @return {?}
     */
    function (reward) {
        // forward the tapped event
        this.tapped.emit(reward);
    };
    RewardsListTabbedComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-rewards-list-tabbed',
                    template: "<div class=\"mat-tab-group-wrapper\">\n  <mat-tab-group [selectedIndex]=\"selectedIndex\"\n                 (selectedTabChange)=\"tabChangedHandler($event)\">\n    <mat-tab *ngFor=\"let tab of tabs$ | async; let index = index\" [label]=\"tab.tabName\">\n      <div *ngIf=\"tab.rewardsList || rewards; then showRewards; else ghostRewards\"></div>\n      <ng-template #showRewards>\n        <perx-core-rewards-list\n          [rewardsList]=\"filterRewards(tab)\"\n          [displayPriceFn]=\"displayPriceFn\"\n          (tapped)=\"rewardTappedHandler($event)\"\n        >\n        </perx-core-rewards-list>\n      </ng-template>\n      <ng-template #ghostRewards>\n        <perx-core-rewards-list></perx-core-rewards-list>\n      </ng-template>\n    </mat-tab>\n  </mat-tab-group>\n</div>\n",
                    styles: [".mat-tab-group-wrapper{min-height:60rem}"]
                }] }
    ];
    RewardsListTabbedComponent.propDecorators = {
        rewards: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tabs$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        displayPriceFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        tabChanged: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return RewardsListTabbedComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RewardComponent = /** @class */ (function () {
    function RewardComponent() {
        this.showRewardIdentifier = false;
        this.showExpiry = true;
        this.descriptionLabel = 'Description';
        this.tncLabel = 'Terms and Conditions';
    }
    /**
     * @return {?}
     */
    RewardComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.displayPriceFn) {
            this.displayPriceFn = (/**
             * @param {?} rewardPrice
             * @return {?}
             */
            function (rewardPrice) {
                if (rewardPrice.price && rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points && rewardPrice.points > 0) {
                    return rewardPrice.points + " points";
                }
                return '0 points'; // is actually 0 or invalid value default
            });
        }
    };
    RewardComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-reward',
                    template: "<ng-container *ngIf=\"reward$ | async as reward\">\n  <div class=\"reward-container\">\n    <div class=\"reward-image-container\" *ngIf=\"reward.rewardBanner\">\n      <img class=\"reward-image\" src=\"{{reward.rewardBanner}}\">\n    </div>\n    <div class=\"merchant-image-container\" *ngIf=\"reward.merchantImg\">\n      <img class=\"merchant-image\" src=\"{{reward.merchantImg}}\">\n    </div>\n    <div class=\"details\">\n      <div class=\"reward-name\">\n        {{reward.name}}\n      </div>\n      <div class=\"merchant-name\">\n        {{reward.merchantName}}\n      </div>\n      <div class=\"reward-subtitle\" *ngIf=\"reward.subtitle\">\n        {{reward.subtitle}}\n      </div>\n      <div class=\"reward-price\" *ngIf=\"reward.rewardPrice && reward.rewardPrice.length > 0\">\n        <div class=\"points-cost\" *ngFor=\"let rewardPrice of reward.rewardPrice; let i = index\">\n          <div *ngIf=\"i > 0\" class=\"or-label\">or</div>\n          <span>{{displayPriceFn(rewardPrice)}}</span><span class=\"points-code\"\n            *ngIf=\"showRewardIdentifier && rewardPrice.identifier\"> (code: {{rewardPrice.identifier}})</span>\n        </div>\n      </div>\n      <div class=\"reward-expiry\" *ngIf=\"showExpiry && reward.validTo !== null\">\n        Expiry: {{reward.validTo | date: 'dd/MM/yyyy'}}\n      </div>\n      <div class=\"section-heading\" *ngIf=\"reward.description\">\n        {{descriptionLabel}}\n      </div>\n      <div class=\"section-content description\" *ngIf=\"reward.description\">\n        <div [innerHtml]=\"reward.description\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"reward.termsAndConditions\">\n        {{tncLabel}}\n      </div>\n      <div class=\"section-content\" *ngIf=\"reward.termsAndConditions\">\n        <div [innerHtml]=\"reward.termsAndConditions\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"reward.howToRedeem\">\n        How to redeem\n      </div>\n      <div class=\"section-content\" *ngIf=\"reward.howToRedeem\">\n        <div [innerHtml]=\"reward.howToRedeem\"></div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n",
                    styles: [".reward-container{margin:0 auto;background:#fff;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;height:100%;width:100%}.reward-image-container{max-height:25vh;display:-webkit-box;display:flex;-webkit-box-pack:center;justify-content:center}.reward-image-container .reward-image{width:100%;max-height:100%;-o-object-fit:cover;object-fit:cover}.merchant-image-container{position:relative;padding-top:26.67%;margin-top:-13.33%}.merchant-image-container .merchant-image{border-radius:50%;border:.2rem solid #fff;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);position:absolute;left:36.8%;top:0;width:26.67%;height:100%;box-sizing:border-box}.details{padding:0 1.2rem 1.5rem}.details .reward-name{margin-top:1.5rem;font-size:1.8rem;text-align:center;font-weight:900}.details .reward-subtitle{margin-top:1.5rem;text-align:center;color:#858585}.details .merchant-name{margin-top:1.5rem;font-size:1.8rem;text-align:center;color:#858585}.details .reward-price{margin-top:1rem;font-size:1.6rem;text-align:center;color:#858585}.details .reward-price .points-cost{font-size:1.2rem;line-height:1.4rem}.details .reward-price .points-cost .points-code{color:#858585}.details .reward-expiry{margin-top:1rem;font-size:1.6rem;text-align:center;color:#858585}.details .section-heading{margin-top:3rem;font-size:1.4rem;font-weight:900;line-height:2rem;margin-bottom:1.6rem}.details .section-content{font-size:1.4rem;line-height:2.5rem}.details .section-content.description{white-space:pre-wrap}"]
                }] }
    ];
    RewardComponent.propDecorators = {
        reward$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['reward',] }],
        displayPriceFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showRewardIdentifier: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showExpiry: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        descriptionLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tncLabel: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return RewardComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerRewardsService = /** @class */ (function () {
    function WhistlerRewardsService(http, config) {
        this.http = http;
        // basic local cache
        this.rewards = {};
        this.baseUrl = config.apiHost + "/reward/entities";
    }
    /**
     * @private
     * @param {?} rt
     * @return {?}
     */
    WhistlerRewardsService.WRedemptionToRT = /**
     * @private
     * @param {?} rt
     * @return {?}
     */
    function (rt) {
        switch (rt) {
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WRedemptionType"].promoCode:
                return RedemptionType.txtCode;
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WRedemptionType"].qrCode:
                return RedemptionType.qr;
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WRedemptionType"].barCode:
                return RedemptionType.barcode;
            case _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WRedemptionType"].merchantPin:
                return RedemptionType.pin;
            default:
                return RedemptionType.none;
        }
    };
    /**
     * @private
     * @param {?} r
     * @param {?} merchants
     * @param {?} tierRewardCost
     * @param {?=} metaData
     * @return {?}
     */
    WhistlerRewardsService.WRewardToReward = /**
     * @private
     * @param {?} r
     * @param {?} merchants
     * @param {?} tierRewardCost
     * @param {?=} metaData
     * @return {?}
     */
    function (r, merchants, tierRewardCost, metaData) {
        return {
            // @ts-ignore
            id: (typeof r.id) === 'string' ? Number.parseInt(r.id, 10) : r.id,
            name: r.attributes.name,
            description: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.description(''),
            subtitle: '',
            validFrom: r.attributes.created_at ? new Date(r.attributes.created_at) : new Date(),
            validTo: null,
            rewardThumbnail: r.attributes.image_url,
            rewardBanner: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.image_url(''),
            merchantId: merchants && merchants[0] ? Number.parseInt(merchants[0].id, 10) : undefined,
            merchantImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(merchants)[0].attributes.properties.logo_image('') || undefined,
            merchantName: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(merchants)[0].attributes.name('') || undefined,
            rewardPrice: [
                {
                    price: r.attributes.cost_of_reward,
                    currencyCode: r.attributes.currency,
                    points: tierRewardCost && tierRewardCost[0] ? Number.parseInt(tierRewardCost[0].attributes.tier_value, 10) : undefined
                }
            ],
            termsAndConditions: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.terms_conditions(''),
            // howToRedeem: r.attributes.redemption_type,
            redemptionText: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.display_properties.redemption_text(),
            categoryTags: [
                {
                    id: 0,
                    title: r.attributes.category
                }
            ],
            redemptionType: WhistlerRewardsService.WRedemptionToRT(r.attributes.redemption_type),
            rawPayload: metaData,
            displayProperties: {
                merchantPinText: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.display_properties.merchantPinText(),
                rewardSuccessPopUp: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.display_properties.rewardSuccessPopUp(),
                codeInstructionsText: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.display_properties.codeInstructionsText(),
                errorPopUp: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).attributes.display_properties.errorPopUp(),
            }
        };
    };
    /**
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    WhistlerRewardsService.prototype.getAllRewards = /**
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    function (tags, categories) {
        var _this = this;
        return new rxjs__WEBPACK_IMPORTED_MODULE_7__["Observable"]((/**
         * @param {?} subject
         * @return {?}
         */
        function (subject) {
            /** @type {?} */
            var current = [];
            /** @type {?} */
            var meta = { currentPage: 1, totalPages: 1 };
            // we do not want to get all pages in parallel, so we get pages one after the other in order not to dos the server
            /** @type {?} */
            var process = (/**
             * @param {?} res
             * @return {?}
             */
            function (res) {
                // save each reward in local cache
                res.forEach((/**
                 * @param {?} r
                 * @return {?}
                 */
                function (r) { return _this.rewards[r.id] = r; }));
                meta = res[0] && res[0].rawPayload || Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, meta);
                current = current.concat(res);
                subject.next(current);
                // if finished close the stream
                if (!meta.currentPage || !meta.totalPages || meta.currentPage >= meta.totalPages) {
                    subject.complete();
                }
                else {
                    // otherwise get next page
                    _this.getRewards(meta.currentPage + 1, undefined, tags, categories)
                        .subscribe(process);
                }
            });
            // do the first query
            _this.getRewards(1, undefined, tags, categories).subscribe(process);
        }));
    };
    /**
     * @param {?} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    WhistlerRewardsService.prototype.getRewards = /**
     * @param {?} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    function (page, pageSize, tags, categories) {
        var _this = this;
        if (pageSize === void 0) { pageSize = 10; }
        /** @type {?} */
        var tagsString = tags && tags.join(',');
        /** @type {?} */
        var categoriesString = categories && categories.join(',');
        /** @type {?} */
        var metaData = {};
        /** @type {?} */
        var params = {
            'page[number]': page.toString(),
            'page[size]': pageSize.toString(),
            include: 'organization,tier_reward_costs'
        };
        if (tagsString) {
            params['filter[tags]'] = tagsString;
        }
        if (categoriesString) {
            params['filter[category]'] = categoriesString;
        }
        return this.http.get("" + this.baseUrl, {
            params: params
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            metaData = {
                currentPage: page,
                totalPages: res.meta && res.meta.page_count
            };
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return ({
            rewards: res.data,
            merchantsIC: res.included && res.included.length > 0 ?
                res.included.filter((/**
                 * @param {?} include
                 * @return {?}
                 */
                function (include) { return include.type === 'Ros::Organization::Org'; })) : null,
            tierRewardCostsIC: res.included && res.included.length > 0 ?
                res.included.filter((/**
                 * @param {?} include
                 * @return {?}
                 */
                function (include) { return include.type === 'tier_reward_costs'; })) : null
        }); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.rewards.map((/**
         * @param {?} r
         * @return {?}
         */
        function (r) {
            /** @type {?} */
            var merchants = res.merchantsIC && res.merchantsIC.length > 0 ? res.merchantsIC.filter((/**
             * @param {?} mIC
             * @return {?}
             */
            function (mIC) {
                /** @type {?} */
                var merchantRS = r.relationships && (/** @type {?} */ (r.relationships.organization.data));
                return merchantRS && merchantRS.id === mIC.id && merchantRS.type === 'Ros::Organization::Org';
            })) : null;
            /** @type {?} */
            var tierRCosts = res.tierRewardCostsIC && res.tierRewardCostsIC.length > 0 ? res.tierRewardCostsIC.filter((/**
             * @param {?} cost
             * @return {?}
             */
            function (cost) {
                return Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).relationships.tier_reward_costs.data ?
                    ((/** @type {?} */ (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(r).relationships.tier_reward_costs.data([])))).some((/**
                     * @param {?} rewardCost
                     * @return {?}
                     */
                    function (rewardCost) { return rewardCost.id === cost.attributes.entity_id.toString() && rewardCost.type === 'tier_reward_costs'; })) : false;
            })) || null : null;
            return WhistlerRewardsService.WRewardToReward(r, merchants, tierRCosts, metaData);
        })); })), 
        // save each reward in local cache
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} rewards
         * @return {?}
         */
        function (rewards) { return rewards.forEach((/**
         * @param {?} r
         * @return {?}
         */
        function (r) { return _this.rewards[r.id] = r; })); })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @param {?=} userId
     * @return {?}
     */
    WhistlerRewardsService.prototype.getReward = 
    // @ts-ignore
    /**
     * @param {?} id
     * @param {?=} userId
     * @return {?}
     */
    function (id, userId) {
        var _this = this;
        if (this.rewards[id]) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.rewards[id]);
        }
        /** @type {?} */
        var params = {
            include: 'organization,tier_reward_costs'
        };
        return this.http.get(this.baseUrl + "/" + id, { params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) {
            /** @type {?} */
            var tierRewardCosts = reward.included && reward.included.length > 0 ? reward.included.filter((/**
             * @param {?} include
             * @return {?}
             */
            function (include) { return include.type === 'tier_reward_costs'; })) : null;
            /** @type {?} */
            var merchants = reward.included && reward.included.length > 0 ? reward.included.filter((/**
             * @param {?} include
             * @return {?}
             */
            function (include) { return include.type === 'Ros::Organization::Org'; })) : null;
            return {
                reward: reward.data,
                merchants: merchants,
                tierRewardCosts: tierRewardCosts
            };
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return WhistlerRewardsService.WRewardToReward(res.reward, res.merchants, res.tierRewardCosts); })), 
        // save reward in local cache
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) { return _this.rewards[id] = reward; })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerRewardsService.prototype.getRewardPricesOptions = 
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        throw new Error('Method not implemented.');
    };
    /**
     * @return {?}
     */
    WhistlerRewardsService.prototype.getAllCatalogs = /**
     * @return {?}
     */
    function () {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} page
     * @param {?} pageSize
     * @return {?}
     */
    WhistlerRewardsService.prototype.getCatalogs = 
    // @ts-ignore
    /**
     * @param {?} page
     * @param {?} pageSize
     * @return {?}
     */
    function (page, pageSize) {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerRewardsService.prototype.getCatalog = 
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        throw new Error('Method not implemented.');
    };
    WhistlerRewardsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerRewardsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerRewardsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerRewardsService_Factory() { return new WhistlerRewardsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerRewardsService, providedIn: "root" });
    return WhistlerRewardsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var components$2 = [
    RewardsCollectionComponent,
    RewardsListComponent,
    RewardsListTabbedComponent,
    RewardComponent,
    StampsCardsListComponent
];
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function rewardsServiceFactory(http, config) {
    if (config.isWhistler) {
        return new WhistlerRewardsService(http, config);
    }
    // Make decision on what to instantiate base on config
    return new V4RewardsService(http, config);
}
var RewardsModule = /** @class */ (function () {
    function RewardsModule() {
    }
    RewardsModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$2),
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        MaterialModule,
                        ngx_multi_line_ellipsis__WEBPACK_IMPORTED_MODULE_13__["NgxMultiLineEllipsisModule"],
                        ngx_ellipsis__WEBPACK_IMPORTED_MODULE_14__["EllipsisModule"],
                        UtilsModule
                    ],
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$2),
                    providers: [
                        {
                            provide: RewardsService,
                            useFactory: rewardsServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config]
                        }
                    ]
                },] }
    ];
    return RewardsModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
ConfigService = /** @class */ (function () {
    function ConfigService() {
    }
    return ConfigService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IDictionary() { }
var LanguageService = /** @class */ (function () {
    function LanguageService(httpClient, configService, tokenStorage) {
        var _this = this;
        this.httpClient = httpClient;
        this.configService = configService;
        this.tokenStorage = tokenStorage;
        this.contentHeader = new _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpHeaders"]({
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',
        });
        // hostUrl is an observable to make sure we do not start fetching translation before finishing fetching the url
        this.hostUrl = new rxjs__WEBPACK_IMPORTED_MODULE_7__["ReplaySubject"]();
        this.configService.readAppConfig()
            .subscribe((/**
         * @param {?} config
         * @return {?}
         */
        function (config) { return _this.hostUrl.next(config.production ? "" + config.baseHref : 'http://localhost:4000/'); }));
    }
    /**
     * @param {?} lang
     * @return {?}
     */
    LanguageService.prototype.getTranslation = /**
     * @param {?} lang
     * @return {?}
     */
    function (lang) {
        var _this = this;
        /** @type {?} */
        var host = '/';
        return this.hostUrl.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} url
         * @return {?}
         */
        function (url) { return host = url; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} hostUrl
         * @return {?}
         */
        function (hostUrl) { return hostUrl + "lang?default=" + lang; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} apiAddress
         * @return {?}
         */
        function (apiAddress) { return _this.httpClient.get(apiAddress, { headers: _this.contentHeader, observe: 'response' }); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var l = res.headers.get('content-language') || lang;
            _this.tokenStorage.setAppInfoProperty(l, 'lang');
            document.documentElement.lang = l;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.body; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["catchError"])((/**
         * @return {?}
         */
        function () { return _this.httpClient.get(host + "assets/en-json.json"); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res !== null ? res : {}; })));
    };
    LanguageService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    /** @nocollapse */
    LanguageService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: ConfigService },
        { type: TokenStorage }
    ]; };
    return LanguageService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LanguageInterceptor = /** @class */ (function () {
    function LanguageInterceptor(tokenStorage) {
        this.tokenStorage = tokenStorage;
    }
    /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    LanguageInterceptor.prototype.intercept = /**
     * @param {?} req
     * @param {?} next
     * @return {?}
     */
    function (req, next) {
        /** @type {?} */
        var lang = this.tokenStorage.getAppInfoProperty('lang');
        /** @type {?} */
        var request = req.clone({ setHeaders: { 'Accept-Language': lang || 'en' } });
        return next.handle(request);
    };
    LanguageInterceptor.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    /** @nocollapse */
    LanguageInterceptor.ctorParameters = function () { return [
        { type: TokenStorage }
    ]; };
    return LanguageInterceptor;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var LocaleIdFactory = (/**
 * @param {?} tokenStorage
 * @return {?}
 */
function (tokenStorage) {
    // first try to get lang from Token Storage
    /** @type {?} */
    var l = tokenStorage.getAppInfoProperty('lang');
    if (l) {
        return l;
    }
    // Then, if not available get it from html tag
    l = document.documentElement.lang;
    if (l) {
        return l;
    }
    // finally default to english
    return 'en';
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var PuzzleCollectStampState = {
    issued: 'issued',
    redeemed: 'redeemed',
};
/**
 * @record
 */
function PuzzleCollectStamp() { }
if (false) {}
/**
 * @record
 */
function PuzzleCollectReward() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocationsListComponent = /** @class */ (function () {
    function LocationsListComponent() {
    }
    /**
     * @param {?} loc
     * @return {?}
     */
    LocationsListComponent.prototype.gMapUrl = /**
     * @param {?} loc
     * @return {?}
     */
    function (loc) {
        return "https://www.google.com/maps/search/?api=1&query=" + loc.latitude + "," + loc.longitude;
    };
    /**
     * @return {?}
     */
    LocationsListComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        if (!this.headerFn) {
            this.headerFn = (/**
             * @param {?} location
             * @return {?}
             */
            function (location) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(location.merchantName ? location.merchantName : location.name); });
        }
    };
    LocationsListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-locations-list',
                    template: "<mat-list>\n  <div *ngFor=\"let location of locations | async\">\n    <mat-list-item>\n      <h3 matLine>{{ headerFn(location) | async }}</h3>\n      <small matLine>{{location.address}}</small>\n      <div matLine>\n        <div class=\"links\">\n          <a class=\"links-phone\" href=\"tel:{{location.phone}}\">{{location.phone}}</a>\n          <a class=\"links-location\" target=\"_blank\" [href]=\"gMapUrl(location)\">View location</a>\n        </div>\n      </div>\n    </mat-list-item>\n    <mat-divider></mat-divider>\n  </div>\n</mat-list>",
                    styles: ["h3{font-size:1.4rem;line-height:1.7rem;font-weight:900}small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;font-size:1.2rem;line-height:2.1rem}.links{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:justify;justify-content:space-between;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:1.6rem}.links a{color:#0f69af;align-self:baseline;text-decoration:none}.links-phone{font-size:1.4rem;line-height:2.5rem}.links-location{font-size:1.2rem;line-height:2.1rem}"]
                }] }
    ];
    LocationsListComponent.propDecorators = {
        locations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        headerFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return LocationsListComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GeoLocationService = /** @class */ (function () {
    function GeoLocationService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_7__["ReplaySubject"](1);
        this.newPosition = this.newPosition.bind(this);
        if (navigator.geolocation) {
            this.watchId = navigator.geolocation.watchPosition(this.newPosition);
            navigator.geolocation.getCurrentPosition(this.newPosition);
        }
    }
    /**
     * @return {?}
     */
    GeoLocationService.prototype.positions = /**
     * @return {?}
     */
    function () {
        return this.subject;
    };
    /**
     * @param {?} pos
     * @return {?}
     */
    GeoLocationService.prototype.newPosition = /**
     * @param {?} pos
     * @return {?}
     */
    function (pos) {
        this.subject.next(pos);
    };
    /**
     * @return {?}
     */
    GeoLocationService.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        if (navigator.geolocation) {
            navigator.geolocation.clearWatch(this.watchId);
        }
    };
    GeoLocationService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    GeoLocationService.ctorParameters = function () { return []; };
    /** @nocollapse */ GeoLocationService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function GeoLocationService_Factory() { return new GeoLocationService(); }, token: GeoLocationService, providedIn: "root" });
    return GeoLocationService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocationsMapComponent = /** @class */ (function () {
    function LocationsMapComponent(geoLocationService) {
        this.geoLocationService = geoLocationService;
        this.markersArray = [];
        this.userLocation = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
        this.key = null;
    }
    /**
     * @return {?}
     */
    LocationsMapComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.userLocation
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$))
            .subscribe((/**
         * @return {?}
         */
        function () {
            _this.updateLocations();
        }));
        // load google map script
        this.loadScript()
            .then((/**
         * @return {?}
         */
        function () {
            /** @type {?} */
            var mapProp = {
                mapTypeId: google.maps.MapTypeId.ROADMAP
            };
            _this.map = new google.maps.Map(_this.gmapElement.nativeElement, mapProp);
            // any click on the map should dismiss the current location
            _this.map.addListener('click', (/**
             * @return {?}
             */
            function () { return _this.current = null; }));
            _this.geoLocationService.positions()
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(_this.destroy$))
                .subscribe((/**
             * @param {?} position
             * @return {?}
             */
            function (position) { return _this.updateUserPosition(position); }));
            _this.updateLocations();
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LocationsMapComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.locations) {
            this.updateLocations();
        }
    };
    /**
     * @private
     * @return {?}
     */
    LocationsMapComponent.prototype.loadScript = /**
     * @private
     * @return {?}
     */
    function () {
        // don't load it more than once.
        if (typeof google !== 'undefined' && typeof google.maps !== 'undefined') {
            return Promise.resolve();
        }
        /** @type {?} */
        var body = (/** @type {?} */ (document.body));
        /** @type {?} */
        var script = document.createElement('script');
        /** @type {?} */
        var p = new Promise((/**
         * @param {?} resolve
         * @return {?}
         */
        function (resolve) {
            // when script is loaded, resolve the promise.
            script.addEventListener('load', (/**
             * @return {?}
             */
            function () {
                resolve();
            }));
        }));
        script.innerHTML = '';
        /** @type {?} */
        var url = 'https://maps.googleapis.com/maps/api/js';
        if (this.key) {
            url += "?key=" + this.key;
        }
        script.src = url;
        script.async = true;
        script.defer = true;
        body.appendChild(script);
        return p;
    };
    /**
     * @private
     * @param {?} position
     * @return {?}
     */
    LocationsMapComponent.prototype.updateUserPosition = /**
     * @private
     * @param {?} position
     * @return {?}
     */
    function (position) {
        if (position === null) {
            return;
        }
        /** @type {?} */
        var location = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.map.panTo(location);
        this.userLocation.next(position);
        if (!this.userMarker) {
            this.userMarker = new google.maps.Marker({
                icon: 'https://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png',
                position: location,
                map: this.map,
            });
        }
        else {
            this.userMarker.setPosition(location);
        }
        this.updateBoundingBox();
    };
    /**
     * @return {?}
     */
    LocationsMapComponent.prototype.clearMarkers = /**
     * @return {?}
     */
    function () {
        this.markersArray.forEach((/**
         * @param {?} item
         * @return {?}
         */
        function (item) {
            item.setMap(null);
        }));
    };
    /**
     * @private
     * @return {?}
     */
    LocationsMapComponent.prototype.updateLocations = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.locations && this.map) {
            Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])(this.locations)
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$))
                .subscribe((/**
             * @param {?} locationsArr
             * @return {?}
             */
            function (locationsArr) {
                /** @type {?} */
                var locations = locationsArr[0];
                _this.clearMarkers();
                locations
                    .filter((/**
                 * @param {?} location
                 * @return {?}
                 */
                function (location) { return location.latitude !== null && location.longitude !== null; }))
                    .forEach((/**
                 * @param {?} location
                 * @return {?}
                 */
                function (location) {
                    /** @type {?} */
                    var latLng = new google.maps.LatLng({ lat: location.latitude || 0, lng: location.longitude || 0 });
                    /** @type {?} */
                    var marker = new google.maps.Marker({
                        position: latLng,
                        map: _this.map,
                        title: location.name
                    });
                    marker.addListener('click', (/**
                     * @return {?}
                     */
                    function () {
                        _this.current = location;
                    }));
                    marker.setClickable(true);
                    marker.setCursor('pointer');
                    _this.markersArray.push(marker);
                }));
                _this.updateBoundingBox();
            }));
        }
    };
    /**
     * @private
     * @return {?}
     */
    LocationsMapComponent.prototype.updateBoundingBox = /**
     * @private
     * @return {?}
     */
    function () {
        /** @type {?} */
        var bbox = new google.maps.LatLngBounds();
        this.markersArray.forEach((/**
         * @param {?} marker
         * @return {?}
         */
        function (marker) {
            /** @type {?} */
            var position = marker.getPosition();
            if (position) {
                bbox = bbox.extend(position);
            }
        }));
        if (this.userMarker) {
            /** @type {?} */
            var position = this.userMarker.getPosition();
            if (position) {
                bbox.extend(position);
            }
        }
        this.map.fitBounds(bbox);
    };
    /**
     * @param {?} loc
     * @return {?}
     */
    LocationsMapComponent.prototype.gMapUrl = /**
     * @param {?} loc
     * @return {?}
     */
    function (loc) {
        return "https://www.google.com/maps/search/?api=1&query=" + loc.latitude + "," + loc.longitude;
    };
    /**
     * @return {?}
     */
    LocationsMapComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    LocationsMapComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-locations-map',
                    template: "<div #gmap class=\"map\"></div>\n\n<div class=\"loc-card-container\">\n  <mat-card *ngIf=\"current\" class=\"loc-card mat-elevation-z8\">\n    <mat-card-title>{{current.name}}</mat-card-title>\n    <mat-card-subtitle>{{current.address}}</mat-card-subtitle>\n    <mat-card-content>\n      <a class=\"phone\" href=\"tel:{{current.phone}}\">\n        <mat-icon>phone</mat-icon>{{current.phone}}\n      </a>\n      <a class=\"location\" target=\"_blank\" [href]=\"gMapUrl(current)\">View location</a>\n    </mat-card-content>\n  </mat-card>\n</div>",
                    styles: [":host{display:block;height:100%}.map{width:100%;height:100%}.loc-card-container{width:100%;position:absolute;bottom:0;z-index:2}.loc-card-container .loc-card{background-color:#fff;margin:0 2rem 2rem}mat-card-content{display:-webkit-box;display:flex;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;-webkit-box-pack:justify;justify-content:space-between;margin-top:1.6rem}mat-card-content a{color:#0f69af;align-self:baseline;text-decoration:none}mat-card-content .phone{display:-webkit-box;display:flex;font-size:1.4rem;line-height:2.5rem}mat-card-content .phone mat-icon{font-size:1.4rem;height:1.4rem;width:1.4rem;line-height:2.5rem}mat-card-content .location{font-size:1.2rem;line-height:2.1rem}"]
                }] }
    ];
    /** @nocollapse */
    LocationsMapComponent.ctorParameters = function () { return [
        { type: GeoLocationService }
    ]; };
    LocationsMapComponent.propDecorators = {
        locations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        key: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        gmapElement: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['gmap', { static: false },] }]
    };
    return LocationsMapComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var LocationsService = /** @class */ (function () {
    function LocationsService() {
    }
    LocationsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */ LocationsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function LocationsService_Factory() { return new LocationsService(); }, token: LocationsService, providedIn: "root" });
    return LocationsService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var V4LocationsService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4LocationsService, _super);
    function V4LocationsService(merchantsService) {
        var _this = _super.call(this) || this;
        _this.merchantsService = merchantsService;
        return _this;
    }
    /**
     * @param {?} allMerchants
     * @param {?=} tags
     * @return {?}
     */
    V4LocationsService.prototype.getAllLocations = /**
     * @param {?} allMerchants
     * @param {?=} tags
     * @return {?}
     */
    function (allMerchants, tags) {
        var _this = this;
        if (tags === undefined) {
            tags = [];
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["forkJoin"])(allMerchants).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} merchantsArr
         * @return {?}
         */
        function (merchantsArr) {
            /** @type {?} */
            var merchants = merchantsArr[0];
            /** @type {?} */
            var filteredMerchants = null;
            if (tags && tags.length > 0) {
                filteredMerchants = merchants.filter((/**
                 * @param {?} merchant
                 * @return {?}
                 */
                function (merchant) {
                    /** @type {?} */
                    var found = false;
                    if (merchant.tags) {
                        /** @type {?} */
                        var merchantTagNames_1 = merchant.tags.map((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) { return t.name.toLowerCase(); }));
                        // @ts-ignore
                        found = tags.some((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        function (tag) { return merchantTagNames_1.includes(tag.toLowerCase()); }));
                    }
                    return found;
                }));
            }
            filteredMerchants = filteredMerchants ? filteredMerchants : merchants;
            return filteredMerchants.map((/**
             * @param {?} merchant
             * @return {?}
             */
            function (merchant) { return _this.getFromMerchant(merchant.id); }));
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeAll"])(5), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["share"])());
    };
    /**
     * @param {?=} page
     * @param {?=} tags
     * @return {?}
     */
    V4LocationsService.prototype.getLocations = /**
     * @param {?=} page
     * @param {?=} tags
     * @return {?}
     */
    function (page, tags) {
        var _this = this;
        if (page === undefined) {
            page = 1;
        }
        if (tags === undefined) {
            tags = [];
        }
        return this.merchantsService.getMerchants(page).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) {
            /** @type {?} */
            var filteredMerchants;
            if (tags && tags.length > 0) {
                filteredMerchants = merchants.filter((/**
                 * @param {?} merchant
                 * @return {?}
                 */
                function (merchant) {
                    /** @type {?} */
                    var found = false;
                    if (merchant.tags !== undefined) {
                        /** @type {?} */
                        var tagNames_1 = merchant.tags.map((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) { return t.name.toLowerCase(); }));
                        // @ts-ignore
                        found = tags.some((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        function (tag) { return tagNames_1.includes(tag.toLowerCase()); }));
                    }
                    return found;
                }));
            }
            filteredMerchants = filteredMerchants ? filteredMerchants : merchants;
            return filteredMerchants.map((/**
             * @param {?} merchant
             * @return {?}
             */
            function (merchant) { return _this.getFromMerchant(merchant.id); }));
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeAll"])(5), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []));
    };
    /**
     * @param {?} merchantId
     * @param {?=} page
     * @return {?}
     */
    V4LocationsService.prototype.getFromMerchant = /**
     * @param {?} merchantId
     * @param {?=} page
     * @return {?}
     */
    function (merchantId, page) {
        return this.merchantsService.getMerchant(merchantId, true, page).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) { return (merchant.outlets !== undefined && (merchant.outlets ? merchant.outlets.length > 0 : false)); })), 
        // @ts-ignore
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) { return merchant.outlets.map((/**
         * @param {?} outlet
         * @return {?}
         */
        function (outlet) { return ({
            merchantId: merchant.id,
            merchantName: merchant.name,
            locationId: outlet.outletId,
            name: outlet.outletName,
            tags: outlet.tags && outlet.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.name; })),
            address: outlet.outletAddress1,
            address2: outlet.outletAddress2,
            address3: outlet.outletAddress3,
            latitude: outlet.coordinates.lat,
            longitude: outlet.coordinates.lng,
            phone: outlet.tel
        }); })); })));
    };
    /**
     * @param {?} allMerchants
     * @return {?}
     */
    V4LocationsService.prototype.getTags = /**
     * @param {?} allMerchants
     * @return {?}
     */
    function (allMerchants) {
        return allMerchants.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) { return merchants.filter((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) { return merchant.tags && merchant.tags.length > 0; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["filter"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) { return merchants.length > 0; })), 
        // eslint-disable-next-line arrow-body-style
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) {
            return merchants.map((/**
             * @param {?} merchant
             * @return {?}
             */
            function (merchant) { return merchant.tags ? merchant.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.name; })) : []; }))
                .reduce((/**
             * @param {?} p
             * @param {?} v
             * @return {?}
             */
            function (p, v) { return v.concat(p); }), []);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat.apply(acc, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(curr)); }), []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} tags
         * @return {?}
         */
        function (tags) { return Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(new Set(tags)); })));
    };
    V4LocationsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4LocationsService.ctorParameters = function () { return [
        { type: IMerchantsService }
    ]; };
    /** @nocollapse */ V4LocationsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4LocationsService_Factory() { return new V4LocationsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(IMerchantsService)); }, token: V4LocationsService, providedIn: "root" });
    return V4LocationsService;
}(LocationsService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var comps = [LocationsListComponent, LocationsMapComponent];
/**
 * @param {?} merchantsService
 * @return {?}
 */
function locationsServiceFactory(merchantsService) {
    // Make decision on what to instantiate base on config
    return new V4LocationsService(merchantsService);
}
var LocationModule = /** @class */ (function () {
    function LocationModule() {
    }
    LocationModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: comps,
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatDividerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatListModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCardModule"],
                    ],
                    providers: [
                        {
                            provide: LocationsService,
                            useFactory: locationsServiceFactory,
                            deps: [IMerchantsService]
                        }
                    ],
                    exports: comps
                },] }
    ];
    return LocationModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var countDistance = (/**
 * @param {?} latestPosition
 * @param {?} latestLocations
 * @return {?}
 */
function (latestPosition, latestLocations) {
    if (latestPosition === null) {
        latestLocations.forEach((/**
         * @param {?} loc
         * @return {?}
         */
        function (loc) { return loc.distance = undefined; }));
        return latestLocations;
    }
    /** @type {?} */
    var R = 6371e3;
    // radius of the earth
    /** @type {?} */
    var pi = Math.PI;
    /** @type {?} */
    var lat = latestPosition.coords.latitude;
    /** @type {?} */
    var lng = latestPosition.coords.longitude;
    /** @type {?} */
    var posLatToRad = (lat * (pi / 180));
    return latestLocations.map((/**
     * @param {?} row
     * @return {?}
     */
    function (row) {
        if (row.latitude === null || row.longitude === null) {
            return row;
        }
        /** @type {?} */
        var locLatToRad = (row.latitude * (pi / 180));
        /** @type {?} */
        var dLat = (row.latitude - lat) * (pi / 180);
        /** @type {?} */
        var dLon = (row.longitude - lng) * (pi / 180);
        // use haversine formula
        /** @type {?} */
        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.cos(posLatToRad) * Math.cos(locLatToRad) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
        /** @type {?} */
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        row.distance = R * c;
        return row;
    }));
});
var ɵ0 = countDistance;
/** @type {?} */
var sortByDistance = (/**
 * @param {?} position
 * @param {?} locations
 * @param {?} inc
 * @return {?}
 */
function (position, locations, inc) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["combineLatest"])(position, locations)
    .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
 * @param {?} __0
 * @return {?}
 */
function (_a) {
    var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), latestPosition = _b[0], latestLocations = _b[1];
    /** @type {?} */
    var locationsList = countDistance(latestPosition, latestLocations);
    return locationsList.sort((/**
     * @param {?} loc1
     * @param {?} loc2
     * @return {?}
     */
    function (loc1, loc2) {
        /** @type {?} */
        var dist;
        if (!loc1.distance) {
            dist = loc2.distance ? 1 : 0;
        }
        else if (!loc2.distance) {
            dist = -1;
        }
        else {
            dist = loc1.distance - loc2.distance;
        }
        return inc ? dist : -dist;
    }));
}))); });

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SurveyComponent = /** @class */ (function () {
    function SurveyComponent() {
        this.hideIndex = false;
        this.totalLength = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.currentPointer = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.surveyDone = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.answersTracker = {};
        this.pointsTracker = {};
        this.questionPointer = 0;
        this.destroy$ = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    /**
     * @return {?}
     */
    SurveyComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.data$) {
            this.data$
                .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["takeUntil"])(this.destroy$))
                .subscribe((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                _this.data = data;
                if (_this.data) {
                    _this.totalLength.emit(_this.data.questions.length);
                    _this.currentPointer.emit(0);
                }
            }));
        }
    };
    /**
     * @param {?} answer
     * @return {?}
     */
    SurveyComponent.prototype.updateAnswers = /**
     * @param {?} answer
     * @return {?}
     */
    function (answer) {
        if (answer.questionId) {
            this.answersTracker[answer.questionId] = answer;
        }
    };
    /**
     * @param {?} points
     * @return {?}
     */
    SurveyComponent.prototype.updatePoints = /**
     * @param {?} points
     * @return {?}
     */
    function (points) {
        if (points.questionId) {
            this.pointsTracker[points.questionId] = points.point;
            this.updateParent();
        }
    };
    /**
     * @return {?}
     */
    SurveyComponent.prototype.updateParent = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var currentPoint = this.calculatePoints();
        /** @type {?} */
        var totalQuestion = this.data && this.data.questions.length;
        if (this.data) {
            this.totalLength.emit(totalQuestion);
            this.currentPointer.emit(currentPoint);
        }
        if (currentPoint >= totalQuestion) {
            /** @type {?} */
            var answers = Object.entries(this.answersTracker).map((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), id = _b[0], answer = _b[1];
                return ({
                    questionId: id,
                    content: answer.content
                });
            }));
            this.surveyDone.emit(answers);
        }
    };
    /**
     * @param {?} action
     * @return {?}
     */
    SurveyComponent.prototype.updateQuestionPointer = /**
     * @param {?} action
     * @return {?}
     */
    function (action) {
        if (action === 'next') {
            this.questionPointer++;
        }
        else {
            this.questionPointer--;
        }
    };
    /**
     * @return {?}
     */
    SurveyComponent.prototype.calculatePoints = /**
     * @return {?}
     */
    function () {
        return Object.values(this.pointsTracker).reduce((/**
         * @param {?} sum
         * @param {?} point
         * @return {?}
         */
        function (sum, point) { return sum + point; }), 0);
    };
    /**
     * @return {?}
     */
    SurveyComponent.prototype.ngOnDestroy = /**
     * @return {?}
     */
    function () {
        this.destroy$.next();
        this.destroy$.complete();
    };
    SurveyComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-survey',
                    template: "<div class=\"survey-container\" *ngIf=\"data\">\n    <div *ngFor=\"let question of data.questions ; let i = index;\">\n      <perx-core-question\n            [hideIndex]=\"hideIndex\"\n            [id]=\"i\"\n            [questionPointer]=\"questionPointer\"\n            [totalQuestions]=\"data.questions.length\"\n            [question]=\"question\"\n            (updateAnswers)=\"updateAnswers($event)\"\n            (updatePoints)=\"updatePoints($event)\"\n            (updateQuestionPointer)=\"updateQuestionPointer($event)\"\n        ></perx-core-question>\n    </div>\n</div>\n",
                    styles: [":host{font-size:1.4rem;line-height:1.8rem;width:100%}"]
                }] }
    ];
    SurveyComponent.propDecorators = {
        data$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['data',] }],
        hideIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        totalLength: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        currentPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        surveyDone: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return SurveyComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var QuestionComponent = /** @class */ (function () {
    function QuestionComponent() {
        this.hideIndex = false;
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.updatePoints = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.updateQuestionPointer = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.errorState = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    QuestionComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush) {
            this.flush = changes.flush.currentValue;
            if (this.flush) {
                this.questionValidation();
            }
        }
    };
    Object.defineProperty(QuestionComponent.prototype, "surveyQuestionType", {
        get: /**
         * @return {?}
         */
        function () { return SurveyQuestionType; },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(QuestionComponent.prototype, "isActive", {
        get: /**
         * @return {?}
         */
        function () {
            return this.questionPointer === this.id;
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @param {?} answer
     * @return {?}
     */
    QuestionComponent.prototype.updateAnswer = /**
     * @param {?} answer
     * @return {?}
     */
    function (answer) {
        this.question.answer = answer.content.toString();
        /** @type {?} */
        var questionId = answer.questionId ? answer.questionId : this.question.id;
        this.updateAnswers.emit({ questionId: questionId, content: answer.content.toString() });
        this.updateNonGroupPoint();
        this.questionValidation();
    };
    /**
     * @param {?} point
     * @return {?}
     */
    QuestionComponent.prototype.updateGroupPoint = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        this.point = point;
        this.updatePoints.emit({ questionId: this.question.id, point: point });
    };
    /**
     * @return {?}
     */
    QuestionComponent.prototype.updateNonGroupPoint = /**
     * @return {?}
     */
    function () {
        if (this.question.payload.type !== SurveyQuestionType.questionGroup) {
            this.point = this.question && this.question.required ?
                (this.question.answer === 0 || (this.question.answer && this.question.answer.length > 0) ? 1 : 0) : 1;
            this.updatePoints.emit({ questionId: this.question.id, point: this.point });
        }
    };
    /**
     * @return {?}
     */
    QuestionComponent.prototype.next = /**
     * @return {?}
     */
    function () {
        this.questionValidation();
        if (!this.errorState.hasError) {
            this.moveToNextQuestion();
        }
        else if (this.question.payload.type === SurveyQuestionType.questionGroup) {
            this.flush = !this.flush;
        }
    };
    /**
     * @return {?}
     */
    QuestionComponent.prototype.moveToNextQuestion = /**
     * @return {?}
     */
    function () {
        this.updateNonGroupPoint();
        this.updateQuestionPointer.emit('next');
    };
    /**
     * @return {?}
     */
    QuestionComponent.prototype.back = /**
     * @return {?}
     */
    function () {
        this.updateQuestionPointer.emit('back');
    };
    /**
     * @param {?} email
     * @return {?}
     */
    QuestionComponent.prototype.validateEmail = /**
     * @param {?} email
     * @return {?}
     */
    function (email) {
        /** @type {?} */
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };
    /**
     * @return {?}
     */
    QuestionComponent.prototype.questionValidation = /**
     * @return {?}
     */
    function () {
        this.errorState = {};
        if (this.question && this.question.required && this.point !== 1) {
            this.errorState.isRequired = true;
            this.errorState.hasError = true;
        }
        else if (this.question.payload['max-length']
            && typeof this.question.answer === 'string'
            && this.question.payload['max-length'] < this.question.answer.length) {
            this.errorState.exceedMaxLength = true;
            this.errorState.hasError = true;
        }
        else if (this.question.id === 'email_address' && !this.validateEmail(this.question.answer)) {
            this.errorState.inValidEmail = true;
        }
    };
    QuestionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-question',
                    template: "<div class=\"question-container\" [ngClass]=\"{ hidden : !isActive }\">\n    <div class=\"question-content\" *ngIf=\"question\">\n        <div class=\"question\">\n          <span *ngIf=\"!hideIndex\">\n            {{(alpha ? alpha + '. ' :  id + 1 + '. ' ) + question?.question}}\n          </span>\n          <span *ngIf=\"hideIndex\">\n            {{ (question?.question) }}\n          </span>\n            <span class=\"required-star\">\n                {{question?.required ? '*': ''}}\n            </span>\n        </div>\n        <div class=\"description\" [innerHTML]=\"question?.description\"></div>\n        <perx-core-group\n            *ngIf=\"question.payload.type === surveyQuestionType.questionGroup\"\n            [id]=\"id\"\n            [hideIndex]=\"hideIndex\"\n            [questionPointer]=\"questionPointer\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n            (updatePoints)=\"updateGroupPoint($event)\"\n        ></perx-core-group>\n        <perx-core-select\n            *ngIf=\"question.payload.type === surveyQuestionType.multipleChoice\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n        ></perx-core-select>\n        <perx-core-rating\n            *ngIf=\"question.payload.type === surveyQuestionType.rating\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n        ></perx-core-rating>\n        <perx-core-picture-select\n            *ngIf=\"question.payload.type === surveyQuestionType.pictureChoice\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n        ></perx-core-picture-select>\n        <perx-core-long-text\n            *ngIf=\"question.payload.type === surveyQuestionType.longText\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n        ></perx-core-long-text>\n        <perx-core-date\n            *ngIf=\"question.payload.type === surveyQuestionType.date\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n        ></perx-core-date>\n        <perx-core-phone\n            *ngIf=\"question.payload.type === surveyQuestionType.phone\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n        ></perx-core-phone>\n        <div\n            class=\"error-message\"\n            *ngIf=\"question.payload.type !== surveyQuestionType.questionGroup\">\n            <div [ngClass]=\"{ error: errorState?.isRequired }\">\n                Answer is <strong>required</strong>\n            </div>\n            <div [ngClass]=\"{ error: errorState?.exceedMaxLength }\">\n                Exceed <strong>max length</strong>\n            </div>\n            <div [ngClass]=\"{ error: errorState?.isValidDateRange }\">\n                Date Range is <strong>invalid</strong>\n            </div>\n            <div [ngClass]=\"{ error: errorState?.inValidEmail }\">\n                Email is <strong>invalid</strong>\n            </div>\n        </div>\n    </div>\n    <div class=\"question-action-container\" *ngIf=\"!isSubQuestion\">\n            <button *ngIf=\"id !== 0\" mat-raised-button (click)=\"back()\">\n                Back\n            </button>\n            <button *ngIf=\"id !== totalQuestions -1\" mat-raised-button color=\"primary\" (click)=\"next()\">\n                Next\n            </button>\n        </div>\n</div>\n",
                    styles: [":host{width:100%;display:block}.question-container{height:100%;display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:justify;justify-content:space-between}.question-container.hidden{display:none}.question-container .question-content{display:-webkit-box;display:flex;height:100%;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:start;justify-content:flex-start}.question-container .question-content .question{font-size:1.6rem;line-height:2.8rem;color:#212121;letter-spacing:.5px}.question-container .question-content .question .required-star{color:#ff6767}.question-container .question-content .description{margin-bottom:1rem;font-size:1.2rem;line-height:1.6rem;letter-spacing:.4px;color:#666}.question-container .question-content .error-message{height:1.6rem;overflow:hidden}.question-container .question-content .error-message>div{display:none;font-size:1rem;line-height:1.6rem;letter-spacing:.2px;color:#eb202f}.question-container .question-content .error-message>div.error{display:block}.question-container .question-action-container{margin-bottom:1rem}.question-container .question-action-container button{margin-right:1rem}"]
                }] }
    ];
    QuestionComponent.propDecorators = {
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        hideIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        questionPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        totalQuestions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        question: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        alpha: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }, { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }],
        isSubQuestion: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        updatePoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        updateQuestionPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return QuestionComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayloadRating() { }
if (false) {}
var RatingComponent = /** @class */ (function () {
    function RatingComponent() {
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    RatingComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush && changes.flush.currentValue !== undefined) {
            this.onSelect(this.selectedChoice);
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RatingComponent.prototype.surveyRatingIcons = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        /** @type {?} */
        var iconName = index <= this.selectedChoice ? this.payload.shape + '_selected' : this.payload.shape;
        return SurveyRatingIcons[iconName || 'star']; // default icon if is undefined
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RatingComponent.prototype.onSelect = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        this.selectedChoice = index;
        this.updateAnswers.emit({ content: index });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    RatingComponent.prototype.isSelected = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.selectedChoice === index;
    };
    RatingComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-rating',
                    template: "<div class=\"rating\">\n  <div class=\"icon-container\" *ngIf=\"payload\">\n    <div *ngFor=\"let item of [].constructor(payload?.scale); let i = index\" class=\"icon-wrapper\">\n        <mat-icon\n        aria-hidden=\"false\"\n        [color]=\"i <= selectedChoice ? 'primary' : 'default'\"\n        aria-label=\"Example rating icon\"\n        (click)=\"onSelect(i)\">\n        {{surveyRatingIcons(i)}}\n      </mat-icon>\n      <div *ngIf=\"i === 0\" class=\"label left-label\">{{payload['left_label']}}</div>\n      <div *ngIf=\"i === payload?.scale - 1\" class=\"label right-label\">{{payload['right_label']}}</div>\n    </div>\n  </div>\n</div>",
                    styles: [".rating{display:-webkit-box;display:flex;width:100%;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column}.rating .icon-container{display:-webkit-box;display:flex;width:100%;-webkit-box-pack:justify;justify-content:space-between;-webkit-box-orient:horizontal;-webkit-box-direction:normal;flex-direction:row;max-width:60rem}.rating .icon-container .icon-wrapper{box-sizing:border-box;display:-webkit-box;display:flex;place-content:center flex-start;-webkit-box-flex:1;flex:1 1 0%;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;-webkit-box-pack:start;justify-content:flex-start;-webkit-box-align:center;align-items:center}.rating .icon-container .icon-wrapper .mat-icon{cursor:pointer;height:3.6rem;width:3.6rem;font-size:3.6rem}.rating .icon-container .icon-wrapper .mat-icon.mat-default{color:#a4b0c3}.rating .label{font-size:1rem;line-height:1.6rem;color:#666}"]
                }] }
    ];
    RatingComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return RatingComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayloadPictureSelect() { }
if (false) {}
/**
 * @record
 */
function IPictureChoice() { }
if (false) {}
var PictureSelectComponent = /** @class */ (function () {
    function PictureSelectComponent() {
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.selectedChoices = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PictureSelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush && changes.flush.currentValue !== undefined) {
            this.emitValue();
        }
    };
    /**
     * @param {?} index
     * @return {?}
     */
    PictureSelectComponent.prototype.onSelect = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        if (this.payload.multiple) {
            this.selectedChoices[index] = !this.selectedChoices[index];
        }
        else {
            this.selectedChoice = index;
        }
        this.emitValue();
    };
    /**
     * @return {?}
     */
    PictureSelectComponent.prototype.emitValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = [];
        if (this.payload.multiple && this.selectedChoices) {
            result = Object.entries(this.selectedChoices)
                .filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], value = _b[1];
                return key !== undefined && value !== undefined;
            }))
                .map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data[0]; }));
        }
        else {
            result[0] = this.selectedChoice.toString();
        }
        this.updateAnswers.emit({ content: result });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    PictureSelectComponent.prototype.isSelected = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.payload.multiple ? this.selectedChoices && this.selectedChoices[index] : this.selectedChoice === index;
    };
    PictureSelectComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-picture-select',
                    template: "<div class=\"choice-container\">\n    <div class=\"choice-content\" *ngFor=\"let choice of payload?.choices; let i = index\">\n        <div \n            class=\"choice-image\"\n            [ngClass]=\"isSelected(i) ? 'selected' : ''\"\n            (click)=\"onSelect(i)\">\n            <img class=\"image\" [src]=\"choice?.img_url\" [alt]=\"choice?.text\">\n        </div>\n        <div class=\"choice-label\">\n            {{ choice?.text }}\n        </div>\n    </div>\n</div>",
                    styles: [".choice-container{display:-webkit-box;display:flex;flex-wrap:wrap}.choice-container .choice-content{display:-webkit-box;display:flex;-webkit-box-flex:1;flex:1 1 13rem;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;overflow:hidden;margin:0 1rem 1rem 0}.choice-container .choice-content:nth-child(2n){margin:0 0 1rem 1rem}.choice-container .choice-content .choice-image{-webkit-box-flex:1;flex:1 1 auto;position:relative;background-size:cover;border-radius:8px;min-height:13rem;overflow:hidden}.choice-container .choice-content .choice-image:focus{outline:0}.choice-container .choice-content .choice-image img{-o-object-fit:contain;object-fit:contain;position:absolute;width:100%;height:100%;cursor:pointer}.choice-container .choice-content .choice-image.selected{border:2px solid #186de1;box-sizing:border-box;position:relative;-webkit-transition:.5s cubic-bezier(.35,0,.25,1);transition:.5s cubic-bezier(.35,0,.25,1)}.choice-container .choice-content .choice-label{font-size:1.2rem;line-height:1.6rem;letter-spacing:.4px;color:#212121}"]
                }] }
    ];
    PictureSelectComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PictureSelectComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayloadLongText() { }
if (false) {}
var LongTextComponent = /** @class */ (function () {
    function LongTextComponent() {
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    /**
     * @return {?}
     */
    LongTextComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(500)).subscribe((/**
         * @param {?} inputValue
         * @return {?}
         */
        function (inputValue) {
            _this.updateAnswers.emit({ content: inputValue });
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    LongTextComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush && changes.flush.currentValue !== undefined) {
            this.updateInput(this.answer);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    LongTextComponent.prototype.updateInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.answer = value;
        this.subject.next(value);
    };
    LongTextComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-long-text',
                    template: "<mat-form-field class=\"full-width\">\n    <input matInput (keyup)=\"updateInput($event.target.value)\">\n</mat-form-field>",
                    styles: [".full-width{width:100%}"]
                }] }
    ];
    LongTextComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return LongTextComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayloadSelect() { }
if (false) {}
var SelectComponent = /** @class */ (function () {
    function SelectComponent() {
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.selectedChoices = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    SelectComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush && changes.flush.currentValue !== undefined) {
            this.emitValue();
        }
    };
    /**
     * @return {?}
     */
    SelectComponent.prototype.emitValue = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var result = [];
        if (this.payload.multiple && this.selectedChoices) {
            result = Object.entries(this.selectedChoices)
                .filter((/**
             * @param {?} __0
             * @return {?}
             */
            function (_a) {
                var _b = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__read"])(_a, 2), key = _b[0], value = _b[1];
                return key !== undefined && value !== undefined;
            }))
                .map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data[0]; }));
        }
        else {
            result[0] = this.selectedChoice.toString();
        }
        this.updateAnswers.emit({ content: result });
    };
    /**
     * @param {?} index
     * @return {?}
     */
    SelectComponent.prototype.isSelected = /**
     * @param {?} index
     * @return {?}
     */
    function (index) {
        return this.payload.multiple ? this.selectedChoices && this.selectedChoices[index] : this.selectedChoice === index;
    };
    SelectComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-select',
                    template: "<div class=\"date-wrapper\" *ngIf=\"payload\">\n    <ng-container *ngIf=\"payload.multiple; else elseBlock\">\n        <div class=\"choice-container\">\n            <div class=\"choice-content\" *ngFor=\"let choice of payload?.choices; let i = index\">\n                <mat-checkbox [(ngModel)]=\"selectedChoices[i]\" (change)=\"emitValue()\">\n                    {{choice}}\n                </mat-checkbox>\n            </div>\n        </div>\n    </ng-container>\n    <ng-template #elseBlock>\n        <div class=\"choice-container\">\n            <mat-radio-group\n                class=\"selection-radio-group\"\n                aria-labelledby=\"single-selection\"\n                [(ngModel)]=\"selectedChoice\"\n                (change)=\"emitValue()\">\n                <mat-radio-button\n                    class=\"selection-radio-button\"\n                    *ngFor=\"let choice of payload?.choices; let i = index\"\n                    [value]=\"choice\">\n                    {{choice}}\n                </mat-radio-button>\n            </mat-radio-group>\n        </div>\n    </ng-template>\n</div>\n",
                    styles: [".selection-radio-group{display:-webkit-box;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;flex-direction:column;margin:15px 0}.selection-radio-button{margin:5px}"]
                }] }
    ];
    SelectComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return SelectComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayloadGroup() { }
if (false) {}
var GroupComponent = /** @class */ (function () {
    function GroupComponent() {
        this.hideIndex = false;
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.updatePoints = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.answersTracker = {};
        this.pointsTracker = {};
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    GroupComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush) {
            this.flush = changes.flush.currentValue;
        }
    };
    /**
     * @param {?} answer
     * @return {?}
     */
    GroupComponent.prototype.updateAnswer = /**
     * @param {?} answer
     * @return {?}
     */
    function (answer) {
        this.updateAnswers.emit(answer);
    };
    /**
     * @param {?} point
     * @return {?}
     */
    GroupComponent.prototype.updatePoint = /**
     * @param {?} point
     * @return {?}
     */
    function (point) {
        if (point.questionId) {
            this.pointsTracker[point.questionId] = point.point;
            /** @type {?} */
            var currentPoint = this.calculatePoints();
            this.updatePoints.emit(currentPoint);
        }
        return;
    };
    /**
     * @return {?}
     */
    GroupComponent.prototype.calculatePoints = /**
     * @return {?}
     */
    function () {
        if (!this.payload) {
            return 0;
        }
        /** @type {?} */
        var pointsTrackerValues = Object.values(this.pointsTracker);
        /** @type {?} */
        var subQuestionLength = this.payload.questions.length;
        /** @type {?} */
        var totalPoint = pointsTrackerValues.reduce((/**
         * @param {?} sum
         * @param {?} point
         * @return {?}
         */
        function (sum, point) { return sum + point; }), 0);
        return totalPoint / subQuestionLength;
    };
    /**
     * @param {?} i
     * @return {?}
     */
    GroupComponent.prototype.getCharCode = /**
     * @param {?} i
     * @return {?}
     */
    function (i) {
        return String.fromCharCode(97 + i);
    };
    GroupComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-group',
                    template: "<ng-container *ngIf=\"payload\">\n    <div *ngFor=\"let question of payload?.questions; let i = index\">\n      <perx-core-question\n            [alpha]=\"getCharCode(i)\"\n            [id]=\"id\"\n            [hideIndex]=\"hideIndex\"\n            [questionPointer]=\"questionPointer\"\n            [isSubQuestion]=\"true\"\n            [question]=\"question\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n            (updatePoints)=\"updatePoint($event)\"\n        ></perx-core-question>\n    </div>\n</ng-container>\n",
                    styles: [""]
                }] }
    ];
    GroupComponent.propDecorators = {
        hideIndex: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        questionPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        updatePoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return GroupComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayloadDate() { }
if (false) {}
var DateComponent = /** @class */ (function () {
    function DateComponent() {
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    DateComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.answer = this.answer || (this.payload && this.payload.duration) ? { from: '', to: '' } : '';
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    DateComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush && changes.flush.currentValue !== undefined) {
            this.updateInput(this.answer);
        }
    };
    /**
     * @return {?}
     */
    DateComponent.prototype.openCalendar = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.picker.open();
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.pickerInput.nativeElement.focus(); }));
    };
    /**
     * @return {?}
     */
    DateComponent.prototype.eventCloseHandler = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.pickerInput.nativeElement.blur(); }));
    };
    /**
     * @return {?}
     */
    DateComponent.prototype.openCalendarTo = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.pickerTo.open();
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.pickerToInput.nativeElement.focus(); }));
    };
    /**
     * @return {?}
     */
    DateComponent.prototype.eventCloseHandlerTo = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.pickerToInput.nativeElement.blur(); }));
    };
    /**
     * @return {?}
     */
    DateComponent.prototype.openCalendarFrom = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.picker.open();
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.pickerFromInput.nativeElement.focus(); }));
    };
    /**
     * @return {?}
     */
    DateComponent.prototype.eventCloseHandlerFrom = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout((/**
         * @return {?}
         */
        function () { return _this.pickerFromInput.nativeElement.blur(); }));
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateComponent.prototype.updateInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.answer = value;
        this.updateAnswers.emit({ content: value });
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateComponent.prototype.updateInputFrom = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.answer = Object.assign(this.answer, { from: value });
        // @ts-ignore
        /*eslint-disable*/
        if (this.answer['from'] && this.answer['to']) {
            this.updateAnswers.emit({ content: this.answer });
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    DateComponent.prototype.updateInputTo = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.answer = Object.assign(this.answer, { to: value });
        // @ts-ignore
        /*eslint-disable*/
        if (this.answer['from'] && this.answer['to']) {
            this.updateAnswers.emit({ content: this.answer });
        }
    };
    DateComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-date',
                    template: "<div class=\"date-wrapper\" *ngIf=\"payload\">\n  <ng-container *ngIf=\"payload?.duration; else elseBlock\">\n    <mat-form-field class=\"full-width\">\n      <input\n        matInput\n        [matDatepicker]=\"pickerFrom\"\n        placeholder=\"From\"\n        (focus)=\"openCalendarFrom()\"\n        (click)=\"openCalendarFrom()\"\n        (change)=\"updateInputFrom($event.target.value)\"\n        (dateChange)=\"updateInputFrom($event.target.value)\"\n        #pickerFromInput\n        readonly>\n      <mat-datepicker-toggle matSuffix [for]=\"pickerFrom\"></mat-datepicker-toggle>\n      <mat-datepicker #pickerFrom (closed)=\"eventCloseHandlerFrom()\"></mat-datepicker>\n    </mat-form-field>\n    <mat-form-field class=\"full-width\">\n      <input\n        matInput\n        [matDatepicker]=\"pickerTo\"\n        placeholder=\"To\"\n        (focus)=\"openCalendarTo()\"\n        (click)=\"openCalendarTo()\"\n        (change)=\"updateInputTo($event.target.value)\"\n        (dateChange)=\"updateInputTo($event.target.value)\"\n        #pickerToInput\n        readonly>\n      <mat-datepicker-toggle matSuffix [for]=\"pickerTo\"></mat-datepicker-toggle>\n      <mat-datepicker #pickerTo (closed)=\"eventCloseHandlerTo()\"></mat-datepicker>\n    </mat-form-field>\n  </ng-container>\n  <ng-template #elseBlock>\n    <mat-form-field class=\"full-width\">\n      <input\n        matInput\n        [matDatepicker]=\"picker\"\n        placeholder=\"Choose a date\"\n        (focus)=\"openCalendar()\"\n        (click)=\"openCalendar()\"\n        (change)=\"updateInput($event.target.value)\"\n        (dateChange)=\"updateInput($event.target.value)\"\n        #pickerInput\n        readonly>\n      <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n      <mat-datepicker #picker (closed)=\"eventCloseHandler()\"></mat-datepicker>\n    </mat-form-field>\n  </ng-template>\n</div>\n",
                    styles: [".full-width{width:100%}"]
                }] }
    ];
    DateComponent.propDecorators = {
        picker: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['picker', { static: false },] }],
        pickerFrom: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerFrom', { static: false },] }],
        pickerTo: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerTo', { static: false },] }],
        pickerInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerInput', { static: false },] }],
        pickerToInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerToInput', { static: false },] }],
        pickerFromInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerFromInput', { static: false },] }],
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return DateComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IPayloadPhone() { }
if (false) {}
var PhoneComponent = /** @class */ (function () {
    function PhoneComponent(generalStaticDataService) {
        this.generalStaticDataService = generalStaticDataService;
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_7__["Subject"]();
    }
    /**
     * @return {?}
     */
    PhoneComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.countriesList$ = this.generalStaticDataService.getCountriesList();
        this.subject.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["debounceTime"])(500)).subscribe((/**
         * @param {?} inputValue
         * @return {?}
         */
        function (inputValue) {
            _this.updateAnswers.emit({ content: _this.countryCode + ' ' + inputValue });
        }));
    };
    /**
     * @param {?} changes
     * @return {?}
     */
    PhoneComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.flush && changes.flush.currentValue !== undefined) {
            this.updateInput(this.answer);
        }
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PhoneComponent.prototype.updateInput = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.answer = value;
        this.subject.next(value);
    };
    /**
     * @param {?} value
     * @return {?}
     */
    PhoneComponent.prototype.updateCoutryCode = /**
     * @param {?} value
     * @return {?}
     */
    function (value) {
        this.countryCode = value;
    };
    PhoneComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-phone',
                    template: "<mat-form-field class=\"full-width\">\n    <mat-label>Default Country Code</mat-label>\n    <mat-select (selectionChange)=\"updateCoutryCode($event.source.value)\">\n        <mat-option *ngFor=\"let country of countriesList$ | async\" [value]=\"country.phone\">\n            <span>{{country.name}}&nbsp;</span>\n            <span>{{country.phone}}</span>\n        </mat-option>\n    </mat-select>\n</mat-form-field>\n<mat-form-field class=\"full-width\">\n    <input matInput type=\"tel\" [placeholder]=\"'Mobile number'\" (keyup)=\"\n        updateInput($event.target.value)\">\n</mat-form-field>",
                    styles: [".full-width{width:100%}"]
                }] }
    ];
    /** @nocollapse */
    PhoneComponent.ctorParameters = function () { return [
        { type: GeneralStaticDataService }
    ]; };
    PhoneComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PhoneComponent;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} campaignService
 * @param {?} config
 * @return {?}
 */
function surveyServiceFactory(http, campaignService, config) {
    // Make decision on what to instantiate base on config
    return new SurveyService(http, campaignService, config);
}
/** @type {?} */
var components$3 = [
    SurveyComponent,
    QuestionComponent,
    RatingComponent,
    PictureSelectComponent,
    LongTextComponent,
    SelectComponent,
    GroupComponent,
    DateComponent,
    PhoneComponent
];
var SurveyModule = /** @class */ (function () {
    function SurveyModule() {
    }
    SurveyModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$3),
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_3__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatFormFieldModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatInputModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatIconModule"],
                        _angular_material_datepicker__WEBPACK_IMPORTED_MODULE_15__["MatDatepickerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatSelectModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatNativeDateModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatCheckboxModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_11__["MatRadioModule"]
                    ],
                    providers: [
                        {
                            provide: SurveyService,
                            useFactory: surveyServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], ICampaignService, Config]
                        }
                    ],
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$3)
                },] }
    ];
    return SurveyModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IV4MicrositeSettingsResponse() { }
if (false) {}
/**
 * @record
 */
function IV4MicrositeSettings() { }
if (false) {}
var V4ConfigService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4ConfigService, _super);
    function V4ConfigService(http, authenticationService) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.authenticationService = authenticationService;
        return _this;
    }
    /**
     * @param {?} v4Settings
     * @return {?}
     */
    V4ConfigService.v4MicrositeSettingsToMicrositeSettings = /**
     * @param {?} v4Settings
     * @return {?}
     */
    function (v4Settings) {
        return {
            id: v4Settings.id,
            key: v4Settings.key,
            stringValue: v4Settings.string_value,
            jsonValue: v4Settings.json_value,
        };
    };
    /**
     * @return {?}
     */
    V4ConfigService.prototype.readAppConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http.get('assets/config/app-config.json').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["tap"])((/**
         * @param {?} appConfig
         * @return {?}
         */
        function (appConfig) { return _this.appConfig = appConfig; })));
    };
    /**
     * @param {?} key
     * @return {?}
     */
    V4ConfigService.prototype.getTenantAppSettings = /**
     * @param {?} key
     * @return {?}
     */
    function (key) {
        var _this = this;
        if (this.settings) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.settings);
        }
        return this.authenticationService.getAppToken().pipe(
        // todo: remove this.appConfig usage and use readAppConfig directly
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @return {?}
         */
        function () { return _this.http.get(_this.appConfig.apiHost + "/v4/settings/" + key); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return V4ConfigService.v4MicrositeSettingsToMicrositeSettings(data); })));
    };
    /**
     * @return {?}
     */
    V4ConfigService.prototype.getAccountSettings = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http.get('assets/config/app-config.json').pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.display_properties; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} displayProps
         * @return {?}
         */
        function (displayProps) { return displayProps.account || { pages: [] }; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} account
         * @return {?}
         */
        function (account) { return _this.settings = account; })));
    };
    V4ConfigService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4ConfigService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: AuthenticationService }
    ]; };
    /** @nocollapse */ V4ConfigService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4ConfigService_Factory() { return new V4ConfigService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(AuthenticationService)); }, token: V4ConfigService, providedIn: "root" });
    return V4ConfigService;
}(ConfigService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerConfigService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(WhistlerConfigService, _super);
    function WhistlerConfigService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.config = config;
        if (!_this.config.production) {
            _this.endpoint = 'http://localhost:4000/themes';
        }
        else {
            _this.endpoint = _this.config.baseHref + 'themes';
        }
        return _this;
    }
    /**
     * @private
     * @param {?} setting
     * @param {?} config
     * @return {?}
     */
    WhistlerConfigService.WTenantToConfig = /**
     * @private
     * @param {?} setting
     * @param {?} config
     * @return {?}
     */
    function (setting, config) {
        return {
            showHistoryPage: setting.showHistoryPage || true,
            showHomePage: setting.showHomePage || false,
            // showSubtitleLogin: setting.showSubtitleLogin || false,
            // showNewsfeedOnHomepage: setting.showNewsfeedOnHomepage || false,
            // showQrPageSubtitle: setting.showQrPageSubtitle || false,
            // showExpiryOnRewardDetail: setting.showExpiryOnRewardDetail || true,
            // showUserInfoOnAccountsPage: setting.showUserInfoOnAccountsPage || false,
            // showTransactionHistoryOnAccountsPage: setting.showTransactionHistoryOnAccountsPage || false
            production: config.production || false,
            baseHref: config.baseHref || '/'
        };
    };
    /**
     * @return {?}
     */
    WhistlerConfigService.prototype.readAppConfig = /**
     * @return {?}
     */
    function () {
        var _this = this;
        // mostly copy from theme service
        /** @type {?} */
        var themesRequest = {
            url: location.host
        };
        return this.http.post(this.endpoint, themesRequest)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data && res.data[0].attributes.display_properties; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} setting
         * @return {?}
         */
        function (setting) { return WhistlerConfigService.WTenantToConfig(setting, _this.config); })));
    };
    /**
     * @return {?}
     */
    WhistlerConfigService.prototype.getTenantAppSettings = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])();
    };
    /**
     * @return {?}
     */
    WhistlerConfigService.prototype.getAccountSettings = /**
     * @return {?}
     */
    function () {
        var _this = this;
        if (this.settings) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(this.settings);
        }
        /** @type {?} */
        var accountSettingRequest = {
            url: location.host
        };
        return this.http.post(this.endpoint, accountSettingRequest).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data && res.data[0].attributes.display_properties; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} displayProps
         * @return {?}
         */
        function (displayProps) { return displayProps.account || { pages: [] }; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} account
         * @return {?}
         */
        function (account) { return _this.settings = account; })));
    };
    WhistlerConfigService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerConfigService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerConfigService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerConfigService_Factory() { return new WhistlerConfigService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerConfigService, providedIn: "root" });
    return WhistlerConfigService;
}(ConfigService));
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} authenticationService
 * @return {?}
 */
function configServiceFactory(http, config, authenticationService) {
    if (config.isWhistler) {
        return new WhistlerConfigService(http, config);
    }
    return new V4ConfigService(http, authenticationService);
}
var ConfigModule = /** @class */ (function () {
    function ConfigModule() {
    }
    /**
     * @param {?} config
     * @return {?}
     */
    ConfigModule.forRoot = /**
     * @param {?} config
     * @return {?}
     */
    function (config) {
        return {
            ngModule: ConfigModule,
            providers: [
                {
                    provide: Config,
                    useValue: config
                }
            ],
        };
    };
    ConfigModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [],
                    imports: [],
                    providers: [
                        {
                            provide: ConfigService,
                            useFactory: configServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, AuthenticationService]
                        }
                    ]
                },] }
    ];
    return ConfigModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @abstract
 */
var  /**
 * @abstract
 */
InstantOutcomeService = /** @class */ (function () {
    function InstantOutcomeService() {
    }
    return InstantOutcomeService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerInstantOutcomeService = /** @class */ (function () {
    function WhistlerInstantOutcomeService(http, config, rewardsService) {
        this.http = http;
        this.config = config;
        this.rewardsService = rewardsService;
        this.baseUrl = config.apiHost + "/instant-outcome/transactions/";
    }
    /**
     * @private
     * @param {?} campaignId
     * @return {?}
     */
    WhistlerInstantOutcomeService.prototype.getEngagementId = /**
     * @private
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        return this.http
            .get(this.config.apiHost + "/campaign/entities/" + campaignId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            return !(res.data && res.data.attributes)
                ? Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])("Unable to find Response")
                : Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])({
                    engagementId: res.data.attributes.engagement_id,
                    display_properties: res.data.attributes.display_properties || {}
                });
        })));
    };
    // usage is to get return from pipe to call other functions
    // usage is to get return from pipe to call other functions
    /**
     * @param {?} campaignId
     * @return {?}
     */
    WhistlerInstantOutcomeService.prototype.getFromCampaign = 
    // usage is to get return from pipe to call other functions
    /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        var _this = this;
        /** @type {?} */
        var displayProps;
        return this.getEngagementId(campaignId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) {
            displayProps = campaign.display_properties || {};
            return _this.http.get(_this.config.apiHost + "/instant-outcome/engagements/" + campaign.engagementId + "?campaign_id=" + campaignId);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data.attributes.display_properties; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} outcomeData
         * @return {?}
         */
        function (outcomeData) { return ({
            title: outcomeData.title,
            subTitle: outcomeData.sub_title,
            button: outcomeData.button,
            banner: outcomeData.banner,
            backgroundImgUrl: outcomeData.background_img_url,
            cardBackgroundImgUrl: outcomeData.card_background_img_url,
            displayProperties: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, outcomeData.displayProperties, displayProps)
        }); })));
    };
    /**
     * @param {?} campaignId
     * @return {?}
     */
    WhistlerInstantOutcomeService.prototype.claim = /**
     * @param {?} campaignId
     * @return {?}
     */
    function (campaignId) {
        var _this = this;
        /** @type {?} */
        var buildBody = this.getEngagementId(campaignId)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) { return ({
            data: {
                type: 'transactions',
                attributes: {
                    engagement_id: campaign.engagementId,
                    campaign_entity_id: campaignId,
                    status: _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WInstantOutcomeStatus"].confirmed
                }
            }
        }); })));
        /** @type {?} */
        var getRewardIds = buildBody.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} body
         * @return {?}
         */
        function (body) {
            return _this.http.post("" + _this.baseUrl, body, { headers: { 'Content-Type': 'application/vnd.api+json' } });
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} data
         * @return {?}
         */
        function (data) { return data.attributes.results; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return results !== undefined ? Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(results) : Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Empty results object'); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return results.attributes.results; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} results
         * @return {?}
         */
        function (results) { return results.map((/**
         * @param {?} result
         * @return {?}
         */
        function (result) { return result.attributes.source_id; })); })));
        return getRewardIds.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} ids
         * @return {?}
         */
        function (ids) { return ids.map((/**
         * @param {?} id
         * @return {?}
         */
        function (id) { return _this.rewardsService.getReward(id); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["mergeMap"])((/**
         * @param {?} queries
         * @return {?}
         */
        function (queries) { return rxjs__WEBPACK_IMPORTED_MODULE_7__["combineLatest"].apply(void 0, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(queries)); })));
    };
    /**
     * @param {?=} campaignId
     * @return {?}
     */
    WhistlerInstantOutcomeService.prototype.prePlay = /**
     * @param {?=} campaignId
     * @return {?}
     */
    function (campaignId) {
        var _this = this;
        if (!campaignId) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["throwError"])('Missing campaign Id');
        }
        return this.getEngagementId(campaignId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) { return ({
            data: {
                type: 'transactions',
                attributes: {
                    engagement_id: campaign.engagementId,
                    campaign_entity_id: campaignId,
                    status: _perx_whistler__WEBPACK_IMPORTED_MODULE_10__["WInstantOutcomeStatus"].reserved
                }
            }
        }); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["switchMap"])((/**
         * @param {?} body
         * @return {?}
         */
        function (body) {
            return _this.http.post(_this.config.apiHost + "/instant-outcome/transactions", body, { headers: { 'Content-Type': 'application/vnd.api+json' } });
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var rewardIds = res.data.attributes.results ? res.data.attributes.results.attributes.results.map((/**
             * @param {?} outcome
             * @return {?}
             */
            function (outcome) { return outcome.attributes.source_id; })) : [];
            return {
                id: Number.parseInt(res.data.id, 10),
                rewardIds: rewardIds
            };
        })));
    };
    /**
     * @param {?} transactionId
     * @return {?}
     */
    WhistlerInstantOutcomeService.prototype.prePlayConfirm = /**
     * @param {?} transactionId
     * @return {?}
     */
    function (transactionId) {
        /** @type {?} */
        var body = {
            data: {
                type: 'transactions',
                id: transactionId,
                attributes: {
                    status: 'confirmed'
                }
            }
        };
        return this.http
            .patch(this.config.apiHost + "/instant-outcome/transactions/" + transactionId, body, { headers: { 'Content-Type': 'application/vnd.api+json' } })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])((/**
         * @return {?}
         */
        function () { return void 0; })));
    };
    WhistlerInstantOutcomeService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerInstantOutcomeService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"] },
        { type: Config },
        { type: RewardsService }
    ]; };
    /** @nocollapse */ WhistlerInstantOutcomeService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerInstantOutcomeService_Factory() { return new WhistlerInstantOutcomeService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(RewardsService)); }, token: WhistlerInstantOutcomeService, providedIn: "root" });
    return WhistlerInstantOutcomeService;
}());
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @param {?} rewardService
 * @return {?}
 */
function instantRewardsSvcFactory(http, config, rewardService) {
    // Make decision on what to instantiate base on config
    return new WhistlerInstantOutcomeService(http, config, rewardService);
}
var OutcomeModule = /** @class */ (function () {
    function OutcomeModule() {
    }
    OutcomeModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
                    ],
                    providers: [
                        {
                            provide: InstantOutcomeService,
                            useFactory: instantRewardsSvcFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_4__["HttpClient"], Config, RewardsService]
                        }
                    ]
                },] }
    ];
    return OutcomeModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=perx-core.js.map


/***/ }),

/***/ "../../libs/perx-whistler/dist/whistler/fesm5/whistler.js":
/*!**********************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/libs/perx-whistler/dist/whistler/fesm5/whistler.js ***!
  \**********************************************************************************************/
/*! exports provided: WAssignedStatus, WEngagementType, WInformationCollectionSettingType, WInstantOutcomeStatus, WRedemptionType, WSurveyQuestionType, WhistlerModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WAssignedStatus", function() { return WAssignedStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WEngagementType", function() { return WEngagementType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WInformationCollectionSettingType", function() { return WInformationCollectionSettingType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WInstantOutcomeStatus", function() { return WInstantOutcomeStatus; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WRedemptionType", function() { return WRedemptionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WSurveyQuestionType", function() { return WSurveyQuestionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "WhistlerModule", function() { return WhistlerModule; });
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerModule = /** @class */ (function () {
    function WhistlerModule() {
    }
    WhistlerModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_0__["NgModule"], args: [{
                    imports: [],
                    exports: []
                },] }
    ];
    return WhistlerModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var WAssignedStatus = {
    issued: 'issued',
    assigned: 'assigned',
    reserved: 'reserved',
    expired: 'expired',
};
/**
 * @record
 */
function IWAssignedAttributes() { }
if (false) {}
/**
 * @record
 */
function IWPurchaseAttributes() { }
if (false) {}
/**
 * @record
 */
function IWAssignRequestAttributes() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var WRedemptionType = {
    promoCode: 'Promo Code',
    qrCode: 'QR Code',
    merchantPin: 'Merchant PIN',
    barCode: 'Bar Code',
};
/**
 * @record
 */
function IWRewardEntityAttributes() { }
if (false) {}
/**
 * @record
 */
function IWMetaData() { }
if (false) {}
/**
 * @record
 */
function IWProperties() { }
if (false) {}
/**
 * @record
 */
function IWTierRewardCostsAttributes() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IWCampaignAttributes() { }
if (false) {}
/**
 * @record
 */
function IWCampaignDisplayProperties() { }
if (false) {}
/** @enum {string} */
var WInformationCollectionSettingType = {
    not_required: 'not_required',
    pi_required: 'pi_required',
    signup_required: 'signup_required',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var WEngagementType = {
    games: 'game',
    survey: 'survey',
    stamp: 'stamp',
    instantOutcome: 'instant_outcome',
    loyalty: 'loyalty',
};
/**
 * @record
 */
function IWEngagementProperties() { }
/**
 * @record
 * @template T
 */
function IWEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWGameEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWTreeGameEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWPinataGameEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWSpinGameEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWScratchGameEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWInstantOutcomeEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWSurveyEngagementAttributes() { }
if (false) {}
/**
 * @record
 */
function IWStampEngagementAttributes() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IWInstantOutcomeTransactionAttributes() { }
if (false) {}
/**
 * @record
 */
function IWInstantOutcomeTxnReq() { }
if (false) {}
/** @enum {string} */
var WInstantOutcomeStatus = {
    reserved: 'reserved',
    confirmed: 'confirmed',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @record
 */
function IWQuestion() { }
if (false) {}
/** @enum {string} */
var WSurveyQuestionType = {
    rating: 'rating',
    pictureChoice: 'picture-select',
    longText: 'long-text',
    multipleChoice: 'select',
    questionGroup: 'group',
    date: 'date',
    phone: 'phone',
};
/**
 * @record
 */
function IWPayload() { }
if (false) {}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */


//# sourceMappingURL=whistler.js.map


/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/app.component.html ***!
  \************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app\">\n    <router-outlet></router-outlet>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/category/category-select/category-select.component.html":
/*!*************************************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/category/category-select/category-select.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\">\n  <div class=\"popup-header\">\n    <h1>Pick a category</h1>\n    <button class=\"icon\" (click)=\"dismiss($event)\">\n      <img src=\"assets/SH-close.svg\" alt=\"\">\n    </button>\n  </div>\n  <mat-card class=\"mat-elevation-z2\">\n    <div *ngFor=\"let category of categories\">\n      <label [ngClass] = \"{'label-selected': selectedCategory === category.name}\" (click)=\"onCategorySelected(category)\">\n        {{category.name}}\n        <mat-icon *ngIf=\"selectedCategory === category.name\">\n          <img src=\"assets/SH-tick.svg\" alt=\"\">\n        </mat-icon>\n      </label>\n    </div>\n  </mat-card>\n  <button mat-flat-button color=\"primary\" (click)=\"apply($event)\">Apply</button>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/category/category-sort/category-sort.component.html":
/*!*********************************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/category/category-sort/category-sort.component.html ***!
  \*********************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\">\n  <div class=\"popup-header\">\n    <h1>Sort by</h1>\n    <button class=\"icon\" (click)=\"dismiss($event)\">\n      <mat-icon><img src=\"assets/SH-close.svg\" alt=\"\"></mat-icon>\n    </button>\n  </div>\n  <mat-card class=\"mat-elevation-z2\">\n    <div *ngFor=\"let criteria of sortingCriterias\">\n      <label [ngClass] = \"{'label-selected': selectedCriteria === criteria}\" (click)=\"onSortingOrderSelected(criteria)\">\n        {{criteria}}\n        <mat-icon *ngIf=\"selectedCriteria === criteria\">\n          <img src=\"assets/SH-tick.svg\" alt=\"\">\n        </mat-icon>\n      </label>\n    </div>\n  </mat-card>\n  <button mat-flat-button color=\"primary\" (click)=\"apply($event)\">Apply</button>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/category/category.component.html":
/*!**************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/category/category.component.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n  <button [routerLink]=\"[ '/home/discover']\" class=\"icon\">\n    <mat-icon>arrow_backward</mat-icon>\n  </button>\n  <div class=\"spacer\"></div>\n  <span *ngIf=\"showToolbarTitle\" class=\"toolbar-title\">{{selectedCategory}}</span>\n  <button class=\"icon\" (click)=\"selectCategory()\">\n    <img src=\"assets/category.svg\" alt=\"\">\n  </button>\n  <button class=\"icon\" (click)=\"selectSort()\">\n    <img src=\"assets/sort.svg\" alt=\"\">\n  </button>\n</mat-toolbar>\n<div *ngIf=\"rewards\" class=\"content\" cdkScrollable>\n  <h1 class=\"catergory-title\">{{selectedCategory}}</h1>\n  <perx-core-rewards-list\n    [rewardsList]=\"rewards | rewardsSort: selectedSortingCraeteria\"\n    (tapped)=\"selected($event)\"\n  ></perx-core-rewards-list>\n</div>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/congrats/congrats.component.html":
/*!**************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/congrats/congrats.component.html ***!
  \**************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar *ngIf=\"vouchers && vouchers.length !== 0\">\n  <h1>Congratulations, you won!</h1>\n  <h2>Here are some treats for you to enjoy.</h2>\n</mat-toolbar>\n<div class=\"main\">\n  <div *ngIf=\"vouchers && vouchers.length > 1\" class=\"multiple-vouchers\">\n    <a [routerLink]=\"[ '/voucher']\" [queryParams]=\"{id: voucher.id}\" *ngFor=\"let voucher of vouchers\">\n      <mat-card matRipple class=\"mat-elevation-z4\">\n        <div class=\"featured-image\">\n          <img mat-card-image [src]=\"voucher.thumbnailImg\">\n        </div>\n        <mat-card-content>\n          <div>\n            <h1>{{voucher.name}}</h1>\n            <h2>{{voucher.merchantName}}</h2>\n          </div>\n          <div class=\"logo\" *ngIf=\"voucher.merchantImg\">\n            <img [src]=\"voucher.merchantImg\">\n          </div>\n        </mat-card-content>\n      </mat-card>\n    </a>\n  </div>\n  <div *ngIf=\"vouchers && vouchers.length === 1;\" class=\"single-voucher\">\n    <a [routerLink]=\"[ '/voucher' ]\" [queryParams]=\"{id: voucher.id}\" *ngFor=\"let voucher of vouchers\">\n      <mat-card matRipple class=\"mat-elevation-z4\">\n        <img mat-card-image [src]=\"voucher.rewardBanner\">\n        <mat-card-content>\n          <div class=\"logo\" *ngIf=\"voucher.merchantImg\">\n            <img [src]=\"voucher.merchantImg\">\n          </div>\n          <div class=\"txt\">\n            <h1>{{voucher.name}}</h1>\n            <h2>{{voucher.merchantName}}</h2>\n          </div>\n        </mat-card-content>\n      </mat-card>\n    </a>\n  </div>\n</div>\n<div *ngIf=\"vouchers && vouchers.length !== 0\" class=\"actions\">\n  <a mat-flat-button color=\"primary\" (click)=\"navigateToRewards()\">View My Reward</a>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/error/error.component.html":
/*!********************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/error/error.component.html ***!
  \********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <p>We're sorry, the service is currently unavailable. Please try again later.</p>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/game/game.component.html":
/*!******************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/game/game.component.html ***!
  \******************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\" [ngStyle]=\"{'background-image': 'url(' + backgroundImage + ')'}\">\n  <div class=\"game-wrapper\">\n    <div class=\"labels\">\n      <h1 class=\"title\">{{title}}</h1>\n      <span class=\"sub-title\">{{subTitle}}</span>\n    </div>\n    <div *ngIf=\"isGameAvailable\" class=\"pinata-wrapper\">\n\n      <perx-core-pinata\n        *ngIf=\"game && game.type === pinata\"\n        [stillImg]=\"game.config.stillImg\"\n        [openedImg]=\"game.config.brokenImg\"\n        [movingImg]=\"game.config.breakingImg\"\n        [nbTaps]=\"numberOfTaps\"\n        [enabled]=\"isEnabled\"\n        (broken)=\"gameCompleted()\"\n      >\n      </perx-core-pinata>\n\n      <perx-core-shake-tree\n        *ngIf=\"game && game.type === shakeTheTree\"\n        [treeImg]=\"game.config.treeImg || 'assets/tree/tree.png'\"\n        [giftImg]=\"game.config.giftImg || 'assets/tree/gift.png'\"\n        [nbHangedGifts]=\"game.config.nbHangedGift\"\n        [nbFallingGifts]=\"game.config.nbGiftsToDrop\"\n        (completed)=\"gameCompleted()\"\n        [enabled]=\"isEnabled\"\n        [nbShakes]=\"numberOfTaps\"\n      >\n      </perx-core-shake-tree>\n\n    </div>\n  </div>\n\n  <div class=\"button-area\">\n    <button mat-flat-button color=\"primary\" [disabled]=\"isButtonDisabled\" (click)=\"isEnabled = true\"\n      [ngStyle]=\"{ 'visibility': isEnabled ? 'hidden': 'visible'}\">\n      {{buttonText}}\n    </button>\n  </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/location-short-format/location-short-format.component.html":
/*!****************************************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/location-short-format/location-short-format.component.html ***!
  \****************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\">\n  <div class=\"loc\">\n    <div *ngIf=\"(displayLocation$ | async) as location\" class=\"address\">\n      <h1 class=\"title\">Location</h1>\n      <h1>{{location.name}}</h1>\n      <p>{{location.address}}</p>\n      <p>{{location.address2}}</p>\n    </div>\n  </div>\n  <a mat-button color=\"primary\" [routerLink]=\"['/locations']\" [queryParams]=\"{mid:merchantId, rid:rewardId}\"\n    *ngIf=\"(locations$ | async)?.length > 1\">See All {{(locations$ | async)?.length}} Locations</a>\n</div>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/locations/locations.component.html":
/*!****************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/locations/locations.component.html ***!
  \****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n  <mat-toolbar-row>\n    <button (click)=\"back()\" class=\"icon\">\n      <mat-icon>arrow_backward</mat-icon>\n    </button>\n  </mat-toolbar-row>\n  <mat-toolbar-row>Location</mat-toolbar-row>\n  <mat-toolbar-row></mat-toolbar-row>\n</mat-toolbar>\n\n<div class=\"content\">\n  <div class=\"loc\" *ngFor=\"let loc of locations | async\">\n    <div class=\"address\">\n      <h1>{{loc.name}}</h1>\n      <p>{{loc.address}}</p>\n      <p>{{loc.address2}}</p>\n    </div>\n    <div class=\"distance\" *ngIf=\"loc.distance\">\n      <h1>{{loc.distance | distance}}</h1>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/redemption/redemption.component.html":
/*!******************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/redemption/redemption.component.html ***!
  \******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\" *ngIf=\"voucher\">\n  <div class=\"contents\">\n    <div class=\"app-header\">\n      <button class=\"icon\" (click)=\"back()\">\n        <mat-icon>arrow_backward</mat-icon>\n      </button>\n      <img [src]=\"voucher.rewardBanner\" class=\"banner\">\n    </div>\n    <div class=\"redeem-block\">\n      <div [ngClass]=\"(voucher.redemptionType === 'txtCode' && !voucher.code)?'inner no-code':'inner'\">\n        <div class=\"upper-section\">\n          <div class=\"code-redemption unavailable\" *ngIf=\"voucher.state === 'redeemed' || voucher.state === 'expired'; else available\">\n            <p>Your reward is</p>\n            <span class=\"code\">{{voucher.state}}</span>\n          </div>\n          <ng-template #available>\n            <div *ngIf=\"voucher.redemptionType === 'txtCode'\">\n              <div class=\"code-redemption\">\n                <ng-template [ngIf]=\"voucher.code\">\n                  <h1>Promo code</h1>\n                  <input class=\"code\" #codeInput matInput type=\"text\" [value]=\"voucher.code\" readonly>\n                  <button mat-button color=\"primary\" (click)=\"copyCode(codeInput)\">Copy the code</button>\n                </ng-template>\n              </div>\n            </div>\n            <div *ngIf=\"voucher.redemptionType === 'pin'\" class=\"code-redemption\">\n              <p>Please ask cashier to enter PIN</p>\n              <button *ngIf=\"!showEnterPinComponent else pinComponent\" class=\"enter-pin\" mat-flat-button color=\"primary\" (click)=\"showPinComponent()\">Enter PIN</button>\n              <ng-template #pinComponent>\n                <div class=\"pin-input-container\">\n                  <perx-core-pin-input #pinInput\n                  [length]=\"4\"\n                  (full)=\"full($event)\"\n                  (update)=\"updatePin()\">\n                  </perx-core-pin-input>\n\t              </div>\n              </ng-template>\n            </div>\n          </ng-template>\n        </div>\n        <div class=\"middle-section\">\n          <img src=\"assets/cutout.png\">\n        </div>\n        <div class=\"lower-section mat-elevation-z2\">\n          <div [ngClass]=\"'lower-section ' + voucher.state\">\n            <perx-core-voucher \n              [hideMerchantImg]=\"false\"\n              [hideMerchantName]=\"false\"\n              [hideActions]=\"true\"\n              [voucher]=\"voucher$\">\n            </perx-core-voucher>\n          </div>\n          <mat-divider></mat-divider>\n          <div class=\"action\">\n            <button *ngIf=\"showEnterPinComponent && !isPinEntered\" mat-button color=\"primary\" (click)=\"cancelClicked()\">Cancel</button>\n            <button *ngIf=\"showEnterPinComponent && isPinEntered && !isPinCorrect\" mat-flat-button color=\"primary\" (click)=\"tryAgainClicked()\">Try Again</button>\n            <button *ngIf=\"voucher.state === 'redeemed' || voucher.state === 'expired'\" mat-flat-button color=\"primary\" (click)=\"backMyRewardsClicked()\">Back to My Rewards</button>\n          </div>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/reward-popup/reward-popup.component.html":
/*!**********************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/reward-popup/reward-popup.component.html ***!
  \**********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"close-button-container\">\n\t<img [src]=\"'assets/popup-close.png'\" (click)=\"onClose()\" />\n</div>\n<div class=\"content\">\n\t<app-expire-timer [timerEndDate]=\"validTo\" (hasExpired)=\"onTimerExpired()\" (isExpiring)=\"onExpiring()\">\n\t</app-expire-timer>\n\t<div *ngIf=\"imageUrl\" class=\"img-wrapper\">\n\t\t<img [src]=\"imageUrl\" />\n\t</div>\n\t<mat-dialog-content *ngIf=\"text\">{{text}}</mat-dialog-content>\n\t<button mat-flat-button color=\"primary\" mat-dialog-close (click)=\"buttonPressed()\">{{buttonTxt}}</button>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/reward/expire-timer/expire-timer.component.html":
/*!*****************************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/reward/expire-timer/expire-timer.component.html ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngFor=\"let time of dateTime$ | async\">\n\t<span class=\"timerDisplay\">{{time.days}}:{{time.hours | number:'2.0'}}:{{time.minutes | number:'2.0'}}:{{time.seconds | number:'2.0'}}</span>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/reward/reward-detail/reward-detail.component.html":
/*!*******************************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/reward/reward-detail/reward-detail.component.html ***!
  \*******************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\" *ngIf=\"reward\">\n  <div [ngClass]=\"'contents ' + className\">\n    <div class=\"app-header\">\n      <button *ngIf=\"showBackButton\" class=\"icon\" (click)=\"back()\">\n        <mat-icon>arrow_backward</mat-icon>\n      </button>\n      <img *ngIf=\"showBannerImage\" class=\"banner\" [src]=\"reward.rewardBanner\">\n      <div class=\"badge\" *ngIf=\"reward.merchantImg\">\n        <img [src]=\"reward.merchantImg\">\n      </div>\n    </div>\n\n    <div class=\"container\">\n      <div *ngIf=\"reward\" class=\"reward-merchant\">\n        <h1>{{reward.name}}</h1>\n        <h2>{{reward.merchantName}}</h2>\n        <div *ngIf=\"showMacaron && macaron\" class=\"macaron-container\">\n          <span [ngClass]=\"macaron.class\">{{macaron.label}}</span>\n        </div>\n        <div *ngIf=\"!isExpired && macaron\">\n          <app-expire-timer\n            *ngIf=\"macaron.class === 'expiring'\"\n            [timerEndDate]=\"reward.validTo\"\n            (hasExpired)=\"setToExpired()\"\n            (isExpiring)=\"onExpiring()\">\n          </app-expire-timer>\n        </div>\n        <span *ngIf=\"macaron && macaron.class === 'running-out'\" class=\"reward-balance\">{{macaron.rewardBalance}}\n          left</span>\n      </div>\n\n      <div class=\"content\">\n        <div class=\"description\" [innerHtml]=\"reward.description\"></div>\n      </div>\n\n      <app-location-short-format [merchantId]=\"reward.merchantId\" [rewardId]=\"reward.id\"></app-location-short-format>\n\n      <div class=\"content\">\n        <h1>Terms & Conditions</h1>\n        <div class=\"terms-conditions\" [innerHtml]=\"reward.termsAndConditions\"></div>\n      </div>\n\n      <div class=\"content about\">\n        <h1>About {{reward.merchantName}}</h1>\n\n        <div class=\"phone-contact\">\n          <a>\n            <span class=\"icon\">\n              <mat-icon>phone</mat-icon>\n            </span>\n            Call to {{reward.merchantName}}\n          </a>\n        </div>\n\n        <div class=\"email-contact\">\n          <a>\n            <span class=\"icon\">\n              <mat-icon>email</mat-icon>\n            </span>\n            Email to {{reward.merchantName}}\n          </a>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/reward/reward.component.html":
/*!**********************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/reward/reward.component.html ***!
  \**********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <div class=\"reward-container\">\n    <perx-core-reward [reward]=\"reward$\"></perx-core-reward>\n  </div>\n  <div *ngIf=\"isButtonEnable && (reward$ | async) as reward\" class=\"button-area\">\n    <button [disabled]=\"!isButtonEnable\" class=\"full-width\" mat-flat-button color=\"primary\" (click)=\"save(reward)\">Save to My Rewards</button>\n  </div>\n</div>\n<button class=\"icon\" (click)=\"back()\">\n  <mat-icon>arrow_backward</mat-icon>\n</button>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/tnc/tnc.component.html":
/*!****************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/tnc/tnc.component.html ***!
  \****************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-toolbar>\n    <button (click)=\"back()\" class=\"icon\">\n        <mat-icon>arrow_backward</mat-icon>\n    </button>\n    <div class=\"spacer\">Terms & Conditions</div>\n</mat-toolbar>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/voucher/voucher.component.html":
/*!************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/voucher/voucher.component.html ***!
  \************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main\">\n  <div class=\"voucher-container\">\n    <perx-core-voucher \n      [hideMerchantImg]=\"false\"\n      [hideMerchantName]=\"false\"\n      [hideActions]=\"true\"\n      [voucher]=\"voucher$\">\n    </perx-core-voucher>\n  </div>\n  <div *ngIf=\"isButtonEnabled && (voucher$ | async) as voucher\" class=\"button-area\">\n    <button mat-flat-button class=\"full-width\" color=\"primary\" [routerLink]=\"[ '/redemption' ]\"\n      [queryParams]=\"{id:voucher.id}\">Redeem now</button>\n  </div>\n</div>\n<button class=\"icon\" (click)=\"back()\">\n  <mat-icon>arrow_backward</mat-icon>\n</button>"

/***/ }),

/***/ "./$$_lazy_route_resource lazy recursive":
/*!******************************************************!*\
  !*** ./$$_lazy_route_resource lazy namespace object ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncaught exception popping up in devtools
	return Promise.resolve().then(function() {
		var e = new Error("Cannot find module '" + req + "'");
		e.code = 'MODULE_NOT_FOUND';
		throw e;
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "./$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "./src/app/app-routing.module.ts":
/*!***************************************!*\
  !*** ./src/app/app-routing.module.ts ***!
  \***************************************/
/*! exports provided: AppRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppRoutingModule", function() { return AppRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category/category.component */ "./src/app/category/category.component.ts");
/* harmony import */ var _reward_reward_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./reward/reward.component */ "./src/app/reward/reward.component.ts");
/* harmony import */ var _voucher_voucher_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./voucher/voucher.component */ "./src/app/voucher/voucher.component.ts");
/* harmony import */ var _locations_locations_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./locations/locations.component */ "./src/app/locations/locations.component.ts");
/* harmony import */ var _tnc_tnc_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./tnc/tnc.component */ "./src/app/tnc/tnc.component.ts");
/* harmony import */ var _redemption_redemption_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./redemption/redemption.component */ "./src/app/redemption/redemption.component.ts");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./game/game.component */ "./src/app/game/game.component.ts");
/* harmony import */ var _congrats_congrats_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./congrats/congrats.component */ "./src/app/congrats/congrats.component.ts");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./error/error.component */ "./src/app/error/error.component.ts");












var routes = [
    { path: 'home', loadChildren: function () { return __webpack_require__.e(/*! import() | home-home-module */ "home-home-module").then(__webpack_require__.bind(null, /*! ./home/home.module */ "./src/app/home/home.module.ts")).then(function (mod) { return mod.HomeModule; }); } },
    { path: 'category', component: _category_category_component__WEBPACK_IMPORTED_MODULE_3__["CategoryComponent"] },
    { path: 'reward', component: _reward_reward_component__WEBPACK_IMPORTED_MODULE_4__["RewardComponent"] },
    { path: 'voucher', component: _voucher_voucher_component__WEBPACK_IMPORTED_MODULE_5__["VoucherComponent"] },
    { path: 'locations', component: _locations_locations_component__WEBPACK_IMPORTED_MODULE_6__["LocationsComponent"] },
    { path: 'tnc', component: _tnc_tnc_component__WEBPACK_IMPORTED_MODULE_7__["TncComponent"] },
    { path: 'redemption', component: _redemption_redemption_component__WEBPACK_IMPORTED_MODULE_8__["RedemptionComponent"] },
    { path: '', pathMatch: 'full', redirectTo: 'home' },
    { path: 'game', component: _game_game_component__WEBPACK_IMPORTED_MODULE_9__["GameComponent"] },
    { path: 'congrats', component: _congrats_congrats_component__WEBPACK_IMPORTED_MODULE_10__["CongratsComponent"] },
    { path: 'error', component: _error_error_component__WEBPACK_IMPORTED_MODULE_11__["ErrorComponent"] }
];
var AppRoutingModule = /** @class */ (function () {
    function AppRoutingModule() {
    }
    AppRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forRoot(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], AppRoutingModule);
    return AppRoutingModule;
}());



/***/ }),

/***/ "./src/app/app.component.scss":
/*!************************************!*\
  !*** ./src/app/app.component.scss ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host, .app {\n  width: 100%;\n  height: 100%;\n  display: block;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUNDRiIsImZpbGUiOiJzcmMvYXBwL2FwcC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0LCAuYXBwIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogYmxvY2s7XG59XG4iLCI6aG9zdCwgLmFwcCB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IGJsb2NrO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/app.component.ts":
/*!**********************************!*\
  !*** ./src/app/app.component.ts ***!
  \**********************************/
/*! exports provided: AppComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppComponent", function() { return AppComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");





// import { RewardPopupComponent } from './reward-popup/reward-popup.component';


var AppComponent = /** @class */ (function () {
    function AppComponent(authenticationService, notificationService, activeRoute, campaignService, dialog, router, snackBar, tokenStorage) {
        this.authenticationService = authenticationService;
        this.notificationService = notificationService;
        this.activeRoute = activeRoute;
        this.campaignService = campaignService;
        this.dialog = dialog;
        this.router = router;
        this.snackBar = snackBar;
        this.tokenStorage = tokenStorage;
        this.reward = null;
        this.game = null;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notificationService.$popup.subscribe(function (data) { return _this.dialog.open(_perx_core__WEBPACK_IMPORTED_MODULE_2__["PopupComponent"], { data: data }); });
        this.notificationService.$snack.subscribe(function (msg) { return _this.snackBar.open(msg, 'x', { duration: 2000 }); });
        this.activeRoute.queryParams
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (params) { return params.token; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (params) { return params.token; }))
            .subscribe(function (token) {
            _this.authenticationService.saveUserAccessToken(token);
            _this.fetchCampaigns();
        });
    };
    AppComponent.prototype.fetchCampaigns = function () {
        var _this = this;
        this.campaignService.getCampaigns()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["catchError"])(function () {
            _this.router.navigateByUrl('error');
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_6__["of"])([]);
        }))
            .subscribe(function () { });
    };
    AppComponent.prototype.dialogClosed = function () {
        if (this.reward !== null) {
            this.router.navigate(["/reward"], { queryParams: { id: this.reward.id } });
        }
        else if (this.game !== null) {
            this.router.navigate(["/game"], { queryParams: { id: this.game.id } });
        }
        else {
            console.error('Something fishy, we should not be here, without any reward or game');
        }
    };
    AppComponent.prototype.idExistsInStorage = function (id) {
        var campaignIdsInLocalStorage = this.tokenStorage.getAppInfoProperty('campaignIdsPopup');
        var ids = campaignIdsInLocalStorage ? JSON.parse(campaignIdsInLocalStorage) : [];
        if (ids.includes(id)) {
            return true;
        }
        ids.push(id);
        this.tokenStorage.setAppInfoProperty(JSON.stringify(ids), 'campaignIdsPopup');
        return false;
    };
    AppComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["ICampaignService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["TokenStorage"] }
    ]; };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["ICampaignService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatSnackBar"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["TokenStorage"]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "./src/app/app.module.ts":
/*!*******************************!*\
  !*** ./src/app/app.module.ts ***!
  \*******************************/
/*! exports provided: AppModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AppModule", function() { return AppModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _category_category_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./category/category.component */ "./src/app/category/category.component.ts");
/* harmony import */ var _reward_reward_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./reward/reward.component */ "./src/app/reward/reward.component.ts");
/* harmony import */ var _locations_locations_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./locations/locations.component */ "./src/app/locations/locations.component.ts");
/* harmony import */ var _tnc_tnc_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./tnc/tnc.component */ "./src/app/tnc/tnc.component.ts");
/* harmony import */ var _voucher_voucher_component__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ./voucher/voucher.component */ "./src/app/voucher/voucher.component.ts");
/* harmony import */ var _redemption_redemption_component__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! ./redemption/redemption.component */ "./src/app/redemption/redemption.component.ts");
/* harmony import */ var _category_category_select_category_select_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./category/category-select/category-select.component */ "./src/app/category/category-select/category-select.component.ts");
/* harmony import */ var _category_category_sort_category_sort_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./category/category-sort/category-sort.component */ "./src/app/category/category-sort/category-sort.component.ts");
/* harmony import */ var _category_rewards_sort_pipe__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./category/rewards-sort.pipe */ "./src/app/category/rewards-sort.pipe.ts");
/* harmony import */ var _location_short_format_location_short_format_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./location-short-format/location-short-format.component */ "./src/app/location-short-format/location-short-format.component.ts");
/* harmony import */ var _reward_reward_detail_reward_detail_component__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./reward/reward-detail/reward-detail.component */ "./src/app/reward/reward-detail/reward-detail.component.ts");
/* harmony import */ var _game_game_component__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./game/game.component */ "./src/app/game/game.component.ts");
/* harmony import */ var _congrats_congrats_component__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./congrats/congrats.component */ "./src/app/congrats/congrats.component.ts");
/* harmony import */ var _reward_popup_reward_popup_component__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./reward-popup/reward-popup.component */ "./src/app/reward-popup/reward-popup.component.ts");
/* harmony import */ var _reward_expire_timer_expire_timer_component__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./reward/expire-timer/expire-timer.component */ "./src/app/reward/expire-timer/expire-timer.component.ts");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_24__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _error_error_component__WEBPACK_IMPORTED_MODULE_26__ = __webpack_require__(/*! ./error/error.component */ "./src/app/error/error.component.ts");



























var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"],
                _category_category_component__WEBPACK_IMPORTED_MODULE_9__["CategoryComponent"],
                _reward_reward_component__WEBPACK_IMPORTED_MODULE_10__["RewardComponent"],
                _locations_locations_component__WEBPACK_IMPORTED_MODULE_11__["LocationsComponent"],
                _tnc_tnc_component__WEBPACK_IMPORTED_MODULE_12__["TncComponent"],
                _voucher_voucher_component__WEBPACK_IMPORTED_MODULE_13__["VoucherComponent"],
                _redemption_redemption_component__WEBPACK_IMPORTED_MODULE_14__["RedemptionComponent"],
                _category_category_select_category_select_component__WEBPACK_IMPORTED_MODULE_15__["CategorySelectComponent"],
                _category_category_sort_category_sort_component__WEBPACK_IMPORTED_MODULE_16__["CategorySortComponent"],
                _category_rewards_sort_pipe__WEBPACK_IMPORTED_MODULE_17__["RewardsSortPipe"],
                _location_short_format_location_short_format_component__WEBPACK_IMPORTED_MODULE_18__["LocationShortFormatComponent"],
                _reward_reward_detail_reward_detail_component__WEBPACK_IMPORTED_MODULE_19__["RewardDetailComponent"],
                _game_game_component__WEBPACK_IMPORTED_MODULE_20__["GameComponent"],
                _congrats_congrats_component__WEBPACK_IMPORTED_MODULE_21__["CongratsComponent"],
                _reward_popup_reward_popup_component__WEBPACK_IMPORTED_MODULE_22__["RewardPopupComponent"],
                _reward_expire_timer_expire_timer_component__WEBPACK_IMPORTED_MODULE_23__["ExpireTimerComponent"],
                _error_error_component__WEBPACK_IMPORTED_MODULE_26__["ErrorComponent"],
            ],
            imports: [
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["ConfigModule"].forRoot(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _environments_environment__WEBPACK_IMPORTED_MODULE_6__["environment"])),
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_1__["BrowserModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["CampaignModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_3__["AppRoutingModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatBottomSheetModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDividerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatSnackBarModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["UtilsModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_8__["BrowserAnimationsModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["ProfileModule"],
                _angular_common_http__WEBPACK_IMPORTED_MODULE_24__["HttpClientModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["RewardsModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["AuthenticationModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["ProfileModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["VouchersModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["GameModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["LocationModule"],
                _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_25__["ScrollingModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["CampaignModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["MerchantsModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["RewardsModule"]
            ],
            entryComponents: [
                _category_category_select_category_select_component__WEBPACK_IMPORTED_MODULE_15__["CategorySelectComponent"],
                _category_category_sort_category_sort_component__WEBPACK_IMPORTED_MODULE_16__["CategorySortComponent"],
                _reward_popup_reward_popup_component__WEBPACK_IMPORTED_MODULE_22__["RewardPopupComponent"]
            ],
            providers: [],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_4__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/category.mock.ts":
/*!**********************************!*\
  !*** ./src/app/category.mock.ts ***!
  \**********************************/
/*! exports provided: categories */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "categories", function() { return categories; });
var categories = [
    {
        name: 'All',
        icon: 'all.svg'
    },
    {
        name: 'Eat',
        icon: 'eat.svg'
    },
    {
        name: 'Shop',
        icon: 'shop.svg'
    },
    {
        name: 'Play',
        icon: 'play.svg'
    }
];


/***/ }),

/***/ "./src/app/category/category-select/category-select.component.scss":
/*!*************************************************************************!*\
  !*** ./src/app/category/category-select/category-select.component.scss ***!
  \*************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: transparent;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n.main-container .popup-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.main-container .popup-header h1 {\n  color: #1862b8;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.main-container button {\n  width: 100%;\n  height: 6rem;\n  color: white;\n  margin: 1rem 0;\n}\n.main-container label {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  color: #666666;\n  padding: 1.5rem;\n  border: 1px solid #F1F2F4;\n  border-radius: 0.5rem;\n  margin: 0.5rem;\n}\n.main-container label mat-icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  height: auto;\n  width: auto;\n}\n.main-container .label-selected {\n  color: #1862b8;\n  background: #8db5e3;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvY2F0ZWdvcnkvY2F0ZWdvcnktc2VsZWN0L2NhdGVnb3J5LXNlbGVjdC5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaWNvbi5zY3NzIiwic3JjL2FwcC9jYXRlZ29yeS9jYXRlZ29yeS1zZWxlY3QvY2F0ZWdvcnktc2VsZWN0LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdFO0VDRkEsb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFERGdCO0VDRWhCLGNERmdCO0VDR2hCLGtCQUFBO0VBQ0EsdUJESndCO0VDS3hCLGNBVDJEO0VBVTNELGlCRE5nQjtFQ09oQixTQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7QUNDRjtBRlBFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUVTSjtBRlBJO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUVTTjtBRkxFO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsY0FBQTtBRU9KO0FGSkU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EsY0FBQTtFQUNBLGVBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0EsY0FBQTtBRU1KO0FGSkk7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FFTU47QUZGRTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBRUlKIiwiZmlsZSI6InNyYy9hcHAvY2F0ZWdvcnkvY2F0ZWdvcnktc2VsZWN0L2NhdGVnb3J5LXNlbGVjdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL2ljb24uc2Nzcyc7XG5cbi5tYWluLWNvbnRhaW5lciB7XG4gIC5pY29uIHtcbiAgICBAaW5jbHVkZSBpY29uKDMuMnJlbSwgdHJhbnNwYXJlbnQpO1xuICB9XG5cbiAgLnBvcHVwLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgaDEge1xuICAgICAgY29sb3I6ICMxODYyYjg7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgfVxuICB9XG5cbiAgYnV0dG9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDZyZW07XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbjogMXJlbSAwO1xuICB9XG5cbiAgbGFiZWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gICAgcGFkZGluZzogMS41cmVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGMUYyRjQ7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIG1hcmdpbjogMC41cmVtO1xuXG4gICAgbWF0LWljb24ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIHdpZHRoOiBhdXRvO1xuICAgIH1cbiAgfVxuXG4gIC5sYWJlbC1zZWxlY3RlZCB7XG4gICAgY29sb3I6ICMxODYyYjg7XG4gICAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgfVxufVxuIiwiQG1peGluIGljb24oJGRpYW1ldGVyOiAzLjJyZW0sICRiYWNrZ3JvdW5kOiAjOGRiNWUzLCAkY29sb3I6ICMxODYyYjgpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6ICRkaWFtZXRlcjtcbiAgaGVpZ2h0OiAkZGlhbWV0ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkY29sb3I7XG4gIG1pbi13aWR0aDogJGRpYW1ldGVyO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4iLCIubWFpbi1jb250YWluZXIgLmljb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMy4ycmVtO1xuICBoZWlnaHQ6IDMuMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICMxODYyYjg7XG4gIG1pbi13aWR0aDogMy4ycmVtO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4ubWFpbi1jb250YWluZXIgLnBvcHVwLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5tYWluLWNvbnRhaW5lciAucG9wdXAtaGVhZGVyIGgxIHtcbiAgY29sb3I6ICMxODYyYjg7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLm1haW4tY29udGFpbmVyIGJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDZyZW07XG4gIGNvbG9yOiB3aGl0ZTtcbiAgbWFyZ2luOiAxcmVtIDA7XG59XG4ubWFpbi1jb250YWluZXIgbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNGMUYyRjQ7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgbWFyZ2luOiAwLjVyZW07XG59XG4ubWFpbi1jb250YWluZXIgbGFiZWwgbWF0LWljb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiBhdXRvO1xuICB3aWR0aDogYXV0bztcbn1cbi5tYWluLWNvbnRhaW5lciAubGFiZWwtc2VsZWN0ZWQge1xuICBjb2xvcjogIzE4NjJiODtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/category/category-select/category-select.component.ts":
/*!***********************************************************************!*\
  !*** ./src/app/category/category-select/category-select.component.ts ***!
  \***********************************************************************/
/*! exports provided: CategorySelectComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategorySelectComponent", function() { return CategorySelectComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _category_mock__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../category.mock */ "./src/app/category.mock.ts");





var CategorySelectComponent = /** @class */ (function () {
    function CategorySelectComponent(bottomSheetRef, data) {
        this.bottomSheetRef = bottomSheetRef;
        this.data = data;
        this.categories = _category_mock__WEBPACK_IMPORTED_MODULE_3__["categories"];
        if (this.data.getCurrentSelectedCategory) {
            this.selectedCategory = this.data.getCurrentSelectedCategory();
        }
    }
    CategorySelectComponent.prototype.apply = function (event) {
        if (this.data.categorySelectedCallback) {
            this.data.categorySelectedCallback(this.selectedCategory);
        }
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    };
    CategorySelectComponent.prototype.onCategorySelected = function (category) {
        this.selectedCategory = category.name;
    };
    CategorySelectComponent.prototype.dismiss = function (event) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    };
    CategorySelectComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBottomSheetRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_BOTTOM_SHEET_DATA"],] }] }
    ]; };
    CategorySelectComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-category-select',
            template: __webpack_require__(/*! raw-loader!./category-select.component.html */ "../../node_modules/raw-loader/index.js!./src/app/category/category-select/category-select.component.html"),
            styles: [__webpack_require__(/*! ./category-select.component.scss */ "./src/app/category/category-select/category-select.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_BOTTOM_SHEET_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBottomSheetRef"], Object])
    ], CategorySelectComponent);
    return CategorySelectComponent;
}());



/***/ }),

/***/ "./src/app/category/category-sort/category-sort.component.scss":
/*!*********************************************************************!*\
  !*** ./src/app/category/category-sort/category-sort.component.scss ***!
  \*********************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: transparent;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n.main-container .popup-header {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n}\n.main-container .popup-header h1 {\n  color: #1862b8;\n  font-size: 1.2rem;\n  font-weight: 600;\n}\n.main-container button {\n  width: 100%;\n  height: 6rem;\n  color: white;\n  margin: 1rem 0;\n}\n.main-container label {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  color: #666666;\n  padding: 1.5rem;\n  border: 1px solid #F1F2F4;\n  border-radius: 0.5rem;\n  margin: 0.5rem;\n}\n.main-container label mat-icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  height: auto;\n  width: auto;\n}\n.main-container .label-selected {\n  color: #1862b8;\n  background: #8db5e3;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvY2F0ZWdvcnkvY2F0ZWdvcnktc29ydC9jYXRlZ29yeS1zb3J0LmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiLCJzcmMvYXBwL2NhdGVnb3J5L2NhdGVnb3J5LXNvcnQvY2F0ZWdvcnktc29ydC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFHRTtFQ0ZBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhRERnQjtFQ0VoQixjREZnQjtFQ0doQixrQkFBQTtFQUNBLHVCREp3QjtFQ0t4QixjQVQyRDtFQVUzRCxpQkROZ0I7RUNPaEIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FDQ0Y7QUZQRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0FFU0o7QUZQSTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FFU047QUZMRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0VBQ0EsWUFBQTtFQUNBLGNBQUE7QUVPSjtBRkpFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLGNBQUE7RUFDQSxlQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGNBQUE7QUVNSjtBRkpJO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtBRU1OO0FGRkU7RUFDRSxjQUFBO0VBQ0EsbUJBQUE7QUVJSiIsImZpbGUiOiJzcmMvYXBwL2NhdGVnb3J5L2NhdGVnb3J5LXNvcnQvY2F0ZWdvcnktc29ydC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgJy4uL2ljb24uc2Nzcyc7XG5cbi5tYWluLWNvbnRhaW5lciB7XG4gIC5pY29uIHtcbiAgICBAaW5jbHVkZSBpY29uKDMuMnJlbSwgdHJhbnNwYXJlbnQpO1xuICB9XG5cbiAgLnBvcHVwLWhlYWRlciB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuXG4gICAgaDEge1xuICAgICAgY29sb3I6ICMxODYyYjg7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiA2MDA7XG4gICAgfVxuICB9XG5cbiAgYnV0dG9uIHtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBoZWlnaHQ6IDZyZW07XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIG1hcmdpbjogMXJlbSAwO1xuICB9XG5cbiAgbGFiZWwge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gICAgcGFkZGluZzogMS41cmVtO1xuICAgIGJvcmRlcjogMXB4IHNvbGlkICNGMUYyRjQ7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIG1hcmdpbjogMC41cmVtO1xuXG4gICAgbWF0LWljb24ge1xuICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgICAgIGhlaWdodDogYXV0bztcbiAgICAgIHdpZHRoOiBhdXRvO1xuICAgIH1cbiAgfVxuXG4gIC5sYWJlbC1zZWxlY3RlZCB7XG4gICAgY29sb3I6ICMxODYyYjg7XG4gICAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgfVxufVxuIiwiQG1peGluIGljb24oJGRpYW1ldGVyOiAzLjJyZW0sICRiYWNrZ3JvdW5kOiAjOGRiNWUzLCAkY29sb3I6ICMxODYyYjgpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6ICRkaWFtZXRlcjtcbiAgaGVpZ2h0OiAkZGlhbWV0ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkY29sb3I7XG4gIG1pbi13aWR0aDogJGRpYW1ldGVyO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4iLCIubWFpbi1jb250YWluZXIgLmljb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMy4ycmVtO1xuICBoZWlnaHQ6IDMuMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgY29sb3I6ICMxODYyYjg7XG4gIG1pbi13aWR0aDogMy4ycmVtO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4ubWFpbi1jb250YWluZXIgLnBvcHVwLWhlYWRlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5tYWluLWNvbnRhaW5lciAucG9wdXAtaGVhZGVyIGgxIHtcbiAgY29sb3I6ICMxODYyYjg7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBmb250LXdlaWdodDogNjAwO1xufVxuLm1haW4tY29udGFpbmVyIGJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDZyZW07XG4gIGNvbG9yOiB3aGl0ZTtcbiAgbWFyZ2luOiAxcmVtIDA7XG59XG4ubWFpbi1jb250YWluZXIgbGFiZWwge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlcjogMXB4IHNvbGlkICNGMUYyRjQ7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgbWFyZ2luOiAwLjVyZW07XG59XG4ubWFpbi1jb250YWluZXIgbGFiZWwgbWF0LWljb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiBhdXRvO1xuICB3aWR0aDogYXV0bztcbn1cbi5tYWluLWNvbnRhaW5lciAubGFiZWwtc2VsZWN0ZWQge1xuICBjb2xvcjogIzE4NjJiODtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/category/category-sort/category-sort.component.ts":
/*!*******************************************************************!*\
  !*** ./src/app/category/category-sort/category-sort.component.ts ***!
  \*******************************************************************/
/*! exports provided: CategorySortComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategorySortComponent", function() { return CategorySortComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _category_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../category.model */ "./src/app/category/category.model.ts");





var CategorySortComponent = /** @class */ (function () {
    function CategorySortComponent(bottomSheetRef, data) {
        this.bottomSheetRef = bottomSheetRef;
        this.data = data;
        this.sortingCriterias = [_category_model__WEBPACK_IMPORTED_MODULE_3__["SortingMode"].ending_soon, _category_model__WEBPACK_IMPORTED_MODULE_3__["SortingMode"].latest];
        if (this.data.getCurrentSelectedOrder) {
            this.selectedCriteria = this.data.getCurrentSelectedOrder();
        }
    }
    CategorySortComponent.prototype.apply = function (event) {
        if (this.data.sortOrderSelectedCallback) {
            this.data.sortOrderSelectedCallback(this.selectedCriteria);
        }
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    };
    CategorySortComponent.prototype.dismiss = function (event) {
        this.bottomSheetRef.dismiss();
        event.preventDefault();
    };
    CategorySortComponent.prototype.onSortingOrderSelected = function (criteria) {
        this.selectedCriteria = criteria;
    };
    CategorySortComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBottomSheetRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_BOTTOM_SHEET_DATA"],] }] }
    ]; };
    CategorySortComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-category-sort',
            template: __webpack_require__(/*! raw-loader!./category-sort.component.html */ "../../node_modules/raw-loader/index.js!./src/app/category/category-sort/category-sort.component.html"),
            styles: [__webpack_require__(/*! ./category-sort.component.scss */ "./src/app/category/category-sort/category-sort.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_BOTTOM_SHEET_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatBottomSheetRef"], Object])
    ], CategorySortComponent);
    return CategorySortComponent;
}());



/***/ }),

/***/ "./src/app/category/category.component.scss":
/*!**************************************************!*\
  !*** ./src/app/category/category.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-toolbar {\n  background: white;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\nmat-toolbar button {\n  margin: 0.5rem;\n}\nmat-toolbar .spacer {\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  text-align: center;\n}\nmat-toolbar .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\nmat-toolbar button {\n  position: relative;\n  z-index: 2;\n}\nmat-toolbar .toolbar-title {\n  position: absolute;\n  left: 0;\n  right: 0;\n  text-align: center;\n  color: #666666;\n}\n:host {\n  display: -webkit-box;\n  display: flex;\n  width: 100%;\n  height: 100%;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n.content {\n  height: 100%;\n  overflow-y: scroll;\n  background-color: #f2f2f2;\n  padding: 0 1.5rem;\n}\n.content h1.catergory-title {\n  color: #666666;\n  font-size: 3rem;\n  margin: 1rem 0;\n}\n.content .mat-card {\n  margin: 0 auto;\n  margin-bottom: 3rem;\n}\n.content .mat-card mat-card-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  margin: 1.4rem 0 1.9rem 0;\n}\n.content .mat-card mat-card-content .details {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n.content .mat-card mat-card-content .details h1 {\n  font-size: 1.6rem;\n  color: #666666;\n  font-weight: bold;\n  margin: 0;\n}\n.content .mat-card mat-card-content .details h2 {\n  font-size: 1.2rem;\n  font-weight: normal;\n  margin: 0.2rem 0 0 0;\n  color: #666666;\n}\n.content .mat-card mat-card-content .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n.featured-image {\n  position: relative;\n}\n.featured-image img {\n  margin-bottom: 0;\n}\n.featured-image .badge {\n  max-width: 8rem;\n  height: 4.8rem;\n  background-color: #ffffff;\n  border-radius: 0.5rem 0.5rem 0 0;\n  position: absolute;\n  left: 0;\n  bottom: 0;\n  width: 100%;\n  text-align: center;\n}\n.featured-image .badge img {\n  max-width: 4rem;\n  position: relative;\n}\n.featured-image .macaron-container {\n  position: absolute;\n  top: 0;\n  right: 0;\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  text-transform: capitalize;\n}\n.featured-image .macaron-container .just-added, .featured-image .macaron-container .coming-soon {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #1862b8;\n  color: #ffffff;\n}\n.featured-image .macaron-container .expiring, .featured-image .macaron-container .running-out {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #FFDB1B;\n  color: #4d4d4c;\n}\n.featured-image .macaron-container .expired, .featured-image .macaron-container .fully-redeemed {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #ffffff;\n  color: #4d4d4c;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvY2F0ZWdvcnkvY2F0ZWdvcnkuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9hbmR5L1dlYnN0b3JtUHJvamVjdHMvbXktcGVyeC9hcHBzL2ZlYXR1cmUtZGVtby9zcmMvYXBwL3Rvb2xiYXIuc2NzcyIsInNyYy9hcHAvY2F0ZWdvcnkvY2F0ZWdvcnkuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9hbmR5L1dlYnN0b3JtUHJvamVjdHMvbXktcGVyeC9hcHBzL2ZlYXR1cmUtZGVtby9zcmMvYXBwL2ljb24uc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvbWFjYXJvbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUdBO0VDQUUsaUJBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7QUNERjtBREdFO0VBQ0UsY0FBQTtBQ0RKO0FESUU7RUFDRSxtQkFBQTtVQUFBLFlBQUE7RUFDQSxrQkFBQTtBQ0ZKO0FES0U7RUVmQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFMcUI7RUFNckIsY0FOcUI7RUFPckIsa0JBQUE7RUFDQSxtQkFSMEM7RUFTMUMsY0FUMkQ7RUFVM0QsaUJBVnFCO0VBV3JCLFNBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtBRGFGO0FGcEJFO0VBQ0Usa0JBQUE7RUFDQSxVQUFBO0FFc0JKO0FGbkJFO0VBQ0Usa0JBQUE7RUFDQSxPQUFBO0VBQ0EsUUFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtBRXFCSjtBRmpCQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FFb0JGO0FGakJBO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EseUJBQUE7RUFDQSxpQkFBQTtBRW9CRjtBRmxCRTtFQUNFLGNBQUE7RUFDQSxlQUFBO0VBQ0EsY0FBQTtBRW9CSjtBRmpCRTtFQUNFLGNBQUE7RUFDQSxtQkFBQTtBRW1CSjtBRmpCSTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7QUVtQk47QUZqQk07RUFDRSxtQkFBQTtVQUFBLE9BQUE7QUVtQlI7QUZqQlE7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLFNBQUE7QUVtQlY7QUZoQlE7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxjQUFBO0FFa0JWO0FGZE07RUduRUosb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBTHFCO0VBTXJCLGNBTnFCO0VBT3JCLGtCQUFBO0VBQ0EsbUJBUjBDO0VBUzFDLGNBVDJEO0VBVTNELGlCQVZxQjtFQVdyQixTQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7QURvRkY7QUZ0QkE7RUFDRSxrQkFBQTtBRXlCRjtBRnZCRTtFQUNFLGdCQUFBO0FFeUJKO0FGdEJFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLGdDQUFBO0VBQ0Esa0JBQUE7RUFDQSxPQUFBO0VBQ0EsU0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBRXdCSjtBRnRCSTtFQUNFLGVBQUE7RUFDQSxrQkFBQTtBRXdCTjtBRnBCRTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBRXNCSjtBRXZIRTtFQVJBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQU1tQjtFQUxuQixjQUs0QjtBRjZIOUI7QUUxSEU7RUFaQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFVbUI7RUFUbkIsY0FTNEI7QUZnSTlCO0FFN0hFO0VBaEJBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQWNtQjtFQWJuQixjQWE0QjtBRm1JOUIiLCJmaWxlIjoic3JjL2FwcC9jYXRlZ29yeS9jYXRlZ29yeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi90b29sYmFyLnNjc3NcIjtcbkBpbXBvcnQgXCIuLi9tYWNhcm9uLnNjc3NcIjtcblxubWF0LXRvb2xiYXIge1xuICBAaW5jbHVkZSB0b29sYmFyO1xuXG4gIGJ1dHRvbiB7XG4gICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgIHotaW5kZXg6IDI7XG4gIH1cblxuICAudG9vbGJhci10aXRsZSB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIGxlZnQ6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICB9XG59XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbiAgcGFkZGluZzogMCAxLjVyZW07XG5cbiAgaDEuY2F0ZXJnb3J5LXRpdGxlIHtcbiAgICBjb2xvcjogIzY2NjY2NjtcbiAgICBmb250LXNpemU6IDNyZW07XG4gICAgbWFyZ2luOiAxcmVtIDA7XG4gIH1cblxuICAubWF0LWNhcmQge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIG1hcmdpbi1ib3R0b206IDNyZW07XG5cbiAgICBtYXQtY2FyZC1jb250ZW50IHtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICAgICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICAgIG1hcmdpbjogMS40cmVtIDAgMS45cmVtIDA7XG5cbiAgICAgIC5kZXRhaWxzIHtcbiAgICAgICAgZmxleDogMTtcblxuICAgICAgICBoMSB7XG4gICAgICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICAgICAgY29sb3I6ICM2NjY2NjY7XG4gICAgICAgICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gICAgICAgICAgbWFyZ2luOiAwO1xuICAgICAgICB9XG5cbiAgICAgICAgaDIge1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICAgICAgbWFyZ2luOiAwLjJyZW0gMCAwIDA7XG4gICAgICAgICAgY29sb3I6ICM2NjY2NjY7XG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLmljb24ge1xuICAgICAgICBAaW5jbHVkZSBpY29uO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG4uZmVhdHVyZWQtaW1hZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgaW1nIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG5cbiAgLmJhZGdlIHtcbiAgICBtYXgtd2lkdGg6IDhyZW07XG4gICAgaGVpZ2h0OiA0LjhyZW07XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW0gMC41cmVtIDAgMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgbGVmdDogMDtcbiAgICBib3R0b206IDA7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogNHJlbTtcbiAgICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgICB9XG4gIH1cblxuICAubWFjYXJvbi1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDA7XG4gICAgcmlnaHQ6IDA7XG4gICAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcblxuICAgIEBpbmNsdWRlIG1hY2Fyb25TdHlsZXMoKTtcbiAgfVxufVxuIiwiQGltcG9ydCBcIi4uL2ljb24uc2Nzc1wiO1xuXG5AbWl4aW4gdG9vbGJhciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuXG4gIGJ1dHRvbiB7XG4gICAgbWFyZ2luOiAwLjVyZW07XG4gIH1cblxuICAuc3BhY2VyIHtcbiAgICBmbGV4LWdyb3c6IDE7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLmljb24ge1xuICAgIEBpbmNsdWRlIGljb247XG4gIH1cbn1cbiIsIm1hdC10b29sYmFyIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG59XG5tYXQtdG9vbGJhciBidXR0b24ge1xuICBtYXJnaW46IDAuNXJlbTtcbn1cbm1hdC10b29sYmFyIC5zcGFjZXIge1xuICBmbGV4LWdyb3c6IDE7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbm1hdC10b29sYmFyIC5pY29uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDMuMnJlbTtcbiAgaGVpZ2h0OiAzLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgY29sb3I6ICMxODYyYjg7XG4gIG1pbi13aWR0aDogMy4ycmVtO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG5tYXQtdG9vbGJhciBidXR0b24ge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gIHotaW5kZXg6IDI7XG59XG5tYXQtdG9vbGJhciAudG9vbGJhci10aXRsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgbGVmdDogMDtcbiAgcmlnaHQ6IDA7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLmNvbnRlbnQge1xuICBoZWlnaHQ6IDEwMCU7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2YyZjJmMjtcbiAgcGFkZGluZzogMCAxLjVyZW07XG59XG4uY29udGVudCBoMS5jYXRlcmdvcnktdGl0bGUge1xuICBjb2xvcjogIzY2NjY2NjtcbiAgZm9udC1zaXplOiAzcmVtO1xuICBtYXJnaW46IDFyZW0gMDtcbn1cbi5jb250ZW50IC5tYXQtY2FyZCB7XG4gIG1hcmdpbjogMCBhdXRvO1xuICBtYXJnaW4tYm90dG9tOiAzcmVtO1xufVxuLmNvbnRlbnQgLm1hdC1jYXJkIG1hdC1jYXJkLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbjogMS40cmVtIDAgMS45cmVtIDA7XG59XG4uY29udGVudCAubWF0LWNhcmQgbWF0LWNhcmQtY29udGVudCAuZGV0YWlscyB7XG4gIGZsZXg6IDE7XG59XG4uY29udGVudCAubWF0LWNhcmQgbWF0LWNhcmQtY29udGVudCAuZGV0YWlscyBoMSB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIG1hcmdpbjogMDtcbn1cbi5jb250ZW50IC5tYXQtY2FyZCBtYXQtY2FyZC1jb250ZW50IC5kZXRhaWxzIGgyIHtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIG1hcmdpbjogMC4ycmVtIDAgMCAwO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cbi5jb250ZW50IC5tYXQtY2FyZCBtYXQtY2FyZC1jb250ZW50IC5pY29uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDMuMnJlbTtcbiAgaGVpZ2h0OiAzLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgY29sb3I6ICMxODYyYjg7XG4gIG1pbi13aWR0aDogMy4ycmVtO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG5cbi5mZWF0dXJlZC1pbWFnZSB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cbi5mZWF0dXJlZC1pbWFnZSBpbWcge1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuLmZlYXR1cmVkLWltYWdlIC5iYWRnZSB7XG4gIG1heC13aWR0aDogOHJlbTtcbiAgaGVpZ2h0OiA0LjhyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbSAwLjVyZW0gMCAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5mZWF0dXJlZC1pbWFnZSAuYmFkZ2UgaW1nIHtcbiAgbWF4LXdpZHRoOiA0cmVtO1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG59XG4uZmVhdHVyZWQtaW1hZ2UgLm1hY2Fyb24tY29udGFpbmVyIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIHJpZ2h0OiAwO1xuICBib3JkZXItcmFkaXVzOiA1cmVtO1xuICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIHRleHQtdHJhbnNmb3JtOiBjYXBpdGFsaXplO1xufVxuLmZlYXR1cmVkLWltYWdlIC5tYWNhcm9uLWNvbnRhaW5lciAuanVzdC1hZGRlZCwgLmZlYXR1cmVkLWltYWdlIC5tYWNhcm9uLWNvbnRhaW5lciAuY29taW5nLXNvb24ge1xuICBib3JkZXItcmFkaXVzOiA1cmVtO1xuICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICMxODYyYjg7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuLmZlYXR1cmVkLWltYWdlIC5tYWNhcm9uLWNvbnRhaW5lciAuZXhwaXJpbmcsIC5mZWF0dXJlZC1pbWFnZSAubWFjYXJvbi1jb250YWluZXIgLnJ1bm5pbmctb3V0IHtcbiAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZEQjFCO1xuICBjb2xvcjogIzRkNGQ0Yztcbn1cbi5mZWF0dXJlZC1pbWFnZSAubWFjYXJvbi1jb250YWluZXIgLmV4cGlyZWQsIC5mZWF0dXJlZC1pbWFnZSAubWFjYXJvbi1jb250YWluZXIgLmZ1bGx5LXJlZGVlbWVkIHtcbiAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBjb2xvcjogIzRkNGQ0Yztcbn0iLCJAbWl4aW4gaWNvbigkZGlhbWV0ZXI6IDMuMnJlbSwgJGJhY2tncm91bmQ6ICM4ZGI1ZTMsICRjb2xvcjogIzE4NjJiOCkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogJGRpYW1ldGVyO1xuICBoZWlnaHQ6ICRkaWFtZXRlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiAkYmFja2dyb3VuZDtcbiAgY29sb3I6ICRjb2xvcjtcbiAgbWluLXdpZHRoOiAkZGlhbWV0ZXI7XG4gIGJvcmRlcjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgei1pbmRleDogMTtcbn1cbiIsIkBtaXhpbiBtYWNhcm9uKCRiYWNrZ3JvdW5kQ29sb3IsICRmb250Q29sb3IpIHtcbiAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZENvbG9yO1xuICBjb2xvcjogJGZvbnRDb2xvcjtcbn1cblxuQG1peGluIG1hY2Fyb25TdHlsZXMge1xuICAuanVzdC1hZGRlZCwgLmNvbWluZy1zb29uIHtcbiAgICBAaW5jbHVkZSBtYWNhcm9uKCMxODYyYjgsICNmZmZmZmYpO1xuICB9XG5cbiAgLmV4cGlyaW5nLCAucnVubmluZy1vdXQge1xuICAgIEBpbmNsdWRlIG1hY2Fyb24oI0ZGREIxQiwgIzRkNGQ0Yyk7XG4gIH1cblxuICAuZXhwaXJlZCwgLmZ1bGx5LXJlZGVlbWVkIHtcbiAgICBAaW5jbHVkZSBtYWNhcm9uKCNmZmZmZmYsICM0ZDRkNGMpO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/category/category.component.ts":
/*!************************************************!*\
  !*** ./src/app/category/category.component.ts ***!
  \************************************************/
/*! exports provided: CategoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryComponent", function() { return CategoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _category_select_category_select_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./category-select/category-select.component */ "./src/app/category/category-select/category-select.component.ts");
/* harmony import */ var _category_sort_category_sort_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./category-sort/category-sort.component */ "./src/app/category/category-sort/category-sort.component.ts");
/* harmony import */ var _category_model__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./category.model */ "./src/app/category/category.model.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _services_macaron_service__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ../services/macaron.service */ "./src/app/services/macaron.service.ts");











var CategoryComponent = /** @class */ (function () {
    function CategoryComponent(router, bottomSheet, rewardsService, activeRoute, scrollDispatcher, zone, macaronService) {
        this.router = router;
        this.bottomSheet = bottomSheet;
        this.rewardsService = rewardsService;
        this.activeRoute = activeRoute;
        this.scrollDispatcher = scrollDispatcher;
        this.zone = zone;
        this.macaronService = macaronService;
        this.selectedSortingCraeteria = _category_model__WEBPACK_IMPORTED_MODULE_7__["SortingMode"].ending_soon;
        this.showToolbarTitle = false;
    }
    CategoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        var categoryName = this.activeRoute.snapshot.queryParamMap.get('category');
        if (categoryName) {
            this.selectedCategory = categoryName;
            this.fetchRewards();
        }
        else {
            var catalogId = +this.activeRoute.snapshot.queryParamMap.get('catalog');
            this.rewards = this.rewardsService.getCatalog(catalogId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_8__["map"])(function (catalog) {
                _this.selectedCategory = catalog.name;
                return catalog.rewards;
            }));
        }
        this.scrollDispatcher.scrolled().subscribe(function (cdkScrollable) {
            _this.checkScrolledPosition(cdkScrollable.getElementRef().nativeElement.scrollTop);
        });
    };
    CategoryComponent.prototype.checkScrolledPosition = function (scrollValue) {
        var _this = this;
        this.zone.run(function () {
            if (scrollValue >= 50) {
                _this.showToolbarTitle = true;
            }
            else {
                _this.showToolbarTitle = false;
            }
        });
    };
    CategoryComponent.prototype.fetchRewards = function () {
        if (this.selectedCategory === 'All') {
            this.rewards = this.rewardsService.getAllRewards();
            return;
        }
        this.rewards = this.rewardsService.getAllRewards(null, [this.selectedCategory]);
    };
    CategoryComponent.prototype.selected = function (reward) {
        this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
    };
    CategoryComponent.prototype.selectCategory = function () {
        this.bottomSheet.open(_category_select_category_select_component__WEBPACK_IMPORTED_MODULE_5__["CategorySelectComponent"], { data: this });
    };
    CategoryComponent.prototype.selectSort = function () {
        this.bottomSheet.open(_category_sort_category_sort_component__WEBPACK_IMPORTED_MODULE_6__["CategorySortComponent"], { data: this });
    };
    // CategoryBottomSheetClosedCallBack methods
    CategoryComponent.prototype.categorySelectedCallback = function (updatedValue) {
        this.selectedCategory = updatedValue;
        this.fetchRewards();
    };
    CategoryComponent.prototype.getCurrentSelectedCategory = function () {
        return this.selectedCategory ? this.selectedCategory : 'All';
    };
    CategoryComponent.prototype.getMacaron = function (reward) {
        return this.macaronService.getMacaron(reward);
    };
    // SortBottomSheetClosedCallBack methods
    CategoryComponent.prototype.sortOrderSelectedCallback = function (updatedValue) {
        this.selectedSortingCraeteria = updatedValue;
    };
    CategoryComponent.prototype.getCurrentSelectedOrder = function () {
        return this.selectedSortingCraeteria;
    };
    CategoryComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBottomSheet"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["RewardsService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__["ScrollDispatcher"] },
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"] },
        { type: _services_macaron_service__WEBPACK_IMPORTED_MODULE_10__["MacaronService"] }
    ]; };
    CategoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-category',
            template: __webpack_require__(/*! raw-loader!./category.component.html */ "../../node_modules/raw-loader/index.js!./src/app/category/category.component.html"),
            styles: [__webpack_require__(/*! ./category.component.scss */ "./src/app/category/category.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_material__WEBPACK_IMPORTED_MODULE_4__["MatBottomSheet"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["RewardsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_9__["ScrollDispatcher"],
            _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgZone"],
            _services_macaron_service__WEBPACK_IMPORTED_MODULE_10__["MacaronService"]])
    ], CategoryComponent);
    return CategoryComponent;
}());



/***/ }),

/***/ "./src/app/category/category.model.ts":
/*!********************************************!*\
  !*** ./src/app/category/category.model.ts ***!
  \********************************************/
/*! exports provided: CategoryMode, SortingMode */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoryMode", function() { return CategoryMode; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SortingMode", function() { return SortingMode; });
var CategoryMode;
(function (CategoryMode) {
    CategoryMode["reward"] = "reward";
    CategoryMode["catalog"] = "catalog";
})(CategoryMode || (CategoryMode = {}));
var SortingMode;
(function (SortingMode) {
    SortingMode["latest"] = "Latest";
    SortingMode["ending_soon"] = "Ending Soon";
})(SortingMode || (SortingMode = {}));


/***/ }),

/***/ "./src/app/category/rewards-sort.pipe.ts":
/*!***********************************************!*\
  !*** ./src/app/category/rewards-sort.pipe.ts ***!
  \***********************************************/
/*! exports provided: RewardsSortPipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsSortPipe", function() { return RewardsSortPipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _category_model__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./category.model */ "./src/app/category/category.model.ts");




var RewardsSortPipe = /** @class */ (function () {
    function RewardsSortPipe() {
    }
    RewardsSortPipe.prototype.transform = function (allrewards, mode) {
        return allrewards.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_2__["map"])(function (rewards) { return rewards.sort(function (a, b) {
            if (mode === _category_model__WEBPACK_IMPORTED_MODULE_3__["SortingMode"].latest) {
                var dateTimeFirst = new Date(a.validFrom).getTime();
                var dateTimeSecond = new Date(b.validFrom).getTime();
                return (dateTimeSecond - dateTimeFirst);
            }
            if (mode === _category_model__WEBPACK_IMPORTED_MODULE_3__["SortingMode"].ending_soon) {
                var dateTimeFirst = new Date(a.validTo).getTime();
                var dateTimeSecond = new Date(b.validTo).getTime();
                return (dateTimeFirst - dateTimeSecond);
            }
        }); }));
    };
    RewardsSortPipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({
            name: 'rewardsSort'
        })
    ], RewardsSortPipe);
    return RewardsSortPipe;
}());



/***/ }),

/***/ "./src/app/congrats/congrats.component.scss":
/*!**************************************************!*\
  !*** ./src/app/congrats/congrats.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\nh1 {\n  color: #666666;\n}\n\nh2 {\n  color: #666666;\n}\n\nmat-toolbar {\n  background-color: #ffffff;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: start;\n          align-items: flex-start;\n  padding: 2rem 2rem;\n  height: auto;\n}\n\nmat-toolbar h1 {\n  font-size: 2.5rem;\n  color: #1862b8;\n  font-weight: bold;\n}\n\nmat-toolbar h2 {\n  font-size: 1.6rem;\n  color: #666666;\n}\n\n.main {\n  -webkit-box-flex: 1;\n          flex: 1;\n  overflow-y: scroll;\n}\n\n.main a {\n  text-decoration: none;\n}\n\n.main .txt {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  text-align: center;\n}\n\n.main .single-voucher {\n  padding: 3rem 4rem;\n}\n\n.main .single-voucher .mat-card-image {\n  height: 21.1rem;\n}\n\n.main .single-voucher h1 {\n  font-size: 2rem;\n  font-weight: normal;\n}\n\n.main .single-voucher h2 {\n  font-size: 1.6rem;\n  font-weight: normal;\n  margin: 0;\n}\n\n.main .single-voucher .txt {\n  padding-top: 1rem;\n  margin-bottom: 3.6rem;\n}\n\n.main .single-voucher .logo {\n  position: absolute;\n  left: 50%;\n  top: -1.6rem;\n  -webkit-transform: translate(-50%, -50%);\n          transform: translate(-50%, -50%);\n}\n\n.main .single-voucher .logo img {\n  border-radius: 0.5rem;\n  width: 8rem;\n  height: 5rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.main .single-voucher mat-card-content {\n  position: relative;\n}\n\n.main .multiple-vouchers {\n  padding: 3rem 1.5rem;\n}\n\n.main .multiple-vouchers mat-card {\n  padding: 0.8rem;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  margin-bottom: 0.8rem;\n}\n\n.main .multiple-vouchers mat-card .featured-image {\n  height: 10.9rem;\n}\n\n.main .multiple-vouchers mat-card .featured-image img {\n  margin: 0;\n  display: block;\n  width: 14.8rem;\n  height: 100%;\n  border-radius: 0.5rem;\n}\n\n.main .multiple-vouchers mat-card mat-card-content {\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  flex-basis: 0;\n  padding-left: 0.8rem;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .multiple-vouchers mat-card mat-card-content > div {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n\n.main .multiple-vouchers mat-card mat-card-content h1 {\n  font-weight: normal;\n  font-size: 1.6rem;\n  color: #666666;\n  margin: 0;\n}\n\n.main .multiple-vouchers mat-card mat-card-content h2 {\n  font-weight: normal;\n  font-size: 1.2rem;\n  color: #666666;\n  margin: 0;\n}\n\n.main .multiple-vouchers mat-card mat-card-content .logo {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n  -webkit-box-align: end;\n          align-items: flex-end;\n  width: 100%;\n  height: 100%;\n}\n\n.main .multiple-vouchers mat-card mat-card-content .logo img {\n  width: 3rem;\n  height: 3rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.actions {\n  background: #ffffff;\n  height: 9rem;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-align: stretch;\n          align-items: stretch;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.actions a {\n  -webkit-box-flex: 1;\n          flex: 1;\n  margin: 1.6rem;\n  font-size: 1.8rem;\n  padding: 1rem 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvY29uZ3JhdHMvY29uZ3JhdHMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2NvbmdyYXRzL2NvbmdyYXRzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7QUNDRjs7QURFQTtFQUNFLGNBQUE7QUNDRjs7QURFQTtFQUNFLGNBQUE7QUNDRjs7QURFQTtFQUNFLHlCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtBQ0NGOztBRENFO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7QUNDSjs7QURFRTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtBQ0FKOztBRElBO0VBQ0UsbUJBQUE7VUFBQSxPQUFBO0VBQ0Esa0JBQUE7QUNERjs7QURHRTtFQUNFLHFCQUFBO0FDREo7O0FESUU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esa0JBQUE7QUNGSjs7QURLRTtFQUNFLGtCQUFBO0FDSEo7O0FES0k7RUFDRSxlQUFBO0FDSE47O0FETUk7RUFDRSxlQUFBO0VBQ0EsbUJBQUE7QUNKTjs7QURPSTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0FDTE47O0FEUUk7RUFDRSxpQkFBQTtFQUNBLHFCQUFBO0FDTk47O0FEU0k7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxZQUFBO0VBQ0Esd0NBQUE7VUFBQSxnQ0FBQTtBQ1BOOztBRFNNO0VBQ0UscUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUNQUjs7QURXSTtFQUNFLGtCQUFBO0FDVE47O0FEYUU7RUFDRSxvQkFBQTtBQ1hKOztBRGFJO0VBQ0UsZUFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtFQUNBLHFCQUFBO0FDWE47O0FEYU07RUFDRSxlQUFBO0FDWFI7O0FEYVE7RUFDRSxTQUFBO0VBQ0EsY0FBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0VBQ0EscUJBQUE7QUNYVjs7QURlTTtFQUNFLG1CQUFBO1VBQUEsWUFBQTtFQUNBLGFBQUE7RUFDQSxvQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtBQ2JSOztBRGVRO0VBQ0UsbUJBQUE7VUFBQSxPQUFBO0FDYlY7O0FEZ0JRO0VBQ0UsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FDZFY7O0FEaUJRO0VBQ0UsbUJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FDZlY7O0FEa0JRO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0EscUJBQUE7VUFBQSx5QkFBQTtFQUNBLHNCQUFBO1VBQUEscUJBQUE7RUFDQSxXQUFBO0VBQ0EsWUFBQTtBQ2hCVjs7QURrQlU7RUFDRSxXQUFBO0VBQ0EsWUFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUNoQlo7O0FEd0JBO0VBQ0UsbUJBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0EsMEJBQUE7VUFBQSxvQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7QUNyQkY7O0FEdUJFO0VBQ0UsbUJBQUE7VUFBQSxPQUFBO0VBQ0EsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZUFBQTtBQ3JCSiIsImZpbGUiOiJzcmMvYXBwL2NvbmdyYXRzL2NvbmdyYXRzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiOmhvc3Qge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5oMSB7XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG5oMiB7XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG5tYXQtdG9vbGJhciB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBmbGV4LXN0YXJ0O1xuICBwYWRkaW5nOiAycmVtIDJyZW07XG4gIGhlaWdodDogYXV0bztcblxuICBoMSB7XG4gICAgZm9udC1zaXplOiAyLjVyZW07XG4gICAgY29sb3I6ICMxODYyYjg7XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cblxuICBoMiB7XG4gICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gIH1cbn1cblxuLm1haW4ge1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG5cbiAgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICB9XG5cbiAgLnR4dCB7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgLnNpbmdsZS12b3VjaGVyIHtcbiAgICBwYWRkaW5nOiAzcmVtIDRyZW07XG5cbiAgICAubWF0LWNhcmQtaW1hZ2Uge1xuICAgICAgaGVpZ2h0OiAyMS4xcmVtO1xuICAgIH1cblxuICAgIGgxIHtcbiAgICAgIGZvbnQtc2l6ZTogMnJlbTtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgfVxuXG4gICAgaDIge1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cblxuICAgIC50eHQge1xuICAgICAgcGFkZGluZy10b3A6IDFyZW07XG4gICAgICBtYXJnaW4tYm90dG9tOiAzLjZyZW07XG4gICAgfVxuXG4gICAgLmxvZ28ge1xuICAgICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgICAgbGVmdDogNTAlO1xuICAgICAgdG9wOiAtMS42cmVtO1xuICAgICAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG5cbiAgICAgIGltZyB7XG4gICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgICAgICAgd2lkdGg6IDhyZW07XG4gICAgICAgIGhlaWdodDogNXJlbTtcbiAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgICB9XG4gICAgfVxuXG4gICAgbWF0LWNhcmQtY29udGVudCB7XG4gICAgICBwb3NpdGlvbjogcmVsYXRpdmU7XG4gICAgfVxuICB9XG5cbiAgLm11bHRpcGxlLXZvdWNoZXJzIHtcbiAgICBwYWRkaW5nOiAzcmVtIDEuNXJlbTtcblxuICAgIG1hdC1jYXJkIHtcbiAgICAgIHBhZGRpbmc6IDAuOHJlbTtcbiAgICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICAgICAgbWFyZ2luLWJvdHRvbTogMC44cmVtO1xuXG4gICAgICAuZmVhdHVyZWQtaW1hZ2Uge1xuICAgICAgICBoZWlnaHQ6IDEwLjlyZW07XG5cbiAgICAgICAgaW1nIHtcbiAgICAgICAgICBtYXJnaW46IDA7XG4gICAgICAgICAgZGlzcGxheTogYmxvY2s7XG4gICAgICAgICAgd2lkdGg6IDE0LjhyZW07XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuICAgICAgICAgIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBtYXQtY2FyZC1jb250ZW50IHtcbiAgICAgICAgZmxleC1ncm93OiAxO1xuICAgICAgICBmbGV4LWJhc2lzOiAwO1xuICAgICAgICBwYWRkaW5nLWxlZnQ6IDAuOHJlbTtcbiAgICAgICAgZGlzcGxheTogZmxleDtcbiAgICAgICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcblxuICAgICAgICA+IGRpdiB7XG4gICAgICAgICAgZmxleDogMTtcbiAgICAgICAgfVxuXG4gICAgICAgIGgxIHtcbiAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgICAgICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIGgyIHtcbiAgICAgICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgICAgICAgIG1hcmdpbjogMDtcbiAgICAgICAgfVxuXG4gICAgICAgIC5sb2dvIHtcbiAgICAgICAgICBkaXNwbGF5OiBmbGV4O1xuICAgICAgICAgIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gICAgICAgICAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgICAgICAgICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gICAgICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICAgICAgaGVpZ2h0OiAxMDAlO1xuXG4gICAgICAgICAgaW1nIHtcbiAgICAgICAgICAgIHdpZHRoOiAzcmVtO1xuICAgICAgICAgICAgaGVpZ2h0OiAzcmVtO1xuICAgICAgICAgICAgb2JqZWN0LWZpdDogY292ZXI7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG59XG5cbi5hY3Rpb25zIHtcbiAgYmFja2dyb3VuZDogI2ZmZmZmZjtcbiAgaGVpZ2h0OiA5cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogc3RyZXRjaDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG5cbiAgYSB7XG4gICAgZmxleDogMTtcbiAgICBtYXJnaW46IDEuNnJlbTtcbiAgICBmb250LXNpemU6IDEuOHJlbTtcbiAgICBwYWRkaW5nOiAxcmVtIDA7XG4gIH1cbn1cbiIsIjpob3N0IHtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuaDEge1xuICBjb2xvcjogIzY2NjY2Njtcbn1cblxuaDIge1xuICBjb2xvcjogIzY2NjY2Njtcbn1cblxubWF0LXRvb2xiYXIge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogZmxleC1zdGFydDtcbiAgcGFkZGluZzogMnJlbSAycmVtO1xuICBoZWlnaHQ6IGF1dG87XG59XG5tYXQtdG9vbGJhciBoMSB7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xuICBjb2xvcjogIzE4NjJiODtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5tYXQtdG9vbGJhciBoMiB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cblxuLm1haW4ge1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG4ubWFpbiBhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xufVxuLm1haW4gLnR4dCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5tYWluIC5zaW5nbGUtdm91Y2hlciB7XG4gIHBhZGRpbmc6IDNyZW0gNHJlbTtcbn1cbi5tYWluIC5zaW5nbGUtdm91Y2hlciAubWF0LWNhcmQtaW1hZ2Uge1xuICBoZWlnaHQ6IDIxLjFyZW07XG59XG4ubWFpbiAuc2luZ2xlLXZvdWNoZXIgaDEge1xuICBmb250LXNpemU6IDJyZW07XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4ubWFpbiAuc2luZ2xlLXZvdWNoZXIgaDIge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgbWFyZ2luOiAwO1xufVxuLm1haW4gLnNpbmdsZS12b3VjaGVyIC50eHQge1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMy42cmVtO1xufVxuLm1haW4gLnNpbmdsZS12b3VjaGVyIC5sb2dvIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiA1MCU7XG4gIHRvcDogLTEuNnJlbTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGUoLTUwJSwgLTUwJSk7XG59XG4ubWFpbiAuc2luZ2xlLXZvdWNoZXIgLmxvZ28gaW1nIHtcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICB3aWR0aDogOHJlbTtcbiAgaGVpZ2h0OiA1cmVtO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5tYWluIC5zaW5nbGUtdm91Y2hlciBtYXQtY2FyZC1jb250ZW50IHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLm1haW4gLm11bHRpcGxlLXZvdWNoZXJzIHtcbiAgcGFkZGluZzogM3JlbSAxLjVyZW07XG59XG4ubWFpbiAubXVsdGlwbGUtdm91Y2hlcnMgbWF0LWNhcmQge1xuICBwYWRkaW5nOiAwLjhyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG1hcmdpbi1ib3R0b206IDAuOHJlbTtcbn1cbi5tYWluIC5tdWx0aXBsZS12b3VjaGVycyBtYXQtY2FyZCAuZmVhdHVyZWQtaW1hZ2Uge1xuICBoZWlnaHQ6IDEwLjlyZW07XG59XG4ubWFpbiAubXVsdGlwbGUtdm91Y2hlcnMgbWF0LWNhcmQgLmZlYXR1cmVkLWltYWdlIGltZyB7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxNC44cmVtO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJvcmRlci1yYWRpdXM6IDAuNXJlbTtcbn1cbi5tYWluIC5tdWx0aXBsZS12b3VjaGVycyBtYXQtY2FyZCBtYXQtY2FyZC1jb250ZW50IHtcbiAgZmxleC1ncm93OiAxO1xuICBmbGV4LWJhc2lzOiAwO1xuICBwYWRkaW5nLWxlZnQ6IDAuOHJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5tYWluIC5tdWx0aXBsZS12b3VjaGVycyBtYXQtY2FyZCBtYXQtY2FyZC1jb250ZW50ID4gZGl2IHtcbiAgZmxleDogMTtcbn1cbi5tYWluIC5tdWx0aXBsZS12b3VjaGVycyBtYXQtY2FyZCBtYXQtY2FyZC1jb250ZW50IGgxIHtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBtYXJnaW46IDA7XG59XG4ubWFpbiAubXVsdGlwbGUtdm91Y2hlcnMgbWF0LWNhcmQgbWF0LWNhcmQtY29udGVudCBoMiB7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgbWFyZ2luOiAwO1xufVxuLm1haW4gLm11bHRpcGxlLXZvdWNoZXJzIG1hdC1jYXJkIG1hdC1jYXJkLWNvbnRlbnQgLmxvZ28ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBhbGlnbi1pdGVtczogZmxleC1lbmQ7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG59XG4ubWFpbiAubXVsdGlwbGUtdm91Y2hlcnMgbWF0LWNhcmQgbWF0LWNhcmQtY29udGVudCAubG9nbyBpbWcge1xuICB3aWR0aDogM3JlbTtcbiAgaGVpZ2h0OiAzcmVtO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cblxuLmFjdGlvbnMge1xuICBiYWNrZ3JvdW5kOiAjZmZmZmZmO1xuICBoZWlnaHQ6IDlyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGFsaWduLWl0ZW1zOiBzdHJldGNoO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5hY3Rpb25zIGEge1xuICBmbGV4OiAxO1xuICBtYXJnaW46IDEuNnJlbTtcbiAgZm9udC1zaXplOiAxLjhyZW07XG4gIHBhZGRpbmc6IDFyZW0gMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/congrats/congrats.component.ts":
/*!************************************************!*\
  !*** ./src/app/congrats/congrats.component.ts ***!
  \************************************************/
/*! exports provided: CongratsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CongratsComponent", function() { return CongratsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _game_outcome_game_outcome_service__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./game-outcome/game-outcome.service */ "./src/app/congrats/game-outcome/game-outcome.service.ts");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");




var CongratsComponent = /** @class */ (function () {
    function CongratsComponent(gameOutcomeService, router) {
        this.gameOutcomeService = gameOutcomeService;
        this.router = router;
    }
    CongratsComponent.prototype.ngOnInit = function () {
        this.vouchers = this.gameOutcomeService.getVouchersRewarded();
    };
    CongratsComponent.prototype.navigateToRewards = function () {
        this.gameOutcomeService.clearVoucherList();
        this.router.navigateByUrl('/home/vouchers');
    };
    CongratsComponent.ctorParameters = function () { return [
        { type: _game_outcome_game_outcome_service__WEBPACK_IMPORTED_MODULE_2__["GameOutcomeService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] }
    ]; };
    CongratsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-congrats',
            template: __webpack_require__(/*! raw-loader!./congrats.component.html */ "../../node_modules/raw-loader/index.js!./src/app/congrats/congrats.component.html"),
            styles: [__webpack_require__(/*! ./congrats.component.scss */ "./src/app/congrats/congrats.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_game_outcome_game_outcome_service__WEBPACK_IMPORTED_MODULE_2__["GameOutcomeService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"]])
    ], CongratsComponent);
    return CongratsComponent;
}());



/***/ }),

/***/ "./src/app/congrats/game-outcome/game-outcome.service.ts":
/*!***************************************************************!*\
  !*** ./src/app/congrats/game-outcome/game-outcome.service.ts ***!
  \***************************************************************/
/*! exports provided: GameOutcomeService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameOutcomeService", function() { return GameOutcomeService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var GameOutcomeService = /** @class */ (function () {
    function GameOutcomeService() {
    }
    GameOutcomeService.prototype.getVouchersRewarded = function () {
        return this.vouchers;
    };
    GameOutcomeService.prototype.setVouchersList = function (vouchers) {
        this.vouchers = vouchers;
    };
    GameOutcomeService.prototype.clearVoucherList = function () {
        this.vouchers = [];
    };
    GameOutcomeService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], GameOutcomeService);
    return GameOutcomeService;
}());



/***/ }),

/***/ "./src/app/error/error.component.scss":
/*!********************************************!*\
  !*** ./src/app/error/error.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main {\n  height: 100%;\n  background-color: #f6f7f9;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  text-align: center;\n  padding: 0 1.5rem;\n}\n.main p {\n  color: #7b7b7c;\n  font-size: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvZXJyb3IvZXJyb3IuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2Vycm9yL2Vycm9yLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLHlCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsaUJBQUE7QUNDRjtBRENFO0VBQ0UsY0FBQTtFQUNBLGVBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2Vycm9yL2Vycm9yLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4ge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmNmY3Zjk7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMCAxLjVyZW07XG5cbiAgcCB7XG4gICAgY29sb3I6ICM3YjdiN2M7XG4gICAgZm9udC1zaXplOiAycmVtO1xuICB9XG59XG4iLCIubWFpbiB7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2Y2ZjdmOTtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAwIDEuNXJlbTtcbn1cbi5tYWluIHAge1xuICBjb2xvcjogIzdiN2I3YztcbiAgZm9udC1zaXplOiAycmVtO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/error/error.component.ts":
/*!******************************************!*\
  !*** ./src/app/error/error.component.ts ***!
  \******************************************/
/*! exports provided: ErrorComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ErrorComponent", function() { return ErrorComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var ErrorComponent = /** @class */ (function () {
    function ErrorComponent() {
    }
    ErrorComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-error',
            template: __webpack_require__(/*! raw-loader!./error.component.html */ "../../node_modules/raw-loader/index.js!./src/app/error/error.component.html"),
            styles: [__webpack_require__(/*! ./error.component.scss */ "./src/app/error/error.component.scss")]
        })
    ], ErrorComponent);
    return ErrorComponent;
}());



/***/ }),

/***/ "./src/app/game/game.component.scss":
/*!******************************************!*\
  !*** ./src/app/game/game.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\nmat-toolbar {\n  position: fixed;\n}\n\nmat-toolbar button {\n  z-index: 1;\n}\n\nmat-toolbar span.title {\n  position: absolute;\n  width: 100%;\n  text-align: center;\n  left: 0;\n}\n\n.main {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  padding: 0 1.5rem;\n  height: 100%;\n  min-height: 100%;\n  background-size: cover;\n  background-position: bottom;\n}\n\n.main .labels {\n  text-align: center;\n  color: #666666;\n}\n\n.main .labels .title {\n  font-size: 2.4rem;\n}\n\n.main .labels .sub-title {\n  font-size: 1.6rem;\n}\n\n.main .game-wrapper {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  overflow: scroll;\n  -webkit-box-align: center;\n          align-items: center;\n  justify-content: space-around;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .button-area {\n  padding-bottom: 2rem;\n}\n\n.main button {\n  width: 100%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvZ2FtZS9nYW1lLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiLCJzcmMvYXBwL2dhbWUvZ2FtZS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQ0RFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUxxQjtFQU1yQixjQU5xQjtFQU9yQixrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkFWcUI7RUFXckIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FDQ0Y7O0FGUkE7RUFDRSxlQUFBO0FFV0Y7O0FGVEU7RUFDRSxVQUFBO0FFV0o7O0FGUkU7RUFDRSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtFQUNBLE9BQUE7QUVVSjs7QUZOQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esc0JBQUE7RUFDQSwyQkFBQTtBRVNGOztBRlBFO0VBQ0Usa0JBQUE7RUFDQSxjQUFBO0FFU0o7O0FGUEk7RUFDRSxpQkFBQTtBRVNOOztBRk5JO0VBQ0UsaUJBQUE7QUVRTjs7QUZKRTtFQUNFLG1CQUFBO1VBQUEsY0FBQTtFQUNBLGdCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLDZCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FFTUo7O0FGSEU7RUFDRSxvQkFBQTtBRUtKOztBRkZFO0VBQ0UsV0FBQTtBRUlKIiwiZmlsZSI6InNyYy9hcHAvZ2FtZS9nYW1lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uL2ljb24uc2Nzc1wiO1xuXG4uaWNvbiB7XG4gIEBpbmNsdWRlIGljb247XG59XG5cbm1hdC10b29sYmFyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuXG4gIGJ1dHRvbiB7XG4gICAgei1pbmRleDogMTtcbiAgfVxuXG4gIHNwYW4udGl0bGUge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbGVmdDogMDtcbiAgfVxufVxuXG4ubWFpbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDAgMS41cmVtO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQtc2l6ZTogY292ZXI7XG4gIGJhY2tncm91bmQtcG9zaXRpb246IGJvdHRvbTtcblxuICAubGFiZWxzIHtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgY29sb3I6ICM2NjY2NjY7XG5cbiAgICAudGl0bGUge1xuICAgICAgZm9udC1zaXplOiAyLjRyZW07XG4gICAgfVxuXG4gICAgLnN1Yi10aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICB9XG4gIH1cblxuICAuZ2FtZS13cmFwcGVyIHtcbiAgICBmbGV4OiAxIDEgYXV0bztcbiAgICBvdmVyZmxvdzogc2Nyb2xsO1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB9XG5cbiAgLmJ1dHRvbi1hcmVhIHtcbiAgICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcbiAgfVxuXG4gIGJ1dHRvbiB7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cbn1cbiIsIkBtaXhpbiBpY29uKCRkaWFtZXRlcjogMy4ycmVtLCAkYmFja2dyb3VuZDogIzhkYjVlMywgJGNvbG9yOiAjMTg2MmI4KSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAkZGlhbWV0ZXI7XG4gIGhlaWdodDogJGRpYW1ldGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGNvbG9yO1xuICBtaW4td2lkdGg6ICRkaWFtZXRlcjtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuIiwiLmljb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMy4ycmVtO1xuICBoZWlnaHQ6IDMuMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiAjOGRiNWUzO1xuICBjb2xvcjogIzE4NjJiODtcbiAgbWluLXdpZHRoOiAzLjJyZW07XG4gIGJvcmRlcjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgei1pbmRleDogMTtcbn1cblxubWF0LXRvb2xiYXIge1xuICBwb3NpdGlvbjogZml4ZWQ7XG59XG5tYXQtdG9vbGJhciBidXR0b24ge1xuICB6LWluZGV4OiAxO1xufVxubWF0LXRvb2xiYXIgc3Bhbi50aXRsZSB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbGVmdDogMDtcbn1cblxuLm1haW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBwYWRkaW5nOiAwIDEuNXJlbTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kLXNpemU6IGNvdmVyO1xuICBiYWNrZ3JvdW5kLXBvc2l0aW9uOiBib3R0b207XG59XG4ubWFpbiAubGFiZWxzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cbi5tYWluIC5sYWJlbHMgLnRpdGxlIHtcbiAgZm9udC1zaXplOiAyLjRyZW07XG59XG4ubWFpbiAubGFiZWxzIC5zdWItdGl0bGUge1xuICBmb250LXNpemU6IDEuNnJlbTtcbn1cbi5tYWluIC5nYW1lLXdyYXBwZXIge1xuICBmbGV4OiAxIDEgYXV0bztcbiAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4ubWFpbiAuYnV0dG9uLWFyZWEge1xuICBwYWRkaW5nLWJvdHRvbTogMnJlbTtcbn1cbi5tYWluIGJ1dHRvbiB7XG4gIHdpZHRoOiAxMDAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/game/game.component.ts":
/*!****************************************!*\
  !*** ./src/app/game/game.component.ts ***!
  \****************************************/
/*! exports provided: GameComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return GameComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _congrats_game_outcome_game_outcome_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../congrats/game-outcome/game-outcome.service */ "./src/app/congrats/game-outcome/game-outcome.service.ts");







var GameComponent = /** @class */ (function () {
    function GameComponent(activeRoute, gameService, location, notificationService, router, gameOutcomeService) {
        this.activeRoute = activeRoute;
        this.gameService = gameService;
        this.location = location;
        this.notificationService = notificationService;
        this.router = router;
        this.gameOutcomeService = gameOutcomeService;
        this.isEnabled = false;
        this.isGameAvailable = false;
        this.isButtonDisabled = true;
        this.backgroundImage = '';
        this.pinata = _perx_core__WEBPACK_IMPORTED_MODULE_3__["GameType"].pinata;
        this.shakeTheTree = _perx_core__WEBPACK_IMPORTED_MODULE_3__["GameType"].shakeTheTree;
    }
    GameComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.queryParams
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (params) { return params.id; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (params) { return Number.parseInt(params.id, 10); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (gameId) { return _this.gameService.get(gameId); }))
            .subscribe(function (game) {
            _this.game = game;
            _this.buttonText = game.texts.button || 'Start playing';
            _this.title = game.texts.title || 'Shake the Pinata';
            _this.subTitle = game.texts.subTitle || 'Shake the Pinata and Win!';
            _this.isGameAvailable = true;
            _this.isButtonDisabled = false;
            if ('nbTaps' in game.config) {
                _this.numberOfTaps = game.config.nbTaps;
            }
            if (game.type === _perx_core__WEBPACK_IMPORTED_MODULE_3__["GameType"].shakeTheTree) {
                _this.backgroundImage = game.backgroundImg || 'assets/tree/background.jpg';
            }
            if (game.type === _perx_core__WEBPACK_IMPORTED_MODULE_3__["GameType"].pinata) {
                _this.backgroundImage = game.backgroundImg || '';
            }
            if (game.remainingNumberOfTries <= 0) {
                _this.isButtonDisabled = true;
                _this.notificationService.addPopup({
                    title: game.results.noOutcome.title,
                    text: game.results.noOutcome.subTitle,
                    buttonTxt: game.results.noOutcome.button,
                    afterClosedCallBack: _this
                });
            }
        }, function (err) {
            console.log(err);
            _this.isEnabled = false;
            _this.notificationService.addPopup({
                title: 'Oooops!',
                text: 'Something is wrong, game cannot be played at the moment!'
            });
        });
    };
    GameComponent.prototype.goBack = function () {
        if (this.isEnabled) {
            this.notificationService.addPopup({
                title: 'Do you want to quit now?',
                text: 'By leaving, your progress will not be saved.',
                buttonTxt2: 'Keep playing',
                buttonTxt: 'Quit game',
                afterClosedCallBack: this,
            });
        }
        else {
            this.location.back();
        }
    };
    GameComponent.prototype.dialogClosed = function () {
        this.location.back();
    };
    GameComponent.prototype.gameCompleted = function () {
        var _this = this;
        this.gameService.play(this.game.id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (game) { return game.vouchers; }))
            .subscribe(function (vouchs) {
            if (vouchs.length === 0) {
                _this.showNoRewardsPopUp();
            }
            else {
                _this.gameOutcomeService.setVouchersList(vouchs);
                _this.router.navigate(['/congrats']);
            }
        }, function () { return _this.showNoRewardsPopUp(); });
    };
    GameComponent.prototype.showNoRewardsPopUp = function () {
        this.notificationService.addPopup({
            title: this.game.results.noOutcome.title,
            text: this.game.results.noOutcome.subTitle,
            buttonTxt: this.game.results.noOutcome.button,
            afterClosedCallBack: this
        });
    };
    GameComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_3__["IGameService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_3__["NotificationService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _congrats_game_outcome_game_outcome_service__WEBPACK_IMPORTED_MODULE_6__["GameOutcomeService"] }
    ]; };
    GameComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-game',
            template: __webpack_require__(/*! raw-loader!./game.component.html */ "../../node_modules/raw-loader/index.js!./src/app/game/game.component.html"),
            styles: [__webpack_require__(/*! ./game.component.scss */ "./src/app/game/game.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _perx_core__WEBPACK_IMPORTED_MODULE_3__["IGameService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"],
            _perx_core__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _congrats_game_outcome_game_outcome_service__WEBPACK_IMPORTED_MODULE_6__["GameOutcomeService"]])
    ], GameComponent);
    return GameComponent;
}());



/***/ }),

/***/ "./src/app/location-short-format/location-short-format.component.scss":
/*!****************************************************************************!*\
  !*** ./src/app/location-short-format/location-short-format.component.scss ***!
  \****************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  width: 100%;\n}\n.main-container .loc {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  color: #666666;\n}\n.main-container .loc address {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n.main-container .loc h1 {\n  font-size: 1.4rem;\n  font-weight: normal;\n}\n.main-container .loc .title {\n  font-size: 1.6rem;\n  color: #3A3A3A;\n  font-weight: normal;\n}\n.main-container .loc p {\n  font-size: 1.2rem;\n  margin: 0;\n}\n.main-container .mat-button {\n  padding: 0;\n  margin-top: 0.5rem;\n  font-size: 1.6rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvbG9jYXRpb24tc2hvcnQtZm9ybWF0L2xvY2F0aW9uLXNob3J0LWZvcm1hdC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvbG9jYXRpb24tc2hvcnQtZm9ybWF0L2xvY2F0aW9uLXNob3J0LWZvcm1hdC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFdBQUE7QUNDRjtBRENFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxjQUFBO0FDQ0o7QURDSTtFQUNFLG1CQUFBO1VBQUEsT0FBQTtBQ0NOO0FERUk7RUFDRSxpQkFBQTtFQUNBLG1CQUFBO0FDQU47QURHSTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0FDRE47QURJSTtFQUNFLGlCQUFBO0VBQ0EsU0FBQTtBQ0ZOO0FETUU7RUFDRSxVQUFBO0VBQ0Esa0JBQUE7RUFDQSxpQkFBQTtBQ0pKIiwiZmlsZSI6InNyYy9hcHAvbG9jYXRpb24tc2hvcnQtZm9ybWF0L2xvY2F0aW9uLXNob3J0LWZvcm1hdC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuXG4gIC5sb2Mge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gICAgY29sb3I6ICM2NjY2NjY7XG5cbiAgICBhZGRyZXNzIHtcbiAgICAgIGZsZXg6IDE7XG4gICAgfVxuXG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgIH1cblxuICAgIC50aXRsZSB7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICAgIGNvbG9yOiAjM0EzQTNBO1xuICAgICAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgICB9XG5cbiAgICBwIHtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgbWFyZ2luOiAwO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYnV0dG9uIHtcbiAgICBwYWRkaW5nOiAwO1xuICAgIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgfVxufVxuIiwiLm1haW4tY29udGFpbmVyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4ubWFpbi1jb250YWluZXIgLmxvYyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG4ubWFpbi1jb250YWluZXIgLmxvYyBhZGRyZXNzIHtcbiAgZmxleDogMTtcbn1cbi5tYWluLWNvbnRhaW5lciAubG9jIGgxIHtcbiAgZm9udC1zaXplOiAxLjRyZW07XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4ubWFpbi1jb250YWluZXIgLmxvYyAudGl0bGUge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgY29sb3I6ICMzQTNBM0E7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4ubWFpbi1jb250YWluZXIgLmxvYyBwIHtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIG1hcmdpbjogMDtcbn1cbi5tYWluLWNvbnRhaW5lciAubWF0LWJ1dHRvbiB7XG4gIHBhZGRpbmc6IDA7XG4gIG1hcmdpbi10b3A6IDAuNXJlbTtcbiAgZm9udC1zaXplOiAxLjZyZW07XG59Il19 */"

/***/ }),

/***/ "./src/app/location-short-format/location-short-format.component.ts":
/*!**************************************************************************!*\
  !*** ./src/app/location-short-format/location-short-format.component.ts ***!
  \**************************************************************************/
/*! exports provided: LocationShortFormatComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationShortFormatComponent", function() { return LocationShortFormatComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");




var LocationShortFormatComponent = /** @class */ (function () {
    function LocationShortFormatComponent(locationService) {
        this.locationService = locationService;
    }
    LocationShortFormatComponent.prototype.ngOnInit = function () {
        if (!this.merchantId) {
            return;
        }
        this.locations$ = this.locationService.getFromMerchant(this.merchantId);
        this.displayLocation$ = this.locations$.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (x) { return x[0]; }));
    };
    LocationShortFormatComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["LocationsService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], LocationShortFormatComponent.prototype, "merchantId", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Number)
    ], LocationShortFormatComponent.prototype, "rewardId", void 0);
    LocationShortFormatComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-location-short-format',
            template: __webpack_require__(/*! raw-loader!./location-short-format.component.html */ "../../node_modules/raw-loader/index.js!./src/app/location-short-format/location-short-format.component.html"),
            styles: [__webpack_require__(/*! ./location-short-format.component.scss */ "./src/app/location-short-format/location-short-format.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["LocationsService"]])
    ], LocationShortFormatComponent);
    return LocationShortFormatComponent;
}());



/***/ }),

/***/ "./src/app/locations/locations.component.scss":
/*!****************************************************!*\
  !*** ./src/app/locations/locations.component.scss ***!
  \****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-toolbar {\n  background: white;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\nmat-toolbar button {\n  margin: 0.5rem;\n}\nmat-toolbar .spacer {\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  text-align: center;\n}\nmat-toolbar .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\nmat-toolbar .title {\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n:host {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  height: 100%;\n  width: 100%;\n}\n.content {\n  -webkit-box-flex: 1;\n          flex: 1;\n  height: 100%;\n  width: 100%;\n  overflow-y: scroll;\n}\n.loc {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  padding: 0 1.5rem;\n  color: #666666;\n  margin-bottom: 2rem;\n}\n.loc address {\n  -webkit-box-flex: 1;\n          flex: 1;\n}\n.loc h1 {\n  font-size: 1.6rem;\n  font-weight: normal;\n}\n.loc p {\n  font-size: 1.4rem;\n  margin: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvbG9jYXRpb25zL2xvY2F0aW9ucy5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvdG9vbGJhci5zY3NzIiwic3JjL2FwcC9sb2NhdGlvbnMvbG9jYXRpb25zLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUNDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtBQ0RGO0FER0U7RUFDRSxjQUFBO0FDREo7QURJRTtFQUNFLG1CQUFBO1VBQUEsWUFBQTtFQUNBLGtCQUFBO0FDRko7QURLRTtFRWZBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUxxQjtFQU1yQixjQU5xQjtFQU9yQixrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkFWcUI7RUFXckIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FEYUY7QUZyQkU7RUFDRSx3QkFBQTtVQUFBLHVCQUFBO0FFdUJKO0FGbkJBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUVzQkY7QUZuQkE7RUFFRSxtQkFBQTtVQUFBLE9BQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLGtCQUFBO0FFcUJGO0FGbEJBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO1VBQUEsOEJBQUE7RUFDQSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtBRXFCRjtBRm5CRTtFQUNFLG1CQUFBO1VBQUEsT0FBQTtBRXFCSjtBRmxCRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7QUVvQko7QUZqQkU7RUFDRSxpQkFBQTtFQUNBLFNBQUE7QUVtQkoiLCJmaWxlIjoic3JjL2FwcC9sb2NhdGlvbnMvbG9jYXRpb25zLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uL3Rvb2xiYXIuc2Nzc1wiO1xuXG5tYXQtdG9vbGJhciB7XG4gIEBpbmNsdWRlIHRvb2xiYXI7XG5cbiAgLnRpdGxlIHtcbiAgICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgfVxufVxuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5jb250ZW50IHtcbiAgLy8gcGFkZGluZzogMy4zcmVtO1xuICBmbGV4OiAxO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi5sb2Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDAgMS41cmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcblxuICBhZGRyZXNzIHtcbiAgICBmbGV4OiAxO1xuICB9XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIH1cblxuICBwIHtcbiAgICBmb250LXNpemU6IDEuNHJlbTtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cbiIsIkBpbXBvcnQgXCIuLi9pY29uLnNjc3NcIjtcblxuQG1peGluIHRvb2xiYXIge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcblxuICBidXR0b24ge1xuICAgIG1hcmdpbjogMC41cmVtO1xuICB9XG5cbiAgLnNwYWNlciB7XG4gICAgZmxleC1ncm93OiAxO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgfVxuXG4gIC5pY29uIHtcbiAgICBAaW5jbHVkZSBpY29uO1xuICB9XG59XG4iLCJtYXQtdG9vbGJhciB7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xufVxubWF0LXRvb2xiYXIgYnV0dG9uIHtcbiAgbWFyZ2luOiAwLjVyZW07XG59XG5tYXQtdG9vbGJhciAuc3BhY2VyIHtcbiAgZmxleC1ncm93OiAxO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG5tYXQtdG9vbGJhciAuaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICM4ZGI1ZTM7XG4gIGNvbG9yOiAjMTg2MmI4O1xuICBtaW4td2lkdGg6IDMuMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxubWF0LXRvb2xiYXIgLnRpdGxlIHtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLmNvbnRlbnQge1xuICBmbGV4OiAxO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi5sb2Mge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIHBhZGRpbmc6IDAgMS41cmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbn1cbi5sb2MgYWRkcmVzcyB7XG4gIGZsZXg6IDE7XG59XG4ubG9jIGgxIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG59XG4ubG9jIHAge1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgbWFyZ2luOiAwO1xufSIsIkBtaXhpbiBpY29uKCRkaWFtZXRlcjogMy4ycmVtLCAkYmFja2dyb3VuZDogIzhkYjVlMywgJGNvbG9yOiAjMTg2MmI4KSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAkZGlhbWV0ZXI7XG4gIGhlaWdodDogJGRpYW1ldGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGNvbG9yO1xuICBtaW4td2lkdGg6ICRkaWFtZXRlcjtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/locations/locations.component.ts":
/*!**************************************************!*\
  !*** ./src/app/locations/locations.component.ts ***!
  \**************************************************/
/*! exports provided: LocationsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsComponent", function() { return LocationsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");






var LocationsComponent = /** @class */ (function () {
    function LocationsComponent(location, locationService, activeRoute) {
        this.location = location;
        this.locationService = locationService;
        this.activeRoute = activeRoute;
    }
    LocationsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.activeRoute.queryParams
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (params) { return params.mid; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (params) { return params.mid; }))
            .subscribe(function (mid) {
            _this.locations = _this.locationService.getFromMerchant(mid);
        });
    };
    LocationsComponent.prototype.back = function () {
        this.location.back();
    };
    LocationsComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_3__["LocationsService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"] }
    ]; };
    LocationsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-locations',
            template: __webpack_require__(/*! raw-loader!./locations.component.html */ "../../node_modules/raw-loader/index.js!./src/app/locations/locations.component.html"),
            styles: [__webpack_require__(/*! ./locations.component.scss */ "./src/app/locations/locations.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _perx_core__WEBPACK_IMPORTED_MODULE_3__["LocationsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_4__["ActivatedRoute"]])
    ], LocationsComponent);
    return LocationsComponent;
}());



/***/ }),

/***/ "./src/app/redemption/redemption.component.scss":
/*!******************************************************!*\
  !*** ./src/app/redemption/redemption.component.scss ***!
  \******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\n.main {\n  overflow: auto;\n  height: 100%;\n  min-height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .contents {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  overflow: scroll;\n}\n\n.app-header {\n  position: relative;\n}\n\n.app-header img {\n  display: block;\n  width: 100%;\n  height: 25rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.app-header button {\n  position: absolute;\n  top: 23%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  margin-left: 1rem;\n}\n\n.full-width {\n  width: 100%;\n}\n\n.redeem-block {\n  padding: 0 1.5rem;\n  margin-top: -15.5rem;\n  z-index: 1;\n  position: relative;\n}\n\n.upper-section {\n  border-radius: 1rem 1rem 0 0;\n  background-color: #ffffff;\n}\n\n.middle-section {\n  height: 3.5rem;\n  margin-top: -0.1rem;\n}\n\n.middle-section img {\n  width: 100%;\n  -o-object-fit: fill;\n     object-fit: fill;\n  height: 3.5rem;\n}\n\n.lower-section {\n  border-radius: 0 0 1rem 1rem;\n  background-color: #ffffff;\n  overflow: hidden;\n  margin-bottom: 4rem;\n}\n\n.lower-section.expired,\n.lower-section.redeemed {\n  opacity: 0.2;\n}\n\n.detail {\n  padding: 1rem 1.5rem;\n  text-align: center;\n  color: #666666;\n}\n\n.inner {\n  border-radius: 1rem;\n}\n\n.inner.no-code .upper-section, .inner.no-code .middle-section {\n  display: none;\n}\n\n.inner.no-code .lower-section {\n  border-radius: 1rem;\n  padding-top: 1rem;\n}\n\n.code-redemption {\n  min-height: 14rem;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.code-redemption h1, .code-redemption p {\n  font-size: 2rem;\n  color: #666666;\n}\n\n.code-redemption .code {\n  background: #8db5e3;\n  border-radius: 0.5rem;\n  border-color: #8db5e3;\n  border-style: solid;\n  text-align: center;\n  color: #666666;\n  padding: 1.5rem 3.5rem;\n  font-size: 1.8rem;\n  outline: none;\n}\n\n.code-redemption.unavailable .code {\n  text-transform: uppercase;\n  background-color: #e3e7ee;\n}\n\n.button-container button {\n  padding: 1rem;\n}\n\n.enter-pin {\n  color: #ffffff;\n  padding: 0.5rem 3rem;\n}\n\n.pin-input-container {\n  width: 100%;\n  margin: 0.1rem auto;\n  float: none;\n}\n\n.pin-input-container .incorrect-pin {\n  text-align: center;\n  color: #d8127d;\n  font-size: 1.6rem;\n}\n\n.action {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.action button {\n  text-transform: uppercase;\n  border-radius: 0;\n  padding: 1rem;\n}\n\n.action button.mat-flat-button {\n  color: #ffffff;\n}\n\n::ng-deep input {\n  background: #8db5e3;\n  border: 0 !important;\n  font-size: 1.8rem !important;\n  height: 6rem !important;\n  line-height: normal !important;\n}\n\n::ng-deep.error input {\n  border-color: #eb202f;\n  background: #fff3f9;\n}\n\n::ng-deep .error :focus {\n  outline-color: #eb202f;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvcmVkZW1wdGlvbi9yZWRlbXB0aW9uLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiLCJzcmMvYXBwL3JlZGVtcHRpb24vcmVkZW1wdGlvbi5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQ0RFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUxxQjtFQU1yQixjQU5xQjtFQU9yQixrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkFWcUI7RUFXckIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FDQ0Y7O0FGUkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBRUEsb0JBQUE7RUFBQSxhQUFBO0VBRUEsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FFV0Y7O0FGVEU7RUFDRSxtQkFBQTtVQUFBLGNBQUE7RUFDQSxnQkFBQTtBRVdKOztBRlBBO0VBQ0Usa0JBQUE7QUVVRjs7QUZSRTtFQUNFLGNBQUE7RUFDQSxXQUFBO0VBQ0EsYUFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUVVSjs7QUZQRTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxpQkFBQTtBRVNKOztBRkxBO0VBQ0UsV0FBQTtBRVFGOztBRkxBO0VBQ0UsaUJBQUE7RUFDQSxvQkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtBRVFGOztBRkxBO0VBQ0UsNEJBQUE7RUFDQSx5QkFBQTtBRVFGOztBRkxBO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0FFUUY7O0FGTkU7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7S0FBQSxnQkFBQTtFQUNBLGNBQUE7QUVRSjs7QUZKQTtFQUNFLDRCQUFBO0VBQ0EseUJBQUE7RUFDQSxnQkFBQTtFQUNBLG1CQUFBO0FFT0Y7O0FGSkE7O0VBRUUsWUFBQTtBRU9GOztBRkpBO0VBQ0Usb0JBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7QUVPRjs7QUZKQTtFQUNFLG1CQUFBO0FFT0Y7O0FGSEU7RUFDRSxhQUFBO0FFTUo7O0FGSEU7RUFDRSxtQkFBQTtFQUNBLGlCQUFBO0FFS0o7O0FGREE7RUFDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0FFSUY7O0FGRkU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtBRUlKOztBRkRFO0VBQ0UsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLHFCQUFBO0VBQ0EsbUJBQUE7RUFDQSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxzQkFBQTtFQUNBLGlCQUFBO0VBQ0EsYUFBQTtBRUdKOztBRkVFO0VBQ0UseUJBQUE7RUFDQSx5QkFBQTtBRUNKOztBRklFO0VBQ0UsYUFBQTtBRURKOztBRktBO0VBQ0UsY0FBQTtFQUNBLG9CQUFBO0FFRkY7O0FGS0E7RUFDRSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0FFRkY7O0FGSUU7RUFDRSxrQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtBRUZKOztBRk1BO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FFSEY7O0FGS0U7RUFDRSx5QkFBQTtFQUNBLGdCQUFBO0VBQ0EsYUFBQTtBRUhKOztBRk1FO0VBQ0UsY0FBQTtBRUpKOztBRlNBO0VBQ0UsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLDRCQUFBO0VBQ0EsdUJBQUE7RUFDQSw4QkFBQTtBRU5GOztBRlNBO0VBQ0UscUJBQUE7RUFDQSxtQkFBQTtBRU5GOztBRlNBO0VBQ0Usc0JBQUE7QUVORiIsImZpbGUiOiJzcmMvYXBwL3JlZGVtcHRpb24vcmVkZW1wdGlvbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi9pY29uLnNjc3NcIjtcblxuLmljb24ge1xuICBAaW5jbHVkZSBpY29uO1xufVxuXG4ubWFpbiB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgZGlzcGxheTogZmxleDtcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIC5jb250ZW50cyB7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxufVxuXG4uYXBwLWhlYWRlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICBpbWcge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMjVyZW07XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gIH1cblxuICBidXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDIzJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIH1cbn1cblxuLmZ1bGwtd2lkdGgge1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnJlZGVlbS1ibG9jayB7XG4gIHBhZGRpbmc6IDAgMS41cmVtO1xuICBtYXJnaW4tdG9wOiAtMTUuNXJlbTtcbiAgei1pbmRleDogMTtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuXG4udXBwZXItc2VjdGlvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW0gMXJlbSAwIDA7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG59XG5cbi5taWRkbGUtc2VjdGlvbiB7XG4gIGhlaWdodDogMy41cmVtO1xuICBtYXJnaW4tdG9wOiAtMC4xcmVtO1xuXG4gIGltZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgb2JqZWN0LWZpdDogZmlsbDtcbiAgICBoZWlnaHQ6IDMuNXJlbTtcbiAgfVxufVxuXG4ubG93ZXItc2VjdGlvbiB7XG4gIGJvcmRlci1yYWRpdXM6IDAgMCAxcmVtIDFyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIG1hcmdpbi1ib3R0b206IDRyZW07XG59XG5cbi5sb3dlci1zZWN0aW9uLmV4cGlyZWQsXG4ubG93ZXItc2VjdGlvbi5yZWRlZW1lZCB7XG4gIG9wYWNpdHk6IDAuMjtcbn1cblxuLmRldGFpbCB7XG4gIHBhZGRpbmc6IDFyZW0gMS41cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4uaW5uZXIge1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xufVxuXG4uaW5uZXIubm8tY29kZSB7XG4gIC51cHBlci1zZWN0aW9uLCAubWlkZGxlLXNlY3Rpb24ge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cblxuICAubG93ZXItc2VjdGlvbiB7XG4gICAgYm9yZGVyLXJhZGl1czogMXJlbTtcbiAgICBwYWRkaW5nLXRvcDogMXJlbTtcbiAgfVxufVxuXG4uY29kZS1yZWRlbXB0aW9uIHtcbiAgbWluLWhlaWdodDogMTRyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIGgxLCBwIHtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gIH1cblxuICAuY29kZSB7XG4gICAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gICAgYm9yZGVyLWNvbG9yOiAjOGRiNWUzO1xuICAgIGJvcmRlci1zdHlsZTogc29saWQ7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIHBhZGRpbmc6IDEuNXJlbSAzLjVyZW07XG4gICAgZm9udC1zaXplOiAxLjhyZW07XG4gICAgb3V0bGluZTogbm9uZTtcbiAgfVxufVxuXG4uY29kZS1yZWRlbXB0aW9uLnVuYXZhaWxhYmxlIHtcbiAgLmNvZGUge1xuICAgIHRleHQtdHJhbnNmb3JtOiB1cHBlcmNhc2U7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogI2UzZTdlZTtcbiAgfVxufVxuXG4uYnV0dG9uLWNvbnRhaW5lciB7XG4gIGJ1dHRvbiB7XG4gICAgcGFkZGluZzogMXJlbTtcbiAgfVxufVxuXG4uZW50ZXItcGluIHtcbiAgY29sb3I6ICNmZmZmZmY7XG4gIHBhZGRpbmc6IDAuNXJlbSAzcmVtO1xufVxuXG4ucGluLWlucHV0LWNvbnRhaW5lciB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW46IDAuMXJlbSBhdXRvO1xuICBmbG9hdDogbm9uZTtcblxuICAuaW5jb3JyZWN0LXBpbiB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjZDgxMjdkO1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICB9XG59XG5cbi5hY3Rpb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIGJ1dHRvbiB7XG4gICAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgICBib3JkZXItcmFkaXVzOiAwO1xuICAgIHBhZGRpbmc6IDFyZW07XG4gIH1cblxuICBidXR0b24ubWF0LWZsYXQtYnV0dG9uIHtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgfVxufVxuXG4vLyBvdXQgb2YgdGltZSB0byBmaW5kIHNvbWV0aGluZyBiZXR0ZXIgYXQgdGhpcyBzdGFnZVxuOjpuZy1kZWVwIGlucHV0IHtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgYm9yZGVyOiAwICFpbXBvcnRhbnQ7XG4gIGZvbnQtc2l6ZTogMS44cmVtICFpbXBvcnRhbnQ7XG4gIGhlaWdodDogNnJlbSAhaW1wb3J0YW50O1xuICBsaW5lLWhlaWdodDogbm9ybWFsICFpbXBvcnRhbnQ7XG59XG5cbjo6bmctZGVlcC5lcnJvciBpbnB1dCB7XG4gIGJvcmRlci1jb2xvcjogI2ViMjAyZjtcbiAgYmFja2dyb3VuZDogI2ZmZjNmOTtcbn1cblxuOjpuZy1kZWVwIC5lcnJvciA6Zm9jdXMge1xuICBvdXRsaW5lLWNvbG9yOiAjZWIyMDJmO1xufVxuIiwiQG1peGluIGljb24oJGRpYW1ldGVyOiAzLjJyZW0sICRiYWNrZ3JvdW5kOiAjOGRiNWUzLCAkY29sb3I6ICMxODYyYjgpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6ICRkaWFtZXRlcjtcbiAgaGVpZ2h0OiAkZGlhbWV0ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkY29sb3I7XG4gIG1pbi13aWR0aDogJGRpYW1ldGVyO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4iLCIuaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICM4ZGI1ZTM7XG4gIGNvbG9yOiAjMTg2MmI4O1xuICBtaW4td2lkdGg6IDMuMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4ubWFpbiB7XG4gIG92ZXJmbG93OiBhdXRvO1xuICBoZWlnaHQ6IDEwMCU7XG4gIG1pbi1oZWlnaHQ6IDEwMCU7XG4gIGRpc3BsYXk6IC13ZWJraXQtZmxleDtcbiAgZGlzcGxheTogZmxleDtcbiAgLXdlYmtpdC1mbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLm1haW4gLmNvbnRlbnRzIHtcbiAgZmxleDogMSAxIGF1dG87XG4gIG92ZXJmbG93OiBzY3JvbGw7XG59XG5cbi5hcHAtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFwcC1oZWFkZXIgaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDI1cmVtO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5hcHAtaGVhZGVyIGJ1dHRvbiB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAyMyU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG59XG5cbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5yZWRlZW0tYmxvY2sge1xuICBwYWRkaW5nOiAwIDEuNXJlbTtcbiAgbWFyZ2luLXRvcDogLTE1LjVyZW07XG4gIHotaW5kZXg6IDE7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLnVwcGVyLXNlY3Rpb24ge1xuICBib3JkZXItcmFkaXVzOiAxcmVtIDFyZW0gMCAwO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xufVxuXG4ubWlkZGxlLXNlY3Rpb24ge1xuICBoZWlnaHQ6IDMuNXJlbTtcbiAgbWFyZ2luLXRvcDogLTAuMXJlbTtcbn1cbi5taWRkbGUtc2VjdGlvbiBpbWcge1xuICB3aWR0aDogMTAwJTtcbiAgb2JqZWN0LWZpdDogZmlsbDtcbiAgaGVpZ2h0OiAzLjVyZW07XG59XG5cbi5sb3dlci1zZWN0aW9uIHtcbiAgYm9yZGVyLXJhZGl1czogMCAwIDFyZW0gMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgbWFyZ2luLWJvdHRvbTogNHJlbTtcbn1cblxuLmxvd2VyLXNlY3Rpb24uZXhwaXJlZCxcbi5sb3dlci1zZWN0aW9uLnJlZGVlbWVkIHtcbiAgb3BhY2l0eTogMC4yO1xufVxuXG4uZGV0YWlsIHtcbiAgcGFkZGluZzogMXJlbSAxLjVyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG5cbi5pbm5lciB7XG4gIGJvcmRlci1yYWRpdXM6IDFyZW07XG59XG5cbi5pbm5lci5uby1jb2RlIC51cHBlci1zZWN0aW9uLCAuaW5uZXIubm8tY29kZSAubWlkZGxlLXNlY3Rpb24ge1xuICBkaXNwbGF5OiBub25lO1xufVxuLmlubmVyLm5vLWNvZGUgLmxvd2VyLXNlY3Rpb24ge1xuICBib3JkZXItcmFkaXVzOiAxcmVtO1xuICBwYWRkaW5nLXRvcDogMXJlbTtcbn1cblxuLmNvZGUtcmVkZW1wdGlvbiB7XG4gIG1pbi1oZWlnaHQ6IDE0cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbn1cbi5jb2RlLXJlZGVtcHRpb24gaDEsIC5jb2RlLXJlZGVtcHRpb24gcCB7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG4uY29kZS1yZWRlbXB0aW9uIC5jb2RlIHtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICBib3JkZXItY29sb3I6ICM4ZGI1ZTM7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIHBhZGRpbmc6IDEuNXJlbSAzLjVyZW07XG4gIGZvbnQtc2l6ZTogMS44cmVtO1xuICBvdXRsaW5lOiBub25lO1xufVxuXG4uY29kZS1yZWRlbXB0aW9uLnVuYXZhaWxhYmxlIC5jb2RlIHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2UzZTdlZTtcbn1cblxuLmJ1dHRvbi1jb250YWluZXIgYnV0dG9uIHtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLmVudGVyLXBpbiB7XG4gIGNvbG9yOiAjZmZmZmZmO1xuICBwYWRkaW5nOiAwLjVyZW0gM3JlbTtcbn1cblxuLnBpbi1pbnB1dC1jb250YWluZXIge1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAwLjFyZW0gYXV0bztcbiAgZmxvYXQ6IG5vbmU7XG59XG4ucGluLWlucHV0LWNvbnRhaW5lciAuaW5jb3JyZWN0LXBpbiB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICNkODEyN2Q7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xufVxuXG4uYWN0aW9uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5hY3Rpb24gYnV0dG9uIHtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgYm9yZGVyLXJhZGl1czogMDtcbiAgcGFkZGluZzogMXJlbTtcbn1cbi5hY3Rpb24gYnV0dG9uLm1hdC1mbGF0LWJ1dHRvbiB7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG46Om5nLWRlZXAgaW5wdXQge1xuICBiYWNrZ3JvdW5kOiAjOGRiNWUzO1xuICBib3JkZXI6IDAgIWltcG9ydGFudDtcbiAgZm9udC1zaXplOiAxLjhyZW0gIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA2cmVtICFpbXBvcnRhbnQ7XG4gIGxpbmUtaGVpZ2h0OiBub3JtYWwgIWltcG9ydGFudDtcbn1cblxuOjpuZy1kZWVwLmVycm9yIGlucHV0IHtcbiAgYm9yZGVyLWNvbG9yOiAjZWIyMDJmO1xuICBiYWNrZ3JvdW5kOiAjZmZmM2Y5O1xufVxuXG46Om5nLWRlZXAgLmVycm9yIDpmb2N1cyB7XG4gIG91dGxpbmUtY29sb3I6ICNlYjIwMmY7XG59Il19 */"

/***/ }),

/***/ "./src/app/redemption/redemption.component.ts":
/*!****************************************************!*\
  !*** ./src/app/redemption/redemption.component.ts ***!
  \****************************************************/
/*! exports provided: RedemptionComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedemptionComponent", function() { return RedemptionComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");






var RedemptionComponent = /** @class */ (function () {
    function RedemptionComponent(vouchersService, activeRoute, location, router, notficationService) {
        this.vouchersService = vouchersService;
        this.activeRoute = activeRoute;
        this.location = location;
        this.router = router;
        this.notficationService = notficationService;
        this.showEnterPinComponent = false;
        this.isPinEntered = false;
    }
    RedemptionComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.voucher$ = this.activeRoute.queryParams
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (params) { return params.id ? true : false; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (params) { return params.id; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (id) { return _this.vouchersService.get(id); }));
        this.voucher$.subscribe(function (voucher) {
            _this.voucher = voucher;
        });
    };
    RedemptionComponent.prototype.back = function () {
        this.location.back();
    };
    RedemptionComponent.prototype.showPinComponent = function () {
        this.showEnterPinComponent = true;
    };
    RedemptionComponent.prototype.full = function (pin) {
        var _this = this;
        this.vouchersService.redeemVoucher(this.voucher.id, { pin: pin })
            .subscribe(function () { return _this.voucher.state = _perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].redeemed; }, function () {
            _this.pinInputComponent.error = true;
            _this.notficationService.addSnack('Sorry! Voucher redemption failed.');
        });
    };
    RedemptionComponent.prototype.tryAgainClicked = function () {
        this.isPinEntered = false;
        this.pinInputComponent.resetAll();
    };
    RedemptionComponent.prototype.cancelClicked = function () {
        this.location.back();
    };
    RedemptionComponent.prototype.backMyRewardsClicked = function () {
        this.router.navigateByUrl('home/vouchers');
    };
    RedemptionComponent.prototype.copyCode = function (inputElement) {
        inputElement.select();
        document.execCommand('copy');
    };
    RedemptionComponent.prototype.updatePin = function () {
        this.pinInputComponent.error = false;
    };
    RedemptionComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["NotificationService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"])('pinInput', { static: false }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _perx_core__WEBPACK_IMPORTED_MODULE_2__["PinInputComponent"])
    ], RedemptionComponent.prototype, "pinInputComponent", void 0);
    RedemptionComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-redemption',
            template: __webpack_require__(/*! raw-loader!./redemption.component.html */ "../../node_modules/raw-loader/index.js!./src/app/redemption/redemption.component.html"),
            styles: [__webpack_require__(/*! ./redemption.component.scss */ "./src/app/redemption/redemption.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _angular_common__WEBPACK_IMPORTED_MODULE_5__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["NotificationService"]])
    ], RedemptionComponent);
    return RedemptionComponent;
}());



/***/ }),

/***/ "./src/app/reward-popup/reward-popup.component.scss":
/*!**********************************************************!*\
  !*** ./src/app/reward-popup/reward-popup.component.scss ***!
  \**********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content {\n  padding: 2rem;\n}\n\n.close-button-container {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: end;\n          justify-content: flex-end;\n}\n\nbutton {\n  margin-top: 1.6rem;\n  width: 100%;\n  color: #ffffff;\n}\n\nh1 {\n  text-align: center;\n  font-size: 2.4rem;\n  line-height: 2.8rem;\n  margin: 0 auto 2rem;\n}\n\n@media (max-width: 42.4rem) {\n  h1 {\n    width: 20.8rem;\n  }\n}\n\n.img-wrapper {\n  margin: 2.5rem;\n}\n\n.img-wrapper img {\n  display: block;\n  margin: 0 auto 2rem;\n  max-width: 100%;\n  max-height: 30rem;\n  height: auto;\n  width: auto;\n}\n\nmat-dialog-content {\n  text-align: center;\n  font-size: 1.6rem;\n  line-height: 1.8rem;\n}\n\napp-expire-timer {\n  font-size: 4.5rem;\n  color: #3D3D3D;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvcmV3YXJkLXBvcHVwL3Jld2FyZC1wb3B1cC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcmV3YXJkLXBvcHVwL3Jld2FyZC1wb3B1cC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGFBQUE7QUNDRjs7QURFQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtFQUNBLHFCQUFBO1VBQUEseUJBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLGNBQUE7QUNDRjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7O0FEQ0U7RUFORjtJQU9JLGNBQUE7RUNFRjtBQUNGOztBRENBO0VBQ0UsY0FBQTtBQ0VGOztBREFFO0VBQ0UsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZUFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNFSjs7QURFQTtFQUNFLGtCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9yZXdhcmQtcG9wdXAvcmV3YXJkLXBvcHVwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmNvbnRlbnQge1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4uY2xvc2UtYnV0dG9uLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbmJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDEuNnJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG5oMSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyLjRyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjhyZW07XG4gIG1hcmdpbjogMCBhdXRvIDJyZW07XG5cbiAgQG1lZGlhIChtYXgtd2lkdGg6IDQyLjRyZW0pIHtcbiAgICB3aWR0aDogMjAuOHJlbTtcbiAgfVxufVxuXG4uaW1nLXdyYXBwZXIge1xuICBtYXJnaW46IDIuNXJlbTtcblxuICBpbWcge1xuICAgIGRpc3BsYXk6IGJsb2NrO1xuICAgIG1hcmdpbjogMCBhdXRvIDJyZW07XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIG1heC1oZWlnaHQ6IDMwcmVtO1xuICAgIGhlaWdodDogYXV0bztcbiAgICB3aWR0aDogYXV0bztcbiAgfVxufVxuXG5tYXQtZGlhbG9nLWNvbnRlbnQge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBsaW5lLWhlaWdodDogMS44cmVtO1xufVxuXG5hcHAtZXhwaXJlLXRpbWVyIHtcbiAgZm9udC1zaXplOiA0LjVyZW07XG4gIGNvbG9yOiAjM0QzRDNEO1xufVxuIiwiLmNvbnRlbnQge1xuICBwYWRkaW5nOiAycmVtO1xufVxuXG4uY2xvc2UtYnV0dG9uLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG5cbmJ1dHRvbiB7XG4gIG1hcmdpbi10b3A6IDEuNnJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiAjZmZmZmZmO1xufVxuXG5oMSB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAyLjRyZW07XG4gIGxpbmUtaGVpZ2h0OiAyLjhyZW07XG4gIG1hcmdpbjogMCBhdXRvIDJyZW07XG59XG5AbWVkaWEgKG1heC13aWR0aDogNDIuNHJlbSkge1xuICBoMSB7XG4gICAgd2lkdGg6IDIwLjhyZW07XG4gIH1cbn1cblxuLmltZy13cmFwcGVyIHtcbiAgbWFyZ2luOiAyLjVyZW07XG59XG4uaW1nLXdyYXBwZXIgaW1nIHtcbiAgZGlzcGxheTogYmxvY2s7XG4gIG1hcmdpbjogMCBhdXRvIDJyZW07XG4gIG1heC13aWR0aDogMTAwJTtcbiAgbWF4LWhlaWdodDogMzByZW07XG4gIGhlaWdodDogYXV0bztcbiAgd2lkdGg6IGF1dG87XG59XG5cbm1hdC1kaWFsb2ctY29udGVudCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjhyZW07XG59XG5cbmFwcC1leHBpcmUtdGltZXIge1xuICBmb250LXNpemU6IDQuNXJlbTtcbiAgY29sb3I6ICMzRDNEM0Q7XG59Il19 */"

/***/ }),

/***/ "./src/app/reward-popup/reward-popup.component.ts":
/*!********************************************************!*\
  !*** ./src/app/reward-popup/reward-popup.component.ts ***!
  \********************************************************/
/*! exports provided: RewardPopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardPopupComponent", function() { return RewardPopupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");



var RewardPopupComponent = /** @class */ (function () {
    function RewardPopupComponent(dialogRef, data) {
        this.dialogRef = dialogRef;
        this.data = data;
        this.text = null;
        this.imageUrl = null;
        this.buttonTxt = null;
        if (data.disableOverlayClose) {
            dialogRef.disableClose = data.disableOverlayClose;
        }
        if (data.text) {
            this.text = data.text;
        }
        if (data.buttonTxt !== undefined) {
            this.buttonTxt = data.buttonTxt;
        }
        if (data.imageUrl) {
            this.imageUrl = data.imageUrl;
        }
        if (data.validTo) {
            this.validTo = data.validTo;
        }
    }
    RewardPopupComponent.prototype.onTimerExpired = function () {
        if (this.data.timerCallbacks) {
            this.data.timerCallbacks.timerExpired();
        }
    };
    RewardPopupComponent.prototype.onExpiring = function () {
        if (this.data.timerCallbacks) {
            this.data.timerCallbacks.timerExpiring();
        }
    };
    RewardPopupComponent.prototype.onClose = function () {
        this.dialogRef.close();
    };
    RewardPopupComponent.prototype.buttonPressed = function () {
        this.dialogRef.close();
        if (this.data.afterClosedCallBack) {
            this.data.afterClosedCallBack.dialogClosed();
        }
    };
    RewardPopupComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    RewardPopupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reward-popup',
            template: __webpack_require__(/*! raw-loader!./reward-popup.component.html */ "../../node_modules/raw-loader/index.js!./src/app/reward-popup/reward-popup.component.html"),
            styles: [__webpack_require__(/*! ./reward-popup.component.scss */ "./src/app/reward-popup/reward-popup.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](1, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialogRef"], Object])
    ], RewardPopupComponent);
    return RewardPopupComponent;
}());



/***/ }),

/***/ "./src/app/reward/expire-timer/expire-timer.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/reward/expire-timer/expire-timer.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IiIsImZpbGUiOiJzcmMvYXBwL3Jld2FyZC9leHBpcmUtdGltZXIvZXhwaXJlLXRpbWVyLmNvbXBvbmVudC5zY3NzIn0= */"

/***/ }),

/***/ "./src/app/reward/expire-timer/expire-timer.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/reward/expire-timer/expire-timer.component.ts ***!
  \***************************************************************/
/*! exports provided: ExpireTimerComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ExpireTimerComponent", function() { return ExpireTimerComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");




var ExpireTimerComponent = /** @class */ (function () {
    function ExpireTimerComponent() {
        this.hasExpired = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isExpiring = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    ExpireTimerComponent.prototype.ngOnInit = function () {
        var _this = this;
        if (!this.timerEndDate) {
            return;
        }
        var dateNow = new Date();
        var differenceTime = this.timerEndDate.valueOf() - dateNow.valueOf();
        var differenceInSeconds = differenceTime / 1000;
        var differenceInHours = differenceInSeconds / 60 / 60;
        var convertedtoSeconds = differenceInHours * 3600;
        var thirtySixHoursInSeconds = 129600;
        if (Math.round(convertedtoSeconds) <= 0) {
            this.hasExpired.emit(true);
            return;
        }
        if (convertedtoSeconds <= thirtySixHoursInSeconds) {
            this.isExpiring.emit(true);
            this.dateTime$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_2__["timer"])(0, 1000).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["take"])(thirtySixHoursInSeconds), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function () {
                var time = Date.parse(String(_this.timerEndDate)) - (new Date()).getTime();
                var seconds = Math.floor((time / 1000) % 60);
                var minutes = Math.floor((time / 1000 / 60) % 60);
                var hours = Math.floor((time / (1000 * 60 * 60)) % 24);
                var days = Math.floor(time / (1000 * 60 * 60 * 24));
                if (Math.round(convertedtoSeconds) <= 0) {
                    _this.hasExpired.emit(true);
                    return;
                }
                convertedtoSeconds--;
                return [{
                        days: days,
                        hours: hours,
                        minutes: minutes,
                        seconds: seconds
                    }];
            }));
        }
    };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Date)
    ], ExpireTimerComponent.prototype, "timerEndDate", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ExpireTimerComponent.prototype, "hasExpired", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], ExpireTimerComponent.prototype, "isExpiring", void 0);
    ExpireTimerComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-expire-timer',
            template: __webpack_require__(/*! raw-loader!./expire-timer.component.html */ "../../node_modules/raw-loader/index.js!./src/app/reward/expire-timer/expire-timer.component.html"),
            styles: [__webpack_require__(/*! ./expire-timer.component.scss */ "./src/app/reward/expire-timer/expire-timer.component.scss")]
        })
    ], ExpireTimerComponent);
    return ExpireTimerComponent;
}());



/***/ }),

/***/ "./src/app/reward/reward-detail/reward-detail.component.scss":
/*!*******************************************************************!*\
  !*** ./src/app/reward/reward-detail/reward-detail.component.scss ***!
  \*******************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\n.banner {\n  width: 100%;\n  max-height: 20rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n  -webkit-transform: scale(1.01);\n          transform: scale(1.01);\n}\n\n.main {\n  overflow: auto;\n  height: 100%;\n  min-height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .contents {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  overflow: scroll;\n}\n\n.app-header {\n  position: relative;\n}\n\n.app-header button {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  margin-left: 1rem;\n}\n\n.reward .badge {\n  max-width: 7rem;\n  height: 4.8rem;\n  background-color: #ffffff;\n  border-radius: 0.5rem;\n  position: absolute;\n  width: 100%;\n  margin-top: -2.5rem;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  text-align: center;\n}\n\n.reward .badge img {\n  max-width: 3.5rem;\n  position: relative;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.reward-merchant {\n  margin-top: 4rem;\n  text-align: center;\n}\n\n.reward-merchant h1 {\n  color: #3a3a3a;\n}\n\n.reward-merchant h2 {\n  font-weight: normal;\n  color: #666666;\n}\n\n.reward-balance {\n  font-size: 1.6rem;\n  color: #666666;\n}\n\n.voucher .badge {\n  text-align: center;\n}\n\n.voucher .badge img {\n  max-width: 3.5rem;\n}\n\n.voucher .reward-merchant {\n  margin-top: 2rem;\n}\n\n.container {\n  padding: 0 3rem 2rem 3rem;\n  margin-bottom: 5rem;\n}\n\n.container h1 {\n  font-size: 1.6rem;\n  color: #3A3A3A;\n  font-weight: normal;\n  margin-bottom: 0;\n}\n\n.container p {\n  color: #666666;\n  line-height: 2rem;\n}\n\n.container .content {\n  margin: 3rem 0;\n}\n\n.container .content a.mat-button {\n  padding: 0;\n}\n\n.container .about a {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  vertical-align: middle;\n  -webkit-box-align: center;\n          align-items: center;\n  color: #7E8494;\n  margin-bottom: 1.5rem;\n}\n\n.container .about a .icon {\n  margin-right: 0.5rem;\n}\n\n.button-area {\n  width: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  background-color: #ffffff;\n  min-height: 3.6rem;\n  padding: 1rem 0;\n}\n\n.button-area button.full-width {\n  width: 70%;\n  color: #ffffff;\n}\n\n.macaron-container {\n  text-align: center;\n  padding: 1rem;\n}\n\n.just-added, .coming-soon {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #1862b8;\n  color: #ffffff;\n}\n\n.expiring, .running-out {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #FFDB1B;\n  color: #4d4d4c;\n}\n\n.expired, .fully-redeemed {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #ffffff;\n  color: #4d4d4c;\n}\n\napp-expire-timer,\n.phone-contact,\n.email-contact {\n  font-size: 1.5rem;\n}\n\n.about {\n  display: none;\n}\n\n.reward-merchant h1 {\n  font-size: 2rem;\n  font-weight: bold;\n}\n\n.reward-merchant h2 {\n  font-size: 1.6rem;\n}\n\n.description, .address, .terms-conditions {\n  font-size: 1.6rem;\n  color: #666666;\n  white-space: pre-line;\n  line-height: 2.5rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvcmV3YXJkL3Jld2FyZC1kZXRhaWwvcmV3YXJkLWRldGFpbC5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaWNvbi5zY3NzIiwic3JjL2FwcC9yZXdhcmQvcmV3YXJkLWRldGFpbC9yZXdhcmQtZGV0YWlsLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3RkaW4iLCIvaG9tZS9hbmR5L1dlYnN0b3JtUHJvamVjdHMvbXktcGVyeC9hcHBzL2ZlYXR1cmUtZGVtby9zcmMvYXBwL21hY2Fyb24uc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFFQTtFQ0RFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUxxQjtFQU1yQixjQU5xQjtFQU9yQixrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkFWcUI7RUFXckIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FDQ0Y7O0FGUkE7RUFDRSxXQUFBO0VBQ0EsaUJBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtBRVdGOztBRlJBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtBRVdGOztBRlRFO0VBQ0UsbUJBQUE7VUFBQSxjQUFBO0VBQ0EsZ0JBQUE7QUVXSjs7QUZQQTtFQUNFLGtCQUFBO0FFVUY7O0FGUkU7RUFDRSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0VBQ0EsaUJBQUE7QUVVSjs7QUZMRTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EseUJBQUE7RUFDQSxxQkFBQTtFQUNBLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLG1CQUFBO0VBQ0EsU0FBQTtFQUNBLG1DQUFBO0VBQ0EsMkJBQUE7RUFDQSxrQkFBQTtBRVFKOztBRk5JO0VBQ0UsaUJBQUE7RUFDQSxrQkFBQTtFQUNBLFFBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0FFUU47O0FGSEE7RUFDRSxnQkFBQTtFQUNBLGtCQUFBO0FFTUY7O0FGSkU7RUFDRSxjQUFBO0FFTUo7O0FGSEU7RUFDRSxtQkFBQTtFQUNBLGNBQUE7QUVLSjs7QUZEQTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtBRUlGOztBRkFFO0VBQ0Usa0JBQUE7QUVHSjs7QUZESTtFQUNFLGlCQUFBO0FFR047O0FGQ0U7RUFDRSxnQkFBQTtBRUNKOztBRkdBO0VBQ0UseUJBQUE7RUFDQSxtQkFBQTtBRUFGOztBRkVFO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtBRUFKOztBRkdFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0FFREo7O0FGSUU7RUFDRSxjQUFBO0FFRko7O0FGSUk7RUFDRSxVQUFBO0FFRk47O0FGT0k7RUFDRSwyQkFBQTtFQUFBLG9CQUFBO0VBQ0Esc0JBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0EsY0FBQTtFQUNBLHFCQUFBO0FFTE47O0FGT007RUFDRSxvQkFBQTtBRUxSOztBRldBO0VBQ0UsV0FBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSx5QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtBRVJGOztBRlVFO0VBQ0UsVUFBQTtFQUNBLGNBQUE7QUVSSjs7QUNuSUE7RUFDRSxrQkFBQTtFQUNBLGFBQUE7QURzSUY7O0FFbElFO0VBUkEsbUJBQUE7RUFDQSxvQkFBQTtFQUNBLGlCQUFBO0VBQ0EseUJBTW1CO0VBTG5CLGNBSzRCO0FGeUk5Qjs7QUV0SUU7RUFaQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFVbUI7RUFUbkIsY0FTNEI7QUY2STlCOztBRTFJRTtFQWhCQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFjbUI7RUFibkIsY0FhNEI7QUZpSjlCOztBQ3pKQTs7O0VBR0UsaUJBQUE7QUQ0SkY7O0FDekpBO0VBQ0UsYUFBQTtBRDRKRjs7QUN4SkU7RUFDRSxlQUFBO0VBQ0EsaUJBQUE7QUQySko7O0FDeEpFO0VBQ0UsaUJBQUE7QUQwSko7O0FDdEpBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7RUFDQSxtQkFBQTtBRHlKRiIsImZpbGUiOiJzcmMvYXBwL3Jld2FyZC9yZXdhcmQtZGV0YWlsL3Jld2FyZC1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi9pY29uLnNjc3NcIjtcblxuLmljb24ge1xuICBAaW5jbHVkZSBpY29uO1xufVxuXG4uYmFubmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDIwcmVtO1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcbn1cblxuLm1haW4ge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIC5jb250ZW50cyB7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxufVxuXG4uYXBwLWhlYWRlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICBidXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIH1cbn1cblxuLnJld2FyZCB7XG4gIC5iYWRnZSB7XG4gICAgbWF4LXdpZHRoOiA3cmVtO1xuICAgIGhlaWdodDogNC44cmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tdG9wOiAtMi41cmVtO1xuICAgIGxlZnQ6IDUwJTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogMy41cmVtO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgfVxuICB9XG59XG5cbi5yZXdhcmQtbWVyY2hhbnQge1xuICBtYXJnaW4tdG9wOiA0cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgaDEge1xuICAgIGNvbG9yOiAjM2EzYTNhO1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gIH1cbn1cblxuLnJld2FyZC1iYWxhbmNlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4udm91Y2hlciB7XG4gIC5iYWRnZSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogMy41cmVtO1xuICAgIH1cbiAgfVxuXG4gIC5yZXdhcmQtbWVyY2hhbnQge1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgM3JlbSAycmVtIDNyZW07XG4gIG1hcmdpbi1ib3R0b206IDVyZW07XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgIGNvbG9yOiAjM0EzQTNBO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuXG4gIHAge1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xuICB9XG5cbiAgLmNvbnRlbnQge1xuICAgIG1hcmdpbjogM3JlbSAwO1xuXG4gICAgYS5tYXQtYnV0dG9uIHtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuICB9XG5cbiAgLmFib3V0IHtcbiAgICBhIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBjb2xvcjogIzdFODQ5NDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcblxuICAgICAgLmljb24ge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmJ1dHRvbi1hcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBtaW4taGVpZ2h0OiAzLjZyZW07XG4gIHBhZGRpbmc6IDFyZW0gMDtcblxuICBidXR0b24uZnVsbC13aWR0aCB7XG4gICAgd2lkdGg6IDcwJTtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgfVxufVxuIiwiQG1peGluIGljb24oJGRpYW1ldGVyOiAzLjJyZW0sICRiYWNrZ3JvdW5kOiAjOGRiNWUzLCAkY29sb3I6ICMxODYyYjgpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6ICRkaWFtZXRlcjtcbiAgaGVpZ2h0OiAkZGlhbWV0ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkY29sb3I7XG4gIG1pbi13aWR0aDogJGRpYW1ldGVyO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4iLCIuaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICM4ZGI1ZTM7XG4gIGNvbG9yOiAjMTg2MmI4O1xuICBtaW4td2lkdGg6IDMuMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4uYmFubmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDIwcmVtO1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcbn1cblxuLm1haW4ge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLm1haW4gLmNvbnRlbnRzIHtcbiAgZmxleDogMSAxIGF1dG87XG4gIG92ZXJmbG93OiBzY3JvbGw7XG59XG5cbi5hcHAtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFwcC1oZWFkZXIgYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cblxuLnJld2FyZCAuYmFkZ2Uge1xuICBtYXgtd2lkdGg6IDdyZW07XG4gIGhlaWdodDogNC44cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IC0yLjVyZW07XG4gIGxlZnQ6IDUwJTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnJld2FyZCAuYmFkZ2UgaW1nIHtcbiAgbWF4LXdpZHRoOiAzLjVyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbn1cblxuLnJld2FyZC1tZXJjaGFudCB7XG4gIG1hcmdpbi10b3A6IDRyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5yZXdhcmQtbWVyY2hhbnQgaDEge1xuICBjb2xvcjogIzNhM2EzYTtcbn1cbi5yZXdhcmQtbWVyY2hhbnQgaDIge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cblxuLnJld2FyZC1iYWxhbmNlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4udm91Y2hlciAuYmFkZ2Uge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4udm91Y2hlciAuYmFkZ2UgaW1nIHtcbiAgbWF4LXdpZHRoOiAzLjVyZW07XG59XG4udm91Y2hlciAucmV3YXJkLW1lcmNoYW50IHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgM3JlbSAycmVtIDNyZW07XG4gIG1hcmdpbi1ib3R0b206IDVyZW07XG59XG4uY29udGFpbmVyIGgxIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjM0EzQTNBO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuLmNvbnRhaW5lciBwIHtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGxpbmUtaGVpZ2h0OiAycmVtO1xufVxuLmNvbnRhaW5lciAuY29udGVudCB7XG4gIG1hcmdpbjogM3JlbSAwO1xufVxuLmNvbnRhaW5lciAuY29udGVudCBhLm1hdC1idXR0b24ge1xuICBwYWRkaW5nOiAwO1xufVxuLmNvbnRhaW5lciAuYWJvdXQgYSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogIzdFODQ5NDtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuLmNvbnRhaW5lciAuYWJvdXQgYSAuaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4uYnV0dG9uLWFyZWEge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIG1pbi1oZWlnaHQ6IDMuNnJlbTtcbiAgcGFkZGluZzogMXJlbSAwO1xufVxuLmJ1dHRvbi1hcmVhIGJ1dHRvbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDcwJTtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5tYWNhcm9uLWNvbnRhaW5lciB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgcGFkZGluZzogMXJlbTtcbn1cblxuLmp1c3QtYWRkZWQsIC5jb21pbmctc29vbiB7XG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4NjJiODtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5leHBpcmluZywgLnJ1bm5pbmctb3V0IHtcbiAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZEQjFCO1xuICBjb2xvcjogIzRkNGQ0Yztcbn1cblxuLmV4cGlyZWQsIC5mdWxseS1yZWRlZW1lZCB7XG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgY29sb3I6ICM0ZDRkNGM7XG59XG5cbmFwcC1leHBpcmUtdGltZXIsXG4ucGhvbmUtY29udGFjdCxcbi5lbWFpbC1jb250YWN0IHtcbiAgZm9udC1zaXplOiAxLjVyZW07XG59XG5cbi5hYm91dCB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5yZXdhcmQtbWVyY2hhbnQgaDEge1xuICBmb250LXNpemU6IDJyZW07XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xufVxuLnJld2FyZC1tZXJjaGFudCBoMiB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xufVxuXG4uZGVzY3JpcHRpb24sIC5hZGRyZXNzLCAudGVybXMtY29uZGl0aW9ucyB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICBsaW5lLWhlaWdodDogMi41cmVtO1xufSIsIkBpbXBvcnQgXCIuLi8uLi9yZXdhcmQuc2Nzc1wiO1xuQGltcG9ydCBcIi4uLy4uL21hY2Fyb24uc2Nzc1wiO1xuXG4ubWFjYXJvbi1jb250YWluZXIge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDFyZW07XG59XG5cbkBpbmNsdWRlIG1hY2Fyb25TdHlsZXMoKTtcblxuYXBwLWV4cGlyZS10aW1lcixcbi5waG9uZS1jb250YWN0LFxuLmVtYWlsLWNvbnRhY3Qge1xuICBmb250LXNpemU6IDEuNXJlbTtcbn1cblxuLmFib3V0IHtcbiAgZGlzcGxheTogbm9uZTtcbn1cblxuLnJld2FyZC1tZXJjaGFudCB7XG4gIGgxIHtcbiAgICBmb250LXNpemU6IDJyZW07XG4gICAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIH1cblxuICBoMiB7XG4gICAgZm9udC1zaXplOiAxLjZyZW07XG4gIH1cbn1cblxuLmRlc2NyaXB0aW9uLCAuYWRkcmVzcywgLnRlcm1zLWNvbmRpdGlvbnMge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbiAgbGluZS1oZWlnaHQ6IDIuNXJlbTtcbn1cbiIsIkBtaXhpbiBtYWNhcm9uKCRiYWNrZ3JvdW5kQ29sb3IsICRmb250Q29sb3IpIHtcbiAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2dyb3VuZENvbG9yO1xuICBjb2xvcjogJGZvbnRDb2xvcjtcbn1cblxuQG1peGluIG1hY2Fyb25TdHlsZXMge1xuICAuanVzdC1hZGRlZCwgLmNvbWluZy1zb29uIHtcbiAgICBAaW5jbHVkZSBtYWNhcm9uKCMxODYyYjgsICNmZmZmZmYpO1xuICB9XG5cbiAgLmV4cGlyaW5nLCAucnVubmluZy1vdXQge1xuICAgIEBpbmNsdWRlIG1hY2Fyb24oI0ZGREIxQiwgIzRkNGQ0Yyk7XG4gIH1cblxuICAuZXhwaXJlZCwgLmZ1bGx5LXJlZGVlbWVkIHtcbiAgICBAaW5jbHVkZSBtYWNhcm9uKCNmZmZmZmYsICM0ZDRkNGMpO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/reward/reward-detail/reward-detail.component.ts":
/*!*****************************************************************!*\
  !*** ./src/app/reward/reward-detail/reward-detail.component.ts ***!
  \*****************************************************************/
/*! exports provided: RewardDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardDetailComponent", function() { return RewardDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _services_macaron_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/macaron.service */ "./src/app/services/macaron.service.ts");




var RewardDetailComponent = /** @class */ (function () {
    function RewardDetailComponent(location, macaronService) {
        this.location = location;
        this.macaronService = macaronService;
        this.isExpired = false;
        this.hasExpired = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.isButtonEnabled = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.showBackButton = true;
        this.showBannerImage = true;
        this.className = 'reward';
        this.showMacaron = true;
    }
    RewardDetailComponent.prototype.ngOnInit = function () {
        if (!this.reward) {
            return;
        }
        this.macaron = this.macaronService.getMacaron(this.reward);
        if (this.macaron === null) {
            this.isButtonEnabled.emit(true);
            return;
        }
        this.isButtonEnabled.emit(this.macaron.isButtonEnabled);
    };
    RewardDetailComponent.prototype.setToExpired = function () {
        var _this = this;
        setTimeout(function () {
            _this.showMacaron = true;
            _this.hasExpired.emit(true);
            _this.isExpired = true;
            if (_this.macaron === null) {
                _this.macaron = { label: '', class: '', isButtonEnabled: false };
            }
            _this.macaron.label = 'Expired';
        });
    };
    RewardDetailComponent.prototype.onExpiring = function () {
        var _this = this;
        setTimeout(function () {
            _this.showMacaron = true;
            if (_this.macaron === null) {
                _this.macaron = { label: '', class: '', isButtonEnabled: false };
            }
            _this.macaron.label = 'Expiring';
        });
    };
    RewardDetailComponent.prototype.back = function () {
        this.location.back();
    };
    RewardDetailComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _services_macaron_service__WEBPACK_IMPORTED_MODULE_3__["MacaronService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], RewardDetailComponent.prototype, "hasExpired", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], RewardDetailComponent.prototype, "isButtonEnabled", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Object)
    ], RewardDetailComponent.prototype, "reward", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], RewardDetailComponent.prototype, "showBackButton", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], RewardDetailComponent.prototype, "showBannerImage", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", String)
    ], RewardDetailComponent.prototype, "className", void 0);
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Boolean)
    ], RewardDetailComponent.prototype, "showMacaron", void 0);
    RewardDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reward-detail',
            template: __webpack_require__(/*! raw-loader!./reward-detail.component.html */ "../../node_modules/raw-loader/index.js!./src/app/reward/reward-detail/reward-detail.component.html"),
            styles: [__webpack_require__(/*! ./reward-detail.component.scss */ "./src/app/reward/reward-detail/reward-detail.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _services_macaron_service__WEBPACK_IMPORTED_MODULE_3__["MacaronService"]])
    ], RewardDetailComponent);
    return RewardDetailComponent;
}());



/***/ }),

/***/ "./src/app/reward/reward.component.scss":
/*!**********************************************!*\
  !*** ./src/app/reward/reward.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\n.banner {\n  width: 100%;\n  max-height: 20rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n  -webkit-transform: scale(1.01);\n          transform: scale(1.01);\n}\n\n.main {\n  overflow: auto;\n  height: 100%;\n  min-height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .contents {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  overflow: scroll;\n}\n\n.app-header {\n  position: relative;\n}\n\n.app-header button {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  margin-left: 1rem;\n}\n\n.reward .badge {\n  max-width: 7rem;\n  height: 4.8rem;\n  background-color: #ffffff;\n  border-radius: 0.5rem;\n  position: absolute;\n  width: 100%;\n  margin-top: -2.5rem;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  text-align: center;\n}\n\n.reward .badge img {\n  max-width: 3.5rem;\n  position: relative;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.reward-merchant {\n  margin-top: 4rem;\n  text-align: center;\n}\n\n.reward-merchant h1 {\n  color: #3a3a3a;\n}\n\n.reward-merchant h2 {\n  font-weight: normal;\n  color: #666666;\n}\n\n.reward-balance {\n  font-size: 1.6rem;\n  color: #666666;\n}\n\n.voucher .badge {\n  text-align: center;\n}\n\n.voucher .badge img {\n  max-width: 3.5rem;\n}\n\n.voucher .reward-merchant {\n  margin-top: 2rem;\n}\n\n.container {\n  padding: 0 3rem 2rem 3rem;\n  margin-bottom: 5rem;\n}\n\n.container h1 {\n  font-size: 1.6rem;\n  color: #3A3A3A;\n  font-weight: normal;\n  margin-bottom: 0;\n}\n\n.container p {\n  color: #666666;\n  line-height: 2rem;\n}\n\n.container .content {\n  margin: 3rem 0;\n}\n\n.container .content a.mat-button {\n  padding: 0;\n}\n\n.container .about a {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  vertical-align: middle;\n  -webkit-box-align: center;\n          align-items: center;\n  color: #7E8494;\n  margin-bottom: 1.5rem;\n}\n\n.container .about a .icon {\n  margin-right: 0.5rem;\n}\n\n.button-area {\n  width: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  background-color: #ffffff;\n  min-height: 3.6rem;\n  padding: 1rem 0;\n}\n\n.button-area button.full-width {\n  width: 70%;\n  color: #ffffff;\n}\n\n.icon {\n  position: fixed;\n  top: 2rem;\n  left: 2rem;\n}\n\n.main {\n  display: -webkit-box;\n  display: flex;\n  height: 100%;\n  width: 100%;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .reward-container {\n  height: 100%;\n  -webkit-box-flex: 1;\n          flex: 1;\n  overflow-y: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvcmV3YXJkL3Jld2FyZC5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaWNvbi5zY3NzIiwic3JjL2FwcC9yZXdhcmQvcmV3YXJkLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3RkaW4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUNERSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFMcUI7RUFNckIsY0FOcUI7RUFPckIsa0JBQUE7RUFDQSxtQkFSMEM7RUFTMUMsY0FUMkQ7RUFVM0QsaUJBVnFCO0VBV3JCLFNBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtBQ0NGOztBRlJBO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0VBQ0Esb0JBQUE7S0FBQSxpQkFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUVXRjs7QUZSQTtFQUNFLGNBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7QUVXRjs7QUZURTtFQUNFLG1CQUFBO1VBQUEsY0FBQTtFQUNBLGdCQUFBO0FFV0o7O0FGUEE7RUFDRSxrQkFBQTtBRVVGOztBRlJFO0VBQ0Usa0JBQUE7RUFDQSxRQUFBO0VBQ0EsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLGlCQUFBO0FFVUo7O0FGTEU7RUFDRSxlQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO0VBQ0EscUJBQUE7RUFDQSxrQkFBQTtFQUNBLFdBQUE7RUFDQSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxtQ0FBQTtFQUNBLDJCQUFBO0VBQ0Esa0JBQUE7QUVRSjs7QUZOSTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxRQUFBO0VBQ0EsbUNBQUE7VUFBQSwyQkFBQTtBRVFOOztBRkhBO0VBQ0UsZ0JBQUE7RUFDQSxrQkFBQTtBRU1GOztBRkpFO0VBQ0UsY0FBQTtBRU1KOztBRkhFO0VBQ0UsbUJBQUE7RUFDQSxjQUFBO0FFS0o7O0FGREE7RUFDRSxpQkFBQTtFQUNBLGNBQUE7QUVJRjs7QUZBRTtFQUNFLGtCQUFBO0FFR0o7O0FGREk7RUFDRSxpQkFBQTtBRUdOOztBRkNFO0VBQ0UsZ0JBQUE7QUVDSjs7QUZHQTtFQUNFLHlCQUFBO0VBQ0EsbUJBQUE7QUVBRjs7QUZFRTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLG1CQUFBO0VBQ0EsZ0JBQUE7QUVBSjs7QUZHRTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtBRURKOztBRklFO0VBQ0UsY0FBQTtBRUZKOztBRklJO0VBQ0UsVUFBQTtBRUZOOztBRk9JO0VBQ0UsMkJBQUE7RUFBQSxvQkFBQTtFQUNBLHNCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxxQkFBQTtBRUxOOztBRk9NO0VBQ0Usb0JBQUE7QUVMUjs7QUZXQTtFQUNFLFdBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EseUJBQUE7RUFDQSxrQkFBQTtFQUNBLGVBQUE7QUVSRjs7QUZVRTtFQUNFLFVBQUE7RUFDQSxjQUFBO0FFUko7O0FDcElBO0VBQ0UsZUFBQTtFQUNBLFNBQUE7RUFDQSxVQUFBO0FEdUlGOztBQ3BJQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FEdUlGOztBQ3JJRTtFQUNFLFlBQUE7RUFDQSxtQkFBQTtVQUFBLE9BQUE7RUFDQSxrQkFBQTtBRHVJSiIsImZpbGUiOiJzcmMvYXBwL3Jld2FyZC9yZXdhcmQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi9pY29uLnNjc3NcIjtcblxuLmljb24ge1xuICBAaW5jbHVkZSBpY29uO1xufVxuXG4uYmFubmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDIwcmVtO1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcbn1cblxuLm1haW4ge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIC5jb250ZW50cyB7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxufVxuXG4uYXBwLWhlYWRlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICBidXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIH1cbn1cblxuLnJld2FyZCB7XG4gIC5iYWRnZSB7XG4gICAgbWF4LXdpZHRoOiA3cmVtO1xuICAgIGhlaWdodDogNC44cmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tdG9wOiAtMi41cmVtO1xuICAgIGxlZnQ6IDUwJTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogMy41cmVtO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgfVxuICB9XG59XG5cbi5yZXdhcmQtbWVyY2hhbnQge1xuICBtYXJnaW4tdG9wOiA0cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgaDEge1xuICAgIGNvbG9yOiAjM2EzYTNhO1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gIH1cbn1cblxuLnJld2FyZC1iYWxhbmNlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4udm91Y2hlciB7XG4gIC5iYWRnZSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogMy41cmVtO1xuICAgIH1cbiAgfVxuXG4gIC5yZXdhcmQtbWVyY2hhbnQge1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgM3JlbSAycmVtIDNyZW07XG4gIG1hcmdpbi1ib3R0b206IDVyZW07XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgIGNvbG9yOiAjM0EzQTNBO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuXG4gIHAge1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xuICB9XG5cbiAgLmNvbnRlbnQge1xuICAgIG1hcmdpbjogM3JlbSAwO1xuXG4gICAgYS5tYXQtYnV0dG9uIHtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuICB9XG5cbiAgLmFib3V0IHtcbiAgICBhIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBjb2xvcjogIzdFODQ5NDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcblxuICAgICAgLmljb24ge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmJ1dHRvbi1hcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBtaW4taGVpZ2h0OiAzLjZyZW07XG4gIHBhZGRpbmc6IDFyZW0gMDtcblxuICBidXR0b24uZnVsbC13aWR0aCB7XG4gICAgd2lkdGg6IDcwJTtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgfVxufVxuIiwiQG1peGluIGljb24oJGRpYW1ldGVyOiAzLjJyZW0sICRiYWNrZ3JvdW5kOiAjOGRiNWUzLCAkY29sb3I6ICMxODYyYjgpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6ICRkaWFtZXRlcjtcbiAgaGVpZ2h0OiAkZGlhbWV0ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkY29sb3I7XG4gIG1pbi13aWR0aDogJGRpYW1ldGVyO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4iLCIuaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICM4ZGI1ZTM7XG4gIGNvbG9yOiAjMTg2MmI4O1xuICBtaW4td2lkdGg6IDMuMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4uYmFubmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDIwcmVtO1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcbn1cblxuLm1haW4ge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLm1haW4gLmNvbnRlbnRzIHtcbiAgZmxleDogMSAxIGF1dG87XG4gIG92ZXJmbG93OiBzY3JvbGw7XG59XG5cbi5hcHAtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFwcC1oZWFkZXIgYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cblxuLnJld2FyZCAuYmFkZ2Uge1xuICBtYXgtd2lkdGg6IDdyZW07XG4gIGhlaWdodDogNC44cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IC0yLjVyZW07XG4gIGxlZnQ6IDUwJTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnJld2FyZCAuYmFkZ2UgaW1nIHtcbiAgbWF4LXdpZHRoOiAzLjVyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbn1cblxuLnJld2FyZC1tZXJjaGFudCB7XG4gIG1hcmdpbi10b3A6IDRyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5yZXdhcmQtbWVyY2hhbnQgaDEge1xuICBjb2xvcjogIzNhM2EzYTtcbn1cbi5yZXdhcmQtbWVyY2hhbnQgaDIge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cblxuLnJld2FyZC1iYWxhbmNlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4udm91Y2hlciAuYmFkZ2Uge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4udm91Y2hlciAuYmFkZ2UgaW1nIHtcbiAgbWF4LXdpZHRoOiAzLjVyZW07XG59XG4udm91Y2hlciAucmV3YXJkLW1lcmNoYW50IHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgM3JlbSAycmVtIDNyZW07XG4gIG1hcmdpbi1ib3R0b206IDVyZW07XG59XG4uY29udGFpbmVyIGgxIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjM0EzQTNBO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuLmNvbnRhaW5lciBwIHtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGxpbmUtaGVpZ2h0OiAycmVtO1xufVxuLmNvbnRhaW5lciAuY29udGVudCB7XG4gIG1hcmdpbjogM3JlbSAwO1xufVxuLmNvbnRhaW5lciAuY29udGVudCBhLm1hdC1idXR0b24ge1xuICBwYWRkaW5nOiAwO1xufVxuLmNvbnRhaW5lciAuYWJvdXQgYSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogIzdFODQ5NDtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuLmNvbnRhaW5lciAuYWJvdXQgYSAuaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4uYnV0dG9uLWFyZWEge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIG1pbi1oZWlnaHQ6IDMuNnJlbTtcbiAgcGFkZGluZzogMXJlbSAwO1xufVxuLmJ1dHRvbi1hcmVhIGJ1dHRvbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDcwJTtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5pY29uIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDJyZW07XG4gIGxlZnQ6IDJyZW07XG59XG5cbi5tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5tYWluIC5yZXdhcmQtY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59IiwiQGltcG9ydCAnLi4vcmV3YXJkLnNjc3MnO1xuXG4uaWNvbiB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAycmVtO1xuICBsZWZ0OiAycmVtO1xufVxuXG4ubWFpbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgLnJld2FyZC1jb250YWluZXIge1xuICAgIGhlaWdodDogMTAwJTtcbiAgICBmbGV4OiAxO1xuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgfVxufVxuIl19 */"

/***/ }),

/***/ "./src/app/reward/reward.component.ts":
/*!********************************************!*\
  !*** ./src/app/reward/reward.component.ts ***!
  \********************************************/
/*! exports provided: RewardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardComponent", function() { return RewardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");






var RewardComponent = /** @class */ (function () {
    function RewardComponent(location, router, activeRoute, rewardsService, vouchersService, notificationService) {
        this.location = location;
        this.router = router;
        this.activeRoute = activeRoute;
        this.rewardsService = rewardsService;
        this.vouchersService = vouchersService;
        this.notificationService = notificationService;
        this.isButtonEnable = true;
    }
    RewardComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reward$ = this.activeRoute.queryParams
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (params) { return params.id; }), // ignore anything not related to reward id
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (params) { return params.id; }), // get reward id
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (id) { return _this.rewardsService.getReward(id); }) // get the full reward information
        );
        this.reward$.subscribe(function (reward) {
            // if there is no more personnal inventory for this user disable the button
            if (reward.inventory && reward.inventory.rewardLimitPerUserBalance === 0) {
                _this.isButtonEnable = false;
            }
        });
    };
    RewardComponent.prototype.back = function () {
        this.location.back();
    };
    RewardComponent.prototype.save = function (reward) {
        var _this = this;
        this.vouchersService.issueReward(reward.id)
            .subscribe(function () { return _this.router.navigate(['/home/vouchers']); }, function () { return _this.notificationService.addSnack('Sorry! Could not save reward.'); });
    };
    RewardComponent.prototype.setButton = function (isEnable) {
        this.isButtonEnable = isEnable && this.isButtonEnable;
    };
    RewardComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_4__["RewardsService"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_4__["IVoucherService"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_4__["NotificationService"] }
    ]; };
    RewardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reward',
            template: __webpack_require__(/*! raw-loader!./reward.component.html */ "../../node_modules/raw-loader/index.js!./src/app/reward/reward.component.html"),
            styles: [__webpack_require__(/*! ./reward.component.scss */ "./src/app/reward/reward.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _perx_core__WEBPACK_IMPORTED_MODULE_4__["RewardsService"],
            _perx_core__WEBPACK_IMPORTED_MODULE_4__["IVoucherService"],
            _perx_core__WEBPACK_IMPORTED_MODULE_4__["NotificationService"]])
    ], RewardComponent);
    return RewardComponent;
}());



/***/ }),

/***/ "./src/app/services/macaron.service.ts":
/*!*********************************************!*\
  !*** ./src/app/services/macaron.service.ts ***!
  \*********************************************/
/*! exports provided: MacaronService */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "MacaronService", function() { return MacaronService; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var MacaronService = /** @class */ (function () {
    function MacaronService() {
    }
    MacaronService.prototype.getMacaron = function (reward) {
        var sellingFrom = reward.sellingFrom;
        var validToDate = reward.validTo;
        var nowTime = (new Date()).getTime();
        if (reward.sellingFrom && sellingFrom.getTime() > nowTime) {
            return {
                label: 'Coming Soon',
                class: 'coming-soon',
                isButtonEnabled: false
            };
        }
        // some of the reward balance is negative value
        var ratio = null;
        if (reward.inventory &&
            reward.inventory.rewardTotalBalance !== undefined &&
            reward.inventory.rewardTotalBalance !== null &&
            reward.inventory.rewardTotalLimit !== undefined &&
            reward.inventory.rewardTotalLimit !== null &&
            reward.inventory.rewardTotalLimit !== 0) {
            ratio = reward.inventory.rewardTotalBalance / reward.inventory.rewardTotalLimit;
        }
        if (ratio !== null && ratio <= 0) {
            return {
                label: 'Fully redeemed',
                class: 'fully-redeemed',
                isButtonEnabled: false
            };
        }
        if (reward.validTo && validToDate.getTime() < nowTime) {
            return {
                label: 'Expired',
                class: 'expired',
                isButtonEnabled: true
            };
        }
        // Low inventory (<10%)
        if (ratio !== null && ratio <= 0.1) {
            return {
                label: 'Running Out',
                class: 'running-out',
                rewardBalance: reward.inventory.rewardTotalBalance,
                isButtonEnabled: true
            };
        }
        var thirtySixHours = 36 * 60 * 60 * 1000;
        if (reward.validTo && (validToDate.getTime() - nowTime) < thirtySixHours) {
            return {
                label: 'Expiring Soon',
                class: 'expiring',
                isButtonEnabled: true
            };
        }
        var seventyTwoHours = 72 * 60 * 60 * 1000;
        if (reward.sellingFrom && (nowTime - sellingFrom.getTime()) < seventyTwoHours) {
            return {
                label: 'Just Added',
                class: 'just-added',
                isButtonEnabled: true
            };
        }
        return null;
    };
    MacaronService = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"])({
            providedIn: 'root'
        })
    ], MacaronService);
    return MacaronService;
}());



/***/ }),

/***/ "./src/app/tnc/tnc.component.scss":
/*!****************************************!*\
  !*** ./src/app/tnc/tnc.component.scss ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-toolbar {\n  background: white;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n}\nmat-toolbar button {\n  margin: 0.5rem;\n}\nmat-toolbar .spacer {\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  text-align: center;\n}\nmat-toolbar .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvdG5jL3RuYy5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvdG9vbGJhci5zY3NzIiwic3JjL2FwcC90bmMvdG5jLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUNDRSxpQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO0VBQUEsNkJBQUE7VUFBQSxtQkFBQTtBQ0RGO0FER0U7RUFDRSxjQUFBO0FDREo7QURJRTtFQUNFLG1CQUFBO1VBQUEsWUFBQTtFQUNBLGtCQUFBO0FDRko7QURLRTtFRWZBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUxxQjtFQU1yQixjQU5xQjtFQU9yQixrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkFWcUI7RUFXckIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FEYUYiLCJmaWxlIjoic3JjL2FwcC90bmMvdG5jLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCBcIi4uL3Rvb2xiYXIuc2Nzc1wiO1xuXG5tYXQtdG9vbGJhciB7XG4gIEBpbmNsdWRlIHRvb2xiYXI7XG59XG4iLCJAaW1wb3J0IFwiLi4vaWNvbi5zY3NzXCI7XG5cbkBtaXhpbiB0b29sYmFyIHtcbiAgYmFja2dyb3VuZDogd2hpdGU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG5cbiAgYnV0dG9uIHtcbiAgICBtYXJnaW46IDAuNXJlbTtcbiAgfVxuXG4gIC5zcGFjZXIge1xuICAgIGZsZXgtZ3JvdzogMTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICAuaWNvbiB7XG4gICAgQGluY2x1ZGUgaWNvbjtcbiAgfVxufVxuIiwibWF0LXRvb2xiYXIge1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbn1cbm1hdC10b29sYmFyIGJ1dHRvbiB7XG4gIG1hcmdpbjogMC41cmVtO1xufVxubWF0LXRvb2xiYXIgLnNwYWNlciB7XG4gIGZsZXgtZ3JvdzogMTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxubWF0LXRvb2xiYXIgLmljb24ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogMy4ycmVtO1xuICBoZWlnaHQ6IDMuMnJlbTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiAjOGRiNWUzO1xuICBjb2xvcjogIzE4NjJiODtcbiAgbWluLXdpZHRoOiAzLjJyZW07XG4gIGJvcmRlcjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgei1pbmRleDogMTtcbn0iLCJAbWl4aW4gaWNvbigkZGlhbWV0ZXI6IDMuMnJlbSwgJGJhY2tncm91bmQ6ICM4ZGI1ZTMsICRjb2xvcjogIzE4NjJiOCkge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB3aWR0aDogJGRpYW1ldGVyO1xuICBoZWlnaHQ6ICRkaWFtZXRlcjtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBiYWNrZ3JvdW5kOiAkYmFja2dyb3VuZDtcbiAgY29sb3I6ICRjb2xvcjtcbiAgbWluLXdpZHRoOiAkZGlhbWV0ZXI7XG4gIGJvcmRlcjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgei1pbmRleDogMTtcbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/tnc/tnc.component.ts":
/*!**************************************!*\
  !*** ./src/app/tnc/tnc.component.ts ***!
  \**************************************/
/*! exports provided: TncComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TncComponent", function() { return TncComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");



var TncComponent = /** @class */ (function () {
    function TncComponent(location) {
        this.location = location;
    }
    TncComponent.prototype.back = function () {
        this.location.back();
    };
    TncComponent.ctorParameters = function () { return [
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"] }
    ]; };
    TncComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-tnc',
            template: __webpack_require__(/*! raw-loader!./tnc.component.html */ "../../node_modules/raw-loader/index.js!./src/app/tnc/tnc.component.html"),
            styles: [__webpack_require__(/*! ./tnc.component.scss */ "./src/app/tnc/tnc.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_common__WEBPACK_IMPORTED_MODULE_2__["Location"]])
    ], TncComponent);
    return TncComponent;
}());



/***/ }),

/***/ "./src/app/voucher/voucher.component.scss":
/*!************************************************!*\
  !*** ./src/app/voucher/voucher.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\n.banner {\n  width: 100%;\n  max-height: 20rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n  -webkit-transform: scale(1.01);\n          transform: scale(1.01);\n}\n\n.main {\n  overflow: auto;\n  height: 100%;\n  min-height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .contents {\n  -webkit-box-flex: 1;\n          flex: 1 1 auto;\n  overflow: scroll;\n}\n\n.app-header {\n  position: relative;\n}\n\n.app-header button {\n  position: absolute;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n  margin-left: 1rem;\n}\n\n.reward .badge {\n  max-width: 7rem;\n  height: 4.8rem;\n  background-color: #ffffff;\n  border-radius: 0.5rem;\n  position: absolute;\n  width: 100%;\n  margin-top: -2.5rem;\n  left: 50%;\n  -webkit-transform: translateX(-50%);\n  transform: translateX(-50%);\n  text-align: center;\n}\n\n.reward .badge img {\n  max-width: 3.5rem;\n  position: relative;\n  top: 50%;\n  -webkit-transform: translateY(-50%);\n          transform: translateY(-50%);\n}\n\n.reward-merchant {\n  margin-top: 4rem;\n  text-align: center;\n}\n\n.reward-merchant h1 {\n  color: #3a3a3a;\n}\n\n.reward-merchant h2 {\n  font-weight: normal;\n  color: #666666;\n}\n\n.reward-balance {\n  font-size: 1.6rem;\n  color: #666666;\n}\n\n.voucher .badge {\n  text-align: center;\n}\n\n.voucher .badge img {\n  max-width: 3.5rem;\n}\n\n.voucher .reward-merchant {\n  margin-top: 2rem;\n}\n\n.container {\n  padding: 0 3rem 2rem 3rem;\n  margin-bottom: 5rem;\n}\n\n.container h1 {\n  font-size: 1.6rem;\n  color: #3A3A3A;\n  font-weight: normal;\n  margin-bottom: 0;\n}\n\n.container p {\n  color: #666666;\n  line-height: 2rem;\n}\n\n.container .content {\n  margin: 3rem 0;\n}\n\n.container .content a.mat-button {\n  padding: 0;\n}\n\n.container .about a {\n  display: -webkit-inline-box;\n  display: inline-flex;\n  vertical-align: middle;\n  -webkit-box-align: center;\n          align-items: center;\n  color: #7E8494;\n  margin-bottom: 1.5rem;\n}\n\n.container .about a .icon {\n  margin-right: 0.5rem;\n}\n\n.button-area {\n  width: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  background-color: #ffffff;\n  min-height: 3.6rem;\n  padding: 1rem 0;\n}\n\n.button-area button.full-width {\n  width: 70%;\n  color: #ffffff;\n}\n\n.icon {\n  position: fixed;\n  top: 2rem;\n  left: 2rem;\n}\n\n.main {\n  display: -webkit-box;\n  display: flex;\n  height: 100%;\n  width: 100%;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.main .voucher-container {\n  height: 100%;\n  -webkit-box-flex: 1;\n          flex: 1;\n  overflow-y: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvdm91Y2hlci92b3VjaGVyLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiLCJzcmMvYXBwL3ZvdWNoZXIvdm91Y2hlci5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3N0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VDREUsb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBTHFCO0VBTXJCLGNBTnFCO0VBT3JCLGtCQUFBO0VBQ0EsbUJBUjBDO0VBUzFDLGNBVDJEO0VBVTNELGlCQVZxQjtFQVdyQixTQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7QUNDRjs7QUZSQTtFQUNFLFdBQUE7RUFDQSxpQkFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0FFV0Y7O0FGUkE7RUFDRSxjQUFBO0VBQ0EsWUFBQTtFQUNBLGdCQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FFV0Y7O0FGVEU7RUFDRSxtQkFBQTtVQUFBLGNBQUE7RUFDQSxnQkFBQTtBRVdKOztBRlBBO0VBQ0Usa0JBQUE7QUVVRjs7QUZSRTtFQUNFLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7RUFDQSxpQkFBQTtBRVVKOztBRkxFO0VBQ0UsZUFBQTtFQUNBLGNBQUE7RUFDQSx5QkFBQTtFQUNBLHFCQUFBO0VBQ0Esa0JBQUE7RUFDQSxXQUFBO0VBQ0EsbUJBQUE7RUFDQSxTQUFBO0VBQ0EsbUNBQUE7RUFDQSwyQkFBQTtFQUNBLGtCQUFBO0FFUUo7O0FGTkk7RUFDRSxpQkFBQTtFQUNBLGtCQUFBO0VBQ0EsUUFBQTtFQUNBLG1DQUFBO1VBQUEsMkJBQUE7QUVRTjs7QUZIQTtFQUNFLGdCQUFBO0VBQ0Esa0JBQUE7QUVNRjs7QUZKRTtFQUNFLGNBQUE7QUVNSjs7QUZIRTtFQUNFLG1CQUFBO0VBQ0EsY0FBQTtBRUtKOztBRkRBO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0FFSUY7O0FGQUU7RUFDRSxrQkFBQTtBRUdKOztBRkRJO0VBQ0UsaUJBQUE7QUVHTjs7QUZDRTtFQUNFLGdCQUFBO0FFQ0o7O0FGR0E7RUFDRSx5QkFBQTtFQUNBLG1CQUFBO0FFQUY7O0FGRUU7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLGdCQUFBO0FFQUo7O0FGR0U7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7QUVESjs7QUZJRTtFQUNFLGNBQUE7QUVGSjs7QUZJSTtFQUNFLFVBQUE7QUVGTjs7QUZPSTtFQUNFLDJCQUFBO0VBQUEsb0JBQUE7RUFDQSxzQkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxjQUFBO0VBQ0EscUJBQUE7QUVMTjs7QUZPTTtFQUNFLG9CQUFBO0FFTFI7O0FGV0E7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLHlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FFUkY7O0FGVUU7RUFDRSxVQUFBO0VBQ0EsY0FBQTtBRVJKOztBQ3BJQTtFQUNFLGVBQUE7RUFDQSxTQUFBO0VBQ0EsVUFBQTtBRHVJRjs7QUNwSUE7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSxZQUFBO0VBQ0EsV0FBQTtFQUNBLDRCQUFBO0VBQUEsNkJBQUE7VUFBQSxzQkFBQTtBRHVJRjs7QUNySUU7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7VUFBQSxPQUFBO0VBQ0Esa0JBQUE7QUR1SUoiLCJmaWxlIjoic3JjL2FwcC92b3VjaGVyL3ZvdWNoZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0IFwiLi9pY29uLnNjc3NcIjtcblxuLmljb24ge1xuICBAaW5jbHVkZSBpY29uO1xufVxuXG4uYmFubmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDIwcmVtO1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcbn1cblxuLm1haW4ge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIC5jb250ZW50cyB7XG4gICAgZmxleDogMSAxIGF1dG87XG4gICAgb3ZlcmZsb3c6IHNjcm9sbDtcbiAgfVxufVxuXG4uYXBwLWhlYWRlciB7XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICBidXR0b24ge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB0b3A6IDUwJTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIH1cbn1cblxuLnJld2FyZCB7XG4gIC5iYWRnZSB7XG4gICAgbWF4LXdpZHRoOiA3cmVtO1xuICAgIGhlaWdodDogNC44cmVtO1xuICAgIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gICAgYm9yZGVyLXJhZGl1czogMC41cmVtO1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB3aWR0aDogMTAwJTtcbiAgICBtYXJnaW4tdG9wOiAtMi41cmVtO1xuICAgIGxlZnQ6IDUwJTtcbiAgICAtd2Via2l0LXRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogMy41cmVtO1xuICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgdG9wOiA1MCU7XG4gICAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTUwJSk7XG4gICAgfVxuICB9XG59XG5cbi5yZXdhcmQtbWVyY2hhbnQge1xuICBtYXJnaW4tdG9wOiA0cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG5cbiAgaDEge1xuICAgIGNvbG9yOiAjM2EzYTNhO1xuICB9XG5cbiAgaDIge1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gIH1cbn1cblxuLnJld2FyZC1iYWxhbmNlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4udm91Y2hlciB7XG4gIC5iYWRnZSB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuXG4gICAgaW1nIHtcbiAgICAgIG1heC13aWR0aDogMy41cmVtO1xuICAgIH1cbiAgfVxuXG4gIC5yZXdhcmQtbWVyY2hhbnQge1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG4gIH1cbn1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgM3JlbSAycmVtIDNyZW07XG4gIG1hcmdpbi1ib3R0b206IDVyZW07XG5cbiAgaDEge1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgIGNvbG9yOiAjM0EzQTNBO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgfVxuXG4gIHAge1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIGxpbmUtaGVpZ2h0OiAycmVtO1xuICB9XG5cbiAgLmNvbnRlbnQge1xuICAgIG1hcmdpbjogM3JlbSAwO1xuXG4gICAgYS5tYXQtYnV0dG9uIHtcbiAgICAgIHBhZGRpbmc6IDA7XG4gICAgfVxuICB9XG5cbiAgLmFib3V0IHtcbiAgICBhIHtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICAgICAgdmVydGljYWwtYWxpZ246IG1pZGRsZTtcbiAgICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAgICBjb2xvcjogIzdFODQ5NDtcbiAgICAgIG1hcmdpbi1ib3R0b206IDEuNXJlbTtcblxuICAgICAgLmljb24ge1xuICAgICAgICBtYXJnaW4tcmlnaHQ6IDAuNXJlbTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLmJ1dHRvbi1hcmVhIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBtaW4taGVpZ2h0OiAzLjZyZW07XG4gIHBhZGRpbmc6IDFyZW0gMDtcblxuICBidXR0b24uZnVsbC13aWR0aCB7XG4gICAgd2lkdGg6IDcwJTtcbiAgICBjb2xvcjogI2ZmZmZmZjtcbiAgfVxufVxuIiwiQG1peGluIGljb24oJGRpYW1ldGVyOiAzLjJyZW0sICRiYWNrZ3JvdW5kOiAjOGRiNWUzLCAkY29sb3I6ICMxODYyYjgpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6ICRkaWFtZXRlcjtcbiAgaGVpZ2h0OiAkZGlhbWV0ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkY29sb3I7XG4gIG1pbi13aWR0aDogJGRpYW1ldGVyO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4iLCIuaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICM4ZGI1ZTM7XG4gIGNvbG9yOiAjMTg2MmI4O1xuICBtaW4td2lkdGg6IDMuMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4uYmFubmVyIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDIwcmVtO1xuICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgdHJhbnNmb3JtOiBzY2FsZSgxLjAxKTtcbn1cblxuLm1haW4ge1xuICBvdmVyZmxvdzogYXV0bztcbiAgaGVpZ2h0OiAxMDAlO1xuICBtaW4taGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuLm1haW4gLmNvbnRlbnRzIHtcbiAgZmxleDogMSAxIGF1dG87XG4gIG92ZXJmbG93OiBzY3JvbGw7XG59XG5cbi5hcHAtaGVhZGVyIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmFwcC1oZWFkZXIgYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDUwJTtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC01MCUpO1xuICBtYXJnaW4tbGVmdDogMXJlbTtcbn1cblxuLnJld2FyZCAuYmFkZ2Uge1xuICBtYXgtd2lkdGg6IDdyZW07XG4gIGhlaWdodDogNC44cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjZmZmZmZmO1xuICBib3JkZXItcmFkaXVzOiAwLjVyZW07XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IC0yLjVyZW07XG4gIGxlZnQ6IDUwJTtcbiAgLXdlYmtpdC10cmFuc2Zvcm06IHRyYW5zbGF0ZVgoLTUwJSk7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWCgtNTAlKTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuLnJld2FyZCAuYmFkZ2UgaW1nIHtcbiAgbWF4LXdpZHRoOiAzLjVyZW07XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgdG9wOiA1MCU7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtNTAlKTtcbn1cblxuLnJld2FyZC1tZXJjaGFudCB7XG4gIG1hcmdpbi10b3A6IDRyZW07XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5yZXdhcmQtbWVyY2hhbnQgaDEge1xuICBjb2xvcjogIzNhM2EzYTtcbn1cbi5yZXdhcmQtbWVyY2hhbnQgaDIge1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cblxuLnJld2FyZC1iYWxhbmNlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4udm91Y2hlciAuYmFkZ2Uge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4udm91Y2hlciAuYmFkZ2UgaW1nIHtcbiAgbWF4LXdpZHRoOiAzLjVyZW07XG59XG4udm91Y2hlciAucmV3YXJkLW1lcmNoYW50IHtcbiAgbWFyZ2luLXRvcDogMnJlbTtcbn1cblxuLmNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgM3JlbSAycmVtIDNyZW07XG4gIG1hcmdpbi1ib3R0b206IDVyZW07XG59XG4uY29udGFpbmVyIGgxIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGNvbG9yOiAjM0EzQTNBO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuLmNvbnRhaW5lciBwIHtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGxpbmUtaGVpZ2h0OiAycmVtO1xufVxuLmNvbnRhaW5lciAuY29udGVudCB7XG4gIG1hcmdpbjogM3JlbSAwO1xufVxuLmNvbnRhaW5lciAuY29udGVudCBhLm1hdC1idXR0b24ge1xuICBwYWRkaW5nOiAwO1xufVxuLmNvbnRhaW5lciAuYWJvdXQgYSB7XG4gIGRpc3BsYXk6IGlubGluZS1mbGV4O1xuICB2ZXJ0aWNhbC1hbGlnbjogbWlkZGxlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2xvcjogIzdFODQ5NDtcbiAgbWFyZ2luLWJvdHRvbTogMS41cmVtO1xufVxuLmNvbnRhaW5lciAuYWJvdXQgYSAuaWNvbiB7XG4gIG1hcmdpbi1yaWdodDogMC41cmVtO1xufVxuXG4uYnV0dG9uLWFyZWEge1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmZmZmY7XG4gIG1pbi1oZWlnaHQ6IDMuNnJlbTtcbiAgcGFkZGluZzogMXJlbSAwO1xufVxuLmJ1dHRvbi1hcmVhIGJ1dHRvbi5mdWxsLXdpZHRoIHtcbiAgd2lkdGg6IDcwJTtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG5cbi5pY29uIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB0b3A6IDJyZW07XG4gIGxlZnQ6IDJyZW07XG59XG5cbi5tYWluIHtcbiAgZGlzcGxheTogZmxleDtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cbi5tYWluIC52b3VjaGVyLWNvbnRhaW5lciB7XG4gIGhlaWdodDogMTAwJTtcbiAgZmxleDogMTtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufSIsIkBpbXBvcnQgJy4uL3Jld2FyZC5zY3NzJztcblxuLmljb24ge1xuICBwb3NpdGlvbjogZml4ZWQ7XG4gIHRvcDogMnJlbTtcbiAgbGVmdDogMnJlbTtcbn1cblxuLm1haW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gIC52b3VjaGVyLWNvbnRhaW5lciB7XG4gICAgaGVpZ2h0OiAxMDAlO1xuICAgIGZsZXg6IDE7XG4gICAgb3ZlcmZsb3cteTogc2Nyb2xsO1xuICB9XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/voucher/voucher.component.ts":
/*!**********************************************!*\
  !*** ./src/app/voucher/voucher.component.ts ***!
  \**********************************************/
/*! exports provided: VoucherComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoucherComponent", function() { return VoucherComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _services_macaron_service__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ../services/macaron.service */ "./src/app/services/macaron.service.ts");







var VoucherComponent = /** @class */ (function () {
    function VoucherComponent(vouchersService, activeRoute, macaronService, location) {
        this.vouchersService = vouchersService;
        this.activeRoute = activeRoute;
        this.macaronService = macaronService;
        this.location = location;
        this.isButtonEnabled = true;
    }
    VoucherComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.voucher$ = this.activeRoute.queryParams
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["filter"])(function (params) { return params.id ? true : false; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (params) { return params.id; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["switchMap"])(function (id) { return _this.vouchersService.get(id); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["tap"])(function (voucher) {
            var macaron = _this.macaronService.getMacaron(voucher.reward);
            if (macaron === null) {
                _this.isButtonEnabled = true;
            }
            else {
                _this.isButtonEnabled = macaron.isButtonEnabled;
            }
        }));
    };
    VoucherComponent.prototype.setButton = function (isEnable) {
        this.isButtonEnabled = isEnable;
    };
    VoucherComponent.prototype.back = function () {
        this.location.back();
    };
    VoucherComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"] },
        { type: _services_macaron_service__WEBPACK_IMPORTED_MODULE_6__["MacaronService"] },
        { type: _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"] }
    ]; };
    VoucherComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-voucher',
            template: __webpack_require__(/*! raw-loader!./voucher.component.html */ "../../node_modules/raw-loader/index.js!./src/app/voucher/voucher.component.html"),
            styles: [__webpack_require__(/*! ./voucher.component.scss */ "./src/app/voucher/voucher.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _services_macaron_service__WEBPACK_IMPORTED_MODULE_6__["MacaronService"],
            _angular_common__WEBPACK_IMPORTED_MODULE_4__["Location"]])
    ], VoucherComponent);
    return VoucherComponent;
}());



/***/ }),

/***/ "./src/environments/environment.ts":
/*!*****************************************!*\
  !*** ./src/environments/environment.ts ***!
  \*****************************************/
/*! exports provided: environment */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "environment", function() { return environment; });
var environment = {
    apiHost: 'https://api.perxtech.io',
    production: false,
    preAuth: false,
    isWhistler: false,
    baseHref: '/'
};


/***/ }),

/***/ "./src/main.ts":
/*!*********************!*\
  !*** ./src/main.ts ***!
  \*********************/
/*! no exports provided */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/platform-browser-dynamic */ "../../node_modules/@angular/platform-browser-dynamic/fesm5/platform-browser-dynamic.js");
/* harmony import */ var _app_app_module__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app/app.module */ "./src/app/app.module.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./environments/environment */ "./src/environments/environment.ts");




if (_environments_environment__WEBPACK_IMPORTED_MODULE_3__["environment"].production) {
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_0__["enableProdMode"])();
}
Object(_angular_platform_browser_dynamic__WEBPACK_IMPORTED_MODULE_1__["platformBrowserDynamic"])().bootstrapModule(_app_app_module__WEBPACK_IMPORTED_MODULE_2__["AppModule"])
    .catch(function (err) { return console.error(err); });


/***/ }),

/***/ 0:
/*!***************************!*\
  !*** multi ./src/main.ts ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! /home/andy/WebstormProjects/my-perx/apps/feature-demo/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main.js.map