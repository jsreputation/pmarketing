(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["main"],{

/***/ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js":
/*!*******************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/libs/perx-core/dist/perx-core/fesm5/perx-core.js ***!
  \*******************************************************************************************************/
/*! exports provided: AuthenticationModule, AuthenticationService, CampaignModule, CampaignState, CampaignType, Config, ConfigModule, FeedReaderService, GameModule, GameType, GeneralStaticDataService, GeoLocationService, ICampaignService, IGameService, IVoucherService, LocationModule, LocationsService, LoyaltyModule, LoyaltyService, LoyaltySummaryComponent, NotificationService, PerxCoreModule, PinInputComponent, PinRedemptionComponent, PinService, PopupComponent, ProfileModule, ProfileService, PuzzleCollectStampState, PuzzlesModule, RedemptionType, RewardsModule, RewardsService, StampCardState, StampModule, StampService, StampState, SurveyModule, SurveyService, TokenStorage, UtilsModule, VoucherComponent, VoucherState, VouchersComponent, VouchersModule, defaultTree, sortByDistance, ɵa, ɵb, ɵba, ɵbb, ɵbc, ɵbd, ɵbe, ɵbf, ɵbg, ɵbh, ɵbi, ɵbj, ɵbk, ɵbl, ɵbm, ɵbn, ɵbo, ɵbp, ɵbq, ɵbr, ɵbs, ɵbt, ɵbu, ɵbv, ɵc, ɵd, ɵe, ɵf, ɵg, ɵh, ɵi, ɵj, ɵk, ɵl, ɵm, ɵn, ɵo, ɵp, ɵq, ɵr, ɵs, ɵt, ɵu, ɵv, ɵw, ɵx, ɵy, ɵz */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationModule", function() { return AuthenticationModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AuthenticationService", function() { return AuthenticationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignModule", function() { return CampaignModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignState", function() { return CampaignState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignType", function() { return CampaignType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "Config", function() { return Config; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ConfigModule", function() { return ConfigModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "FeedReaderService", function() { return FeedReaderService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameModule", function() { return GameModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GameType", function() { return GameType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeneralStaticDataService", function() { return GeneralStaticDataService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "GeoLocationService", function() { return GeoLocationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ICampaignService", function() { return ICampaignService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IGameService", function() { return IGameService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "IVoucherService", function() { return IVoucherService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationModule", function() { return LocationModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LocationsService", function() { return LocationsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyModule", function() { return LoyaltyModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltyService", function() { return LoyaltyService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoyaltySummaryComponent", function() { return LoyaltySummaryComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NotificationService", function() { return NotificationService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PerxCoreModule", function() { return PerxCoreModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PinInputComponent", function() { return PinInputComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PinRedemptionComponent", function() { return PinRedemptionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PinService", function() { return PinService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupComponent", function() { return PopupComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileModule", function() { return ProfileModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ProfileService", function() { return ProfileService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzleCollectStampState", function() { return PuzzleCollectStampState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PuzzlesModule", function() { return PuzzlesModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedemptionType", function() { return RedemptionType; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsModule", function() { return RewardsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsService", function() { return RewardsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampCardState", function() { return StampCardState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampModule", function() { return StampModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampService", function() { return StampService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampState", function() { return StampState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyModule", function() { return SurveyModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyService", function() { return SurveyService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TokenStorage", function() { return TokenStorage; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "UtilsModule", function() { return UtilsModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoucherComponent", function() { return VoucherComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoucherState", function() { return VoucherState; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VouchersComponent", function() { return VouchersComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VouchersModule", function() { return VouchersModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "defaultTree", function() { return defaultTree; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "sortByDistance", function() { return sortByDistance; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵa", function() { return vouchersServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵb", function() { return AuthServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵba", function() { return V4GameService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbb", function() { return V4ProfileService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbc", function() { return UserProfileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbd", function() { return MicroProfileComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbe", function() { return TransactionPipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbf", function() { return LoyaltyTransactionsListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbg", function() { return V4LoyaltyService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbh", function() { return RewardsCollectionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbi", function() { return RewardsListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbj", function() { return RewardComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbk", function() { return LocationsListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbl", function() { return LocationsMapComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbm", function() { return V4LocationsService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbn", function() { return SurveyComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbo", function() { return QuestionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbp", function() { return RatingComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbq", function() { return PictureSelectComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbr", function() { return LongTextComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbs", function() { return SelectComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbt", function() { return GroupComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbu", function() { return DateComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵbv", function() { return PhoneComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵc", function() { return campaignServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵd", function() { return stampServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵe", function() { return gameServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵf", function() { return profileServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵg", function() { return loyaltyServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵh", function() { return rewardsServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵi", function() { return RewardsListTabbedComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵj", function() { return locationsServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵk", function() { return surveyServiceFactory; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵl", function() { return BcodeRedemptionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵm", function() { return QrcodeRedemptionComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵn", function() { return MaterialModule; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵo", function() { return NumericCharacterDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵp", function() { return DebounceClickDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵq", function() { return RepeatTimesDirective; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵr", function() { return DistancePipe; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵs", function() { return PuzzleListComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵt", function() { return PuzzlePlayComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵu", function() { return PuzzleStampComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵv", function() { return PuzzleCollectStampsComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵw", function() { return StampComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵx", function() { return V4StampService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵy", function() { return ShakeTreeComponent; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ɵz", function() { return PinataComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var angularx_qrcode__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! angularx-qrcode */ "../../libs/perx-core/node_modules/angularx-qrcode/dist/index.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var ts_optchain__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ts-optchain */ "../../node_modules/ts-optchain/dist/proxy/index.js");
/* harmony import */ var ts_optchain__WEBPACK_IMPORTED_MODULE_9___default = /*#__PURE__*/__webpack_require__.n(ts_optchain__WEBPACK_IMPORTED_MODULE_9__);
/* harmony import */ var ngx_auth__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ngx-auth */ "../../node_modules/ngx-auth/esm5/ngx-auth.js");
/* harmony import */ var ngx_multi_line_ellipsis__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ngx-multi-line-ellipsis */ "../../node_modules/ngx-multi-line-ellipsis/index.js");













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
/** @enum {string} */
var RedemptionType = {
    pin: 'pin',
    txtCode: 'txtCode',
    qr: 'qrcode',
    none: 'none',
    offline: 'offline',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VouchersComponent = /** @class */ (function () {
    function VouchersComponent(vouchersService) {
        this.vouchersService = vouchersService;
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
        if (this.showRedeemedIcon && !this.mapping) {
            console.error("Error: 'mapping' is not defined");
        }
        if (!this.vouchers$) {
            this.vouchers$ = this.vouchersService.getAll();
        }
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
        return vouchers ? vouchers.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
                    template: "<div *ngIf=\"(vouchers$ | async); then thenBlock else elseBlock\"></div>\n<ng-template #thenBlock>\n  <div class=\"card-list-container\">\n    <ng-container *ngFor=\"let voucher of vouchers$ | async\">\n      <mat-card *ngIf=\"filter === undefined || filter.includes(voucher.state)\" mat-ripple\n        [matRippleDisabled]=\"notClickable(voucher)\" (click)=\"onClick(voucher)\">\n        <div [ngClass]=\"'voucher-content ' + imageSize\">\n          <div class=\"voucher-img__wrapper\">\n            <img class=\"voucher-thumbnail\" src=\"{{voucher.thumbnailImg}}\">\n          </div>\n          <div class=\"voucher-details\">\n            <h1 *ngIf=\"showTitle\">\n              {{voucher.name}}\n            </h1>\n            <p *ngIf=\"showMerchant\">\n              {{voucher.merchantName}}\n            </p>\n            <p *ngIf=\"showExpireDate && voucher.expiry\">\n              Expiry: {{voucher.expiry | date: 'dd/MM/yyyy'}}\n            </p>\n            <p *ngIf=\"showRedeemedDate && voucher.redemptionDate\">\n              Redeemed on {{voucher.redemptionDate | date: 'dd/MM/yyyy'}}\n            </p>\n            <div [ngClass]=\"'ribbon ' + voucher.state\" *ngIf=\"showRedeemedIcon && mapping && mapping[voucher.state]\" >{{mapping[voucher.state]}}</div>\n          </div>\n        </div>\n        <mat-icon *ngIf=\"iconDisplay && voucher.state !== 'redeemed'\">\n          {{iconDisplay}}\n        </mat-icon>\n      </mat-card>\n    </ng-container>\n  </div>\n</ng-template>\n<ng-template #elseBlock>\n  <div class=\"card-list-container loading\">\n    <mat-card *perxCoreRepeatTimes=\"repeatGhostCount\">\n      <div [ngClass]=\"'voucher-content ' + imageSize\">\n        <div class=\"voucher-img__wrapper\">\n          <div class=\"img-placeholder ghost\"></div>\n        </div>\n        <div class=\"voucher-details\">\n          <h1 class=\"voucher-name ghost\"></h1>\n          <div class=\"voucher-merchantName ghost\"></div>\n          <div class=\"voucher-date-details ghost\"></div>\n        </div>\n      </div>\n    </mat-card>\n  </div>\n</ng-template>\n",
                    styles: ["mat-card{margin:1.2rem 0;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;padding:0;-webkit-flex:0 0 10.5rem;flex:0 0 10.5rem;height:10.5rem;-webkit-justify-content:space-between;justify-content:space-between}mat-icon{color:#b2b2b2;font-size:3.6rem;height:3.6rem;-webkit-flex:0 0 3.6rem;flex:0 0 3.6rem}.voucher-content{display:-webkit-flex;display:flex;-webkit-flex-basis:auto;flex-basis:auto;-webkit-flex-grow:1;flex-grow:1;-webkit-justify-content:flex-start;justify-content:flex-start}.voucher-img__wrapper{height:10.5rem;width:10.5rem}.voucher-thumbnail{width:100%;height:100%;object-fit:cover}.voucher-details{padding:0 1.6rem;font-size:1.4rem;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;margin:auto 0;-webkit-flex:1;flex:1}.voucher-details h1{font-size:1.4rem;color:#37474f;line-height:1.6rem;font-weight:500;margin:4px 0;padding:0}.voucher-details p{font-size:1.1rem;line-height:1.3rem;color:#858585;margin:4px 0;padding:0}.voucher-details:nth-child(1){margin-top:0}.small .voucher-img,.small .voucher-thumbnail{max-height:6rem;max-width:6rem}.small .voucher-details{padding-left:0}.voucher-expiry{color:#858585}.ribbon{position:absolute;font-size:1rem;font-style:normal;font-weight:400;width:5.7rem;bottom:1.2rem;right:1.6rem;text-align:center;line-height:1.6rem;letter-spacing:.02rem}.ribbon.redeemed{background:#bbe5b3;color:#173630}.ribbon.expired{background:#919eab;color:#212121}.ribbon.issued{background:#bbe5b3;color:#173630}.ribbon.reserved{background:#ffc58b;color:#4a1504}.ribbon.released{background:#fead9a;color:#330101}.card-list-container.loading,.card-list-container.loading .ghost{overflow:hidden}.card-list-container.loading .voucher-content .voucher-img__wrapper .img-placeholder{height:100%;width:100%}.card-list-container.loading .voucher-content .voucher-details .voucher-merchantName,.card-list-container.loading .voucher-content .voucher-details .voucher-name{height:1.6rem;margin:.4rem 0}.card-list-container.loading .voucher-content .voucher-details .voucher-date-details{height:1.6rem}"]
                }] }
    ];
    /** @nocollapse */
    VouchersComponent.ctorParameters = function () { return [
        { type: IVoucherService }
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
        route: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        vouchers$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['data',] }],
        filter: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        mapping: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return VouchersComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var VoucherComponent = /** @class */ (function () {
    function VoucherComponent(vouchersService) {
        this.vouchersService = vouchersService;
        this.redeem = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.hideMerchantImg = false;
        this.hideMerchantName = false;
        this.hideExpiry = false;
        this.hideActions = false;
        this.showRedeemedIcon = false;
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
        if (!this.redeemLabelFn) {
            this.redeemLabelFn = (/**
             * @return {?}
             */
            function () { return 'REDEEM NOW'; });
        }
    };
    VoucherComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-voucher',
                    template: "<ng-container *ngIf=\"voucher$ | async as voucher\">\n  <div class=\"voucher-container\">\n    <div class=\"reward-image-container\" *ngIf=\"voucher.rewardBanner\">\n      <img class=\"reward-image\" src=\"{{voucher.rewardBanner}}\">\n    </div>\n    <div class=\"merchant-image-container\" *ngIf=\"!hideMerchantImg && voucher.merchantImg\">\n      <img class=\"merchant-image\" src=\"{{voucher.merchantImg}}\">\n    </div>\n    <div class=\"details\">\n      <div class=\"reward-name\">\n        {{voucher.name}}\n      </div>\n      <div class=\"merchant-name\" *ngIf=\"!hideMerchantName\">\n        {{voucher.merchantName}}\n      </div>\n      <div class=\"voucher-expiry\" *ngIf=\"!hideExpiry && voucher.expiry!==null\">\n        {{voucher.expiry | date: 'dd/MM/yyyy'}}\n      </div>\n      <div [ngClass]=\"'ribbon ' + voucher.state\" *ngIf=\"mapping && showRedeemedIcon && mapping[voucher.state]\" >{{mapping[voucher.state]}}</div>\n      <div *ngFor=\"let description of voucher.description\">\n          <div class=\"section-heading\">\n              {{description.title}}\n            </div>\n            <div class=\"section-content\">\n              <div [innerHtml]=\"description.content\"></div>\n            </div>\n      </div>\n      <!-- <div class=\"section-heading\" *ngIf=\"voucher.description\">\n        Description\n      </div>\n      <div class=\"section-content\" *ngIf=\"voucher.description\">\n        <div [innerHtml]=\"voucher.description\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"voucher.termsAndConditions\">\n        Terms and Conditions\n      </div>\n      <div class=\"section-content\" *ngIf=\"voucher.termsAndConditions\">\n        <div [innerHtml]=\"voucher.termsAndConditions\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"voucher.howToRedeem\">\n        How to redeem\n      </div>\n      <div class=\"section-content\" *ngIf=\"voucher.howToRedeem\">\n        <div [innerHtml]=\"voucher.howToRedeem\"></div>\n      </div> -->\n    </div>\n  </div>\n  <div class=\"actions-container\" *ngIf=\"!hideActions\">\n    <button mat-raised-button color=\"primary\" class=\"redeem-btn\" (click)=\"onClick()\">\n      {{ redeemLabelFn() }}\n    </button>\n  </div>\n</ng-container>\n",
                    styles: [":host{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}.voucher-container{margin:0 auto;background:#fff;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;height:100%;max-width:60rem;-webkit-flex-grow:1;flex-grow:1}.reward-image-container{position:relative;padding-top:53.33%}.reward-image{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover}.merchant-image-container{position:relative;padding-top:26.67%;margin-top:-13.33%}.merchant-image{border-radius:50%;border:.2rem solid #fff;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);position:absolute;left:37.5%;top:0;width:25%}.details{padding:0 1.2rem}.reward-name{margin-top:1.5rem;font-size:1.8rem;text-align:center}.merchant-name{margin-top:1.5rem;font-size:1.8rem;text-align:center;color:#858585}.voucher-expiry{margin-top:1rem;font-size:1.6rem;text-align:center;color:#858585}.section-heading{margin-top:3rem;font-size:1.4rem;font-weight:700}.section-content{font-size:1.4rem}.actions-container{background-color:#fff;width:100%;padding:2rem 0 8.5rem}.actions-container button{color:#fff;width:100%}.ribbon{font-size:1rem;font-style:normal;font-weight:400;width:5.7rem;text-align:center;line-height:1.6rem;letter-spacing:.02rem;margin:1rem auto}.ribbon.redeemed{background:#bbe5b3;color:#173630}.ribbon.expired{background:#919eab;color:#212121}.ribbon.issued{background:#bbe5b3;color:#173630}.ribbon.reserved{background:#ffc58b;color:#4a1504}.ribbon.released{background:#fead9a;color:#330101}"]
                }] }
    ];
    /** @nocollapse */
    VoucherComponent.ctorParameters = function () { return [
        { type: IVoucherService }
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
        redeemLabelFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return VoucherComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var modules = [
    _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRippleModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatGridListModule"],
    _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatTabsModule"]
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
var BcodeRedemptionComponent = /** @class */ (function () {
    function BcodeRedemptionComponent(vouchersService) {
        this.vouchersService = vouchersService;
        this.voucherId = null;
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
        if (changes.voucherId) {
            this.voucher$ = this.vouchersService.get(this.voucherId);
        }
    };
    BcodeRedemptionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-bcode-redemption',
                    template: "<div class=\"reward-container\" *ngIf=\"voucher$ | async as voucher\">\n  <div class=\"reward-detail-container\">\n    <div class=\"reward-image-container\">\n      <img class=\"reward-image\" src=\"{{voucher.rewardBanner}}\">\n    </div>\n    <h1>{{voucher.name}}</h1>\n    <pre class=\"bcode\">{{voucher.code}}</pre>\n    <p class=\"instruction\">Present this code to the cashier to redeem your reward.</p>\n  </div>\n  <p class=\"tnc\">Terms & Conditions applies.</p>\n</div>",
                    styles: [":host{font-family:Roboto,sans-serif;font-style:normal}.reward-container{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-between;justify-content:space-between;text-align:center;height:calc(100vh - 140px)}@media screen and (orientation:landscape){.reward-container{height:calc(100% - 140px);padding-bottom:80px}}h1{display:-webkit-flex;display:flex;-webkit-align-self:center;align-self:center;font-weight:700;font-size:2.4rem;text-align:center}.bcode{display:-webkit-flex;display:flex;-webkit-align-self:center;align-self:center;background:#fff;border:1px solid #ccc;box-sizing:border-box;border-radius:2px;text-align:center;margin:16px;font-size:1.6rem;min-height:4.5rem;-webkit-justify-content:center;justify-content:center;padding:1.5rem}.instruction{display:-webkit-flex;display:flex;-webkit-align-self:center;align-self:center;font-weight:400;font-size:1.4rem;text-align:center;color:#8f8f8f;margin-top:32px}.tnc{display:-webkit-flex;display:flex;-webkit-align-self:center;align-self:center;font-weight:400;font-size:1rem;text-align:center;color:#8f8f8f;margin-top:24px}.reward-detail-container{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}.reward-image-container{margin-bottom:1.8rem;max-height:32rem}.reward-image{width:100%;max-height:32rem;object-fit:cover}"]
                }] }
    ];
    /** @nocollapse */
    BcodeRedemptionComponent.ctorParameters = function () { return [
        { type: IVoucherService }
    ]; };
    BcodeRedemptionComponent.propDecorators = {
        voucherId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        voucher$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['voucher',] }]
    };
    return BcodeRedemptionComponent;
}());

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
        return this.vouchersService.get(voucherId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} voucher
         * @return {?}
         */
        function (voucher) {
            /** @type {?} */
            var rewardId = '0000';
            if (voucher) {
                // tslint:disable-next-line: radix
                rewardId = voucher.rewardId.toString();
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
            var ctrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            _this.hasErrorEmit.emit(err.status);
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('Redeem failed');
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
            function (p, v) {
                return v.value === null ? p : "" + p + v.value;
            }), '');
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
                    styles: [".activation-code{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}.activation-code__inputs{display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;-webkit-flex-direction:row;flex-direction:row}input{width:63px;height:114px;border:2px solid rgba(0,0,0,.2);border-radius:4px;box-sizing:border-box;margin:8px;font-family:Roboto,sans-serif;font-style:normal;font-weight:400;font-size:80px;line-height:96px;text-align:center}input:focus{outline-color:#106cc8}.error input{border-color:#eb202f}.error input:focus{outline-color:#eb202f}.error-label{color:#eb202f;display:none;text-align:center;font-size:1.4rem;line-height:1.7rem;margin-top:2rem}.error .error-label{display:block}input.correct{background:#eef9e4}input.wrong{background:#fff3f9}"]
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
                    template: "<div class=\"main-container\" *ngIf=\"voucher$ | async as voucher\">\n <qrcode [qrdata]=\"voucher.code\" [size]=\"150\" [level]=\"'M'\"></qrcode>\n <div class=\"title\">Present this QR code to the cashier to complete your redemption</div>\n <div class=\"voucher-name\">{{voucher.name}}</div>\n</div>\n",
                    styles: [".main-container{width:100%;height:100%;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;-webkit-flex-direction:column;flex-direction:column;-webkit-align-items:center;align-items:center}.title{text-align:center;font-size:1.8rem;line-height:2.2rem;color:#212b36;margin-top:1rem}.voucher-name{font-size:1.2rem;line-height:1.4rem;color:#6b6b6b;margin-top:1rem}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        this.dialogRef.close();
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
                    styles: ["button{margin-top:16px;width:100%;text-transform:uppercase}h1{text-align:center;font-size:2.4rem;line-height:2.8rem;margin:0 auto 2rem}@media (max-width:424px){h1{width:20.8rem}}.img-wrapper{display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;margin:2.5rem}.img-wrapper img{display:block;margin:0 auto 2rem;max-width:100%;max-height:30rem;height:auto;width:auto}mat-dialog-content{text-align:center;font-size:1.6rem;line-height:1.8rem}.button-group{display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;margin-top:2.7rem}.button-group button{margin:0 .5rem}"]
                }] }
    ];
    /** @nocollapse */
    PopupComponent.ctorParameters = function () { return [
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogRef"] },
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_5__["MAT_DIALOG_DATA"],] }] }
    ]; };
    PopupComponent.propDecorators = {
        onKeyUp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"], args: ['window:keyup.esc',] }]
    };
    return PopupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var NotificationService = /** @class */ (function () {
    function NotificationService() {
        this.$popupSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
        this.$snackSubject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
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
        // debugger;
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
        // debugger;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var DebounceClickDirective = /** @class */ (function () {
    function DebounceClickDirective() {
        this.debounceTime = 500;
        this.debounceClick = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.clicks = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
    }
    /**
     * @return {?}
     */
    DebounceClickDirective.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.subscription = this.clicks.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["debounceTime"])(this.debounceTime)).subscribe((/**
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PinInputComponent = /** @class */ (function () {
    function PinInputComponent(element) {
        this.element = element;
        this.length = 4;
        this.error = false;
        this.full = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.update = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.pinFocused = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.controls = [];
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
            var ctrl = new _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormControl"]();
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
            function (p, v) {
                return v.value === null ? p : "" + p + v.value;
            }), '');
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
    PinInputComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-pin-input',
                    template: "<div [ngClass]=\"'activation-code ' + hasError\">\n  <div class=\"activation-code__inputs\">\n    <div *ngFor=\"let ctrl of controls; let i = index\">\n      <input type=\"tel\" maxlength=\"1\" [formControl]=\"ctrl\" id=\"{{'input_'+i}}\" (keyup)=\"onKey($event)\"\n             (blur)=\"onBlur()\" (focus)=\"onFocus()\"\n             [attr.autofocus]=\"i === 0\" autocomplete=\"off\">\n    </div>\n  </div>\n  <div class=\"error-label\">Incorrect Code</div>\n</div>\n",
                    styles: [".activation-code{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}.activation-code__inputs{width:100%;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;-webkit-flex-direction:row;flex-direction:row}input{width:90%;max-width:6.3rem;height:11.4rem;border:2px solid rgba(0,0,0,.2);border-radius:4px;box-sizing:border-box;font-style:normal;font-weight:400;font-size:8rem;line-height:9.6rem;text-align:center}input:focus{outline-color:#106cc8}.error input{border-color:#eb202f}.error input:focus{outline-color:#eb202f}.error-label{color:#eb202f;display:none;text-align:center;font-size:1.4rem;line-height:1.7rem;margin-top:2rem}.error .error-label{display:block}"]
                }] }
    ];
    /** @nocollapse */
    PinInputComponent.ctorParameters = function () { return [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ElementRef"] }
    ]; };
    PinInputComponent.propDecorators = {
        length: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        error: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        full: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        update: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        pinFocused: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PinInputComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
            var imageTag = item.getElementsByTagName('image')[0];
            /** @type {?} */
            var it = {
                title: item.getElementsByTagName('title')[0].textContent,
                description: item.getElementsByTagName('description')[0].textContent,
                link: item.getElementsByTagName('link')[0].textContent,
                image: imageTag ? imageTag.textContent : channelImgUrl,
                guid: item.getElementsByTagName('guid')[0].textContent,
                pubDate: new Date(item.getElementsByTagName('pubDate')[0].textContent)
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
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] }
    ]; };
    /** @nocollapse */ FeedReaderService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function FeedReaderService_Factory() { return new FeedReaderService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"])); }, token: FeedReaderService, providedIn: "root" });
    return FeedReaderService;
}());

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
     * @return {?}
     */
    GeneralStaticDataService.prototype.getCountriesList = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(countryCodes);
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
];
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
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialogModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"]
                    ],
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(directives, components, [
                        DistancePipe
                    ]),
                    providers: [
                        NotificationService,
                        FeedReaderService,
                        GeneralStaticDataService
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        var reward = v.reward;
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
        var rewardBanner = banner && banner.url;
        /** @type {?} */
        var merchantImg = v.reward.merchant_logo_url ? v.reward.merchant_logo_url : null;
        /** @type {?} */
        var redemptionSuccessTxt = v.redemption_text ? v.redemption_text : null;
        /** @type {?} */
        var redemptionSuccessImg = v.redemption_image ? v.redemption_image : null;
        /** @type {?} */
        var redemptionTypeFinal = null;
        if (v.redemption_type) {
            if ((typeof v.redemption_type) === 'string') {
                // @ts-ignore
                redemptionTypeFinal = v.redemption_type;
                // @ts-ignore
            }
            else if (v.redemption_type.type) {
                // @ts-ignore
                redemptionTypeFinal = v.redemption_type.type;
            }
        }
        redemptionTypeFinal = redemptionTypeFinal || v.voucher_type;
        if (!(redemptionTypeFinal in RedemptionType)) {
            redemptionTypeFinal = RedemptionType.txtCode;
        }
        return {
            id: v.id,
            rewardId: reward.id,
            state: v.state,
            name: v.name,
            code: v.voucher_code,
            redemptionType: redemptionTypeFinal,
            thumbnailImg: thumbnailImg,
            rewardBanner: rewardBanner,
            merchantImg: merchantImg,
            merchantName: reward.merchant_name,
            expiry: reward.valid_to !== null ? new Date(reward.valid_to) : null,
            redemptionDate: v.redemption_date !== null ? new Date(v.redemption_date) : null,
            description: [
                { title: 'Description', content: reward.description, tag: [] },
                { title: 'Terms and Conditions', content: reward.terms_and_conditions, tag: [] }
            ],
            redemptionSuccessTxt: redemptionSuccessTxt,
            redemptionSuccessImg: redemptionSuccessImg
        };
    };
    /**
     * @param {?=} voucherParams
     * @return {?}
     */
    V4VouchersService.prototype.getAll = /**
     * @param {?=} voucherParams
     * @return {?}
     */
    function (voucherParams) {
        var _this = this;
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]()
            .set('sort_by', 'id')
            .set('order', 'desc');
        if (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(voucherParams).type()) {
            params = params.set('type', voucherParams.type);
        }
        if (this.vouchers.length > 0) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(this.vouchers);
        }
        return this.http.get(this.vouchersUrl, { params: params })
            .pipe(
        // todo change to a combination of switchMap and combineLatest
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["flatMap"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(resp.data)
            ];
            for (var i = 2; i <= resp.meta.total_pages; i++) {
                /** @type {?} */
                var stream = _this.getAllFromPage(i, voucherParams);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return V4VouchersService.v4VoucherToVoucher(v); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) { return vouchers.sort((/**
         * @param {?} v1
         * @param {?} v2
         * @return {?}
         */
        function (v1, v2) { return v1.rewardId - v2.rewardId; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) { return _this.vouchers = vouchers; })));
    };
    /**
     * @param {?} page
     * @param {?=} voucherParams
     * @return {?}
     */
    V4VouchersService.prototype.getAllFromPage = /**
     * @param {?} page
     * @param {?=} voucherParams
     * @return {?}
     */
    function (page, voucherParams) {
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]()
            .set('page', page.toString())
            .set('sort_by', 'id')
            .set('order', 'desc');
        if (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(voucherParams).type()) {
            params = params.set('type', voucherParams.type);
        }
        return this.http.get(this.vouchersUrl, { params: params })
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
     * @return {?}
     */
    V4VouchersService.prototype.get = /**
     * @param {?} id
     * @param {?=} useCache
     * @return {?}
     */
    function (id, useCache) {
        var _this = this;
        if (useCache === void 0) { useCache = true; }
        if (useCache) {
            /** @type {?} */
            var found = this.vouchers.find((/**
             * @param {?} v
             * @return {?}
             */
            function (v) {
                return "" + v.id === "" + id;
            }));
            if (found) {
                return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(found);
            }
        }
        /** @type {?} */
        var url = this.config.apiHost + "/v4/vouchers/" + id;
        return this.http.get(url).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return V4VouchersService.v4VoucherToVoucher(v); })), 
        // if the vouchers list was not empty but we are here, it means it is a new voucher, so let's add it.
        Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { if (_this.vouchers.length > 0) {
            _this.vouchers.unshift(v);
        } })));
    };
    /**
     * @param {?} id
     * @param {?=} options
     * @return {?}
     */
    V4VouchersService.prototype.redeemVoucher = /**
     * @param {?} id
     * @param {?=} options
     * @return {?}
     */
    function (id, options) {
        var _this = this;
        /** @type {?} */
        var url = this.config.apiHost + "/v4/vouchers/" + id + "/redeem";
        if (!options) {
            options = null;
        }
        return this.http.post(url, options, {})
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
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
     * @return {?}
     */
    V4VouchersService.prototype.newVouchersCreatedForReward = /**
     * @param {?} rewardId
     * @param {?=} intervalPeriod
     * @return {?}
     */
    function (rewardId, intervalPeriod) {
        var _this = this;
        if (intervalPeriod === void 0) { intervalPeriod = 1000; }
        /** @type {?} */
        var current = 0;
        /** @type {?} */
        var firstPageVouchers = [];
        /** @type {?} */
        var newIssued = [];
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(intervalPeriod).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            current = val;
            return _this.getAllFromPage(1);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} v4Vouchers
         * @return {?}
         */
        function (v4Vouchers) { return v4Vouchers.map((/**
         * @param {?} v4Voucher
         * @return {?}
         */
        function (v4Voucher) { return V4VouchersService.v4VoucherToVoucher(v4Voucher); })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) { return vouchers.filter((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return v.rewardId === rewardId && v.state === 'issued'; })); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
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
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} _
         * @return {?}
         */
        function (_) {
            return newIssued;
        })));
    };
    /**
     * @param {?} voucherId
     * @param {?=} intervalPeriod
     * @return {?}
     */
    V4VouchersService.prototype.stateChangedForVoucher = /**
     * @param {?} voucherId
     * @param {?=} intervalPeriod
     * @return {?}
     */
    function (voucherId, intervalPeriod) {
        var _this = this;
        if (intervalPeriod === void 0) { intervalPeriod = 1000; }
        /** @type {?} */
        var current = 0;
        /** @type {?} */
        var previousState;
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["interval"])(intervalPeriod).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} val
         * @return {?}
         */
        function (val) {
            current = val;
            return _this.get(voucherId, false);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(1), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
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
    V4VouchersService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4VouchersService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4VouchersService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4VouchersService_Factory() { return new V4VouchersService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4VouchersService, providedIn: "root" });
    return V4VouchersService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerVouchersService = /** @class */ (function () {
    function WhistlerVouchersService(http, config) {
        this.http = http;
        this.config = config;
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
            case "assigned" /* assigned */:
                return VoucherState.issued;
            default:
                return VoucherState.redeemed;
        }
    };
    /**
     * @private
     * @param {?} voucher
     * @return {?}
     */
    WhistlerVouchersService.WVoucherToVoucher = /**
     * @private
     * @param {?} voucher
     * @return {?}
     */
    function (voucher) {
        return {
            id: (typeof voucher.id === 'string') ? Number.parseInt(voucher.id, 10) : voucher.id,
            rewardId: -1,
            // use at \lib\vouchers\vouchers.service.ts
            state: WhistlerVouchersService.WVoucherStatusToState(voucher.attributes.status),
            name: 'TODO',
            code: voucher.attributes.code,
            redemptionType: RedemptionType.qr,
            thumbnailImg: 'https://picsum.photos/200/300?random=1',
            rewardBanner: 'https://picsum.photos/200/300?random=1',
            merchantImg: 'https://picsum.photos/200/300?random=1',
            merchantName: 'TODO',
            expiry: null,
            description: []
        };
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
        return this.http.get(this.vouchersUrl)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} vouchers
         * @return {?}
         */
        function (vouchers) { return vouchers.map((/**
         * @param {?} v
         * @return {?}
         */
        function (v) { return WhistlerVouchersService.WVoucherToVoucher(v); })); })));
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
        throw new Error('Method not implemented.');
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
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?=} vouchers
     * @return {?}
     */
    WhistlerVouchersService.prototype.reset = 
    // @ts-ignore
    /**
     * @param {?=} vouchers
     * @return {?}
     */
    function (vouchers) {
        throw new Error('Method not implemented.');
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
    Object.defineProperty(WhistlerVouchersService.prototype, "vouchersUrl", {
        get: /**
         * @private
         * @return {?}
         */
        function () {
            return this.config.apiHost + "voucher/entities";
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
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerVouchersService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerVouchersService_Factory() { return new WhistlerVouchersService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerVouchersService, providedIn: "root" });
    return WhistlerVouchersService;
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
function vouchersServiceFactory(http, config) {
    if (config.isWhistler) {
        return new WhistlerVouchersService(http, config);
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
    QrcodeRedemptionComponent
];
var VouchersModule = /** @class */ (function () {
    function VouchersModule() {
    }
    VouchersModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$1),
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        angularx_qrcode__WEBPACK_IMPORTED_MODULE_7__["QRCodeModule"],
                        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["ReactiveFormsModule"],
                        MaterialModule,
                        UtilsModule
                    ],
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$1),
                    providers: [
                        {
                            provide: IVoucherService,
                            useFactory: vouchersServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var StampState = {
    redeemed: 'redeemed',
    issued: 'issued',
};
/** @enum {string} */
var StampCardState = {
    active: 'active',
    inactive: 'inactive',
};

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PuzzleListComponent = /** @class */ (function () {
    function PuzzleListComponent(stampService) {
        this.stampService = stampService;
        this.campaignId = null;
        this.iconDisplay = 'arrow_forward_ios';
        this.total = 6;
        this.selected = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.completed = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
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
                    .subscribe((/**
                 * @param {?} res
                 * @return {?}
                 */
                function (res) {
                    var e_1, _a;
                    _this.puzzles = res;
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
        if (!puzzle.stamps) {
            return false;
        }
        /** @type {?} */
        var totalSlots = puzzle.displayProperties.totalSlots;
        // if there is no more available stamp return false
        if (puzzle.stamps.filter((/**
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
        function (p) {
            return p.state === StampCardState.active &&
                p.stamps &&
                p.stamps.filter((/**
                 * @param {?} st
                 * @return {?}
                 */
                function (st) { return st.state === StampState.redeemed; })).length < totalSlots;
        }));
        // if there is no active puzzle, this one should not be active
        if (activePuzzles.length === 0) {
            return false;
        }
        // if it is the first active puzzle then make it visible
        if (puzzle.id === activePuzzles[0].id) {
            return true;
        }
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
            return 0;
        }
        return puzzle.stamps.filter((/**
         * @param {?} st
         * @return {?}
         */
        function (st) { return st.state === StampState.issued; })).length;
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
    PuzzleListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-puzzle-list',
                    template: "<mat-card matRipple [matRippleDisabled]=\"!isActive(puzzle)\" [class.disabled]=\"!isActive(puzzle)\"\n          [tabindex]=\"isActive(puzzle) ? 0 : -1\" (click)=\"isActive(puzzle) && puzzleSelected(puzzle)\"\n          *ngFor=\"let puzzle of puzzles; let i=index\">\n  <div class=\"puzzle-content\">\n    <div class=\"puzzle-img__wrapper\">\n      <img class=\"puzzle-img\" src=\"{{puzzle.displayProperties.cardImage.value.imageUrl}}\">\n    </div>\n    <div class=\"puzzle-details\">\n      <h1>Puzzle #{{indexToLetter(i)}}\n        <span class=\"badge-warn\">\n          {{nbPlacedStamps(puzzle)}}/{{total}}\n        </span>\n      </h1>\n      <p *ngIf=\"puzzle.stamps && puzzle.stamps.length > 0\">{{nbAvailableStamps(puzzle)}} new pieces</p>\n    </div>\n  </div>\n  <mat-icon *ngIf=\"iconDisplay\">\n    {{iconDisplay}}\n  </mat-icon>\n</mat-card>\n",
                    styles: ["mat-card{margin:1.2rem 0;display:-webkit-flex;display:flex;padding:0;-webkit-flex:0 0 10.5rem;flex:0 0 10.5rem;height:10.5rem;cursor:pointer;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-between;justify-content:space-between}mat-card.disabled{background-color:#ebebeb;pointer-events:none;opacity:.5}mat-icon{color:#b2b2b2;font-size:3.6rem;height:3.6rem;-webkit-flex:0 0 3.6rem;flex:0 0 3.6rem}.puzzle-content{display:-webkit-flex;display:flex;-webkit-flex-basis:auto;flex-basis:auto;-webkit-flex-grow:1;flex-grow:1;-webkit-justify-content:flex-start;justify-content:flex-start}.puzzle-img__wrapper{-webkit-flex:0 0 10.5rem;flex:0 0 10.5rem;height:10.5rem;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center}.puzzle-img{margin:auto;max-height:6rem;max-width:6rem}.puzzle-details{font-size:1.4rem;display:-webkit-flex;display:flex;margin:auto 0;padding-left:0;-webkit-flex-direction:column;flex-direction:column}.puzzle-details h1{font-size:1.4rem;line-height:1.6rem;padding:0;font-weight:500;margin:4px 0}.puzzle-details p{font-size:1.4rem;line-height:1.6rem;color:#e42713;margin:4px 0;padding:0}.puzzle-details:nth-child(1){margin-top:0}.badge-warn{background-color:rgba(228,39,19,.1);color:#e42713;padding:2px 4px;font-size:1.2rem;border-radius:8px}"]
                }] }
    ];
    /** @nocollapse */
    PuzzleListComponent.ctorParameters = function () { return [
        { type: StampService }
    ]; };
    PuzzleListComponent.propDecorators = {
        campaignId: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        iconDisplay: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        selected: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        completed: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PuzzleListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            this.remainingPuzzleTiles = this.remainingPuzzleTiles.filter((/**
             * @param {?} currentValue
             * @return {?}
             */
            function (currentValue) {
                return currentValue.puzzleLocation !== puzzleLocation_1;
            }));
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
                    template: "<div class=\"center-board\" [ngStyle]=\"getImageSize()\">\n  <mat-grid-list *ngIf=\"imageReady\" [cols]=\"cols\" [rowHeight]=\"getWidthHeightRatio()\" gutterSize=\"1px\">\n    <mat-grid-tile *ngFor=\"let tile of boardPuzzleTiles\">\n      <img class=\"custom-puzzle-image\" [ngStyle]=\"getPuzzleTileStyle(tile)\"/>\n    </mat-grid-tile>\n  </mat-grid-list>\n  <div class=\"dummy-container\">\n    <img class=\"dummy-image\" [src]=\"img\" (load)=\"onImageLoad()\" #puzzleBoard/>\n  </div>\n</div>\n<div class=\"bottom-container\">\n  <div class=\"static-content\">\n    <div class=\"red-color-font\">\n      <div class=\"vertically-aligned-row\">\n        PUZZLE PIECES\n      </div>\n      <div class=\"static-collect-pieces\">Collect pieces and complete the puzzle</div>\n    </div>\n    <div class=\"badge-warn\">\n      {{ remainingPuzzleTiles.length }}/{{totalPieces}}\n    </div>\n  </div>\n  <div class=\"scrolling-wrapper-flexbox\">\n    <div class=\"remaining-puzzle-piece-container\" *ngFor=\"let staticIndex of staticPuzzleDummyTiles; let i = index\"\n         [ngStyle]=\"getTileSize()\">\n      <div *ngIf=\"i === 0;then firstImage else moreImages\"></div>\n      <ng-template #firstImage>\n        <img class=\"custom-puzzle-image mat-elevation-z8\" [ngStyle]=\"getBottomTilesStyle(staticIndex)\" (click)=\"nextStampClicked()\"/>\n      </ng-template>\n      <ng-template #moreImages>\n        <img class=\"custom-puzzle-image greyscale\" [ngStyle]=\"getBottomTilesStyle(staticIndex)\"/>\n      </ng-template>\n    </div>\n  </div>\n</div>\n<div class=\"overlay\" *ngIf=\"showHint && imageReady\" (click)=\"dismissOverlayHint()\">\n  <div class=\"hint-group\">\n    <div class=\"hand-pointer-hint\">\n      <img src=\"assets/pointer-touch-hint.png\">\n    </div>\n    <div class=\"speech-bubble\">\n      <div class=\"triangle-tip\"></div>\n      <div class=\"rounded-rect\">\n        <p>Click on the piece to place it on the puzzle</p>\n      </div>\n    </div>\n  </div>\n</div>\n",
                    styles: [".custom-puzzle-image{width:100%;height:100%}.greyscale{filter:grayscale(100%);-webkit-filter:grayscale(100%);-webkit-transform:translateZ(0)}.red-color-font{color:#e42713;font-weight:700}.center-board{float:none;margin:0 auto;display:block}.center-board .mat-grid-list{width:100%;display:inline-block;z-index:1}.center-board .dummy-container{width:100%;height:100%;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;position:relative;top:-100%;left:0;z-index:0;-webkit-filter:grayscale(100%);filter:grayscale(100%);overflow:hidden;visibility:hidden}.center-board .dummy-container .dummy-image{max-width:100%;max-height:100%;object-fit:contain;background-repeat:no-repeat}.vertically-aligned-row{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center}.bottom-container{background:#fff;border-radius:16px 16px 0 0;padding:2rem;margin-top:2rem}.bottom-container .static-content{display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:space-between;justify-content:space-between;-webkit-align-items:center;align-items:center}.bottom-container .static-content .help-logo{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;width:20px;height:20px;background:#e3dfdf;border-radius:50%;margin-left:10px}.bottom-container .static-content .static-collect-pieces{color:#959595}.bottom-container .static-content .badge-warn{background-color:rgba(228,39,19,.1);color:#e42713;padding:10px 20px;font-size:1.2rem;border-radius:20px}.bottom-container .scrolling-wrapper-flexbox{display:-webkit-flex;display:flex;-webkit-flex-wrap:nowrap;flex-wrap:nowrap;overflow-x:auto;-webkit-justify-content:flex-start;justify-content:flex-start}.bottom-container .scrolling-wrapper-flexbox .remaining-puzzle-piece-container{-webkit-flex:0 0 auto;flex:0 0 auto;margin-right:1em;border:2px dotted #e42713;-webkit-transform:scale(.65);transform:scale(.65)}.overlay{position:absolute;top:0;width:100%;height:100%;background-color:rgba(128,128,128,.5);margin:0;z-index:2}.overlay .hint-group{position:absolute;bottom:8rem;left:4rem;display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row}.overlay .hint-group .hand-pointer-hint{width:7rem;height:7rem;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-align-content:center;align-content:center;position:relative;top:4rem}.overlay .hint-group .hand-pointer-hint img{width:auto;margin:auto;max-height:100%;max-width:100%}.overlay .hint-group .speech-bubble{position:relative;z-index:3;display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row}.overlay .hint-group .speech-bubble .triangle-tip{position:relative;top:2.5rem;left:1rem;width:0;height:0;border-left:1.7rem solid transparent;border-right:1.7rem solid transparent;border-top:5rem solid #fff;-webkit-transform:rotateZ(70deg);transform:rotateZ(70deg);z-index:3}.overlay .hint-group .speech-bubble .rounded-rect{position:relative;width:15rem;background:#fff;border-radius:15px;padding:0 1rem;z-index:4;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:center;justify-content:center}.overlay .hint-group .speech-bubble .rounded-rect p{font-size:1.45rem}:host{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;height:auto}:host .center-board{-webkit-flex:1;flex:1}:host .bottom-container{-webkit-flex:1;flex:1}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
                    styles: [".mat-card{box-shadow:none}.mat-card .inner{border:.1rem solid #cac6c6;border-radius:.3rem}.mat-card .inner mat-card-content{background-size:cover;background-repeat:no-repeat;position:relative}.mat-card .inner mat-card-content .bg-img{visibility:hidden;width:100%}.mat-card .inner mat-card-content .stamp-container{position:absolute;top:0;width:100%;height:100%}.mat-card .inner mat-card-content .stamp-container .stamps{display:-webkit-flex;display:flex}.mat-card .inner mat-card-content .stamp-container .stamps .stamp{-webkit-flex-grow:1;flex-grow:1;-webkit-flex-basis:0;flex-basis:0;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center;display:-webkit-flex;display:flex;padding:.5rem;background-color:transparent;background-position:center;background-repeat:no-repeat}.mat-card .inner mat-card-content .stamp-container .stamps .stamp .content{border-radius:.3rem;border:.2rem solid;height:100%;width:100%;background-color:#000}.mat-card .inner mat-card-content .stamp-container .stamps .stamp .content perx-core-stamp{height:100%;width:100%}.mat-card-actions{margin:0 0 1rem;padding:0 1.5rem;text-align:center}.mat-card-actions button{background-color:#b20000;color:#fff;border:0;padding:.5rem 1rem;width:100%}.mat-card-actions button.btn-redeemed{background-color:transparent;color:#b20000!important}.mat-card-actions button.btn-unavailable,.mat-card-actions button:disabled,.mat-card-actions button[disabled]{background-color:#d6d6d6;color:#a8a8a8}.hidden{visibility:hidden}"]
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PuzzleCollectStampsComponent = /** @class */ (function () {
    function PuzzleCollectStampsComponent() {
        // This dummy array is describing the slots templates
        this.stampsOrientations = [[1, 2],
            [2, 2],
            [2, 1, 2],
            [3, 3],
            [3, 3, 1],
            [4, 4],
            [3, 3, 3],
            [3, 3, 3, 1]];
        this.stamps = [];
        this.rewards = [];
        this.nbSlots = null;
        this.preStampImg = null;
        this.postStampImg = null;
        this.rewardPreStamp = null;
        this.rewardPostStamp = null;
        this.availableStampClicked = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.currentActiveOrientation = null;
    }
    /**
     * @param {?} changes
     * @return {?}
     */
    PuzzleCollectStampsComponent.prototype.ngOnChanges = /**
     * @param {?} changes
     * @return {?}
     */
    function (changes) {
        if (changes.nbSlots) {
            this.currentActiveOrientation = this.stampsOrientations[this.nbSlots - 3];
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
        if (itemIndex < (this.stamps.length)) {
            if (this.stamps[itemIndex].state === PuzzleCollectStampState.redeemed) {
                if (this.isIndexPresentInRewards(itemIndex)) {
                    return this.rewardPostStamp;
                }
                return this.postStampImg;
            }
            // Issued
            if (this.isIndexPresentInRewards(itemIndex)) {
                return this.rewardPreStamp;
            }
            return this.rewardPreStamp;
        }
        return this.preStampImg;
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
        if (itemIndex < this.stamps.length) {
            return this.stamps[itemIndex].state === PuzzleCollectStampState.issued;
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
        /** @type {?} */
        var itemIndex = this.getItemIndex(index, rowNum);
        if (itemIndex < this.stamps.length) {
            this.stamps[itemIndex].state = PuzzleCollectStampState.redeemed;
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
        for (var i = 0; i < this.currentActiveOrientation.length; i++) {
            if (rowNum > i) {
                itemIndex += this.currentActiveOrientation[i];
            }
        }
        return itemIndex;
    };
    PuzzleCollectStampsComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-puzzle-collect-stamps',
                    template: "<div class=\"main-container\">\n  <div class=\"row\" *ngFor=\"let rowItemsCount of currentActiveOrientation; let rowNum = index\">\n    <div class=\"dummy-container\" *ngFor=\"let box of counter(rowItemsCount); let i = index\">\n      <img (click)=\"onAvailableStampClicked(i, rowNum)\" [src]=\"getStampImage(i, rowNum)\"/>\n      <div *ngIf=\"isIssued(i, rowNum)\" class=\"add\">+</div>\n    </div>\n  </div>\n</div>",
                    styles: [".main-container{display:-webkit-flex;display:flex;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-direction:column;flex-direction:column}.row{width:100%;display:-webkit-flex;display:flex;-webkit-justify-content:space-evenly;justify-content:space-evenly;-webkit-flex-direction:row;flex-direction:row;margin-top:2rem}.dummy-container{position:relative}.add{position:absolute;left:0;right:0;margin:auto;bottom:10%;font-size:3rem;text-align:center;color:#2665ee}"]
                }] }
    ];
    PuzzleCollectStampsComponent.propDecorators = {
        stamps: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rewards: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        nbSlots: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        preStampImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        postStampImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rewardPreStamp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        rewardPostStamp: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        availableStampClicked: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PuzzleCollectStampsComponent;
}());

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
                    styles: ["div{height:100%;display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center;-webkit-justify-content:center;justify-content:center}"]
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
var TokenStorage = /** @class */ (function () {
    function TokenStorage() {
    }
    /**
     * Get User Info
     */
    /**
     * Get User Info
     * @return {?}
     */
    TokenStorage.prototype.getAppInfo = /**
     * Get User Info
     * @return {?}
     */
    function () {
        this.appInfo = JSON.parse(localStorage.getItem('appInfo')) || { appAccessToken: '', userAccessToken: '' };
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(this.appInfo);
    };
    /**
     * Get appInfo property
     */
    /**
     * Get appInfo property
     * @param {?} key
     * @return {?}
     */
    TokenStorage.prototype.getAppInfoProperty = /**
     * Get appInfo property
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.getAppInfo();
        return this.appInfo[key];
    };
    /**
     * Set appInfo property
     */
    /**
     * Set appInfo property
     * @param {?} value
     * @param {?} key
     * @return {?}
     */
    TokenStorage.prototype.setAppInfoProperty = /**
     * Set appInfo property
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
     * Remove appInfo property
     */
    /**
     * Remove appInfo property
     * @param {?} key
     * @return {?}
     */
    TokenStorage.prototype.clearAppInfoProperty = /**
     * Remove appInfo property
     * @param {?} key
     * @return {?}
     */
    function (key) {
        this.getAppInfo();
        if (key) {
            delete this.appInfo[key];
        }
        else {
            this.appInfo = {};
        }
        localStorage.setItem('appInfo', JSON.stringify(this.appInfo));
    };
    TokenStorage.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"] }
    ];
    return TokenStorage;
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        return this.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            return _this.http.patch(_this.apiHost + "/v4/customers/" + profile.id, {
                personal_properties: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, profile.customProperties, data)
            });
        })));
    };
    /**
     * @return {?}
     */
    V4ProfileService.prototype.getCustomProperties = /**
     * @return {?}
     */
    function () {
        return this.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) { return profile.customProperties; })));
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
        return this.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            return _this.http.patch(_this.apiHost + "/v4/customers/" + profile.id, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, profile, data));
        })));
    };
    V4ProfileService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4ProfileService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4ProfileService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4ProfileService_Factory() { return new V4ProfileService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4ProfileService, providedIn: "root" });
    return V4ProfileService;
}(ProfileService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        _this.$failedAuthObservable = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"]();
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(!!token);
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(true);
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
     * @return {?}
     */
    V4AuthenticationService.prototype.login = /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @return {?}
     */
    function (user, pass, mechId, campaignId) {
        var _this = this;
        return this.authenticateUser(user, pass, mechId, campaignId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
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
            _this.$failedAuthObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(true);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err); })));
    };
    /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @return {?}
     */
    V4AuthenticationService.prototype.authenticateUser = /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @param {?=} campaignId
     * @return {?}
     */
    function (user, pass, mechId, campaignId) {
        /** @type {?} */
        var httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]()
            .append('url', location.host)
            .append('username', user)
            .append('password', pass);
        if (mechId) {
            httpParams = httpParams.append('mech_id', mechId);
        }
        if (campaignId) {
            httpParams = httpParams.append('campaign_id', campaignId);
        }
        return this.http.post(this.userAuthEndPoint + '/token', null, {
            params: httpParams
        });
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
        return this.authenticateUserWithPI(user).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
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
            _this.$failedAuthObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(true);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err); })));
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
        var httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]()
            .append('url', location.host)
            .append('identifier', user);
        return this.http.post(this.userAuthEndPoint + '/token', null, {
            params: httpParams
        });
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
        var httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]()
            .append('url', location.host);
        return this.http.post(this.appAuthEndPoint + '/token', null, {
            params: httpParams
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
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
        this.tokenStorage.clearAppInfoProperty('userAccessToken');
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
        return this.http.get(this.customersEndPoint + '/forget_password', { params: { phone: phone } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((
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
        return this.http.patch(this.customersEndPoint + '/reset_password', {
            phone: resetPasswordInfo.phone,
            password: resetPasswordInfo.newPassword,
            password_confirmation: resetPasswordInfo.passwordConfirmation,
            confirmation_token: resetPasswordInfo.otp
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((
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
        return this.http.get(this.customersEndPoint + '/resend_confirmation', { params: { phone: phone } }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((
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
        /** @type {?} */
        var res = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({ last_name: data.lastName, first_name: data.firstName, birthday: data.birthDay }, data);
        res.lastName = undefined;
        res.firstName = undefined;
        return res;
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
        return this.http.post(this.customersEndPoint + '/signup', profileV4)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((
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
        function (error) { return console.log(error); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        return this.http.patch(this.customersEndPoint + '/confirm', { phone: phone, confirmation_token: otp }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((
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
     * @return {?}
     */
    V4AuthenticationService.prototype.requestVerificationToken = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.profileService.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            return _this.http.get(_this.customersEndPoint + "/" + profile.id + "/request_verification_token");
        })));
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
        return this.profileService.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            return _this.http.patch(_this.customersEndPoint + "/" + profile.id + "/change_phone", null, {
                headers: {
                    phone: changePhoneData.phone,
                    confirmation_token: changePhoneData.otp
                }
            });
        })));
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
        return this.profileService.whoAmI().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} profile
         * @return {?}
         */
        function (profile) {
            return _this.http.patch(_this.customersEndPoint + "/" + profile.id + "/change_password", {
                old_password: changePasswordData.oldPassword,
                password: changePasswordData.newPassword,
                password_confirmation: changePasswordData.passwordConfirmation,
                confirmation_token: changePasswordData.otp
            });
        })));
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(userAccessToken ? userAccessToken : appAccessToken);
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
        return this.tokenStorage.getAppInfoProperty('userAccessToken');
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
        return this.tokenStorage.getAppInfoProperty('appAccessToken');
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
    V4AuthenticationService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4AuthenticationService.ctorParameters = function () { return [
        { type: Config },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: TokenStorage },
        { type: ProfileService }
    ]; };
    /** @nocollapse */ V4AuthenticationService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4AuthenticationService_Factory() { return new V4AuthenticationService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(TokenStorage), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(ProfileService)); }, token: V4AuthenticationService, providedIn: "root" });
    return V4AuthenticationService;
}(AuthenticationService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        }
        else {
            _this.preAuthEndpoint = config.baseHref + 'cognito/login';
        }
        _this.$failedAuthObservable = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Observable"]();
        return _this;
    }
    Object.defineProperty(WhistlerAuthenticationService.prototype, "$failedAuth", {
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
    WhistlerAuthenticationService.prototype.isAuthorized = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var token = this.tokenStorage
            .getAppInfoProperty('userAccessToken');
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(!!token);
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.refreshToken = /**
     * @return {?}
     */
    function () {
        var _this = this;
        this.retries++;
        return this.getUserWithJWT().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @return {?}
         */
        function () {
            // @ts-ignore
            /** @type {?} */
            var userBearer = resp.headers.get('Authorization');
            if (!userBearer) {
                throw new Error('Get authentication token failed!');
            }
            _this.saveUserAccessToken(userBearer.split(' ')[1]);
        }), (/**
         * @return {?}
         */
        function () {
            if (_this.retries >= _this.maxRetries) {
                _this.$failedAuthObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(true);
                _this.logout();
                return false;
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err); })));
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.autoLogin = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.getUserWithJWT().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            /** @type {?} */
            var userBearer = res.data[0].attributes.jwt;
            if (!userBearer) {
                throw new Error('Get authentication token failed!');
            }
            _this.saveUserAccessToken(userBearer);
        }), (/**
         * @return {?}
         */
        function () {
            _this.$failedAuthObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(true);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err); })));
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getUserWithJWT = /**
     * @return {?}
     */
    function () {
        /** @type {?} */
        var user = ((/** @type {?} */ (window))).primaryIdentifier;
        /** @type {?} */
        var httpParams = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]().append('identifier', user).append('url', location.host);
        return this.http.post(this.preAuthEndpoint, null, {
            params: httpParams
        });
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
        return url.endsWith('/preauth') || url.endsWith('/v4/oauth/token') || url.endsWith('/v2/oauth/token') || url.endsWith('/v2/cognito/login');
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
        return this.getIamUser(user, pass, mechId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
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
        function () {
            _this.$failedAuthObservable = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(true);
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err); })));
    };
    /**
     * @param {?} user
     * @param {?} pass
     * @param {?=} mechId
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getIamUser = /**
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        this.tokenStorage.clearAppInfoProperty('userAccessToken');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.requestVerificationToken = /**
     * @return {?}
     */
    function () {
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])('Not implement yet');
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
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(userAccessToken ? userAccessToken : appAccessToken);
    };
    /**
     * @return {?}
     */
    WhistlerAuthenticationService.prototype.getUserAccessToken = /**
     * @return {?}
     */
    function () {
        return this.tokenStorage.getAppInfoProperty('userAccessToken');
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
        return this.tokenStorage.getAppInfoProperty('appAccessToken');
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
    WhistlerAuthenticationService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerAuthenticationService.ctorParameters = function () { return [
        { type: Config },
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: TokenStorage }
    ]; };
    /** @nocollapse */ WhistlerAuthenticationService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerAuthenticationService_Factory() { return new WhistlerAuthenticationService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(TokenStorage)); }, token: WhistlerAuthenticationService, providedIn: "root" });
    return WhistlerAuthenticationService;
}(AuthenticationService));

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
var AuthenticationModule = /** @class */ (function () {
    function AuthenticationModule() {
    }
    AuthenticationModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [ngx_auth__WEBPACK_IMPORTED_MODULE_10__["AuthModule"]],
                    declarations: [],
                    exports: [],
                    providers: [
                        TokenStorage,
                        { provide: ngx_auth__WEBPACK_IMPORTED_MODULE_10__["PROTECTED_FALLBACK_PAGE_URI"], useValue: '/' },
                        { provide: ngx_auth__WEBPACK_IMPORTED_MODULE_10__["PUBLIC_FALLBACK_PAGE_URI"], useValue: '/login' },
                        {
                            provide: AuthenticationService,
                            useFactory: AuthServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config, TokenStorage, ProfileService]
                        },
                        {
                            provide: ngx_auth__WEBPACK_IMPORTED_MODULE_10__["AUTH_SERVICE"],
                            useFactory: AuthServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config, TokenStorage, ProfileService]
                        }
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var V4RewardsService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4RewardsService, _super);
    function V4RewardsService(http, voucherService, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.voucherService = voucherService;
        _this.rewardMeta = {};
        _this.catalogMeta = {};
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
        var rewardBanner = banner && banner.url;
        /** @type {?} */
        var merchantImg = reward.merchant_logo_url ? reward.merchant_logo_url : null;
        /** @type {?} */
        var sellingFrom = reward.selling_from ? new Date(reward.selling_from) : undefined;
        /** @type {?} */
        var v4Invent = reward.inventory;
        /** @type {?} */
        var inventory = {
            rewardTotalBalance: v4Invent.reward_total_balance !== undefined ? v4Invent.reward_total_balance : null,
            rewardTotalLimit: v4Invent.reward_total_limit !== undefined ? v4Invent.reward_total_limit : null,
            rewardLimitPerUserBalance: v4Invent.reward_limit_per_user_balance !== undefined && v4Invent.reward_limit_per_user_balance !== null ?
                v4Invent.reward_limit_per_user_balance.available_amount : null
        };
        return {
            id: reward.id,
            name: reward.name,
            subtitle: reward.subtitle,
            description: reward.description,
            rewardPrice: reward.reward_price.map((/**
             * @param {?} price
             * @return {?}
             */
            function (price) { return ({
                id: price.id,
                currencyCode: price.currency_code,
                price: price.price,
                points: price.points,
                identifier: price.identifier
            }); })),
            rewardThumbnail: thumbnailImg,
            rewardBanner: rewardBanner,
            validFrom: new Date(reward.valid_from),
            validTo: new Date(reward.valid_to),
            sellingFrom: sellingFrom,
            merchantId: reward.merchant_id,
            merchantName: reward.merchant_name,
            merchantImg: merchantImg,
            merchantWebsite: reward.merchant_website,
            termsAndConditions: reward.terms_and_conditions,
            howToRedeem: reward.how_to_redeem,
            categoryTags: reward.category_tags,
            inventory: inventory,
        };
    };
    /**
     * @param {?} catalog
     * @return {?}
     */
    V4RewardsService.v4CatalogToCatalog = /**
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
        var thumbnailImg = thumbnail && thumbnail.url;
        /** @type {?} */
        var banner = images.find((/**
         * @param {?} image
         * @return {?}
         */
        function (image) { return image.type === 'catalog_banner'; }));
        /** @type {?} */
        var catalogBanner = banner && banner.url;
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
     * @return {?}
     */
    V4RewardsService.prototype.getTags = /**
     * @return {?}
     */
    function () {
        // todo: api not implemented yet
    };
    /**
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    V4RewardsService.prototype.getAllRewards = /**
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    function (tags, categories) {
        var _this = this;
        /** @type {?} */
        var pageSize = 100;
        return this.getRewards(1, pageSize, tags, categories).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(reward)
            ];
            for (var i = 2; i <= _this.rewardMeta.total_pages; i++) {
                /** @type {?} */
                var stream = _this.getRewards(i, pageSize, tags, categories);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["concatAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["reduce"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []));
    };
    /**
     * @param {?} rewardId
     * @param {?=} rewardParams
     * @return {?}
     */
    V4RewardsService.prototype.reserveReward = /**
     * @param {?} rewardId
     * @param {?=} rewardParams
     * @return {?}
     */
    function (rewardId, rewardParams) {
        var _this = this;
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]();
        if (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(rewardParams).locationId()) {
            params = params.set('location_id', rewardParams.locationId.toString());
        }
        if (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(rewardParams).priceId()) {
            params = params.set('price_id', rewardParams.priceId.toString());
        }
        return this.http.post(this.apiHost + "/v4/rewards/" + rewardId + "/reserve", null, { params: params }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((/**
         * @param {?} minVoucher
         * @return {?}
         */
        function (minVoucher) { return _this.voucherService.get(minVoucher.id); })));
    };
    /**
     * @param {?} rewardId
     * @return {?}
     */
    V4RewardsService.prototype.issueReward = /**
     * @param {?} rewardId
     * @return {?}
     */
    function (rewardId) {
        var _this = this;
        return this.http.post(this.apiHost + "/v4/rewards/" + rewardId + "/issue", {}).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((/**
         * @param {?} minVoucher
         * @return {?}
         */
        function (minVoucher) { return _this.voucherService.get(minVoucher.id); })));
    };
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    V4RewardsService.prototype.getRewards = /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    function (page, pageSize, tags, categories) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 25; }
        /** @type {?} */
        var params = new _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpParams"]()
            .set('page', page.toString())
            .set('size', pageSize.toString());
        if (tags) {
            params = params.set('tags', tags.join());
        }
        if (categories) {
            params = params.set('categories', categories.join());
        }
        return this.http.get(this.apiHost + "/v4/rewards", { params: params }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.meta) {
                _this.rewardMeta = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.rewardMeta, res.meta);
            }
            return res.data;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
     * @return {?}
     */
    V4RewardsService.prototype.getReward = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get(this.apiHost + "/v4/rewards/" + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) { return V4RewardsService.v4RewardToReward(reward); })));
    };
    /**
     * @return {?}
     */
    V4RewardsService.prototype.getAllCatalogs = /**
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var pageSize = 100;
        return this.getCatalogs(1, pageSize).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} catalog
         * @return {?}
         */
        function (catalog) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(catalog)
            ];
            for (var i = 2; i <= _this.catalogMeta.total_pages; i++) {
                /** @type {?} */
                var stream = _this.getCatalogs(i, pageSize);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["concatAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["reduce"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []));
    };
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    V4RewardsService.prototype.getCatalogs = /**
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    function (page, pageSize) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 25; }
        return this.http.get(this.apiHost + "/v4/catalogs", {
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.meta) {
                _this.catalogMeta = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.catalogMeta, res.meta);
            }
            return res.data;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
     * @return {?}
     */
    V4RewardsService.prototype.getCatalog = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get(this.apiHost + "/v4/catalogs/" + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} catalog
         * @return {?}
         */
        function (catalog) { return V4RewardsService.v4CatalogToCatalog(catalog); })));
    };
    /**
     * @param {?} id
     * @return {?}
     */
    V4RewardsService.prototype.getRewardPricesOptions = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get(this.apiHost + "/v4/rewards/" + id + "/prices").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: IVoucherService },
        { type: Config }
    ]; };
    /** @nocollapse */ V4RewardsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4RewardsService_Factory() { return new V4RewardsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(IVoucherService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4RewardsService, providedIn: "root" });
    return V4RewardsService;
}(RewardsService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            endsAt: new Date(campaign.ends_at) || undefined,
            rewards: rewards,
            thumbnailUrl: thumbnailUrl
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) { return resp.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4CampaignService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4CampaignService_Factory() { return new V4CampaignService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4CampaignService, providedIn: "root" });
    return V4CampaignService;
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
ICampaignService = /** @class */ (function () {
    function ICampaignService() {
    }
    return ICampaignService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerCampaignService = /** @class */ (function () {
    function WhistlerCampaignService(http, config) {
        this.http = http;
        this.baseUrl = (/** @type {?} */ (config.apiHost));
    }
    /**
     * @param {?} campaign
     * @return {?}
     */
    WhistlerCampaignService.prototype.WhistlerCampaignToCampaign = /**
     * @param {?} campaign
     * @return {?}
     */
    function (campaign) {
        /** @type {?} */
        var cAttributes = campaign.attributes;
        return {
            id: parseInt(campaign.id, 10),
            name: cAttributes.name,
            description: cAttributes.goal,
            type: cAttributes.engagement_type,
            state: cAttributes.status,
            endsAt: new Date(cAttributes.end_date_time),
            engagementId: cAttributes.engagement_id,
            commChannel: cAttributes.comm_channel
        };
    };
    /**
     * @return {?}
     */
    WhistlerCampaignService.prototype.getCampaigns = /**
     * @return {?}
     */
    function () {
        var _this = this;
        return this.http.get(this.baseUrl + '/campaign/entities')
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} campaigns
         * @return {?}
         */
        function (campaigns) { return campaigns.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} campaigns
         * @return {?}
         */
        function (campaigns) {
            return campaigns.map((/**
             * @param {?} campaign
             * @return {?}
             */
            function (campaign) { return _this.WhistlerCampaignToCampaign(campaign); }));
        })));
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerCampaignService.prototype.getCampaign = 
    // @ts-ignore
    /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        var _this = this;
        return this.http.get(this.baseUrl + '/campaign/entities/' + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} campaigns
         * @return {?}
         */
        function (campaigns) { return campaigns.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) { return _this.WhistlerCampaignToCampaign(campaign); })));
    };
    WhistlerCampaignService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    WhistlerCampaignService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerCampaignService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerCampaignService_Factory() { return new WhistlerCampaignService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerCampaignService, providedIn: "root" });
    return WhistlerCampaignService;
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
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"]
                    ],
                    providers: [
                        {
                            provide: ICampaignService,
                            useFactory: campaignServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config]
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return {
            id: stampCard.id,
            userAccountId: stampCard.user_account_id,
            state: stampCard.state,
            campaignId: stampCard.campaign_id,
            cardNumber: stampCard.card_number,
            campaignConfig: {
                totalSlots: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard).campaign_config.total_slots(),
                rewards: ((/** @type {?} */ ((/** @type {?} */ (Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard)))))).campaign_config.rewards.map((/**
                 * @param {?} rewards
                 * @return {?}
                 */
                function (rewards) { return V4StampService.v4RewardToReward(rewards); })),
            },
            displayProperties: {
                numberOfCols: stampCard.display_properties.number_of_cols,
                numberOfRows: stampCard.display_properties.number_of_rows,
                cardImage: {
                    value: {
                        imageUrl: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(stampCard).display_properties.card_image.value.image_url(),
                    }
                },
                totalSlots: stampCard.display_properties.total_slots,
            },
            stamps: stampCard.stamps.map((/**
             * @param {?} stamp
             * @return {?}
             */
            function (stamp) { return V4StampService.v4StampToStamp(stamp); }))
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
        return this.http.get(this.baseUrl + "/v4/campaigns/" + campaignId + "/stamp_cards", {
            params: {
                size: '100'
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        return this.http.get(this.baseUrl + "/v4/campaigns/" + campaignId + "/stamp_cards/current").pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        return this.http.get(this.baseUrl + "/v4/campaigns/" + campaignId + "/stamp_transactions", {
            params: {
                size: '100'
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["flatMap"])((/**
         * @param {?} resp
         * @return {?}
         */
        function (resp) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(resp.data.map((/**
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
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
     * @return {?}
     */
    V4StampService.prototype.putStamp = /**
     * @param {?} stampId
     * @return {?}
     */
    function (stampId) {
        var _this = this;
        return this.http.put(this.baseUrl + "/v4/stamp_transactions/" + stampId, null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.data.vouchers && res.data.vouchers.length > 0) {
                _this.vouchersService.reset();
            }
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        return this.http.post(this.baseUrl + "/v4/stamp_cards/" + cardId + "/redeem_all_stamps", null).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data.stamps; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["tap"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            res.map((/**
             * @param {?} r
             * @return {?}
             */
            function (r) {
                if (r.vouchers && r.vouchers.length > 0) {
                    _this.vouchersService.reset();
                }
            }));
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} stamps
         * @return {?}
         */
        function (stamps) { return stamps.map((/**
         * @param {?} stamp
         * @return {?}
         */
        function (stamp) { return V4StampService.v4StampToStamp(stamp); })); })));
    };
    V4StampService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4StampService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config },
        { type: IVoucherService }
    ]; };
    /** @nocollapse */ V4StampService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4StampService_Factory() { return new V4StampService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(IVoucherService)); }, token: V4StampService, providedIn: "root" });
    return V4StampService;
}());

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
    return new V4StampService(http, config, vouchersService);
}
var StampModule = /** @class */ (function () {
    function StampModule() {
    }
    StampModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"]
                    ],
                    providers: [
                        {
                            provide: StampService,
                            useFactory: stampServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config]
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
/** @enum {number} */
var GameType = {
    unknown: -1,
    shakeTheTree: 0,
    pinata: 1,
};
GameType[GameType.unknown] = 'unknown';
GameType[GameType.shakeTheTree] = 'shakeTheTree';
GameType[GameType.pinata] = 'pinata';
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
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        switch (game.game_type) {
            case "shake_the_tree" /* shakeTheTree */:
                type = GameType.shakeTheTree;
                /** @type {?} */
                var dpts = (/** @type {?} */ (game.display_properties));
                config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultTree(), { treeImg: dpts.tree_image.value.image_url || dpts.tree_image.value.file, giftImg: dpts.gift_image.value.image_url || dpts.gift_image.value.file, nbHangedGift: dpts.number_of_gifts_shown, nbGiftsToDrop: dpts.number_of_gifts_to_drop, nbTaps: 5, waitingAccessoryImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).waiting_image.value.image_url() || Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).waiting_image.value.file(), celebratingAccessoryImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).celebrating_image.value.image_url() || Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpts).celebrating_image.value.file() });
                break;
            case "hit_the_pinata" /* pinata */:
                type = GameType.pinata;
                /** @type {?} */
                var dpps = (/** @type {?} */ (game.display_properties));
                config = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, defaultPinata(), { stillImg: dpps.still_image.value.image_url || dpps.still_image.value.file, brokenImg: dpps.opened_image.value.image_url || dpps.opened_image.value.file, breakingImg: Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpps).cracking_image.value.image_url() || Object(ts_optchain__WEBPACK_IMPORTED_MODULE_9__["oc"])(dpps).cracking_image.value.file(), nbTaps: 5 });
                break;
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} games
         * @return {?}
         */
        function (games) {
            if (games.length === 0) {
                throw new Error('Games list is empty');
            }
            return games.map((/**
             * @param {?} game
             * @return {?}
             */
            function (game) { return V4GameService.v4GameToGame(game); }));
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["catchError"])((/**
         * @param {?} err
         * @return {?}
         */
        function (err) {
            // rethrow error for subscriber to handle
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["throwError"])(err);
        })));
    };
    V4GameService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4GameService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4GameService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4GameService_Factory() { return new V4GameService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4GameService, providedIn: "root" });
    return V4GameService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        if ((this.lastX === null) && (this.lastY === null) && (this.lastZ === null)) {
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
            this.getCurrentShakeAction(this.n).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["delay"])(100)).subscribe((/**
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
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('shake');
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])('');
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
                    styles: [".tree__img{display:block;max-width:100%;max-height:100%;margin:auto}.gift-wrapper{display:inline-block;position:absolute;max-width:40px;width:12%;height:100%;top:0;background:0 0}.gift-img{display:block;width:100%;height:auto;position:absolute;left:0}.shake-tree-container{position:relative;height:100%;width:100%;display:block;text-align:center;overflow:hidden}.shake-tree-container .tree{max-height:100%;max-width:100%;display:inline-block;position:relative;height:100%}.shake-tree-container .tree.shake{-webkit-animation:.4s cubic-bezier(.36,.07,.19,.97) both shake;animation:.4s cubic-bezier(.36,.07,.19,.97) both shake}.shake-tree-container .tree .gift-wrapper.drop{transition:.5s ease-in}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__1{-webkit-transform:translateY(70%);transform:translateY(70%)}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__2{-webkit-transform:translateY(60%);transform:translateY(60%)}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__3{-webkit-transform:translateY(45%);transform:translateY(45%)}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__4{-webkit-transform:translateY(43%);transform:translateY(43%);z-index:2}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__5{-webkit-transform:translateY(64%);transform:translateY(64%);z-index:2}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__6{-webkit-transform:translateY(59%);transform:translateY(59%);z-index:3}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__7{-webkit-transform:translateY(75%);transform:translateY(75%);z-index:2}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__8{-webkit-transform:translateY(49%);transform:translateY(49%);z-index:3}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__9{-webkit-transform:translateY(54%);transform:translateY(54%);z-index:1}.shake-tree-container .tree .gift-wrapper.drop.gift-wrapper__10{-webkit-transform:translateY(59%);transform:translateY(59%)}.shake-tree-container .tree .gift-wrapper__1{left:35%}.shake-tree-container .tree .gift-wrapper__1 .gift-img__1{top:18%}.shake-tree-container .tree .gift-wrapper__2{left:60%}.shake-tree-container .tree .gift-wrapper__2 .gift-img__2{top:28%}.shake-tree-container .tree .gift-wrapper__3{left:31%;z-index:3}.shake-tree-container .tree .gift-wrapper__3 .gift-img__3{top:46%}.shake-tree-container .tree .gift-wrapper__4{left:73%}.shake-tree-container .tree .gift-wrapper__4 .gift-img__4{top:45%}.shake-tree-container .tree .gift-wrapper__5{left:24%}.shake-tree-container .tree .gift-wrapper__5 .gift-img__5{top:25%}.shake-tree-container .tree .gift-wrapper__6{left:75%}.shake-tree-container .tree .gift-wrapper__6 .gift-img__6{top:32%}.shake-tree-container .tree .gift-wrapper__7{left:55%}.shake-tree-container .tree .gift-wrapper__7 .gift-img__7{top:14%}.shake-tree-container .tree .gift-wrapper__8{left:57%}.shake-tree-container .tree .gift-wrapper__8 .gift-img__8{top:41%}.shake-tree-container .tree .gift-wrapper__9{left:15%}.shake-tree-container .tree .gift-wrapper__9 .gift-img__9{top:36%}.shake-tree-container .tree .gift-wrapper__10{left:40%}.shake-tree-container .tree .gift-wrapper__10 .gift-img__10{top:32%}.man{display:block;width:100%;height:20%;position:absolute;bottom:0;left:0}.man__img{height:100%;position:absolute}@-webkit-keyframes shake{10%,90%{-webkit-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0)}20%,80%{-webkit-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0)}30%,50%,70%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}40%,60%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}@keyframes shake{10%,90%{-webkit-transform:translate3d(-1px,0,0);transform:translate3d(-1px,0,0)}20%,80%{-webkit-transform:translate3d(2px,0,0);transform:translate3d(2px,0,0)}30%,50%,70%{-webkit-transform:translate3d(-10px,0,0);transform:translate3d(-10px,0,0)}40%,60%{-webkit-transform:translate3d(10px,0,0);transform:translate3d(10px,0,0)}}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function gameServiceFactory(http, config) {
    // Make decision on what to instantiate base on config
    return new V4GameService(http, config);
}
var GameModule = /** @class */ (function () {
    function GameModule() {
    }
    GameModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: [
                        ShakeTreeComponent,
                        PinataComponent
                    ],
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClientModule"]
                    ],
                    providers: [
                        {
                            provide: IGameService,
                            useFactory: gameServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config]
                        }
                    ],
                    exports: [
                        ShakeTreeComponent,
                        PinataComponent
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
                    template: "<ng-container *ngIf=\"profile\">\n    <perx-core-micro-profile [profile]=\"profile\"></perx-core-micro-profile>\n    <div class=\"profile-item\">\n        <div class=\"profile-item_label\">\n            Player Code\n        </div>\n        <div class=\"profile-item_detail\">\n            {{profile.customProperties['code']}}\n        </div>\n    </div>\n    <div class=\"profile-item\">\n        <div class=\"profile-item_label\">\n            Card Last 4 Digit\n        </div>\n        <div class=\"profile-item_detail\">\n            {{profile.customProperties['last_4']}}\n        </div>\n    </div>\n</ng-container>",
                    styles: [":host{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;width:100%}perx-core-micro-profile{margin-bottom:1rem}.profile-item{display:block;width:100%;height:4.4rem;margin:0 0 1rem;padding:0 1rem;background-color:#ebebeb;overflow:hidden;box-sizing:border-box}.profile-item_label{font-size:1.2rem;line-height:2.1rem;color:#7d7d89;white-space:nowrap;text-overflow:ellipsis;width:100%;overflow:hidden}.profile-item_detail{font-size:1.4rem;line-height:2.3rem;color:#1b1b25;white-space:nowrap;text-overflow:ellipsis;width:100%;overflow:hidden}"]
                }] }
    ];
    UserProfileComponent.propDecorators = {
        profile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return UserProfileComponent;
}());

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
                    styles: [".user{display:-webkit-flex;display:flex;-webkit-align-items:center;align-items:center}.user-icon{font-size:4.4rem;height:4.4rem;width:4.4rem}.name{-webkit-flex-grow:1;flex-grow:1;text-align:left;font-size:1.8rem;font-weight:500;margin-left:1rem}"]
                }] }
    ];
    MicroProfileComponent.propDecorators = {
        profile: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return MicroProfileComponent;
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
function profileServiceFactory(http, config) {
    // Make decision on what to instantiate base on config
    return new V4ProfileService(http, config);
}
var ProfileModule = /** @class */ (function () {
    function ProfileModule() {
    }
    ProfileModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"]
                    ],
                    providers: [
                        {
                            provide: ProfileService,
                            useFactory: profileServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    V4LoyaltyService.prototype.getLoyalties = /**
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    function (page, pageSize) {
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 25; }
        return this.http.get(this.apiHost + "/v4/loyalty", {
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
     * @return {?}
     */
    V4LoyaltyService.prototype.getLoyalty = /**
     * @param {?=} id
     * @return {?}
     */
    function (id) {
        if (!id) {
            id = 1;
        }
        return this.http.get(this.apiHost + "/v4/loyalty/" + id).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return V4LoyaltyService.v4LoyaltyToLoyalty(res.data); })));
    };
    /**
     * @param {?=} loyaltyId
     * @return {?}
     */
    V4LoyaltyService.prototype.getAllTransactions = /**
     * @param {?=} loyaltyId
     * @return {?}
     */
    function (loyaltyId) {
        var _this = this;
        if (!loyaltyId) {
            loyaltyId = 1;
        }
        /** @type {?} */
        var pageSize = 100;
        return this.getTransactions(loyaltyId, 1, pageSize).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} histories
         * @return {?}
         */
        function (histories) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(histories)
            ];
            for (var i = 2; i <= _this.historyMeta.total_pages; i++) {
                /** @type {?} */
                var stream = _this.getTransactions(loyaltyId, i, pageSize);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["concatAll"])(), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["reduce"])((/**
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
     * @return {?}
     */
    V4LoyaltyService.prototype.getTransactions = /**
     * @param {?} loyaltyId
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    function (loyaltyId, page, pageSize) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 25; }
        return this.http.get(this.apiHost + "/v4/loyalty/" + loyaltyId + "/transactions", {
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.meta) {
                _this.historyMeta = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.historyMeta, res.meta);
            }
            return res.data;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} loyalty
         * @return {?}
         */
        function (loyalty) { return loyalty.points_history.map((/**
         * @param {?} history
         * @return {?}
         */
        function (history) { return V4LoyaltyService.v4PointHistoryToPointHistory(history); })); })));
    };
    V4LoyaltyService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4LoyaltyService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Optional"] }] }
    ]; };
    /** @nocollapse */ V4LoyaltyService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4LoyaltyService_Factory() { return new V4LoyaltyService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config, 8)); }, token: V4LoyaltyService, providedIn: "root" });
    return V4LoyaltyService;
}(LoyaltyService));

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
             * @param {?} loyalty
             * @return {?}
             */
            function (loyalty) {
                return "Your total points as of " + _this.datePipe.transform(loyalty.endDate, 'd MMM y');
            });
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
                return expiringPoints && expiringPoints.expireDate && expiringPoints.points ?
                    expiringPoints.points + " points will expire on " + _this.datePipe.transform(expiringPoints.expireDate, 'd MMM y') : '';
            });
        }
        if (!this.profile$) {
            this.profile$ = this.profileService.whoAmI();
        }
        if (!this.loyalty$) {
            this.loyalty$ = this.loyaltyId === undefined ?
                this.loyaltyService.getLoyalties().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
                 * @param {?} loyalties
                 * @return {?}
                 */
                function (loyalties) { return loyalties && loyalties.length > 0 && loyalties[0]; }))) : this.loyaltyService.getLoyalty(this.loyaltyId);
        }
    };
    LoyaltySummaryComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-loyalty-summary',
                    template: "<div class=\"container\">\n  <ng-container *ngIf=\"profile$ | async as profile; else elseBlockProfile\">\n    <div class=\"welcome-text\">\n      <ng-container>\n        {{titleFn(profile)}}\n      </ng-container>\n    </div>\n  </ng-container>\n  <ng-container *ngIf=\"loyalty$ | async as loyalty; else elseBlockLoyalty\">\n    <div class=\"points\">\n      {{loyalty.pointsBalance ? loyalty.pointsBalance.toLocaleString('en-sg') : 0 }}\n    </div>\n    <div *ngIf=\"loyalty.currencyBalance\">\n      {{subTitleFn(loyalty)}} {{loyalty.currencyBalance}}\n    </div>\n    <div class=\"expiring-points\">\n      {{summaryExpiringFn(loyalty)}}\n    </div>\n  </ng-container>\n\n  <ng-template #elseBlockProfile>\n    <div class=\"welcome-text ghost\"></div>\n  </ng-template>\n\n  <ng-template #elseBlockLoyalty>\n    <div class=\"points ghost\"></div>\n    <div class=\"expiring-points ghost\"></div>\n  </ng-template>\n</div>\n",
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
            function (tr) {
                return "" + tr.name;
            });
        }
        if (!this.subTitleFn) {
            this.subTitleFn = (/**
             * @param {?} tr
             * @return {?}
             */
            function (tr) {
                return "" + _this.datePipe.transform(tr.earnedDate, 'dd/MM/yyyy');
            });
        }
        if (!this.priceLabelFn) {
            this.priceLabelFn = (/**
             * @param {?} tr
             * @return {?}
             */
            function (tr) {
                return "" + _this.transactionPipe.transform(tr.points);
            });
        }
    };
    LoyaltyTransactionsListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-loyalty-transactions-list',
                    template: "<ng-container *ngIf=\"transactions$ | async as transactions\">\n  <div *ngFor=\"let transaction of transactions\" class=\"transaction\">\n    <div class=\"transaction-info\">\n      <div *ngIf=\"transaction.name\" class=\"transaction-name\">\n        {{titleFn(transaction)}}\n      </div>\n      <div *ngIf=\"transaction.description\" class=\"transaction-description\">\n        {{transaction.description}}\n      </div>\n      <div class=\"transaction-point\">\n       {{transaction.points}} {{priceLabelFn(transaction)}}\n      </div>\n    </div>\n    <div class=\"transaction-date\">\n      {{subTitleFn(transaction)}}\n    </div>\n  </div>\n</ng-container>\n",
                    styles: ["cdk-virtual-scroll-viewport{height:100%}.transaction{display:-webkit-flex;display:flex;border-bottom:1px solid rgba(0,0,0,.12);height:10rem;-webkit-flex-direction:row;flex-direction:row;-webkit-align-items:center;align-items:center;box-sizing:border-box;padding:0 1.6rem;position:relative}.transaction-info{-webkit-flex:2 1 0;flex:2 1 0}.transaction-name{font-size:1.4rem;line-height:1.7rem;font-weight:900}.transaction-description{font-size:1.2rem;line-height:2.1rem}.transaction-point{font-size:1.2rem;line-height:1.4rem;letter-spacing:.2px;color:#ddac28;margin-top:1.6rem}.transaction-date{-webkit-flex:1 1 0;flex:1 1 0;font-size:1.2rem;line-height:2.1rem;text-align:right}"]
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
        subTitleFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        priceLabelFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return LoyaltyTransactionsListComponent;
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
function loyaltyServiceFactory(http, config) {
    // Make decision on what to instantiate base on config
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
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"]
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
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config]
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
var RewardsCollectionComponent = /** @class */ (function () {
    function RewardsCollectionComponent() {
        this.repeatGhostCount = 10;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    // constructor() {
    // }
    // constructor() {
    // }
    /**
     * @return {?}
     */
    RewardsCollectionComponent.prototype.ngOnInit = 
    // constructor() {
    // }
    /**
     * @return {?}
     */
    function () {
        if (!this.displayPriceFn) {
            this.displayPriceFn = (/**
             * @param {?} rewardPrice
             * @return {?}
             */
            function (rewardPrice) {
                if (rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points > 0) {
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
                    template: "<div [class]=\" rewards$ ? 'card-collection-container' : 'card-collection-container loading'\">\n  <ng-container *ngIf=\"rewards$ | async as rewards; else elseBlock\">\n    <mat-card matRipple *ngFor=\"let reward of rewards\" (click)=\"rewardClickedHandler(reward)\">\n      <img mat-card-image *ngIf=\"reward.rewardThumbnail || defaultImg\" [class.no-image]=\"!reward.rewardThumbnail\"\n        [src]=\"reward.rewardThumbnail || defaultImg\" />\n      <div class=\"no-default-img\" mat-card-image *ngIf=\"!reward.rewardThumbnail && !defaultImg\">\n        <svg width=\"375\" height=\"200\" viewBox=\"0 0 375 200\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n          <path d=\"M0 0H375V200H0V0Z\" fill=\"#4E4E4E\" />\n          <path\n            d=\"M190.4 90.1401L184.5 98.0001L189 104C189.66 104.88 189.48 106.14 188.6 106.8C187.72 107.46 186.46 107.3 185.8 106.4C183.7 103.6 181.18 100.26 179.6 98.1201C178.8 97.0601 177.2 97.0601 176.4 98.1201L168.4 108.78C167.42 110.12 168.36 112 170 112H206C207.64 112 208.58 110.12 207.6 108.8L193.6 90.1401C192.8 89.0601 191.2 89.0601 190.4 90.1401Z\"\n            fill=\"white\" />\n        </svg>\n      </div>\n      <mat-card-content>\n        <div class=\"subtitle-1\" ngxEllipsis [lines]=\"1\">{{reward.name}}</div>\n        <!--\n        have to repeat div declaration because the directive reads the\n        dom to insert ellipsis and will otherwise render angular logic code\n        -->\n        <div *ngIf=\"reward.description; else showMerchantName\">\n          <!-- <div class=\"description mat-caption\" ngxEllipsis [lines]=\"2\">\n            {{reward.description}}\n          </div> -->\n          <div class=\"description mat-caption\"> {{reward.description | slice: 0 : 16}}</div>\n          <div class=\"description mat-caption overflow-text\" *ngIf=\"reward.description.length > 16\">\n            {{ reward.description | slice : 16 }}</div>\n        </div>\n        <ng-template #showMerchantName>\n          <div class=\"description mat-caption\" ngxEllipsis [lines]=\"2\">\n            {{reward.merchantName}}\n          </div>\n        </ng-template>\n        <div *ngIf=\"reward.rewardPrice &&\n                reward.rewardPrice.length > 0\" class=\"points overline\">\n          <div *ngFor=\"let rewardPrice of reward.rewardPrice\">\n            {{displayPriceFn(rewardPrice)}}</div>\n        </div>\n      </mat-card-content>\n    </mat-card>\n  </ng-container>\n  <ng-template #elseBlock>\n    <mat-card *perxCoreRepeatTimes=\"repeatGhostCount\">\n      <div class=\"img-placeholder ghost\"></div>\n      <mat-card-content>\n        <div class=\"subtitle-1 ghost\"></div>\n        <div class=\"description mat-caption ghost\"></div>\n        <div class=\"points overline ghost\"></div>\n      </mat-card-content>\n    </mat-card>\n  </ng-template>\n</div>\n",
                    styles: [".mat-caption{line-height:1.6rem;color:#666}.overline{font-size:1rem;line-height:1.6rem;color:#666}.subtitle-1{font-weight:500;font-size:1.6rem;line-height:2.4rem;color:#212121}.ghost{background:#ededed}.mat-card-content .title{-webkit-flex:0 auto;flex:0 auto;margin:0 0 .5rem;color:#212121}.mat-card-content .description{-webkit-flex:1;flex:1}.mat-card-content .points{-webkit-flex:0 auto;flex:0 auto;position:absolute;bottom:.8rem;font-size:1rem;line-height:1.2rem;min-height:1.2rem;color:#ddac27;white-space:nowrap}.card-collection-container.loading,.card-collection-container.loading .ghost{overflow:hidden}.card-collection-container.loading .img-placeholder{min-height:calc(100px - .8rem);margin-bottom:.8rem}.card-collection-container.loading .subtitle-1{height:1.5rem;margin-bottom:.5rem}.card-collection-container.loading .points{height:1.2rem;margin-top:.9rem}.card-collection-container{display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;overflow-x:auto;padding:1.5rem 0}.card-collection-container .mat-card{max-width:calc(200px - 32px);width:calc(200px - 32px);min-width:calc(200px - 32px);height:calc(200px - 24px);min-height:calc(200px - 24px);display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;padding-bottom:8px;margin:0 1rem}.card-collection-container .mat-card img.mat-card-image{width:auto;height:100px;max-height:100px;margin-bottom:.8rem;object-fit:contain}.card-collection-container .mat-card .mat-card-content{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column}.card-collection-container .no-image{background-color:#4e4e4e}.card-collection-container .no-default-img{display:-webkit-flex;display:flex;margin-bottom:.8rem}.card-collection-container .no-default-img svg{height:10rem;background:#4e4e4e}.card-collection-container .overflow-text{white-space:nowrap;overflow:hidden;text-overflow:ellipsis}"]
                }] }
    ];
    RewardsCollectionComponent.propDecorators = {
        rewards$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['rewardsList',] }],
        defaultImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        displayPriceFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return RewardsCollectionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RewardsListComponent = /** @class */ (function () {
    function RewardsListComponent() {
        this.repeatGhostCount = 10;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    // constructor() {
    // }
    // constructor() {
    // }
    /**
     * @return {?}
     */
    RewardsListComponent.prototype.ngOnInit = 
    // constructor() {
    // }
    /**
     * @return {?}
     */
    function () {
        if (!this.displayPriceFn) {
            this.displayPriceFn = (/**
             * @param {?} rewardPrice
             * @return {?}
             */
            function (rewardPrice) {
                if (rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points > 0) {
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
                    template: "<div [class]=\" rewards$ ? 'card-list-container' : 'card-list-container loading'\">\n  <div *ngIf=\"rewards$; then thenBlock else elseBlock\"></div>\n  <ng-template #thenBlock>\n    <ng-container *ngIf=\"rewards$ | async as rewards\">\n      <mat-card matRipple *ngFor=\"let reward of rewards\" (click)=\"rewardClickedHandler(reward)\">\n        <div class=\"reward-content\">\n          <div class=\"reward-img__wrapper\">\n            <img *ngIf=\"reward.rewardThumbnail || defaultImg\"\n                 [class.no-image]=\"!reward.rewardThumbnail\"\n                 [src]=\"reward.rewardThumbnail || defaultImg\"/>\n            <div *ngIf=\"!reward.rewardThumbnail && !defaultImg\">\n              <svg width=\"375\" height=\"200\" viewBox=\"0 0 375 200\" fill=\"none\" xmlns=\"http://www.w3.org/2000/svg\">\n                <path d=\"M0 0H375V200H0V0Z\" fill=\"#4E4E4E\"/>\n                <path d=\"M190.4 90.1401L184.5 98.0001L189 104C189.66 104.88 189.48 106.14 188.6 106.8C187.72 107.46 186.46 107.3 185.8 106.4C183.7 103.6 181.18 100.26 179.6 98.1201C178.8 97.0601 177.2 97.0601 176.4 98.1201L168.4 108.78C167.42 110.12 168.36 112 170 112H206C207.64 112 208.58 110.12 207.6 108.8L193.6 90.1401C192.8 89.0601 191.2 89.0601 190.4 90.1401Z\" fill=\"white\"/>\n              </svg>\n            </div>\n          </div>\n          <div class=\"reward-preview-details\">\n            <h1>{{ reward.name }}</h1>\n            <p [innerHtml]=\"reward.subtitle\"></p>\n            <div class=\"reward-price-details\">\n              <div *ngIf=\"reward.rewardPrice &&\n                  reward.rewardPrice.length > 0\">\n                <div *ngFor=\"let rewardPrice of reward.rewardPrice\">\n                  {{displayPriceFn(rewardPrice)}}\n                </div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </mat-card>\n    </ng-container>\n  </ng-template>\n  <ng-template #elseBlock>\n    <mat-card *perxCoreRepeatTimes=\"repeatGhostCount\">\n      <div class=\"reward-content\">\n        <div class=\"reward-img__wrapper\">\n          <div class=\"img-placeholder ghost\"></div>\n        </div>\n        <div class=\"reward-preview-details\">\n          <div class=\"reward-name ghost\"></div>\n          <div class=\"reward-subtitle ghost\"></div>\n          <div class=\"reward-price-details ghost\"></div>\n        </div>\n      </div>\n    </mat-card>\n  </ng-template>\n</div>\n",
                    styles: [".reward-content{display:-webkit-flex;display:flex;-webkit-flex-basis:auto;flex-basis:auto;-webkit-flex-grow:1;flex-grow:1;-webkit-justify-content:flex-start;justify-content:flex-start}.reward-content .reward-img__wrapper{-webkit-flex:0 0 10.5rem;flex:0 0 10.5rem;height:10.5rem;width:10.5rem;display:-webkit-flex;display:flex;-webkit-justify-content:center;justify-content:center;overflow:hidden}.reward-content .reward-img__wrapper img{margin:auto;height:10.5rem}.reward-content .reward-img__wrapper .no-image{background-color:#4e4e4e}.reward-content .reward-img__wrapper svg{height:10.5rem;background:#4e4e4e}.reward-content .reward-preview-details{font-size:1.4rem;display:-webkit-flex;display:flex;margin:1.6rem 1.6rem .8rem;padding-left:0;-webkit-flex-direction:column;flex-direction:column;-webkit-flex:1;flex:1}.reward-content .reward-preview-details:nth-child(1){margin-top:0}.reward-content .reward-preview-details h1{font-size:1.6rem;line-height:1.6rem;padding:0;font-weight:500;margin:4px 0}.reward-content .reward-preview-details p{font-size:1.2rem;line-height:1.6rem;min-height:1.6rem;margin:4px 0;padding:0}.reward-content .reward-preview-details .reward-price-details{font-size:1rem;line-height:1.4rem;min-height:1.4rem;color:#ddac27;-webkit-align-content:flex-end;align-content:flex-end;margin-top:auto}.card-list-container{padding:0 1.5rem}.card-list-container.loading,.card-list-container.loading .ghost{overflow:hidden}.card-list-container.loading .reward-content .reward-img__wrapper .img-placeholder{height:100%;width:100%}.card-list-container.loading .reward-content .reward-preview-details .reward-name,.card-list-container.loading .reward-content .reward-preview-details .reward-subtitle{height:1.6rem;margin:.4rem 0}.card-list-container.loading .reward-content .reward-preview-details .reward-price-details{height:1.4rem}mat-card{margin:1.2rem 0;display:-webkit-flex;display:flex;padding:0;-webkit-flex:0 0 10.5rem;flex:0 0 10.5rem;height:10.5rem;cursor:pointer;-webkit-align-items:center;align-items:center;-webkit-justify-content:space-between;justify-content:space-between}mat-card.disabled{background-color:#ebebeb;pointer-events:none;opacity:.5}.badge-warn{background-color:rgba(228,39,19,.1);padding:2px 4px;font-size:1.2rem;border-radius:8px}"]
                }] }
    ];
    RewardsListComponent.propDecorators = {
        rewards$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['rewardsList',] }],
        defaultImg: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        displayPriceFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        tapped: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return RewardsListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RewardsListTabbedComponent = /** @class */ (function () {
    function RewardsListTabbedComponent() {
        this.tabs$ = Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])([
            {
                filterKey: null,
                filterValue: null,
                tabName: 'All Rewards',
                rewardsList: null
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
                if (rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points > 0) {
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
        return rewardsList.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} rewards
         * @return {?}
         */
        function (rewards) { return tab.filterValue === null || tab.filterKey === null ? rewards : rewards.filter((/**
         * @param {?} reward
         * @return {?}
         */
        function (reward) {
            /** @type {?} */
            var filterBy = tab.filterKey;
            return reward["" + filterBy] &&
                reward["" + filterBy].toLowerCase() === tab.filterValue.toLowerCase();
        })); })));
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var RewardComponent = /** @class */ (function () {
    function RewardComponent() {
        this.showRewardIdentifier = false;
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
                if (rewardPrice.price > 0) {
                    return rewardPrice.currencyCode + " " + rewardPrice.price;
                }
                if (rewardPrice.points > 0) {
                    return rewardPrice.points + " points";
                }
                return '0 points'; // is actually 0 or invalid value default
            });
        }
    };
    RewardComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-reward',
                    template: "<ng-container *ngIf=\"reward$ | async as reward\">\n  <div class=\"reward-container\">\n    <div class=\"reward-image-container\" *ngIf=\"reward.rewardBanner\">\n      <img class=\"reward-image\" src=\"{{reward.rewardBanner}}\">\n    </div>\n    <div class=\"merchant-image-container\" *ngIf=\"reward.merchantImg\">\n      <img class=\"merchant-image\" src=\"{{reward.merchantImg}}\">\n    </div>\n    <div class=\"details\">\n      <div class=\"reward-name\">\n        {{reward.name}}\n      </div>\n      <div class=\"merchant-name\">\n        {{reward.merchantName}}\n      </div>\n      <div class=\"reward-subtitle\" *ngIf=\"reward.subtitle\">\n        {{reward.subtitle}}\n      </div>\n      <div class=\"reward-price\" *ngIf=\"reward.rewardPrice && reward.rewardPrice.length > 0\">\n        <div class=\"points-cost\" *ngFor=\"let rewardPrice of reward.rewardPrice; let i = index\">\n          <div *ngIf=\"i > 0\" class=\"or-label\">or</div>\n          <span>{{displayPriceFn(rewardPrice)}}</span><span class=\"points-code\" *ngIf=\"showRewardIdentifier && rewardPrice.identifier\"> (code: {{rewardPrice.identifier}})</span>\n        </div>\n      </div>\n      <div class=\"reward-expiry\" *ngIf=\"reward.validTo !== null\">\n        Expiry: {{reward.validTo | date: 'dd/MM/yyyy'}}\n      </div>\n      <div class=\"section-heading\" *ngIf=\"reward.description\">\n        Description\n      </div>\n      <div class=\"section-content\" *ngIf=\"reward.description\">\n        <div [innerHtml]=\"reward.description\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"reward.termsAndConditions\">\n        Terms and Conditions\n      </div>\n      <div class=\"section-content\" *ngIf=\"reward.termsAndConditions\">\n        <div [innerHtml]=\"reward.termsAndConditions\"></div>\n      </div>\n      <div class=\"section-heading\" *ngIf=\"reward.howToRedeem\">\n        How to redeem\n      </div>\n      <div class=\"section-content\" *ngIf=\"reward.howToRedeem\">\n        <div [innerHtml]=\"reward.howToRedeem\"></div>\n      </div>\n    </div>\n  </div>\n</ng-container>\n",
                    styles: [".reward-container{margin:0 auto;background:#fff;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;height:100%;max-width:60rem}.reward-image-container{position:relative;padding-top:53.33%}.reward-image-container .reward-image{position:absolute;left:0;top:0;width:100%;height:100%;object-fit:cover}.merchant-image-container{position:relative;padding-top:26.67%;margin-top:-13.33%}.merchant-image-container .merchant-image{border-radius:50%;border:.2rem solid #fff;box-shadow:0 3px 5px -1px rgba(0,0,0,.2),0 6px 10px 0 rgba(0,0,0,.14),0 1px 18px 0 rgba(0,0,0,.12);position:absolute;left:36.8%;top:0;width:26.67%;height:100%;box-sizing:border-box}.details{padding:0 1.2rem 1.5rem}.details .reward-name{margin-top:1.5rem;font-size:1.8rem;text-align:center}.details .reward-subtitle{margin-top:1.5rem;text-align:center;color:#858585}.details .merchant-name{margin-top:1.5rem;font-size:1.8rem;text-align:center;color:#858585}.details .reward-price{margin-top:1rem;font-size:1.6rem;text-align:center;color:#858585}.details .reward-price .points-cost{font-size:1.2rem;line-height:1.4rem}.details .reward-price .points-cost .points-code{color:#858585}.details .reward-expiry{margin-top:1rem;font-size:1.6rem;text-align:center;color:#858585}.details .section-heading{margin-top:3rem;font-size:1.4rem;font-weight:700;line-height:2rem}.details .section-content{font-size:1.4rem;line-height:2rem}"]
                }] }
    ];
    RewardComponent.propDecorators = {
        reward$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['reward',] }],
        displayPriceFn: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        showRewardIdentifier: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return RewardComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var WhistlerRewardsService = /** @class */ (function () {
    function WhistlerRewardsService(http, config) {
        this.http = http;
        this.baseUrl = config.apiHost + "/reward/entities/";
    }
    /**
     * @private
     * @param {?} r
     * @return {?}
     */
    WhistlerRewardsService.WRewardToReward = /**
     * @private
     * @param {?} r
     * @return {?}
     */
    function (r) {
        return {
            // @ts-ignore
            id: (typeof r.id) === 'string' ? Number.parseInt(r.id, 10) : r.id,
            name: r.attributes.name,
            description: r.attributes.description,
            subtitle: '',
            validFrom: new Date(r.attributes.created_at),
            validTo: null,
            rewardThumbnail: r.attributes.image_url,
            rewardBanner: r.attributes.image_url,
            merchantImg: r.attributes.image_url,
            rewardPrice: [
            // {
            //   id: 0,
            //   price: r.attributes.cost_of_reward
            // }
            ],
            termsAndConditions: r.attributes.terms_conditions,
            howToRedeem: '',
            categoryTags: [
                {
                    id: 0,
                    title: r.attributes.category
                }
            ],
        };
    };
    /**
     * @return {?}
     */
    WhistlerRewardsService.prototype.getTags = /**
     * @return {?}
     */
    function () {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    WhistlerRewardsService.prototype.getAllRewards = 
    // @ts-ignore
    /**
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    function (tags, categories) {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} page
     * @param {?} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    WhistlerRewardsService.prototype.getRewards = 
    // @ts-ignore
    /**
     * @param {?} page
     * @param {?} pageSize
     * @param {?=} tags
     * @param {?=} categories
     * @return {?}
     */
    function (page, pageSize, tags, categories) {
        throw new Error('Method not implemented.');
    };
    // @ts-ignore
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @param {?=} params
     * @return {?}
     */
    WhistlerRewardsService.prototype.reserveReward = 
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
     * @return {?}
     */
    WhistlerRewardsService.prototype.issueReward = 
    // @ts-ignore
    /**
     * @param {?} rewardId
     * @return {?}
     */
    function (rewardId) {
        throw new Error('Method not implemented.');
    };
    /**
     * @param {?} id
     * @return {?}
     */
    WhistlerRewardsService.prototype.getReward = /**
     * @param {?} id
     * @return {?}
     */
    function (id) {
        return this.http.get("" + this.baseUrl + id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return WhistlerRewardsService.WRewardToReward(res.data); })));
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
    // @ts-ignore
    // @ts-ignore
    /**
     * @return {?}
     */
    WhistlerRewardsService.prototype.getAllCatalogs = 
    // @ts-ignore
    /**
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
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ WhistlerRewardsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function WhistlerRewardsService_Factory() { return new WhistlerRewardsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: WhistlerRewardsService, providedIn: "root" });
    return WhistlerRewardsService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var components$2 = [
    RewardsCollectionComponent,
    RewardsListComponent,
    RewardsListTabbedComponent,
    RewardComponent
];
/**
 * @param {?} http
 * @param {?} vouchersService
 * @param {?} config
 * @return {?}
 */
function rewardsServiceFactory(http, vouchersService, config) {
    if (config.isWhistler) {
        return new WhistlerRewardsService(http, config);
    }
    // Make decision on what to instantiate base on config
    return new V4RewardsService(http, vouchersService, config);
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
                        ngx_multi_line_ellipsis__WEBPACK_IMPORTED_MODULE_11__["NgxMultiLineEllipsisModule"],
                        UtilsModule
                    ],
                    exports: Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(components$2),
                    providers: [
                        {
                            provide: RewardsService,
                            useFactory: rewardsServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], IVoucherService, Config]
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
    LocationsListComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-locations-list',
                    template: "<mat-list>\n  <div *ngFor=\"let location of locations | async\">\n    <mat-list-item>\n      <h3 matLine>{{location.name}}</h3>\n      <small matLine>{{location.address}}</small>\n      <div matLine>\n        <div class=\"links\">\n          <a class=\"links-phone\" href=\"tel:{{location.phone}}\">{{location.phone}}</a>\n          <a class=\"links-location\" target=\"_blank\" [href]=\"gMapUrl(location)\">View location</a>\n        </div>\n      </div>\n    </mat-list-item>\n    <mat-divider></mat-divider>\n  </div>\n</mat-list>",
                    styles: ["h3{font-size:1.4rem;line-height:1.7rem;font-weight:900}small{text-overflow:ellipsis;white-space:nowrap;overflow:hidden;font-size:1.2rem;line-height:2.1rem}.links{display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:space-between;justify-content:space-between;text-overflow:ellipsis;white-space:nowrap;overflow:hidden;margin-top:1.6rem}.links a{color:#0f69af;-webkit-align-self:baseline;align-self:baseline;text-decoration:none}.links-phone{font-size:1.4rem;line-height:2.5rem}.links-location{font-size:1.2rem;line-height:2.1rem}"]
                }] }
    ];
    LocationsListComponent.propDecorators = {
        locations: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }]
    };
    return LocationsListComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GeoLocationService = /** @class */ (function () {
    function GeoLocationService() {
        this.subject = new rxjs__WEBPACK_IMPORTED_MODULE_3__["BehaviorSubject"](null);
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LocationsMapComponent = /** @class */ (function () {
    function LocationsMapComponent(geoLocationService) {
        this.geoLocationService = geoLocationService;
        this.markersArray = [];
        this.userLocation = new rxjs__WEBPACK_IMPORTED_MODULE_3__["Subject"]();
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
        this.userLocation.subscribe((/**
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
            _this.geoLocationService.positions().subscribe((/**
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
        var url = 'http://maps.googleapis.com/maps/api/js';
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
                icon: 'http://maps.google.com/mapfiles/kml/paddle/blu-blank-lv.png',
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
            this.locations.subscribe((/**
             * @param {?} locations
             * @return {?}
             */
            function (locations) {
                _this.clearMarkers();
                locations.map((/**
                 * @param {?} location
                 * @return {?}
                 */
                function (location) {
                    /** @type {?} */
                    var latLng = new google.maps.LatLng({ lat: location.latitude, lng: location.longitude });
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
                    return marker;
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
            bbox = bbox.extend(marker.getPosition());
        }));
        if (this.userMarker) {
            bbox.extend(this.userMarker.getPosition());
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
    LocationsMapComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-locations-map',
                    template: "<div #gmap class=\"map\"></div>\n\n<div class=\"loc-card-container\">\n  <mat-card *ngIf=\"current\" class=\"loc-card mat-elevation-z8\">\n    <mat-card-title>{{current.name}}</mat-card-title>\n    <mat-card-subtitle>{{current.address}}</mat-card-subtitle>\n    <mat-card-content>\n      <a class=\"phone\" href=\"tel:{{current.phone}}\">\n        <mat-icon>phone</mat-icon>{{current.phone}}\n      </a>\n      <a class=\"location\" target=\"_blank\" [href]=\"gMapUrl(current)\">View location</a>\n    </mat-card-content>\n  </mat-card>\n</div>",
                    styles: [":host{display:block;height:100%}.map{width:100%;height:100%}.loc-card-container{width:100%;position:absolute;bottom:0;z-index:2}.loc-card-container .loc-card{background-color:#fff;margin:0 2rem 2rem}mat-card-content{display:-webkit-flex;display:flex;-webkit-flex-direction:row;flex-direction:row;-webkit-justify-content:space-between;justify-content:space-between;margin-top:1.6rem}mat-card-content a{color:#0f69af;-webkit-align-self:baseline;align-self:baseline;text-decoration:none}mat-card-content .phone{display:-webkit-flex;display:flex;font-size:1.4rem;line-height:2.5rem}mat-card-content .phone mat-icon{font-size:1.4rem;height:1.4rem;width:1.4rem;line-height:2.5rem}mat-card-content .location{font-size:1.2rem;line-height:2.1rem}"]
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var V4LocationsService = /** @class */ (function (_super) {
    Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__extends"])(V4LocationsService, _super);
    function V4LocationsService(http, config) {
        var _this = _super.call(this) || this;
        _this.http = http;
        _this.historyMeta = {};
        _this.apiHost = (/** @type {?} */ (config.apiHost));
        return _this;
    }
    /**
     * @param {?=} tags
     * @return {?}
     */
    V4LocationsService.prototype.getAll = /**
     * @param {?=} tags
     * @return {?}
     */
    function (tags) {
        var _this = this;
        if (tags === undefined) {
            tags = [];
        }
        return this.getAllMerchants().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
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
                    if (merchant.tags) {
                        found = tags.some((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        function (tag) { return merchant.tags.map((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) { return t.name.toLowerCase(); })).includes(tag.toLowerCase()); }));
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
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(5), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []));
    };
    /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @return {?}
     */
    V4LocationsService.prototype.getLocations = /**
     * @param {?=} page
     * @param {?=} pageSize
     * @param {?=} tags
     * @return {?}
     */
    function (page, pageSize, tags) {
        var _this = this;
        if (page === undefined) {
            page = 1;
        }
        if (pageSize === undefined) {
            pageSize = 25;
        }
        if (tags) {
            tags = [];
        }
        return this.getMerchants(page, pageSize).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
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
                    if (merchant.tags) {
                        found = tags.some((/**
                         * @param {?} tag
                         * @return {?}
                         */
                        function (tag) { return merchant.tags.map((/**
                         * @param {?} t
                         * @return {?}
                         */
                        function (t) { return t.name.toLowerCase(); })).includes(tag.toLowerCase()); }));
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
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(5), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat(curr); }), []));
    };
    /**
     * @param {?} merchantId
     * @return {?}
     */
    V4LocationsService.prototype.getFromMerchant = /**
     * @param {?} merchantId
     * @return {?}
     */
    function (merchantId) {
        return this.http.get(this.apiHost + "/v4/merchants/" + merchantId).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return res.data; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) { return merchant.outlets && merchant.outlets.length > 0; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} merchant
         * @return {?}
         */
        function (merchant) {
            return merchant.outlets.map((/**
             * @param {?} outlet
             * @return {?}
             */
            function (outlet) { return ({
                merchantId: merchant.id,
                merchantName: merchant.name,
                locationId: outlet.outlet_id,
                name: outlet.outlet_name,
                tags: outlet.tags && outlet.tags.map((/**
                 * @param {?} tag
                 * @return {?}
                 */
                function (tag) { return tag.name; })),
                address: outlet.outlet_address1,
                address2: outlet.outlet_address2,
                address3: outlet.outlet_address3,
                latitude: outlet.coordinates.lat,
                longitude: outlet.coordinates.lng,
                phone: outlet.tel
            }); }));
        })));
    };
    /**
     * @return {?}
     */
    V4LocationsService.prototype.getTags = /**
     * @return {?}
     */
    function () {
        return this.getAllMerchants().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) {
            return merchants.filter((/**
             * @param {?} merchant
             * @return {?}
             */
            function (merchant) { return merchant.tags && merchant.tags.length > 0; }));
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) { return merchants.length > 0; })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) {
            /** @type {?} */
            var tags = [];
            tags = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(merchants.map((/**
             * @param {?} merchant
             * @return {?}
             */
            function (merchant) { return merchant.tags.map((/**
             * @param {?} tag
             * @return {?}
             */
            function (tag) { return tag.name; })); })));
            return tags;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["scan"])((/**
         * @param {?} acc
         * @param {?} curr
         * @return {?}
         */
        function (acc, curr) { return acc.concat.apply(acc, Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__spread"])(curr)); }), []));
    };
    /**
     * @private
     * @return {?}
     */
    V4LocationsService.prototype.getAllMerchants = /**
     * @private
     * @return {?}
     */
    function () {
        var _this = this;
        /** @type {?} */
        var pageSize = 100;
        return this.getMerchants(1, pageSize).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeMap"])((/**
         * @param {?} merchants
         * @return {?}
         */
        function (merchants) {
            /** @type {?} */
            var streams = [
                Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(merchants)
            ];
            for (var i = 2; i <= _this.historyMeta.total_pages; i++) {
                /** @type {?} */
                var stream = _this.getMerchants(i, pageSize);
                streams.push(stream);
            }
            return streams;
        })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["mergeAll"])(5));
    };
    /**
     * @private
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    V4LocationsService.prototype.getMerchants = /**
     * @private
     * @param {?=} page
     * @param {?=} pageSize
     * @return {?}
     */
    function (page, pageSize) {
        var _this = this;
        if (page === void 0) { page = 1; }
        if (pageSize === void 0) { pageSize = 25; }
        return this.http.get(this.apiHost + "/v4/merchants", {
            params: {
                page: "" + page,
                size: "" + pageSize
            }
        }).pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) {
            if (res.meta) {
                _this.historyMeta = Object(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"])({}, _this.historyMeta, res.meta);
            }
            return res.data;
        })));
    };
    V4LocationsService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    V4LocationsService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: Config }
    ]; };
    /** @nocollapse */ V4LocationsService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function V4LocationsService_Factory() { return new V4LocationsService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: V4LocationsService, providedIn: "root" });
    return V4LocationsService;
}(LocationsService));

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @type {?} */
var comps = [LocationsListComponent, LocationsMapComponent];
/**
 * @param {?} http
 * @param {?} config
 * @return {?}
 */
function locationsServiceFactory(http, config) {
    // Make decision on what to instantiate base on config
    return new V4LocationsService(http, config);
}
var LocationModule = /** @class */ (function () {
    function LocationModule() {
    }
    LocationModule.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"], args: [{
                    declarations: comps,
                    imports: [
                        _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDividerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatListModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCardModule"],
                    ],
                    providers: [
                        {
                            provide: LocationsService,
                            useFactory: locationsServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], Config]
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
        function (loc) { return loc.distance = null; }));
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
/** @type {?} */
var sortByDistance = (/**
 * @param {?} position
 * @param {?} locations
 * @param {?} inc
 * @return {?}
 */
function (position, locations, inc) {
    return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["combineLatest"])(position, locations)
        .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
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
        function (loc1, loc2) { return inc ? loc1.distance - loc2.distance : loc2.distance - loc1.distance; }));
    })));
});

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
/** @enum {string} */
var MaterialColor = {
    primary: 'primary',
    accent: 'accent',
    warn: 'warn',
};
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
var SurveyService = /** @class */ (function () {
    function SurveyService(http, campaignService, config) {
        this.http = http;
        this.campaignService = campaignService;
        this.baseUrl = (/** @type {?} */ (config.apiHost));
    }
    /**
     * @param {?} survey
     * @return {?}
     */
    SurveyService.prototype.WhistlerCampaignToCampaign = /**
     * @param {?} survey
     * @return {?}
     */
    function (survey) {
        /** @type {?} */
        var dp = survey.data.attributes.display_properties;
        return {
            id: survey.data.id,
            title: survey.data.attributes.title,
            sub_title: dp.sub_title,
            progress_bar_color: MaterialColor[dp.progress_bar_color],
            card_background_img_url: dp.card_background_img_url,
            background_img_url: dp.background_img_url,
            questions: dp.questions
        };
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
        return this.campaignService.getCampaign(id)
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((/**
         * @param {?} campaign
         * @return {?}
         */
        function (campaign) { return _this.http.get(_this.baseUrl + '/survey/engagements/' + campaign.engagementId); })), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((/**
         * @param {?} res
         * @return {?}
         */
        function (res) { return _this.WhistlerCampaignToCampaign(res); })));
    };
    SurveyService.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Injectable"], args: [{
                    providedIn: 'root'
                },] }
    ];
    /** @nocollapse */
    SurveyService.ctorParameters = function () { return [
        { type: _angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"] },
        { type: ICampaignService },
        { type: Config }
    ]; };
    /** @nocollapse */ SurveyService.ngInjectableDef = Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵdefineInjectable"])({ factory: function SurveyService_Factory() { return new SurveyService(Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"]), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(ICampaignService), Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["ɵɵinject"])(Config)); }, token: SurveyService, providedIn: "root" });
    return SurveyService;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var SurveyComponent = /** @class */ (function () {
    function SurveyComponent() {
        this.totalLength = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.currentPointer = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.surveyDone = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.answersTracker = {};
        this.pointsTracker = {};
        this.questionPointer = 0;
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
            this.data$.subscribe((/**
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
        this.answersTracker[answer.question_id] = answer;
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
        this.pointsTracker[points.question_id] = points.point;
        this.updateParent();
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
                return {
                    question_id: id,
                    content: answer.content
                };
            }));
            console.log(answers);
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
        function (sum, point) {
            return sum + point;
        }), 0);
    };
    SurveyComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-survey',
                    template: "<div class=\"survey-container\" *ngIf=\"data$ | async as survey\">\n    <div *ngFor=\"let question of survey.questions ; let i = index\">\n        <perx-core-question \n            [id]=\"i\"\n            [questionPointer]=\"questionPointer\"\n            [totalQuestions]=\"data.questions.length\"\n            [question]=\"question\"\n            (updateAnswers)=\"updateAnswers($event)\"\n            (updatePoints)=\"updatePoints($event)\"\n            (updateQuestionPointer)=\"updateQuestionPointer($event)\"\n        ></perx-core-question>\n    </div>\n</div>",
                    styles: [":host{font-size:1.4rem;line-height:1.8rem;width:100%}"]
                }] }
    ];
    SurveyComponent.propDecorators = {
        data$: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"], args: ['data',] }],
        totalLength: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        currentPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        surveyDone: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return SurveyComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var QuestionComponent = /** @class */ (function () {
    function QuestionComponent() {
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
        this.question.answer = answer.content;
        /** @type {?} */
        var questionId = answer.question_id ? answer.question_id : this.question.id;
        this.updateAnswers.emit({ question_id: questionId, content: answer.content });
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
        this.updatePoints.emit({ question_id: this.question.id, point: point });
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
            this.updatePoints.emit({ question_id: this.question.id, point: this.point });
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
    };
    QuestionComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-question',
                    template: "<div class=\"question-container\" [ngClass]=\"{ hidden : !isActive }\">\n    <div class=\"question-content\" *ngIf=\"question\">\n        <div class=\"question\">\n            {{question?.question}}\n            <span class=\"required-star\">\n                {{question?.required ? '*': ''}}\n            </span>\n        </div>\n        <div class=\"description\" [innerHTML]=\"question?.description\"></div>\n        <perx-core-group \n            *ngIf=\"question.payload.type === surveyQuestionType.questionGroup\"\n            [id]=\"id\"\n            [questionPointer]=\"questionPointer\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\" \n            (updatePoints)=\"updateGroupPoint($event)\"\n        ></perx-core-group>\n        <perx-core-select \n            *ngIf=\"question.payload.type === surveyQuestionType.multipleChoice\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"\n        ></perx-core-select>\n        <perx-core-rating \n            *ngIf=\"question.payload.type === surveyQuestionType.rating\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"    \n        ></perx-core-rating>\n        <perx-core-picture-select \n            *ngIf=\"question.payload.type === surveyQuestionType.pictureChoice\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"   \n        ></perx-core-picture-select>\n        <perx-core-long-text \n            *ngIf=\"question.payload.type === surveyQuestionType.longText\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"   \n        ></perx-core-long-text>\n        <perx-core-date \n            *ngIf=\"question.payload.type === surveyQuestionType.date\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"    \n        ></perx-core-date>\n        <perx-core-phone \n            *ngIf=\"question.payload.type === surveyQuestionType.phone\"\n            [payload]=\"question.payload\"\n            [flush]=\"flush\"\n            (updateAnswers)=\"updateAnswer($event)\"   \n        ></perx-core-phone>\n        <div \n            class=\"error-message\"\n            *ngIf=\"question.payload.type !== surveyQuestionType.questionGroup\">\n            <div [ngClass]=\"{ error: errorState?.isRequired }\">\n                Answer is <strong>required</strong>\n            </div>\n            <div [ngClass]=\"{ error: errorState?.exceedMaxLength }\">\n                Exceed <strong>max length</strong>\n            </div>\n            <div [ngClass]=\"{ error: errorState?.isValidDateRange }\">\n                Date Range is <strong>invalid</strong>\n            </div>\n        </div>\n    </div>\n    <div class=\"question-action-container\" *ngIf=\"!isSubQuestion\">\n            <button *ngIf=\"id !== 0\" mat-raised-button (click)=\"back()\">\n                Back\n            </button>\n            <button *ngIf=\"id !== totalQuestions -1\" mat-raised-button color=\"primary\" (click)=\"next()\">\n                Next\n            </button>\n        </div>\n</div>",
                    styles: [":host{width:100%;display:block}.question-container{height:100%;display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:space-between;justify-content:space-between}.question-container.hidden{display:none}.question-container .question-content{display:-webkit-flex;display:flex;height:100%;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:flex-start;justify-content:flex-start}.question-container .question-content .question{font-size:1.6rem;line-height:2.8rem;color:#212121;letter-spacing:.5px}.question-container .question-content .question .required-star{color:#ff6767}.question-container .question-content .description{margin-bottom:1rem;font-size:1.2rem;line-height:1.6rem;letter-spacing:.4px;color:#666}.question-container .question-content .error-message{height:1.6rem;overflow:hidden}.question-container .question-content .error-message>div{display:none;font-size:1rem;line-height:1.6rem;letter-spacing:.2px;color:#eb202f}.question-container .question-content .error-message>div.error{display:block}.question-container .question-action-container button{margin-right:1rem}"]
                }] }
    ];
    QuestionComponent.propDecorators = {
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        questionPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        totalQuestions: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        question: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        isSubQuestion: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        updatePoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        updateQuestionPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return QuestionComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        return SurveyRatingIcons[iconName];
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
                    styles: [".rating{display:-webkit-flex;display:flex;width:100%;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-flex-direction:column;flex-direction:column}.rating .icon-container{display:-webkit-flex;display:flex;width:100%;-webkit-justify-content:space-between;justify-content:space-between;-webkit-flex-direction:row;flex-direction:row;max-width:60rem}.rating .icon-container .icon-wrapper{box-sizing:border-box;display:-webkit-flex;display:flex;place-content:center flex-start;-webkit-flex:1 1 0%;flex:1 1 0%;-webkit-flex-direction:column;flex-direction:column;-webkit-justify-content:flex-start;justify-content:flex-start;-webkit-align-items:center;align-items:center}.rating .icon-container .icon-wrapper .mat-icon{cursor:pointer;height:3.6rem;width:3.6rem;font-size:3.6rem}.rating .icon-container .icon-wrapper .mat-icon.mat-default{color:#a4b0c3}.rating .label{font-size:1rem;line-height:1.6rem;color:#666}"]
                }] }
    ];
    RatingComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return RatingComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        if (this.payload.multiple) {
            result = Object.entries(this.selectedChoices).map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data[1]) {
                    return data[0];
                }
            })).filter((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data; }));
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
                    styles: [".choice-container{display:-webkit-flex;display:flex;-webkit-flex-wrap:wrap;flex-wrap:wrap}.choice-container .choice-content{display:-webkit-flex;display:flex;-webkit-flex:1 1 13rem;flex:1 1 13rem;-webkit-flex-direction:column;flex-direction:column;overflow:hidden;margin:0 1rem 1rem 0}.choice-container .choice-content:nth-child(2n){margin:0 0 1rem 1rem}.choice-container .choice-content .choice-image{-webkit-flex:1 1 auto;flex:1 1 auto;position:relative;background:50%/cover #4e4e4e;border-radius:8px;min-height:13rem;overflow:hidden}.choice-container .choice-content .choice-image:focus{outline:0}.choice-container .choice-content .choice-image img{object-fit:cover;position:absolute;width:100%;height:100%;cursor:pointer}.choice-container .choice-content .choice-image.selected{border:2px solid #186de1;box-sizing:border-box;position:relative;transition:.5s cubic-bezier(.35,0,.25,1)}.choice-container .choice-content .choice-label{font-size:1.2rem;line-height:1.6rem;letter-spacing:.4px;color:#212121}"]
                }] }
    ];
    PictureSelectComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return PictureSelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var LongTextComponent = /** @class */ (function () {
    function LongTextComponent() {
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
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
        this.updateAnswers.emit({ content: value });
    };
    LongTextComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-long-text',
                    template: "<mat-form-field class=\"full-width\">\n    <input matInput (change)=\"updateInput($event.target.value)\">\n</mat-form-field>",
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
        if (this.payload.multiple) {
            result = Object.entries(this.selectedChoices).map((/**
             * @param {?} data
             * @return {?}
             */
            function (data) {
                if (data[1]) {
                    return data[0];
                }
            })).filter((/**
             * @param {?} data
             * @return {?}
             */
            function (data) { return data; }));
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
                    template: "<div class=\"date-wrapper\" *ngIf=\"payload\">\n    <ng-container *ngIf=\"payload.multiple; else elseBlock\">\n        <div class=\"choice-container\">\n            <div class=\"choice-content\" *ngFor=\"let choice of payload?.choices; let i = index\">\n                <mat-checkbox [(ngModel)]=\"selectedChoices[i]\" (change)=\"emitValue()\">\n                    {{choice}}\n                </mat-checkbox>\n            </div>\n        </div>\n    </ng-container>\n    <ng-template #elseBlock>\n        <div class=\"choice-container\">\n            <mat-radio-group \n                class=\"selection-radio-group\"\n                aria-labelledby=\"single-selection\" \n                [(ngModel)]=\"selectedChoice\"\n                (change)=\"emitValue()\">\n                <mat-radio-button \n                    class=\"selection-radio-button\" \n                    *ngFor=\"let choice of payload?.choices; let i = index\" \n                    [value]=\"i\">\n                    {{choice}}\n                </mat-radio-button>\n            </mat-radio-group>\n        </div>\n    </ng-template>\n</div>",
                    styles: [".selection-radio-group{display:-webkit-flex;display:flex;-webkit-flex-direction:column;flex-direction:column;margin:15px 0}.selection-radio-button{margin:5px}"]
                }] }
    ];
    SelectComponent.propDecorators = {
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return SelectComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var GroupComponent = /** @class */ (function () {
    function GroupComponent() {
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
        this.pointsTracker[point.question_id] = point.point;
        /** @type {?} */
        var currentPoint = this.calculatePoints();
        this.updatePoints.emit(currentPoint);
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
        function (sum, point) {
            return sum + point;
        }), 0);
        return totalPoint / subQuestionLength;
    };
    GroupComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-group',
                    template: "<div *ngFor=\"let question of payload?.questions\">\n    <perx-core-question \n        [id]=\"id\"\n        [questionPointer]=\"questionPointer\"\n        [isSubQuestion]=\"true\"\n        [question]=\"question\"\n        [flush]=\"flush\"\n        (updateAnswers)=\"updateAnswer($event)\"\n        (updatePoints)=\"updatePoint($event)\"\n    ></perx-core-question>\n</div>",
                    styles: [""]
                }] }
    ];
    GroupComponent.propDecorators = {
        id: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        questionPointer: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }],
        updatePoints: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return GroupComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
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
     * @param {?} picker
     * @return {?}
     */
    DateComponent.prototype.openCalendar = /**
     * @param {?} picker
     * @return {?}
     */
    function (picker) {
        var _this = this;
        picker.open();
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
     * @param {?} picker
     * @return {?}
     */
    DateComponent.prototype.openCalendarTo = /**
     * @param {?} picker
     * @return {?}
     */
    function (picker) {
        var _this = this;
        picker.open();
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
     * @param {?} picker
     * @return {?}
     */
    DateComponent.prototype.openCalendarFrom = /**
     * @param {?} picker
     * @return {?}
     */
    function (picker) {
        var _this = this;
        picker.open();
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
        if (this.answer["from"] && this.answer["to"]) {
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
        if (this.answer["from"] && this.answer["to"]) {
            this.updateAnswers.emit({ content: this.answer });
        }
    };
    DateComponent.decorators = [
        { type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"], args: [{
                    selector: 'perx-core-date',
                    template: "<div class=\"date-wrapper\" *ngIf=\"payload\">\n  <ng-container *ngIf=\"payload?.duration; else elseBlock\">\n    <mat-form-field class=\"full-width\">\n      <input\n        matInput \n        [matDatepicker]=\"pickerFrom\"  \n        placeholder=\"From\" \n        (focus)=\"openCalendarFrom(pickerFrom)\" \n        (click)=\"openCalendarFrom(pickerFrom)\"\n        (change)=\"updateInputFrom($event.target.value)\"\n        (dateChange)=\"updateInputFrom($event.target.value)\"\n        #pickerFromInput\n        readonly>\n      <mat-datepicker-toggle matSuffix [for]=\"pickerFrom\"></mat-datepicker-toggle>\n      <mat-datepicker #pickerFrom (closed)=\"eventCloseHandlerFrom()\"></mat-datepicker>\n    </mat-form-field>\n    <mat-form-field class=\"full-width\">\n        <input\n          matInput \n          [matDatepicker]=\"pickerTo\"  \n          placeholder=\"To\" \n          (focus)=\"openCalendarTo(pickerTo)\" \n          (click)=\"openCalendarTo(pickerTo)\"\n          (change)=\"updateInputTo($event.target.value)\"\n          (dateChange)=\"updateInputTo($event.target.value)\"\n          #pickerToInput\n          readonly>\n        <mat-datepicker-toggle matSuffix [for]=\"pickerTo\"></mat-datepicker-toggle>\n        <mat-datepicker #pickerTo (closed)=\"eventCloseHandlerTo()\"></mat-datepicker>\n      </mat-form-field>\n  </ng-container>\n  <ng-template #elseBlock>\n      <mat-form-field class=\"full-width\">\n          <input\n            matInput \n            [matDatepicker]=\"picker\"  \n            placeholder=\"Choose a date\" \n            (focus)=\"openCalendar(picker)\" \n            (click)=\"openCalendar(picker)\"\n            (change)=\"updateInput($event.target.value)\"\n            (dateChange)=\"updateInput($event.target.value)\"\n            #pickerInput\n            readonly>\n          <mat-datepicker-toggle matSuffix [for]=\"picker\"></mat-datepicker-toggle>\n          <mat-datepicker #picker (closed)=\"eventCloseHandler()\"></mat-datepicker>\n        </mat-form-field>\n  </ng-template>\n</div>",
                    styles: [".full-width{width:100%}"]
                }] }
    ];
    DateComponent.propDecorators = {
        pickerInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerInput', { static: false },] }],
        pickerToInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerToInput', { static: false },] }],
        pickerFromInput: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["ViewChild"], args: ['pickerFromInput', { static: false },] }],
        payload: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        flush: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Input"] }],
        updateAnswers: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"] }]
    };
    return DateComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes,extraRequire,missingOverride,missingReturn,unusedPrivateMembers,uselessCode} checked by tsc
 */
var PhoneComponent = /** @class */ (function () {
    function PhoneComponent(generalStaticDataService) {
        this.generalStaticDataService = generalStaticDataService;
        this.updateAnswers = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    /**
     * @return {?}
     */
    PhoneComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
        this.countriesList$ = this.generalStaticDataService.getCountriesList();
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
        this.updateAnswers.emit({ content: this.countryCode + ' ' + value });
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
                    template: "<mat-form-field class=\"full-width\">\n    <mat-label>Default Country Code</mat-label>\n    <mat-select (selectionChange)=\"updateCoutryCode($event.source.value)\">\n        <mat-option *ngFor=\"let country of countriesList$ | async\" [value]=\"country.phone\">\n            <span>{{country.name}}&nbsp;</span>\n            <span>{{country.phone}}</span>\n        </mat-option>\n    </mat-select>\n</mat-form-field>\n<mat-form-field class=\"full-width\">\n    <input matInput type=\"tel\" [placeholder]=\"'Mobile number'\" (change)=\"\n        updateInput($event.target.value)\">\n</mat-form-field>",
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
                        _angular_forms__WEBPACK_IMPORTED_MODULE_6__["FormsModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatFormFieldModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatInputModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatButtonModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatIconModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDatepickerModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatSelectModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatNativeDateModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatCheckboxModule"],
                        _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatRadioModule"]
                    ],
                    providers: [
                        {
                            provide: SurveyService,
                            useFactory: surveyServiceFactory,
                            deps: [_angular_common_http__WEBPACK_IMPORTED_MODULE_8__["HttpClient"], ICampaignService, Config]
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
                    imports: []
                },] }
    ];
    return ConfigModule;
}());


//# sourceMappingURL=perx-core.js.map


/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/account/account.component.html":
/*!***********************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/account/account.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"section\">\n    <perx-core-micro-profile [profile]=\"profile\"></perx-core-micro-profile>\n</div>\n<div class=\"section\">\n    <a [routerLink]=\"[ '/tnc' ]\">Terms & Conditions</a>\n    <a [routerLink]=\"[ '/privacy' ]\">Privacy Policy</a>\n</div>\n<div class=\"section\">\n    <span (click)=\"logout()\">Log Out</span>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/app.component.html":
/*!***********************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/app.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-app-container\">\n  <mat-toolbar class=\"toolbar mat-elevation-z2\" *ngIf=\"showHeader\" color=\"primary\">\n    <img class=\"logo\" src=\"assets/logo.png\" />\n  </mat-toolbar>\n  <div class=\"game-container\">\n    <router-outlet (activate)=\"onActivate($event)\"></router-outlet>\n  </div>\n  <mat-toolbar class=\"navbar mat-elevation-z2\" *ngIf=\"showToolbar\">\n    <a [routerLink]=\"[ '/wallet' ]\" routerLinkActive=\"active\">\n      <div class=\"nav-item\">\n        <mat-icon aria-hidden=\"false\">account_balance_wallet</mat-icon>\n        <span>Wallet</span>\n      </div>\n    </a>\n    <a [routerLink]=\"[ '/history' ]\" routerLinkActive=\"active\">\n      <div class=\"nav-item\">\n        <mat-icon aria-hidden=\"false\">list</mat-icon>\n        <span>History</span>\n      </div>\n    </a>\n    <a [routerLink]=\"[ '/account' ]\" routerLinkActive=\"active\">\n      <div class=\"nav-item\">\n        <mat-icon aria-hidden=\"false\">account_circle</mat-icon>\n        <span>Account</span>\n      </div>\n    </a>\n  </mat-toolbar>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/history/history.component.html":
/*!***********************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/history/history.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"tab-group__content\">\n    <h1>My History</h1>\n    <perx-core-vouchers \n        [filter]=\"filter\"\n        [showRedeemedIcon]=\"false\"\n        [data]=\"vouchers$\">\n    </perx-core-vouchers>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/home.component.html":
/*!*****************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/home/home.component.html ***!
  \*****************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"tab-group__content\">\n    <h1>My Stamp Card</h1>\n    <mat-card *ngFor=\"let campaign of campaigns$ | async as campaigns\" routerLink=\"\" matRipple (click)=\"onCampaignSelect(campaign)\">\n        <div class=\"puzzle-content\">\n            <div class=\"puzzle-img__wrapper\">\n                <img class=\"puzzle-img\" src=\"assets/static_image.png\">\n            </div>\n            <div class=\"puzzle-details\">\n                <span class='main-reward-title'>\n                    {{campaign.name}}\n                </span>\n                <span class=\"reward-subtitle\">{{campaign.description}}</span>\n            </div>\n        </div>\n    </mat-card>\n    <h1>My Rewards</h1>\n    <perx-core-vouchers \n        (tapped)=\"voucherSelected($event)\" \n        [data]=\"vouchers$\"\n        [filter]=\"filter\"\n        [showRedeemedIcon]=\"false\">\n    </perx-core-vouchers>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/loading/loading.component.html":
/*!***********************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/loading/loading.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"loading\">\n    <mat-spinner></mat-spinner>\n    <span>Logging In...</span>\n\n    <a [routerLink]=\"[ '/wallet' ]\">wallet</a>\n    <a [routerLink]=\"[ '/account' ]\">account</a>\n    <a [routerLink]=\"[ '/shake/1' ]\">shake</a>\n    <a [routerLink]=\"[ '/tap/1' ]\">tap</a>\n    <a [routerLink]=\"[ '/stamp/1' ]\">stamp</a>\n    <a [routerLink]=\"[ '/reward' ]\">reward</a>\n    <a [routerLink]=\"[ '/survey/1' ]\">survey</a>\n</div>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/login/login.component.html":
/*!*******************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/login/login.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"content-container\">\n  <img class=\"logo\" src=\"assets/logo.png\" />\n  <div class=\"login-form\">\n    <h1>Log In</h1>\n    <div class=\"error_msg\">\n      <span>{{errorMessage}}</span>\n    </div>\n    <form [formGroup]=\"loginForm\" (ngSubmit)=\"onSubmit()\">\n      <mat-form-field appearance=\"outline\" class=\"full-width__input\">\n        <mat-label>Enter your customer ID</mat-label>\n        <input matInput placeholder=\"Enter your customer ID\" formControlName=\"customerID\">\n        <mat-error *ngIf=\"loginForm.hasError('customerID')\">\n          Player code is <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n      <mat-form-field appearance=\"outline\" class=\"full-width__input\">\n        <mat-label>Enter your password</mat-label>\n        <input matInput placeholder=\"Enter your password\" formControlName=\"password\">\n        <mat-error *ngIf=\"loginForm.hasError('password')\">\n          Password is <strong>required</strong>\n        </mat-error>\n      </mat-form-field>\n      <button mat-flat-button type=\"submit\" color=\"primary\" class=\"full-width__button\">Log In</button>\n    </form>\n  </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/redeem/redeem.component.html":
/*!*********************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/redeem/redeem.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"parent-container\" *ngIf=\"voucher$ | async as voucher\">\n  <div class=\"full-page-container-white\">\n    RedemptionType: {{redemptionType}}\n    <div *ngIf=\"voucher.redemptionType === 'pin'\">\n      <p>\n        The merchant will enter the redemption code when you are ready to redeem at the venue.\n      </p>\n      <h1>\n        Merchant to enter the code\n      </h1>\n      <perx-core-pin-redemption \n        length=\"4\"\n        [voucherId]=\"voucherId\"\n        (full)=\"pinInputSuccess()\"\n        (hasErrorEmit)=\"errorHandler($event)\"\n      >\n      </perx-core-pin-redemption>\n    </div>\n    <div *ngIf=\"voucher.redemptionType === 'txtCode' || voucher.redemptionType === 'offline'\">\n      <perx-core-bcode-redemption [voucherId]=\"voucherId\"></perx-core-bcode-redemption>\n    </div>\n    <div *ngIf=\"voucher.redemptionType === 'qrcode'\" class=\"qrcode-container\" >\n      <perx-core-qrcode-redemption [voucherId]=\"voucherId\"></perx-core-qrcode-redemption>\n    </div>\n  </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/voucher-detail/voucher-detail.component.html":
/*!*************************************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/voucher-detail/voucher-detail.component.html ***!
  \*************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"prize-wrapper\">\n  <div class=\"voucher-container\">\n    <perx-core-voucher \n      [hideMerchantImg]=\"false\"\n      [hideMerchantName]=\"false\"\n      [hideActions]=\"true\"\n      [voucher]=\"voucher$\">\n    </perx-core-voucher>\n  </div>\n  <div class=\"actions-container\">\n    <button mat-flat-button color=\"primary\" (click)=\"onRedeem()\">Redeem</button>\n  </div>\n</div>"

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

/***/ "./src/app/account/account.component.scss":
/*!************************************************!*\
  !*** ./src/app/account/account.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".section {\n  background-color: #fff;\n  margin-bottom: 1.6rem;\n  font-size: 1.4rem;\n  line-height: 3.6rem;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  padding: 1.5rem;\n  font-weight: normal;\n}\n.section a {\n  text-decoration: none;\n  color: black;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvYWNjb3VudC9hY2NvdW50LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hY2NvdW50L2FjY291bnQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxzQkFBQTtFQUNBLHFCQUFBO0VBQ0EsaUJBQUE7RUFDQSxtQkFBQTtFQUNBLHFCQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUNDRjtBRENFO0VBQ0UscUJBQUE7RUFDQSxZQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC9hY2NvdW50L2FjY291bnQuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyIuc2VjdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIG1hcmdpbi1ib3R0b206IDEuNnJlbTtcbiAgZm9udC1zaXplOiAxLjRyZW07XG4gIGxpbmUtaGVpZ2h0OiAzLjZyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcblxuICBhIHtcbiAgICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gICAgY29sb3I6IGJsYWNrO1xuICB9XG59XG4iLCIuc2VjdGlvbiB7XG4gIGJhY2tncm91bmQtY29sb3I6ICNmZmY7XG4gIG1hcmdpbi1ib3R0b206IDEuNnJlbTtcbiAgZm9udC1zaXplOiAxLjRyZW07XG4gIGxpbmUtaGVpZ2h0OiAzLjZyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHBhZGRpbmc6IDEuNXJlbTtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cbi5zZWN0aW9uIGEge1xuICB0ZXh0LWRlY29yYXRpb246IG5vbmU7XG4gIGNvbG9yOiBibGFjaztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/account/account.component.ts":
/*!**********************************************!*\
  !*** ./src/app/account/account.component.ts ***!
  \**********************************************/
/*! exports provided: AccountComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "AccountComponent", function() { return AccountComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");





var AccountComponent = /** @class */ (function () {
    function AccountComponent(authenticationService, router, profileService) {
        this.authenticationService = authenticationService;
        this.router = router;
        this.profileService = profileService;
    }
    AccountComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.profileService.whoAmI()
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["take"])(1))
            .subscribe(function (profile) {
            _this.profile = profile;
        });
    };
    AccountComponent.prototype.logout = function () {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    };
    AccountComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-account',
            template: __webpack_require__(/*! raw-loader!./account.component.html */ "../../node_modules/raw-loader/index.js!./src/app/account/account.component.html"),
            styles: [__webpack_require__(/*! ./account.component.scss */ "./src/app/account/account.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["AuthenticationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["ProfileService"]])
    ], AccountComponent);
    return AccountComponent;
}());



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
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _redeem_redeem_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./redeem/redeem.component */ "./src/app/redeem/redeem.component.ts");
/* harmony import */ var _voucher_detail_voucher_detail_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./voucher-detail/voucher-detail.component */ "./src/app/voucher-detail/voucher-detail.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./history/history.component */ "./src/app/history/history.component.ts");
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./account/account.component */ "./src/app/account/account.component.ts");
/* harmony import */ var _loading_loading_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./loading/loading.component */ "./src/app/loading/loading.component.ts");










var routes = [
    {
        path: '',
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'loading' },
            { path: 'wallet', component: _home_home_component__WEBPACK_IMPORTED_MODULE_3__["HomeComponent"] },
            { path: 'history', component: _history_history_component__WEBPACK_IMPORTED_MODULE_7__["HistoryComponent"] },
            { path: 'account', component: _account_account_component__WEBPACK_IMPORTED_MODULE_8__["AccountComponent"] },
            { path: 'redeem/:id', component: _redeem_redeem_component__WEBPACK_IMPORTED_MODULE_4__["RedeemComponent"] },
            { path: 'voucher-detail/:id', component: _voucher_detail_voucher_detail_component__WEBPACK_IMPORTED_MODULE_5__["VoucherDetailComponent"] },
            { path: 'tap/:id', loadChildren: function () { return Promise.all(/*! import() | tap-tap-module */[__webpack_require__.e("common"), __webpack_require__.e("tap-tap-module")]).then(__webpack_require__.bind(null, /*! ./tap/tap.module */ "./src/app/tap/tap.module.ts")).then(function (mod) { return mod.TapModule; }); } },
            { path: 'shake/:id', loadChildren: function () { return Promise.all(/*! import() | shake-shake-module */[__webpack_require__.e("common"), __webpack_require__.e("shake-shake-module")]).then(__webpack_require__.bind(null, /*! ./shake/shake.module */ "./src/app/shake/shake.module.ts")).then(function (mod) { return mod.ShakeModule; }); } },
            { path: 'stamp/:id', loadChildren: function () { return __webpack_require__.e(/*! import() | stamp-stamp-module */ "stamp-stamp-module").then(__webpack_require__.bind(null, /*! ./stamp/stamp.module */ "./src/app/stamp/stamp.module.ts")).then(function (mod) { return mod.StampModule; }); } },
            { path: 'survey/:id', loadChildren: function () { return __webpack_require__.e(/*! import() | survey-survey-module */ "survey-survey-module").then(__webpack_require__.bind(null, /*! ./survey/survey.module */ "./src/app/survey/survey.module.ts")).then(function (mod) { return mod.SurveyModule; }); } },
            {
                path: 'reward',
                loadChildren: function () { return __webpack_require__.e(/*! import() | instant-reward-instant-reward-module */ "instant-reward-instant-reward-module").then(__webpack_require__.bind(null, /*! ./instant-reward/instant-reward.module */ "./src/app/instant-reward/instant-reward.module.ts")).then(function (mod) { return mod.InstantRewardModule; }); }
            },
            { path: 'loading', component: _loading_loading_component__WEBPACK_IMPORTED_MODULE_9__["LoadingComponent"] }
        ]
    },
    { path: 'login', component: _login_login_component__WEBPACK_IMPORTED_MODULE_6__["LoginComponent"] },
    { path: '**', redirectTo: '/wallet' }
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

module.exports = "/* Theme for the ripple elements.*/\n/* stylelint-disable material/no-prefixes */\n/* stylelint-enable */\n.mat-badge-content {\n  font-weight: 600;\n  font-size: 12px;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-badge-small .mat-badge-content {\n  font-size: 9px;\n}\n.mat-badge-large .mat-badge-content {\n  font-size: 24px;\n}\n.mat-h1, .mat-headline, .mat-typography h1 {\n  font: 400 24px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px;\n}\n.mat-h2, .mat-title, .mat-typography h2 {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px;\n}\n.mat-h3, .mat-subheading-2, .mat-typography h3 {\n  font: 400 16px/28px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px;\n}\n.mat-h4, .mat-subheading-1, .mat-typography h4 {\n  font: 400 15px/24px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 16px;\n}\n.mat-h5, .mat-typography h5 {\n  font: 400 11.62px/20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px;\n}\n.mat-h6, .mat-typography h6 {\n  font: 400 9.38px/20px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 12px;\n}\n.mat-body-strong, .mat-body-2 {\n  font: 500 14px/24px Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-body, .mat-body-1, .mat-typography {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-body p, .mat-body-1 p, .mat-typography p {\n  margin: 0 0 12px;\n}\n.mat-small, .mat-caption {\n  font: 400 12px/20px Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-display-4, .mat-typography .mat-display-4 {\n  font: 300 112px/112px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: -0.05em;\n  margin: 0 0 56px;\n}\n.mat-display-3, .mat-typography .mat-display-3 {\n  font: 400 56px/56px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: -0.02em;\n  margin: 0 0 64px;\n}\n.mat-display-2, .mat-typography .mat-display-2 {\n  font: 400 45px/48px Roboto, \"Helvetica Neue\", sans-serif;\n  letter-spacing: -0.005em;\n  margin: 0 0 64px;\n}\n.mat-display-1, .mat-typography .mat-display-1 {\n  font: 400 34px/40px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0 0 64px;\n}\n.mat-bottom-sheet-container {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-button, .mat-raised-button, .mat-icon-button, .mat-stroked-button,\n.mat-flat-button, .mat-fab, .mat-mini-fab {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n}\n.mat-button-toggle {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-card {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-card-title {\n  font-size: 24px;\n  font-weight: 500;\n}\n.mat-card-header .mat-card-title {\n  font-size: 20px;\n}\n.mat-card-subtitle,\n.mat-card-content {\n  font-size: 14px;\n}\n.mat-checkbox {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-checkbox-layout .mat-checkbox-label {\n  line-height: 24px;\n}\n.mat-chip {\n  font-size: 14px;\n  font-weight: 500;\n}\n.mat-chip .mat-chip-trailing-icon.mat-icon,\n.mat-chip .mat-chip-remove.mat-icon {\n  font-size: 18px;\n}\n.mat-table {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-header-cell {\n  font-size: 12px;\n  font-weight: 500;\n}\n.mat-cell, .mat-footer-cell {\n  font-size: 14px;\n}\n.mat-calendar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-calendar-body {\n  font-size: 13px;\n}\n.mat-calendar-body-label,\n.mat-calendar-period-button {\n  font-size: 14px;\n  font-weight: 500;\n}\n.mat-calendar-table-header th {\n  font-size: 11px;\n  font-weight: 400;\n}\n.mat-dialog-title {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-expansion-panel-header {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 15px;\n  font-weight: 400;\n}\n.mat-expansion-panel-content {\n  font: 400 14px/20px Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-form-field {\n  font-size: inherit;\n  font-weight: 400;\n  line-height: 1.125;\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-form-field-wrapper {\n  padding-bottom: 1.34375em;\n}\n.mat-form-field-prefix .mat-icon,\n.mat-form-field-suffix .mat-icon {\n  font-size: 150%;\n  line-height: 1.125;\n}\n.mat-form-field-prefix .mat-icon-button,\n.mat-form-field-suffix .mat-icon-button {\n  height: 1.5em;\n  width: 1.5em;\n}\n.mat-form-field-prefix .mat-icon-button .mat-icon,\n.mat-form-field-suffix .mat-icon-button .mat-icon {\n  height: 1.125em;\n  line-height: 1.125;\n}\n.mat-form-field-infix {\n  padding: 0.5em 0;\n  border-top: 0.84375em solid transparent;\n}\n.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.34375em) scale(0.75);\n          transform: translateY(-1.34375em) scale(0.75);\n  width: 133.3333333333%;\n}\n.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.34374em) scale(0.75);\n          transform: translateY(-1.34374em) scale(0.75);\n  width: 133.3333433333%;\n}\n.mat-form-field-label-wrapper {\n  top: -0.84375em;\n  padding-top: 0.84375em;\n}\n.mat-form-field-label {\n  top: 1.34375em;\n}\n.mat-form-field-underline {\n  bottom: 1.34375em;\n}\n.mat-form-field-subscript-wrapper {\n  font-size: 75%;\n  margin-top: 0.6666666667em;\n  top: calc(100% - 1.7916666667em);\n}\n.mat-form-field-appearance-legacy .mat-form-field-wrapper {\n  padding-bottom: 1.25em;\n}\n.mat-form-field-appearance-legacy .mat-form-field-infix {\n  padding: 0.4375em 0;\n}\n.mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.001px);\n  -ms-transform: translateY(-1.28125em) scale(0.75);\n  width: 133.3333333333%;\n}\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00101px);\n  -ms-transform: translateY(-1.28124em) scale(0.75);\n  width: 133.3333433333%;\n}\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);\n          transform: translateY(-1.28125em) scale(0.75) perspective(100px) translateZ(0.00102px);\n  -ms-transform: translateY(-1.28123em) scale(0.75);\n  width: 133.3333533333%;\n}\n.mat-form-field-appearance-legacy .mat-form-field-label {\n  top: 1.28125em;\n}\n.mat-form-field-appearance-legacy .mat-form-field-underline {\n  bottom: 1.25em;\n}\n.mat-form-field-appearance-legacy .mat-form-field-subscript-wrapper {\n  margin-top: 0.5416666667em;\n  top: calc(100% - 1.6666666667em);\n}\n@media print {\n  .mat-form-field-appearance-legacy.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n    -webkit-transform: translateY(-1.28122em) scale(0.75);\n            transform: translateY(-1.28122em) scale(0.75);\n  }\n  .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-form-field-autofill-control:-webkit-autofill + .mat-form-field-label-wrapper .mat-form-field-label {\n    -webkit-transform: translateY(-1.28121em) scale(0.75);\n            transform: translateY(-1.28121em) scale(0.75);\n  }\n  .mat-form-field-appearance-legacy.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n    -webkit-transform: translateY(-1.2812em) scale(0.75);\n            transform: translateY(-1.2812em) scale(0.75);\n  }\n}\n.mat-form-field-appearance-fill .mat-form-field-infix {\n  padding: 0.25em 0 0.75em 0;\n}\n.mat-form-field-appearance-fill .mat-form-field-label {\n  top: 1.09375em;\n  margin-top: -0.5em;\n}\n.mat-form-field-appearance-fill.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-0.59375em) scale(0.75);\n          transform: translateY(-0.59375em) scale(0.75);\n  width: 133.3333333333%;\n}\n.mat-form-field-appearance-fill.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-0.59374em) scale(0.75);\n          transform: translateY(-0.59374em) scale(0.75);\n  width: 133.3333433333%;\n}\n.mat-form-field-appearance-outline .mat-form-field-infix {\n  padding: 1em 0 1em 0;\n}\n.mat-form-field-appearance-outline .mat-form-field-label {\n  top: 1.84375em;\n  margin-top: -0.25em;\n}\n.mat-form-field-appearance-outline.mat-form-field-can-float.mat-form-field-should-float .mat-form-field-label,\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server:focus + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.59375em) scale(0.75);\n          transform: translateY(-1.59375em) scale(0.75);\n  width: 133.3333333333%;\n}\n.mat-form-field-appearance-outline.mat-form-field-can-float .mat-input-server[label]:not(:label-shown) + .mat-form-field-label-wrapper .mat-form-field-label {\n  -webkit-transform: translateY(-1.59374em) scale(0.75);\n          transform: translateY(-1.59374em) scale(0.75);\n  width: 133.3333433333%;\n}\n.mat-grid-tile-header,\n.mat-grid-tile-footer {\n  font-size: 14px;\n}\n.mat-grid-tile-header .mat-line,\n.mat-grid-tile-footer .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n.mat-grid-tile-header .mat-line:nth-child(n+2),\n.mat-grid-tile-footer .mat-line:nth-child(n+2) {\n  font-size: 12px;\n}\ninput.mat-input-element {\n  margin-top: -0.0625em;\n}\n.mat-menu-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 400;\n}\n.mat-paginator,\n.mat-paginator-page-size .mat-select-trigger {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n}\n.mat-radio-button {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-select {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-select-trigger {\n  height: 1.125em;\n}\n.mat-slide-toggle-content {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-slider-thumb-label-text {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500;\n}\n.mat-stepper-vertical, .mat-stepper-horizontal {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-step-label {\n  font-size: 14px;\n  font-weight: 400;\n}\n.mat-step-sub-label-error {\n  font-weight: normal;\n}\n.mat-step-label-error {\n  font-size: 14px;\n}\n.mat-step-label-selected {\n  font-size: 14px;\n  font-weight: 500;\n}\n.mat-tab-group {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-tab-label, .mat-tab-link {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n}\n.mat-toolbar,\n.mat-toolbar h1,\n.mat-toolbar h2,\n.mat-toolbar h3,\n.mat-toolbar h4,\n.mat-toolbar h5,\n.mat-toolbar h6 {\n  font: 500 20px/32px Roboto, \"Helvetica Neue\", sans-serif;\n  margin: 0;\n}\n.mat-tooltip {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 10px;\n  padding-top: 6px;\n  padding-bottom: 6px;\n}\n.mat-tooltip-handset {\n  font-size: 14px;\n  padding-top: 8px;\n  padding-bottom: 8px;\n}\n.mat-list-item {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-list-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-list-base .mat-list-item {\n  font-size: 16px;\n}\n.mat-list-base .mat-list-item .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n.mat-list-base .mat-list-item .mat-line:nth-child(n+2) {\n  font-size: 14px;\n}\n.mat-list-base .mat-list-option {\n  font-size: 16px;\n}\n.mat-list-base .mat-list-option .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n.mat-list-base .mat-list-option .mat-line:nth-child(n+2) {\n  font-size: 14px;\n}\n.mat-list-base .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n  font-weight: 500;\n}\n.mat-list-base[dense] .mat-list-item {\n  font-size: 12px;\n}\n.mat-list-base[dense] .mat-list-item .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n.mat-list-base[dense] .mat-list-item .mat-line:nth-child(n+2) {\n  font-size: 12px;\n}\n.mat-list-base[dense] .mat-list-option {\n  font-size: 12px;\n}\n.mat-list-base[dense] .mat-list-option .mat-line {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  display: block;\n  box-sizing: border-box;\n}\n.mat-list-base[dense] .mat-list-option .mat-line:nth-child(n+2) {\n  font-size: 12px;\n}\n.mat-list-base[dense] .mat-subheader {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 12px;\n  font-weight: 500;\n}\n.mat-option {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 16px;\n}\n.mat-optgroup-label {\n  font: 500 14px/24px Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-simple-snackbar {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n  font-size: 14px;\n}\n.mat-simple-snackbar-action {\n  line-height: 1;\n  font-family: inherit;\n  font-size: inherit;\n  font-weight: 500;\n}\n.mat-tree {\n  font-family: Roboto, \"Helvetica Neue\", sans-serif;\n}\n.mat-tree-node,\n.mat-nested-tree-node {\n  font-weight: 400;\n  font-size: 14px;\n}\n.mat-ripple {\n  overflow: hidden;\n  position: relative;\n}\n.mat-ripple.mat-ripple-unbounded {\n  overflow: visible;\n}\n.mat-ripple-element {\n  position: absolute;\n  border-radius: 50%;\n  pointer-events: none;\n  transition: opacity, -webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  transition: opacity, transform 0ms cubic-bezier(0, 0, 0.2, 1), -webkit-transform 0ms cubic-bezier(0, 0, 0.2, 1);\n  -webkit-transform: scale(0);\n          transform: scale(0);\n}\n@media (-ms-high-contrast: active) {\n  .mat-ripple-element {\n    display: none;\n  }\n}\n.cdk-visually-hidden {\n  border: 0;\n  clip: rect(0 0 0 0);\n  height: 1px;\n  margin: -1px;\n  overflow: hidden;\n  padding: 0;\n  position: absolute;\n  width: 1px;\n  outline: 0;\n  -webkit-appearance: none;\n  -moz-appearance: none;\n}\n.cdk-overlay-container, .cdk-global-overlay-wrapper {\n  pointer-events: none;\n  top: 0;\n  left: 0;\n  height: 100%;\n  width: 100%;\n}\n.cdk-overlay-container {\n  position: fixed;\n  z-index: 1000;\n}\n.cdk-overlay-container:empty {\n  display: none;\n}\n.cdk-global-overlay-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  position: absolute;\n  z-index: 1000;\n}\n.cdk-overlay-pane {\n  position: absolute;\n  pointer-events: auto;\n  box-sizing: border-box;\n  z-index: 1000;\n  display: -webkit-flex;\n  display: flex;\n  max-width: 100%;\n  max-height: 100%;\n}\n.cdk-overlay-backdrop {\n  position: absolute;\n  top: 0;\n  bottom: 0;\n  left: 0;\n  right: 0;\n  z-index: 1000;\n  pointer-events: auto;\n  -webkit-tap-highlight-color: transparent;\n  transition: opacity 400ms cubic-bezier(0.25, 0.8, 0.25, 1);\n  opacity: 0;\n}\n.cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n  opacity: 1;\n}\n@media screen and (-ms-high-contrast: active) {\n  .cdk-overlay-backdrop.cdk-overlay-backdrop-showing {\n    opacity: 0.6;\n  }\n}\n.cdk-overlay-dark-backdrop {\n  background: rgba(0, 0, 0, 0.32);\n}\n.cdk-overlay-transparent-backdrop, .cdk-overlay-transparent-backdrop.cdk-overlay-backdrop-showing {\n  opacity: 0;\n}\n.cdk-overlay-connected-position-bounding-box {\n  position: absolute;\n  z-index: 1000;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  min-width: 1px;\n  min-height: 1px;\n}\n.cdk-global-scrollblock {\n  position: fixed;\n  width: 100%;\n  overflow-y: scroll;\n}\n@-webkit-keyframes cdk-text-field-autofill-start {\n  /*!*/\n}\n@keyframes cdk-text-field-autofill-start {\n  /*!*/\n}\n@-webkit-keyframes cdk-text-field-autofill-end {\n  /*!*/\n}\n@keyframes cdk-text-field-autofill-end {\n  /*!*/\n}\n.cdk-text-field-autofill-monitored:-webkit-autofill {\n  -webkit-animation-name: cdk-text-field-autofill-start;\n          animation-name: cdk-text-field-autofill-start;\n}\n.cdk-text-field-autofill-monitored:not(:-webkit-autofill) {\n  -webkit-animation-name: cdk-text-field-autofill-end;\n          animation-name: cdk-text-field-autofill-end;\n}\ntextarea.cdk-textarea-autosize {\n  resize: none;\n}\ntextarea.cdk-textarea-autosize-measuring {\n  height: auto !important;\n  overflow: hidden !important;\n  padding: 2px 0 !important;\n  box-sizing: content-box !important;\n}\n:host {\n  display: block;\n  height: 100%;\n  width: 100%;\n}\n.toolbar {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: center;\n          justify-content: center;\n  height: 6rem;\n  z-index: 800;\n  font-size: 2rem;\n  line-height: 1.9rem;\n}\n.main-app-container {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  height: 100%;\n}\n.game-container {\n  -webkit-flex: 1;\n          flex: 1;\n  width: 100%;\n  overflow-y: scroll;\n}\n.navbar {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  height: 7rem;\n  z-index: 800;\n  background: #fff;\n  font-size: 1rem;\n  line-height: 1.6rem;\n}\n.navbar a {\n  text-decoration: none;\n  color: #666666;\n}\n.navbar a.active {\n  color: #3f51b5;\n}\n.nav-item {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-align-items: center;\n          align-items: center;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9hcHAuY29tcG9uZW50LnNjc3MiLCIvVXNlcnMvcGVyeC9Eb2N1bWVudHMvR2l0SHViL21pY3Jvc2l0ZS1hcHBzLW5nL2FwcHMvYWJlbnNvbi9zdGRpbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUF5MUNBLGtDQUFBO0FBOGhEQSwyQ0FBQTtBQXdDQSxxQkFBQTtBQTcrQkU7RUFDRSxnQkFyTG9CO0VBc0xwQixlQXZMa0I7RUF3TGxCLGlEQUFBO0FDOTZESjtBRGk3REU7RUFFRSxjQUFBO0FDLzZESjtBRGs3REU7RUFDRSxlQUFBO0FDLzZESjtBRHNuREU7RUE1TkUsd0RBQUE7RUE4TkEsZ0JBQUE7QUNubkRKO0FEc25ERTtFQWpPRSx3REFBQTtFQW1PQSxnQkFBQTtBQ25uREo7QURzbkRFO0VBdE9FLHdEQUFBO0VBd09BLGdCQUFBO0FDbm5ESjtBRHNuREU7RUEzT0Usd0RBQUE7RUE2T0EsZ0JBQUE7QUNubkRKO0FEeW5ERTtFQW5QRSwyREFBQTtFQTJQQSxnQkFBQTtBQzVuREo7QUQrbkRFO0VBOVBFLDBEQUFBO0VBc1FBLGdCQUFBO0FDbG9ESjtBRHFvREU7RUF6UUUsd0RBQUE7QUN4M0NKO0FEcW9ERTtFQTdRRSx3REFBQTtBQ3AzQ0o7QURvb0RJO0VBQ0UsZ0JBQUE7QUNsb0ROO0FEc29ERTtFQXJSRSx3REFBQTtBQzcyQ0o7QURzb0RFO0VBelJFLDBEQUFBO0VBWUYsdUJBQUE7RUErUUUsZ0JBQUE7QUNsb0RKO0FEcW9ERTtFQTlSRSx3REFBQTtFQVlGLHVCQUFBO0VBb1JFLGdCQUFBO0FDam9ESjtBRG9vREU7RUFuU0Usd0RBQUE7RUFZRix3QkFBQTtFQXlSRSxnQkFBQTtBQ2hvREo7QURtb0RFO0VBeFNFLHdEQUFBO0VBMFNBLGdCQUFBO0FDaG9ESjtBRCszREU7RUF6aUJFLHdEQUFBO0FDbDFDSjtBRHNoRUU7O0VBR0ksaURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUNwaEVOO0FENG1FRTtFQUNFLGlEQUFBO0FDem1FSjtBRHdvRUU7RUFDRSxpREFBQTtBQ3JvRUo7QUR3b0VFO0VBRUksZUFBQTtFQUNBLGdCQUFBO0FDdG9FTjtBRDBvRUU7RUFDRSxlQUFBO0FDdm9FSjtBRDBvRUU7O0VBRUUsZUFBQTtBQ3ZvRUo7QURnd0VFO0VBQ0UsaURBQUE7QUM3dkVKO0FEaXdFRTtFQUNFLGlCQUFBO0FDOXZFSjtBRDQwRUU7RUFDRSxlQUFBO0VBQ0EsZ0JBQUE7QUN6MEVKO0FEMjBFSTs7RUFFRSxlQTNFc0I7QUM5dkU1QjtBRGczRUU7RUFDRSxpREFBQTtBQzcyRUo7QURnM0VFO0VBQ0UsZUFBQTtFQUNBLGdCQUFBO0FDNzJFSjtBRGczRUU7RUFDRSxlQUFBO0FDNzJFSjtBRDAvRUU7RUFDRSxpREFBQTtBQ3YvRUo7QUQwL0VFO0VBQ0UsZUFySTBCO0FDbDNFOUI7QUQwL0VFOztFQUdJLGVBQUE7RUFDQSxnQkFBQTtBQ3gvRU47QUQ0L0VFO0VBRUksZUFqSmlDO0VBa0pqQyxnQkFBQTtBQzEvRU47QURpaEZFO0VBN3dDRSx3REFBQTtBQ2h3Q0o7QUQ0a0ZFO0VBRUksaURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUMxa0ZOO0FEOGtGRTtFQXAxQ0Usd0RBQUE7QUN0dkNKO0FEdytJRTtFQTN2R0Usa0JBZVU7RUFkVixnQkFlWTtFQWRaLGtCQWVZO0VBZFosaURBZVk7QUN4dkNoQjtBRHErSUU7RUFDRSx5QkFQdUI7QUMzOUkzQjtBRHcrSUk7O0VBQ0UsZUF2QjJCO0VBd0IzQixrQkF0Q1U7QUM5N0loQjtBRHcrSUk7O0VBQ0UsYUFBQTtFQUNBLFlBQUE7QUNyK0lOO0FEdStJTTs7RUFDRSxlQUFBO0VBQ0Esa0JBaERRO0FDcDdJaEI7QUR5K0lFO0VBQ0UsZ0JBQUE7RUFFQSx1Q0FBQTtBQ3YrSUo7QUQyK0lJOztFQXJFRixxREFBQTtVQUFBLDZDQUFBO0VBRUEsc0JBQUE7QUNsNklGO0FENitJSTtFQTdFRixxREFBQTtVQUFBLDZDQUFBO0VBRUEsc0JBQUE7QUM5NUlGO0FEZy9JRTtFQUNFLGVBQUE7RUFDQSxzQkFuRWlCO0FDMTZJckI7QURnL0lFO0VBQ0UsY0FBQTtBQzcrSUo7QURnL0lFO0VBR0UsaUJBaEV1QjtBQy82STNCO0FEay9JRTtFQUNFLGNBL0VvQjtFQWdGcEIsMEJBekVxQjtFQTZFckIsZ0NBQUE7QUNsL0lKO0FEeWlJSTtFQUNFLHNCQUpxQjtBQ2xpSTNCO0FEeWlJSTtFQUNFLG1CQUFBO0FDdmlJTjtBRDJpSU07O0VBekRKLDRGQUFBO1VBQUEsb0ZBQUE7RUFJQSxpREFBQTtFQUdBLHNCQUFBO0FDbi9IRjtBRDRpSU07RUFoRUosOEZBQUE7VUFBQSxzRkFBQTtFQUlBLGlEQUFBO0VBR0Esc0JBQUE7QUM5K0hGO0FEK2lJTTtFQXhFSiw4RkFBQTtVQUFBLHNGQUFBO0VBSUEsaURBQUE7RUFHQSxzQkFBQTtBQ3orSEY7QURpaklJO0VBQ0UsY0FBQTtBQy9pSU47QURraklJO0VBR0UsY0F6Q3FCO0FDemdJM0I7QURxaklJO0VBQ0UsMEJBakRtQjtFQXFEbkIsZ0NBQUE7QUN0aklOO0FENGpJRTtFQUdNOztJQXZGTixxREFBQTtZQUFBLDZDQUFBO0VDbCtIQTtFRGdrSU07SUE5Rk4scURBQUE7WUFBQSw2Q0FBQTtFQy85SEE7RURxa0lNO0lBdEdOLG9EQUFBO1lBQUEsNENBQUE7RUM1OUhBO0FBQ0Y7QURnNEhJO0VBQ0UsMEJBQUE7QUM5M0hOO0FEaTRISTtFQUNFLGNBQUE7RUFDQSxrQkFUMkI7QUN0M0hqQztBRG00SE07O0VBaENKLHFEQUFBO1VBQUEsNkNBQUE7RUFFQSxzQkFBQTtBQ2gySEY7QUR1NEhNO0VBekNKLHFEQUFBO1VBQUEsNkNBQUE7RUFFQSxzQkFBQTtBQzUxSEY7QURpcUlJO0VBQ0Usb0JBQUE7QUM5cElOO0FEaXFJSTtFQUNFLGNBQUE7RUFDQSxtQkFUOEI7QUN0cElwQztBRG1xSU07O0VBdkNKLHFEQUFBO1VBQUEsNkNBQUE7RUFFQSxzQkFBQTtBQ3puSUY7QUR1cUlNO0VBaERKLHFEQUFBO1VBQUEsNkNBQUE7RUFFQSxzQkFBQTtBQ3JuSUY7QUQ4L0VFOztFQUdFLGVBQUE7QUM1L0VKO0FENDhFRTs7RUFSQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFRRSxjQUFBO0VBQ0Esc0JBQUE7QUN2OEVKO0FEMDhFSTs7RUFDRSxlQXdDcUI7QUMvK0UzQjtBRGlwRkU7RUFDRSxxQkFBQTtBQzlvRko7QURteEZFO0VBRUksaURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUNqeEZOO0FEOHpGRTs7RUFHSSxpREFBQTtFQUNBLGVBQUE7QUM1ekZOO0FEcTlGRTtFQUNFLGlEQUFBO0FDbDlGSjtBRDBoR0U7RUFDRSxpREFBQTtBQ3ZoR0o7QUQwaEdFO0VBQ0UsZUFBQTtBQ3ZoR0o7QURrckdFO0VBQ0UsaURBQUE7QUMvcUdKO0FEdXpHRTtFQUVJLGlEQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDcnpHTjtBRHU0R0U7RUFDRSxpREFBQTtBQ3A0R0o7QUR1NEdFO0VBRUksZUFBQTtFQUNBLGdCQUFBO0FDcjRHTjtBRHk0R0U7RUFDRSxtQkFBQTtBQ3Q0R0o7QUR5NEdFO0VBQ0UsZUFBQTtBQ3Q0R0o7QUR5NEdFO0VBRUksZUFBQTtFQUNBLGdCQUFBO0FDdjRHTjtBRHNpSEU7RUFDRSxpREFBQTtBQ25pSEo7QURzaUhFO0VBRUksaURBQUE7RUFDQSxlQUFBO0VBQ0EsZ0JBQUE7QUNwaUhOO0FEbW1IRTs7Ozs7OztFQWhsRkUsd0RBQUE7RUF3bEZBLFNBQUE7QUNobUhKO0FEd25IRTtFQUNFLGlEQUFBO0VBQ0EsZUFqQm9CO0VBa0JwQixnQkFqQjJCO0VBa0IzQixtQkFsQjJCO0FDbm1IL0I7QUR3bkhFO0VBQ0UsZUFuQjRCO0VBb0I1QixnQkFsQkE7RUFtQkEsbUJBbkJBO0FDbG1ISjtBRGdtRkU7RUFDRSxpREFIWTtBQzFsRmhCO0FEZ21GRTtFQUNFLGlEQVBZO0FDdGxGaEI7QURrbUZJO0VBQ0UsZUFBQTtBQy9sRk47QURzMUVFO0VBUkEsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0VBUUUsY0FBQTtFQUNBLHNCQUFBO0FDbDFFSjtBRHExRUk7RUFDRSxlQW1RdUI7QUN0bEY3QjtBRHlsRkk7RUFDRSxlQUFBO0FDdmxGTjtBRHkwRUU7RUFSQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFRRSxjQUFBO0VBQ0Esc0JBQUE7QUNyMEVKO0FEdzBFSTtFQUNFLGVBd1F1QjtBQzlrRjdCO0FEaWxGSTtFQUNFLGlEQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDL2tGTjtBRHFsRkk7RUFDRSxlQUFBO0FDbGxGTjtBRHN6RUU7RUFSQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsdUJBQUE7RUFRRSxjQUFBO0VBQ0Esc0JBQUE7QUNsekVKO0FEcXpFSTtFQUNFLGVBc1J1QjtBQ3prRjdCO0FENGtGSTtFQUNFLGVBQUE7QUMxa0ZOO0FEeXlFRTtFQVJBLG1CQUFBO0VBQ0EsZ0JBQUE7RUFDQSx1QkFBQTtFQVFFLGNBQUE7RUFDQSxzQkFBQTtBQ3J5RUo7QUR3eUVJO0VBQ0UsZUEyUnVCO0FDamtGN0I7QURva0ZJO0VBQ0UsaURBMUNVO0VBMkNWLGVBQUE7RUFDQSxnQkFBQTtBQ2xrRk47QUQrK0JFO0VBRUksaURBQUE7RUFDQSxlQUFBO0FDNytCTjtBRG1nQ0U7RUFyRkUsd0RBQUE7QUMxNkJKO0FEK2pIRTtFQUVJLGlEQUFBO0VBQ0EsZUFBQTtBQzdqSE47QURpa0hFO0VBQ0UsY0FBQTtFQUVFLG9CQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQy9qSE47QURtdklFO0VBQ0UsaURBQUE7QUNodklKO0FEbXZJRTs7RUFFRSxnQkFBQTtFQUNBLGVBQUE7QUNodklKO0FEeXlCRTtFQUNFLGdCQUFBO0VBSUEsa0JBQUE7QUN6eUJKO0FENHlCRTtFQUNFLGlCQUFBO0FDenlCSjtBRDR5QkU7RUFDRSxrQkFBQTtFQUNBLGtCQUFBO0VBQ0Esb0JBQUE7RUFFQSxxRUFBQTtFQUFBLDZEQUFBO0VBQUEsK0dBQUE7RUFDQSwyQkFBQTtVQUFBLG1CQUFBO0FDMXlCSjtBRDFYRTtFQThwQ0E7SUFVSSxhQUFBO0VDMXlCSjtBQUNGO0FEelpFO0VBQ0UsU0FBQTtFQUNBLG1CQUFBO0VBQ0EsV0FBQTtFQUNBLFlBQUE7RUFDQSxnQkFBQTtFQUNBLFVBQUE7RUFDQSxrQkFBQTtFQUNBLFVBQUE7RUFHQSxVQUFBO0VBR0Esd0JBQUE7RUFDQSxxQkFBQTtBQ3daSjtBRHRpQkU7RUFFRSxvQkFBQTtFQUdBLE1BQUE7RUFDQSxPQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNzaUJKO0FEbGlCRTtFQUNFLGVBQUE7RUFDQSxhQTNCNEI7QUNna0JoQztBRG5pQkk7RUFHRSxhQUFBO0FDbWlCTjtBRDNoQkU7RUFDRSxxQkFBQTtFQUFBLGFBQUE7RUFDQSxrQkFBQTtFQUNBLGFBMUNrQjtBQ3drQnRCO0FEMWhCRTtFQUdFLGtCQUFBO0VBQ0Esb0JBQUE7RUFDQSxzQkFBQTtFQUNBLGFBcERrQjtFQXdEbEIscUJBQUE7RUFBQSxhQUFBO0VBQ0EsZUFBQTtFQUNBLGdCQUFBO0FDd2hCSjtBRHJoQkU7RUFFRSxrQkFBQTtFQUNBLE1BQUE7RUFDQSxTQUFBO0VBQ0EsT0FBQTtFQUNBLFFBQUE7RUFFQSxhQXBFMkI7RUFxRTNCLG9CQUFBO0VBQ0Esd0NBQUE7RUFDQSwwREFBQTtFQUNBLFVBQUE7QUNzaEJKO0FEcGhCSTtFQUNFLFVBQUE7QUNzaEJOO0FEaGhCTTtFQVBGO0lBUUksWUFBQTtFQ21oQk47QUFDRjtBRC9nQkU7RUFDRSwrQkFyRm1DO0FDdW1CdkM7QUQxZ0JJO0VBQ0UsVUFBQTtBQzZnQk47QUR2Z0JFO0VBQ0Usa0JBQUE7RUFDQSxhQTFHa0I7RUErR2xCLHFCQUFBO0VBQUEsYUFBQTtFQUlBLDhCQUFBO1VBQUEsc0JBQUE7RUFHQSxjQUFBO0VBQ0EsZUFBQTtBQ2lnQko7QUQ3ZkU7RUFDRSxlQUFBO0VBS0EsV0FBQTtFQUtBLGtCQUFBO0FDd2ZKO0FEOWNFO0VBQTBDLElBQUE7QUNrZDVDO0FEbGRFO0VBQTBDLElBQUE7QUNrZDVDO0FEamRFO0VBQXdDLElBQUE7QUNvZDFDO0FEcGRFO0VBQXdDLElBQUE7QUNvZDFDO0FEbGRFO0VBQ0UscURBQUE7VUFBQSw2Q0FBQTtBQ29kSjtBRGpkRTtFQUNFLG1EQUFBO1VBQUEsMkNBQUE7QUNvZEo7QUQvY0U7RUFDRSxZQUFBO0FDa2RKO0FENWNFO0VBQ0UsdUJBQUE7RUFDQSwyQkFBQTtFQUdBLHlCQUFBO0VBQ0Esa0NBQUE7QUM2Y0o7QUN2cEJBO0VBQ0UsY0FBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0FEMHBCRjtBQ3ZwQkE7RUFDRSxxQkFBQTtFQUFBLGFBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0VBQ0EsWUFBQTtFQUNBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUQwcEJGO0FDdnBCQTtFQUNFLHFCQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSxZQUFBO0FEMHBCRjtBQ3ZwQkE7RUFDRSxlQUFBO1VBQUEsT0FBQTtFQUNBLFdBQUE7RUFDQSxrQkFBQTtBRDBwQkY7QUN2cEJBO0VBQ0UscUJBQUE7RUFBQSxhQUFBO0VBQ0EscUNBQUE7VUFBQSw2QkFBQTtFQUNBLFlBQUE7RUFDQSxZQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7QUQwcEJGO0FDeHBCRTtFQUNFLHFCQUFBO0VBQ0EsY0FBQTtBRDBwQko7QUN4cEJJO0VBQ0UsY0FBQTtBRDBwQk47QUNycEJBO0VBQ0UscUJBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7QUR3cEJGIiwiZmlsZSI6InNyYy9hcHAvYXBwLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLy8gSW1wb3J0IGFsbCB0aGUgdGhlbWluZyBmdW5jdGlvbmFsaXR5LlxuLy8gV2UgY2FuIHVzZSByZWxhdGl2ZSBpbXBvcnRzIGZvciBpbXBvcnRzIGZyb20gdGhlIGNkayBiZWNhdXNlIHdlIGJ1bmRsZSBldmVyeXRoaW5nXG4vLyB1cCBpbnRvIGEgc2luZ2xlIGZsYXQgc2NzcyBmaWxlIGZvciBtYXRlcmlhbC5cbi8vIFdlIHdhbnQgb3ZlcmxheXMgdG8gYWx3YXlzIGFwcGVhciBvdmVyIHVzZXIgY29udGVudCwgc28gc2V0IGEgYmFzZWxpbmVcbi8vIHZlcnkgaGlnaCB6LWluZGV4IGZvciB0aGUgb3ZlcmxheSBjb250YWluZXIsIHdoaWNoIGlzIHdoZXJlIHdlIGNyZWF0ZSB0aGUgbmV3XG4vLyBzdGFja2luZyBjb250ZXh0IGZvciBhbGwgb3ZlcmxheXMuXG4kY2RrLXotaW5kZXgtb3ZlcmxheS1jb250YWluZXI6IDEwMDAgIWRlZmF1bHQ7XG4kY2RrLXotaW5kZXgtb3ZlcmxheTogMTAwMCAhZGVmYXVsdDtcbiRjZGstei1pbmRleC1vdmVybGF5LWJhY2tkcm9wOiAxMDAwICFkZWZhdWx0O1xuXG4vLyBCYWNrZ3JvdW5kIGNvbG9yIGZvciBhbGwgb2YgdGhlIGJhY2tkcm9wc1xuJGNkay1vdmVybGF5LWRhcmstYmFja2Ryb3AtYmFja2dyb3VuZDogcmdiYSgwLCAwLCAwLCAwLjMyKSAhZGVmYXVsdDtcblxuLy8gRGVmYXVsdCBiYWNrZHJvcCBhbmltYXRpb24gaXMgYmFzZWQgb24gdGhlIE1hdGVyaWFsIERlc2lnbiBzd2lmdC1lYXNlLW91dC5cbiRiYWNrZHJvcC1hbmltYXRpb24tZHVyYXRpb246IDQwMG1zICFkZWZhdWx0O1xuJGJhY2tkcm9wLWFuaW1hdGlvbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjI1LCAwLjgsIDAuMjUsIDEpICFkZWZhdWx0O1xuXG5cbkBtaXhpbiBjZGstb3ZlcmxheSgpIHtcbiAgLmNkay1vdmVybGF5LWNvbnRhaW5lciwgLmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyIHtcbiAgICAvLyBEaXNhYmxlIGV2ZW50cyBmcm9tIGJlaW5nIGNhcHR1cmVkIG9uIHRoZSBvdmVybGF5IGNvbnRhaW5lci5cbiAgICBwb2ludGVyLWV2ZW50czogbm9uZTtcblxuICAgIC8vIFRoZSBjb250YWluZXIgc2hvdWxkIGJlIHRoZSBzaXplIG9mIHRoZSB2aWV3cG9ydC5cbiAgICB0b3A6IDA7XG4gICAgbGVmdDogMDtcbiAgICBoZWlnaHQ6IDEwMCU7XG4gICAgd2lkdGg6IDEwMCU7XG4gIH1cblxuICAvLyBUaGUgb3ZlcmxheS1jb250YWluZXIgaXMgYW4gaW52aXNpYmxlIGVsZW1lbnQgd2hpY2ggY29udGFpbnMgYWxsIGluZGl2aWR1YWwgb3ZlcmxheXMuXG4gIC5jZGstb3ZlcmxheS1jb250YWluZXIge1xuICAgIHBvc2l0aW9uOiBmaXhlZDtcbiAgICB6LWluZGV4OiAkY2RrLXotaW5kZXgtb3ZlcmxheS1jb250YWluZXI7XG5cbiAgICAmOmVtcHR5IHtcbiAgICAgIC8vIEhpZGUgdGhlIGVsZW1lbnQgd2hlbiBpdCBkb2Vzbid0IGhhdmUgYW55IGNoaWxkIG5vZGVzLiBUaGlzIGRvZXNuJ3RcbiAgICAgIC8vIGluY2x1ZGUgb3ZlcmxheXMgdGhhdCBoYXZlIGJlZW4gZGV0YWNoZWQsIHJhdGhlciB0aGFuIGRpc3Bvc2VkLlxuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAvLyBXZSB1c2UgYW4gZXh0cmEgd3JhcHBlciBlbGVtZW50IGluIG9yZGVyIHRvIHVzZSBtYWtlIHRoZSBvdmVybGF5IGl0c2VsZiBhIGZsZXggaXRlbS5cbiAgLy8gVGhpcyBtYWtlcyBjZW50ZXJpbmcgdGhlIG92ZXJsYXkgZWFzeSB3aXRob3V0IHJ1bm5pbmcgaW50byB0aGUgc3VicGl4ZWwgcmVuZGVyaW5nXG4gIC8vIHByb2JsZW1zIHRpZWQgdG8gdXNpbmcgYHRyYW5zZm9ybWAgYW5kIHdpdGhvdXQgaW50ZXJmZXJpbmcgd2l0aCB0aGUgb3RoZXIgcG9zaXRpb25cbiAgLy8gc3RyYXRlZ2llcy5cbiAgLmNkay1nbG9iYWwtb3ZlcmxheS13cmFwcGVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICB6LWluZGV4OiAkY2RrLXotaW5kZXgtb3ZlcmxheTtcbiAgfVxuXG4gIC8vIEEgc2luZ2xlIG92ZXJsYXkgcGFuZS5cbiAgLmNkay1vdmVybGF5LXBhbmUge1xuICAgIC8vIE5vdGU6IGl0J3MgaW1wb3J0YW50IGZvciB0aGlzIG9uZSB0byBzdGFydCBvZmYgYGFic29sdXRlYCxcbiAgICAvLyBpbiBvcmRlciBmb3IgdXMgdG8gYmUgYWJsZSB0byBtZWFzdXJlIGl0IGNvcnJlY3RseS5cbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgcG9pbnRlci1ldmVudHM6IGF1dG87XG4gICAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgICB6LWluZGV4OiAkY2RrLXotaW5kZXgtb3ZlcmxheTtcblxuICAgIC8vIEZvciBjb25uZWN0ZWQtcG9zaXRpb24gb3ZlcmxheXMsIHdlIHNldCBgZGlzcGxheTogZmxleGAgaW5cbiAgICAvLyBvcmRlciB0byBmb3JjZSBgbWF4LXdpZHRoYCBhbmQgYG1heC1oZWlnaHRgIHRvIHRha2UgZWZmZWN0LlxuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgbWF4LXdpZHRoOiAxMDAlO1xuICAgIG1heC1oZWlnaHQ6IDEwMCU7XG4gIH1cblxuICAuY2RrLW92ZXJsYXktYmFja2Ryb3Age1xuICAgIC8vIFRPRE8oamVsYm91cm4pOiByZXVzZSBzaWRlbmF2IGZ1bGxzY3JlZW4gbWl4aW4uXG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRvcDogMDtcbiAgICBib3R0b206IDA7XG4gICAgbGVmdDogMDtcbiAgICByaWdodDogMDtcblxuICAgIHotaW5kZXg6ICRjZGstei1pbmRleC1vdmVybGF5LWJhY2tkcm9wO1xuICAgIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICAgIC13ZWJraXQtdGFwLWhpZ2hsaWdodC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgdHJhbnNpdGlvbjogb3BhY2l0eSAkYmFja2Ryb3AtYW5pbWF0aW9uLWR1cmF0aW9uICRiYWNrZHJvcC1hbmltYXRpb24tdGltaW5nLWZ1bmN0aW9uO1xuICAgIG9wYWNpdHk6IDA7XG5cbiAgICAmLmNkay1vdmVybGF5LWJhY2tkcm9wLXNob3dpbmcge1xuICAgICAgb3BhY2l0eTogMTtcblxuICAgICAgLy8gSW4gaGlnaCBjb250cmFzdCBtb2RlIHRoZSByZ2JhIGJhY2tncm91bmQgd2lsbCBiZWNvbWUgc29saWQgc28gd2UgbmVlZCB0byBmYWxsIGJhY2tcbiAgICAgIC8vIHRvIG1ha2luZyBpdCBvcGFxdWUgdXNpbmcgYG9wYWNpdHlgLiBOb3RlIHRoYXQgd2UgY2FuJ3QgdXNlIHRoZSBgY2RrLWhpZ2gtY29udHJhc3RgXG4gICAgICAvLyBtaXhpbiwgYmVjYXVzZSB3ZSBjYW4ndCBub3JtYWxpemUgdGhlIGltcG9ydCBwYXRoIHRvIHRoZSBfYTExeS5zY3NzIGJvdGggZm9yIHRoZVxuICAgICAgLy8gc291cmNlIGFuZCB3aGVuIHRoaXMgZmlsZSBpcyBkaXN0cmlidXRlZC4gU2VlICMxMDkwOC5cbiAgICAgIEBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XG4gICAgICAgIG9wYWNpdHk6IDAuNjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAuY2RrLW92ZXJsYXktZGFyay1iYWNrZHJvcCB7XG4gICAgYmFja2dyb3VuZDogJGNkay1vdmVybGF5LWRhcmstYmFja2Ryb3AtYmFja2dyb3VuZDtcbiAgfVxuXG4gIC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcCB7XG4gICAgLy8gTm90ZTogYXMgb2YgRmlyZWZveCA1NywgaGF2aW5nIHRoZSBiYWNrZHJvcCBiZSBgYmFja2dyb3VuZDogbm9uZWAgd2lsbCBwcmV2ZW50IGl0IGZyb21cbiAgICAvLyBjYXB0dXJpbmcgdGhlIHVzZXIncyBtb3VzZSBzY3JvbGwgZXZlbnRzLiBTaW5jZSB3ZSBhbHNvIGNhbid0IHVzZSBzb21ldGhpbmcgbGlrZVxuICAgIC8vIGByZ2JhKDAsIDAsIDAsIDApYCwgd2Ugd29yayBhcm91bmQgdGhlIGluY29uc2lzdGVuY3kgYnkgbm90IHNldHRpbmcgdGhlIGJhY2tncm91bmQgYXRcbiAgICAvLyBhbGwgYW5kIHVzaW5nIGBvcGFjaXR5YCB0byBtYWtlIHRoZSBlbGVtZW50IHRyYW5zcGFyZW50LlxuICAgICYsICYuY2RrLW92ZXJsYXktYmFja2Ryb3Atc2hvd2luZyB7XG4gICAgICBvcGFjaXR5OiAwO1xuICAgIH1cbiAgfVxuXG4gIC8vIE92ZXJsYXkgcGFyZW50IGVsZW1lbnQgdXNlZCB3aXRoIHRoZSBjb25uZWN0ZWQgcG9zaXRpb24gc3RyYXRlZ3kuIFVzZWQgdG8gY29uc3RyYWluIHRoZVxuICAvLyBvdmVybGF5IGVsZW1lbnQncyBzaXplIHRvIGZpdCB3aXRoaW4gdGhlIHZpZXdwb3J0LlxuICAuY2RrLW92ZXJsYXktY29ubmVjdGVkLXBvc2l0aW9uLWJvdW5kaW5nLWJveCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHotaW5kZXg6ICRjZGstei1pbmRleC1vdmVybGF5O1xuXG4gICAgLy8gV2UgdXNlIGBkaXNwbGF5OiBmbGV4YCBvbiB0aGlzIGVsZW1lbnQgZXhjbHVzaXZlbHkgZm9yIGNlbnRlcmluZyBjb25uZWN0ZWQgb3ZlcmxheXMuXG4gICAgLy8gV2hlbiAqbm90KiBjZW50ZXJpbmcsIGEgdG9wL2xlZnQvYm90dG9tL3JpZ2h0IHdpbGwgYmUgc2V0IHdoaWNoIG92ZXJyaWRlcyB0aGUgbm9ybWFsXG4gICAgLy8gZmxleCBsYXlvdXQuXG4gICAgZGlzcGxheTogZmxleDtcblxuICAgIC8vIFdlIHVzZSB0aGUgYGNvbHVtbmAgZGlyZWN0aW9uIGhlcmUgdG8gYXZvaWQgc29tZSBmbGV4Ym94IGlzc3VlcyBpbiBFZGdlXG4gICAgLy8gd2hlbiB1c2luZyB0aGUgXCJncm93IGFmdGVyIG9wZW5cIiBvcHRpb25zLlxuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG5cbiAgICAvLyBBZGQgc29tZSBkaW1lbnNpb25zIHNvIHRoZSBlbGVtZW50IGhhcyBhbiBgaW5uZXJUZXh0YCB3aGljaCBzb21lIHBlb3BsZSBkZXBlbmQgb24gaW4gdGVzdHMuXG4gICAgbWluLXdpZHRoOiAxcHg7XG4gICAgbWluLWhlaWdodDogMXB4O1xuICB9XG5cbiAgLy8gVXNlZCB3aGVuIGRpc2FibGluZyBnbG9iYWwgc2Nyb2xsaW5nLlxuICAuY2RrLWdsb2JhbC1zY3JvbGxibG9jayB7XG4gICAgcG9zaXRpb246IGZpeGVkO1xuXG4gICAgLy8gTmVjZXNzYXJ5IGZvciB0aGUgY29udGVudCBub3QgdG8gbG9zZSBpdHMgd2lkdGguIE5vdGUgdGhhdCB3ZSdyZSB1c2luZyAxMDAlLCBpbnN0ZWFkIG9mXG4gICAgLy8gMTAwdncsIGJlY2F1c2UgMTAwdncgaW5jbHVkZXMgdGhlIHdpZHRoIHBsdXMgdGhlIHNjcm9sbGJhciwgd2hlcmVhcyAxMDAlIGlzIHRoZSB3aWR0aFxuICAgIC8vIHRoYXQgdGhlIGVsZW1lbnQgaGFkIGJlZm9yZSB3ZSBtYWRlIGl0IGBmaXhlZGAuXG4gICAgd2lkdGg6IDEwMCU7XG5cbiAgICAvLyBOb3RlOiB0aGlzIHdpbGwgYWx3YXlzIGFkZCBhIHNjcm9sbGJhciB0byB3aGF0ZXZlciBlbGVtZW50IGl0IGlzIG9uLCB3aGljaCBjYW5cbiAgICAvLyBwb3RlbnRpYWxseSByZXN1bHQgaW4gZG91YmxlIHNjcm9sbGJhcnMuIEl0IHNob3VsZG4ndCBiZSBhbiBpc3N1ZSwgYmVjYXVzZSB3ZSB3b24ndFxuICAgIC8vIGJsb2NrIHNjcm9sbGluZyBvbiBhIHBhZ2UgdGhhdCBkb2Vzbid0IGhhdmUgYSBzY3JvbGxiYXIgaW4gdGhlIGZpcnN0IHBsYWNlLlxuICAgIG92ZXJmbG93LXk6IHNjcm9sbDtcbiAgfVxufVxuXG5AbWl4aW4gY2RrLWExMXkge1xuICAuY2RrLXZpc3VhbGx5LWhpZGRlbiB7XG4gICAgYm9yZGVyOiAwO1xuICAgIGNsaXA6IHJlY3QoMCAwIDAgMCk7XG4gICAgaGVpZ2h0OiAxcHg7XG4gICAgbWFyZ2luOiAtMXB4O1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG4gICAgcGFkZGluZzogMDtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgd2lkdGg6IDFweDtcblxuICAgIC8vIEF2b2lkIGJyb3dzZXJzIHJlbmRlcmluZyB0aGUgZm9jdXMgcmluZyBpbiBzb21lIGNhc2VzLlxuICAgIG91dGxpbmU6IDA7XG5cbiAgICAvLyBBdm9pZCBzb21lIGNhc2VzIHdoZXJlIHRoZSBicm93c2VyIHdpbGwgc3RpbGwgcmVuZGVyIHRoZSBuYXRpdmUgY29udHJvbHMgKHNlZSAjOTA0OSkuXG4gICAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xuICAgIC1tb3otYXBwZWFyYW5jZTogbm9uZTtcbiAgfVxufVxuXG4vLyBBcHBsaWVzIHN0eWxlcyBmb3IgdXNlcnMgaW4gaGlnaCBjb250cmFzdCBtb2RlLiBOb3RlIHRoYXQgdGhpcyBvbmx5IGFwcGxpZXNcbi8vIHRvIE1pY3Jvc29mdCBicm93c2Vycy4gQ2hyb21lIGNhbiBiZSBpbmNsdWRlZCBieSBjaGVja2luZyBmb3IgdGhlIGBodG1sW2hjXWBcbi8vIGF0dHJpYnV0ZSwgaG93ZXZlciBDaHJvbWUgaGFuZGxlcyBoaWdoIGNvbnRyYXN0IGRpZmZlcmVudGx5LlxuLy9cbi8vIEBwYXJhbSB0YXJnZXQgV2hpY2gga2luZCBvZiBoaWdoIGNvbnRyYXN0IHNldHRpbmcgdG8gdGFyZ2V0LiBEZWZhdWx0cyB0byBgYWN0aXZlYCwgY2FuIGJlXG4vLyAgICBgd2hpdGUtb24tYmxhY2tgIG9yIGBibGFjay1vbi13aGl0ZWAuXG5AbWl4aW4gY2RrLWhpZ2gtY29udHJhc3QoJHRhcmdldDogYWN0aXZlKSB7XG4gIEBtZWRpYSAoLW1zLWhpZ2gtY29udHJhc3Q6ICR0YXJnZXQpIHtcbiAgICBAY29udGVudDtcbiAgfVxufVxuXG4vLyBDb3JlIHN0eWxlcyB0aGF0IGVuYWJsZSBtb25pdG9yaW5nIGF1dG9maWxsIHN0YXRlIG9mIHRleHQgZmllbGRzLlxuQG1peGluIGNkay10ZXh0LWZpZWxkIHtcbiAgLy8gS2V5ZnJhbWVzIHRoYXQgYXBwbHkgbm8gc3R5bGVzLCBidXQgYWxsb3cgdXMgdG8gbW9uaXRvciB3aGVuIGFuIHRleHQgZmllbGQgYmVjb21lcyBhdXRvZmlsbGVkXG4gIC8vIGJ5IHdhdGNoaW5nIGZvciB0aGUgYW5pbWF0aW9uIGV2ZW50cyB0aGF0IGFyZSBmaXJlZCB3aGVuIHRoZXkgc3RhcnQuIE5vdGU6IHRoZSAvKiEqLyBjb21tZW50IGlzXG4gIC8vIG5lZWRlZCB0byBwcmV2ZW50IExpYlNhc3MgZnJvbSBzdHJpcHBpbmcgdGhlIGtleWZyYW1lcyBvdXQuXG4gIC8vIEJhc2VkIG9uOiBodHRwczovL21lZGl1bS5jb20vQGJydW5uL2RldGVjdGluZy1hdXRvZmlsbGVkLWZpZWxkcy1pbi1qYXZhc2NyaXB0LWFlZDU5OGQyNWRhN1xuICBAa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0IHsvKiEqL31cbiAgQGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1lbmQgey8qISovfVxuXG4gIC5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbCB7XG4gICAgYW5pbWF0aW9uLW5hbWU6IGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0O1xuICB9XG5cbiAgLmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDpub3QoOi13ZWJraXQtYXV0b2ZpbGwpIHtcbiAgICBhbmltYXRpb24tbmFtZTogY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kO1xuICB9XG5cbiAgLy8gUmVtb3ZlIHRoZSByZXNpemUgaGFuZGxlIG9uIGF1dG9zaXppbmcgdGV4dGFyZWFzLCBiZWNhdXNlIHdoYXRldmVyIGhlaWdodFxuICAvLyB0aGUgdXNlciByZXNpemVkIHRvIHdpbGwgYmUgb3ZlcndyaXR0ZW4gb25jZSB0aGV5IHN0YXJ0IHR5cGluZyBhZ2Fpbi5cbiAgdGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplIHtcbiAgICByZXNpemU6IG5vbmU7XG4gIH1cblxuICAvLyBUaGlzIGNsYXNzIGlzIHRlbXBvcmFyaWx5IGFwcGxpZWQgdG8gdGhlIHRleHRhcmVhIHdoZW4gaXQgaXMgYmVpbmcgbWVhc3VyZWQuIEl0IGlzIGltbWVkaWF0ZWx5XG4gIC8vIHJlbW92ZWQgd2hlbiBtZWFzdXJpbmcgaXMgY29tcGxldGUuIFdlIHVzZSBgIWltcG9ydGFudGAgcnVsZXMgaGVyZSB0byBtYWtlIHN1cmUgdXNlci1zcGVjaWZpZWRcbiAgLy8gcnVsZXMgZG8gbm90IGludGVyZmVyZSB3aXRoIHRoZSBtZWFzdXJlbWVudC5cbiAgdGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplLW1lYXN1cmluZyB7XG4gICAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbiAhaW1wb3J0YW50O1xuICAgIC8vIEhhdmluZyAycHggdG9wIGFuZCBib3R0b20gcGFkZGluZyBzZWVtcyB0byBmaXggYSBidWcgd2hlcmUgQ2hyb21lIGdldHMgYW4gaW5jb3JyZWN0XG4gICAgLy8gbWVhc3VyZW1lbnQuIFdlIGp1c3QgaGF2ZSB0byBhY2NvdW50IGZvciBpdCBsYXRlciBhbmQgc3VidHJhY3QgaXQgb2ZmIHRoZSBmaW5hbCByZXN1bHQuXG4gICAgcGFkZGluZzogMnB4IDAgIWltcG9ydGFudDtcbiAgICBib3gtc2l6aW5nOiBjb250ZW50LWJveCAhaW1wb3J0YW50O1xuICB9XG59XG5cbi8vIFVzZWQgdG8gZ2VuZXJhdGUgVUlEcyBmb3Iga2V5ZnJhbWVzIHVzZWQgdG8gY2hhbmdlIHRoZSB0ZXh0IGZpZWxkIGF1dG9maWxsIHN0eWxlcy5cbiRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudDogMDtcblxuLy8gTWl4aW4gdXNlZCB0byBhcHBseSBjdXN0b20gYmFja2dyb3VuZCBhbmQgZm9yZWdyb3VuZCBjb2xvcnMgdG8gYW4gYXV0b2ZpbGxlZCB0ZXh0IGZpZWxkLlxuLy8gQmFzZWQgb246IGh0dHBzOi8vc3RhY2tvdmVyZmxvdy5jb20vcXVlc3Rpb25zLzI3ODE1NDkvXG4vLyByZW1vdmluZy1pbnB1dC1iYWNrZ3JvdW5kLWNvbG91ci1mb3ItY2hyb21lLWF1dG9jb21wbGV0ZSNhbnN3ZXItMzc0MzIyNjBcbkBtaXhpbiBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvcigkYmFja2dyb3VuZCwgJGZvcmVncm91bmQ6JycpIHtcbiAgQGtleWZyYW1lcyBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci0jeyRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudH0ge1xuICAgIHRvIHtcbiAgICAgIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICAgICAgQGlmICRmb3JlZ3JvdW5kICE9ICcnIHsgY29sb3I6ICRmb3JlZ3JvdW5kOyB9XG4gICAgfVxuICB9XG5cbiAgJjotd2Via2l0LWF1dG9maWxsIHtcbiAgICBhbmltYXRpb24tbmFtZTogY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtY29sb3ItI3skY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtY29sb3ItZnJhbWUtY291bnR9O1xuICAgIGFuaW1hdGlvbi1maWxsLW1vZGU6IGJvdGg7XG4gIH1cblxuICAmLmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDotd2Via2l0LWF1dG9maWxsIHtcbiAgICBhbmltYXRpb24tbmFtZTogY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtc3RhcnQsXG4gICAgICAgICAgICAgICAgICAgIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWNvbG9yLSN7JGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWNvbG9yLWZyYW1lLWNvdW50fTtcbiAgfVxuXG4gICRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudDpcbiAgICAgICRjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1jb2xvci1mcmFtZS1jb3VudCArIDEgIWdsb2JhbDtcbn1cblxuXG4vLyBDb3JlIHN0eWxlcyB0aGF0IGNhbiBiZSB1c2VkIHRvIGFwcGx5IG1hdGVyaWFsIGRlc2lnbiB0cmVhdG1lbnRzIHRvIGFueSBlbGVtZW50LlxuLy8gTWVkaWEgcXVlcmllc1xuLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogQ2hhbmdlICRtYXQteHNtYWxsIGFuZCAkbWF0LXNtYWxsIHVzYWdlcyB0byByZWx5IG9uIEJyZWFrcG9pbnRPYnNlcnZlcixcbiRtYXQteHNtYWxsOiAnbWF4LXdpZHRoOiA1OTlweCc7XG4kbWF0LXNtYWxsOiAnbWF4LXdpZHRoOiA5NTlweCc7XG5cbi8vIFRPRE86IFJldmlzaXQgYWxsIHotaW5kaWNlcyBiZWZvcmUgYmV0YVxuLy8gei1pbmRleCBtYXN0ZXIgbGlzdFxuXG4kei1pbmRleC1mYWI6IDIwICFkZWZhdWx0O1xuJHotaW5kZXgtZHJhd2VyOiAxMDAgIWRlZmF1bHQ7XG5cbi8vIEdsb2JhbCBjb25zdGFudHNcbiRwaTogMy4xNDE1OTI2NTtcblxuLy8gUGFkZGluZyBiZXR3ZWVuIGlucHV0IHRvZ2dsZXMgYW5kIHRoZWlyIGxhYmVsc1xuJG1hdC10b2dnbGUtcGFkZGluZzogOHB4ICFkZWZhdWx0O1xuLy8gV2lkdGggYW5kIGhlaWdodCBvZiBpbnB1dCB0b2dnbGVzXG4kbWF0LXRvZ2dsZS1zaXplOiAyMHB4ICFkZWZhdWx0O1xuXG4vLyBFYXNpbmcgQ3VydmVzXG4vLyBUT0RPKGplbGJvdXJuKTogYWxsIG9mIHRoZXNlIG5lZWQgdG8gYmUgcmV2aXNpdGVkXG5cbi8vIFRoZSBkZWZhdWx0IGFuaW1hdGlvbiBjdXJ2ZXMgdXNlZCBieSBtYXRlcmlhbCBkZXNpZ24uXG4kbWF0LWxpbmVhci1vdXQtc2xvdy1pbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLCAwLCAwLjIsIDAuMSkgIWRlZmF1bHQ7XG4kbWF0LWZhc3Qtb3V0LXNsb3ctaW4tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLCAwLjIsIDEpICFkZWZhdWx0O1xuJG1hdC1mYXN0LW91dC1saW5lYXItaW4tdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC40LCAwLCAxLCAxKSAhZGVmYXVsdDtcblxuJGVhc2UtaW4tb3V0LWN1cnZlLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4zNSwgMCwgMC4yNSwgMSkgIWRlZmF1bHQ7XG5cbiRzd2lmdC1lYXNlLW91dC1kdXJhdGlvbjogNDAwbXMgIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1vdXQtdGltaW5nLWZ1bmN0aW9uOiBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKSAhZGVmYXVsdDtcbiRzd2lmdC1lYXNlLW91dDogYWxsICRzd2lmdC1lYXNlLW91dC1kdXJhdGlvbiAkc3dpZnQtZWFzZS1vdXQtdGltaW5nLWZ1bmN0aW9uICFkZWZhdWx0O1xuXG4kc3dpZnQtZWFzZS1pbi1kdXJhdGlvbjogMzAwbXMgIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1pbi10aW1pbmctZnVuY3Rpb246IGN1YmljLWJlemllcigwLjU1LCAwLCAwLjU1LCAwLjIpICFkZWZhdWx0O1xuJHN3aWZ0LWVhc2UtaW46IGFsbCAkc3dpZnQtZWFzZS1pbi1kdXJhdGlvbiAkc3dpZnQtZWFzZS1pbi10aW1pbmctZnVuY3Rpb24gIWRlZmF1bHQ7XG5cbiRzd2lmdC1lYXNlLWluLW91dC1kdXJhdGlvbjogNTAwbXMgIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1pbi1vdXQtdGltaW5nLWZ1bmN0aW9uOiAkZWFzZS1pbi1vdXQtY3VydmUtZnVuY3Rpb24gIWRlZmF1bHQ7XG4kc3dpZnQtZWFzZS1pbi1vdXQ6IGFsbCAkc3dpZnQtZWFzZS1pbi1vdXQtZHVyYXRpb24gJHN3aWZ0LWVhc2UtaW4tb3V0LXRpbWluZy1mdW5jdGlvbiAhZGVmYXVsdDtcblxuJHN3aWZ0LWxpbmVhci1kdXJhdGlvbjogODBtcyAhZGVmYXVsdDtcbiRzd2lmdC1saW5lYXItdGltaW5nLWZ1bmN0aW9uOiBsaW5lYXIgIWRlZmF1bHQ7XG4kc3dpZnQtbGluZWFyOiBhbGwgJHN3aWZ0LWxpbmVhci1kdXJhdGlvbiAkc3dpZnQtbGluZWFyLXRpbWluZy1mdW5jdGlvbiAhZGVmYXVsdDtcblxuXG5cbi8vIEEgY29sbGVjdGlvbiBvZiBtaXhpbnMgYW5kIENTUyBjbGFzc2VzIHRoYXQgY2FuIGJlIHVzZWQgdG8gYXBwbHkgZWxldmF0aW9uIHRvIGEgbWF0ZXJpYWxcbi8vIGVsZW1lbnQuXG4vLyBTZWU6IGh0dHBzOi8vbWF0ZXJpYWwuaW8vZGVzaWduL2Vudmlyb25tZW50L2VsZXZhdGlvbi5odG1sXG4vLyBFeGFtcGxlczpcbi8vXG4vL1xuLy8gLm1hdC1mb28ge1xuLy8gICBAaW5jbHVkZSAkbWF0LWVsZXZhdGlvbigyKTtcbi8vXG4vLyAgICY6YWN0aXZlIHtcbi8vICAgICBAaW5jbHVkZSAkbWF0LWVsZXZhdGlvbig4KTtcbi8vICAgfVxuLy8gfVxuLy9cbi8vIDxkaXYgaWQ9XCJleHRlcm5hbC1jYXJkXCIgY2xhc3M9XCJtYXQtZWxldmF0aW9uLXoyXCI+PHA+U29tZSBjb250ZW50PC9wPjwvZGl2PlxuLy9cbi8vIEZvciBhbiBleHBsYW5hdGlvbiBvZiB0aGUgZGVzaWduIGJlaGluZCBob3cgZWxldmF0aW9uIGlzIGltcGxlbWVudGVkLCBzZWUgdGhlIGRlc2lnbiBkb2MgYXRcbi8vIGh0dHBzOi8vZ29vLmdsL0txMGs5Wi5cblxuLy8gQ29sb3JzIGZvciB1bWJyYSwgcGVudW1icmEsIGFuZCBhbWJpZW50IHNoYWRvd3MuIEFzIGRlc2NyaWJlZCBpbiB0aGUgZGVzaWduIGRvYywgZWFjaCBlbGV2YXRpb25cbi8vIGxldmVsIGlzIGNyZWF0ZWQgdXNpbmcgYSBzZXQgb2YgMyBzaGFkb3cgdmFsdWVzLCBvbmUgZm9yIHVtYnJhICh0aGUgc2hhZG93IHJlcHJlc2VudGluZyB0aGVcbi8vIHNwYWNlIGNvbXBsZXRlbHkgb2JzY3VyZWQgYnkgYW4gb2JqZWN0IHJlbGF0aXZlIHRvIGl0cyBsaWdodCBzb3VyY2UpLCBvbmUgZm9yIHBlbnVtYnJhICh0aGVcbi8vIHNwYWNlIHBhcnRpYWxseSBvYnNjdXJlZCBieSBhbiBvYmplY3QpLCBhbmQgb25lIGZvciBhbWJpZW50ICh0aGUgc3BhY2Ugd2hpY2ggY29udGFpbnMgdGhlIG9iamVjdFxuLy8gaXRzZWxmKS4gRm9yIGEgZnVydGhlciBleHBsYW5hdGlvbiBvZiB0aGVzZSB0ZXJtcyBhbmQgdGhlaXIgbWVhbmluZ3MsIHNlZVxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvVW1icmEsX3BlbnVtYnJhX2FuZF9hbnR1bWJyYS5cblxuLy8gTWFwcyBmb3IgdGhlIGRpZmZlcmVudCBzaGFkb3cgc2V0cyBhbmQgdGhlaXIgdmFsdWVzIHdpdGhpbiBlYWNoIHotc3BhY2UuIFRoZXNlIHZhbHVlcyB3ZXJlXG4vLyBjcmVhdGVkIGJ5IHRha2luZyBhIGZldyByZWZlcmVuY2Ugc2hhZG93IHNldHMgY3JlYXRlZCBieSBHb29nbGUncyBEZXNpZ25lcnMgYW5kIGludGVycG9sYXRpbmdcbi8vIGFsbCBvZiB0aGUgdmFsdWVzIGJldHdlZW4gdGhlbS5cblxuQGZ1bmN0aW9uIF9nZXQtdW1icmEtbWFwKCRjb2xvciwgJG9wYWNpdHkpIHtcbiAgJHNoYWRvdy1jb2xvcjogaWYodHlwZS1vZigkY29sb3IpID09IGNvbG9yLCByZ2JhKCRjb2xvciwgJG9wYWNpdHkgKiAwLjIpLCAkY29sb3IpO1xuXG4gIEByZXR1cm4gKFxuICAgIDA6ICcwcHggMHB4IDBweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTogJzBweCAycHggMXB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjogJzBweCAzcHggMXB4IC0ycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMzogJzBweCAzcHggM3B4IC0ycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNDogJzBweCAycHggNHB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNTogJzBweCAzcHggNXB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNjogJzBweCAzcHggNXB4IC0xcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNzogJzBweCA0cHggNXB4IC0ycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgODogJzBweCA1cHggNXB4IC0zcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgOTogJzBweCA1cHggNnB4IC0zcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTA6ICcwcHggNnB4IDZweCAtM3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDExOiAnMHB4IDZweCA3cHggLTRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMjogJzBweCA3cHggOHB4IC00cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTM6ICcwcHggN3B4IDhweCAtNHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE0OiAnMHB4IDdweCA5cHggLTRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNTogJzBweCA4cHggOXB4IC01cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTY6ICcwcHggOHB4IDEwcHggLTVweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNzogJzBweCA4cHggMTFweCAtNXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE4OiAnMHB4IDlweCAxMXB4IC01cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTk6ICcwcHggOXB4IDEycHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMDogJzBweCAxMHB4IDEzcHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMTogJzBweCAxMHB4IDEzcHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMjogJzBweCAxMHB4IDE0cHggLTZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMzogJzBweCAxMXB4IDE0cHggLTdweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyNDogJzBweCAxMXB4IDE1cHggLTdweCAjeyRzaGFkb3ctY29sb3J9J1xuICApO1xufVxuXG5AZnVuY3Rpb24gX2dldC1wZW51bWJyYS1tYXAoJGNvbG9yLCAkb3BhY2l0eSkge1xuICAkc2hhZG93LWNvbG9yOiBpZih0eXBlLW9mKCRjb2xvcikgPT0gY29sb3IsIHJnYmEoJGNvbG9yLCAkb3BhY2l0eSAqIDAuMTQpLCAkY29sb3IpO1xuXG4gIEByZXR1cm4gKFxuICAgIDA6ICcwcHggMHB4IDBweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTogJzBweCAxcHggMXB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyOiAnMHB4IDJweCAycHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDM6ICcwcHggM3B4IDRweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgNDogJzBweCA0cHggNXB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICA1OiAnMHB4IDVweCA4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDY6ICcwcHggNnB4IDEwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDc6ICcwcHggN3B4IDEwcHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDg6ICcwcHggOHB4IDEwcHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDk6ICcwcHggOXB4IDEycHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEwOiAnMHB4IDEwcHggMTRweCAxcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTE6ICcwcHggMTFweCAxNXB4IDFweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMjogJzBweCAxMnB4IDE3cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEzOiAnMHB4IDEzcHggMTlweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTQ6ICcwcHggMTRweCAyMXB4IDJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNTogJzBweCAxNXB4IDIycHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE2OiAnMHB4IDE2cHggMjRweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTc6ICcwcHggMTdweCAyNnB4IDJweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxODogJzBweCAxOHB4IDI4cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE5OiAnMHB4IDE5cHggMjlweCAycHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjA6ICcwcHggMjBweCAzMXB4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMTogJzBweCAyMXB4IDMzcHggM3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIyOiAnMHB4IDIycHggMzVweCAzcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjM6ICcwcHggMjNweCAzNnB4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyNDogJzBweCAyNHB4IDM4cHggM3B4ICN7JHNoYWRvdy1jb2xvcn0nXG4gICk7XG59XG5cbkBmdW5jdGlvbiBfZ2V0LWFtYmllbnQtbWFwKCRjb2xvciwgJG9wYWNpdHkpIHtcbiAgJHNoYWRvdy1jb2xvcjogaWYodHlwZS1vZigkY29sb3IpID09IGNvbG9yLCByZ2JhKCRjb2xvciwgJG9wYWNpdHkgKiAwLjEyKSwgJGNvbG9yKTtcblxuICBAcmV0dXJuIChcbiAgICAwOiAnMHB4IDBweCAwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE6ICcwcHggMXB4IDNweCAwcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjogJzBweCAxcHggNXB4IDBweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAzOiAnMHB4IDFweCA4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDQ6ICcwcHggMXB4IDEwcHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDU6ICcwcHggMXB4IDE0cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDY6ICcwcHggMXB4IDE4cHggMHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDc6ICcwcHggMnB4IDE2cHggMXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDg6ICcwcHggM3B4IDE0cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDk6ICcwcHggM3B4IDE2cHggMnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEwOiAnMHB4IDRweCAxOHB4IDNweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxMTogJzBweCA0cHggMjBweCAzcHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTI6ICcwcHggNXB4IDIycHggNHB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDEzOiAnMHB4IDVweCAyNHB4IDRweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNDogJzBweCA1cHggMjZweCA0cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTU6ICcwcHggNnB4IDI4cHggNXB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE2OiAnMHB4IDZweCAzMHB4IDVweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAxNzogJzBweCA2cHggMzJweCA1cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMTg6ICcwcHggN3B4IDM0cHggNnB4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDE5OiAnMHB4IDdweCAzNnB4IDZweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMDogJzBweCA4cHggMzhweCA3cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjE6ICcwcHggOHB4IDQwcHggN3B4ICN7JHNoYWRvdy1jb2xvcn0nLFxuICAgIDIyOiAnMHB4IDhweCA0MnB4IDdweCAjeyRzaGFkb3ctY29sb3J9JyxcbiAgICAyMzogJzBweCA5cHggNDRweCA4cHggI3skc2hhZG93LWNvbG9yfScsXG4gICAgMjQ6ICcwcHggOXB4IDQ2cHggOHB4ICN7JHNoYWRvdy1jb2xvcn0nXG4gICk7XG59XG5cbi8vIFRoZSBkZWZhdWx0IGR1cmF0aW9uIHZhbHVlIGZvciBlbGV2YXRpb24gdHJhbnNpdGlvbnMuXG4kbWF0LWVsZXZhdGlvbi10cmFuc2l0aW9uLWR1cmF0aW9uOiAyODBtcyAhZGVmYXVsdDtcblxuLy8gVGhlIGRlZmF1bHQgZWFzaW5nIHZhbHVlIGZvciBlbGV2YXRpb24gdHJhbnNpdGlvbnMuXG4kbWF0LWVsZXZhdGlvbi10cmFuc2l0aW9uLXRpbWluZy1mdW5jdGlvbjogJG1hdC1mYXN0LW91dC1zbG93LWluLXRpbWluZy1mdW5jdGlvbjtcblxuLy8gVGhlIGRlZmF1bHQgY29sb3IgZm9yIGVsZXZhdGlvbiBzaGFkb3dzLlxuJG1hdC1lbGV2YXRpb24tY29sb3I6IGJsYWNrICFkZWZhdWx0O1xuXG4vLyBUaGUgZGVmYXVsdCBvcGFjaXR5IHNjYWxpbmcgdmFsdWUgZm9yIGVsZXZhdGlvbiBzaGFkb3dzLlxuJG1hdC1lbGV2YXRpb24tb3BhY2l0eTogMSAhZGVmYXVsdDtcblxuLy8gUHJlZml4IGZvciBlbGV2YXRpb24tcmVsYXRlZCBzZWxlY3RvcnMuXG4kX21hdC1lbGV2YXRpb24tcHJlZml4OiAnbWF0LWVsZXZhdGlvbi16JztcblxuLy8gQXBwbGllcyB0aGUgY29ycmVjdCBjc3MgcnVsZXMgdG8gYW4gZWxlbWVudCB0byBnaXZlIGl0IHRoZSBlbGV2YXRpb24gc3BlY2lmaWVkIGJ5ICR6VmFsdWUuXG4vLyBUaGUgJHpWYWx1ZSBtdXN0IGJlIGJldHdlZW4gMCBhbmQgMjQuXG5AbWl4aW4gbWF0LWVsZXZhdGlvbigkelZhbHVlLCAkY29sb3I6ICRtYXQtZWxldmF0aW9uLWNvbG9yLCAkb3BhY2l0eTogJG1hdC1lbGV2YXRpb24tb3BhY2l0eSkge1xuICBAaWYgdHlwZS1vZigkelZhbHVlKSAhPSBudW1iZXIgb3Igbm90IHVuaXRsZXNzKCR6VmFsdWUpIHtcbiAgICBAZXJyb3IgJyR6VmFsdWUgbXVzdCBiZSBhIHVuaXRsZXNzIG51bWJlcic7XG4gIH1cbiAgQGlmICR6VmFsdWUgPCAwIG9yICR6VmFsdWUgPiAyNCB7XG4gICAgQGVycm9yICckelZhbHVlIG11c3QgYmUgYmV0d2VlbiAwIGFuZCAyNCc7XG4gIH1cblxuICBib3gtc2hhZG93OiAje21hcC1nZXQoX2dldC11bWJyYS1tYXAoJGNvbG9yLCAkb3BhY2l0eSksICR6VmFsdWUpfSxcbiAgICAgICAgICAgICAgI3ttYXAtZ2V0KF9nZXQtcGVudW1icmEtbWFwKCRjb2xvciwgJG9wYWNpdHkpLCAkelZhbHVlKX0sXG4gICAgICAgICAgICAgICN7bWFwLWdldChfZ2V0LWFtYmllbnQtbWFwKCRjb2xvciwgJG9wYWNpdHkpLCAkelZhbHVlKX07XG59XG5cbkBtaXhpbiBfbWF0LXRoZW1lLWVsZXZhdGlvbigkelZhbHVlLCAkdGhlbWUsICRvcGFjaXR5OiAkbWF0LWVsZXZhdGlvbi1vcGFjaXR5KSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRlbGV2YXRpb24tY29sb3I6IG1hcC1nZXQoJGZvcmVncm91bmQsIGVsZXZhdGlvbik7XG4gICRlbGV2YXRpb24tY29sb3Itb3ItZGVmYXVsdDogaWYoJGVsZXZhdGlvbi1jb2xvciA9PSBudWxsLCAkbWF0LWVsZXZhdGlvbi1jb2xvciwgJGVsZXZhdGlvbi1jb2xvcik7XG5cbiAgQGluY2x1ZGUgbWF0LWVsZXZhdGlvbigkelZhbHVlLCAkZWxldmF0aW9uLWNvbG9yLW9yLWRlZmF1bHQsICRvcGFjaXR5KTtcbn1cblxuLy8gQXBwbGllcyB0aGUgZWxldmF0aW9uIHRvIGFuIGVsZW1lbnQgaW4gYSBtYW5uZXIgdGhhdCBhbGxvd3Ncbi8vIGNvbnN1bWVycyB0byBvdmVycmlkZSBpdCB2aWEgdGhlIE1hdGVyaWFsIGVsZXZhdGlvbiBjbGFzc2VzLlxuQG1peGluIG1hdC1vdmVycmlkYWJsZS1lbGV2YXRpb24oXG4gICAgJHpWYWx1ZSxcbiAgICAkY29sb3I6ICRtYXQtZWxldmF0aW9uLWNvbG9yLFxuICAgICRvcGFjaXR5OiAkbWF0LWVsZXZhdGlvbi1vcGFjaXR5KSB7XG4gICY6bm90KFtjbGFzcyo9JyN7JF9tYXQtZWxldmF0aW9uLXByZWZpeH0nXSkge1xuICAgIEBpbmNsdWRlIG1hdC1lbGV2YXRpb24oJHpWYWx1ZSwgJGNvbG9yLCAkb3BhY2l0eSk7XG4gIH1cbn1cblxuQG1peGluIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKCR6VmFsdWUsICR0aGVtZSwgJG9wYWNpdHk6ICRtYXQtZWxldmF0aW9uLW9wYWNpdHkpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGVsZXZhdGlvbi1jb2xvcjogbWFwLWdldCgkZm9yZWdyb3VuZCwgZWxldmF0aW9uKTtcbiAgJGVsZXZhdGlvbi1jb2xvci1vci1kZWZhdWx0OiBpZigkZWxldmF0aW9uLWNvbG9yID09IG51bGwsICRtYXQtZWxldmF0aW9uLWNvbG9yLCAkZWxldmF0aW9uLWNvbG9yKTtcblxuICBAaW5jbHVkZSBtYXQtb3ZlcnJpZGFibGUtZWxldmF0aW9uKCR6VmFsdWUsICRlbGV2YXRpb24tY29sb3Itb3ItZGVmYXVsdCwgJG9wYWNpdHkpO1xufVxuXG4vLyBSZXR1cm5zIGEgc3RyaW5nIHRoYXQgY2FuIGJlIHVzZWQgYXMgdGhlIHZhbHVlIGZvciBhIHRyYW5zaXRpb24gcHJvcGVydHkgZm9yIGVsZXZhdGlvbi5cbi8vIENhbGxpbmcgdGhpcyBmdW5jdGlvbiBkaXJlY3RseSBpcyB1c2VmdWwgaW4gc2l0dWF0aW9ucyB3aGVyZSBhIGNvbXBvbmVudCBuZWVkcyB0byB0cmFuc2l0aW9uXG4vLyBtb3JlIHRoYW4gb25lIHByb3BlcnR5LlxuLy9cbi8vIC5mb28ge1xuLy8gICB0cmFuc2l0aW9uOiBtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24tcHJvcGVydHktdmFsdWUoKSwgb3BhY2l0eSAxMDBtcyBlYXNlO1xuLy8gfVxuQGZ1bmN0aW9uIG1hdC1lbGV2YXRpb24tdHJhbnNpdGlvbi1wcm9wZXJ0eS12YWx1ZShcbiAgICAkZHVyYXRpb246ICRtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24tZHVyYXRpb24sXG4gICAgJGVhc2luZzogJG1hdC1lbGV2YXRpb24tdHJhbnNpdGlvbi10aW1pbmctZnVuY3Rpb24pIHtcbiAgQHJldHVybiBib3gtc2hhZG93ICN7JGR1cmF0aW9ufSAjeyRlYXNpbmd9O1xufVxuXG4vLyBBcHBsaWVzIHRoZSBjb3JyZWN0IGNzcyBydWxlcyBuZWVkZWQgdG8gaGF2ZSBhbiBlbGVtZW50IHRyYW5zaXRpb24gYmV0d2VlbiBlbGV2YXRpb25zLlxuLy8gVGhpcyBtaXhpbiBzaG91bGQgYmUgYXBwbGllZCB0byBlbGVtZW50cyB3aG9zZSBlbGV2YXRpb24gdmFsdWVzIHdpbGwgY2hhbmdlIGRlcGVuZGluZyBvbiB0aGVpclxuLy8gY29udGV4dCAoZS5nLiB3aGVuIGFjdGl2ZSBvciBkaXNhYmxlZCkuXG4vL1xuLy8gTk9URSh0cmF2aXNrYXVmbWFuKTogQm90aCB0aGlzIG1peGluIGFuZCB0aGUgYWJvdmUgZnVuY3Rpb24gdXNlIGRlZmF1bHQgcGFyYW1ldGVycyBzbyB0aGV5IGNhblxuLy8gYmUgdXNlZCBpbiB0aGUgc2FtZSB3YXkgYnkgY2xpZW50cy5cbkBtaXhpbiBtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24oXG4gICAgJGR1cmF0aW9uOiAkbWF0LWVsZXZhdGlvbi10cmFuc2l0aW9uLWR1cmF0aW9uLFxuICAgICRlYXNpbmc6ICRtYXQtZWxldmF0aW9uLXRyYW5zaXRpb24tdGltaW5nLWZ1bmN0aW9uKSB7XG4gIHRyYW5zaXRpb246IG1hdC1lbGV2YXRpb24tdHJhbnNpdGlvbi1wcm9wZXJ0eS12YWx1ZSgkZHVyYXRpb24sICRlYXNpbmcpO1xufVxuXG4vLyBDb2xvciBwYWxldHRlcyBmcm9tIHRoZSBNYXRlcmlhbCBEZXNpZ24gc3BlYy5cbi8vIFNlZSBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb2xvci9cbi8vXG4vLyBDb250cmFzdCBjb2xvcnMgYXJlIGhhcmQtY29kZWQgYmVjYXVzZSBpdCBpcyB0b28gZGlmZmljdWx0IChwcm9iYWJseSBpbXBvc3NpYmxlKSB0b1xuLy8gY2FsY3VsYXRlIHRoZW0uIFRoZXNlIGNvbnRyYXN0IGNvbG9ycyBhcmUgcHVsbGVkIGZyb20gdGhlIHB1YmxpYyBNYXRlcmlhbCBEZXNpZ24gc3BlYyBzd2F0Y2hlcy5cbi8vIFdoaWxlIHRoZSBjb250cmFzdCBjb2xvcnMgaW4gdGhlIHNwZWMgYXJlIG5vdCBwcmVzY3JpcHRpdmUsIHdlIHVzZSB0aGVtIGZvciBjb252ZW5pZW5jZS5cblxuXG4vLyBAZGVwcmVjYXRlZCByZW5hbWVkIHRvICRkYXJrLXByaW1hcnktdGV4dC5cbi8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiRibGFjay04Ny1vcGFjaXR5OiByZ2JhKGJsYWNrLCAwLjg3KTtcbi8vIEBkZXByZWNhdGVkIHJlbmFtZWQgdG8gJGxpZ2h0LXByaW1hcnktdGV4dC5cbi8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiR3aGl0ZS04Ny1vcGFjaXR5OiByZ2JhKHdoaXRlLCAwLjg3KTtcbi8vIEBkZXByZWNhdGVkIHVzZSAkZGFyay1bc2Vjb25kYXJ5LXRleHQsZGlzYWJsZWQtdGV4dCxkaXZpZGVycyxmb2N1c2VkXSBpbnN0ZWFkLlxuLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuJGJsYWNrLTEyLW9wYWNpdHk6IHJnYmEoYmxhY2ssIDAuMTIpO1xuLy8gQGRlcHJlY2F0ZWQgdXNlICRsaWdodC1bc2Vjb25kYXJ5LXRleHQsZGlzYWJsZWQtdGV4dCxkaXZpZGVycyxmb2N1c2VkXSBpbnN0ZWFkLlxuLy8gQGJyZWFraW5nLWNoYW5nZSA4LjAuMFxuJHdoaXRlLTEyLW9wYWNpdHk6IHJnYmEod2hpdGUsIDAuMTIpO1xuLy8gQGRlcHJlY2F0ZWQgdXNlICRkYXJrLVtzZWNvbmRhcnktdGV4dCxkaXNhYmxlZC10ZXh0LGRpdmlkZXJzLGZvY3VzZWRdIGluc3RlYWQuXG4vLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wXG4kYmxhY2stNi1vcGFjaXR5OiByZ2JhKGJsYWNrLCAwLjA2KTtcbi8vIEBkZXByZWNhdGVkIHVzZSAkbGlnaHQtW3NlY29uZGFyeS10ZXh0LGRpc2FibGVkLXRleHQsZGl2aWRlcnMsZm9jdXNlZF0gaW5zdGVhZC5cbi8vIEBicmVha2luZy1jaGFuZ2UgOC4wLjBcbiR3aGl0ZS02LW9wYWNpdHk6IHJnYmEod2hpdGUsIDAuMDYpO1xuXG4kZGFyay1wcmltYXJ5LXRleHQ6IHJnYmEoYmxhY2ssIDAuODcpO1xuJGRhcmstc2Vjb25kYXJ5LXRleHQ6IHJnYmEoYmxhY2ssIDAuNTQpO1xuJGRhcmstZGlzYWJsZWQtdGV4dDogcmdiYShibGFjaywgMC4zOCk7XG4kZGFyay1kaXZpZGVyczogcmdiYShibGFjaywgMC4xMik7XG4kZGFyay1mb2N1c2VkOiByZ2JhKGJsYWNrLCAwLjEyKTtcbiRsaWdodC1wcmltYXJ5LXRleHQ6IHdoaXRlO1xuJGxpZ2h0LXNlY29uZGFyeS10ZXh0OiByZ2JhKHdoaXRlLCAwLjcpO1xuJGxpZ2h0LWRpc2FibGVkLXRleHQ6IHJnYmEod2hpdGUsIDAuNSk7XG4kbGlnaHQtZGl2aWRlcnM6IHJnYmEod2hpdGUsIDAuMTIpO1xuJGxpZ2h0LWZvY3VzZWQ6IHJnYmEod2hpdGUsIDAuMTIpO1xuXG4kbWF0LXJlZDogKFxuICA1MDogI2ZmZWJlZSxcbiAgMTAwOiAjZmZjZGQyLFxuICAyMDA6ICNlZjlhOWEsXG4gIDMwMDogI2U1NzM3MyxcbiAgNDAwOiAjZWY1MzUwLFxuICA1MDA6ICNmNDQzMzYsXG4gIDYwMDogI2U1MzkzNSxcbiAgNzAwOiAjZDMyZjJmLFxuICA4MDA6ICNjNjI4MjgsXG4gIDkwMDogI2I3MWMxYyxcbiAgQTEwMDogI2ZmOGE4MCxcbiAgQTIwMDogI2ZmNTI1MixcbiAgQTQwMDogI2ZmMTc0NCxcbiAgQTcwMDogI2Q1MDAwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LXBpbms6IChcbiAgNTA6ICNmY2U0ZWMsXG4gIDEwMDogI2Y4YmJkMCxcbiAgMjAwOiAjZjQ4ZmIxLFxuICAzMDA6ICNmMDYyOTIsXG4gIDQwMDogI2VjNDA3YSxcbiAgNTAwOiAjZTkxZTYzLFxuICA2MDA6ICNkODFiNjAsXG4gIDcwMDogI2MyMTg1YixcbiAgODAwOiAjYWQxNDU3LFxuICA5MDA6ICM4ODBlNGYsXG4gIEExMDA6ICNmZjgwYWIsXG4gIEEyMDA6ICNmZjQwODEsXG4gIEE0MDA6ICNmNTAwNTcsXG4gIEE3MDA6ICNjNTExNjIsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1wdXJwbGU6IChcbiAgNTA6ICNmM2U1ZjUsXG4gIDEwMDogI2UxYmVlNyxcbiAgMjAwOiAjY2U5M2Q4LFxuICAzMDA6ICNiYTY4YzgsXG4gIDQwMDogI2FiNDdiYyxcbiAgNTAwOiAjOWMyN2IwLFxuICA2MDA6ICM4ZTI0YWEsXG4gIDcwMDogIzdiMWZhMixcbiAgODAwOiAjNmExYjlhLFxuICA5MDA6ICM0YTE0OGMsXG4gIEExMDA6ICNlYTgwZmMsXG4gIEEyMDA6ICNlMDQwZmIsXG4gIEE0MDA6ICNkNTAwZjksXG4gIEE3MDA6ICNhYTAwZmYsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWRlZXAtcHVycGxlOiAoXG4gIDUwOiAjZWRlN2Y2LFxuICAxMDA6ICNkMWM0ZTksXG4gIDIwMDogI2IzOWRkYixcbiAgMzAwOiAjOTU3NWNkLFxuICA0MDA6ICM3ZTU3YzIsXG4gIDUwMDogIzY3M2FiNyxcbiAgNjAwOiAjNWUzNWIxLFxuICA3MDA6ICM1MTJkYTgsXG4gIDgwMDogIzQ1MjdhMCxcbiAgOTAwOiAjMzExYjkyLFxuICBBMTAwOiAjYjM4OGZmLFxuICBBMjAwOiAjN2M0ZGZmLFxuICBBNDAwOiAjNjUxZmZmLFxuICBBNzAwOiAjNjIwMGVhLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1pbmRpZ286IChcbiAgNTA6ICNlOGVhZjYsXG4gIDEwMDogI2M1Y2FlOSxcbiAgMjAwOiAjOWZhOGRhLFxuICAzMDA6ICM3OTg2Y2IsXG4gIDQwMDogIzVjNmJjMCxcbiAgNTAwOiAjM2Y1MWI1LFxuICA2MDA6ICMzOTQ5YWIsXG4gIDcwMDogIzMwM2Y5ZixcbiAgODAwOiAjMjgzNTkzLFxuICA5MDA6ICMxYTIzN2UsXG4gIEExMDA6ICM4YzllZmYsXG4gIEEyMDA6ICM1MzZkZmUsXG4gIEE0MDA6ICMzZDVhZmUsXG4gIEE3MDA6ICMzMDRmZmUsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWJsdWU6IChcbiAgNTA6ICNlM2YyZmQsXG4gIDEwMDogI2JiZGVmYixcbiAgMjAwOiAjOTBjYWY5LFxuICAzMDA6ICM2NGI1ZjYsXG4gIDQwMDogIzQyYTVmNSxcbiAgNTAwOiAjMjE5NmYzLFxuICA2MDA6ICMxZTg4ZTUsXG4gIDcwMDogIzE5NzZkMixcbiAgODAwOiAjMTU2NWMwLFxuICA5MDA6ICMwZDQ3YTEsXG4gIEExMDA6ICM4MmIxZmYsXG4gIEEyMDA6ICM0NDhhZmYsXG4gIEE0MDA6ICMyOTc5ZmYsXG4gIEE3MDA6ICMyOTYyZmYsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1saWdodC1ibHVlOiAoXG4gIDUwOiAjZTFmNWZlLFxuICAxMDA6ICNiM2U1ZmMsXG4gIDIwMDogIzgxZDRmYSxcbiAgMzAwOiAjNGZjM2Y3LFxuICA0MDA6ICMyOWI2ZjYsXG4gIDUwMDogIzAzYTlmNCxcbiAgNjAwOiAjMDM5YmU1LFxuICA3MDA6ICMwMjg4ZDEsXG4gIDgwMDogIzAyNzdiZCxcbiAgOTAwOiAjMDE1NzliLFxuICBBMTAwOiAjODBkOGZmLFxuICBBMjAwOiAjNDBjNGZmLFxuICBBNDAwOiAjMDBiMGZmLFxuICBBNzAwOiAjMDA5MWVhLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWN5YW46IChcbiAgNTA6ICNlMGY3ZmEsXG4gIDEwMDogI2IyZWJmMixcbiAgMjAwOiAjODBkZWVhLFxuICAzMDA6ICM0ZGQwZTEsXG4gIDQwMDogIzI2YzZkYSxcbiAgNTAwOiAjMDBiY2Q0LFxuICA2MDA6ICMwMGFjYzEsXG4gIDcwMDogIzAwOTdhNyxcbiAgODAwOiAjMDA4MzhmLFxuICA5MDA6ICMwMDYwNjQsXG4gIEExMDA6ICM4NGZmZmYsXG4gIEEyMDA6ICMxOGZmZmYsXG4gIEE0MDA6ICMwMGU1ZmYsXG4gIEE3MDA6ICMwMGI4ZDQsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC10ZWFsOiAoXG4gIDUwOiAjZTBmMmYxLFxuICAxMDA6ICNiMmRmZGIsXG4gIDIwMDogIzgwY2JjNCxcbiAgMzAwOiAjNGRiNmFjLFxuICA0MDA6ICMyNmE2OWEsXG4gIDUwMDogIzAwOTY4OCxcbiAgNjAwOiAjMDA4OTdiLFxuICA3MDA6ICMwMDc5NmIsXG4gIDgwMDogIzAwNjk1YyxcbiAgOTAwOiAjMDA0ZDQwLFxuICBBMTAwOiAjYTdmZmViLFxuICBBMjAwOiAjNjRmZmRhLFxuICBBNDAwOiAjMWRlOWI2LFxuICBBNzAwOiAjMDBiZmE1LFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbiRtYXQtZ3JlZW46IChcbiAgNTA6ICNlOGY1ZTksXG4gIDEwMDogI2M4ZTZjOSxcbiAgMjAwOiAjYTVkNmE3LFxuICAzMDA6ICM4MWM3ODQsXG4gIDQwMDogIzY2YmI2YSxcbiAgNTAwOiAjNGNhZjUwLFxuICA2MDA6ICM0M2EwNDcsXG4gIDcwMDogIzM4OGUzYyxcbiAgODAwOiAjMmU3ZDMyLFxuICA5MDA6ICMxYjVlMjAsXG4gIEExMDA6ICNiOWY2Y2EsXG4gIEEyMDA6ICM2OWYwYWUsXG4gIEE0MDA6ICMwMGU2NzYsXG4gIEE3MDA6ICMwMGM4NTMsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWxpZ2h0LWdyZWVuOiAoXG4gIDUwOiAjZjFmOGU5LFxuICAxMDA6ICNkY2VkYzgsXG4gIDIwMDogI2M1ZTFhNSxcbiAgMzAwOiAjYWVkNTgxLFxuICA0MDA6ICM5Y2NjNjUsXG4gIDUwMDogIzhiYzM0YSxcbiAgNjAwOiAjN2NiMzQyLFxuICA3MDA6ICM2ODlmMzgsXG4gIDgwMDogIzU1OGIyZixcbiAgOTAwOiAjMzM2OTFlLFxuICBBMTAwOiAjY2NmZjkwLFxuICBBMjAwOiAjYjJmZjU5LFxuICBBNDAwOiAjNzZmZjAzLFxuICBBNzAwOiAjNjRkZDE3LFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNzAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LWxpbWU6IChcbiAgNTA6ICNmOWZiZTcsXG4gIDEwMDogI2YwZjRjMyxcbiAgMjAwOiAjZTZlZTljLFxuICAzMDA6ICNkY2U3NzUsXG4gIDQwMDogI2Q0ZTE1NyxcbiAgNTAwOiAjY2RkYzM5LFxuICA2MDA6ICNjMGNhMzMsXG4gIDcwMDogI2FmYjQyYixcbiAgODAwOiAjOWU5ZDI0LFxuICA5MDA6ICM4Mjc3MTcsXG4gIEExMDA6ICNmNGZmODEsXG4gIEEyMDA6ICNlZWZmNDEsXG4gIEE0MDA6ICNjNmZmMDAsXG4gIEE3MDA6ICNhZWVhMDAsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA5MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEEyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICApXG4pO1xuXG4kbWF0LXllbGxvdzogKFxuICA1MDogI2ZmZmRlNyxcbiAgMTAwOiAjZmZmOWM0LFxuICAyMDA6ICNmZmY1OWQsXG4gIDMwMDogI2ZmZjE3NixcbiAgNDAwOiAjZmZlZTU4LFxuICA1MDA6ICNmZmViM2IsXG4gIDYwMDogI2ZkZDgzNSxcbiAgNzAwOiAjZmJjMDJkLFxuICA4MDA6ICNmOWE4MjUsXG4gIDkwMDogI2Y1N2YxNyxcbiAgQTEwMDogI2ZmZmY4ZCxcbiAgQTIwMDogI2ZmZmYwMCxcbiAgQTQwMDogI2ZmZWEwMCxcbiAgQTcwMDogI2ZmZDYwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1hbWJlcjogKFxuICA1MDogI2ZmZjhlMSxcbiAgMTAwOiAjZmZlY2IzLFxuICAyMDA6ICNmZmUwODIsXG4gIDMwMDogI2ZmZDU0ZixcbiAgNDAwOiAjZmZjYTI4LFxuICA1MDA6ICNmZmMxMDcsXG4gIDYwMDogI2ZmYjMwMCxcbiAgNzAwOiAjZmZhMDAwLFxuICA4MDA6ICNmZjhmMDAsXG4gIDkwMDogI2ZmNmYwMCxcbiAgQTEwMDogI2ZmZTU3ZixcbiAgQTIwMDogI2ZmZDc0MCxcbiAgQTQwMDogI2ZmYzQwMCxcbiAgQTcwMDogI2ZmYWIwMCxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDUwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDgwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1vcmFuZ2U6IChcbiAgNTA6ICNmZmYzZTAsXG4gIDEwMDogI2ZmZTBiMixcbiAgMjAwOiAjZmZjYzgwLFxuICAzMDA6ICNmZmI3NGQsXG4gIDQwMDogI2ZmYTcyNixcbiAgNTAwOiAjZmY5ODAwLFxuICA2MDA6ICNmYjhjMDAsXG4gIDcwMDogI2Y1N2MwMCxcbiAgODAwOiAjZWY2YzAwLFxuICA5MDA6ICNlNjUxMDAsXG4gIEExMDA6ICNmZmQxODAsXG4gIEEyMDA6ICNmZmFiNDAsXG4gIEE0MDA6ICNmZjkxMDAsXG4gIEE3MDA6ICNmZjZkMDAsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA1MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA2MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6IGJsYWNrLFxuICApXG4pO1xuXG4kbWF0LWRlZXAtb3JhbmdlOiAoXG4gIDUwOiAjZmJlOWU3LFxuICAxMDA6ICNmZmNjYmMsXG4gIDIwMDogI2ZmYWI5MSxcbiAgMzAwOiAjZmY4YTY1LFxuICA0MDA6ICNmZjcwNDMsXG4gIDUwMDogI2ZmNTcyMixcbiAgNjAwOiAjZjQ1MTFlLFxuICA3MDA6ICNlNjRhMTksXG4gIDgwMDogI2Q4NDMxNSxcbiAgOTAwOiAjYmYzNjBjLFxuICBBMTAwOiAjZmY5ZTgwLFxuICBBMjAwOiAjZmY2ZTQwLFxuICBBNDAwOiAjZmYzZDAwLFxuICBBNzAwOiAjZGQyYzAwLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1icm93bjogKFxuICA1MDogI2VmZWJlOSxcbiAgMTAwOiAjZDdjY2M4LFxuICAyMDA6ICNiY2FhYTQsXG4gIDMwMDogI2ExODg3ZixcbiAgNDAwOiAjOGQ2ZTYzLFxuICA1MDA6ICM3OTU1NDgsXG4gIDYwMDogIzZkNGM0MSxcbiAgNzAwOiAjNWQ0MDM3LFxuICA4MDA6ICM0ZTM0MmUsXG4gIDkwMDogIzNlMjcyMyxcbiAgQTEwMDogI2Q3Y2NjOCxcbiAgQTIwMDogI2JjYWFhNCxcbiAgQTQwMDogIzhkNmU2MyxcbiAgQTcwMDogIzVkNDAzNyxcbiAgY29udHJhc3Q6IChcbiAgICA1MDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDEwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIDMwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuJG1hdC1ncmV5OiAoXG4gIDUwOiAjZmFmYWZhLFxuICAxMDA6ICNmNWY1ZjUsXG4gIDIwMDogI2VlZWVlZSxcbiAgMzAwOiAjZTBlMGUwLFxuICA0MDA6ICNiZGJkYmQsXG4gIDUwMDogIzllOWU5ZSxcbiAgNjAwOiAjNzU3NTc1LFxuICA3MDA6ICM2MTYxNjEsXG4gIDgwMDogIzQyNDI0MixcbiAgOTAwOiAjMjEyMTIxLFxuICBBMTAwOiAjZmZmZmZmLFxuICBBMjAwOiAjZWVlZWVlLFxuICBBNDAwOiAjYmRiZGJkLFxuICBBNzAwOiAjNjE2MTYxLFxuICBjb250cmFzdDogKFxuICAgIDUwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgMzAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNDAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgNjAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA4MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgOTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIEExMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICBBMjAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTQwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gIClcbik7XG5cbi8vIEFsaWFzIGZvciBhbHRlcm5hdGUgc3BlbGxpbmcuXG4kbWF0LWdyYXk6ICRtYXQtZ3JleTtcblxuJG1hdC1ibHVlLWdyZXk6IChcbiAgNTA6ICNlY2VmZjEsXG4gIDEwMDogI2NmZDhkYyxcbiAgMjAwOiAjYjBiZWM1LFxuICAzMDA6ICM5MGE0YWUsXG4gIDQwMDogIzc4OTA5YyxcbiAgNTAwOiAjNjA3ZDhiLFxuICA2MDA6ICM1NDZlN2EsXG4gIDcwMDogIzQ1NWE2NCxcbiAgODAwOiAjMzc0NzRmLFxuICA5MDA6ICMyNjMyMzgsXG4gIEExMDA6ICNjZmQ4ZGMsXG4gIEEyMDA6ICNiMGJlYzUsXG4gIEE0MDA6ICM3ODkwOWMsXG4gIEE3MDA6ICM0NTVhNjQsXG4gIGNvbnRyYXN0OiAoXG4gICAgNTA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAxMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAyMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICAzMDA6ICRkYXJrLXByaW1hcnktdGV4dCxcbiAgICA0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgNTAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDYwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICA3MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgODAwOiAkbGlnaHQtcHJpbWFyeS10ZXh0LFxuICAgIDkwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgICBBMTAwOiAkZGFyay1wcmltYXJ5LXRleHQsXG4gICAgQTIwMDogJGRhcmstcHJpbWFyeS10ZXh0LFxuICAgIEE0MDA6ICRsaWdodC1wcmltYXJ5LXRleHQsXG4gICAgQTcwMDogJGxpZ2h0LXByaW1hcnktdGV4dCxcbiAgKVxuKTtcblxuLy8gQWxpYXMgZm9yIGFsdGVybmF0ZSBzcGVsbGluZy5cbiRtYXQtYmx1ZS1ncmF5OiAkbWF0LWJsdWUtZ3JleTtcblxuXG4vLyBCYWNrZ3JvdW5kIHBhbGV0dGUgZm9yIGxpZ2h0IHRoZW1lcy5cbiRtYXQtbGlnaHQtdGhlbWUtYmFja2dyb3VuZDogKFxuICBzdGF0dXMtYmFyOiBtYXBfZ2V0KCRtYXQtZ3JleSwgMzAwKSxcbiAgYXBwLWJhcjogICAgbWFwX2dldCgkbWF0LWdyZXksIDEwMCksXG4gIGJhY2tncm91bmQ6IG1hcF9nZXQoJG1hdC1ncmV5LCA1MCksXG4gIGhvdmVyOiAgICAgIHJnYmEoYmxhY2ssIDAuMDQpLCAvLyBUT0RPKGthcmEpOiBjaGVjayBzdHlsZSB3aXRoIE1hdGVyaWFsIERlc2lnbiBVWFxuICBjYXJkOiAgICAgICB3aGl0ZSxcbiAgZGlhbG9nOiAgICAgd2hpdGUsXG4gIGRpc2FibGVkLWJ1dHRvbjogcmdiYShibGFjaywgMC4xMiksXG4gIHJhaXNlZC1idXR0b246IHdoaXRlLFxuICBmb2N1c2VkLWJ1dHRvbjogJGRhcmstZm9jdXNlZCxcbiAgc2VsZWN0ZWQtYnV0dG9uOiBtYXBfZ2V0KCRtYXQtZ3JleSwgMzAwKSxcbiAgc2VsZWN0ZWQtZGlzYWJsZWQtYnV0dG9uOiBtYXBfZ2V0KCRtYXQtZ3JleSwgNDAwKSxcbiAgZGlzYWJsZWQtYnV0dG9uLXRvZ2dsZTogbWFwX2dldCgkbWF0LWdyZXksIDIwMCksXG4gIHVuc2VsZWN0ZWQtY2hpcDogbWFwX2dldCgkbWF0LWdyZXksIDMwMCksXG4gIGRpc2FibGVkLWxpc3Qtb3B0aW9uOiBtYXBfZ2V0KCRtYXQtZ3JleSwgMjAwKSxcbik7XG5cbi8vIEJhY2tncm91bmQgcGFsZXR0ZSBmb3IgZGFyayB0aGVtZXMuXG4kbWF0LWRhcmstdGhlbWUtYmFja2dyb3VuZDogKFxuICBzdGF0dXMtYmFyOiBibGFjayxcbiAgYXBwLWJhcjogICAgbWFwX2dldCgkbWF0LWdyZXksIDkwMCksXG4gIGJhY2tncm91bmQ6ICMzMDMwMzAsXG4gIGhvdmVyOiAgICAgIHJnYmEod2hpdGUsIDAuMDQpLCAvLyBUT0RPKGthcmEpOiBjaGVjayBzdHlsZSB3aXRoIE1hdGVyaWFsIERlc2lnbiBVWFxuICBjYXJkOiAgICAgICBtYXBfZ2V0KCRtYXQtZ3JleSwgODAwKSxcbiAgZGlhbG9nOiAgICAgbWFwX2dldCgkbWF0LWdyZXksIDgwMCksXG4gIGRpc2FibGVkLWJ1dHRvbjogcmdiYSh3aGl0ZSwgMC4xMiksXG4gIHJhaXNlZC1idXR0b246IG1hcC1nZXQoJG1hdC1ncmV5LCA4MDApLFxuICBmb2N1c2VkLWJ1dHRvbjogJGxpZ2h0LWZvY3VzZWQsXG4gIHNlbGVjdGVkLWJ1dHRvbjogbWFwX2dldCgkbWF0LWdyZXksIDkwMCksXG4gIHNlbGVjdGVkLWRpc2FibGVkLWJ1dHRvbjogbWFwX2dldCgkbWF0LWdyZXksIDgwMCksXG4gIGRpc2FibGVkLWJ1dHRvbi10b2dnbGU6IGJsYWNrLFxuICB1bnNlbGVjdGVkLWNoaXA6IG1hcF9nZXQoJG1hdC1ncmV5LCA3MDApLFxuICBkaXNhYmxlZC1saXN0LW9wdGlvbjogYmxhY2ssXG4pO1xuXG4vLyBGb3JlZ3JvdW5kIHBhbGV0dGUgZm9yIGxpZ2h0IHRoZW1lcy5cbiRtYXQtbGlnaHQtdGhlbWUtZm9yZWdyb3VuZDogKFxuICBiYXNlOiAgICAgICAgICAgICAgYmxhY2ssXG4gIGRpdmlkZXI6ICAgICAgICAgICAkZGFyay1kaXZpZGVycyxcbiAgZGl2aWRlcnM6ICAgICAgICAgICRkYXJrLWRpdmlkZXJzLFxuICBkaXNhYmxlZDogICAgICAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcbiAgZGlzYWJsZWQtYnV0dG9uOiAgIHJnYmEoYmxhY2ssIDAuMjYpLFxuICBkaXNhYmxlZC10ZXh0OiAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcbiAgZWxldmF0aW9uOiAgICAgICAgIGJsYWNrLFxuICBoaW50LXRleHQ6ICAgICAgICAgJGRhcmstZGlzYWJsZWQtdGV4dCxcbiAgc2Vjb25kYXJ5LXRleHQ6ICAgICRkYXJrLXNlY29uZGFyeS10ZXh0LFxuICBpY29uOiAgICAgICAgICAgICAgcmdiYShibGFjaywgMC41NCksXG4gIGljb25zOiAgICAgICAgICAgICByZ2JhKGJsYWNrLCAwLjU0KSxcbiAgdGV4dDogICAgICAgICAgICAgIHJnYmEoYmxhY2ssIDAuODcpLFxuICBzbGlkZXItbWluOiAgICAgICAgcmdiYShibGFjaywgMC44NyksXG4gIHNsaWRlci1vZmY6ICAgICAgICByZ2JhKGJsYWNrLCAwLjI2KSxcbiAgc2xpZGVyLW9mZi1hY3RpdmU6IHJnYmEoYmxhY2ssIDAuMzgpLFxuKTtcblxuLy8gRm9yZWdyb3VuZCBwYWxldHRlIGZvciBkYXJrIHRoZW1lcy5cbiRtYXQtZGFyay10aGVtZS1mb3JlZ3JvdW5kOiAoXG4gIGJhc2U6ICAgICAgICAgICAgICB3aGl0ZSxcbiAgZGl2aWRlcjogICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcbiAgZGl2aWRlcnM6ICAgICAgICAgICRsaWdodC1kaXZpZGVycyxcbiAgZGlzYWJsZWQ6ICAgICAgICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxuICBkaXNhYmxlZC1idXR0b246ICAgcmdiYSh3aGl0ZSwgMC4zKSxcbiAgZGlzYWJsZWQtdGV4dDogICAgICRsaWdodC1kaXNhYmxlZC10ZXh0LFxuICBlbGV2YXRpb246ICAgICAgICAgYmxhY2ssXG4gIGhpbnQtdGV4dDogICAgICAgICAkbGlnaHQtZGlzYWJsZWQtdGV4dCxcbiAgc2Vjb25kYXJ5LXRleHQ6ICAgICRsaWdodC1zZWNvbmRhcnktdGV4dCxcbiAgaWNvbjogICAgICAgICAgICAgIHdoaXRlLFxuICBpY29uczogICAgICAgICAgICAgd2hpdGUsXG4gIHRleHQ6ICAgICAgICAgICAgICB3aGl0ZSxcbiAgc2xpZGVyLW1pbjogICAgICAgIHdoaXRlLFxuICBzbGlkZXItb2ZmOiAgICAgICAgcmdiYSh3aGl0ZSwgMC4zKSxcbiAgc2xpZGVyLW9mZi1hY3RpdmU6IHJnYmEod2hpdGUsIDAuMyksXG4pO1xuXG5cblxuLy8gRm9yIGEgZ2l2ZW4gaHVlIGluIGEgcGFsZXR0ZSwgcmV0dXJuIHRoZSBjb250cmFzdCBjb2xvciBmcm9tIHRoZSBtYXAgb2YgY29udHJhc3QgcGFsZXR0ZXMuXG4vLyBAcGFyYW0gJGNvbG9yLW1hcFxuLy8gQHBhcmFtICRodWVcbkBmdW5jdGlvbiBtYXQtY29udHJhc3QoJHBhbGV0dGUsICRodWUpIHtcbiAgQHJldHVybiBtYXAtZ2V0KG1hcC1nZXQoJHBhbGV0dGUsIGNvbnRyYXN0KSwgJGh1ZSk7XG59XG5cblxuLy8gQ3JlYXRlcyBhIG1hcCBvZiBodWVzIHRvIGNvbG9ycyBmb3IgYSB0aGVtZS4gVGhpcyBpcyB1c2VkIHRvIGRlZmluZSBhIHRoZW1lIHBhbGV0dGUgaW4gdGVybXNcbi8vIG9mIHRoZSBNYXRlcmlhbCBEZXNpZ24gaHVlcy5cbi8vIEBwYXJhbSAkY29sb3ItbWFwXG4vLyBAcGFyYW0gJHByaW1hcnlcbi8vIEBwYXJhbSAkbGlnaHRlclxuQGZ1bmN0aW9uIG1hdC1wYWxldHRlKCRiYXNlLXBhbGV0dGUsICRkZWZhdWx0OiA1MDAsICRsaWdodGVyOiAxMDAsICRkYXJrZXI6IDcwMCkge1xuICAkcmVzdWx0OiBtYXBfbWVyZ2UoJGJhc2UtcGFsZXR0ZSwgKFxuICAgIGRlZmF1bHQ6IG1hcC1nZXQoJGJhc2UtcGFsZXR0ZSwgJGRlZmF1bHQpLFxuICAgIGxpZ2h0ZXI6IG1hcC1nZXQoJGJhc2UtcGFsZXR0ZSwgJGxpZ2h0ZXIpLFxuICAgIGRhcmtlcjogbWFwLWdldCgkYmFzZS1wYWxldHRlLCAkZGFya2VyKSxcblxuICAgIGRlZmF1bHQtY29udHJhc3Q6IG1hdC1jb250cmFzdCgkYmFzZS1wYWxldHRlLCAkZGVmYXVsdCksXG4gICAgbGlnaHRlci1jb250cmFzdDogbWF0LWNvbnRyYXN0KCRiYXNlLXBhbGV0dGUsICRsaWdodGVyKSxcbiAgICBkYXJrZXItY29udHJhc3Q6IG1hdC1jb250cmFzdCgkYmFzZS1wYWxldHRlLCAkZGFya2VyKVxuICApKTtcblxuICAvLyBGb3IgZWFjaCBodWUgaW4gdGhlIHBhbGV0dGUsIGFkZCBhIFwiLWNvbnRyYXN0XCIgY29sb3IgdG8gdGhlIG1hcC5cbiAgQGVhY2ggJGh1ZSwgJGNvbG9yIGluICRiYXNlLXBhbGV0dGUge1xuICAgICRyZXN1bHQ6IG1hcF9tZXJnZSgkcmVzdWx0LCAoXG4gICAgICAnI3skaHVlfS1jb250cmFzdCc6IG1hdC1jb250cmFzdCgkYmFzZS1wYWxldHRlLCAkaHVlKVxuICAgICkpO1xuICB9XG5cbiAgQHJldHVybiAkcmVzdWx0O1xufVxuXG5cbi8vIEdldHMgYSBjb2xvciBmcm9tIGEgdGhlbWUgcGFsZXR0ZSAodGhlIG91dHB1dCBvZiBtYXQtcGFsZXR0ZSkuXG4vLyBUaGUgaHVlIGNhbiBiZSBvbmUgb2YgdGhlIHN0YW5kYXJkIHZhbHVlcyAoNTAwLCBBNDAwLCBldGMuKSwgb25lIG9mIHRoZSB0aHJlZSBwcmVjb25maWd1cmVkXG4vLyBodWVzIChkZWZhdWx0LCBsaWdodGVyLCBkYXJrZXIpLCBvciBhbnkgb2YgdGhlIGFmb3JlbWVudGlvbmVkIHByZWZpeGVkIHdpdGggXCItY29udHJhc3RcIi5cbi8vXG4vLyBAcGFyYW0gJGNvbG9yLW1hcCBUaGUgdGhlbWUgcGFsZXR0ZSAob3V0cHV0IG9mIG1hdC1wYWxldHRlKS5cbi8vIEBwYXJhbSAkaHVlIFRoZSBodWUgZnJvbSB0aGUgcGFsZXR0ZSB0byB1c2UuIElmIHRoaXMgaXMgYSB2YWx1ZSBiZXR3ZWVuIDAgYW5kIDEsIGl0IHdpbGxcbi8vICAgICBiZSB0cmVhdGVkIGFzIG9wYWNpdHkuXG4vLyBAcGFyYW0gJG9wYWNpdHkgVGhlIGFscGhhIGNoYW5uZWwgdmFsdWUgZm9yIHRoZSBjb2xvci5cbkBmdW5jdGlvbiBtYXQtY29sb3IoJHBhbGV0dGUsICRodWU6IGRlZmF1bHQsICRvcGFjaXR5OiBudWxsKSB7XG4gIC8vIElmIGh1ZUtleSBpcyBhIG51bWJlciBiZXR3ZWVuIHplcm8gYW5kIG9uZSwgdGhlbiBpdCBhY3R1YWxseSBjb250YWlucyBhblxuICAvLyBvcGFjaXR5IHZhbHVlLCBzbyByZWNhbGwgdGhpcyBmdW5jdGlvbiB3aXRoIHRoZSBkZWZhdWx0IGh1ZSBhbmQgdGhhdCBnaXZlbiBvcGFjaXR5LlxuICBAaWYgdHlwZS1vZigkaHVlKSA9PSBudW1iZXIgYW5kICRodWUgPj0gMCBhbmQgJGh1ZSA8PSAxIHtcbiAgICBAcmV0dXJuIG1hdC1jb2xvcigkcGFsZXR0ZSwgZGVmYXVsdCwgJGh1ZSk7XG4gIH1cblxuICAkY29sb3I6IG1hcC1nZXQoJHBhbGV0dGUsICRodWUpO1xuXG4gIEBpZiAodHlwZS1vZigkY29sb3IpICE9IGNvbG9yKSB7XG4gICAgLy8gSWYgdGhlICRjb2xvciByZXNvbHZlZCB0byBzb21ldGhpbmcgZGlmZmVyZW50IGZyb20gYSBjb2xvciAoZS5nLiBhIENTUyB2YXJpYWJsZSksXG4gICAgLy8gd2UgY2FuJ3QgYXBwbHkgdGhlIG9wYWNpdHkgYW55d2F5IHNvIHdlIHJldHVybiB0aGUgdmFsdWUgYXMgaXMsIG90aGVyd2lzZSBTYXNzIGNhblxuICAgIC8vIHRocm93IGFuIGVycm9yIG9yIG91dHB1dCBzb21ldGhpbmcgaW52YWxpZC5cbiAgICBAcmV0dXJuICRjb2xvcjtcbiAgfVxuXG4gIEByZXR1cm4gcmdiYSgkY29sb3IsIGlmKCRvcGFjaXR5ID09IG51bGwsIG9wYWNpdHkoJGNvbG9yKSwgJG9wYWNpdHkpKTtcbn1cblxuXG4vLyBDcmVhdGVzIGEgY29udGFpbmVyIG9iamVjdCBmb3IgYSBsaWdodCB0aGVtZSB0byBiZSBnaXZlbiB0byBpbmRpdmlkdWFsIGNvbXBvbmVudCB0aGVtZSBtaXhpbnMuXG5AZnVuY3Rpb24gbWF0LWxpZ2h0LXRoZW1lKCRwcmltYXJ5LCAkYWNjZW50LCAkd2FybjogbWF0LXBhbGV0dGUoJG1hdC1yZWQpKSB7XG4gIEByZXR1cm4gKFxuICAgIHByaW1hcnk6ICRwcmltYXJ5LFxuICAgIGFjY2VudDogJGFjY2VudCxcbiAgICB3YXJuOiAkd2FybixcbiAgICBpcy1kYXJrOiBmYWxzZSxcbiAgICBmb3JlZ3JvdW5kOiAkbWF0LWxpZ2h0LXRoZW1lLWZvcmVncm91bmQsXG4gICAgYmFja2dyb3VuZDogJG1hdC1saWdodC10aGVtZS1iYWNrZ3JvdW5kLFxuICApO1xufVxuXG5cbi8vIENyZWF0ZXMgYSBjb250YWluZXIgb2JqZWN0IGZvciBhIGRhcmsgdGhlbWUgdG8gYmUgZ2l2ZW4gdG8gaW5kaXZpZHVhbCBjb21wb25lbnQgdGhlbWUgbWl4aW5zLlxuQGZ1bmN0aW9uIG1hdC1kYXJrLXRoZW1lKCRwcmltYXJ5LCAkYWNjZW50LCAkd2FybjogbWF0LXBhbGV0dGUoJG1hdC1yZWQpKSB7XG4gIEByZXR1cm4gKFxuICAgIHByaW1hcnk6ICRwcmltYXJ5LFxuICAgIGFjY2VudDogJGFjY2VudCxcbiAgICB3YXJuOiAkd2FybixcbiAgICBpcy1kYXJrOiB0cnVlLFxuICAgIGZvcmVncm91bmQ6ICRtYXQtZGFyay10aGVtZS1mb3JlZ3JvdW5kLFxuICAgIGJhY2tncm91bmQ6ICRtYXQtZGFyay10aGVtZS1iYWNrZ3JvdW5kLFxuICApO1xufVxuXG5cblxuJG1hdC1yaXBwbGUtY29sb3Itb3BhY2l0eTogMC4xO1xuXG5AbWl4aW4gbWF0LXJpcHBsZSgpIHtcblxuICAvLyBUaGUgaG9zdCBlbGVtZW50IG9mIGFuIG1hdC1yaXBwbGUgZGlyZWN0aXZlIHNob3VsZCBhbHdheXMgaGF2ZSBhIHBvc2l0aW9uIG9mIFwiYWJzb2x1dGVcIiBvclxuICAvLyBcInJlbGF0aXZlXCIgc28gdGhhdCB0aGUgcmlwcGxlcyBpbnNpZGUgYXJlIGNvcnJlY3RseSBwb3NpdGlvbmVkIHJlbGF0aXZlbHkgdG8gdGhlIGNvbnRhaW5lci5cbiAgLm1hdC1yaXBwbGUge1xuICAgIG92ZXJmbG93OiBoaWRkZW47XG5cbiAgICAvLyBCeSBkZWZhdWx0LCBldmVyeSByaXBwbGUgY29udGFpbmVyIHNob3VsZCBoYXZlIHBvc2l0aW9uOiByZWxhdGl2ZSBpbiBmYXZvciBvZiBjcmVhdGluZyBhblxuICAgIC8vIGVhc3kgQVBJIGZvciBkZXZlbG9wZXJzIHVzaW5nIHRoZSBNYXRSaXBwbGUgZGlyZWN0aXZlLlxuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5tYXQtcmlwcGxlLm1hdC1yaXBwbGUtdW5ib3VuZGVkIHtcbiAgICBvdmVyZmxvdzogdmlzaWJsZTtcbiAgfVxuXG4gIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgICBib3JkZXItcmFkaXVzOiA1MCU7XG4gICAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG5cbiAgICB0cmFuc2l0aW9uOiBvcGFjaXR5LCB0cmFuc2Zvcm0gMG1zIGN1YmljLWJlemllcigwLCAwLCAwLjIsIDEpO1xuICAgIHRyYW5zZm9ybTogc2NhbGUoMCk7XG5cbiAgICAvLyBJbiBoaWdoIGNvbnRyYXN0IG1vZGUgdGhlIHJpcHBsZSBpcyBvcGFxdWUsIGNhdXNpbmcgaXQgdG8gb2JzdHJ1Y3QgdGhlIGNvbnRlbnQuXG4gICAgQGluY2x1ZGUgY2RrLWhpZ2gtY29udHJhc3Qge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cbn1cblxuLyogVGhlbWUgZm9yIHRoZSByaXBwbGUgZWxlbWVudHMuKi9cbkBtaXhpbiBtYXQtcmlwcGxlLXRoZW1lKCR0aGVtZSkge1xuICAkZm9yZWdyb3VuZDogbWFwX2dldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuICAkZm9yZWdyb3VuZC1iYXNlOiBtYXBfZ2V0KCRmb3JlZ3JvdW5kLCBiYXNlKTtcblxuICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAvLyBJZiB0aGUgcmlwcGxlIGNvbG9yIGlzIHJlc29sdmVzIHRvIGEgY29sb3IgKnR5cGUqLCB3ZSBjYW4gdXNlIGl0IGRpcmVjdGx5LCBvdGhlcndpc2VcbiAgICAvLyAoZS5nLiBpdCByZXNvbHZlcyB0byBhIENTUyB2YXJpYWJsZSkgd2UgZmFsbCBiYWNrIHRvIHVzaW5nIHRoZSBjb2xvciBhbmQgc2V0dGluZyBhbiBvcGFjaXR5LlxuICAgIEBpZiAodHlwZS1vZigkZm9yZWdyb3VuZC1iYXNlKSA9PSBjb2xvcikge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogcmdiYSgkZm9yZWdyb3VuZC1iYXNlLCAkbWF0LXJpcHBsZS1jb2xvci1vcGFjaXR5KTtcbiAgICB9XG4gICAgQGVsc2Uge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZvcmVncm91bmQtYmFzZTtcbiAgICAgIG9wYWNpdHk6ICRtYXQtcmlwcGxlLWNvbG9yLW9wYWNpdHk7XG4gICAgfVxuICB9XG59XG5cblxuXG4vLyBVdGlsaXR5IGZvciBmZXRjaGluZyBhIG5lc3RlZCB2YWx1ZSBmcm9tIGEgdHlwb2dyYXBoeSBjb25maWcuXG5AZnVuY3Rpb24gX21hdC1nZXQtdHlwZS12YWx1ZSgkY29uZmlnLCAkbGV2ZWwsICRuYW1lKSB7XG4gIEByZXR1cm4gbWFwLWdldChtYXAtZ2V0KCRjb25maWcsICRsZXZlbCksICRuYW1lKTtcbn1cblxuLy8gR2V0cyB0aGUgZm9udCBzaXplIGZvciBhIGxldmVsIGluc2lkZSBhIHR5cG9ncmFwaHkgY29uZmlnLlxuQGZ1bmN0aW9uIG1hdC1mb250LXNpemUoJGNvbmZpZywgJGxldmVsKSB7XG4gIEByZXR1cm4gX21hdC1nZXQtdHlwZS12YWx1ZSgkY29uZmlnLCAkbGV2ZWwsIGZvbnQtc2l6ZSk7XG59XG5cbi8vIEdldHMgdGhlIGxpbmUgaGVpZ2h0IGZvciBhIGxldmVsIGluc2lkZSBhIHR5cG9ncmFwaHkgY29uZmlnLlxuQGZ1bmN0aW9uIG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCAkbGV2ZWwpIHtcbiAgQHJldHVybiBfbWF0LWdldC10eXBlLXZhbHVlKCRjb25maWcsICRsZXZlbCwgbGluZS1oZWlnaHQpO1xufVxuXG4vLyBHZXRzIHRoZSBmb250IHdlaWdodCBmb3IgYSBsZXZlbCBpbnNpZGUgYSB0eXBvZ3JhcGh5IGNvbmZpZy5cbkBmdW5jdGlvbiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgJGxldmVsKSB7XG4gIEByZXR1cm4gX21hdC1nZXQtdHlwZS12YWx1ZSgkY29uZmlnLCAkbGV2ZWwsIGZvbnQtd2VpZ2h0KTtcbn1cblxuLy8gR2V0cyB0aGUgbGV0dGVyIHNwYWNpbmcgZm9yIGEgbGV2ZWwgaW5zaWRlIGEgdHlwb2dyYXBoeSBjb25maWcuXG5AZnVuY3Rpb24gbWF0LWxldHRlci1zcGFjaW5nKCRjb25maWcsICRsZXZlbCkge1xuICBAcmV0dXJuIF9tYXQtZ2V0LXR5cGUtdmFsdWUoJGNvbmZpZywgJGxldmVsLCBsZXR0ZXItc3BhY2luZyk7XG59XG5cbi8vIEdldHMgdGhlIGZvbnQtZmFtaWx5IGZyb20gYSB0eXBvZ3JhcGh5IGNvbmZpZyBhbmQgcmVtb3ZlcyB0aGUgcXVvdGVzIGFyb3VuZCBpdC5cbkBmdW5jdGlvbiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgJGxldmVsOiBudWxsKSB7XG4gICRmb250LWZhbWlseTogbWFwLWdldCgkY29uZmlnLCBmb250LWZhbWlseSk7XG5cbiAgQGlmICRsZXZlbCAhPSBudWxsIHtcbiAgICAkZm9udC1mYW1pbHk6IF9tYXQtZ2V0LXR5cGUtdmFsdWUoJGNvbmZpZywgJGxldmVsLCBmb250LWZhbWlseSk7XG4gIH1cblxuICAvLyBHdWFyZCBhZ2FpbnN0IHVucXVvdGluZyBub24tc3RyaW5nIHZhbHVlcywgYmVjYXVzZSBpdCdzIGRlcHJlY2F0ZWQuXG4gIEByZXR1cm4gaWYodHlwZS1vZigkZm9udC1mYW1pbHkpID09IHN0cmluZywgdW5xdW90ZSgkZm9udC1mYW1pbHkpLCAkZm9udC1mYW1pbHkpO1xufVxuXG4vLyBPdXRwdXRzIHRoZSBzaG9ydGhhbmQgYGZvbnRgIENTUyBwcm9wZXJ0eSwgYmFzZWQgb24gYSBzZXQgb2YgdHlwb2dyYXBoeSB2YWx1ZXMuIEZhbGxzIGJhY2sgdG9cbi8vIHRoZSBpbmRpdmlkdWFsIHByb3BlcnRpZXMgaWYgYSB2YWx1ZSB0aGF0IGlzbid0IGFsbG93ZWQgaW4gdGhlIHNob3J0aGFuZCBpcyBwYXNzZWQgaW4uXG5AbWl4aW4gbWF0LXR5cG9ncmFwaHktZm9udC1zaG9ydGhhbmQoJGZvbnQtc2l6ZSwgJGZvbnQtd2VpZ2h0LCAkbGluZS1oZWlnaHQsICRmb250LWZhbWlseSkge1xuICAvLyBJZiBhbnkgb2YgdGhlIHZhbHVlcyBhcmUgc2V0IHRvIGBpbmhlcml0YCwgd2UgY2FuJ3QgdXNlIHRoZSBzaG9ydGhhbmRcbiAgLy8gc28gd2UgZmFsbCBiYWNrIHRvIHBhc3NpbmcgaW4gdGhlIGluZGl2aWR1YWwgcHJvcGVydGllcy5cbiAgQGlmICgkZm9udC1zaXplID09IGluaGVyaXQgb3JcbiAgICAgICAkZm9udC13ZWlnaHQgPT0gaW5oZXJpdCBvclxuICAgICAgICRsaW5lLWhlaWdodCA9PSBpbmhlcml0IG9yXG4gICAgICAgJGZvbnQtZmFtaWx5ID09IGluaGVyaXQgb3JcbiAgICAgICAkZm9udC1zaXplID09IG51bGwgb3JcbiAgICAgICAkZm9udC13ZWlnaHQgPT0gbnVsbCBvclxuICAgICAgICRsaW5lLWhlaWdodCA9PSBudWxsIG9yXG4gICAgICAgJGZvbnQtZmFtaWx5ID09IG51bGwpIHtcblxuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZTtcbiAgICBmb250LXdlaWdodDogJGZvbnQtd2VpZ2h0O1xuICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseTtcbiAgfVxuICBAZWxzZSB7XG4gICAgLy8gT3RoZXJ3aXNlIHVzZSB0aGUgc2hvcnRoYW5kIGBmb250YCwgYmVjYXVzZSBpdCdzIHRoZSBsZWFzdCBhbW91bnQgb2YgYnl0ZXMuIE5vdGVcbiAgICAvLyB0aGF0IHdlIG5lZWQgdG8gdXNlIGludGVycG9sYXRpb24gZm9yIGBmb250LXNpemUvbGluZS1oZWlnaHRgIGluIG9yZGVyIHRvIHByZXZlbnRcbiAgICAvLyBTYXNzIGZyb20gZGl2aWRpbmcgdGhlIHR3byB2YWx1ZXMuXG4gICAgZm9udDogJGZvbnQtd2VpZ2h0ICN7JGZvbnQtc2l6ZX0vI3skbGluZS1oZWlnaHR9ICRmb250LWZhbWlseTtcbiAgfVxufVxuXG4vLyBDb252ZXJ0cyBhIHR5cG9ncmFwaHkgbGV2ZWwgaW50byBDU1Mgc3R5bGVzLlxuQG1peGluIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCAkbGV2ZWwpIHtcbiAgJGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCAkbGV2ZWwpO1xuICAkZm9udC13ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCAkbGV2ZWwpO1xuICAkbGluZS1oZWlnaHQ6IG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCAkbGV2ZWwpO1xuICAkZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnLCAkbGV2ZWwpO1xuXG4gIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWZvbnQtc2hvcnRoYW5kKCRmb250LXNpemUsICRmb250LXdlaWdodCwgJGxpbmUtaGVpZ2h0LCAkZm9udC1mYW1pbHkpO1xuICBsZXR0ZXItc3BhY2luZzogbWF0LWxldHRlci1zcGFjaW5nKCRjb25maWcsICRsZXZlbCk7XG59XG5cblxuQG1peGluIG1hdC1vcHRpb24tdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLWdldCgkdGhlbWUsIHdhcm4pO1xuXG4gIC5tYXQtb3B0aW9uIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgICY6aG92ZXI6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKSxcbiAgICAmOmZvY3VzOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3Zlcik7XG4gICAgfVxuXG4gICAgLy8gSW4gbXVsdGlwbGUgbW9kZSB0aGVyZSBpcyBhIGNoZWNrYm94IHRvIHNob3cgdGhhdCB0aGUgb3B0aW9uIGlzIHNlbGVjdGVkLlxuICAgICYubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1tdWx0aXBsZSk6bm90KC5tYXQtb3B0aW9uLWRpc2FibGVkKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGhvdmVyKTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY3RpdmUge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3Zlcik7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAmLm1hdC1vcHRpb24tZGlzYWJsZWQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgaGludC10ZXh0KTtcbiAgICB9XG4gIH1cblxuICAubWF0LXByaW1hcnkgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICB9XG5cbiAgLm1hdC1hY2NlbnQgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG4gIH1cblxuICAubWF0LXdhcm4gLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtb3B0aW9uLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LW9wdGlvbiB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIHN1YmhlYWRpbmctMik7XG4gICAgfVxuICB9XG59XG5cblxuXG5cblxuQG1peGluIG1hdC1vcHRncm91cC10aGVtZSgkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LW9wdGdyb3VwLWxhYmVsIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LW9wdGdyb3VwLWRpc2FibGVkIC5tYXQtb3B0Z3JvdXAtbGFiZWwge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1vcHRncm91cC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1vcHRncm91cC1sYWJlbCB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIGJvZHktMik7XG4gIH1cbn1cblxuXG5cbkBtaXhpbiBtYXQtcHNldWRvLWNoZWNrYm94LXRoZW1lKCR0aGVtZSkge1xuICAkaXMtZGFyay10aGVtZTogbWFwLWdldCgkdGhlbWUsIGlzLWRhcmspO1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcblxuICAvLyBOT1RFKHRyYXZpc2thdWZtYW4pOiBXaGlsZSB0aGUgc3BlYyBjYWxscyBmb3IgdHJhbnNsdWNlbnQgYmxhY2tzL3doaXRlcyBmb3IgZGlzYWJsZWQgY29sb3JzLFxuICAvLyB0aGlzIGRvZXMgbm90IHdvcmsgd2VsbCB3aXRoIGVsZW1lbnRzIGxheWVyZWQgb24gdG9wIG9mIG9uZSBhbm90aGVyLiBUbyBnZXQgYXJvdW5kIHRoaXMgd2VcbiAgLy8gYmxlbmQgdGhlIGNvbG9ycyB0b2dldGhlciBiYXNlZCBvbiB0aGUgYmFzZSBjb2xvciBhbmQgdGhlIHRoZW1lIGJhY2tncm91bmQuXG4gICR3aGl0ZS0zMHBjdC1vcGFjaXR5LW9uLWRhcms6ICM2ODY4Njg7XG4gICRibGFjay0yNnBjdC1vcGFjaXR5LW9uLWxpZ2h0OiAjYjBiMGIwO1xuICAkZGlzYWJsZWQtY29sb3I6IGlmKCRpcy1kYXJrLXRoZW1lLCAkd2hpdGUtMzBwY3Qtb3BhY2l0eS1vbi1kYXJrLCAkYmxhY2stMjZwY3Qtb3BhY2l0eS1vbi1saWdodCk7XG4gICRjb2xvcmVkLWJveC1zZWxlY3RvcjogJy5tYXQtcHNldWRvLWNoZWNrYm94LWNoZWNrZWQsIC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUnO1xuXG4gIC5tYXQtcHNldWRvLWNoZWNrYm94IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKSwgc2Vjb25kYXJ5LXRleHQpO1xuXG4gICAgJjo6YWZ0ZXIge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgYmFja2dyb3VuZCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1wc2V1ZG8tY2hlY2tib3gtZGlzYWJsZWQge1xuICAgIGNvbG9yOiAkZGlzYWJsZWQtY29sb3I7XG4gIH1cblxuICAvLyBEZWZhdWx0IHRvIHRoZSBhY2NlbnQgY29sb3IuIE5vdGUgdGhhdCB0aGUgcHNldWRvIGNoZWNrYm94ZXMgYXJlIG1lYW50IHRvIGluaGVyaXQgdGhlXG4gIC8vIHRoZW1lIGZyb20gdGhlaXIgcGFyZW50LCByYXRoZXIgdGhhbiBpbXBsZW1lbnRpbmcgdGhlaXIgb3duIHRoZW1pbmcsIHdoaWNoIGlzIHdoeSB3ZVxuICAvLyBkb24ndCBhdHRhY2ggdG8gdGhlIGBtYXQtKmAgY2xhc3Nlcy5cbiAgLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCxcbiAgLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSxcbiAgLm1hdC1hY2NlbnQgLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCxcbiAgLm1hdC1hY2NlbnQgLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSB7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpKTtcbiAgfVxuXG4gIC5tYXQtcHJpbWFyeSAubWF0LXBzZXVkby1jaGVja2JveC1jaGVja2VkLFxuICAubWF0LXByaW1hcnkgLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSB7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KSk7XG4gIH1cblxuICAubWF0LXdhcm4gLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCxcbiAgLm1hdC13YXJuIC5tYXQtcHNldWRvLWNoZWNrYm94LWluZGV0ZXJtaW5hdGUge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgd2FybikpO1xuICB9XG5cbiAgLm1hdC1wc2V1ZG8tY2hlY2tib3gtY2hlY2tlZCxcbiAgLm1hdC1wc2V1ZG8tY2hlY2tib3gtaW5kZXRlcm1pbmF0ZSB7XG4gICAgJi5tYXQtcHNldWRvLWNoZWNrYm94LWRpc2FibGVkIHtcbiAgICAgIGJhY2tncm91bmQ6ICRkaXNhYmxlZC1jb2xvcjtcbiAgICB9XG4gIH1cbn1cblxuXG5cbi8vIFJlcHJlc2VudHMgYSB0eXBvZ3JhcGh5IGxldmVsIGZyb20gdGhlIE1hdGVyaWFsIGRlc2lnbiBzcGVjLlxuQGZ1bmN0aW9uIG1hdC10eXBvZ3JhcGh5LWxldmVsKFxuICAkZm9udC1zaXplLFxuICAkbGluZS1oZWlnaHQ6ICRmb250LXNpemUsXG4gICRmb250LXdlaWdodDogNDAwLFxuICAkZm9udC1mYW1pbHk6IG51bGwsXG4gICRsZXR0ZXItc3BhY2luZzogbnVsbCkge1xuXG4gIEByZXR1cm4gKFxuICAgIGZvbnQtc2l6ZTogJGZvbnQtc2l6ZSxcbiAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0LFxuICAgIGZvbnQtd2VpZ2h0OiAkZm9udC13ZWlnaHQsXG4gICAgZm9udC1mYW1pbHk6ICRmb250LWZhbWlseSxcbiAgICBsZXR0ZXItc3BhY2luZzogJGxldHRlci1zcGFjaW5nXG4gICk7XG59XG5cbi8vIFJlcHJlc2VudHMgYSBjb2xsZWN0aW9uIG9mIHR5cG9ncmFwaHkgbGV2ZWxzLlxuLy8gRGVmYXVsdHMgY29tZSBmcm9tIGh0dHBzOi8vbWF0ZXJpYWwuaW8vZ3VpZGVsaW5lcy9zdHlsZS90eXBvZ3JhcGh5Lmh0bWxcbi8vIE5vdGU6IFRoZSBzcGVjIGRvZXNuJ3QgbWVudGlvbiBsZXR0ZXIgc3BhY2luZy4gVGhlIHZhbHVlcyBoZXJlIGNvbWUgZnJvbVxuLy8gZXllYmFsbGluZyBpdCB1bnRpbCBpdCBsb29rZWQgZXhhY3RseSBsaWtlIHRoZSBzcGVjIGV4YW1wbGVzLlxuQGZ1bmN0aW9uIG1hdC10eXBvZ3JhcGh5LWNvbmZpZyhcbiAgJGZvbnQtZmFtaWx5OiAgICdSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZicsXG4gICRkaXNwbGF5LTQ6ICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbCgxMTJweCwgMTEycHgsIDMwMCwgJGxldHRlci1zcGFjaW5nOiAtMC4wNWVtKSxcbiAgJGRpc3BsYXktMzogICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDU2cHgsIDU2cHgsIDQwMCwgJGxldHRlci1zcGFjaW5nOiAtMC4wMmVtKSxcbiAgJGRpc3BsYXktMjogICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDQ1cHgsIDQ4cHgsIDQwMCwgJGxldHRlci1zcGFjaW5nOiAtMC4wMDVlbSksXG4gICRkaXNwbGF5LTE6ICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbCgzNHB4LCA0MHB4LCA0MDApLFxuICAkaGVhZGxpbmU6ICAgICAgbWF0LXR5cG9ncmFwaHktbGV2ZWwoMjRweCwgMzJweCwgNDAwKSxcbiAgJHRpdGxlOiAgICAgICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDIwcHgsIDMycHgsIDUwMCksXG4gICRzdWJoZWFkaW5nLTI6ICBtYXQtdHlwb2dyYXBoeS1sZXZlbCgxNnB4LCAyOHB4LCA0MDApLFxuICAkc3ViaGVhZGluZy0xOiAgbWF0LXR5cG9ncmFwaHktbGV2ZWwoMTVweCwgMjRweCwgNDAwKSxcbiAgJGJvZHktMjogICAgICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDE0cHgsIDI0cHgsIDUwMCksXG4gICRib2R5LTE6ICAgICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbCgxNHB4LCAyMHB4LCA0MDApLFxuICAkY2FwdGlvbjogICAgICAgbWF0LXR5cG9ncmFwaHktbGV2ZWwoMTJweCwgMjBweCwgNDAwKSxcbiAgJGJ1dHRvbjogICAgICAgIG1hdC10eXBvZ3JhcGh5LWxldmVsKDE0cHgsIDE0cHgsIDUwMCksXG4gIC8vIExpbmUtaGVpZ2h0IG11c3QgYmUgdW5pdC1sZXNzIGZyYWN0aW9uIG9mIHRoZSBmb250LXNpemUuXG4gICRpbnB1dDogICAgICAgICBtYXQtdHlwb2dyYXBoeS1sZXZlbChpbmhlcml0LCAxLjEyNSwgNDAwKVxuKSB7XG5cbiAgLy8gRGVjbGFyZSBhbiBpbml0aWFsIG1hcCB3aXRoIGFsbCBvZiB0aGUgbGV2ZWxzLlxuICAkY29uZmlnOiAoXG4gICAgZGlzcGxheS00OiAgICAgICRkaXNwbGF5LTQsXG4gICAgZGlzcGxheS0zOiAgICAgICRkaXNwbGF5LTMsXG4gICAgZGlzcGxheS0yOiAgICAgICRkaXNwbGF5LTIsXG4gICAgZGlzcGxheS0xOiAgICAgICRkaXNwbGF5LTEsXG4gICAgaGVhZGxpbmU6ICAgICAgICRoZWFkbGluZSxcbiAgICB0aXRsZTogICAgICAgICAgJHRpdGxlLFxuICAgIHN1YmhlYWRpbmctMjogICAkc3ViaGVhZGluZy0yLFxuICAgIHN1YmhlYWRpbmctMTogICAkc3ViaGVhZGluZy0xLFxuICAgIGJvZHktMjogICAgICAgICAkYm9keS0yLFxuICAgIGJvZHktMTogICAgICAgICAkYm9keS0xLFxuICAgIGNhcHRpb246ICAgICAgICAkY2FwdGlvbixcbiAgICBidXR0b246ICAgICAgICAgJGJ1dHRvbixcbiAgICBpbnB1dDogICAgICAgICAgJGlucHV0LFxuICApO1xuXG4gIC8vIExvb3AgdGhyb3VnaCB0aGUgbGV2ZWxzIGFuZCBzZXQgdGhlIGBmb250LWZhbWlseWAgb2YgdGhlIG9uZXMgdGhhdCBkb24ndCBoYXZlIG9uZSB0byB0aGUgYmFzZS5cbiAgLy8gTm90ZSB0aGF0IFNhc3MgY2FuJ3QgbW9kaWZ5IG1hcHMgaW4gcGxhY2UsIHdoaWNoIG1lYW5zIHRoYXQgd2UgbmVlZCB0byBtZXJnZSBhbmQgcmUtYXNzaWduLlxuICBAZWFjaCAka2V5LCAkbGV2ZWwgaW4gJGNvbmZpZyB7XG4gICAgQGlmIG1hcC1nZXQoJGxldmVsLCBmb250LWZhbWlseSkgPT0gbnVsbCB7XG4gICAgICAkbmV3LWxldmVsOiBtYXAtbWVyZ2UoJGxldmVsLCAoZm9udC1mYW1pbHk6ICRmb250LWZhbWlseSkpO1xuICAgICAgJGNvbmZpZzogbWFwLW1lcmdlKCRjb25maWcsICgka2V5OiAkbmV3LWxldmVsKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQWRkIHRoZSBiYXNlIGZvbnQgZmFtaWx5IHRvIHRoZSBjb25maWcuXG4gIEByZXR1cm4gbWFwLW1lcmdlKCRjb25maWcsIChmb250LWZhbWlseTogJGZvbnQtZmFtaWx5KSk7XG59XG5cbi8vIEFkZHMgdGhlIGJhc2UgdHlwb2dyYXBoeSBzdHlsZXMsIGJhc2VkIG9uIGEgY29uZmlnLlxuQG1peGluIG1hdC1iYXNlLXR5cG9ncmFwaHkoJGNvbmZpZywgJHNlbGVjdG9yOiAnLm1hdC10eXBvZ3JhcGh5Jykge1xuICAubWF0LWgxLCAubWF0LWhlYWRsaW5lLCAjeyRzZWxlY3Rvcn0gaDEge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBoZWFkbGluZSk7XG4gICAgbWFyZ2luOiAwIDAgMTZweDtcbiAgfVxuXG4gIC5tYXQtaDIsIC5tYXQtdGl0bGUsICN7JHNlbGVjdG9yfSBoMiB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIHRpdGxlKTtcbiAgICBtYXJnaW46IDAgMCAxNnB4O1xuICB9XG5cbiAgLm1hdC1oMywgLm1hdC1zdWJoZWFkaW5nLTIsICN7JHNlbGVjdG9yfSBoMyB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIHN1YmhlYWRpbmctMik7XG4gICAgbWFyZ2luOiAwIDAgMTZweDtcbiAgfVxuXG4gIC5tYXQtaDQsIC5tYXQtc3ViaGVhZGluZy0xLCAjeyRzZWxlY3Rvcn0gaDQge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBzdWJoZWFkaW5nLTEpO1xuICAgIG1hcmdpbjogMCAwIDE2cHg7XG4gIH1cblxuICAvLyBOb3RlOiB0aGUgc3BlYyBkb2Vzbid0IGhhdmUgYW55dGhpbmcgdGhhdCB3b3VsZCBjb3JyZXNwb25kIHRvIGg1IGFuZCBoNiwgYnV0IHdlIGFkZCB0aGVzZSBmb3JcbiAgLy8gY29uc2lzdGVuY3kuIFRoZSBmb250IHNpemVzIGNvbWUgZnJvbSB0aGUgQ2hyb21lIHVzZXIgYWdlbnQgc3R5bGVzIHdoaWNoIGhhdmUgaDUgYXQgMC44M2VtXG4gIC8vIGFuZCBoNiBhdCAwLjY3ZW0uXG4gIC5tYXQtaDUsICN7JHNlbGVjdG9yfSBoNSB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktZm9udC1zaG9ydGhhbmQoXG4gICAgICBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSkgKiAwLjgzLFxuICAgICAgbWF0LWZvbnQtd2VpZ2h0KCRjb25maWcsIGJvZHktMSksXG4gICAgICBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgYm9keS0xKSxcbiAgICAgIG1hdC1mb250LWZhbWlseSgkY29uZmlnLCBib2R5LTEpXG4gICAgKTtcblxuICAgIG1hcmdpbjogMCAwIDEycHg7XG4gIH1cblxuICAubWF0LWg2LCAjeyRzZWxlY3Rvcn0gaDYge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWZvbnQtc2hvcnRoYW5kKFxuICAgICAgbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpICogMC42NyxcbiAgICAgIG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTEpLFxuICAgICAgbWF0LWxpbmUtaGVpZ2h0KCRjb25maWcsIGJvZHktMSksXG4gICAgICBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgYm9keS0xKVxuICAgICk7XG5cbiAgICBtYXJnaW46IDAgMCAxMnB4O1xuICB9XG5cbiAgLm1hdC1ib2R5LXN0cm9uZywgLm1hdC1ib2R5LTIge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBib2R5LTIpO1xuICB9XG5cbiAgLm1hdC1ib2R5LCAubWF0LWJvZHktMSwgI3skc2VsZWN0b3J9IHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgYm9keS0xKTtcblxuICAgIHAge1xuICAgICAgbWFyZ2luOiAwIDAgMTJweDtcbiAgICB9XG4gIH1cblxuICAubWF0LXNtYWxsLCAubWF0LWNhcHRpb24ge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBjYXB0aW9uKTtcbiAgfVxuXG4gIC5tYXQtZGlzcGxheS00LCAjeyRzZWxlY3Rvcn0gLm1hdC1kaXNwbGF5LTQge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBkaXNwbGF5LTQpO1xuICAgIG1hcmdpbjogMCAwIDU2cHg7XG4gIH1cblxuICAubWF0LWRpc3BsYXktMywgI3skc2VsZWN0b3J9IC5tYXQtZGlzcGxheS0zIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgZGlzcGxheS0zKTtcbiAgICBtYXJnaW46IDAgMCA2NHB4O1xuICB9XG5cbiAgLm1hdC1kaXNwbGF5LTIsICN7JHNlbGVjdG9yfSAubWF0LWRpc3BsYXktMiB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIGRpc3BsYXktMik7XG4gICAgbWFyZ2luOiAwIDAgNjRweDtcbiAgfVxuXG4gIC5tYXQtZGlzcGxheS0xLCAjeyRzZWxlY3Rvcn0gLm1hdC1kaXNwbGF5LTEge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBkaXNwbGF5LTEpO1xuICAgIG1hcmdpbjogMCAwIDY0cHg7XG4gIH1cbn1cblxuXG5cblxuQG1peGluIG1hdC1hdXRvY29tcGxldGUtdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG5cbiAgLm1hdC1hdXRvY29tcGxldGUtcGFuZWwge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDQsICR0aGVtZSk7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgIC8vIFNlbGVjdGVkIG9wdGlvbnMgaW4gYXV0b2NvbXBsZXRlcyBzaG91bGQgbm90IGJlIGdyYXksIGJ1dCB3ZVxuICAgIC8vIG9ubHkgd2FudCB0byBvdmVycmlkZSB0aGUgYmFja2dyb3VuZCBmb3Igc2VsZWN0ZWQgb3B0aW9ucyBpZlxuICAgIC8vIHRoZXkgYXJlICpub3QqIGluIGhvdmVyIG9yIGZvY3VzIHN0YXRlLiBUaGlzIGNoYW5nZSBoYXMgdG8gYmVcbiAgICAvLyBtYWRlIGhlcmUgYmVjYXVzZSBiYXNlIG9wdGlvbiBzdHlsZXMgYXJlIHNoYXJlZCBiZXR3ZWVuIHRoZVxuICAgIC8vIGF1dG9jb21wbGV0ZSBhbmQgdGhlIHNlbGVjdC5cbiAgICAubWF0LW9wdGlvbi5tYXQtc2VsZWN0ZWQ6bm90KC5tYXQtYWN0aXZlKTpub3QoOmhvdmVyKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuXG4gICAgICAmOm5vdCgubWF0LW9wdGlvbi1kaXNhYmxlZCkge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxufVxuXG5AbWl4aW4gbWF0LWF1dG9jb21wbGV0ZS10eXBvZ3JhcGh5KCRjb25maWcpIHsgfVxuXG4vLyBUaGlzIGNvbnRhaW5zIGFsbCBvZiB0aGUgc3R5bGVzIGZvciB0aGUgYmFkZ2Vcbi8vIHJhdGhlciB0aGFuIGp1c3QgdGhlIGNvbG9yL3RoZW1lIGJlY2F1c2Ugb2Zcbi8vIG5vIHN0eWxlIHNoZWV0IHN1cHBvcnQgZm9yIGRpcmVjdGl2ZXMuXG5cblxuXG5cblxuJG1hdC1iYWRnZS1mb250LXNpemU6IDEycHg7XG4kbWF0LWJhZGdlLWZvbnQtd2VpZ2h0OiA2MDA7XG4kbWF0LWJhZGdlLWRlZmF1bHQtc2l6ZTogMjJweCAhZGVmYXVsdDtcbiRtYXQtYmFkZ2Utc21hbGwtc2l6ZTogJG1hdC1iYWRnZS1kZWZhdWx0LXNpemUgLSA2O1xuJG1hdC1iYWRnZS1sYXJnZS1zaXplOiAkbWF0LWJhZGdlLWRlZmF1bHQtc2l6ZSArIDY7XG5cbi8vIE1peGluIGZvciBidWlsZGluZyBvZmZzZXQgZ2l2ZW4gZGlmZmVyZW50IHNpemVzXG5AbWl4aW4gX21hdC1iYWRnZS1zaXplKCRzaXplKSB7XG4gIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgd2lkdGg6ICRzaXplO1xuICAgIGhlaWdodDogJHNpemU7XG4gICAgbGluZS1oZWlnaHQ6ICRzaXplO1xuICB9XG5cbiAgJi5tYXQtYmFkZ2UtYWJvdmUge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICB0b3A6IC0kc2l6ZSAvIDI7XG4gICAgfVxuICB9XG5cbiAgJi5tYXQtYmFkZ2UtYmVsb3cge1xuICAgIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgICBib3R0b206IC0kc2l6ZSAvIDI7XG4gICAgfVxuICB9XG5cbiAgJi5tYXQtYmFkZ2UtYmVmb3JlIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgbGVmdDogLSRzaXplO1xuICAgIH1cbiAgfVxuXG4gIFtkaXI9J3J0bCddICYubWF0LWJhZGdlLWJlZm9yZSB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIGxlZnQ6IGF1dG87XG4gICAgICByaWdodDogLSRzaXplO1xuICAgIH1cbiAgfVxuXG4gICYubWF0LWJhZGdlLWFmdGVyIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgcmlnaHQ6IC0kc2l6ZTtcbiAgICB9XG4gIH1cblxuICBbZGlyPSdydGwnXSAmLm1hdC1iYWRnZS1hZnRlciB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIHJpZ2h0OiBhdXRvO1xuICAgICAgbGVmdDogLSRzaXplO1xuICAgIH1cbiAgfVxuXG4gICYubWF0LWJhZGdlLW92ZXJsYXAge1xuICAgICYubWF0LWJhZGdlLWJlZm9yZSB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICBsZWZ0OiAtJHNpemUgLyAyO1xuICAgICAgfVxuICAgIH1cblxuICAgIFtkaXI9J3J0bCddICYubWF0LWJhZGdlLWJlZm9yZSB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICBsZWZ0OiBhdXRvO1xuICAgICAgICByaWdodDogLSRzaXplIC8gMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAmLm1hdC1iYWRnZS1hZnRlciB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICByaWdodDogLSRzaXplIC8gMjtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBbZGlyPSdydGwnXSAmLm1hdC1iYWRnZS1hZnRlciB7XG4gICAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgICByaWdodDogYXV0bztcbiAgICAgICAgbGVmdDogLSRzaXplIC8gMjtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1iYWRnZS10aGVtZSgkdGhlbWUpIHtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5LCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuXG4gICAgQGluY2x1ZGUgY2RrLWhpZ2gtY29udHJhc3Qge1xuICAgICAgb3V0bGluZTogc29saWQgMXB4O1xuICAgICAgYm9yZGVyLXJhZGl1czogMDtcbiAgICB9XG4gIH1cblxuICAubWF0LWJhZGdlLWFjY2VudCB7XG4gICAgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1iYWRnZS13YXJuIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkd2FybiwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYmFkZ2Uge1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcbiAgfVxuXG4gIC5tYXQtYmFkZ2UtaGlkZGVuIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgZGlzcGxheTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJhZGdlLWRpc2FibGVkIHtcbiAgICAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgICAgJGFwcC1iYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdiYWNrZ3JvdW5kJyk7XG4gICAgICAkYmFkZ2UtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQtYnV0dG9uKTtcblxuICAgICAgLy8gVGhlIGRpc2FibGVkIGNvbG9yIHVzdWFsbHkgaGFzIHNvbWUga2luZCBvZiBvcGFjaXR5LCBidXQgYmVjYXVzZSB0aGUgYmFkZ2UgaXMgb3ZlcmxheWVkXG4gICAgICAvLyBvbiB0b3Agb2Ygc29tZXRoaW5nIGVsc2UsIGl0IHdvbid0IGxvb2sgZ29vZCBpZiBpdCdzIG9wYXF1ZS4gSWYgaXQgaXMgYSBjb2xvciAqdHlwZSosXG4gICAgICAvLyB3ZSBjb252ZXJ0IGl0IGludG8gYSBzb2xpZCBjb2xvciBieSB0YWtpbmcgdGhlIG9wYWNpdHkgZnJvbSB0aGUgcmdiYSB2YWx1ZSBhbmQgdXNpbmdcbiAgICAgIC8vIHRoZSB2YWx1ZSB0byBkZXRlcm1pbmUgdGhlIHBlcmNlbnRhZ2Ugb2YgdGhlIGJhY2tncm91bmQgdG8gcHV0IGludG8gZm9yZWdyb3VuZCB3aGVuXG4gICAgICAvLyBtaXhpbmcgdGhlIGNvbG9ycyB0b2dldGhlci5cbiAgICAgIEBpZiAodHlwZS1vZigkYmFkZ2UtY29sb3IpID09IGNvbG9yIGFuZCB0eXBlLW9mKCRhcHAtYmFja2dyb3VuZCkgPT0gY29sb3IpIHtcbiAgICAgICAgJGJhZGdlLW9wYWNpdHk6IG9wYWNpdHkoJGJhZGdlLWNvbG9yKTtcbiAgICAgICAgYmFja2dyb3VuZDogbWl4KCRhcHAtYmFja2dyb3VuZCwgcmdiYSgkYmFkZ2UtY29sb3IsIDEpLCAoMSAtICRiYWRnZS1vcGFjaXR5KSAqIDEwMCUpO1xuICAgICAgfVxuICAgICAgQGVsc2Uge1xuICAgICAgICBiYWNrZ3JvdW5kOiAkYmFkZ2UtY29sb3I7XG4gICAgICB9XG5cbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gICAgYm9yZGVyLXJhZGl1czogNTAlO1xuICAgIHRyYW5zaXRpb246IHRyYW5zZm9ybSAyMDBtcyBlYXNlLWluLW91dDtcbiAgICB0cmFuc2Zvcm06IHNjYWxlKDAuNik7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgIHBvaW50ZXItZXZlbnRzOiBub25lO1xuICB9XG5cbiAgLm5nLWFuaW1hdGUtZGlzYWJsZWQgLm1hdC1iYWRnZS1jb250ZW50LFxuICAubWF0LWJhZGdlLWNvbnRlbnQuX21hdC1hbmltYXRpb24tbm9vcGFibGUge1xuICAgIHRyYW5zaXRpb246IG5vbmU7XG4gIH1cblxuICAvLyBUaGUgYWN0aXZlIGNsYXNzIGlzIGFkZGVkIGFmdGVyIHRoZSBlbGVtZW50IGlzIGFkZGVkXG4gIC8vIHNvIGl0IGNhbiBhbmltYXRlIHNjYWxlIHRvIGRlZmF1bHRcbiAgLm1hdC1iYWRnZS1jb250ZW50Lm1hdC1iYWRnZS1hY3RpdmUge1xuICAgIC8vIFNjYWxlIHRvIGBub25lYCBpbnN0ZWFkIG9mIGAxYCB0byBhdm9pZCBibHVycnkgdGV4dCBpbiBzb21lIGJyb3dzZXJzLlxuICAgIHRyYW5zZm9ybTogbm9uZTtcbiAgfVxuXG4gIC5tYXQtYmFkZ2Utc21hbGwge1xuICAgIEBpbmNsdWRlIF9tYXQtYmFkZ2Utc2l6ZSgkbWF0LWJhZGdlLXNtYWxsLXNpemUpO1xuICB9XG4gIC5tYXQtYmFkZ2UtbWVkaXVtIHtcbiAgICBAaW5jbHVkZSBfbWF0LWJhZGdlLXNpemUoJG1hdC1iYWRnZS1kZWZhdWx0LXNpemUpO1xuICB9XG4gIC5tYXQtYmFkZ2UtbGFyZ2Uge1xuICAgIEBpbmNsdWRlIF9tYXQtYmFkZ2Utc2l6ZSgkbWF0LWJhZGdlLWxhcmdlLXNpemUpO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtYmFkZ2UtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgZm9udC13ZWlnaHQ6ICRtYXQtYmFkZ2UtZm9udC13ZWlnaHQ7XG4gICAgZm9udC1zaXplOiAkbWF0LWJhZGdlLWZvbnQtc2l6ZTtcbiAgICBmb250LWZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcpO1xuICB9XG5cbiAgLm1hdC1iYWRnZS1zbWFsbCAubWF0LWJhZGdlLWNvbnRlbnQge1xuICAgIC8vIFNldCB0aGUgZm9udCBzaXplIHRvIDc1JSBvZiB0aGUgb3JpZ2luYWwuXG4gICAgZm9udC1zaXplOiAkbWF0LWJhZGdlLWZvbnQtc2l6ZSAqIDAuNzU7XG4gIH1cblxuICAubWF0LWJhZGdlLWxhcmdlIC5tYXQtYmFkZ2UtY29udGVudCB7XG4gICAgZm9udC1zaXplOiAkbWF0LWJhZGdlLWZvbnQtc2l6ZSAqIDI7XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LWJvdHRvbS1zaGVldC10aGVtZSgkdGhlbWUpIHtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWJvdHRvbS1zaGVldC1jb250YWluZXIge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDE2LCAkdGhlbWUpO1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgZGlhbG9nKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWJvdHRvbS1zaGVldC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1ib3R0b20tc2hlZXQtY29udGFpbmVyIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5cblxuXG5cbiRfbWF0LWJ1dHRvbi1yaXBwbGUtb3BhY2l0eTogMC4xO1xuXG4vLyBBcHBsaWVzIGEgZm9jdXMgc3R5bGUgdG8gYW4gbWF0LWJ1dHRvbiBlbGVtZW50IGZvciBlYWNoIG9mIHRoZSBzdXBwb3J0ZWQgcGFsZXR0ZXMuXG5AbWl4aW4gX21hdC1idXR0b24tZm9jdXMtb3ZlcmxheS1jb2xvcigkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG5cbiAgJi5tYXQtcHJpbWFyeSAubWF0LWJ1dHRvbi1mb2N1cy1vdmVybGF5IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICB9XG5cbiAgJi5tYXQtYWNjZW50IC5tYXQtYnV0dG9uLWZvY3VzLW92ZXJsYXkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgfVxuXG4gICYubWF0LXdhcm4gLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgfVxuXG4gICZbZGlzYWJsZWRdIC5tYXQtYnV0dG9uLWZvY3VzLW92ZXJsYXkge1xuICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICB9XG59XG5cbkBtaXhpbiBfbWF0LWJ1dHRvbi1yaXBwbGUtY29sb3IoJHRoZW1lLCAkaHVlLCAkb3BhY2l0eTogJF9tYXQtYnV0dG9uLXJpcHBsZS1vcGFjaXR5KSB7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLWdldCgkdGhlbWUsIHdhcm4pO1xuXG4gICYubWF0LXByaW1hcnkgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5LCAkaHVlLCAkb3BhY2l0eSk7XG4gIH1cblxuICAmLm1hdC1hY2NlbnQgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRhY2NlbnQsICRodWUsICRvcGFjaXR5KTtcbiAgfVxuXG4gICYubWF0LXdhcm4gLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCR3YXJuLCAkaHVlLCAkb3BhY2l0eSk7XG4gIH1cbn1cblxuLy8gQXBwbGllcyBhIHByb3BlcnR5IHRvIGFuIG1hdC1idXR0b24gZWxlbWVudCBmb3IgZWFjaCBvZiB0aGUgc3VwcG9ydGVkIHBhbGV0dGVzLlxuQG1peGluIF9tYXQtYnV0dG9uLXRoZW1lLXByb3BlcnR5KCR0aGVtZSwgJHByb3BlcnR5LCAkaHVlKSB7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLWdldCgkdGhlbWUsIHdhcm4pO1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gICYubWF0LXByaW1hcnkge1xuICAgICN7JHByb3BlcnR5fTogbWF0LWNvbG9yKCRwcmltYXJ5LCAkaHVlKTtcbiAgfVxuICAmLm1hdC1hY2NlbnQge1xuICAgICN7JHByb3BlcnR5fTogbWF0LWNvbG9yKCRhY2NlbnQsICRodWUpO1xuICB9XG4gICYubWF0LXdhcm4ge1xuICAgICN7JHByb3BlcnR5fTogbWF0LWNvbG9yKCR3YXJuLCAkaHVlKTtcbiAgfVxuXG4gICYubWF0LXByaW1hcnksICYubWF0LWFjY2VudCwgJi5tYXQtd2FybiwgJltkaXNhYmxlZF0ge1xuICAgICZbZGlzYWJsZWRdIHtcbiAgICAgICRwYWxldHRlOiBpZigkcHJvcGVydHkgPT0gJ2NvbG9yJywgJGZvcmVncm91bmQsICRiYWNrZ3JvdW5kKTtcbiAgICAgICN7JHByb3BlcnR5fTogbWF0LWNvbG9yKCRwYWxldHRlLCBkaXNhYmxlZC1idXR0b24pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWJ1dHRvbi10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1idXR0b24sIC5tYXQtaWNvbi1idXR0b24sIC5tYXQtc3Ryb2tlZC1idXR0b24ge1xuICAgIC8vIEJ1dHRvbnMgd2l0aG91dCBhIGJhY2tncm91bmQgY29sb3Igc2hvdWxkIGluaGVyaXQgdGhlIGZvbnQgY29sb3IuIFRoaXMgaXMgbmVjZXNzYXJ5IHRvXG4gICAgLy8gZW5zdXJlIHRoYXQgdGhlIGJ1dHRvbiBpcyByZWFkYWJsZSBvbiBjdXN0b20gYmFja2dyb3VuZCBjb2xvcnMuIEl0J3Mgd3JvbmcgdG8gYWx3YXlzIGFzc3VtZVxuICAgIC8vIHRoYXQgdGhvc2UgYnV0dG9ucyBhcmUgYWx3YXlzIHBsYWNlZCBpbnNpZGUgb2YgY29udGFpbmVycyB3aXRoIHRoZSBkZWZhdWx0IGJhY2tncm91bmRcbiAgICAvLyBjb2xvciBvZiB0aGUgdGhlbWUgKGUuZy4gdGhlbWVkIHRvb2xiYXJzKS5cbiAgICBjb2xvcjogaW5oZXJpdDtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcblxuICAgIEBpbmNsdWRlIF9tYXQtYnV0dG9uLXRoZW1lLXByb3BlcnR5KCR0aGVtZSwgJ2NvbG9yJywgZGVmYXVsdCk7XG4gICAgQGluY2x1ZGUgX21hdC1idXR0b24tZm9jdXMtb3ZlcmxheS1jb2xvcigkdGhlbWUpO1xuXG4gICAgLy8gU2V0dXAgdGhlIHJpcHBsZSBjb2xvciB0byBiZSBiYXNlZCBvbiB0aGUgdGV4dCBjb2xvci4gVGhpcyBlbnN1cmVzIHRoYXQgdGhlIHJpcHBsZXNcbiAgICAvLyBhcmUgbWF0Y2hpbmcgd2l0aCB0aGUgY3VycmVudCB0aGVtZSBwYWxldHRlIGFuZCBhcmUgaW4gY29udHJhc3QgdG8gdGhlIGJhY2tncm91bmQgY29sb3JcbiAgICAvLyAoZS5nIGluIHRoZW1lZCB0b29sYmFycykuXG4gICAgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICBvcGFjaXR5OiAkX21hdC1idXR0b24tcmlwcGxlLW9wYWNpdHk7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1idXR0b24tZm9jdXMtb3ZlcmxheSB7XG4gICAgYmFja2dyb3VuZDogbWFwX2dldCgkZm9yZWdyb3VuZCwgYmFzZSk7XG4gIH1cblxuICAvLyBOb3RlOiB0aGlzIG5lZWRzIGEgYml0IGV4dHJhIHNwZWNpZmljaXR5LCBiZWNhdXNlIHdlJ3JlIG5vdCBndWFyYW50ZWVkIHRoZSBpbmNsdXNpb25cbiAgLy8gb3JkZXIgb2YgdGhlIHRoZW1lIHN0eWxlcyBhbmQgdGhlIGJ1dHRvbiByZXNldCBtYXkgZW5kIHVwIHJlc2V0dGluZyB0aGlzIGFzIHdlbGwuXG4gIC5tYXQtc3Ryb2tlZC1idXR0b246bm90KFtkaXNhYmxlZF0pIHtcbiAgICBib3JkZXItY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cblxuICAubWF0LWZsYXQtYnV0dG9uLCAubWF0LXJhaXNlZC1idXR0b24sIC5tYXQtZmFiLCAubWF0LW1pbmktZmFiIHtcbiAgICAvLyBEZWZhdWx0IGZvbnQgYW5kIGJhY2tncm91bmQgY29sb3Igd2hlbiBub3QgdXNpbmcgYW55IGNvbG9yIHBhbGV0dGUuXG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCByYWlzZWQtYnV0dG9uKTtcblxuICAgIEBpbmNsdWRlIF9tYXQtYnV0dG9uLXRoZW1lLXByb3BlcnR5KCR0aGVtZSwgJ2NvbG9yJywgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgQGluY2x1ZGUgX21hdC1idXR0b24tdGhlbWUtcHJvcGVydHkoJHRoZW1lLCAnYmFja2dyb3VuZC1jb2xvcicsIGRlZmF1bHQpO1xuICAgIEBpbmNsdWRlIF9tYXQtYnV0dG9uLXJpcHBsZS1jb2xvcigkdGhlbWUsIGRlZmF1bHQtY29udHJhc3QpO1xuICB9XG5cbiAgLm1hdC1zdHJva2VkLWJ1dHRvbiwgLm1hdC1mbGF0LWJ1dHRvbiB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMCwgJHRoZW1lKTtcbiAgfVxuXG4gIC5tYXQtcmFpc2VkLWJ1dHRvbiB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMiwgJHRoZW1lKTtcblxuICAgICY6bm90KFtkaXNhYmxlZF0pOmFjdGl2ZSB7XG4gICAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbig4LCAkdGhlbWUpO1xuICAgIH1cblxuICAgICZbZGlzYWJsZWRdIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDAsICR0aGVtZSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mYWIsIC5tYXQtbWluaS1mYWIge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDYsICR0aGVtZSk7XG5cbiAgICAmOm5vdChbZGlzYWJsZWRdKTphY3RpdmUge1xuICAgICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMTIsICR0aGVtZSk7XG4gICAgfVxuXG4gICAgJltkaXNhYmxlZF0ge1xuICAgICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMCwgJHRoZW1lKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1idXR0b24tdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtYnV0dG9uLCAubWF0LXJhaXNlZC1idXR0b24sIC5tYXQtaWNvbi1idXR0b24sIC5tYXQtc3Ryb2tlZC1idXR0b24sXG4gIC5tYXQtZmxhdC1idXR0b24sIC5tYXQtZmFiLCAubWF0LW1pbmktZmFiIHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYnV0dG9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBtYXQtYnV0dG9uLXRvZ2dsZS10aGVtZSgkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGRpdmlkZXItY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG5cbiAgLm1hdC1idXR0b24tdG9nZ2xlLXN0YW5kYWxvbmUsXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cCB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1lbGV2YXRpb24oMiwgJHRoZW1lKTtcbiAgfVxuXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1zdGFuZGFsb25lLm1hdC1idXR0b24tdG9nZ2xlLWFwcGVhcmFuY2Utc3RhbmRhcmQsXG4gIC5tYXQtYnV0dG9uLXRvZ2dsZS1ncm91cC1hcHBlYXJhbmNlLXN0YW5kYXJkIHtcbiAgICBib3gtc2hhZG93OiBub25lO1xuICB9XG5cbiAgLm1hdC1idXR0b24tdG9nZ2xlIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBoaW50LXRleHQpO1xuXG4gICAgLm1hdC1idXR0b24tdG9nZ2xlLWZvY3VzLW92ZXJsYXkge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBmb2N1c2VkLWJ1dHRvbik7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1idXR0b24tdG9nZ2xlLWFwcGVhcmFuY2Utc3RhbmRhcmQge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgY2FyZCk7XG5cbiAgICAubWF0LWJ1dHRvbi10b2dnbGUtZm9jdXMtb3ZlcmxheSB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGZvY3VzZWQtYnV0dG9uLCAxKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAtYXBwZWFyYW5jZS1zdGFuZGFyZCAubWF0LWJ1dHRvbi10b2dnbGUgKyAubWF0LWJ1dHRvbi10b2dnbGUge1xuICAgIGJvcmRlci1sZWZ0OiBzb2xpZCAxcHggJGRpdmlkZXItY29sb3I7XG4gIH1cblxuICBbZGlyPSdydGwnXSAubWF0LWJ1dHRvbi10b2dnbGUtZ3JvdXAtYXBwZWFyYW5jZS1zdGFuZGFyZCAubWF0LWJ1dHRvbi10b2dnbGUgKyAubWF0LWJ1dHRvbi10b2dnbGUge1xuICAgIGJvcmRlci1sZWZ0OiBub25lO1xuICAgIGJvcmRlci1yaWdodDogc29saWQgMXB4ICRkaXZpZGVyLWNvbG9yO1xuICB9XG5cbiAgLm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLWFwcGVhcmFuY2Utc3RhbmRhcmQubWF0LWJ1dHRvbi10b2dnbGUtdmVydGljYWwge1xuICAgIC5tYXQtYnV0dG9uLXRvZ2dsZSArIC5tYXQtYnV0dG9uLXRvZ2dsZSB7XG4gICAgICBib3JkZXItbGVmdDogbm9uZTtcbiAgICAgIGJvcmRlci1yaWdodDogbm9uZTtcbiAgICAgIGJvcmRlci10b3A6IHNvbGlkIDFweCAkZGl2aWRlci1jb2xvcjtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtY2hlY2tlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBzZWxlY3RlZC1idXR0b24pO1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcblxuICAgICYubWF0LWJ1dHRvbi10b2dnbGUtYXBwZWFyYW5jZS1zdGFuZGFyZCB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICB9XG4gIH1cblxuICAubWF0LWJ1dHRvbi10b2dnbGUtZGlzYWJsZWQge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLWJ1dHRvbik7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBkaXNhYmxlZC1idXR0b24tdG9nZ2xlKTtcblxuICAgICYubWF0LWJ1dHRvbi10b2dnbGUtYXBwZWFyYW5jZS1zdGFuZGFyZCB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuICAgIH1cblxuICAgICYubWF0LWJ1dHRvbi10b2dnbGUtY2hlY2tlZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIHNlbGVjdGVkLWRpc2FibGVkLWJ1dHRvbik7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1idXR0b24tdG9nZ2xlLXN0YW5kYWxvbmUubWF0LWJ1dHRvbi10b2dnbGUtYXBwZWFyYW5jZS1zdGFuZGFyZCxcbiAgLm1hdC1idXR0b24tdG9nZ2xlLWdyb3VwLWFwcGVhcmFuY2Utc3RhbmRhcmQge1xuICAgIGJvcmRlcjogc29saWQgMXB4ICRkaXZpZGVyLWNvbG9yO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtYnV0dG9uLXRvZ2dsZS10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1idXR0b24tdG9nZ2xlIHtcbiAgICBmb250LWZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcpO1xuICB9XG59XG5cblxuXG5cblxuXG5cbkBtaXhpbiBtYXQtY2FyZC10aGVtZSgkdGhlbWUpIHtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWNhcmQge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDEsICR0aGVtZSk7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgIC8vIE5lZWRzIGV4dHJhIHNwZWNpZmljaXR5IHRvIGJlIGFibGUgdG8gb3ZlcnJpZGUgdGhlIGVsZXZhdGlvbiBzZWxlY3RvcnMuXG4gICAgJi5tYXQtY2FyZC1mbGF0IHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtb3ZlcnJpZGFibGUtZWxldmF0aW9uKDAsICR0aGVtZSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jYXJkLXN1YnRpdGxlIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1jYXJkLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWNhcmQge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LWNhcmQtdGl0bGUge1xuICAgIGZvbnQ6IHtcbiAgICAgIHNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgaGVhZGxpbmUpO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgdGl0bGUpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXRpdGxlIHtcbiAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgdGl0bGUpO1xuICB9XG5cbiAgLm1hdC1jYXJkLXN1YnRpdGxlLFxuICAubWF0LWNhcmQtY29udGVudCB7XG4gICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSk7XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBtYXQtY2hlY2tib3gtdGhlbWUoJHRoZW1lKSB7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLWdldCgkdGhlbWUsIHdhcm4pO1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG5cbiAgLy8gVGhlIGNvbG9yIG9mIHRoZSBjaGVja2JveCdzIGNoZWNrbWFyayAvIG1peGVkbWFyay5cbiAgJGNoZWNrYm94LW1hcmstY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgYmFja2dyb3VuZCk7XG5cbiAgLy8gTk9URSh0cmF2aXNrYXVmbWFuKTogV2hpbGUgdGhlIHNwZWMgY2FsbHMgZm9yIHRyYW5zbHVjZW50IGJsYWNrcy93aGl0ZXMgZm9yIGRpc2FibGVkIGNvbG9ycyxcbiAgLy8gdGhpcyBkb2VzIG5vdCB3b3JrIHdlbGwgd2l0aCBlbGVtZW50cyBsYXllcmVkIG9uIHRvcCBvZiBvbmUgYW5vdGhlci4gVG8gZ2V0IGFyb3VuZCB0aGlzIHdlXG4gIC8vIGJsZW5kIHRoZSBjb2xvcnMgdG9nZXRoZXIgYmFzZWQgb24gdGhlIGJhc2UgY29sb3IgYW5kIHRoZSB0aGVtZSBiYWNrZ3JvdW5kLlxuICAkd2hpdGUtMzBwY3Qtb3BhY2l0eS1vbi1kYXJrOiAjNjg2ODY4O1xuICAkYmxhY2stMjZwY3Qtb3BhY2l0eS1vbi1saWdodDogI2IwYjBiMDtcbiAgJGRpc2FibGVkLWNvbG9yOiBpZigkaXMtZGFyay10aGVtZSwgJHdoaXRlLTMwcGN0LW9wYWNpdHktb24tZGFyaywgJGJsYWNrLTI2cGN0LW9wYWNpdHktb24tbGlnaHQpO1xuXG4gIC5tYXQtY2hlY2tib3gtZnJhbWUge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWNoZWNrbWFyayB7XG4gICAgZmlsbDogJGNoZWNrYm94LW1hcmstY29sb3I7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWNoZWNrbWFyay1wYXRoIHtcbiAgICAvLyAhaW1wb3J0YW50IGlzIG5lZWRlZCBoZXJlIGJlY2F1c2UgYSBzdHJva2UgbXVzdCBiZSBzZXQgYXMgYW5cbiAgICAvLyBhdHRyaWJ1dGUgb24gdGhlIFNWRyBpbiBvcmRlciBmb3IgbGluZSBhbmltYXRpb24gdG8gd29yayBwcm9wZXJseS5cbiAgICBzdHJva2U6ICRjaGVja2JveC1tYXJrLWNvbG9yICFpbXBvcnRhbnQ7XG5cbiAgICBAaW5jbHVkZSBjZGstaGlnaC1jb250cmFzdChibGFjay1vbi13aGl0ZSkge1xuICAgICAgLy8gSGF2aW5nIHRoZSBvbmUgYWJvdmUgYmUgIWltcG9ydGFudCBlbmRzIHVwIG92ZXJyaWRpbmcgdGhlIGJyb3dzZXIncyBhdXRvbWF0aWNcbiAgICAgIC8vIGNvbG9yIGludmVyc2lvbiBzbyB3ZSBuZWVkIHRvIHJlLWludmVydCBpdCBvdXJzZWx2ZXMgZm9yIGJsYWNrLW9uLXdoaXRlLlxuICAgICAgc3Ryb2tlOiAjMDAwICFpbXBvcnRhbnQ7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jaGVja2JveC1taXhlZG1hcmsge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRjaGVja2JveC1tYXJrLWNvbG9yO1xuICB9XG5cbiAgLm1hdC1jaGVja2JveC1pbmRldGVybWluYXRlLCAubWF0LWNoZWNrYm94LWNoZWNrZWQge1xuICAgICYubWF0LXByaW1hcnkgLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5kIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5tYXQtYWNjZW50IC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG4gICAgfVxuXG4gICAgJi5tYXQtd2FybiAubWF0LWNoZWNrYm94LWJhY2tncm91bmQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWRpc2FibGVkIHtcbiAgICAmLm1hdC1jaGVja2JveC1jaGVja2VkLFxuICAgICYubWF0LWNoZWNrYm94LWluZGV0ZXJtaW5hdGUge1xuICAgICAgLm1hdC1jaGVja2JveC1iYWNrZ3JvdW5kIHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRpc2FibGVkLWNvbG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgICY6bm90KC5tYXQtY2hlY2tib3gtY2hlY2tlZCkge1xuICAgICAgLm1hdC1jaGVja2JveC1mcmFtZSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogJGRpc2FibGVkLWNvbG9yO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYXQtY2hlY2tib3gtbGFiZWwge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICAgIH1cblxuICAgIEBpbmNsdWRlIGNkay1oaWdoLWNvbnRyYXN0IHtcbiAgICAgIG9wYWNpdHk6IDAuNTtcbiAgICB9XG4gIH1cblxuICAvLyBUaGlzIG9uZSBpcyBtb3ZlZCBkb3duIGhlcmUgc28gaXQgY2FuIHRhcmdldCBib3RoXG4gIC8vIHRoZSB0aGVtZSBjb2xvcnMgYW5kIHRoZSBkaXNhYmxlZCBzdGF0ZS5cbiAgQGluY2x1ZGUgY2RrLWhpZ2gtY29udHJhc3Qge1xuICAgIC5tYXQtY2hlY2tib3gtYmFja2dyb3VuZCB7XG4gICAgICAvLyBOZWVkcyB0byBiZSByZW1vdmVkIGJlY2F1c2UgaXQgaGlkZXMgdGhlIGNoZWNrYm94IG91dGxpbmUuXG4gICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgIH1cbiAgfVxuXG4gIC8vIFN3aXRjaCB0aGlzIHRvIGEgc29saWQgY29sb3Igc2luY2Ugd2UncmUgdXNpbmcgYG9wYWNpdHlgXG4gIC8vIHRvIGNvbnRyb2wgaG93IG9wYXF1ZSB0aGUgcmlwcGxlIHNob3VsZCBiZS5cbiAgLm1hdC1jaGVja2JveCAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXBfZ2V0KG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKSwgYmFzZSk7XG4gIH1cblxuICAubWF0LWNoZWNrYm94LWNoZWNrZWQ6bm90KC5tYXQtY2hlY2tib3gtZGlzYWJsZWQpLFxuICAubWF0LWNoZWNrYm94OmFjdGl2ZTpub3QoLm1hdC1jaGVja2JveC1kaXNhYmxlZCkge1xuICAgICYubWF0LXByaW1hcnkgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICAgIH1cblxuICAgICYubWF0LWFjY2VudCAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1jaGVja2JveC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1jaGVja2JveCB7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC8vIFRPRE8oa2FyYSk6IFJlbW92ZSB0aGlzIHN0eWxlIHdoZW4gZml4aW5nIHZlcnRpY2FsIGJhc2VsaW5lXG4gIC5tYXQtY2hlY2tib3gtbGF5b3V0IC5tYXQtY2hlY2tib3gtbGFiZWwge1xuICAgIGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcbiAgfVxufVxuXG5cblxuXG5cblxuJG1hdC1jaGlwLXJlbW92ZS1mb250LXNpemU6IDE4cHg7XG5cbkBtaXhpbiBtYXQtY2hpcHMtY29sb3IoJGZvcmVncm91bmQsICRiYWNrZ3JvdW5kKSB7XG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGZvcmVncm91bmQ7XG5cbiAgLm1hdC1jaGlwLXJlbW92ZSB7XG4gICAgY29sb3I6ICRmb3JlZ3JvdW5kO1xuICAgIG9wYWNpdHk6IDAuNDtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWNoaXBzLXRoZW1lLWNvbG9yKCRwYWxldHRlKSB7XG4gIEBpbmNsdWRlIG1hdC1jaGlwcy1jb2xvcihtYXQtY29sb3IoJHBhbGV0dGUsIGRlZmF1bHQtY29udHJhc3QpLCBtYXQtY29sb3IoJHBhbGV0dGUpKTtcblxuICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHBhbGV0dGUsIGRlZmF1bHQtY29udHJhc3QsIDAuMSk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1jaGlwcy10aGVtZSgkdGhlbWUpIHtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC1nZXQoJHRoZW1lLCBpcy1kYXJrKTtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJHVuc2VsZWN0ZWQtYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCB1bnNlbGVjdGVkLWNoaXApO1xuICAkdW5zZWxlY3RlZC1mb3JlZ3JvdW5kOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuXG4gIC5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcCB7XG4gICAgQGluY2x1ZGUgbWF0LWNoaXBzLWNvbG9yKCR1bnNlbGVjdGVkLWZvcmVncm91bmQsICR1bnNlbGVjdGVkLWJhY2tncm91bmQpO1xuXG4gICAgJjpub3QoLm1hdC1jaGlwLWRpc2FibGVkKSB7XG4gICAgICAmOmFjdGl2ZSB7XG4gICAgICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDMsICR0aGVtZSk7XG4gICAgICB9XG5cbiAgICAgIC5tYXQtY2hpcC1yZW1vdmU6aG92ZXIge1xuICAgICAgICBvcGFjaXR5OiAwLjU0O1xuICAgICAgfVxuICAgIH1cblxuICAgICYubWF0LWNoaXAtZGlzYWJsZWQge1xuICAgICAgb3BhY2l0eTogMC40O1xuICAgIH1cblxuICAgICY6OmFmdGVyIHtcbiAgICAgIGJhY2tncm91bmQ6IG1hcF9nZXQoJGZvcmVncm91bmQsIGJhc2UpO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2hpcC5tYXQtc3RhbmRhcmQtY2hpcC5tYXQtY2hpcC1zZWxlY3RlZCB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBAaW5jbHVkZSBtYXQtY2hpcHMtdGhlbWUtY29sb3IoJHByaW1hcnkpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgQGluY2x1ZGUgbWF0LWNoaXBzLXRoZW1lLWNvbG9yKCR3YXJuKTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgQGluY2x1ZGUgbWF0LWNoaXBzLXRoZW1lLWNvbG9yKCRhY2NlbnQpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWNoaXBzLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWNoaXAge1xuICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICAgIGZvbnQtd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcblxuICAgIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29uLFxuICAgIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24ge1xuICAgICAgZm9udC1zaXplOiAkbWF0LWNoaXAtcmVtb3ZlLWZvbnQtc2l6ZTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXRhYmxlLXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtdGFibGUge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtdGFibGUgdGhlYWQsIC5tYXQtdGFibGUgdGJvZHksIC5tYXQtdGFibGUgdGZvb3QsXG4gIG1hdC1oZWFkZXItcm93LCBtYXQtcm93LCBtYXQtZm9vdGVyLXJvdyxcbiAgW21hdC1oZWFkZXItcm93XSwgW21hdC1yb3ddLCBbbWF0LWZvb3Rlci1yb3ddLFxuICAubWF0LXRhYmxlLXN0aWNreSB7XG4gICAgYmFja2dyb3VuZDogaW5oZXJpdDtcbiAgfVxuXG4gIG1hdC1yb3csIG1hdC1oZWFkZXItcm93LCBtYXQtZm9vdGVyLXJvdyxcbiAgdGgubWF0LWhlYWRlci1jZWxsLCB0ZC5tYXQtY2VsbCwgdGQubWF0LWZvb3Rlci1jZWxsIHtcbiAgICBib3JkZXItYm90dG9tLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1oZWFkZXItY2VsbCB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1jZWxsLCAubWF0LWZvb3Rlci1jZWxsIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXRhYmxlLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXRhYmxlIHtcbiAgICBmb250LWZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcpO1xuICB9XG5cbiAgLm1hdC1oZWFkZXItY2VsbCB7XG4gICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pO1xuICAgIGZvbnQtd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0yKTtcbiAgfVxuXG4gIC5tYXQtY2VsbCwgLm1hdC1mb290ZXItY2VsbCB7XG4gICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuJG1hdC1kYXRlcGlja2VyLXNlbGVjdGVkLXRvZGF5LWJveC1zaGFkb3ctd2lkdGg6IDFweDtcbiRtYXQtZGF0ZXBpY2tlci1zZWxlY3RlZC1mYWRlLWFtb3VudDogMC42O1xuJG1hdC1kYXRlcGlja2VyLXRvZGF5LWZhZGUtYW1vdW50OiAwLjI7XG4kbWF0LWNhbGVuZGFyLWJvZHktZm9udC1zaXplOiAxM3B4ICFkZWZhdWx0O1xuJG1hdC1jYWxlbmRhci13ZWVrZGF5LXRhYmxlLWZvbnQtc2l6ZTogMTFweCAhZGVmYXVsdDtcblxuQG1peGluIF9tYXQtZGF0ZXBpY2tlci1jb2xvcigkcGFsZXR0ZSkge1xuICAubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSk7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSwgZGVmYXVsdC1jb250cmFzdCk7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQgPiAubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQge1xuICAgICRiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJHBhbGV0dGUpO1xuXG4gICAgQGlmICh0eXBlLW9mKCRiYWNrZ3JvdW5kKSA9PSBjb2xvcikge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogZmFkZS1vdXQoJGJhY2tncm91bmQsICRtYXQtZGF0ZXBpY2tlci1zZWxlY3RlZC1mYWRlLWFtb3VudCk7XG4gICAgfVxuICAgIEBlbHNlIHtcbiAgICAgIC8vIElmIHdlIGNvdWxkbid0IHJlc29sdmUgdG8gYmFja2dyb3VuZCB0byBhIGNvbG9yIChlLmcuIGl0J3MgYSBDU1MgdmFyaWFibGUpLFxuICAgICAgLy8gZmFsbCBiYWNrIHRvIGZhZGluZyB0aGUgY29udGVudCBvdXQgdmlhIGBvcGFjaXR5YC5cbiAgICAgIG9wYWNpdHk6ICRtYXQtZGF0ZXBpY2tlci10b2RheS1mYWRlLWFtb3VudDtcbiAgICB9XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktdG9kYXkubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQge1xuICAgIGJveC1zaGFkb3c6IGluc2V0IDAgMCAwICRtYXQtZGF0ZXBpY2tlci1zZWxlY3RlZC10b2RheS1ib3gtc2hhZG93LXdpZHRoXG4gICAgICAgICAgICAgICAgbWF0LWNvbG9yKCRwYWxldHRlLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWRhdGVwaWNrZXItdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG5cbiAgLm1hdC1jYWxlbmRhci1hcnJvdyB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBpY29uKTtcbiAgfVxuXG4gIC8vIFRoZSBwcmV2L25leHQgYnV0dG9ucyBuZWVkIGEgYml0IG1vcmUgc3BlY2lmaWNpdHkgdG9cbiAgLy8gYXZvaWQgYmVpbmcgb3ZlcndyaXR0ZW4gYnkgdGhlIC5tYXQtaWNvbi1idXR0b24uXG4gIC5tYXQtZGF0ZXBpY2tlci10b2dnbGUsXG4gIC5tYXQtZGF0ZXBpY2tlci1jb250ZW50IC5tYXQtY2FsZW5kYXItbmV4dC1idXR0b24sXG4gIC5tYXQtZGF0ZXBpY2tlci1jb250ZW50IC5tYXQtY2FsZW5kYXItcHJldmlvdXMtYnV0dG9uIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBpY29uKTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBoaW50LXRleHQpO1xuICB9XG5cbiAgLm1hdC1jYWxlbmRhci10YWJsZS1oZWFkZXItZGl2aWRlcjo6YWZ0ZXIge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIGJvcmRlci1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQgPiAubWF0LWNhbGVuZGFyLWJvZHktY2VsbC1jb250ZW50Om5vdCgubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQpIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1jZWxsOm5vdCgubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQpOmhvdmVyLFxuICAuY2RrLWtleWJvYXJkLWZvY3VzZWQgLm1hdC1jYWxlbmRhci1ib2R5LWFjdGl2ZSxcbiAgLmNkay1wcm9ncmFtLWZvY3VzZWQgLm1hdC1jYWxlbmRhci1ib2R5LWFjdGl2ZSB7XG4gICAgJiA+IC5tYXQtY2FsZW5kYXItYm9keS1jZWxsLWNvbnRlbnQ6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCkge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3Zlcik7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1jYWxlbmRhci1ib2R5LXRvZGF5Om5vdCgubWF0LWNhbGVuZGFyLWJvZHktc2VsZWN0ZWQpIHtcbiAgICAvLyBOb3RlOiB0aG91Z2ggaXQncyBub3QgdGV4dCwgdGhlIGJvcmRlciBpcyBhIGhpbnQgYWJvdXQgdGhlIGZhY3QgdGhhdCB0aGlzIGlzIHRvZGF5J3MgZGF0ZSxcbiAgICAvLyBzbyB3ZSB1c2UgdGhlIGhpbnQgY29sb3IuXG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGhpbnQtdGV4dCk7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHktZGlzYWJsZWQgPiAubWF0LWNhbGVuZGFyLWJvZHktdG9kYXk6bm90KC5tYXQtY2FsZW5kYXItYm9keS1zZWxlY3RlZCkge1xuICAgICRjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBoaW50LXRleHQpO1xuXG4gICAgQGlmICh0eXBlLW9mKCRjb2xvcikgPT0gY29sb3IpIHtcbiAgICAgIGJvcmRlci1jb2xvcjogZmFkZS1vdXQoJGNvbG9yLCAkbWF0LWRhdGVwaWNrZXItdG9kYXktZmFkZS1hbW91bnQpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICAvLyBJZiB0aGUgY29sb3IgZGlkbid0IHJlc29sdmUgdG8gYSBjb2xvciB2YWx1ZSwgYnV0IHNvbWV0aGluZyBsaWtlIGEgQ1NTIHZhcmlhYmxlLCB3ZSBjYW4ndFxuICAgICAgLy8gZmFkZSBpdCBvdXQgc28gd2UgZmFsbCBiYWNrIHRvIHJlZHVjaW5nIHRoZSBlbGVtZW50IG9wYWNpdHkuIE5vdGUgdGhhdCB3ZSBkb24ndCB1c2UgdGhlXG4gICAgICAvLyAkbWF0LWRhdGVwaWNrZXItdG9kYXktZmFkZS1hbW91bnQsIGJlY2F1c2UgaGludCB0ZXh0IHVzdWFsbHkgaGFzIHNvbWUgb3BhY2l0eSBhcHBsaWVkXG4gICAgICAvLyB0byBpdCBhbHJlYWR5IGFuZCB3ZSBkb24ndCB3YW50IHRoZW0gdG8gc3RhY2sgb24gdG9wIG9mIGVhY2ggb3RoZXIuXG4gICAgICBvcGFjaXR5OiAwLjU7XG4gICAgfVxuICB9XG5cbiAgQGluY2x1ZGUgX21hdC1kYXRlcGlja2VyLWNvbG9yKG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KSk7XG5cbiAgLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDQsICR0aGVtZSk7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcblxuICAgICYubWF0LWFjY2VudCB7XG4gICAgICBAaW5jbHVkZSBfbWF0LWRhdGVwaWNrZXItY29sb3IobWFwLWdldCgkdGhlbWUsIGFjY2VudCkpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgQGluY2x1ZGUgX21hdC1kYXRlcGlja2VyLWNvbG9yKG1hcC1nZXQoJHRoZW1lLCB3YXJuKSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1kYXRlcGlja2VyLWNvbnRlbnQtdG91Y2gge1xuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDAsICR0aGVtZSk7XG4gIH1cblxuICAubWF0LWRhdGVwaWNrZXItdG9nZ2xlLWFjdGl2ZSB7XG4gICAgY29sb3I6IG1hdC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSkpO1xuXG4gICAgJi5tYXQtYWNjZW50IHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IobWFwLWdldCgkdGhlbWUsIGFjY2VudCkpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4ge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcihtYXAtZ2V0KCR0aGVtZSwgd2FybikpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWRhdGVwaWNrZXItdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtY2FsZW5kYXIge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LWNhbGVuZGFyLWJvZHkge1xuICAgIGZvbnQtc2l6ZTogJG1hdC1jYWxlbmRhci1ib2R5LWZvbnQtc2l6ZTtcbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItYm9keS1sYWJlbCxcbiAgLm1hdC1jYWxlbmRhci1wZXJpb2QtYnV0dG9uIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJ1dHRvbik7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBidXR0b24pO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHRoIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiAkbWF0LWNhbGVuZGFyLXdlZWtkYXktdGFibGUtZm9udC1zaXplO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuQG1peGluIG1hdC1kaWFsb2ctdGhlbWUoJHRoZW1lKSB7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1kaWFsb2ctY29udGFpbmVyIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLWVsZXZhdGlvbigyNCwgJHRoZW1lKTtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGRpYWxvZyk7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1kaWFsb2ctdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtZGlhbG9nLXRpdGxlIHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgdGl0bGUpO1xuICB9XG59XG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LWV4cGFuc2lvbi1wYW5lbC10aGVtZSgkdGhlbWUpIHtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LWV4cGFuc2lvbi1wYW5lbCB7XG4gICAgQGluY2x1ZGUgX21hdC10aGVtZS1vdmVycmlkYWJsZS1lbGV2YXRpb24oMiwgJHRoZW1lKTtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1hY3Rpb24tcm93IHtcbiAgICBib3JkZXItdG9wLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWw6bm90KC5tYXQtZXhwYW5kZWQpIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciB7XG4gICAgJjpub3QoW2FyaWEtZGlzYWJsZWQ9J3RydWUnXSkge1xuICAgICAgJi5jZGsta2V5Ym9hcmQtZm9jdXNlZCxcbiAgICAgICYuY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGhvdmVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAvLyBEaXNhYmxlIHRoZSBob3ZlciBvbiB0b3VjaCBkZXZpY2VzIHNpbmNlIGl0IGNhbiBhcHBlYXIgbGlrZSBpdCBpcyBzdHVjay4gV2UgY2FuJ3QgdXNlXG4gIC8vIGBAbWVkaWEgKGhvdmVyKWAgYWJvdmUsIGJlY2F1c2UgdGhlIGRlc2t0b3Agc3VwcG9ydCBicm93c2VyIHN1cHBvcnQgaXNuJ3QgZ3JlYXQuXG4gIEBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcbiAgICAubWF0LWV4cGFuc2lvbi1wYW5lbDpub3QoLm1hdC1leHBhbmRlZCk6bm90KFthcmlhLWRpc2FibGVkPSd0cnVlJ10pXG4gICAgICAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXI6aG92ZXIge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXItdGl0bGUge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLWRlc2NyaXB0aW9uLFxuICAubWF0LWV4cGFuc2lvbi1pbmRpY2F0b3I6OmFmdGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LWV4cGFuc2lvbi1wYW5lbC1oZWFkZXJbYXJpYS1kaXNhYmxlZD0ndHJ1ZSddIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC1idXR0b24pO1xuXG4gICAgLm1hdC1leHBhbnNpb24tcGFuZWwtaGVhZGVyLXRpdGxlLFxuICAgIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlci1kZXNjcmlwdGlvbiB7XG4gICAgICBjb2xvcjogaW5oZXJpdDtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1leHBhbnNpb24tcGFuZWwtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciB7XG4gICAgZm9udDoge1xuICAgICAgZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgc3ViaGVhZGluZy0xKTtcbiAgICAgIHNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgc3ViaGVhZGluZy0xKTtcbiAgICAgIHdlaWdodDogbWF0LWZvbnQtd2VpZ2h0KCRjb25maWcsIHN1YmhlYWRpbmctMSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1leHBhbnNpb24tcGFuZWwtY29udGVudCB7XG4gICAgQGluY2x1ZGUgbWF0LXR5cG9ncmFwaHktbGV2ZWwtdG8tc3R5bGVzKCRjb25maWcsIGJvZHktMSk7XG4gIH1cbn1cblxuXG5cblxuLy8gVGhpcyBtaXhpbiB3aWxsIGVuc3VyZSB0aGF0IGxpbmVzIHRoYXQgb3ZlcmZsb3cgdGhlIGNvbnRhaW5lciB3aWxsIGhpZGUgdGhlIG92ZXJmbG93IGFuZFxuLy8gdHJ1bmNhdGUgbmVhdGx5IHdpdGggYW4gZWxsaXBzaXMuXG5AbWl4aW4gbWF0LXRydW5jYXRlLWxpbmUoKSB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4vLyBNaXhpbiB0byBwcm92aWRlIGFsbCBtYXQtbGluZSBzdHlsZXMsIGNoYW5naW5nIHNlY29uZGFyeSBmb250IHNpemUgYmFzZWQgb24gd2hldGhlciB0aGUgbGlzdFxuLy8gaXMgaW4gZGVuc2UgbW9kZS5cbkBtaXhpbiBtYXQtbGluZS1iYXNlKCRzZWNvbmRhcnktZm9udC1zaXplKSB7XG4gIC5tYXQtbGluZSB7XG4gICAgQGluY2x1ZGUgbWF0LXRydW5jYXRlLWxpbmUoKTtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuXG4gICAgLy8gYWxsIGxpbmVzIGJ1dCB0aGUgdG9wIGxpbmUgc2hvdWxkIGhhdmUgc21hbGxlciB0ZXh0XG4gICAgJjpudGgtY2hpbGQobisyKSB7XG4gICAgICBmb250LXNpemU6ICRzZWNvbmRhcnktZm9udC1zaXplO1xuICAgIH1cbiAgfVxufVxuXG4vLyBUaGlzIG1peGluIG5vcm1hbGl6ZXMgZGVmYXVsdCBlbGVtZW50IHN0eWxlcywgZS5nLiBmb250IHdlaWdodCBmb3IgaGVhZGluZyB0ZXh0LlxuQG1peGluIG1hdC1ub3JtYWxpemUtdGV4dCgpIHtcbiAgJiA+ICoge1xuICAgIG1hcmdpbjogMDtcbiAgICBwYWRkaW5nOiAwO1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgZm9udC1zaXplOiBpbmhlcml0O1xuICB9XG59XG5cbi8vIFRoaXMgbWl4aW4gcHJvdmlkZXMgYmFzZSBzdHlsZXMgZm9yIHRoZSB3cmFwcGVyIGFyb3VuZCBtYXQtbGluZSBlbGVtZW50cyBpbiBhIGxpc3QuXG5AbWl4aW4gbWF0LWxpbmUtd3JhcHBlci1iYXNlKCkge1xuICBAaW5jbHVkZSBtYXQtbm9ybWFsaXplLXRleHQoKTtcblxuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB3aWR0aDogMTAwJTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcblxuICAvLyBNdXN0IHJlbW92ZSB3cmFwcGVyIHdoZW4gbGluZXMgYXJlIGVtcHR5IG9yIGl0IHRha2VzIHVwIGhvcml6b250YWxcbiAgLy8gc3BhY2UgYW5kIHB1c2hlcyBvdGhlciBlbGVtZW50cyB0byB0aGUgcmlnaHQuXG4gICY6ZW1wdHkge1xuICAgIGRpc3BsYXk6IG5vbmU7XG4gIH1cbn1cblxuXG5cbi8vIEluY2x1ZGUgdGhpcyBlbXB0eSBtaXhpbiBmb3IgY29uc2lzdGVuY3kgd2l0aCB0aGUgb3RoZXIgY29tcG9uZW50cy5cbkBtaXhpbiBtYXQtZ3JpZC1saXN0LXRoZW1lKCR0aGVtZSkgeyB9XG5cbkBtaXhpbiBtYXQtZ3JpZC1saXN0LXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LWdyaWQtdGlsZS1oZWFkZXIsXG4gIC5tYXQtZ3JpZC10aWxlLWZvb3RlciB7XG4gICAgQGluY2x1ZGUgbWF0LWxpbmUtYmFzZShtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pKTtcbiAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5cblxuXG4vLyBJbmNsdWRlIHRoaXMgZW1wdHkgbWl4aW4gZm9yIGNvbnNpc3RlbmN5IHdpdGggdGhlIG90aGVyIGNvbXBvbmVudHMuXG5AbWl4aW4gbWF0LWljb24tdGhlbWUoJHRoZW1lKSB7XG4gICRwcmltYXJ5OiBtYXAtZ2V0KCR0aGVtZSwgcHJpbWFyeSk7XG4gICRhY2NlbnQ6IG1hcC1nZXQoJHRoZW1lLCBhY2NlbnQpO1xuICAkd2FybjogbWFwLWdldCgkdGhlbWUsIHdhcm4pO1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtaWNvbiB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWljb24tdHlwb2dyYXBoeSgkY29uZmlnKSB7IH1cblxuXG5cblxuXG4vLyBSZW5kZXJzIGEgZ3JhZGllbnQgZm9yIHNob3dpbmcgdGhlIGRhc2hlZCBsaW5lIHdoZW4gdGhlIGlucHV0IGlzIGRpc2FibGVkLlxuLy8gVW5saWtlIHVzaW5nIGEgYm9yZGVyLCBhIGdyYWRpZW50IGFsbG93cyB1cyB0byBhZGp1c3QgdGhlIHNwYWNpbmcgb2YgdGhlIGRvdHRlZCBsaW5lXG4vLyB0byBtYXRjaCB0aGUgTWF0ZXJpYWwgRGVzaWduIHNwZWMuXG5AbWl4aW4gbWF0LWNvbnRyb2wtZGlzYWJsZWQtdW5kZXJsaW5lKCRjb2xvcikge1xuICBiYWNrZ3JvdW5kLWltYWdlOiBsaW5lYXItZ3JhZGllbnQodG8gcmlnaHQsICRjb2xvciAwJSwgJGNvbG9yIDMzJSwgdHJhbnNwYXJlbnQgMCUpO1xuICBiYWNrZ3JvdW5kLXNpemU6IDRweCAxMDAlO1xuICBiYWNrZ3JvdW5kLXJlcGVhdDogcmVwZWF0LXg7XG59XG5cbi8vIEZpZ3VyZXMgb3V0IHRoZSBjb2xvciBvZiB0aGUgcGxhY2Vob2xkZXIgZm9yIGEgZm9ybSBjb250cm9sLlxuLy8gVXNlZCBwcmltYXJpbHkgdG8gcHJldmVudCB0aGUgdmFyaW91cyBmb3JtIGNvbnRyb2xzIGZyb21cbi8vIGJlY29taW5nIG91dCBvZiBzeW5jIHNpbmNlIHRoZXNlIGNvbG9ycyBhcmVuJ3QgaW4gYSBwYWxldHRlLlxuQGZ1bmN0aW9uIF9tYXQtY29udHJvbC1wbGFjZWhvbGRlci1jb2xvcigkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC1nZXQoJHRoZW1lLCBpcy1kYXJrKTtcbiAgQHJldHVybiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0LCBpZigkaXMtZGFyay10aGVtZSwgMC41LCAwLjQyKSk7XG59XG5cblxuLyogc3R5bGVsaW50LWRpc2FibGUgbWF0ZXJpYWwvbm8tcHJlZml4ZXMgKi9cbkBtaXhpbiB1c2VyLXNlbGVjdCgkdmFsdWUpIHtcbiAgLXdlYmtpdC11c2VyLXNlbGVjdDogJHZhbHVlO1xuICAtbW96LXVzZXItc2VsZWN0OiAkdmFsdWU7XG4gIC1tcy11c2VyLXNlbGVjdDogJHZhbHVlO1xuICB1c2VyLXNlbGVjdDogJHZhbHVlO1xufVxuXG5AbWl4aW4gaW5wdXQtcGxhY2Vob2xkZXIge1xuICAmOjpwbGFjZWhvbGRlciB7XG4gICAgQGNvbnRlbnQ7XG4gIH1cblxuICAmOjotbW96LXBsYWNlaG9sZGVyIHtcbiAgICBAY29udGVudDtcbiAgfVxuXG4gICY6Oi13ZWJraXQtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIEBjb250ZW50O1xuICB9XG5cbiAgJjotbXMtaW5wdXQtcGxhY2Vob2xkZXIge1xuICAgIEBjb250ZW50O1xuICB9XG59XG5cbkBtaXhpbiBjdXJzb3ItZ3JhYiB7XG4gIGN1cnNvcjogLXdlYmtpdC1ncmFiO1xuICBjdXJzb3I6IGdyYWI7XG59XG5cbkBtaXhpbiBjdXJzb3ItZ3JhYmJpbmcge1xuICBjdXJzb3I6IC13ZWJraXQtZ3JhYmJpbmc7XG4gIGN1cnNvcjogZ3JhYmJpbmc7XG59XG5cbkBtaXhpbiBiYWNrZmFjZS12aXNpYmlsaXR5KCR2YWx1ZSkge1xuICAtd2Via2l0LWJhY2tmYWNlLXZpc2liaWxpdHk6ICR2YWx1ZTtcbiAgYmFja2ZhY2UtdmlzaWJpbGl0eTogJHZhbHVlO1xufVxuLyogc3R5bGVsaW50LWVuYWJsZSAqL1xuXG5cblxuQG1peGluIG1hdC1pbnB1dC10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXR5cGUtbWF0LW5hdGl2ZS1zZWxlY3QgLm1hdC1mb3JtLWZpZWxkLWluZml4OjphZnRlciB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuICB9XG5cbiAgLm1hdC1pbnB1dC1lbGVtZW50OmRpc2FibGVkLFxuICAubWF0LWZvcm0tZmllbGQtdHlwZS1tYXQtbmF0aXZlLXNlbGVjdC5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtaW5wdXQtZWxlbWVudCB7XG4gICAgY2FyZXQtY29sb3I6IG1hdC1jb2xvcigkcHJpbWFyeSk7XG5cbiAgICBAaW5jbHVkZSBpbnB1dC1wbGFjZWhvbGRlciB7XG4gICAgICBjb2xvcjogX21hdC1jb250cm9sLXBsYWNlaG9sZGVyLWNvbG9yKCR0aGVtZSk7XG4gICAgfVxuXG4gICAgLy8gT24gZGFyayB0aGVtZXMgd2Ugc2V0IHRoZSBuYXRpdmUgYHNlbGVjdGAgY29sb3IgdG8gc29tZSBzaGFkZSBvZiB3aGl0ZSxcbiAgICAvLyBob3dldmVyIHRoZSBjb2xvciBwcm9wYWdhdGVzIHRvIGFsbCBvZiB0aGUgYG9wdGlvbmAgZWxlbWVudHMsIHdoaWNoIGFyZVxuICAgIC8vIGFsd2F5cyBvbiBhIHdoaXRlIGJhY2tncm91bmQgaW5zaWRlIHRoZSBkcm9wZG93biwgY2F1c2luZyB0aGVtIHRvIGJsZW5kIGluLlxuICAgIC8vIFNpbmNlIHdlIGNhbid0IGNoYW5nZSBiYWNrZ3JvdW5kIG9mIHRoZSBkcm9wZG93biwgd2UgbmVlZCB0byBleHBsaWNpdGx5XG4gICAgLy8gcmVzZXQgdGhlIGNvbG9yIG9mIHRoZSBvcHRpb25zIHRvIHNvbWV0aGluZyBkYXJrLlxuICAgIEBpZiAobWFwLWdldCgkdGhlbWUsIGlzLWRhcmspKSB7XG4gICAgICBvcHRpb24ge1xuICAgICAgICBjb2xvcjogJGRhcmstcHJpbWFyeS10ZXh0O1xuICAgICAgfVxuXG4gICAgICBvcHRpb246ZGlzYWJsZWQge1xuICAgICAgICBjb2xvcjogJGRhcmstZGlzYWJsZWQtdGV4dDtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LWFjY2VudCAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG4gIH1cblxuICAubWF0LXdhcm4gLm1hdC1pbnB1dC1lbGVtZW50LFxuICAubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXR5cGUtbWF0LW5hdGl2ZS1zZWxlY3QubWF0LWZvcm0tZmllbGQtaW52YWxpZCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LWlucHV0LXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCBpbnB1dCk7XG5cbiAgLy8gVGhlIGFtb3VudCBvZiBzcGFjZSBiZXR3ZWVuIHRoZSB0b3Agb2YgdGhlIGxpbmUgYW5kIHRoZSB0b3Agb2YgdGhlIGFjdHVhbCB0ZXh0XG4gIC8vIChhcyBhIGZyYWN0aW9uIG9mIHRoZSBmb250LXNpemUpLlxuICAkbGluZS1zcGFjaW5nOiAoJGxpbmUtaGVpZ2h0IC0gMSkgLyAyO1xuXG4gIC8vIDxpbnB1dD4gZWxlbWVudHMgc2VlbSB0byBoYXZlIHRoZWlyIGhlaWdodCBzZXQgc2xpZ2h0bHkgdG9vIGxhcmdlIG9uIFNhZmFyaSBjYXVzaW5nIHRoZSB0ZXh0IHRvXG4gIC8vIGJlIG1pc2FsaWduZWQgdy5yLnQuIHRoZSBwbGFjZWhvbGRlci4gQWRkaW5nIHRoaXMgbWFyZ2luIGNvcnJlY3RzIGl0LlxuICBpbnB1dC5tYXQtaW5wdXQtZWxlbWVudCB7XG4gICAgbWFyZ2luLXRvcDogLSRsaW5lLXNwYWNpbmcgKiAxZW07XG4gIH1cbn1cblxuXG5cblxuXG5cblxuQG1peGluIG1hdC1saXN0LXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtbGlzdC1iYXNlIHtcbiAgICAubWF0LWxpc3QtaXRlbSB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIH1cblxuICAgIC5tYXQtc3ViaGVhZGVyIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgICB9XG4gIH1cblxuICAubWF0LWxpc3QtaXRlbS1kaXNhYmxlZCB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBkaXNhYmxlZC1saXN0LW9wdGlvbik7XG4gIH1cblxuICAubWF0LWxpc3Qtb3B0aW9uLFxuICAubWF0LW5hdi1saXN0IC5tYXQtbGlzdC1pdGVtLFxuICAubWF0LWFjdGlvbi1saXN0IC5tYXQtbGlzdC1pdGVtIHtcbiAgICAmOmhvdmVyLCAmOmZvY3VzIHtcbiAgICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgJ2hvdmVyJyk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtYXQtbGlzdC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgJGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG5cbiAgLm1hdC1saXN0LWl0ZW0ge1xuICAgIGZvbnQtZmFtaWx5OiAkZm9udC1mYW1pbHk7XG4gIH1cblxuICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xuICB9XG5cbiAgLy8gRGVmYXVsdCBsaXN0XG4gIC5tYXQtbGlzdC1iYXNlIHtcbiAgICAubWF0LWxpc3QtaXRlbSB7XG4gICAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgc3ViaGVhZGluZy0yKTtcbiAgICAgIEBpbmNsdWRlIG1hdC1saW5lLWJhc2UobWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpKTtcbiAgICB9XG5cbiAgICAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBzdWJoZWFkaW5nLTIpO1xuICAgICAgQGluY2x1ZGUgbWF0LWxpbmUtYmFzZShtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSkpO1xuICAgIH1cblxuICAgIC5tYXQtc3ViaGVhZGVyIHtcbiAgICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZywgYm9keS0yKTtcbiAgICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICAgICAgZm9udC13ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH1cbiAgfVxuXG4gIC8vIERlbnNlIGxpc3RcbiAgLm1hdC1saXN0LWJhc2VbZGVuc2VdIHtcbiAgICAubWF0LWxpc3QtaXRlbSB7XG4gICAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICBAaW5jbHVkZSBtYXQtbGluZS1iYXNlKG1hdC1mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbikpO1xuICAgIH1cblxuICAgIC5tYXQtbGlzdC1vcHRpb24ge1xuICAgICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pO1xuICAgICAgQGluY2x1ZGUgbWF0LWxpbmUtYmFzZShtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pKTtcbiAgICB9XG5cbiAgICAubWF0LXN1YmhlYWRlciB7XG4gICAgICBmb250LWZhbWlseTogJGZvbnQtZmFtaWx5O1xuICAgICAgZm9udC1zaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGNhcHRpb24pO1xuICAgICAgZm9udC13ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LW1lbnUtdGhlbWUoJHRoZW1lKSB7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1tZW51LXBhbmVsIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbig0LCAkdGhlbWUpO1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgJ2NhcmQnKTtcbiAgfVxuXG4gIC5tYXQtbWVudS1pdGVtIHtcbiAgICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAndGV4dCcpO1xuXG4gICAgJltkaXNhYmxlZF0ge1xuICAgICAgJiwgJjo6YWZ0ZXIge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAnZGlzYWJsZWQnKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LW1lbnUtaXRlbSAubWF0LWljb24tbm8tY29sb3IsXG4gIC5tYXQtbWVudS1pdGVtLXN1Ym1lbnUtdHJpZ2dlcjo6YWZ0ZXIge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsICdpY29uJyk7XG4gIH1cblxuICAubWF0LW1lbnUtaXRlbTpob3ZlcixcbiAgLm1hdC1tZW51LWl0ZW0uY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgLm1hdC1tZW51LWl0ZW0uY2RrLWtleWJvYXJkLWZvY3VzZWQsXG4gIC5tYXQtbWVudS1pdGVtLWhpZ2hsaWdodGVkIHtcbiAgICAmOm5vdChbZGlzYWJsZWRdKSB7XG4gICAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdob3ZlcicpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LW1lbnUtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtbWVudS1pdGVtIHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnLCBib2R5LTEpO1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTEpO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBtYXQtcGFnaW5hdG9yLXRoZW1lKCR0aGVtZSkge1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuXG4gIC5tYXQtcGFnaW5hdG9yIHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdjYXJkJyk7XG4gIH1cblxuICAubWF0LXBhZ2luYXRvcixcbiAgLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXIge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtcGFnaW5hdG9yLWRlY3JlbWVudCxcbiAgLm1hdC1wYWdpbmF0b3ItaW5jcmVtZW50IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAnaWNvbicpO1xuICAgIGJvcmRlci1yaWdodDogMnB4IHNvbGlkIG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgJ2ljb24nKTtcbiAgfVxuXG4gIC5tYXQtcGFnaW5hdG9yLWZpcnN0LFxuICAubWF0LXBhZ2luYXRvci1sYXN0IHtcbiAgICBib3JkZXItdG9wOiAycHggc29saWQgbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCAnaWNvbicpO1xuICB9XG5cbiAgLm1hdC1pY29uLWJ1dHRvbltkaXNhYmxlZF0ge1xuICAgIC5tYXQtcGFnaW5hdG9yLWRlY3JlbWVudCxcbiAgICAubWF0LXBhZ2luYXRvci1pbmNyZW1lbnQsXG4gICAgLm1hdC1wYWdpbmF0b3ItZmlyc3QsXG4gICAgLm1hdC1wYWdpbmF0b3ItbGFzdCB7XG4gICAgICBib3JkZXItY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgJ2Rpc2FibGVkJyk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtYXQtcGFnaW5hdG9yLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXBhZ2luYXRvcixcbiAgLm1hdC1wYWdpbmF0b3ItcGFnZS1zaXplIC5tYXQtc2VsZWN0LXRyaWdnZXIge1xuICAgIGZvbnQ6IHtcbiAgICAgIGZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcsIGNhcHRpb24pO1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBjYXB0aW9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXByb2dyZXNzLWJhci10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXItYmFja2dyb3VuZCB7XG4gICAgZmlsbDogbWF0LWNvbG9yKCRwcmltYXJ5LCBsaWdodGVyKTtcbiAgfVxuXG4gIC5tYXQtcHJvZ3Jlc3MtYmFyLWJ1ZmZlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5LCBsaWdodGVyKTtcbiAgfVxuXG4gIC5tYXQtcHJvZ3Jlc3MtYmFyLWZpbGw6OmFmdGVyIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICB9XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXIubWF0LWFjY2VudCB7XG4gICAgLm1hdC1wcm9ncmVzcy1iYXItYmFja2dyb3VuZCB7XG4gICAgICBmaWxsOiBtYXQtY29sb3IoJGFjY2VudCwgbGlnaHRlcik7XG4gICAgfVxuXG4gICAgLm1hdC1wcm9ncmVzcy1iYXItYnVmZmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYWNjZW50LCBsaWdodGVyKTtcbiAgICB9XG5cbiAgICAubWF0LXByb2dyZXNzLWJhci1maWxsOjphZnRlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1wcm9ncmVzcy1iYXIubWF0LXdhcm4ge1xuICAgIC5tYXQtcHJvZ3Jlc3MtYmFyLWJhY2tncm91bmQge1xuICAgICAgZmlsbDogbWF0LWNvbG9yKCR3YXJuLCBsaWdodGVyKTtcbiAgICB9XG5cbiAgICAubWF0LXByb2dyZXNzLWJhci1idWZmZXIge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCR3YXJuLCBsaWdodGVyKTtcbiAgICB9XG5cbiAgICAubWF0LXByb2dyZXNzLWJhci1maWxsOjphZnRlciB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LXByb2dyZXNzLWJhci10eXBvZ3JhcGh5KCRjb25maWcpIHsgfVxuXG5cblxuXG5cblxuQG1peGluIG1hdC1wcm9ncmVzcy1zcGlubmVyLXRoZW1lKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcblxuICAubWF0LXByb2dyZXNzLXNwaW5uZXIsIC5tYXQtc3Bpbm5lciB7XG4gICAgY2lyY2xlIHtcbiAgICAgIHN0cm9rZTogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQgY2lyY2xlIHtcbiAgICAgIHN0cm9rZTogbWF0LWNvbG9yKCRhY2NlbnQpO1xuICAgIH1cblxuICAgICYubWF0LXdhcm4gY2lyY2xlIHtcbiAgICAgIHN0cm9rZTogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1wcm9ncmVzcy1zcGlubmVyLXR5cG9ncmFwaHkoJGNvbmZpZykgeyB9XG5cblxuXG5cblxuQG1peGluIF9tYXQtcmFkaW8tY29sb3IoJHBhbGV0dGUpIHtcbiAgJi5tYXQtcmFkaW8tY2hlY2tlZCAubWF0LXJhZGlvLW91dGVyLWNpcmNsZSB7XG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJHBhbGV0dGUpO1xuICB9XG5cbiAgLm1hdC1yYWRpby1pbm5lci1jaXJjbGUsXG4gIC5tYXQtcmFkaW8tcmlwcGxlIC5tYXQtcmlwcGxlLWVsZW1lbnQ6bm90KC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUpLFxuICAmLm1hdC1yYWRpby1jaGVja2VkIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUsXG4gICY6YWN0aXZlIC5tYXQtcmFkaW8tcGVyc2lzdGVudC1yaXBwbGUge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSk7XG4gIH1cbn1cblxuQG1peGluIG1hdC1yYWRpby10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1yYWRpby1vdXRlci1jaXJjbGUge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LXJhZGlvLWJ1dHRvbiB7XG4gICAgJi5tYXQtcHJpbWFyeSB7XG4gICAgICBAaW5jbHVkZSBfbWF0LXJhZGlvLWNvbG9yKCRwcmltYXJ5KTtcbiAgICB9XG5cbiAgICAmLm1hdC1hY2NlbnQge1xuICAgICAgQGluY2x1ZGUgX21hdC1yYWRpby1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtcmFkaW8tY29sb3IoJHdhcm4pO1xuICAgIH1cblxuICAgIC8vIFRoaXMgbmVlZHMgZXh0cmEgc3BlY2lmaWNpdHksIGJlY2F1c2UgdGhlIGNsYXNzZXMgYWJvdmUgYXJlIGNvbWJpbmVkXG4gICAgLy8gKGUuZy4gYC5tYXQtcmFkaW8tYnV0dG9uLm1hdC1hY2NlbnRgKSB3aGljaCBpbmNyZWFzZXMgdGhlaXIgc3BlY2lmaWNpdHkgYSBsb3QuXG4gICAgLy8gVE9ETzogY29uc2lkZXIgbWFraW5nIHRoZSBzZWxlY3RvcnMgaW50byBkZXNjZW5kYW50cyAoYC5tYXQtcHJpbWFyeSAubWF0LXJhZGlvLWJ1dHRvbmApLlxuICAgICYubWF0LXJhZGlvLWRpc2FibGVkIHtcbiAgICAgICYubWF0LXJhZGlvLWNoZWNrZWQgLm1hdC1yYWRpby1vdXRlci1jaXJjbGUsXG4gICAgICAubWF0LXJhZGlvLW91dGVyLWNpcmNsZSB7XG4gICAgICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZCk7XG4gICAgICB9XG5cbiAgICAgIC5tYXQtcmFkaW8tcmlwcGxlIC5tYXQtcmlwcGxlLWVsZW1lbnQsXG4gICAgICAubWF0LXJhZGlvLWlubmVyLWNpcmNsZSB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQpO1xuICAgICAgfVxuXG4gICAgICAubWF0LXJhZGlvLWxhYmVsLWNvbnRlbnQge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gU3dpdGNoIHRoaXMgdG8gYSBzb2xpZCBjb2xvciBzaW5jZSB3ZSdyZSB1c2luZyBgb3BhY2l0eWBcbiAgICAvLyB0byBjb250cm9sIGhvdyBvcGFxdWUgdGhlIHJpcHBsZSBzaG91bGQgYmUuXG4gICAgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXBfZ2V0KCRmb3JlZ3JvdW5kLCBiYXNlKTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1yYWRpby10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1yYWRpby1idXR0b24ge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LXNlbGVjdC10aGVtZSgkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG5cbiAgLm1hdC1zZWxlY3QtdmFsdWUge1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC1zZWxlY3QtcGxhY2Vob2xkZXIge1xuICAgIGNvbG9yOiBfbWF0LWNvbnRyb2wtcGxhY2Vob2xkZXItY29sb3IoJHRoZW1lKTtcbiAgfVxuXG4gIC5tYXQtc2VsZWN0LWRpc2FibGVkIC5tYXQtc2VsZWN0LXZhbHVlIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXNhYmxlZC10ZXh0KTtcbiAgfVxuXG4gIC5tYXQtc2VsZWN0LWFycm93IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gIH1cblxuICAubWF0LXNlbGVjdC1wYW5lbCB7XG4gICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBjYXJkKTtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLW92ZXJyaWRhYmxlLWVsZXZhdGlvbig0LCAkdGhlbWUpO1xuXG4gICAgLm1hdC1vcHRpb24ubWF0LXNlbGVjdGVkOm5vdCgubWF0LW9wdGlvbi1tdWx0aXBsZSkge1xuICAgICAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBob3ZlciwgMC4xMik7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkIHtcbiAgICAmLm1hdC1mb2N1c2VkIHtcbiAgICAgICYubWF0LXByaW1hcnkgLm1hdC1zZWxlY3QtYXJyb3cge1xuICAgICAgICBjb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgICAgIH1cblxuICAgICAgJi5tYXQtYWNjZW50IC5tYXQtc2VsZWN0LWFycm93IHtcbiAgICAgICAgY29sb3I6IG1hdC1jb2xvcigkYWNjZW50KTtcbiAgICAgIH1cblxuICAgICAgJi5tYXQtd2FybiAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgICAgIGNvbG9yOiBtYXQtY29sb3IoJHdhcm4pO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYXQtc2VsZWN0Lm1hdC1zZWxlY3QtaW52YWxpZCAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG5cbiAgICAubWF0LXNlbGVjdC5tYXQtc2VsZWN0LWRpc2FibGVkIC5tYXQtc2VsZWN0LWFycm93IHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LXNlbGVjdC10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLy8gVGhlIHVuaXQtbGVzcyBsaW5lLWhlaWdodCBmcm9tIHRoZSBmb250IGNvbmZpZy5cbiAgJGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuXG4gIC5tYXQtc2VsZWN0IHtcbiAgICBmb250LWZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcpO1xuICB9XG5cbiAgLm1hdC1zZWxlY3QtdHJpZ2dlciB7XG4gICAgaGVpZ2h0OiAkbGluZS1oZWlnaHQgKiAxZW07XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBtYXQtc2lkZW5hdi10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJGRyYXdlci1iYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGRpYWxvZyk7XG4gICRkcmF3ZXItY29udGFpbmVyLWJhY2tncm91bmQtY29sb3I6ICBtYXQtY29sb3IoJGJhY2tncm91bmQsIGJhY2tncm91bmQpO1xuICAkZHJhd2VyLXB1c2gtYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBkaWFsb2cpO1xuICAkZHJhd2VyLXNpZGUtYm9yZGVyOiBzb2xpZCAxcHggbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcblxuICAubWF0LWRyYXdlci1jb250YWluZXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6ICRkcmF3ZXItY29udGFpbmVyLWJhY2tncm91bmQtY29sb3I7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG4gIH1cblxuICAubWF0LWRyYXdlciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGRyYXdlci1iYWNrZ3JvdW5kLWNvbG9yO1xuICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuXG4gICAgJi5tYXQtZHJhd2VyLXB1c2gge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGRyYXdlci1wdXNoLWJhY2tncm91bmQtY29sb3I7XG4gICAgfVxuXG4gICAgJjpub3QoLm1hdC1kcmF3ZXItc2lkZSkge1xuICAgICAgLy8gVGhlIGVsZXZhdGlvbiBvZiB6LTE2IGlzIG5vdGVkIGluIHRoZSBkZXNpZ24gc3BlY2lmaWNhdGlvbnMuXG4gICAgICAvLyBTZWUgaHR0cHM6Ly9tYXRlcmlhbC5pby9kZXNpZ24vY29tcG9uZW50cy9uYXZpZ2F0aW9uLWRyYXdlci5odG1sXG4gICAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLWVsZXZhdGlvbigxNiwgJHRoZW1lKTtcbiAgICB9XG4gIH1cblxuICAubWF0LWRyYXdlci1zaWRlIHtcbiAgICBib3JkZXItcmlnaHQ6ICRkcmF3ZXItc2lkZS1ib3JkZXI7XG5cbiAgICAmLm1hdC1kcmF3ZXItZW5kIHtcbiAgICAgIGJvcmRlci1sZWZ0OiAkZHJhd2VyLXNpZGUtYm9yZGVyO1xuICAgICAgYm9yZGVyLXJpZ2h0OiBub25lO1xuICAgIH1cbiAgfVxuXG4gIFtkaXI9J3J0bCddIC5tYXQtZHJhd2VyLXNpZGUge1xuICAgIGJvcmRlci1sZWZ0OiAkZHJhd2VyLXNpZGUtYm9yZGVyO1xuICAgIGJvcmRlci1yaWdodDogbm9uZTtcblxuICAgICYubWF0LWRyYXdlci1lbmQge1xuICAgICAgYm9yZGVyLWxlZnQ6IG5vbmU7XG4gICAgICBib3JkZXItcmlnaHQ6ICRkcmF3ZXItc2lkZS1ib3JkZXI7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1kcmF3ZXItYmFja2Ryb3AubWF0LWRyYXdlci1zaG93biB7XG4gICAgJG9wYWNpdHk6IDAuNjtcbiAgICAkYmFja2Ryb3AtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgY2FyZCwgJG9wYWNpdHkpO1xuXG4gICAgQGlmICh0eXBlLW9mKCRiYWNrZHJvcC1jb2xvcikgPT0gY29sb3IpIHtcbiAgICAgIC8vIFdlIHVzZSBpbnZlcnQoKSBoZXJlIHRvIGhhdmUgdGhlIGRhcmtlbiB0aGUgYmFja2dyb3VuZCBjb2xvciBleHBlY3RlZCB0byBiZSB1c2VkLiBJZiB0aGVcbiAgICAgIC8vIGJhY2tncm91bmQgaXMgbGlnaHQsIHdlIHVzZSBhIGRhcmsgYmFja2Ryb3AuIElmIHRoZSBiYWNrZ3JvdW5kIGlzIGRhcmssXG4gICAgICAvLyB3ZSB1c2UgYSBsaWdodCBiYWNrZHJvcC5cbiAgICAgIGJhY2tncm91bmQtY29sb3I6IGludmVydCgkYmFja2Ryb3AtY29sb3IpO1xuICAgIH1cbiAgICBAZWxzZSB7XG4gICAgICAvLyBJZiB3ZSBjb3VsZG4ndCByZXNvbHZlIHRoZSBiYWNrZHJvcCBjb2xvciB0byBhIGNvbG9yIHZhbHVlLCBmYWxsIGJhY2sgdG8gdXNpbmdcbiAgICAgIC8vIGBvcGFjaXR5YCB0byBtYWtlIGl0IG9wYXF1ZSBzaW5jZSBpdHMgZW5kIHZhbHVlIGNvdWxkIGJlIGEgc29saWQgY29sb3IuXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkYmFja2Ryb3AtY29sb3I7XG4gICAgICBvcGFjaXR5OiAkb3BhY2l0eTtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1zaWRlbmF2LXR5cG9ncmFwaHkoJGNvbmZpZykgeyB9XG5cblxuXG5cblxuXG5AbWl4aW4gX21hdC1zbGlkZS10b2dnbGUtY2hlY2tlZCgkcGFsZXR0ZSwgJHRodW1iLWNoZWNrZWQtaHVlKSB7XG4gICYubWF0LWNoZWNrZWQge1xuICAgIC5tYXQtc2xpZGUtdG9nZ2xlLXRodW1iIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSwgJHRodW1iLWNoZWNrZWQtaHVlKTtcbiAgICB9XG5cbiAgICAubWF0LXNsaWRlLXRvZ2dsZS1iYXIge1xuICAgICAgLy8gT3BhY2l0eSBpcyBkZXRlcm1pbmVkIGZyb20gdGhlIHNwZWNzIGZvciB0aGUgc2VsZWN0aW9uIGNvbnRyb2xzLlxuICAgICAgLy8gU2VlOiBodHRwczovL21hdGVyaWFsLmlvL2Rlc2lnbi9jb21wb25lbnRzL3NlbGVjdGlvbi1jb250cm9scy5odG1sI3NwZWNzXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHBhbGV0dGUsICR0aHVtYi1jaGVja2VkLWh1ZSwgMC41NCk7XG4gICAgfVxuXG4gICAgLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gICAgICAvLyBTZXQgbm8gb3BhY2l0eSBmb3IgdGhlIHJpcHBsZXMgYmVjYXVzZSB0aGUgcmlwcGxlIG9wYWNpdHkgd2lsbCBiZSBhZGp1c3RlZCBkeW5hbWljYWxseVxuICAgICAgLy8gYmFzZWQgb24gdGhlIHR5cGUgb2YgaW50ZXJhY3Rpb24gd2l0aCB0aGUgc2xpZGUtdG9nZ2xlIChlLmcuIGZvciBob3ZlciwgZm9jdXMpXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHBhbGV0dGUsICR0aHVtYi1jaGVja2VkLWh1ZSk7XG4gICAgfVxuICB9XG59XG5cbkBtaXhpbiBtYXQtc2xpZGUtdG9nZ2xlLXRoZW1lKCR0aGVtZSkge1xuICAkaXMtZGFyazogbWFwX2dldCgkdGhlbWUsIGlzLWRhcmspO1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAvLyBDb2xvciBodWVzIGFyZSBiYXNlZCBvbiB0aGUgc3BlY3Mgd2hpY2ggYnJpZWZseSBzaG93IHRoZSBodWVzIHRoYXQgYXJlIGFwcGxpZWQgdG8gYSBzd2l0Y2guXG4gIC8vIFRoZSAyMDE4IHNwZWNzIG5vIGxvbmdlciBkZXNjcmliZSBob3cgZGFyayBzd2l0Y2hlcyBzaG91bGQgbG9vayBsaWtlLiBEdWUgdG8gdGhlIGxhY2sgb2ZcbiAgLy8gaW5mb3JtYXRpb24gZm9yIGRhcmsgdGhlbWVkIHN3aXRjaGVzLCB3ZSBwYXJ0aWFsbHkga2VlcCB0aGUgb2xkIGJlaGF2aW9yIHRoYXQgaXMgYmFzZWQgb25cbiAgLy8gdGhlIHByZXZpb3VzIHNwZWNpZmljYXRpb25zLiBGb3IgdGhlIGNoZWNrZWQgY29sb3Igd2UgYWx3YXlzIHVzZSB0aGUgYGRlZmF1bHRgIGh1ZSBiZWNhdXNlXG4gIC8vIHRoYXQgZm9sbG93cyBNREMgYW5kIGFsc28gbWFrZXMgaXQgZWFzaWVyIGZvciBwZW9wbGUgdG8gY3JlYXRlIGEgY3VzdG9tIHRoZW1lIHdpdGhvdXQgbmVlZGluZ1xuICAvLyB0byBzcGVjaWZ5IGVhY2ggaHVlIGluZGl2aWR1YWxseS5cbiAgJHRodW1iLXVuY2hlY2tlZC1odWU6IGlmKCRpcy1kYXJrLCA0MDAsIDUwKTtcbiAgJHRodW1iLWNoZWNrZWQtaHVlOiBkZWZhdWx0O1xuXG4gICRiYXItdW5jaGVja2VkLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkKTtcbiAgJHJpcHBsZS11bmNoZWNrZWQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgYmFzZSk7XG5cbiAgLm1hdC1zbGlkZS10b2dnbGUge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGUtdG9nZ2xlLWNoZWNrZWQoJGFjY2VudCwgJHRodW1iLWNoZWNrZWQtaHVlKTtcblxuICAgICYubWF0LXByaW1hcnkge1xuICAgICAgQGluY2x1ZGUgX21hdC1zbGlkZS10b2dnbGUtY2hlY2tlZCgkcHJpbWFyeSwgJHRodW1iLWNoZWNrZWQtaHVlKTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtc2xpZGUtdG9nZ2xlLWNoZWNrZWQoJHdhcm4sICR0aHVtYi1jaGVja2VkLWh1ZSk7XG4gICAgfVxuXG4gICAgJjpub3QoLm1hdC1jaGVja2VkKSAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICAgIC8vIFNldCBubyBvcGFjaXR5IGZvciB0aGUgcmlwcGxlcyBiZWNhdXNlIHRoZSByaXBwbGUgb3BhY2l0eSB3aWxsIGJlIGFkanVzdGVkIGR5bmFtaWNhbGx5XG4gICAgICAvLyBiYXNlZCBvbiB0aGUgdHlwZSBvZiBpbnRlcmFjdGlvbiB3aXRoIHRoZSBzbGlkZS10b2dnbGUgKGUuZy4gZm9yIGhvdmVyLCBmb2N1cylcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRyaXBwbGUtdW5jaGVja2VkLWNvbG9yO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtc2xpZGUtdG9nZ2xlLXRodW1iIHtcbiAgICBAaW5jbHVkZSBfbWF0LXRoZW1lLWVsZXZhdGlvbigxLCAkdGhlbWUpO1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkbWF0LWdyZXksICR0aHVtYi11bmNoZWNrZWQtaHVlKTtcbiAgfVxuXG4gIC5tYXQtc2xpZGUtdG9nZ2xlLWJhciB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJGJhci11bmNoZWNrZWQtY29sb3I7XG4gIH1cbn1cblxuQG1peGluIG1hdC1zbGlkZS10b2dnbGUtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtc2xpZGUtdG9nZ2xlLWNvbnRlbnQge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gX21hdC1zbGlkZXItaW5uZXItY29udGVudC10aGVtZSgkcGFsZXR0ZSkge1xuICAubWF0LXNsaWRlci10cmFjay1maWxsLFxuICAubWF0LXNsaWRlci10aHVtYixcbiAgLm1hdC1zbGlkZXItdGh1bWItbGFiZWwge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSk7XG4gIH1cblxuICAubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0IHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRwYWxldHRlLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXNsaWRlci10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgJG1hdC1zbGlkZXItb2ZmLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNsaWRlci1vZmYpO1xuICAkbWF0LXNsaWRlci1vZmYtZm9jdXNlZC1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzbGlkZXItb2ZmLWFjdGl2ZSk7XG4gICRtYXQtc2xpZGVyLWRpc2FibGVkLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNsaWRlci1vZmYpO1xuICAkbWF0LXNsaWRlci1sYWJlbGVkLW1pbi12YWx1ZS10aHVtYi1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzbGlkZXItbWluKTtcbiAgJG1hdC1zbGlkZXItbGFiZWxlZC1taW4tdmFsdWUtdGh1bWItbGFiZWwtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2xpZGVyLW9mZik7XG4gICRtYXQtc2xpZGVyLWZvY3VzLXJpbmctY29sb3I6IG1hdC1jb2xvcigkYWNjZW50LCBkZWZhdWx0LCAwLjIpO1xuICAkbWF0LXNsaWRlci1mb2N1cy1yaW5nLW1pbi12YWx1ZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBiYXNlLCAwLjEyKTtcbiAgJG1hdC1zbGlkZXItdGljay1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBiYXNlLCAwLjcpO1xuICAkbWF0LXNsaWRlci10aWNrLXNpemU6IDJweDtcblxuICAubWF0LXNsaWRlci10cmFjay1iYWNrZ3JvdW5kIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1vZmYtY29sb3I7XG4gIH1cblxuICAubWF0LXByaW1hcnkge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGVyLWlubmVyLWNvbnRlbnQtdGhlbWUoJHByaW1hcnkpO1xuICB9XG5cbiAgLm1hdC1hY2NlbnQge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGVyLWlubmVyLWNvbnRlbnQtdGhlbWUoJGFjY2VudCk7XG4gIH1cblxuICAubWF0LXdhcm4ge1xuICAgIEBpbmNsdWRlIF9tYXQtc2xpZGVyLWlubmVyLWNvbnRlbnQtdGhlbWUoJHdhcm4pO1xuICB9XG5cbiAgLm1hdC1zbGlkZXItZm9jdXMtcmluZyB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItZm9jdXMtcmluZy1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtc2xpZGVyOmhvdmVyLFxuICAuY2RrLWZvY3VzZWQge1xuICAgIC5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItb2ZmLWZvY3VzZWQtY29sb3I7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZXItZGlzYWJsZWQge1xuICAgIC5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmQsXG4gICAgLm1hdC1zbGlkZXItdHJhY2stZmlsbCxcbiAgICAubWF0LXNsaWRlci10aHVtYiB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1kaXNhYmxlZC1jb2xvcjtcbiAgICB9XG5cbiAgICAmOmhvdmVyIHtcbiAgICAgIC5tYXQtc2xpZGVyLXRyYWNrLWJhY2tncm91bmQge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1kaXNhYmxlZC1jb2xvcjtcbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICAubWF0LXNsaWRlci1taW4tdmFsdWUge1xuICAgIC5tYXQtc2xpZGVyLWZvY3VzLXJpbmcge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJG1hdC1zbGlkZXItZm9jdXMtcmluZy1taW4tdmFsdWUtY29sb3I7XG4gICAgfVxuXG4gICAgJi5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXNob3dpbmcge1xuICAgICAgLm1hdC1zbGlkZXItdGh1bWIsXG4gICAgICAubWF0LXNsaWRlci10aHVtYi1sYWJlbCB7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6ICRtYXQtc2xpZGVyLWxhYmVsZWQtbWluLXZhbHVlLXRodW1iLWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAmLmNkay1mb2N1c2VkIHtcbiAgICAgICAgLm1hdC1zbGlkZXItdGh1bWIsXG4gICAgICAgIC5tYXQtc2xpZGVyLXRodW1iLWxhYmVsIHtcbiAgICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkbWF0LXNsaWRlci1sYWJlbGVkLW1pbi12YWx1ZS10aHVtYi1sYWJlbC1jb2xvcjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgICY6bm90KC5tYXQtc2xpZGVyLXRodW1iLWxhYmVsLXNob3dpbmcpIHtcbiAgICAgIC5tYXQtc2xpZGVyLXRodW1iIHtcbiAgICAgICAgYm9yZGVyLWNvbG9yOiAkbWF0LXNsaWRlci1vZmYtY29sb3I7XG4gICAgICAgIGJhY2tncm91bmQtY29sb3I6IHRyYW5zcGFyZW50O1xuICAgICAgfVxuXG4gICAgICAmOmhvdmVyLFxuICAgICAgJi5jZGstZm9jdXNlZCB7XG4gICAgICAgIC5tYXQtc2xpZGVyLXRodW1iIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRtYXQtc2xpZGVyLW9mZi1mb2N1c2VkLWNvbG9yO1xuICAgICAgICB9XG5cbiAgICAgICAgJi5tYXQtc2xpZGVyLWRpc2FibGVkIC5tYXQtc2xpZGVyLXRodW1iIHtcbiAgICAgICAgICBib3JkZXItY29sb3I6ICRtYXQtc2xpZGVyLWRpc2FibGVkLWNvbG9yO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zbGlkZXItaGFzLXRpY2tzIC5tYXQtc2xpZGVyLXdyYXBwZXI6OmFmdGVyIHtcbiAgICBib3JkZXItY29sb3I6ICRtYXQtc2xpZGVyLXRpY2stY29sb3I7XG4gIH1cblxuICAubWF0LXNsaWRlci1ob3Jpem9udGFsIC5tYXQtc2xpZGVyLXRpY2tzIHtcbiAgICBiYWNrZ3JvdW5kLWltYWdlOiByZXBlYXRpbmctbGluZWFyLWdyYWRpZW50KHRvIHJpZ2h0LCAkbWF0LXNsaWRlci10aWNrLWNvbG9yLFxuICAgICAgICAkbWF0LXNsaWRlci10aWNrLWNvbG9yICRtYXQtc2xpZGVyLXRpY2stc2l6ZSwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO1xuICAgIC8vIEZpcmVmb3ggZG9lc24ndCBkcmF3IHRoZSBncmFkaWVudCBjb3JyZWN0bHkgd2l0aCAndG8gcmlnaHQnXG4gICAgLy8gKHNlZSBodHRwczovL2J1Z3ppbGxhLm1vemlsbGEub3JnL3Nob3dfYnVnLmNnaT9pZD0xMzE0MzE5KS5cbiAgICBiYWNrZ3JvdW5kLWltYWdlOiAtbW96LXJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQoMC4wMDAxZGVnLCAkbWF0LXNsaWRlci10aWNrLWNvbG9yLFxuICAgICAgICAkbWF0LXNsaWRlci10aWNrLWNvbG9yICRtYXQtc2xpZGVyLXRpY2stc2l6ZSwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO1xuICB9XG5cbiAgLm1hdC1zbGlkZXItdmVydGljYWwgLm1hdC1zbGlkZXItdGlja3Mge1xuICAgIGJhY2tncm91bmQtaW1hZ2U6IHJlcGVhdGluZy1saW5lYXItZ3JhZGllbnQodG8gYm90dG9tLCAkbWF0LXNsaWRlci10aWNrLWNvbG9yLFxuICAgICAgICAkbWF0LXNsaWRlci10aWNrLWNvbG9yICRtYXQtc2xpZGVyLXRpY2stc2l6ZSwgdHJhbnNwYXJlbnQgMCwgdHJhbnNwYXJlbnQpO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtc2xpZGVyLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXNsaWRlci10aHVtYi1sYWJlbC10ZXh0IHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgICAgIHNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgY2FwdGlvbik7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cbkBtaXhpbiBtYXQtc3RlcHBlci10aGVtZSgkdGhlbWUpIHtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcblxuICAubWF0LXN0ZXAtaGVhZGVyIHtcbiAgICAmLmNkay1rZXlib2FyZC1mb2N1c2VkLFxuICAgICYuY2RrLXByb2dyYW0tZm9jdXNlZCxcbiAgICAmOmhvdmVyIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgaG92ZXIpO1xuICAgIH1cblxuICAgIC8vIE9uIHRvdWNoIGRldmljZXMgdGhlIDpob3ZlciBzdGF0ZSB3aWxsIGxpbmdlciBvbiB0aGUgZWxlbWVudCBhZnRlciBhIHRhcC5cbiAgICAvLyBSZXNldCBpdCB2aWEgYEBtZWRpYWAgYWZ0ZXIgdGhlIGRlY2xhcmF0aW9uLCBiZWNhdXNlIHRoZSBtZWRpYSBxdWVyeSBpc24ndFxuICAgIC8vIHN1cHBvcnRlZCBieSBhbGwgYnJvd3NlcnMgeWV0LlxuICAgIEBtZWRpYSAoaG92ZXI6IG5vbmUpIHtcbiAgICAgICY6aG92ZXIge1xuICAgICAgICBiYWNrZ3JvdW5kOiBub25lO1xuICAgICAgfVxuICAgIH1cblxuICAgIC5tYXQtc3RlcC1sYWJlbCxcbiAgICAubWF0LXN0ZXAtb3B0aW9uYWwge1xuICAgICAgLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogVXBkYXRlIHRvIHVzaW5nIGEgY29ycmVjdGVkIGRpc2FibGVkLXRleHQgY29udHJhc3RcbiAgICAgIC8vIGluc3RlYWQgb2Ygc2Vjb25kYXJ5LXRleHQuXG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBzZWNvbmRhcnktdGV4dCk7XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwLWljb24ge1xuICAgICAgLy8gVE9ETyhqb3NlcGhwZXJyb3R0KTogVXBkYXRlIHRvIHVzaW5nIGEgY29ycmVjdGVkIGRpc2FibGVkLXRleHQgY29udHJhc3RcbiAgICAgIC8vIGluc3RlYWQgb2Ygc2Vjb25kYXJ5LXRleHQuXG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnksIGRlZmF1bHQtY29udHJhc3QpO1xuICAgIH1cblxuICAgIC5tYXQtc3RlcC1pY29uLXNlbGVjdGVkLFxuICAgIC5tYXQtc3RlcC1pY29uLXN0YXRlLWRvbmUsXG4gICAgLm1hdC1zdGVwLWljb24tc3RhdGUtZWRpdCB7XG4gICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkcHJpbWFyeSwgZGVmYXVsdC1jb250cmFzdCk7XG4gICAgfVxuXG4gICAgLm1hdC1zdGVwLWljb24tc3RhdGUtZXJyb3Ige1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogdHJhbnNwYXJlbnQ7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG5cbiAgICAubWF0LXN0ZXAtbGFiZWwubWF0LXN0ZXAtbGFiZWwtYWN0aXZlIHtcbiAgICAgIGNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICAgIH1cblxuICAgIC5tYXQtc3RlcC1sYWJlbC5tYXQtc3RlcC1sYWJlbC1lcnJvciB7XG4gICAgICBjb2xvcjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgICB9XG4gIH1cblxuICAubWF0LXN0ZXBwZXItaG9yaXpvbnRhbCwgLm1hdC1zdGVwcGVyLXZlcnRpY2FsIHtcbiAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJGJhY2tncm91bmQsIGNhcmQpO1xuICB9XG5cbiAgLm1hdC1zdGVwcGVyLXZlcnRpY2FsLWxpbmU6OmJlZm9yZSB7XG4gICAgYm9yZGVyLWxlZnQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cblxuICAubWF0LWhvcml6b250YWwtc3RlcHBlci1oZWFkZXI6OmJlZm9yZSxcbiAgLm1hdC1ob3Jpem9udGFsLXN0ZXBwZXItaGVhZGVyOjphZnRlcixcbiAgLm1hdC1zdGVwcGVyLWhvcml6b250YWwtbGluZSB7XG4gICAgYm9yZGVyLXRvcC1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyKTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXN0ZXBwZXItdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtc3RlcHBlci12ZXJ0aWNhbCwgLm1hdC1zdGVwcGVyLWhvcml6b250YWwge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gIH1cblxuICAubWF0LXN0ZXAtbGFiZWwge1xuICAgIGZvbnQ6IHtcbiAgICAgIHNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgICAgIHdlaWdodDogbWF0LWZvbnQtd2VpZ2h0KCRjb25maWcsIGJvZHktMSk7XG4gICAgfTtcbiAgfVxuXG4gIC5tYXQtc3RlcC1zdWItbGFiZWwtZXJyb3Ige1xuICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIH1cblxuICAubWF0LXN0ZXAtbGFiZWwtZXJyb3Ige1xuICAgIGZvbnQtc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBib2R5LTIpO1xuICB9XG5cbiAgLm1hdC1zdGVwLWxhYmVsLXNlbGVjdGVkIHtcbiAgICBmb250OiB7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMik7XG4gICAgICB3ZWlnaHQ6IG1hdC1mb250LXdlaWdodCgkY29uZmlnLCBib2R5LTIpO1xuICAgIH07XG4gIH1cbn1cblxuQG1peGluIG1hdC1zb3J0LXRoZW1lKCR0aGVtZSkge1xuICAkYmFja2dyb3VuZDogbWFwLWdldCgkdGhlbWUsIGJhY2tncm91bmQpO1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gIC5tYXQtc29ydC1oZWFkZXItYXJyb3cge1xuICAgICR0YWJsZS1iYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdjYXJkJyk7XG4gICAgJHRleHQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQpO1xuXG4gICAgLy8gQmVjYXVzZSB0aGUgYXJyb3cgaXMgbWFkZSB1cCBvZiBtdWx0aXBsZSBlbGVtZW50cyB0aGF0IGFyZSBzdGFja2VkIG9uIHRvcCBvZiBlYWNoIG90aGVyLFxuICAgIC8vIHdlIGNhbid0IHVzZSB0aGUgc2VtaS10cmFzcGFyZW50IGNvbG9yIGZyb20gdGhlIHRoZW1lIGRpcmVjdGx5LiBJZiB0aGUgdmFsdWUgaXMgYSBjb2xvclxuICAgIC8vICp0eXBlKiwgd2UgY29udmVydCBpdCBpbnRvIGEgc29saWQgY29sb3IgYnkgdGFraW5nIHRoZSBvcGFjaXR5IGZyb20gdGhlIHJnYmEgdmFsdWUgYW5kXG4gICAgLy8gdXNpbmcgdGhlIHZhbHVlIHRvIGRldGVybWluZSB0aGUgcGVyY2VudGFnZSBvZiB0aGUgYmFja2dyb3VuZCB0byBwdXQgaW50byBmb3JlZ3JvdW5kXG4gICAgLy8gd2hlbiBtaXhpbmcgdGhlIGNvbG9ycyB0b2dldGhlci4gT3RoZXJ3aXNlLCBpZiBpdCByZXNvbHZlcyB0byBzb21ldGhpbmcgZGlmZmVyZW50XG4gICAgLy8gKGUuZy4gaXQgcmVzb2x2ZXMgdG8gYSBDU1MgdmFyaWFibGUpLCB3ZSB1c2UgdGhlIGNvbG9yIGRpcmVjdGx5LlxuICAgIEBpZiAodHlwZS1vZigkdGFibGUtYmFja2dyb3VuZCkgPT0gY29sb3IgYW5kIHR5cGUtb2YoJHRleHQtY29sb3IpID09IGNvbG9yKSB7XG4gICAgICAkdGV4dC1vcGFjaXR5OiBvcGFjaXR5KCR0ZXh0LWNvbG9yKTtcbiAgICAgIGNvbG9yOiBtaXgoJHRhYmxlLWJhY2tncm91bmQsIHJnYmEoJHRleHQtY29sb3IsIDEpLCAoMSAtICR0ZXh0LW9wYWNpdHkpICogMTAwJSk7XG4gICAgfVxuICAgIEBlbHNlIHtcbiAgICAgIGNvbG9yOiAkdGV4dC1jb2xvcjtcbiAgICB9XG4gIH1cbn1cblxuQG1peGluIG1hdC1zb3J0LXR5cG9ncmFwaHkoJGNvbmZpZykgeyB9XG5cblxuXG5cblxuQG1peGluIG1hdC10YWJzLXRoZW1lKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcbiAgJGhlYWRlci1ib3JkZXI6IDFweCBzb2xpZCBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuXG4gIC5tYXQtdGFiLW5hdi1iYXIsXG4gIC5tYXQtdGFiLWhlYWRlciB7XG4gICAgYm9yZGVyLWJvdHRvbTogJGhlYWRlci1ib3JkZXI7XG4gIH1cblxuICAubWF0LXRhYi1ncm91cC1pbnZlcnRlZC1oZWFkZXIge1xuICAgIC5tYXQtdGFiLW5hdi1iYXIsXG4gICAgLm1hdC10YWItaGVhZGVyIHtcbiAgICAgIGJvcmRlci10b3A6ICRoZWFkZXItYm9yZGVyO1xuICAgICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICB9XG4gIH1cblxuICAubWF0LXRhYi1sYWJlbCwgLm1hdC10YWItbGluayB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgICAmLm1hdC10YWItZGlzYWJsZWQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQtdGV4dCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiB7XG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHRleHQpO1xuICB9XG5cbiAgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tZGlzYWJsZWQgLm1hdC10YWItaGVhZGVyLXBhZ2luYXRpb24tY2hldnJvbiB7XG4gICAgYm9yZGVyLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICB9XG5cbiAgLy8gUmVtb3ZlIGhlYWRlciBib3JkZXIgd2hlbiB0aGVyZSBpcyBhIGJhY2tncm91bmQgY29sb3JcbiAgLm1hdC10YWItZ3JvdXBbY2xhc3MqPSdtYXQtYmFja2dyb3VuZC0nXSAubWF0LXRhYi1oZWFkZXIsXG4gIC5tYXQtdGFiLW5hdi1iYXJbY2xhc3MqPSdtYXQtYmFja2dyb3VuZC0nXSB7XG4gICAgYm9yZGVyLWJvdHRvbTogbm9uZTtcbiAgICBib3JkZXItdG9wOiBub25lO1xuICB9XG5cbiAgLm1hdC10YWItZ3JvdXAsIC5tYXQtdGFiLW5hdi1iYXIge1xuICAgICR0aGVtZS1jb2xvcnM6IChcbiAgICAgIHByaW1hcnk6ICRwcmltYXJ5LFxuICAgICAgYWNjZW50OiAkYWNjZW50LFxuICAgICAgd2FybjogJHdhcm5cbiAgICApO1xuXG4gICAgQGVhY2ggJG5hbWUsICRjb2xvciBpbiAkdGhlbWUtY29sb3JzIHtcbiAgICAgIC8vIFNldCB0aGUgZm9yZWdyb3VuZCBjb2xvciBvZiB0aGUgdGFic1xuICAgICAgJi5tYXQtI3skbmFtZX0ge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LXRhYi1sYWJlbC1mb2N1cygkY29sb3IpO1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWluay1iYXIoJGNvbG9yKTtcblxuICAgICAgICAvLyBPdmVycmlkZSBpbmsgYmFyIHdoZW4gYmFja2dyb3VuZCBjb2xvciBpcyB0aGUgc2FtZVxuICAgICAgICAmLm1hdC1iYWNrZ3JvdW5kLSN7JG5hbWV9IHtcbiAgICAgICAgICBAaW5jbHVkZSBfbWF0LWluay1iYXIoJGNvbG9yLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIEBlYWNoICRuYW1lLCAkY29sb3IgaW4gJHRoZW1lLWNvbG9ycyB7XG4gICAgICAvLyBTZXQgYmFja2dyb3VuZCBjb2xvciBvZiB0aGUgdGFicyBhbmQgb3ZlcnJpZGUgZm9jdXMgY29sb3JcbiAgICAgICYubWF0LWJhY2tncm91bmQtI3skbmFtZX0ge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LXRhYi1sYWJlbC1mb2N1cygkY29sb3IpO1xuICAgICAgICBAaW5jbHVkZSBfbWF0LXRhYnMtYmFja2dyb3VuZCgkY29sb3IpO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gX21hdC1pbmstYmFyKCRjb2xvciwgJGh1ZTogZGVmYXVsdCkge1xuICAubWF0LWluay1iYXIge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkY29sb3IsICRodWUpO1xuICB9XG59XG5cbkBtaXhpbiBfbWF0LXRhYi1sYWJlbC1mb2N1cygkdGFiLWZvY3VzLWNvbG9yKSB7XG4gIC5tYXQtdGFiLWxhYmVsLFxuICAubWF0LXRhYi1saW5rIHtcbiAgICAmLmNkay1rZXlib2FyZC1mb2N1c2VkLFxuICAgICYuY2RrLXByb2dyYW0tZm9jdXNlZCB7XG4gICAgICAmOm5vdCgubWF0LXRhYi1kaXNhYmxlZCkge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiBtYXQtY29sb3IoJHRhYi1mb2N1cy1jb2xvciwgbGlnaHRlciwgMC4zKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuQG1peGluIF9tYXQtdGFicy1iYWNrZ3JvdW5kKCRiYWNrZ3JvdW5kLWNvbG9yKSB7XG4gIC8vIFNldCBiYWNrZ3JvdW5kIGNvbG9yIGZvciB0aGUgdGFiIGdyb3VwXG4gIC5tYXQtdGFiLWhlYWRlciwgLm1hdC10YWItbGlua3Mge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvcik7XG4gIH1cblxuICAvLyBTZXQgbGFiZWxzIHRvIGNvbnRyYXN0IGFnYWluc3QgYmFja2dyb3VuZFxuICAubWF0LXRhYi1sYWJlbCwgLm1hdC10YWItbGluayB7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvciwgZGVmYXVsdC1jb250cmFzdCk7XG5cbiAgICAmLm1hdC10YWItZGlzYWJsZWQge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvciwgZGVmYXVsdC1jb250cmFzdCwgMC40KTtcbiAgICB9XG4gIH1cblxuICAvLyBTZXQgcGFnaW5hdGlvbiBjaGV2cm9ucyB0byBjb250cmFzdCBiYWNrZ3JvdW5kXG4gIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24ge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLWNvbG9yLCBkZWZhdWx0LWNvbnRyYXN0KTtcbiAgfVxuXG4gIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWRpc2FibGVkIC5tYXQtdGFiLWhlYWRlci1wYWdpbmF0aW9uLWNoZXZyb24ge1xuICAgIGJvcmRlci1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLWNvbG9yLCBkZWZhdWx0LWNvbnRyYXN0LCAwLjQpO1xuICB9XG5cbiAgLy8gU2V0IHJpcHBsZXMgY29sb3IgdG8gYmUgdGhlIGNvbnRyYXN0IGNvbG9yIG9mIHRoZSBuZXcgYmFja2dyb3VuZC4gT3RoZXJ3aXNlIHRoZSByaXBwbGVcbiAgLy8gY29sb3Igd2lsbCBiZSBiYXNlZCBvbiB0aGUgYXBwIGJhY2tncm91bmQgY29sb3IuXG4gIC5tYXQtcmlwcGxlLWVsZW1lbnQge1xuICAgIGJhY2tncm91bmQtY29sb3I6IG1hdC1jb2xvcigkYmFja2dyb3VuZC1jb2xvciwgZGVmYXVsdC1jb250cmFzdCwgMC4xMik7XG4gIH1cbn1cblxuQG1peGluIG1hdC10YWJzLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXRhYi1ncm91cCB7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtdGFiLWxhYmVsLCAubWF0LXRhYi1saW5rIHtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgc2l6ZTogbWF0LWZvbnQtc2l6ZSgkY29uZmlnLCBidXR0b24pO1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYnV0dG9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cbkBtaXhpbiBfbWF0LXRvb2xiYXItY29sb3IoJHBhbGV0dGUpIHtcbiAgYmFja2dyb3VuZDogbWF0LWNvbG9yKCRwYWxldHRlKTtcbiAgY29sb3I6IG1hdC1jb2xvcigkcGFsZXR0ZSwgZGVmYXVsdC1jb250cmFzdCk7XG59XG5cbkBtaXhpbiBfbWF0LXRvb2xiYXItZm9ybS1maWVsZC1vdmVycmlkZXMge1xuICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lLFxuICAubWF0LWZvcm0tZmllbGQtcmlwcGxlLFxuICAubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogY3VycmVudENvbG9yO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAubWF0LWZvY3VzZWQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuICAubWF0LXNlbGVjdC12YWx1ZSxcbiAgLm1hdC1zZWxlY3QtYXJyb3csXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LXNlbGVjdC1hcnJvdyB7XG4gICAgY29sb3I6IGluaGVyaXQ7XG4gIH1cblxuICAubWF0LWlucHV0LWVsZW1lbnQge1xuICAgIGNhcmV0LWNvbG9yOiBjdXJyZW50Q29sb3I7XG4gIH1cbn1cblxuQG1peGluIG1hdC10b29sYmFyLXRoZW1lKCR0aGVtZSkge1xuICAkcHJpbWFyeTogbWFwLWdldCgkdGhlbWUsIHByaW1hcnkpO1xuICAkYWNjZW50OiBtYXAtZ2V0KCR0aGVtZSwgYWNjZW50KTtcbiAgJHdhcm46IG1hcC1nZXQoJHRoZW1lLCB3YXJuKTtcbiAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgJGZvcmVncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBmb3JlZ3JvdW5kKTtcblxuICAubWF0LXRvb2xiYXIge1xuICAgIGJhY2tncm91bmQ6IG1hdC1jb2xvcigkYmFja2dyb3VuZCwgYXBwLWJhcik7XG4gICAgY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgdGV4dCk7XG5cbiAgICAmLm1hdC1wcmltYXJ5IHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdG9vbGJhci1jb2xvcigkcHJpbWFyeSk7XG4gICAgfVxuXG4gICAgJi5tYXQtYWNjZW50IHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdG9vbGJhci1jb2xvcigkYWNjZW50KTtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIHtcbiAgICAgIEBpbmNsdWRlIF9tYXQtdG9vbGJhci1jb2xvcigkd2Fybik7XG4gICAgfVxuXG4gICAgQGluY2x1ZGUgX21hdC10b29sYmFyLWZvcm0tZmllbGQtb3ZlcnJpZGVzO1xuICB9XG59XG5cbkBtaXhpbiBtYXQtdG9vbGJhci10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC10b29sYmFyLFxuICAubWF0LXRvb2xiYXIgaDEsXG4gIC5tYXQtdG9vbGJhciBoMixcbiAgLm1hdC10b29sYmFyIGgzLFxuICAubWF0LXRvb2xiYXIgaDQsXG4gIC5tYXQtdG9vbGJhciBoNSxcbiAgLm1hdC10b29sYmFyIGg2IHtcbiAgICBAaW5jbHVkZSBtYXQtdHlwb2dyYXBoeS1sZXZlbC10by1zdHlsZXMoJGNvbmZpZywgdGl0bGUpO1xuICAgIG1hcmdpbjogMDtcbiAgfVxufVxuXG5cblxuXG5cbiRtYXQtdG9vbHRpcC10YXJnZXQtaGVpZ2h0OiAyMnB4O1xuJG1hdC10b29sdGlwLWZvbnQtc2l6ZTogMTBweDtcbiRtYXQtdG9vbHRpcC12ZXJ0aWNhbC1wYWRkaW5nOiAoJG1hdC10b29sdGlwLXRhcmdldC1oZWlnaHQgLSAkbWF0LXRvb2x0aXAtZm9udC1zaXplKSAvIDI7XG5cbiRtYXQtdG9vbHRpcC1oYW5kc2V0LXRhcmdldC1oZWlnaHQ6IDMwcHg7XG4kbWF0LXRvb2x0aXAtaGFuZHNldC1mb250LXNpemU6IDE0cHg7XG4kbWF0LXRvb2x0aXAtaGFuZHNldC12ZXJ0aWNhbC1wYWRkaW5nOlxuICAgICgkbWF0LXRvb2x0aXAtaGFuZHNldC10YXJnZXQtaGVpZ2h0IC0gJG1hdC10b29sdGlwLWhhbmRzZXQtZm9udC1zaXplKSAvIDI7XG5cbkBtaXhpbiBtYXQtdG9vbHRpcC10aGVtZSgkdGhlbWUpIHtcbiAgLm1hdC10b29sdGlwIHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJG1hdC1ncmV5LCA3MDAsIDAuOSk7XG4gIH1cbn1cblxuQG1peGluIG1hdC10b29sdGlwLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAubWF0LXRvb2x0aXAge1xuICAgIGZvbnQtZmFtaWx5OiBtYXQtZm9udC1mYW1pbHkoJGNvbmZpZyk7XG4gICAgZm9udC1zaXplOiAkbWF0LXRvb2x0aXAtZm9udC1zaXplO1xuICAgIHBhZGRpbmctdG9wOiAkbWF0LXRvb2x0aXAtdmVydGljYWwtcGFkZGluZztcbiAgICBwYWRkaW5nLWJvdHRvbTogJG1hdC10b29sdGlwLXZlcnRpY2FsLXBhZGRpbmc7XG4gIH1cblxuICAubWF0LXRvb2x0aXAtaGFuZHNldCB7XG4gICAgZm9udC1zaXplOiAkbWF0LXRvb2x0aXAtaGFuZHNldC1mb250LXNpemU7XG4gICAgcGFkZGluZy10b3A6ICRtYXQtdG9vbHRpcC1oYW5kc2V0LXZlcnRpY2FsLXBhZGRpbmc7XG4gICAgcGFkZGluZy1ib3R0b206ICRtYXQtdG9vbHRpcC1oYW5kc2V0LXZlcnRpY2FsLXBhZGRpbmc7XG4gIH1cbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXNuYWNrLWJhci10aGVtZSgkdGhlbWUpIHtcbiAgJGlzLWRhcmstdGhlbWU6IG1hcC1nZXQoJHRoZW1lLCBpcy1kYXJrKTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG5cbiAgLm1hdC1zbmFjay1iYXItY29udGFpbmVyIHtcbiAgICAvLyBVc2UgdGhlIHByaW1hcnkgdGV4dCBvbiB0aGUgZGFyayB0aGVtZSwgZXZlbiB0aG91Z2ggdGhlIGxpZ2h0ZXIgb25lIHVzZXNcbiAgICAvLyBhIHNlY29uZGFyeSwgYmVjYXVzZSB0aGUgY29udHJhc3Qgb24gdGhlIGxpZ2h0IHByaW1hcnkgdGV4dCBpcyBwb29yLlxuICAgIGNvbG9yOiBpZigkaXMtZGFyay10aGVtZSwgJGRhcmstcHJpbWFyeS10ZXh0LCAkbGlnaHQtc2Vjb25kYXJ5LXRleHQpO1xuICAgIGJhY2tncm91bmQ6IGlmKCRpcy1kYXJrLXRoZW1lLCBtYXAtZ2V0KCRtYXQtZ3JleSwgNTApLCAjMzIzMjMyKTtcblxuICAgIEBpbmNsdWRlIF9tYXQtdGhlbWUtZWxldmF0aW9uKDYsICR0aGVtZSk7XG4gIH1cblxuICAubWF0LXNpbXBsZS1zbmFja2Jhci1hY3Rpb24ge1xuICAgIGNvbG9yOiBpZigkaXMtZGFyay10aGVtZSwgaW5oZXJpdCwgbWF0LWNvbG9yKCRhY2NlbnQpKTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXNuYWNrLWJhci10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLm1hdC1zaW1wbGUtc25hY2tiYXIge1xuICAgIGZvbnQ6IHtcbiAgICAgIGZhbWlseTogbWF0LWZvbnQtZmFtaWx5KCRjb25maWcsIGJvZHktMSk7XG4gICAgICBzaXplOiBtYXQtZm9udC1zaXplKCRjb25maWcsIGJvZHktMSk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1zaW1wbGUtc25hY2tiYXItYWN0aW9uIHtcbiAgICBsaW5lLWhlaWdodDogMTtcbiAgICBmb250OiB7XG4gICAgICBmYW1pbHk6IGluaGVyaXQ7XG4gICAgICBzaXplOiBpbmhlcml0O1xuICAgICAgd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYnV0dG9uKTtcbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG4vLyBUaGVtZSBzdHlsZXMgdGhhdCBvbmx5IGFwcGx5IHRvIHRoZSBmaWxsIGFwcGVhcmFuY2Ugb2YgdGhlIGZvcm0tZmllbGQuXG5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC1maWxsLXRoZW1lKCR0aGVtZSkge1xuICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuICAkaXMtZGFyay10aGVtZTogbWFwLWdldCgkdGhlbWUsIGlzLWRhcmspO1xuXG4gICRmaWxsLWJhY2tncm91bmQ6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgYmFzZSwgaWYoJGlzLWRhcmstdGhlbWUsIDAuMSwgMC4wNCkpO1xuICAkZmlsbC1kaXNhYmxlZC1iYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGJhc2UsIGlmKCRpcy1kYXJrLXRoZW1lLCAwLjA1LCAwLjAyKSk7XG4gICR1bmRlcmxpbmUtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlciwgaWYoJGlzLWRhcmstdGhlbWUsIDAuNSwgMC40MikpO1xuICAkbGFiZWwtZGlzYWJsZWQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGlzYWJsZWQtdGV4dCk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLWZsZXgge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJGZpbGwtYmFja2dyb3VuZDtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC1mbGV4IHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICRmaWxsLWRpc2FibGVkLWJhY2tncm91bmQ7XG4gICAgfVxuXG4gICAgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZTo6YmVmb3JlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtY29sb3I7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBjb2xvcjogJGxhYmVsLWRpc2FibGVkLWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lOjpiZWZvcmUge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kbWF0LWZvcm0tZmllbGQtZmlsbC1kZWR1cGU6IDA7XG5cbi8vIEFwcGxpZXMgYSBmbG9hdGluZyBsYWJlbCBhYm92ZSB0aGUgZm9ybSBmaWVsZCBjb250cm9sIGl0c2VsZi5cbkBtaXhpbiBfbWF0LWZvcm0tZmllbGQtZmlsbC1sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZyArICRtYXQtZm9ybS1maWVsZC1maWxsLWRlZHVwZSlcbiAgICAgICAgICAgICBzY2FsZSgkZm9udC1zY2FsZSk7XG4gIHdpZHRoOiAxMDAlIC8gJGZvbnQtc2NhbGUgKyAkbWF0LWZvcm0tZmllbGQtZmlsbC1kZWR1cGU7XG5cbiAgJG1hdC1mb3JtLWZpZWxkLWZpbGwtZGVkdXBlOiAkbWF0LWZvcm0tZmllbGQtZmlsbC1kZWR1cGUgKyAwLjAwMDAxICFnbG9iYWw7XG59XG5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC1maWxsLXR5cG9ncmFwaHkoJGNvbmZpZykge1xuICAvLyBUaGUgdW5pdC1sZXNzIGxpbmUtaGVpZ2h0IGZyb20gdGhlIGZvbnQgY29uZmlnLlxuICAkbGluZS1oZWlnaHQ6IG1hdC1saW5lLWhlaWdodCgkY29uZmlnLCBpbnB1dCk7XG4gIC8vIFRoZSBhbW91bnQgdG8gc2NhbGUgdGhlIGZvbnQgZm9yIHRoZSBmbG9hdGluZyBsYWJlbCBhbmQgc3Vic2NyaXB0LlxuICAkc3Vic2NyaXB0LWZvbnQtc2NhbGU6IDAuNzU7XG4gIC8vIFRoZSBwYWRkaW5nIG9uIHRvcCBvZiB0aGUgaW5maXguXG4gICRpbmZpeC1wYWRkaW5nLXRvcDogMC4yNWVtO1xuICAvLyBUaGUgcGFkZGluZyBiZWxvdyB0aGUgaW5maXguXG4gICRpbmZpeC1wYWRkaW5nLWJvdHRvbTogMC43NWVtO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAkaW5maXgtbWFyZ2luLXRvcDogMWVtICogJGxpbmUtaGVpZ2h0ICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgYW1vdW50IHdlIG9mZnNldCB0aGUgbGFiZWwgZnJvbSB0aGUgaW5wdXQgdGV4dCBpbiB0aGUgZmlsbCBhcHBlYXJhbmNlLlxuICAkZmlsbC1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldDogLTAuNWVtO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwge1xuICAgIC5tYXQtZm9ybS1maWVsZC1pbmZpeCB7XG4gICAgICBwYWRkaW5nOiAkaW5maXgtcGFkZGluZy10b3AgMCAkaW5maXgtcGFkZGluZy1ib3R0b20gMDtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nLXRvcDtcbiAgICAgIG1hcmdpbi10b3A6ICRmaWxsLWFwcGVhcmFuY2UtbGFiZWwtb2Zmc2V0O1xuICAgIH1cblxuICAgICYubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IHtcbiAgICAgICYubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCxcbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyOmZvY3VzICsgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWZpbGwtbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZy10b3AgKyAkZmlsbC1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldCxcbiAgICAgICAgICAgICAgICAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWZvcm0tZmllbGQtZmlsbC1sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLXRvcCArICRmaWxsLWFwcGVhcmFuY2UtbGFiZWwtb2Zmc2V0LFxuICAgICAgICAgICAgICAgICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuLy8gVGhlbWUgc3R5bGVzIHRoYXQgb25seSBhcHBseSB0byB0aGUgbGVnYWN5IGFwcGVhcmFuY2Ugb2YgdGhlIGZvcm0tZmllbGQuXG5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC1sZWdhY3ktdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgJGxhYmVsLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIHNlY29uZGFyeS10ZXh0KTtcbiAgJHVuZGVybGluZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC43LCAwLjQyKSk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IHtcbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgICB9XG5cbiAgICAubWF0LWhpbnQge1xuICAgICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtY29sb3I7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCAubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgICAgIEBpbmNsdWRlIG1hdC1jb250cm9sLWRpc2FibGVkLXVuZGVybGluZSgkdW5kZXJsaW5lLWNvbG9yKTtcbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZTogMDtcblxuLy8gQXBwbGllcyBhIGZsb2F0aW5nIGxhYmVsIGFib3ZlIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wgaXRzZWxmLlxuQG1peGluIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmcoJGZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCkge1xuICAvLyBXZSB1c2UgcGVyc3BlY3RpdmUgdG8gZml4IHRoZSB0ZXh0IGJsdXJyaW5lc3MgYXMgZGVzY3JpYmVkIGhlcmU6XG4gIC8vIGh0dHA6Ly93d3cudXNlcmFnZW50bWFuLmNvbS9ibG9nLzIwMTQvMDUvMDQvZml4aW5nLXR5cG9ncmFwaHktaW5zaWRlLW9mLTItZC1jc3MtdHJhbnNmb3Jtcy9cbiAgLy8gVGhpcyByZXN1bHRzIGluIGEgc21hbGwgaml0dGVyIGFmdGVyIHRoZSBsYWJlbCBmbG9hdHMgb24gRmlyZWZveCwgd2hpY2ggdGhlXG4gIC8vIHRyYW5zbGF0ZVogZml4ZXMuXG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZykgc2NhbGUoJGZvbnQtc2NhbGUpIHBlcnNwZWN0aXZlKDEwMHB4KVxuICB0cmFuc2xhdGVaKDAuMDAxcHggKyAkbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZSk7XG4gIC8vIFRoZSB0cmlja3MgYWJvdmUgdXNlZCB0byBzbW9vdGggb3V0IHRoZSBhbmltYXRpb24gb24gY2hyb21lIGFuZCBmaXJlZm94IGFjdHVhbGx5IG1ha2UgdGhpbmdzXG4gIC8vIHdvcnNlIG9uIElFLCBzbyB3ZSBkb24ndCBpbmNsdWRlIHRoZW0gaW4gdGhlIElFIHZlcnNpb24uXG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLSRpbmZpeC1tYXJnaW4tdG9wIC0gJGluZml4LXBhZGRpbmcgKyAkbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZSlcbiAgICAgICAgICAgICAgICAgIHNjYWxlKCRmb250LXNjYWxlKTtcblxuICB3aWR0aDogMTAwJSAvICRmb250LXNjYWxlICsgJG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS1kZWR1cGU7XG5cbiAgJG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS1kZWR1cGU6ICRtYXQtZm9ybS1maWVsZC1sZWdhY3ktZGVkdXBlICsgMC4wMDAwMSAhZ2xvYmFsO1xufVxuXG4vLyBTYW1lIGFzIG1peGluIGFib3ZlLCBidXQgb21pdHMgdGhlIHRyYW5zbGF0ZVogZm9yIHByaW50aW5nIHB1cnBvc2VzLlxuQG1peGluIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmctcHJpbnQoJGZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCkge1xuICAvLyBUaGlzIHJlc3VsdHMgaW4gYSBzbWFsbCBqaXR0ZXIgYWZ0ZXIgdGhlIGxhYmVsIGZsb2F0cyBvbiBGaXJlZm94LCB3aGljaCB0aGVcbiAgLy8gdHJhbnNsYXRlWiBmaXhlcy5cbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0kaW5maXgtbWFyZ2luLXRvcCAtICRpbmZpeC1wYWRkaW5nICsgJG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS1kZWR1cGUpXG4gICAgICAgICAgICAgICAgICBzY2FsZSgkZm9udC1zY2FsZSk7XG4gIC8vIFRoZSB0cmlja3MgYWJvdmUgdXNlZCB0byBzbW9vdGggb3V0IHRoZSBhbmltYXRpb24gb24gY2hyb21lIGFuZCBmaXJlZm94IGFjdHVhbGx5IG1ha2UgdGhpbmdzXG4gIC8vIHdvcnNlIG9uIElFLCBzbyB3ZSBkb24ndCBpbmNsdWRlIHRoZW0gaW4gdGhlIElFIHZlcnNpb24uXG4gICRtYXQtZm9ybS1maWVsZC1sZWdhY3ktZGVkdXBlOiAkbWF0LWZvcm0tZmllbGQtbGVnYWN5LWRlZHVwZSArIDAuMDAwMDEgIWdsb2JhbDtcbn1cblxuQG1peGluIG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLy8gVGhlIHVuaXQtbGVzcyBsaW5lLWhlaWdodCBmcm9tIHRoZSBmb250IGNvbmZpZy5cbiAgJGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgYW1vdW50IG9mIHNwYWNlIGJldHdlZW4gdGhlIHRvcCBvZiB0aGUgbGluZSBhbmQgdGhlIHRvcCBvZiB0aGUgYWN0dWFsIHRleHRcbiAgLy8gKGFzIGEgZnJhY3Rpb24gb2YgdGhlIGZvbnQtc2l6ZSkuXG4gICRsaW5lLXNwYWNpbmc6ICgkbGluZS1oZWlnaHQgLSAxKSAvIDI7XG4gIC8vIFRoZSBwYWRkaW5nIG9uIHRoZSBpbmZpeC4gTW9ja3Mgc2hvdyBoYWxmIG9mIHRoZSB0ZXh0IHNpemUsIGJ1dCBzZWVtIHRvIG1lYXN1cmUgZnJvbSB0aGUgZWRnZVxuICAvLyBvZiB0aGUgdGV4dCBpdHNlbGYsIG5vdCB0aGUgZWRnZSBvZiB0aGUgbGluZTsgdGhlcmVmb3JlIHdlIHN1YnRyYWN0IG9mZiB0aGUgbGluZSBzcGFjaW5nLlxuICAkaW5maXgtcGFkZGluZzogMC41ZW0gLSAkbGluZS1zcGFjaW5nO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAkaW5maXgtbWFyZ2luLXRvcDogMWVtICogJGxpbmUtaGVpZ2h0ICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgc3BhY2UgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSAubWF0LWZvcm0tZmllbGQtZmxleCBhcmVhIGFuZCB0aGUgc3Vic2NyaXB0IHdyYXBwZXIuXG4gIC8vIE1vY2tzIHNob3cgaGFsZiBvZiB0aGUgdGV4dCBzaXplLCBidXQgdGhpcyBtYXJnaW4gaXMgYXBwbGllZCB0byBhbiBlbGVtZW50IHdpdGggdGhlIHN1YnNjcmlwdFxuICAvLyB0ZXh0IGZvbnQgc2l6ZSwgc28gd2UgbmVlZCB0byBkaXZpZGUgYnkgdGhlIHNjYWxlIGZhY3RvciB0byBtYWtlIGl0IGhhbGYgb2YgdGhlIG9yaWdpbmFsIHRleHRcbiAgLy8gc2l6ZS4gV2UgYWdhaW4gbmVlZCB0byBzdWJ0cmFjdCBvZmYgdGhlIGxpbmUgc3BhY2luZyBzaW5jZSB0aGUgbW9ja3MgbWVhc3VyZSB0byB0aGUgZWRnZSBvZiB0aGVcbiAgLy8gdGV4dCwgbm90IHRoZSAgZWRnZSBvZiB0aGUgbGluZS5cbiAgJHN1YnNjcmlwdC1tYXJnaW4tdG9wOiAwLjVlbSAvICRzdWJzY3JpcHQtZm9udC1zY2FsZSAtICgkbGluZS1zcGFjaW5nICogMik7XG4gIC8vIFRoZSBwYWRkaW5nIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtd3JhcHBlciB0byByZXNlcnZlIHNwYWNlIGZvciB0aGUgc3Vic2NyaXB0LCBzaW5jZSBpdCdzXG4gIC8vIGFic29sdXRlbHkgcG9zaXRpb25lZC4gVGhpcyBpcyBhIGNvbWJpbmF0aW9uIG9mIHRoZSBzdWJzY3JpcHQncyBtYXJnaW4gYW5kIGxpbmUtaGVpZ2h0LCBidXQgd2VcbiAgLy8gbmVlZCB0byBtdWx0aXBseSBieSB0aGUgc3Vic2NyaXB0IGZvbnQgc2NhbGUgZmFjdG9yIHNpbmNlIHRoZSB3cmFwcGVyIGhhcyBhIGxhcmdlciBmb250IHNpemUuXG4gICR3cmFwcGVyLXBhZGRpbmctYm90dG9tOiAoJHN1YnNjcmlwdC1tYXJnaW4tdG9wICsgJGxpbmUtaGVpZ2h0KSAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcblxuICAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kge1xuICAgIC5tYXQtZm9ybS1maWVsZC13cmFwcGVyIHtcbiAgICAgIHBhZGRpbmctYm90dG9tOiAkd3JhcHBlci1wYWRkaW5nLWJvdHRvbTtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgcGFkZGluZzogJGluZml4LXBhZGRpbmcgMDtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCB7XG4gICAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgICAubWF0LWlucHV0LXNlcnZlcjpmb2N1cyArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmcoXG4gICAgICAgICAgICAgICAgJHN1YnNjcmlwdC1mb250LXNjYWxlLCAkaW5maXgtcGFkZGluZywgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgfVxuXG4gICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHdpbGwgcmVseSBvbiBBdXRvZmlsbE1vbml0b3IgaW5zdGVhZC5cbiAgICAgIC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxlZ2FjeS1sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWZvcm0tZmllbGQtbGVnYWN5LWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgLy8gV2Ugd2FudCB0aGUgdW5kZXJsaW5lIHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgICAgLy8gc28gd2UgbW92ZSBpdCB1cCBieSB0aGUgcGFkZGluZyBhbW91bnQuXG4gICAgICBib3R0b206ICR3cmFwcGVyLXBhZGRpbmctYm90dG9tO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlciB7XG4gICAgICBtYXJnaW4tdG9wOiAkc3Vic2NyaXB0LW1hcmdpbi10b3A7XG5cbiAgICAgIC8vIFdlIHdhbnQgdGhlIHN1YnNjcmlwdCB0byBzdGFydCBhdCB0aGUgZW5kIG9mIHRoZSBjb250ZW50IGJveCwgbm90IHRoZSBwYWRkaW5nIGJveCxcbiAgICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50IChhZGp1c3RlZCBmb3IgdGhlIHNtYWxsZXIgZm9udCBzaXplKTtcbiAgICAgIHRvcDogY2FsYygxMDAlIC0gI3skd3JhcHBlci1wYWRkaW5nLWJvdHRvbSAvICRzdWJzY3JpcHQtZm9udC1zY2FsZX0pO1xuICAgIH1cbiAgfVxuXG4gIC8vIHRyYW5zbGF0ZVogY2F1c2VzIHRoZSBsYWJlbCB0byBub3QgYXBwZWFyIHdoaWxlIHByaW50aW5nLCBzbyB3ZSBvdmVycmlkZSBpdCB0byBub3RcbiAgLy8gYXBwbHkgdHJhbnNsYXRlWiB3aGlsZSBwcmludGluZ1xuICBAbWVkaWEgcHJpbnQge1xuICAgIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSB7XG4gICAgICAmLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCB7XG4gICAgICAgICYubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCxcbiAgICAgICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmctcHJpbnQoXG4gICAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICAgIH1cblxuICAgICAgICAvLyBAYnJlYWtpbmctY2hhbmdlIDguMC4wIHdpbGwgcmVseSBvbiBBdXRvZmlsbE1vbml0b3IgaW5zdGVhZC5cbiAgICAgICAgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxlZ2FjeS1sYWJlbC1mbG9hdGluZy1wcmludChcbiAgICAgICAgICAgICAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKTtcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgICAvLyAodXNlZCBhcyBhIHB1cmUgQ1NTIHN0YW5kLWluIGZvciBtYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQpLlxuICAgICAgICAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1sZWdhY3ktbGFiZWwtZmxvYXRpbmctcHJpbnQoXG4gICAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuXG5cblxuXG5cblxuLy8gVGhlbWUgc3R5bGVzIHRoYXQgb25seSBhcHBseSB0byB0aGUgb3V0bGluZSBhcHBlYXJhbmNlIG9mIHRoZSBmb3JtLWZpZWxkLlxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgJGxhYmVsLWRpc2FibGVkLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpc2FibGVkLXRleHQpO1xuICAkb3V0bGluZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC4zLCAwLjEyKSk7XG4gICRvdXRsaW5lLWNvbG9yLWhvdmVyOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIsIGlmKCRpcy1kYXJrLXRoZW1lLCAxLCAwLjg3KSk7XG4gICRvdXRsaW5lLWNvbG9yLXByaW1hcnk6IG1hdC1jb2xvcigkcHJpbWFyeSk7XG4gICRvdXRsaW5lLWNvbG9yLWFjY2VudDogbWF0LWNvbG9yKCRhY2NlbnQpO1xuICAkb3V0bGluZS1jb2xvci13YXJuOiBtYXQtY29sb3IoJHdhcm4pO1xuICAkb3V0bGluZS1jb2xvci1kaXNhYmxlZDogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC4xNSwgMC4wNikpO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUge1xuICAgIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lIHtcbiAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvcjtcbiAgICB9XG5cbiAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGljayB7XG4gICAgICBjb2xvcjogJG91dGxpbmUtY29sb3ItaG92ZXI7XG4gICAgfVxuXG4gICAgJi5tYXQtZm9jdXNlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZS10aGljayB7XG4gICAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvci1wcmltYXJ5O1xuICAgICAgfVxuXG4gICAgICAmLm1hdC1hY2NlbnQgLm1hdC1mb3JtLWZpZWxkLW91dGxpbmUtdGhpY2sge1xuICAgICAgICBjb2xvcjogJG91dGxpbmUtY29sb3ItYWNjZW50O1xuICAgICAgfVxuXG4gICAgICAmLm1hdC13YXJuIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoaWNrIHtcbiAgICAgICAgY29sb3I6ICRvdXRsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gQ2xhc3MgcmVwZWF0ZWQgc28gdGhhdCBydWxlIGlzIHNwZWNpZmljIGVub3VnaCB0byBvdmVycmlkZSBmb2N1c2VkIGFjY2VudCBjb2xvciBjYXNlLlxuICAgICYubWF0LWZvcm0tZmllbGQtaW52YWxpZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIHtcbiAgICAgIC5tYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoaWNrIHtcbiAgICAgICAgY29sb3I6ICRvdXRsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgJi5tYXQtZm9ybS1maWVsZC1kaXNhYmxlZCB7XG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBjb2xvcjogJGxhYmVsLWRpc2FibGVkLWNvbG9yO1xuICAgICAgfVxuXG4gICAgICAubWF0LWZvcm0tZmllbGQtb3V0bGluZSB7XG4gICAgICAgIGNvbG9yOiAkb3V0bGluZS1jb2xvci1kaXNhYmxlZDtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn1cblxuLy8gVXNlZCB0byBtYWtlIGluc3RhbmNlcyBvZiB0aGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nIG1peGluIG5lZ2xpZ2libHkgZGlmZmVyZW50LFxuLy8gYW5kIHByZXZlbnQgR29vZ2xlJ3MgQ1NTIE9wdGltaXplciBmcm9tIGNvbGxhcHNpbmcgdGhlIGRlY2xhcmF0aW9ucy4gVGhpcyBpcyBuZWVkZWQgYmVjYXVzZSBzb21lXG4vLyBvZiB0aGUgc2VsZWN0b3JzIGNvbnRhaW4gcHNldWRvLWNsYXNzZXMgbm90IHJlY29nbml6ZWQgaW4gYWxsIGJyb3dzZXJzLiBJZiBhIGJyb3dzZXIgZW5jb3VudGVyc1xuLy8gYW4gdW5rbm93biBwc2V1ZG8tY2xhc3MgaXQgd2lsbCBkaXNjYXJkIHRoZSBlbnRpcmUgcnVsZSBzZXQuXG4kbWF0LWZvcm0tZmllbGQtb3V0bGluZS1kZWR1cGU6IDA7XG5cbi8vIEFwcGxpZXMgYSBmbG9hdGluZyBsYWJlbCBhYm92ZSB0aGUgZm9ybSBmaWVsZCBjb250cm9sIGl0c2VsZi5cbkBtaXhpbiBfbWF0LWZvcm0tZmllbGQtb3V0bGluZS1sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZyArICRtYXQtZm9ybS1maWVsZC1vdXRsaW5lLWRlZHVwZSlcbiAgc2NhbGUoJGZvbnQtc2NhbGUpO1xuICB3aWR0aDogMTAwJSAvICRmb250LXNjYWxlICsgJG1hdC1mb3JtLWZpZWxkLW91dGxpbmUtZGVkdXBlO1xuXG4gICRtYXQtZm9ybS1maWVsZC1vdXRsaW5lLWRlZHVwZTogJG1hdC1mb3JtLWZpZWxkLW91dGxpbmUtZGVkdXBlICsgMC4wMDAwMSAhZ2xvYmFsO1xufVxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtb3V0bGluZS10eXBvZ3JhcGh5KCRjb25maWcpIHtcbiAgLy8gVGhlIHVuaXQtbGVzcyBsaW5lLWhlaWdodCBmcm9tIHRoZSBmb250IGNvbmZpZy5cbiAgJGxpbmUtaGVpZ2h0OiBtYXQtbGluZS1oZWlnaHQoJGNvbmZpZywgaW5wdXQpO1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgcGFkZGluZyBhYm92ZSBhbmQgYmVsb3cgdGhlIGluZml4LlxuICAkaW5maXgtcGFkZGluZzogMWVtO1xuICAvLyBUaGUgbWFyZ2luIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtaW5maXggdG8gcmVzZXJ2ZSBzcGFjZSBmb3IgdGhlIGZsb2F0aW5nIGxhYmVsLlxuICAkaW5maXgtbWFyZ2luLXRvcDogMWVtICogJGxpbmUtaGVpZ2h0ICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgc3BhY2UgYmV0d2VlbiB0aGUgYm90dG9tIG9mIHRoZSAubWF0LWZvcm0tZmllbGQtZmxleCBhcmVhIGFuZCB0aGUgc3Vic2NyaXB0IHdyYXBwZXIuXG4gIC8vIE1vY2tzIHNob3cgaGFsZiBvZiB0aGUgdGV4dCBzaXplLCBidXQgdGhpcyBtYXJnaW4gaXMgYXBwbGllZCB0byBhbiBlbGVtZW50IHdpdGggdGhlIHN1YnNjcmlwdFxuICAvLyB0ZXh0IGZvbnQgc2l6ZSwgc28gd2UgbmVlZCB0byBkaXZpZGUgYnkgdGhlIHNjYWxlIGZhY3RvciB0byBtYWtlIGl0IGhhbGYgb2YgdGhlIG9yaWdpbmFsIHRleHRcbiAgLy8gc2l6ZS5cbiAgJHN1YnNjcmlwdC1tYXJnaW4tdG9wOiAwLjVlbSAvICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcbiAgLy8gVGhlIHBhZGRpbmcgYXBwbGllZCB0byB0aGUgZm9ybS1maWVsZC13cmFwcGVyIHRvIHJlc2VydmUgc3BhY2UgZm9yIHRoZSBzdWJzY3JpcHQsIHNpbmNlIGl0J3NcbiAgLy8gYWJzb2x1dGVseSBwb3NpdGlvbmVkLiBUaGlzIGlzIGEgY29tYmluYXRpb24gb2YgdGhlIHN1YnNjcmlwdCdzIG1hcmdpbiBhbmQgbGluZS1oZWlnaHQsIGJ1dCB3ZVxuICAvLyBuZWVkIHRvIG11bHRpcGx5IGJ5IHRoZSBzdWJzY3JpcHQgZm9udCBzY2FsZSBmYWN0b3Igc2luY2UgdGhlIHdyYXBwZXIgaGFzIGEgbGFyZ2VyIGZvbnQgc2l6ZS5cbiAgJHdyYXBwZXItcGFkZGluZy1ib3R0b206ICgkc3Vic2NyaXB0LW1hcmdpbi10b3AgKyAkbGluZS1oZWlnaHQpICogJHN1YnNjcmlwdC1mb250LXNjYWxlO1xuICAvLyBUaGUgYW1vdW50IHdlIG9mZnNldCB0aGUgbGFiZWwgZnJvbSB0aGUgaW5wdXQgdGV4dCBpbiB0aGUgb3V0bGluZSBhcHBlYXJhbmNlLlxuICAkb3V0bGluZS1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldDogLTAuMjVlbTtcblxuICAubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lIHtcbiAgICAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICAgICAgcGFkZGluZzogJGluZml4LXBhZGRpbmcgMCAkaW5maXgtcGFkZGluZyAwO1xuICAgIH1cblxuICAgIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICB0b3A6ICRpbmZpeC1tYXJnaW4tdG9wICsgJGluZml4LXBhZGRpbmc7XG4gICAgICBtYXJnaW4tdG9wOiAkb3V0bGluZS1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldDtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCB7XG4gICAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgICAubWF0LWlucHV0LXNlcnZlcjpmb2N1cyArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgICAgIEBpbmNsdWRlIF9tYXQtZm9ybS1maWVsZC1vdXRsaW5lLWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAgICRzdWJzY3JpcHQtZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcgKyAkb3V0bGluZS1hcHBlYXJhbmNlLWxhYmVsLW9mZnNldCxcbiAgICAgICAgICAgICAgICAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgICB9XG5cbiAgICAgIC8vIFNlcnZlci1zaWRlIHJlbmRlcmVkIG1hdElucHV0IHdpdGggYSBsYWJlbCBhdHRyaWJ1dGUgYnV0IGxhYmVsIG5vdCBzaG93blxuICAgICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAgIC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyXG4gICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgICBAaW5jbHVkZSBfbWF0LWZvcm0tZmllbGQtb3V0bGluZS1sYWJlbC1mbG9hdGluZyhcbiAgICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nICsgJG91dGxpbmUtYXBwZWFyYW5jZS1sYWJlbC1vZmZzZXQsXG4gICAgICAgICAgICAgICAgJGluZml4LW1hcmdpbi10b3ApO1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuXG4vLyBUaGVtZSBzdHlsZXMgdGhhdCBvbmx5IGFwcGx5IHRvIHRoZSBzdGFuZGFyZCBhcHBlYXJhbmNlIG9mIHRoZSBmb3JtLWZpZWxkLlxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtc3RhbmRhcmQtdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgJHVuZGVybGluZS1jb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCBkaXZpZGVyLCBpZigkaXMtZGFyay10aGVtZSwgMC43LCAwLjQyKSk7XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utc3RhbmRhcmQge1xuICAgIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvcjtcbiAgICB9XG5cbiAgICAmLm1hdC1mb3JtLWZpZWxkLWRpc2FibGVkIC5tYXQtZm9ybS1maWVsZC11bmRlcmxpbmUge1xuICAgICAgQGluY2x1ZGUgbWF0LWNvbnRyb2wtZGlzYWJsZWQtdW5kZXJsaW5lKCR1bmRlcmxpbmUtY29sb3IpO1xuICAgIH1cbiAgfVxufVxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtc3RhbmRhcmQtdHlwb2dyYXBoeSgkY29uZmlnKSB7fVxuXG5cbi8vIFRoZW1lIHN0eWxlcyB0aGF0IGFwcGx5IHRvIGFsbCBhcHBlYXJhbmNlcyBvZiB0aGUgZm9ybS1maWVsZC5cbkBtaXhpbiBtYXQtZm9ybS1maWVsZC10aGVtZSgkdGhlbWUpIHtcbiAgJHByaW1hcnk6IG1hcC1nZXQoJHRoZW1lLCBwcmltYXJ5KTtcbiAgJGFjY2VudDogbWFwLWdldCgkdGhlbWUsIGFjY2VudCk7XG4gICR3YXJuOiBtYXAtZ2V0KCR0aGVtZSwgd2Fybik7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG4gICRpcy1kYXJrLXRoZW1lOiBtYXAtZ2V0KCR0aGVtZSwgaXMtZGFyayk7XG5cbiAgLy8gTGFiZWwgY29sb3JzLiBSZXF1aXJlZCBpcyB1c2VkIGZvciB0aGUgYCpgIHN0YXIgc2hvd24gaW4gdGhlIGxhYmVsLlxuICAkbGFiZWwtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgc2Vjb25kYXJ5LXRleHQsIGlmKCRpcy1kYXJrLXRoZW1lLCAwLjcsIDAuNikpO1xuICAkZm9jdXNlZC1sYWJlbC1jb2xvcjogbWF0LWNvbG9yKCRwcmltYXJ5KTtcbiAgJHJlcXVpcmVkLWxhYmVsLWNvbG9yOiBtYXQtY29sb3IoJGFjY2VudCk7XG5cbiAgLy8gVW5kZXJsaW5lIGNvbG9ycy5cbiAgJHVuZGVybGluZS1jb2xvci1iYXNlOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIsIGlmKCRpcy1kYXJrLXRoZW1lLCAxLCAwLjg3KSk7XG4gICR1bmRlcmxpbmUtY29sb3ItYWNjZW50OiBtYXQtY29sb3IoJGFjY2VudCk7XG4gICR1bmRlcmxpbmUtY29sb3Itd2FybjogbWF0LWNvbG9yKCR3YXJuKTtcbiAgJHVuZGVybGluZS1mb2N1c2VkLWNvbG9yOiBtYXQtY29sb3IoJHByaW1hcnkpO1xuXG4gIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtaGludCB7XG4gICAgY29sb3I6ICRsYWJlbC1jb2xvcjtcbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgIGNvbG9yOiAkZm9jdXNlZC1sYWJlbC1jb2xvcjtcblxuICAgICYubWF0LWFjY2VudCB7XG4gICAgICBjb2xvcjogJHVuZGVybGluZS1jb2xvci1hY2NlbnQ7XG4gICAgfVxuXG4gICAgJi5tYXQtd2FybiB7XG4gICAgICBjb2xvcjogJHVuZGVybGluZS1jb2xvci13YXJuO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtZm9jdXNlZCAubWF0LWZvcm0tZmllbGQtcmVxdWlyZWQtbWFya2VyIHtcbiAgICBjb2xvcjogJHJlcXVpcmVkLWxhYmVsLWNvbG9yO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSB7XG4gICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvci1iYXNlO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLm1hdC1mb2N1c2VkIHtcbiAgICAubWF0LWZvcm0tZmllbGQtcmlwcGxlIHtcbiAgICAgIGJhY2tncm91bmQtY29sb3I6ICR1bmRlcmxpbmUtZm9jdXNlZC1jb2xvcjtcblxuICAgICAgJi5tYXQtYWNjZW50IHtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvci1hY2NlbnQ7XG4gICAgICB9XG5cbiAgICAgICYubWF0LXdhcm4ge1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXR5cGUtbWF0LW5hdGl2ZS1zZWxlY3QubWF0LWZvY3VzZWQ6bm90KC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkKSB7XG4gICAgLm1hdC1mb3JtLWZpZWxkLWluZml4OjphZnRlciB7XG4gICAgICBjb2xvcjogJHVuZGVybGluZS1mb2N1c2VkLWNvbG9yO1xuICAgIH1cblxuICAgICYubWF0LWFjY2VudCAubWF0LWZvcm0tZmllbGQtaW5maXg6OmFmdGVyIHtcbiAgICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLWFjY2VudDtcbiAgICB9XG5cbiAgICAmLm1hdC13YXJuIC5tYXQtZm9ybS1maWVsZC1pbmZpeDo6YWZ0ZXIge1xuICAgICAgY29sb3I6ICR1bmRlcmxpbmUtY29sb3Itd2FybjtcbiAgICB9XG4gIH1cblxuICAvLyBTdHlsaW5nIGZvciB0aGUgZXJyb3Igc3RhdGUgb2YgdGhlIGZvcm0gZmllbGQuIE5vdGUgdGhhdCB3aGlsZSB0aGUgc2FtZSBjYW4gYmVcbiAgLy8gYWNoaWV2ZWQgd2l0aCB0aGUgbmctKiBjbGFzc2VzLCB3ZSB1c2UgdGhpcyBhcHByb2FjaCBpbiBvcmRlciB0byBlbnN1cmUgdGhhdCB0aGUgc2FtZVxuICAvLyBsb2dpYyBpcyB1c2VkIHRvIHN0eWxlIHRoZSBlcnJvciBzdGF0ZSBhbmQgdG8gc2hvdyB0aGUgZXJyb3IgbWVzc2FnZXMuXG4gIC5tYXQtZm9ybS1maWVsZC5tYXQtZm9ybS1maWVsZC1pbnZhbGlkIHtcbiAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgY29sb3I6ICR1bmRlcmxpbmUtY29sb3Itd2FybjtcblxuICAgICAgJi5tYXQtYWNjZW50LFxuICAgICAgLm1hdC1mb3JtLWZpZWxkLXJlcXVpcmVkLW1hcmtlciB7XG4gICAgICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG4gICAgICB9XG4gICAgfVxuXG4gICAgLm1hdC1mb3JtLWZpZWxkLXJpcHBsZSxcbiAgICAubWF0LWZvcm0tZmllbGQtcmlwcGxlLm1hdC1hY2NlbnQge1xuICAgICAgYmFja2dyb3VuZC1jb2xvcjogJHVuZGVybGluZS1jb2xvci13YXJuO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtZXJyb3Ige1xuICAgIGNvbG9yOiAkdW5kZXJsaW5lLWNvbG9yLXdhcm47XG4gIH1cblxuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1sZWdhY3ktdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWZvcm0tZmllbGQtc3RhbmRhcmQtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWZvcm0tZmllbGQtZmlsbC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1vdXRsaW5lLXRoZW1lKCR0aGVtZSk7XG59XG5cbi8vIFVzZWQgdG8gbWFrZSBpbnN0YW5jZXMgb2YgdGhlIF9tYXQtZm9ybS1maWVsZC1sYWJlbC1mbG9hdGluZyBtaXhpbiBuZWdsaWdpYmx5IGRpZmZlcmVudCxcbi8vIGFuZCBwcmV2ZW50IEdvb2dsZSdzIENTUyBPcHRpbWl6ZXIgZnJvbSBjb2xsYXBzaW5nIHRoZSBkZWNsYXJhdGlvbnMuIFRoaXMgaXMgbmVlZGVkIGJlY2F1c2Ugc29tZVxuLy8gb2YgdGhlIHNlbGVjdG9ycyBjb250YWluIHBzZXVkby1jbGFzc2VzIG5vdCByZWNvZ25pemVkIGluIGFsbCBicm93c2Vycy4gSWYgYSBicm93c2VyIGVuY291bnRlcnNcbi8vIGFuIHVua25vd24gcHNldWRvLWNsYXNzIGl0IHdpbGwgZGlzY2FyZCB0aGUgZW50aXJlIHJ1bGUgc2V0LlxuJG1hdC1mb3JtLWZpZWxkLWRlZHVwZTogMDtcblxuLy8gQXBwbGllcyBhIGZsb2F0aW5nIGxhYmVsIGFib3ZlIHRoZSBmb3JtIGZpZWxkIGNvbnRyb2wgaXRzZWxmLlxuQG1peGluIF9tYXQtZm9ybS1maWVsZC1sYWJlbC1mbG9hdGluZygkZm9udC1zY2FsZSwgJGluZml4LXBhZGRpbmcsICRpbmZpeC1tYXJnaW4tdG9wKSB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtJGluZml4LW1hcmdpbi10b3AgLSAkaW5maXgtcGFkZGluZyArICRtYXQtZm9ybS1maWVsZC1kZWR1cGUpXG4gICAgICAgICAgICAgc2NhbGUoJGZvbnQtc2NhbGUpO1xuICB3aWR0aDogMTAwJSAvICRmb250LXNjYWxlICsgJG1hdC1mb3JtLWZpZWxkLWRlZHVwZTtcblxuICAkbWF0LWZvcm0tZmllbGQtZGVkdXBlOiAkbWF0LWZvcm0tZmllbGQtZGVkdXBlICsgMC4wMDAwMSAhZ2xvYmFsO1xufVxuXG5AbWl4aW4gbWF0LWZvcm0tZmllbGQtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC8vIFRoZSB1bml0LWxlc3MgbGluZS1oZWlnaHQgZnJvbSB0aGUgZm9udCBjb25maWcuXG4gICRsaW5lLWhlaWdodDogbWF0LWxpbmUtaGVpZ2h0KCRjb25maWcsIGlucHV0KTtcblxuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgZmxvYXRpbmcgbGFiZWwgYW5kIHN1YnNjcmlwdC5cbiAgJHN1YnNjcmlwdC1mb250LXNjYWxlOiAwLjc1O1xuICAvLyBUaGUgYW1vdW50IHRvIHNjYWxlIHRoZSBmb250IGZvciB0aGUgcHJlZml4IGFuZCBzdWZmaXggaWNvbnMuXG4gICRwcmVmaXgtc3VmZml4LWljb24tZm9udC1zY2FsZTogMS41O1xuXG4gIC8vIFRoZSBwYWRkaW5nIG9uIHRoZSBpbmZpeC4gTW9ja3Mgc2hvdyBoYWxmIG9mIHRoZSB0ZXh0IHNpemUuXG4gICRpbmZpeC1wYWRkaW5nOiAwLjVlbTtcbiAgLy8gVGhlIG1hcmdpbiBhcHBsaWVkIHRvIHRoZSBmb3JtLWZpZWxkLWluZml4IHRvIHJlc2VydmUgc3BhY2UgZm9yIHRoZSBmbG9hdGluZyBsYWJlbC5cbiAgJGluZml4LW1hcmdpbi10b3A6IDFlbSAqICRsaW5lLWhlaWdodCAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcbiAgLy8gRm9udCBzaXplIHRvIHVzZSBmb3IgdGhlIGxhYmVsIGFuZCBzdWJzY3JpcHQgdGV4dC5cbiAgJHN1YnNjcmlwdC1mb250LXNpemU6ICRzdWJzY3JpcHQtZm9udC1zY2FsZSAqIDEwMCU7XG4gIC8vIEZvbnQgc2l6ZSB0byB1c2UgZm9yIHRoZSBmb3IgdGhlIHByZWZpeCBhbmQgc3VmZml4IGljb25zLlxuICAkcHJlZml4LXN1ZmZpeC1pY29uLWZvbnQtc2l6ZTogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNjYWxlICogMTAwJTtcbiAgLy8gVGhlIHNwYWNlIGJldHdlZW4gdGhlIGJvdHRvbSBvZiB0aGUgLm1hdC1mb3JtLWZpZWxkLWZsZXggYXJlYSBhbmQgdGhlIHN1YnNjcmlwdCB3cmFwcGVyLlxuICAvLyBNb2NrcyBzaG93IGhhbGYgb2YgdGhlIHRleHQgc2l6ZSwgYnV0IHRoaXMgbWFyZ2luIGlzIGFwcGxpZWQgdG8gYW4gZWxlbWVudCB3aXRoIHRoZSBzdWJzY3JpcHRcbiAgLy8gdGV4dCBmb250IHNpemUsIHNvIHdlIG5lZWQgdG8gZGl2aWRlIGJ5IHRoZSBzY2FsZSBmYWN0b3IgdG8gbWFrZSBpdCBoYWxmIG9mIHRoZSBvcmlnaW5hbCB0ZXh0XG4gIC8vIHNpemUuXG4gICRzdWJzY3JpcHQtbWFyZ2luLXRvcDogMC41ZW0gLyAkc3Vic2NyaXB0LWZvbnQtc2NhbGU7XG4gIC8vIFRoZSBwYWRkaW5nIGFwcGxpZWQgdG8gdGhlIGZvcm0tZmllbGQtd3JhcHBlciB0byByZXNlcnZlIHNwYWNlIGZvciB0aGUgc3Vic2NyaXB0LCBzaW5jZSBpdCdzXG4gIC8vIGFic29sdXRlbHkgcG9zaXRpb25lZC4gVGhpcyBpcyBhIGNvbWJpbmF0aW9uIG9mIHRoZSBzdWJzY3JpcHQncyBtYXJnaW4gYW5kIGxpbmUtaGVpZ2h0LCBidXQgd2VcbiAgLy8gbmVlZCB0byBtdWx0aXBseSBieSB0aGUgc3Vic2NyaXB0IGZvbnQgc2NhbGUgZmFjdG9yIHNpbmNlIHRoZSB3cmFwcGVyIGhhcyBhIGxhcmdlciBmb250IHNpemUuXG4gICR3cmFwcGVyLXBhZGRpbmctYm90dG9tOiAoJHN1YnNjcmlwdC1tYXJnaW4tdG9wICsgJGxpbmUtaGVpZ2h0KSAqICRzdWJzY3JpcHQtZm9udC1zY2FsZTtcblxuICAubWF0LWZvcm0tZmllbGQge1xuICAgIEBpbmNsdWRlIG1hdC10eXBvZ3JhcGh5LWxldmVsLXRvLXN0eWxlcygkY29uZmlnLCBpbnB1dCk7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gICAgcGFkZGluZy1ib3R0b206ICR3cmFwcGVyLXBhZGRpbmctYm90dG9tO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXByZWZpeCxcbiAgLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCB7XG4gICAgLy8gQWxsb3cgaWNvbnMgaW4gYSBwcmVmaXggb3Igc3VmZml4IHRvIGFkYXB0IHRvIHRoZSBjb3JyZWN0IHNpemUuXG4gICAgLm1hdC1pY29uIHtcbiAgICAgIGZvbnQtc2l6ZTogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNpemU7XG4gICAgICBsaW5lLWhlaWdodDogJGxpbmUtaGVpZ2h0O1xuICAgIH1cblxuICAgIC8vIEFsbG93IGljb24gYnV0dG9ucyBpbiBhIHByZWZpeCBvciBzdWZmaXggdG8gYWRhcHQgdG8gdGhlIGNvcnJlY3Qgc2l6ZS5cbiAgICAubWF0LWljb24tYnV0dG9uIHtcbiAgICAgIGhlaWdodDogJHByZWZpeC1zdWZmaXgtaWNvbi1mb250LXNjYWxlICogMWVtO1xuICAgICAgd2lkdGg6ICRwcmVmaXgtc3VmZml4LWljb24tZm9udC1zY2FsZSAqIDFlbTtcblxuICAgICAgLm1hdC1pY29uIHtcbiAgICAgICAgaGVpZ2h0OiAkbGluZS1oZWlnaHQgKiAxZW07XG4gICAgICAgIGxpbmUtaGVpZ2h0OiAkbGluZS1oZWlnaHQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgICBwYWRkaW5nOiAkaW5maXgtcGFkZGluZyAwO1xuICAgIC8vIFRocm93cyBvZmYgdGhlIGJhc2VsaW5lIGlmIHdlIGRvIGl0IGFzIGEgcmVhbCBtYXJnaW4sIHNvIHdlIGRvIGl0IGFzIGEgYm9yZGVyIGluc3RlYWQuXG4gICAgYm9yZGVyLXRvcDogJGluZml4LW1hcmdpbi10b3Agc29saWQgdHJhbnNwYXJlbnQ7XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IHtcbiAgICAmLm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4gICAgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgfVxuXG4gICAgLy8gU2VydmVyLXNpZGUgcmVuZGVyZWQgbWF0SW5wdXQgd2l0aCBhIGxhYmVsIGF0dHJpYnV0ZSBidXQgbGFiZWwgbm90IHNob3duXG4gICAgLy8gKHVzZWQgYXMgYSBwdXJlIENTUyBzdGFuZC1pbiBmb3IgbWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0KS5cbiAgICAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlclxuICAgICAgICAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICAgICAgQGluY2x1ZGUgX21hdC1mb3JtLWZpZWxkLWxhYmVsLWZsb2F0aW5nKFxuICAgICAgICAgICAgICAkc3Vic2NyaXB0LWZvbnQtc2NhbGUsICRpbmZpeC1wYWRkaW5nLCAkaW5maXgtbWFyZ2luLXRvcCk7XG4gICAgfVxuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIge1xuICAgIHRvcDogLSRpbmZpeC1tYXJnaW4tdG9wO1xuICAgIHBhZGRpbmctdG9wOiAkaW5maXgtbWFyZ2luLXRvcDtcbiAgfVxuXG4gIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgdG9wOiAkaW5maXgtbWFyZ2luLXRvcCArICRpbmZpeC1wYWRkaW5nO1xuICB9XG5cbiAgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZSB7XG4gICAgLy8gV2Ugd2FudCB0aGUgdW5kZXJsaW5lIHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50LlxuICAgIGJvdHRvbTogJHdyYXBwZXItcGFkZGluZy1ib3R0b207XG4gIH1cblxuICAubWF0LWZvcm0tZmllbGQtc3Vic2NyaXB0LXdyYXBwZXIge1xuICAgIGZvbnQtc2l6ZTogJHN1YnNjcmlwdC1mb250LXNpemU7XG4gICAgbWFyZ2luLXRvcDogJHN1YnNjcmlwdC1tYXJnaW4tdG9wO1xuXG4gICAgLy8gV2Ugd2FudCB0aGUgc3Vic2NyaXB0IHRvIHN0YXJ0IGF0IHRoZSBlbmQgb2YgdGhlIGNvbnRlbnQgYm94LCBub3QgdGhlIHBhZGRpbmcgYm94LFxuICAgIC8vIHNvIHdlIG1vdmUgaXQgdXAgYnkgdGhlIHBhZGRpbmcgYW1vdW50IChhZGp1c3RlZCBmb3IgdGhlIHNtYWxsZXIgZm9udCBzaXplKTtcbiAgICB0b3A6IGNhbGMoMTAwJSAtICN7JHdyYXBwZXItcGFkZGluZy1ib3R0b20gLyAkc3Vic2NyaXB0LWZvbnQtc2NhbGV9KTtcbiAgfVxuXG4gIEBpbmNsdWRlIG1hdC1mb3JtLWZpZWxkLWxlZ2FjeS10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1zdGFuZGFyZC10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC1maWxsLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1mb3JtLWZpZWxkLW91dGxpbmUtdHlwb2dyYXBoeSgkY29uZmlnKTtcbn1cblxuXG5cblxuXG5AbWl4aW4gbWF0LXRyZWUtdGhlbWUoJHRoZW1lKSB7XG4gICRiYWNrZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgYmFja2dyb3VuZCk7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC10cmVlIHtcbiAgICBiYWNrZ3JvdW5kOiBtYXQtY29sb3IoJGJhY2tncm91bmQsICdjYXJkJyk7XG4gIH1cblxuICAubWF0LXRyZWUtbm9kZSxcbiAgLm1hdC1uZXN0ZWQtdHJlZS1ub2RlIHtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxufVxuXG5AbWl4aW4gbWF0LXRyZWUtdHlwb2dyYXBoeSgkY29uZmlnKSB7XG4gIC5tYXQtdHJlZSB7XG4gICAgZm9udC1mYW1pbHk6IG1hdC1mb250LWZhbWlseSgkY29uZmlnKTtcbiAgfVxuXG4gIC5tYXQtdHJlZS1ub2RlLFxuICAubWF0LW5lc3RlZC10cmVlLW5vZGUge1xuICAgIGZvbnQtd2VpZ2h0OiBtYXQtZm9udC13ZWlnaHQoJGNvbmZpZywgYm9keS0xKTtcbiAgICBmb250LXNpemU6IG1hdC1mb250LXNpemUoJGNvbmZpZywgYm9keS0xKTtcbiAgfVxufVxuXG5cblxuLy8gSW5jbHVkZXMgYWxsIG9mIHRoZSB0eXBvZ3JhcGhpYyBzdHlsZXMuXG5AbWl4aW4gYW5ndWxhci1tYXRlcmlhbC10eXBvZ3JhcGh5KCRjb25maWc6IG51bGwpIHtcbiAgQGlmICRjb25maWcgPT0gbnVsbCB7XG4gICAgJGNvbmZpZzogbWF0LXR5cG9ncmFwaHktY29uZmlnKCk7XG4gIH1cblxuICBAaW5jbHVkZSBtYXQtYmFkZ2UtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWJhc2UtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWF1dG9jb21wbGV0ZS10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtYm90dG9tLXNoZWV0LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1idXR0b24tdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWJ1dHRvbi10b2dnbGUtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWNhcmQtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWNoZWNrYm94LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1jaGlwcy10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtdGFibGUtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWRhdGVwaWNrZXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWRpYWxvZy10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtZXhwYW5zaW9uLXBhbmVsLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1mb3JtLWZpZWxkLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1ncmlkLWxpc3QtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWljb24tdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWlucHV0LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1tZW51LXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1wYWdpbmF0b3ItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXByb2dyZXNzLWJhci10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtcHJvZ3Jlc3Mtc3Bpbm5lci10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtcmFkaW8tdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXNlbGVjdC10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtc2lkZW5hdi10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtc2xpZGUtdG9nZ2xlLXR5cG9ncmFwaHkoJGNvbmZpZyk7XG4gIEBpbmNsdWRlIG1hdC1zbGlkZXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXN0ZXBwZXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXNvcnQtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXRhYnMtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXRvb2xiYXItdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXRvb2x0aXAtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LWxpc3QtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LW9wdGlvbi10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtb3B0Z3JvdXAtdHlwb2dyYXBoeSgkY29uZmlnKTtcbiAgQGluY2x1ZGUgbWF0LXNuYWNrLWJhci10eXBvZ3JhcGh5KCRjb25maWcpO1xuICBAaW5jbHVkZSBtYXQtdHJlZS10eXBvZ3JhcGh5KCRjb25maWcpO1xufVxuXG5cbi8vIE1peGluIHRoYXQgcmVuZGVycyBhbGwgb2YgdGhlIGNvcmUgc3R5bGVzIHRoYXQgYXJlIG5vdCB0aGVtZS1kZXBlbmRlbnQuXG5AbWl4aW4gbWF0LWNvcmUoJHR5cG9ncmFwaHktY29uZmlnOiBudWxsKSB7XG4gIEBpbmNsdWRlIGFuZ3VsYXItbWF0ZXJpYWwtdHlwb2dyYXBoeSgkdHlwb2dyYXBoeS1jb25maWcpO1xuICBAaW5jbHVkZSBtYXQtcmlwcGxlKCk7XG4gIEBpbmNsdWRlIGNkay1hMTF5KCk7XG4gIEBpbmNsdWRlIGNkay1vdmVybGF5KCk7XG4gIEBpbmNsdWRlIGNkay10ZXh0LWZpZWxkKCk7XG59XG5cbi8vIE1peGluIHRoYXQgcmVuZGVycyBhbGwgb2YgdGhlIGNvcmUgc3R5bGVzIHRoYXQgZGVwZW5kIG9uIHRoZSB0aGVtZS5cbkBtaXhpbiBtYXQtY29yZS10aGVtZSgkdGhlbWUpIHtcbiAgQGluY2x1ZGUgbWF0LXJpcHBsZS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtb3B0aW9uLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1vcHRncm91cC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtcHNldWRvLWNoZWNrYm94LXRoZW1lKCR0aGVtZSk7XG5cbiAgLy8gUHJvdmlkZXMgZXh0ZXJuYWwgQ1NTIGNsYXNzZXMgZm9yIGVhY2ggZWxldmF0aW9uIHZhbHVlLiBFYWNoIENTUyBjbGFzcyBpcyBmb3JtYXR0ZWQgYXNcbiAgLy8gYG1hdC1lbGV2YXRpb24teiR6VmFsdWVgIHdoZXJlIGAkelZhbHVlYCBjb3JyZXNwb25kcyB0byB0aGUgei1zcGFjZSB0byB3aGljaCB0aGUgZWxlbWVudCBpc1xuICAvLyBlbGV2YXRlZC5cbiAgQGZvciAkelZhbHVlIGZyb20gMCB0aHJvdWdoIDI0IHtcbiAgICAuI3skX21hdC1lbGV2YXRpb24tcHJlZml4fSN7JHpWYWx1ZX0ge1xuICAgICAgQGluY2x1ZGUgX21hdC10aGVtZS1lbGV2YXRpb24oJHpWYWx1ZSwgJHRoZW1lKTtcbiAgICB9XG4gIH1cblxuICAvLyBXcmFwcGVyIGVsZW1lbnQgdGhhdCBwcm92aWRlcyB0aGUgdGhlbWUgYmFja2dyb3VuZCB3aGVuIHRoZSB1c2VyJ3MgY29udGVudCBpc24ndFxuICAvLyBpbnNpZGUgb2YgYSBgbWF0LXNpZGVuYXYtY29udGFpbmVyYC4gTm90ZSB0aGF0IHdlIG5lZWQgdG8gZXhjbHVkZSB0aGUgYW1wZXJzYW5kXG4gIC8vIHNlbGVjdG9yIGluIGNhc2UgdGhlIG1peGluIGlzIGluY2x1ZGVkIGF0IHRoZSB0b3AgbGV2ZWwuXG4gIC5tYXQtYXBwLWJhY2tncm91bmQje2lmKCYsICcsICYubWF0LWFwcC1iYWNrZ3JvdW5kJywgJycpfSB7XG4gICAgJGJhY2tncm91bmQ6IG1hcC1nZXQoJHRoZW1lLCBiYWNrZ3JvdW5kKTtcbiAgICAkZm9yZWdyb3VuZDogbWFwLWdldCgkdGhlbWUsIGZvcmVncm91bmQpO1xuXG4gICAgYmFja2dyb3VuZC1jb2xvcjogbWF0LWNvbG9yKCRiYWNrZ3JvdW5kLCBiYWNrZ3JvdW5kKTtcbiAgICBjb2xvcjogbWF0LWNvbG9yKCRmb3JlZ3JvdW5kLCB0ZXh0KTtcbiAgfVxuXG4gIC8vIE1hcmtlciB0aGF0IGlzIHVzZWQgdG8gZGV0ZXJtaW5lIHdoZXRoZXIgdGhlIHVzZXIgaGFzIGFkZGVkIGEgdGhlbWUgdG8gdGhlaXIgcGFnZS5cbiAgQGF0LXJvb3Qge1xuICAgIC5tYXQtdGhlbWUtbG9hZGVkLW1hcmtlciB7XG4gICAgICBkaXNwbGF5OiBub25lO1xuICAgIH1cbiAgfVxufVxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5AbWl4aW4gbWF0LWRpdmlkZXItdGhlbWUoJHRoZW1lKSB7XG4gICRmb3JlZ3JvdW5kOiBtYXAtZ2V0KCR0aGVtZSwgZm9yZWdyb3VuZCk7XG5cbiAgLm1hdC1kaXZpZGVyIHtcbiAgICBib3JkZXItdG9wLWNvbG9yOiBtYXQtY29sb3IoJGZvcmVncm91bmQsIGRpdmlkZXIpO1xuICB9XG5cbiAgLm1hdC1kaXZpZGVyLXZlcnRpY2FsIHtcbiAgICBib3JkZXItcmlnaHQtY29sb3I6IG1hdC1jb2xvcigkZm9yZWdyb3VuZCwgZGl2aWRlcik7XG4gIH1cbn1cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuXG5cblxuLy8gQ3JlYXRlIGEgdGhlbWUuXG5AbWl4aW4gYW5ndWxhci1tYXRlcmlhbC10aGVtZSgkdGhlbWUpIHtcbiAgQGluY2x1ZGUgbWF0LWNvcmUtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWF1dG9jb21wbGV0ZS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtYmFkZ2UtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWJvdHRvbS1zaGVldC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtYnV0dG9uLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1idXR0b24tdG9nZ2xlLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1jYXJkLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1jaGVja2JveC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtY2hpcHMtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXRhYmxlLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1kYXRlcGlja2VyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1kaWFsb2ctdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWRpdmlkZXItdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LWV4cGFuc2lvbi1wYW5lbC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtZm9ybS1maWVsZC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtZ3JpZC1saXN0LXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1pY29uLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1pbnB1dC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtbGlzdC10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtbWVudS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtcGFnaW5hdG9yLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1wcm9ncmVzcy1iYXItdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXByb2dyZXNzLXNwaW5uZXItdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXJhZGlvLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zZWxlY3QtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXNpZGVuYXYtdGhlbWUoJHRoZW1lKTtcbiAgQGluY2x1ZGUgbWF0LXNsaWRlLXRvZ2dsZS10aGVtZSgkdGhlbWUpO1xuICBAaW5jbHVkZSBtYXQtc2xpZGVyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zdGVwcGVyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zb3J0LXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10YWJzLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10b29sYmFyLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10b29sdGlwLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC10cmVlLXRoZW1lKCR0aGVtZSk7XG4gIEBpbmNsdWRlIG1hdC1zbmFjay1iYXItdGhlbWUoJHRoZW1lKTtcbn1cbiIsIi8qIFRoZW1lIGZvciB0aGUgcmlwcGxlIGVsZW1lbnRzLiovXG4vKiBzdHlsZWxpbnQtZGlzYWJsZSBtYXRlcmlhbC9uby1wcmVmaXhlcyAqL1xuLyogc3R5bGVsaW50LWVuYWJsZSAqL1xuLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtYmFkZ2Utc21hbGwgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgZm9udC1zaXplOiA5cHg7XG59XG5cbi5tYXQtYmFkZ2UtbGFyZ2UgLm1hdC1iYWRnZS1jb250ZW50IHtcbiAgZm9udC1zaXplOiAyNHB4O1xufVxuXG4ubWF0LWgxLCAubWF0LWhlYWRsaW5lLCAubWF0LXR5cG9ncmFwaHkgaDEge1xuICBmb250OiA0MDAgMjRweC8zMnB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBtYXJnaW46IDAgMCAxNnB4O1xufVxuXG4ubWF0LWgyLCAubWF0LXRpdGxlLCAubWF0LXR5cG9ncmFwaHkgaDIge1xuICBmb250OiA1MDAgMjBweC8zMnB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBtYXJnaW46IDAgMCAxNnB4O1xufVxuXG4ubWF0LWgzLCAubWF0LXN1YmhlYWRpbmctMiwgLm1hdC10eXBvZ3JhcGh5IGgzIHtcbiAgZm9udDogNDAwIDE2cHgvMjhweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgbWFyZ2luOiAwIDAgMTZweDtcbn1cblxuLm1hdC1oNCwgLm1hdC1zdWJoZWFkaW5nLTEsIC5tYXQtdHlwb2dyYXBoeSBoNCB7XG4gIGZvbnQ6IDQwMCAxNXB4LzI0cHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIG1hcmdpbjogMCAwIDE2cHg7XG59XG5cbi5tYXQtaDUsIC5tYXQtdHlwb2dyYXBoeSBoNSB7XG4gIGZvbnQ6IDQwMCAxMS42MnB4LzIwcHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIG1hcmdpbjogMCAwIDEycHg7XG59XG5cbi5tYXQtaDYsIC5tYXQtdHlwb2dyYXBoeSBoNiB7XG4gIGZvbnQ6IDQwMCA5LjM4cHgvMjBweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgbWFyZ2luOiAwIDAgMTJweDtcbn1cblxuLm1hdC1ib2R5LXN0cm9uZywgLm1hdC1ib2R5LTIge1xuICBmb250OiA1MDAgMTRweC8yNHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xufVxuXG4ubWF0LWJvZHksIC5tYXQtYm9keS0xLCAubWF0LXR5cG9ncmFwaHkge1xuICBmb250OiA0MDAgMTRweC8yMHB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xufVxuLm1hdC1ib2R5IHAsIC5tYXQtYm9keS0xIHAsIC5tYXQtdHlwb2dyYXBoeSBwIHtcbiAgbWFyZ2luOiAwIDAgMTJweDtcbn1cblxuLm1hdC1zbWFsbCwgLm1hdC1jYXB0aW9uIHtcbiAgZm9udDogNDAwIDEycHgvMjBweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1kaXNwbGF5LTQsIC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktNCB7XG4gIGZvbnQ6IDMwMCAxMTJweC8xMTJweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgbGV0dGVyLXNwYWNpbmc6IC0wLjA1ZW07XG4gIG1hcmdpbjogMCAwIDU2cHg7XG59XG5cbi5tYXQtZGlzcGxheS0zLCAubWF0LXR5cG9ncmFwaHkgLm1hdC1kaXNwbGF5LTMge1xuICBmb250OiA0MDAgNTZweC81NnB4IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBsZXR0ZXItc3BhY2luZzogLTAuMDJlbTtcbiAgbWFyZ2luOiAwIDAgNjRweDtcbn1cblxuLm1hdC1kaXNwbGF5LTIsIC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktMiB7XG4gIGZvbnQ6IDQwMCA0NXB4LzQ4cHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIGxldHRlci1zcGFjaW5nOiAtMC4wMDVlbTtcbiAgbWFyZ2luOiAwIDAgNjRweDtcbn1cblxuLm1hdC1kaXNwbGF5LTEsIC5tYXQtdHlwb2dyYXBoeSAubWF0LWRpc3BsYXktMSB7XG4gIGZvbnQ6IDQwMCAzNHB4LzQwcHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIG1hcmdpbjogMCAwIDY0cHg7XG59XG5cbi5tYXQtYm90dG9tLXNoZWV0LWNvbnRhaW5lciB7XG4gIGZvbnQ6IDQwMCAxNHB4LzIwcHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtYnV0dG9uLCAubWF0LXJhaXNlZC1idXR0b24sIC5tYXQtaWNvbi1idXR0b24sIC5tYXQtc3Ryb2tlZC1idXR0b24sXG4ubWF0LWZsYXQtYnV0dG9uLCAubWF0LWZhYiwgLm1hdC1taW5pLWZhYiB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ubWF0LWJ1dHRvbi10b2dnbGUge1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtY2FyZCB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1jYXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAyNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ubWF0LWNhcmQtaGVhZGVyIC5tYXQtY2FyZC10aXRsZSB7XG4gIGZvbnQtc2l6ZTogMjBweDtcbn1cblxuLm1hdC1jYXJkLXN1YnRpdGxlLFxuLm1hdC1jYXJkLWNvbnRlbnQge1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5tYXQtY2hlY2tib3gge1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtY2hlY2tib3gtbGF5b3V0IC5tYXQtY2hlY2tib3gtbGFiZWwge1xuICBsaW5lLWhlaWdodDogMjRweDtcbn1cblxuLm1hdC1jaGlwIHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuLm1hdC1jaGlwIC5tYXQtY2hpcC10cmFpbGluZy1pY29uLm1hdC1pY29uLFxuLm1hdC1jaGlwIC5tYXQtY2hpcC1yZW1vdmUubWF0LWljb24ge1xuICBmb250LXNpemU6IDE4cHg7XG59XG5cbi5tYXQtdGFibGUge1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtaGVhZGVyLWNlbGwge1xuICBmb250LXNpemU6IDEycHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5tYXQtY2VsbCwgLm1hdC1mb290ZXItY2VsbCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cblxuLm1hdC1jYWxlbmRhciB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1jYWxlbmRhci1ib2R5IHtcbiAgZm9udC1zaXplOiAxM3B4O1xufVxuXG4ubWF0LWNhbGVuZGFyLWJvZHktbGFiZWwsXG4ubWF0LWNhbGVuZGFyLXBlcmlvZC1idXR0b24ge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5tYXQtY2FsZW5kYXItdGFibGUtaGVhZGVyIHRoIHtcbiAgZm9udC1zaXplOiAxMXB4O1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4ubWF0LWRpYWxvZy10aXRsZSB7XG4gIGZvbnQ6IDUwMCAyMHB4LzMycHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtZXhwYW5zaW9uLXBhbmVsLWhlYWRlciB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNXB4O1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4ubWF0LWV4cGFuc2lvbi1wYW5lbC1jb250ZW50IHtcbiAgZm9udDogNDAwIDE0cHgvMjBweCBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1mb3JtLWZpZWxkIHtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBmb250LXdlaWdodDogNDAwO1xuICBsaW5lLWhlaWdodDogMS4xMjU7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1mb3JtLWZpZWxkLXdyYXBwZXIge1xuICBwYWRkaW5nLWJvdHRvbTogMS4zNDM3NWVtO1xufVxuXG4ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbixcbi5tYXQtZm9ybS1maWVsZC1zdWZmaXggLm1hdC1pY29uIHtcbiAgZm9udC1zaXplOiAxNTAlO1xuICBsaW5lLWhlaWdodDogMS4xMjU7XG59XG4ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbi1idXR0b24sXG4ubWF0LWZvcm0tZmllbGQtc3VmZml4IC5tYXQtaWNvbi1idXR0b24ge1xuICBoZWlnaHQ6IDEuNWVtO1xuICB3aWR0aDogMS41ZW07XG59XG4ubWF0LWZvcm0tZmllbGQtcHJlZml4IC5tYXQtaWNvbi1idXR0b24gLm1hdC1pY29uLFxuLm1hdC1mb3JtLWZpZWxkLXN1ZmZpeCAubWF0LWljb24tYnV0dG9uIC5tYXQtaWNvbiB7XG4gIGhlaWdodDogMS4xMjVlbTtcbiAgbGluZS1oZWlnaHQ6IDEuMTI1O1xufVxuXG4ubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICBwYWRkaW5nOiAwLjVlbSAwO1xuICBib3JkZXItdG9wOiAwLjg0Mzc1ZW0gc29saWQgdHJhbnNwYXJlbnQ7XG59XG5cbi5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCxcbi5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMzQzNzVlbSkgc2NhbGUoMC43NSk7XG4gIHdpZHRoOiAxMzMuMzMzMzMzMzMzMyU7XG59XG4ubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4zNDM3NGVtKSBzY2FsZSgwLjc1KTtcbiAgd2lkdGg6IDEzMy4zMzMzNDMzMzMzJTtcbn1cblxuLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIge1xuICB0b3A6IC0wLjg0Mzc1ZW07XG4gIHBhZGRpbmctdG9wOiAwLjg0Mzc1ZW07XG59XG5cbi5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gIHRvcDogMS4zNDM3NWVtO1xufVxuXG4ubWF0LWZvcm0tZmllbGQtdW5kZXJsaW5lIHtcbiAgYm90dG9tOiAxLjM0Mzc1ZW07XG59XG5cbi5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlciB7XG4gIGZvbnQtc2l6ZTogNzUlO1xuICBtYXJnaW4tdG9wOiAwLjY2NjY2NjY2NjdlbTtcbiAgdG9wOiBjYWxjKDEwMCUgLSAxLjc5MTY2NjY2NjdlbSk7XG59XG5cbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeSAubWF0LWZvcm0tZmllbGQtd3JhcHBlciB7XG4gIHBhZGRpbmctYm90dG9tOiAxLjI1ZW07XG59XG4ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWluZml4IHtcbiAgcGFkZGluZzogMC40Mzc1ZW0gMDtcbn1cbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQubWF0LWZvcm0tZmllbGQtc2hvdWxkLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1sYWJlbCxcbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoMC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooMC4wMDFweCk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoMC43NSk7XG4gIHdpZHRoOiAxMzMuMzMzMzMzMzMzMyU7XG59XG4ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtZm9ybS1maWVsZC1hdXRvZmlsbC1jb250cm9sOi13ZWJraXQtYXV0b2ZpbGwgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjVlbSkgc2NhbGUoMC43NSkgcGVyc3BlY3RpdmUoMTAwcHgpIHRyYW5zbGF0ZVooMC4wMDEwMXB4KTtcbiAgLW1zLXRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMS4yODEyNGVtKSBzY2FsZSgwLjc1KTtcbiAgd2lkdGg6IDEzMy4zMzMzNDMzMzMzJTtcbn1cbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pICsgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTI1ZW0pIHNjYWxlKDAuNzUpIHBlcnNwZWN0aXZlKDEwMHB4KSB0cmFuc2xhdGVaKDAuMDAxMDJweCk7XG4gIC1tcy10cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMjNlbSkgc2NhbGUoMC43NSk7XG4gIHdpZHRoOiAxMzMuMzMzMzUzMzMzMyU7XG59XG4ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgdG9wOiAxLjI4MTI1ZW07XG59XG4ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1sZWdhY3kgLm1hdC1mb3JtLWZpZWxkLXVuZGVybGluZSB7XG4gIGJvdHRvbTogMS4yNWVtO1xufVxuLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5IC5tYXQtZm9ybS1maWVsZC1zdWJzY3JpcHQtd3JhcHBlciB7XG4gIG1hcmdpbi10b3A6IDAuNTQxNjY2NjY2N2VtO1xuICB0b3A6IGNhbGMoMTAwJSAtIDEuNjY2NjY2NjY2N2VtKTtcbn1cblxuQG1lZGlhIHByaW50IHtcbiAgLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtbGVnYWN5Lm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cyArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTIyZW0pIHNjYWxlKDAuNzUpO1xuICB9XG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWF1dG9maWxsLWNvbnRyb2w6LXdlYmtpdC1hdXRvZmlsbCArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gICAgdHJhbnNmb3JtOiB0cmFuc2xhdGVZKC0xLjI4MTIxZW0pIHNjYWxlKDAuNzUpO1xuICB9XG4gIC5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWxlZ2FjeS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXJbbGFiZWxdOm5vdCg6bGFiZWwtc2hvd24pICsgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLXdyYXBwZXIgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuMjgxMmVtKSBzY2FsZSgwLjc1KTtcbiAgfVxufVxuLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2UtZmlsbCAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICBwYWRkaW5nOiAwLjI1ZW0gMCAwLjc1ZW0gMDtcbn1cbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgdG9wOiAxLjA5Mzc1ZW07XG4gIG1hcmdpbi10b3A6IC0wLjVlbTtcbn1cbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0Lm1hdC1mb3JtLWZpZWxkLXNob3VsZC1mbG9hdCAubWF0LWZvcm0tZmllbGQtbGFiZWwsXG4ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1maWxsLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcjpmb2N1cyArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC41OTM3NWVtKSBzY2FsZSgwLjc1KTtcbiAgd2lkdGg6IDEzMy4zMzMzMzMzMzMzJTtcbn1cbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLWZpbGwubWF0LWZvcm0tZmllbGQtY2FuLWZsb2F0IC5tYXQtaW5wdXQtc2VydmVyW2xhYmVsXTpub3QoOmxhYmVsLXNob3duKSArIC5tYXQtZm9ybS1maWVsZC1sYWJlbC13cmFwcGVyIC5tYXQtZm9ybS1maWVsZC1sYWJlbCB7XG4gIHRyYW5zZm9ybTogdHJhbnNsYXRlWSgtMC41OTM3NGVtKSBzY2FsZSgwLjc1KTtcbiAgd2lkdGg6IDEzMy4zMzMzNDMzMzMzJTtcbn1cblxuLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZSAubWF0LWZvcm0tZmllbGQtaW5maXgge1xuICBwYWRkaW5nOiAxZW0gMCAxZW0gMDtcbn1cbi5tYXQtZm9ybS1maWVsZC1hcHBlYXJhbmNlLW91dGxpbmUgLm1hdC1mb3JtLWZpZWxkLWxhYmVsIHtcbiAgdG9wOiAxLjg0Mzc1ZW07XG4gIG1hcmdpbi10b3A6IC0wLjI1ZW07XG59XG4ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdC5tYXQtZm9ybS1maWVsZC1zaG91bGQtZmxvYXQgLm1hdC1mb3JtLWZpZWxkLWxhYmVsLFxuLm1hdC1mb3JtLWZpZWxkLWFwcGVhcmFuY2Utb3V0bGluZS5tYXQtZm9ybS1maWVsZC1jYW4tZmxvYXQgLm1hdC1pbnB1dC1zZXJ2ZXI6Zm9jdXMgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuNTkzNzVlbSkgc2NhbGUoMC43NSk7XG4gIHdpZHRoOiAxMzMuMzMzMzMzMzMzMyU7XG59XG4ubWF0LWZvcm0tZmllbGQtYXBwZWFyYW5jZS1vdXRsaW5lLm1hdC1mb3JtLWZpZWxkLWNhbi1mbG9hdCAubWF0LWlucHV0LXNlcnZlcltsYWJlbF06bm90KDpsYWJlbC1zaG93bikgKyAubWF0LWZvcm0tZmllbGQtbGFiZWwtd3JhcHBlciAubWF0LWZvcm0tZmllbGQtbGFiZWwge1xuICB0cmFuc2Zvcm06IHRyYW5zbGF0ZVkoLTEuNTkzNzRlbSkgc2NhbGUoMC43NSk7XG4gIHdpZHRoOiAxMzMuMzMzMzQzMzMzMyU7XG59XG5cbi5tYXQtZ3JpZC10aWxlLWhlYWRlcixcbi5tYXQtZ3JpZC10aWxlLWZvb3RlciB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cbi5tYXQtZ3JpZC10aWxlLWhlYWRlciAubWF0LWxpbmUsXG4ubWF0LWdyaWQtdGlsZS1mb290ZXIgLm1hdC1saW5lIHtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xufVxuLm1hdC1ncmlkLXRpbGUtaGVhZGVyIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSxcbi5tYXQtZ3JpZC10aWxlLWZvb3RlciAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMikge1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbmlucHV0Lm1hdC1pbnB1dC1lbGVtZW50IHtcbiAgbWFyZ2luLXRvcDogLTAuMDYyNWVtO1xufVxuXG4ubWF0LW1lbnUtaXRlbSB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBmb250LXdlaWdodDogNDAwO1xufVxuXG4ubWF0LXBhZ2luYXRvcixcbi5tYXQtcGFnaW5hdG9yLXBhZ2Utc2l6ZSAubWF0LXNlbGVjdC10cmlnZ2VyIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDEycHg7XG59XG5cbi5tYXQtcmFkaW8tYnV0dG9uIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xufVxuXG4ubWF0LXNlbGVjdCB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1zZWxlY3QtdHJpZ2dlciB7XG4gIGhlaWdodDogMS4xMjVlbTtcbn1cblxuLm1hdC1zbGlkZS10b2dnbGUtY29udGVudCB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1zbGlkZXItdGh1bWItbGFiZWwtdGV4dCB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ubWF0LXN0ZXBwZXItdmVydGljYWwsIC5tYXQtc3RlcHBlci1ob3Jpem9udGFsIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xufVxuXG4ubWF0LXN0ZXAtbGFiZWwge1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA0MDA7XG59XG5cbi5tYXQtc3RlcC1zdWItbGFiZWwtZXJyb3Ige1xuICBmb250LXdlaWdodDogbm9ybWFsO1xufVxuXG4ubWF0LXN0ZXAtbGFiZWwtZXJyb3Ige1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5tYXQtc3RlcC1sYWJlbC1zZWxlY3RlZCB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLm1hdC10YWItZ3JvdXAge1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtdGFiLWxhYmVsLCAubWF0LXRhYi1saW5rIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5tYXQtdG9vbGJhcixcbi5tYXQtdG9vbGJhciBoMSxcbi5tYXQtdG9vbGJhciBoMixcbi5tYXQtdG9vbGJhciBoMyxcbi5tYXQtdG9vbGJhciBoNCxcbi5tYXQtdG9vbGJhciBoNSxcbi5tYXQtdG9vbGJhciBoNiB7XG4gIGZvbnQ6IDUwMCAyMHB4LzMycHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIG1hcmdpbjogMDtcbn1cblxuLm1hdC10b29sdGlwIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDEwcHg7XG4gIHBhZGRpbmctdG9wOiA2cHg7XG4gIHBhZGRpbmctYm90dG9tOiA2cHg7XG59XG5cbi5tYXQtdG9vbHRpcC1oYW5kc2V0IHtcbiAgZm9udC1zaXplOiAxNHB4O1xuICBwYWRkaW5nLXRvcDogOHB4O1xuICBwYWRkaW5nLWJvdHRvbTogOHB4O1xufVxuXG4ubWF0LWxpc3QtaXRlbSB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1saXN0LW9wdGlvbiB7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIFwiSGVsdmV0aWNhIE5ldWVcIiwgc2Fucy1zZXJpZjtcbn1cblxuLm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LWl0ZW0ge1xuICBmb250LXNpemU6IDE2cHg7XG59XG4ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMikge1xuICBmb250LXNpemU6IDE0cHg7XG59XG4ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9uIHtcbiAgZm9udC1zaXplOiAxNnB4O1xufVxuLm1hdC1saXN0LWJhc2UgLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4ubWF0LWxpc3QtYmFzZSAubWF0LWxpc3Qtb3B0aW9uIC5tYXQtbGluZTpudGgtY2hpbGQobisyKSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbn1cbi5tYXQtbGlzdC1iYXNlIC5tYXQtc3ViaGVhZGVyIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE0cHg7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbSB7XG4gIGZvbnQtc2l6ZTogMTJweDtcbn1cbi5tYXQtbGlzdC1iYXNlW2RlbnNlXSAubWF0LWxpc3QtaXRlbSAubWF0LWxpbmUge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LWl0ZW0gLm1hdC1saW5lOm50aC1jaGlsZChuKzIpIHtcbiAgZm9udC1zaXplOiAxMnB4O1xufVxuLm1hdC1saXN0LWJhc2VbZGVuc2VdIC5tYXQtbGlzdC1vcHRpb24ge1xuICBmb250LXNpemU6IDEycHg7XG59XG4ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmUge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgZGlzcGxheTogYmxvY2s7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG59XG4ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1saXN0LW9wdGlvbiAubWF0LWxpbmU6bnRoLWNoaWxkKG4rMikge1xuICBmb250LXNpemU6IDEycHg7XG59XG4ubWF0LWxpc3QtYmFzZVtkZW5zZV0gLm1hdC1zdWJoZWFkZXIge1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLm1hdC1vcHRpb24ge1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG4gIGZvbnQtc2l6ZTogMTZweDtcbn1cblxuLm1hdC1vcHRncm91cC1sYWJlbCB7XG4gIGZvbnQ6IDUwMCAxNHB4LzI0cHggUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtc2ltcGxlLXNuYWNrYmFyIHtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgXCJIZWx2ZXRpY2EgTmV1ZVwiLCBzYW5zLXNlcmlmO1xuICBmb250LXNpemU6IDE0cHg7XG59XG5cbi5tYXQtc2ltcGxlLXNuYWNrYmFyLWFjdGlvbiB7XG4gIGxpbmUtaGVpZ2h0OiAxO1xuICBmb250LWZhbWlseTogaW5oZXJpdDtcbiAgZm9udC1zaXplOiBpbmhlcml0O1xuICBmb250LXdlaWdodDogNTAwO1xufVxuXG4ubWF0LXRyZWUge1xuICBmb250LWZhbWlseTogUm9ib3RvLCBcIkhlbHZldGljYSBOZXVlXCIsIHNhbnMtc2VyaWY7XG59XG5cbi5tYXQtdHJlZS1ub2RlLFxuLm1hdC1uZXN0ZWQtdHJlZS1ub2RlIHtcbiAgZm9udC13ZWlnaHQ6IDQwMDtcbiAgZm9udC1zaXplOiAxNHB4O1xufVxuXG4ubWF0LXJpcHBsZSB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHBvc2l0aW9uOiByZWxhdGl2ZTtcbn1cblxuLm1hdC1yaXBwbGUubWF0LXJpcHBsZS11bmJvdW5kZWQge1xuICBvdmVyZmxvdzogdmlzaWJsZTtcbn1cblxuLm1hdC1yaXBwbGUtZWxlbWVudCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgYm9yZGVyLXJhZGl1czogNTAlO1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSwgdHJhbnNmb3JtIDBtcyBjdWJpYy1iZXppZXIoMCwgMCwgMC4yLCAxKTtcbiAgdHJhbnNmb3JtOiBzY2FsZSgwKTtcbn1cbkBtZWRpYSAoLW1zLWhpZ2gtY29udHJhc3Q6IGFjdGl2ZSkge1xuICAubWF0LXJpcHBsZS1lbGVtZW50IHtcbiAgICBkaXNwbGF5OiBub25lO1xuICB9XG59XG5cbi5jZGstdmlzdWFsbHktaGlkZGVuIHtcbiAgYm9yZGVyOiAwO1xuICBjbGlwOiByZWN0KDAgMCAwIDApO1xuICBoZWlnaHQ6IDFweDtcbiAgbWFyZ2luOiAtMXB4O1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBwYWRkaW5nOiAwO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHdpZHRoOiAxcHg7XG4gIG91dGxpbmU6IDA7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgLW1vei1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4uY2RrLW92ZXJsYXktY29udGFpbmVyLCAuY2RrLWdsb2JhbC1vdmVybGF5LXdyYXBwZXIge1xuICBwb2ludGVyLWV2ZW50czogbm9uZTtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4uY2RrLW92ZXJsYXktY29udGFpbmVyIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB6LWluZGV4OiAxMDAwO1xufVxuLmNkay1vdmVybGF5LWNvbnRhaW5lcjplbXB0eSB7XG4gIGRpc3BsYXk6IG5vbmU7XG59XG5cbi5jZGstZ2xvYmFsLW92ZXJsYXktd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgei1pbmRleDogMTAwMDtcbn1cblxuLmNkay1vdmVybGF5LXBhbmUge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHBvaW50ZXItZXZlbnRzOiBhdXRvO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICB6LWluZGV4OiAxMDAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXgtd2lkdGg6IDEwMCU7XG4gIG1heC1oZWlnaHQ6IDEwMCU7XG59XG5cbi5jZGstb3ZlcmxheS1iYWNrZHJvcCB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIGxlZnQ6IDA7XG4gIHJpZ2h0OiAwO1xuICB6LWluZGV4OiAxMDAwO1xuICBwb2ludGVyLWV2ZW50czogYXV0bztcbiAgLXdlYmtpdC10YXAtaGlnaGxpZ2h0LWNvbG9yOiB0cmFuc3BhcmVudDtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSA0MDBtcyBjdWJpYy1iZXppZXIoMC4yNSwgMC44LCAwLjI1LCAxKTtcbiAgb3BhY2l0eTogMDtcbn1cbi5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5nIHtcbiAgb3BhY2l0eTogMTtcbn1cbkBtZWRpYSBzY3JlZW4gYW5kICgtbXMtaGlnaC1jb250cmFzdDogYWN0aXZlKSB7XG4gIC5jZGstb3ZlcmxheS1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5nIHtcbiAgICBvcGFjaXR5OiAwLjY7XG4gIH1cbn1cblxuLmNkay1vdmVybGF5LWRhcmstYmFja2Ryb3Age1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMzIpO1xufVxuXG4uY2RrLW92ZXJsYXktdHJhbnNwYXJlbnQtYmFja2Ryb3AsIC5jZGstb3ZlcmxheS10cmFuc3BhcmVudC1iYWNrZHJvcC5jZGstb3ZlcmxheS1iYWNrZHJvcC1zaG93aW5nIHtcbiAgb3BhY2l0eTogMDtcbn1cblxuLmNkay1vdmVybGF5LWNvbm5lY3RlZC1wb3NpdGlvbi1ib3VuZGluZy1ib3gge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHotaW5kZXg6IDEwMDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIG1pbi13aWR0aDogMXB4O1xuICBtaW4taGVpZ2h0OiAxcHg7XG59XG5cbi5jZGstZ2xvYmFsLXNjcm9sbGJsb2NrIHtcbiAgcG9zaXRpb246IGZpeGVkO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuXG5Aa2V5ZnJhbWVzIGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLXN0YXJ0IHtcbiAgLyohKi9cbn1cbkBrZXlmcmFtZXMgY2RrLXRleHQtZmllbGQtYXV0b2ZpbGwtZW5kIHtcbiAgLyohKi9cbn1cbi5jZGstdGV4dC1maWVsZC1hdXRvZmlsbC1tb25pdG9yZWQ6LXdlYmtpdC1hdXRvZmlsbCB7XG4gIGFuaW1hdGlvbi1uYW1lOiBjZGstdGV4dC1maWVsZC1hdXRvZmlsbC1zdGFydDtcbn1cblxuLmNkay10ZXh0LWZpZWxkLWF1dG9maWxsLW1vbml0b3JlZDpub3QoOi13ZWJraXQtYXV0b2ZpbGwpIHtcbiAgYW5pbWF0aW9uLW5hbWU6IGNkay10ZXh0LWZpZWxkLWF1dG9maWxsLWVuZDtcbn1cblxudGV4dGFyZWEuY2RrLXRleHRhcmVhLWF1dG9zaXplIHtcbiAgcmVzaXplOiBub25lO1xufVxuXG50ZXh0YXJlYS5jZGstdGV4dGFyZWEtYXV0b3NpemUtbWVhc3VyaW5nIHtcbiAgaGVpZ2h0OiBhdXRvICFpbXBvcnRhbnQ7XG4gIG92ZXJmbG93OiBoaWRkZW4gIWltcG9ydGFudDtcbiAgcGFkZGluZzogMnB4IDAgIWltcG9ydGFudDtcbiAgYm94LXNpemluZzogY29udGVudC1ib3ggIWltcG9ydGFudDtcbn1cblxuOmhvc3Qge1xuICBkaXNwbGF5OiBibG9jaztcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbn1cblxuLnRvb2xiYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiA2cmVtO1xuICB6LWluZGV4OiA4MDA7XG4gIGZvbnQtc2l6ZTogMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuOXJlbTtcbn1cblxuLm1haW4tYXBwLWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmdhbWUtY29udGFpbmVyIHtcbiAgZmxleDogMTtcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cblxuLm5hdmJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBoZWlnaHQ6IDdyZW07XG4gIHotaW5kZXg6IDgwMDtcbiAgYmFja2dyb3VuZDogI2ZmZjtcbiAgZm9udC1zaXplOiAxcmVtO1xuICBsaW5lLWhlaWdodDogMS42cmVtO1xufVxuLm5hdmJhciBhIHtcbiAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cbi5uYXZiYXIgYS5hY3RpdmUge1xuICBjb2xvcjogIzNmNTFiNTtcbn1cblxuLm5hdi1pdGVtIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn0iLCJAaW1wb3J0IFwifkBhbmd1bGFyL21hdGVyaWFsL3RoZW1pbmdcIjtcblxuQGluY2x1ZGUgbWF0LWNvcmUoKTtcblxuLy8gRGVmaW5lIHlvdXIgYXBwbGljYXRpb24ncyBjdXN0b20gdGhlbWUuXG4kcHJpbWFyeTogbWF0LXBhbGV0dGUoJG1hdC1pbmRpZ28pO1xuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xufVxuXG4udG9vbGJhciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDZyZW07XG4gIHotaW5kZXg6IDgwMDtcbiAgZm9udC1zaXplOiAycmVtO1xuICBsaW5lLWhlaWdodDogMS45cmVtO1xufVxuXG4ubWFpbi1hcHAtY29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4uZ2FtZS1jb250YWluZXIge1xuICBmbGV4OiAxO1xuICB3aWR0aDogMTAwJTtcbiAgb3ZlcmZsb3cteTogc2Nyb2xsO1xufVxuXG4ubmF2YmFyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGhlaWdodDogN3JlbTtcbiAgei1pbmRleDogODAwO1xuICBiYWNrZ3JvdW5kOiAjZmZmO1xuICBmb250LXNpemU6IDFyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjZyZW07XG5cbiAgYSB7XG4gICAgdGV4dC1kZWNvcmF0aW9uOiBub25lO1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuXG4gICAgJi5hY3RpdmUge1xuICAgICAgY29sb3I6IG1hdC1jb2xvcigkcHJpbWFyeSk7XG4gICAgfVxuICB9XG59XG5cbi5uYXYtaXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG4iXX0= */"

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
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./history/history.component */ "./src/app/history/history.component.ts");
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./account/account.component */ "./src/app/account/account.component.ts");








var AppComponent = /** @class */ (function () {
    function AppComponent(notificationService, dialog) {
        this.notificationService = notificationService;
        this.dialog = dialog;
        this.showHeader = true;
        this.showToolbar = true;
    }
    AppComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.notificationService.$popup
            .subscribe(function (data) { return _this.dialog.open(_perx_core__WEBPACK_IMPORTED_MODULE_3__["PopupComponent"], { data: data }); });
    };
    AppComponent.prototype.onActivate = function (ref) {
        this.showHeader = !(ref instanceof _login_login_component__WEBPACK_IMPORTED_MODULE_4__["LoginComponent"]);
        this.showToolbar = ref instanceof _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"] ||
            ref instanceof _history_history_component__WEBPACK_IMPORTED_MODULE_6__["HistoryComponent"] ||
            ref instanceof _account_account_component__WEBPACK_IMPORTED_MODULE_7__["AccountComponent"];
    };
    AppComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-root',
            template: __webpack_require__(/*! raw-loader!./app.component.html */ "../../node_modules/raw-loader/index.js!./src/app/app.component.html"),
            styles: [__webpack_require__(/*! ./app.component.scss */ "./src/app/app.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_2__["MatDialog"]])
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
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/platform-browser */ "../../node_modules/@angular/platform-browser/fesm5/platform-browser.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/platform-browser/animations */ "../../node_modules/@angular/platform-browser/fesm5/animations.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");
/* harmony import */ var _app_routing_module__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./app-routing.module */ "./src/app/app-routing.module.ts");
/* harmony import */ var _app_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./app.component */ "./src/app/app.component.ts");
/* harmony import */ var _login_login_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./login/login.component */ "./src/app/login/login.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home.component.ts");
/* harmony import */ var _redeem_redeem_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./redeem/redeem.component */ "./src/app/redeem/redeem.component.ts");
/* harmony import */ var _environments_environment__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ../environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _loading_loading_component__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! ./loading/loading.component */ "./src/app/loading/loading.component.ts");
/* harmony import */ var _voucher_detail_voucher_detail_component__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./voucher-detail/voucher-detail.component */ "./src/app/voucher-detail/voucher-detail.component.ts");
/* harmony import */ var _account_account_component__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! ./account/account.component */ "./src/app/account/account.component.ts");
/* harmony import */ var _history_history_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./history/history.component */ "./src/app/history/history.component.ts");
/* harmony import */ var _mock_rewards_mock__WEBPACK_IMPORTED_MODULE_19__ = __webpack_require__(/*! ./mock/rewards.mock */ "./src/app/mock/rewards.mock.ts");
/* harmony import */ var _mock_vouchers_mock__WEBPACK_IMPORTED_MODULE_20__ = __webpack_require__(/*! ./mock/vouchers.mock */ "./src/app/mock/vouchers.mock.ts");
/* harmony import */ var _mock_catalogs_mock__WEBPACK_IMPORTED_MODULE_21__ = __webpack_require__(/*! ./mock/catalogs.mock */ "./src/app/mock/catalogs.mock.ts");
/* harmony import */ var _mock_campaigns_mock__WEBPACK_IMPORTED_MODULE_22__ = __webpack_require__(/*! ./mock/campaigns.mock */ "./src/app/mock/campaigns.mock.ts");
/* harmony import */ var _mock_profile_mock__WEBPACK_IMPORTED_MODULE_23__ = __webpack_require__(/*! ./mock/profile.mock */ "./src/app/mock/profile.mock.ts");
























var rewardsServiceStub = {
    getReward: function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_mock_rewards_mock__WEBPACK_IMPORTED_MODULE_19__["rewards"][0]); },
    getAllRewards: function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_mock_rewards_mock__WEBPACK_IMPORTED_MODULE_19__["rewards"]); },
    getAllCatalogs: function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_mock_catalogs_mock__WEBPACK_IMPORTED_MODULE_21__["catalogs"]); },
    getCatalog: function (id) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_mock_catalogs_mock__WEBPACK_IMPORTED_MODULE_21__["catalogs"].filter(function (catalog) { return catalog.id === id; })); },
    reserveReward: function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_mock_vouchers_mock__WEBPACK_IMPORTED_MODULE_20__["vouchers"][1]); }
};
var vouchersServiceStub = {
    getAll: function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_mock_vouchers_mock__WEBPACK_IMPORTED_MODULE_20__["vouchers"]); },
    get: function (id) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_mock_vouchers_mock__WEBPACK_IMPORTED_MODULE_20__["vouchers"].filter(function (voucher) { return voucher.id === id; })); }
};
var campaignServiceStub = {
    getCampaigns: function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_mock_campaigns_mock__WEBPACK_IMPORTED_MODULE_22__["campaigns"]); },
    getCampaign: function (id) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["from"])(_mock_campaigns_mock__WEBPACK_IMPORTED_MODULE_22__["campaigns"].filter(function (campaign) { return campaign.id === id; })); }
};
var authenticationServiceStub = {
    login: function (username, password) {
        if (username === 'perx' && password === '1234') {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(true);
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["throwError"])(new _angular_common_http__WEBPACK_IMPORTED_MODULE_7__["HttpErrorResponse"]({ status: 401 }));
    },
    logout: function () { }
};
var profileServiceStub = {
    whoAmI: function () { return Object(rxjs__WEBPACK_IMPORTED_MODULE_1__["of"])(_mock_profile_mock__WEBPACK_IMPORTED_MODULE_23__["profile"]); }
};
var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["NgModule"])({
            declarations: [
                _app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"],
                _login_login_component__WEBPACK_IMPORTED_MODULE_10__["LoginComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_11__["HomeComponent"],
                _redeem_redeem_component__WEBPACK_IMPORTED_MODULE_12__["RedeemComponent"],
                _loading_loading_component__WEBPACK_IMPORTED_MODULE_15__["LoadingComponent"],
                _voucher_detail_voucher_detail_component__WEBPACK_IMPORTED_MODULE_16__["VoucherDetailComponent"],
                _account_account_component__WEBPACK_IMPORTED_MODULE_17__["AccountComponent"],
                _history_history_component__WEBPACK_IMPORTED_MODULE_18__["HistoryComponent"]
            ],
            imports: [
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["ConfigModule"].forRoot(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, _environments_environment__WEBPACK_IMPORTED_MODULE_13__["environment"])),
                _angular_platform_browser__WEBPACK_IMPORTED_MODULE_2__["BrowserModule"],
                _app_routing_module__WEBPACK_IMPORTED_MODULE_8__["AppRoutingModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["PerxCoreModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["VouchersModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["AuthenticationModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["GameModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["ProfileModule"],
                _angular_platform_browser_animations__WEBPACK_IMPORTED_MODULE_4__["BrowserAnimationsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatFormFieldModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatInputModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressSpinnerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDialogModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_14__["ReactiveFormsModule"],
                _angular_forms__WEBPACK_IMPORTED_MODULE_14__["FormsModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_5__["UtilsModule"]
            ],
            providers: [
                { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["RewardsService"], useValue: rewardsServiceStub },
                { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["IVoucherService"], useValue: vouchersServiceStub },
                { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["ICampaignService"], useValue: campaignServiceStub },
                { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["AuthenticationService"], useValue: authenticationServiceStub },
                { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["ProfileService"], useValue: profileServiceStub }
            ],
            bootstrap: [_app_component__WEBPACK_IMPORTED_MODULE_9__["AppComponent"]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "./src/app/history/history.component.scss":
/*!************************************************!*\
  !*** ./src/app/history/history.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "h1 {\n  padding: 0.8rem 0 0;\n  margin: 0;\n  display: -webkit-flex;\n  display: flex;\n  font-size: 2rem;\n  font-style: normal;\n  font-weight: 500;\n}\n\n.tab-group__content {\n  padding: 0 1.6rem;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: flex;\n  min-height: calc(100vh - 108px);\n}\n\n.tab-group__content > h1:first-child {\n  padding-top: 2rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvaGlzdG9yeS9oaXN0b3J5LmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9oaXN0b3J5L2hpc3RvcnkuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtFQUFBLGFBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQ0NGOztBREVBO0VBQ0UsaUJBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUFBLGFBQUE7RUFDQSwrQkFBQTtBQ0NGOztBRENFO0VBQ0UsaUJBQUE7QUNDSiIsImZpbGUiOiJzcmMvYXBwL2hpc3RvcnkvaGlzdG9yeS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbImgxIHtcbiAgcGFkZGluZzogMC44cmVtIDAgMDtcbiAgbWFyZ2luOiAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmb250LXNpemU6IDJyZW07XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbn1cblxuLnRhYi1ncm91cF9fY29udGVudCB7XG4gIHBhZGRpbmc6IDAgMS42cmVtO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTA4cHgpO1xuXG4gID4gaDE6Zmlyc3QtY2hpbGQge1xuICAgIHBhZGRpbmctdG9wOiAycmVtO1xuICB9XG59XG4iLCJoMSB7XG4gIHBhZGRpbmc6IDAuOHJlbSAwIDA7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi50YWItZ3JvdXBfX2NvbnRlbnQge1xuICBwYWRkaW5nOiAwIDEuNnJlbTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDEwOHB4KTtcbn1cbi50YWItZ3JvdXBfX2NvbnRlbnQgPiBoMTpmaXJzdC1jaGlsZCB7XG4gIHBhZGRpbmctdG9wOiAycmVtO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/history/history.component.ts":
/*!**********************************************!*\
  !*** ./src/app/history/history.component.ts ***!
  \**********************************************/
/*! exports provided: HistoryComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HistoryComponent", function() { return HistoryComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");



var HistoryComponent = /** @class */ (function () {
    function HistoryComponent(vouchersService) {
        this.vouchersService = vouchersService;
    }
    HistoryComponent.prototype.ngOnInit = function () {
        this.vouchers$ = this.vouchersService.getAll();
        this.filter = [_perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].redeemed, _perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].expired];
    };
    HistoryComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-history',
            template: __webpack_require__(/*! raw-loader!./history.component.html */ "../../node_modules/raw-loader/index.js!./src/app/history/history.component.html"),
            styles: [__webpack_require__(/*! ./history.component.scss */ "./src/app/history/history.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"]])
    ], HistoryComponent);
    return HistoryComponent;
}());



/***/ }),

/***/ "./src/app/home/home.component.scss":
/*!******************************************!*\
  !*** ./src/app/home/home.component.scss ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  margin: 0.4rem 0;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-align-items: center;\n          align-items: center;\n  padding: 0;\n  height: 3.5rem;\n  -webkit-flex: 0 0 7.5rem;\n          flex: 0 0 7.5rem;\n  -webkit-justify-content: space-between;\n          justify-content: space-between;\n}\n\nh1 {\n  padding: 0.8rem 0 0;\n  margin: 0;\n  display: -webkit-flex;\n  display: flex;\n  font-size: 2rem;\n  font-style: normal;\n  font-weight: 500;\n}\n\n.tab-group__content {\n  padding: 0 1.6rem;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  box-sizing: border-box;\n  display: -webkit-flex;\n  display: flex;\n  min-height: calc(100vh - 108px);\n}\n\n.tab-group__content > h1:first-child {\n  padding-top: 2rem;\n}\n\n.puzzle-content {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-basis: auto;\n          flex-basis: auto;\n  -webkit-flex-grow: 1;\n          flex-grow: 1;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n}\n\n.puzzle-content .puzzle-img__wrapper {\n  -webkit-flex: 0 0 7.5rem;\n          flex: 0 0 7.5rem;\n  height: 10.5rem;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: center;\n          justify-content: center;\n}\n\n.puzzle-content .puzzle-img {\n  width: 100%;\n  height: 100%;\n}\n\n.puzzle-content .puzzle-details {\n  font-size: 1.4rem;\n  display: -webkit-flex;\n  display: flex;\n  margin: auto 0;\n  margin-left: 1rem;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n}\n\n.puzzle-content .puzzle-details:nth-child(1) {\n  margin-top: 0;\n}\n\n.puzzle-content .main-reward-title {\n  font-size: 1.6rem;\n  line-height: 1.9rem;\n  color: #212b36;\n}\n\n.puzzle-content .reward-subtitle {\n  font-size: 1.2rem;\n  line-height: 1.4rem;\n  color: #6b6b6b;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxnQkFBQTtFQUNBLHFCQUFBO0VBQUEsYUFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7RUFDQSxVQUFBO0VBQ0EsY0FBQTtFQUNBLHdCQUFBO1VBQUEsZ0JBQUE7RUFDQSxzQ0FBQTtVQUFBLDhCQUFBO0FDQ0Y7O0FERUE7RUFDRSxtQkFBQTtFQUNBLFNBQUE7RUFDQSxxQkFBQTtFQUFBLGFBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7RUFDQSxnQkFBQTtBQ0NGOztBRE1BO0VBQ0UsaUJBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0Esc0JBQUE7RUFDQSxxQkFBQTtFQUFBLGFBQUE7RUFDQSwrQkFBQTtBQ0hGOztBREtFO0VBQ0UsaUJBQUE7QUNISjs7QURPQTtFQUNFLHFCQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsZ0JBQUE7RUFDQSxvQkFBQTtVQUFBLFlBQUE7RUFDQSxtQ0FBQTtVQUFBLDJCQUFBO0FDSkY7O0FETUU7RUFDRSx3QkFBQTtVQUFBLGdCQUFBO0VBQ0EsZUFBQTtFQUNBLHFCQUFBO0VBQUEsYUFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7QUNKSjs7QURPRTtFQUNFLFdBQUE7RUFDQSxZQUFBO0FDTEo7O0FEUUU7RUFDRSxpQkFBQTtFQUNBLHFCQUFBO0VBQUEsYUFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7QUNOSjs7QUR5QkU7RUFDRSxhQUFBO0FDdkJKOztBRDBCRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FDeEJKOztBRDJCRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0FDekJKIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsibWF0LWNhcmQge1xuICBtYXJnaW46IDAuNHJlbSAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwO1xuICBoZWlnaHQ6IDMuNXJlbTtcbiAgZmxleDogMCAwIDcuNXJlbTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG5oMSB7XG4gIHBhZGRpbmc6IDAuOHJlbSAwIDA7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi8vIC50YWItZ3JvdXAge1xuLy8gICBtYXJnaW46IDdyZW0gLTEuMnJlbTtcbi8vIH1cblxuLnRhYi1ncm91cF9fY29udGVudCB7XG4gIHBhZGRpbmc6IDAgMS42cmVtO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICBkaXNwbGF5OiBmbGV4O1xuICBtaW4taGVpZ2h0OiBjYWxjKDEwMHZoIC0gMTA4cHgpO1xuXG4gID4gaDE6Zmlyc3QtY2hpbGQge1xuICAgIHBhZGRpbmctdG9wOiAycmVtO1xuICB9XG59XG5cbi5wdXp6bGUtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtYmFzaXM6IGF1dG87XG4gIGZsZXgtZ3JvdzogMTtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuXG4gIC5wdXp6bGUtaW1nX193cmFwcGVyIHtcbiAgICBmbGV4OiAwIDAgNy41cmVtO1xuICAgIGhlaWdodDogMTAuNXJlbTtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB9XG5cbiAgLnB1enpsZS1pbWcge1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGhlaWdodDogMTAwJTtcbiAgfVxuXG4gIC5wdXp6bGUtZGV0YWlscyB7XG4gICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgZGlzcGxheTogZmxleDtcbiAgICBtYXJnaW46IGF1dG8gMDtcbiAgICBtYXJnaW4tbGVmdDogMXJlbTtcbiAgICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuXG4gICAgLy8gaDEge1xuICAgIC8vICAgZm9udC1zaXplOiAxLjRyZW07XG4gICAgLy8gICBsaW5lLWhlaWdodDogMS42cmVtO1xuICAgIC8vICAgcGFkZGluZzogMDtcbiAgICAvLyAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgLy8gICBtYXJnaW46IDRweCAwO1xuICAgIC8vIH1cblxuICAgIC8vIHAge1xuICAgIC8vICAgZm9udC1zaXplOiAxLjFyZW07XG4gICAgLy8gICBsaW5lLWhlaWdodDogMS4zcmVtO1xuICAgIC8vICAgY29sb3I6ICM4NTg1ODU7XG4gICAgLy8gICBtYXJnaW46IDRweCAwO1xuICAgIC8vICAgcGFkZGluZzogMDtcbiAgICAvLyB9XG4gIH1cblxuICAucHV6emxlLWRldGFpbHM6bnRoLWNoaWxkKDEpIHtcbiAgICBtYXJnaW4tdG9wOiAwO1xuICB9XG5cbiAgLm1haW4tcmV3YXJkLXRpdGxlIHtcbiAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICBsaW5lLWhlaWdodDogMS45cmVtO1xuICAgIGNvbG9yOiAjMjEyYjM2O1xuICB9XG5cbiAgLnJld2FyZC1zdWJ0aXRsZSB7XG4gICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNHJlbTtcbiAgICBjb2xvcjogIzZiNmI2YjtcbiAgfVxufVxuIiwibWF0LWNhcmQge1xuICBtYXJnaW46IDAuNHJlbSAwO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBwYWRkaW5nOiAwO1xuICBoZWlnaHQ6IDMuNXJlbTtcbiAgZmxleDogMCAwIDcuNXJlbTtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG5oMSB7XG4gIHBhZGRpbmc6IDAuOHJlbSAwIDA7XG4gIG1hcmdpbjogMDtcbiAgZGlzcGxheTogZmxleDtcbiAgZm9udC1zaXplOiAycmVtO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiA1MDA7XG59XG5cbi50YWItZ3JvdXBfX2NvbnRlbnQge1xuICBwYWRkaW5nOiAwIDEuNnJlbTtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgZGlzcGxheTogZmxleDtcbiAgbWluLWhlaWdodDogY2FsYygxMDB2aCAtIDEwOHB4KTtcbn1cbi50YWItZ3JvdXBfX2NvbnRlbnQgPiBoMTpmaXJzdC1jaGlsZCB7XG4gIHBhZGRpbmctdG9wOiAycmVtO1xufVxuXG4ucHV6emxlLWNvbnRlbnQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWJhc2lzOiBhdXRvO1xuICBmbGV4LWdyb3c6IDE7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbn1cbi5wdXp6bGUtY29udGVudCAucHV6emxlLWltZ19fd3JhcHBlciB7XG4gIGZsZXg6IDAgMCA3LjVyZW07XG4gIGhlaWdodDogMTAuNXJlbTtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4ucHV6emxlLWNvbnRlbnQgLnB1enpsZS1pbWcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuLnB1enpsZS1jb250ZW50IC5wdXp6bGUtZGV0YWlscyB7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBtYXJnaW46IGF1dG8gMDtcbiAgbWFyZ2luLWxlZnQ6IDFyZW07XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG4ucHV6emxlLWNvbnRlbnQgLnB1enpsZS1kZXRhaWxzOm50aC1jaGlsZCgxKSB7XG4gIG1hcmdpbi10b3A6IDA7XG59XG4ucHV6emxlLWNvbnRlbnQgLm1haW4tcmV3YXJkLXRpdGxlIHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIGxpbmUtaGVpZ2h0OiAxLjlyZW07XG4gIGNvbG9yOiAjMjEyYjM2O1xufVxuLnB1enpsZS1jb250ZW50IC5yZXdhcmQtc3VidGl0bGUge1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuNHJlbTtcbiAgY29sb3I6ICM2YjZiNmI7XG59Il19 */"

/***/ }),

/***/ "./src/app/home/home.component.ts":
/*!****************************************!*\
  !*** ./src/app/home/home.component.ts ***!
  \****************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");




var HomeComponent = /** @class */ (function () {
    function HomeComponent(router, vouchersService, campaignService) {
        this.router = router;
        this.vouchersService = vouchersService;
        this.campaignService = campaignService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        this.campaigns$ = this.campaignService.getCampaigns();
        this.vouchers$ = this.vouchersService.getAll();
        this.filter = [_perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].issued, _perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].reserved, _perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].released];
    };
    HomeComponent.prototype.onCampaignSelect = function (campaign) {
        this.router.navigate(["/game-play/" + campaign.id]);
    };
    HomeComponent.prototype.voucherSelected = function (voucher) {
        this.router.navigate(["/voucher-detail/" + voucher.id]);
    };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! raw-loader!./home.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["ICampaignService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/loading/loading.component.scss":
/*!************************************************!*\
  !*** ./src/app/loading/loading.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".loading {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n          justify-content: center;\n  height: 100%;\n  width: 100%;\n  -webkit-align-items: center;\n          align-items: center;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 1.2rem;\n}\n.loading span {\n  margin-top: 3rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9sb2FkaW5nL2xvYWRpbmcuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxxQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtFQUNBLFlBQUE7RUFDQSxXQUFBO0VBQ0EsMkJBQUE7VUFBQSxtQkFBQTtFQUNBLGtCQUFBO0VBQ0EsbUJBQUE7RUFDQSxpQkFBQTtBQ0NGO0FEQ0U7RUFDRSxnQkFBQTtBQ0NKIiwiZmlsZSI6InNyYy9hcHAvbG9hZGluZy9sb2FkaW5nLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLmxvYWRpbmcge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IDEuMnJlbTtcblxuICBzcGFuIHtcbiAgICBtYXJnaW4tdG9wOiAzcmVtO1xuICB9XG59XG4iLCIubG9hZGluZyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xufVxuLmxvYWRpbmcgc3BhbiB7XG4gIG1hcmdpbi10b3A6IDNyZW07XG59Il19 */"

/***/ }),

/***/ "./src/app/loading/loading.component.ts":
/*!**********************************************!*\
  !*** ./src/app/loading/loading.component.ts ***!
  \**********************************************/
/*! exports provided: LoadingComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoadingComponent", function() { return LoadingComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var LoadingComponent = /** @class */ (function () {
    function LoadingComponent() {
    }
    LoadingComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-loading',
            template: __webpack_require__(/*! raw-loader!./loading.component.html */ "../../node_modules/raw-loader/index.js!./src/app/loading/loading.component.html"),
            styles: [__webpack_require__(/*! ./loading.component.scss */ "./src/app/loading/loading.component.scss")]
        })
    ], LoadingComponent);
    return LoadingComponent;
}());



/***/ }),

/***/ "./src/app/login/login.component.scss":
/*!********************************************!*\
  !*** ./src/app/login/login.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".content-container {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  width: 100%;\n  height: 100%;\n  -webkit-align-items: center;\n          align-items: center;\n  background-color: #186de1;\n}\n\n.full-width__input,\n.full-width__button {\n  width: 100%;\n}\n\nbutton {\n  background: #2665ee !important;\n  height: 44px;\n}\n\nimg {\n  margin: 4rem;\n}\n\n.login-form {\n  background-color: white;\n  max-width: 35.4rem;\n  padding: 1.5rem;\n  border-radius: 0.8rem;\n}\n\n.login-form .error_msg {\n  padding-bottom: 1rem;\n}\n\n.login-form .error_msg span {\n  color: red;\n  font-size: 1.5rem;\n}\n\n.login-form h1 {\n  font-weight: 500;\n  font-size: 3.4rem;\n  margin-top: 0.9rem;\n  margin-bottom: 2.4rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvbG9naW4vbG9naW4uY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2xvZ2luL2xvZ2luLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0VBRUEsMkJBQUE7VUFBQSxtQkFBQTtFQUNBLHlCQUFBO0FDQUY7O0FER0E7O0VBRUUsV0FBQTtBQ0FGOztBREdBO0VBQ0UsOEJBQUE7RUFDQSxZQUFBO0FDQUY7O0FER0E7RUFDRSxZQUFBO0FDQUY7O0FER0E7RUFDRSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsZUFBQTtFQW1CQSxxQkFBQTtBQ2xCRjs7QURDRTtFQUNFLG9CQUFBO0FDQ0o7O0FEQ0k7RUFDRSxVQUFBO0VBQ0EsaUJBQUE7QUNDTjs7QURHRTtFQUNFLGdCQUFBO0VBQ0EsaUJBQUE7RUFFQSxrQkFBQTtFQUNBLHFCQUFBO0FDRkoiLCJmaWxlIjoic3JjL2FwcC9sb2dpbi9sb2dpbi5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5jb250ZW50LWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIC8vIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg2ZGUxO1xufVxuXG4uZnVsbC13aWR0aF9faW5wdXQsXG4uZnVsbC13aWR0aF9fYnV0dG9uIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmJ1dHRvbiB7XG4gIGJhY2tncm91bmQ6ICMyNjY1ZWUgIWltcG9ydGFudDtcbiAgaGVpZ2h0OiA0NHB4O1xufVxuXG5pbWcge1xuICBtYXJnaW46IDRyZW07XG59XG5cbi5sb2dpbi1mb3JtIHtcbiAgYmFja2dyb3VuZC1jb2xvcjogd2hpdGU7XG4gIG1heC13aWR0aDogMzUuNHJlbTtcbiAgcGFkZGluZzogMS41cmVtO1xuXG4gIC5lcnJvcl9tc2cge1xuICAgIHBhZGRpbmctYm90dG9tOiAxcmVtO1xuXG4gICAgc3BhbiB7XG4gICAgICBjb2xvcjogcmVkO1xuICAgICAgZm9udC1zaXplOiAxLjVyZW07XG4gICAgfVxuICB9XG5cbiAgaDEge1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgZm9udC1zaXplOiAzLjRyZW07XG4gICAgLy8gbGluZS1oZWlnaHQ6IDRyZW07XG4gICAgbWFyZ2luLXRvcDogMC45cmVtO1xuICAgIG1hcmdpbi1ib3R0b206IDIuNHJlbTtcbiAgfVxuXG4gIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcbn1cbiIsIi5jb250ZW50LWNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGJhY2tncm91bmQtY29sb3I6ICMxODZkZTE7XG59XG5cbi5mdWxsLXdpZHRoX19pbnB1dCxcbi5mdWxsLXdpZHRoX19idXR0b24ge1xuICB3aWR0aDogMTAwJTtcbn1cblxuYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogIzI2NjVlZSAhaW1wb3J0YW50O1xuICBoZWlnaHQ6IDQ0cHg7XG59XG5cbmltZyB7XG4gIG1hcmdpbjogNHJlbTtcbn1cblxuLmxvZ2luLWZvcm0ge1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgbWF4LXdpZHRoOiAzNS40cmVtO1xuICBwYWRkaW5nOiAxLjVyZW07XG4gIGJvcmRlci1yYWRpdXM6IDAuOHJlbTtcbn1cbi5sb2dpbi1mb3JtIC5lcnJvcl9tc2cge1xuICBwYWRkaW5nLWJvdHRvbTogMXJlbTtcbn1cbi5sb2dpbi1mb3JtIC5lcnJvcl9tc2cgc3BhbiB7XG4gIGNvbG9yOiByZWQ7XG4gIGZvbnQtc2l6ZTogMS41cmVtO1xufVxuLmxvZ2luLWZvcm0gaDEge1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDMuNHJlbTtcbiAgbWFyZ2luLXRvcDogMC45cmVtO1xuICBtYXJnaW4tYm90dG9tOiAyLjRyZW07XG59Il19 */"

/***/ }),

/***/ "./src/app/login/login.component.ts":
/*!******************************************!*\
  !*** ./src/app/login/login.component.ts ***!
  \******************************************/
/*! exports provided: LoginComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginComponent", function() { return LoginComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _angular_forms__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @angular/forms */ "../../node_modules/@angular/forms/fesm5/forms.js");
/* harmony import */ var _angular_common_http__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/common/http */ "../../node_modules/@angular/common/fesm5/http.js");






var LoginComponent = /** @class */ (function () {
    function LoginComponent(router, fb, authService, notificationService) {
        this.router = router;
        this.fb = fb;
        this.authService = authService;
        this.notificationService = notificationService;
    }
    LoginComponent.prototype.ngOnInit = function () {
        this.initForm();
    };
    LoginComponent.prototype.initForm = function () {
        this.loginForm = this.fb.group({
            customerID: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required],
            password: ['', _angular_forms__WEBPACK_IMPORTED_MODULE_4__["Validators"].required]
        });
    };
    LoginComponent.prototype.onSubmit = function () {
        var _this = this;
        var username = this.loginForm.get('customerID').value;
        var password = this.loginForm.get('password').value;
        this.errorMessage = null;
        this.authService.login(username, password).subscribe(function () {
            // set global userID var for GA tracking
            if (!(window.primaryIdentifier)) {
                window.primaryIdentifier = username;
            }
            _this.router.navigate(["loading"]);
        }, function (err) {
            if (err instanceof _angular_common_http__WEBPACK_IMPORTED_MODULE_5__["HttpErrorResponse"]) {
                if (err.status === 0) {
                    _this.notificationService.addPopup({
                        title: 'We could not reach the server',
                        text: 'Please try again soon'
                    });
                }
                else if (err.status === 401) {
                    [_this.loginForm.controls.customerID, _this.loginForm.controls.password]
                        .forEach(function (c) { return c.setErrors({
                        invalid: true
                    }); });
                    _this.errorMessage = 'Invalid credentials';
                }
            }
            else {
                _this.errorMessage = err;
            }
        });
    };
    LoginComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["Component"])({
            selector: 'app-login',
            template: __webpack_require__(/*! raw-loader!./login.component.html */ "../../node_modules/raw-loader/index.js!./src/app/login/login.component.html"),
            styles: [__webpack_require__(/*! ./login.component.scss */ "./src/app/login/login.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_forms__WEBPACK_IMPORTED_MODULE_4__["FormBuilder"],
            _perx_core__WEBPACK_IMPORTED_MODULE_1__["AuthenticationService"],
            _perx_core__WEBPACK_IMPORTED_MODULE_1__["NotificationService"]])
    ], LoginComponent);
    return LoginComponent;
}());



/***/ }),

/***/ "./src/app/mock/campaigns.mock.ts":
/*!****************************************!*\
  !*** ./src/app/mock/campaigns.mock.ts ***!
  \****************************************/
/*! exports provided: campaigns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "campaigns", function() { return campaigns; });
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");

var campaigns = [
    {
        id: 1,
        name: 'Smash that Pinata',
        description: '',
        type: _perx_core__WEBPACK_IMPORTED_MODULE_0__["CampaignType"].stamp,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["CampaignState"].active,
        endsAt: new Date('2017-11-17T03:24:00')
    },
    {
        id: 2,
        name: 'Abenson GAME',
        description: 'Abenson description',
        type: _perx_core__WEBPACK_IMPORTED_MODULE_0__["CampaignType"].game,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["CampaignState"].active,
        endsAt: new Date('2017-11-17T03:24:00')
    },
    {
        id: 3,
        name: 'Abenson Stamp',
        description: 'Abenson description',
        type: _perx_core__WEBPACK_IMPORTED_MODULE_0__["CampaignType"].stamp,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["CampaignState"].active,
        endsAt: new Date('2017-11-17T03:24:00')
    }
];


/***/ }),

/***/ "./src/app/mock/catalogs.mock.ts":
/*!***************************************!*\
  !*** ./src/app/mock/catalogs.mock.ts ***!
  \***************************************/
/*! exports provided: catalogs */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "catalogs", function() { return catalogs; });
var catalogs = [
    {
        id: 0,
        name: 'Ramadan Exclusive',
        description: 'Here are deals for ramadan',
        catalogThumbnail: 'https://picsum.photos/50/50?random=1',
        catalogBanner: 'https://picsum.photos/300/200?random=3',
        rewardCount: 5,
        rewards: [
            {
                id: 1,
                name: 'Get a Free Coke',
                // tslint:disable-next-line:max-line-length
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
                subtitle: 'string',
                validFrom: new Date(),
                validTo: new Date(),
                rewardThumbnail: 'https://picsum.photos/300/200?random=1',
                rewardBanner: 'https://picsum.photos/300/200?random=2',
                merchantImg: 'https://picsum.photos/300/200?random=3',
                merchantName: 'Pizza Hut',
                // tslint:disable-next-line:max-line-length
                termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                // tslint:disable-next-line:max-line-length
                howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                merchantId: 2
            }
        ]
    },
    {
        id: 1,
        name: 'Christmas Specials',
        description: 'Santa-claus latest and greatest',
        catalogThumbnail: 'https://picsum.photos/50/50?random=2',
        catalogBanner: 'https://picsum.photos/300/200?random=1',
        rewardCount: 25,
        rewards: [
            {
                id: 2,
                name: '1 for 1',
                // tslint:disable-next-line:max-line-length
                description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                subtitle: 'string',
                validFrom: new Date(),
                validTo: new Date(),
                rewardThumbnail: 'https://picsum.photos/300/200?random=4',
                rewardBanner: 'https://picsum.photos/300/200?random=5',
                merchantImg: 'https://picsum.photos/300/200?random=6',
                merchantName: 'Starbucks',
                // tslint:disable-next-line:max-line-length
                termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                // tslint:disable-next-line:max-line-length
                howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                merchantId: 3
            }
        ]
    },
];


/***/ }),

/***/ "./src/app/mock/profile.mock.ts":
/*!**************************************!*\
  !*** ./src/app/mock/profile.mock.ts ***!
  \**************************************/
/*! exports provided: profile */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "profile", function() { return profile; });
var profile = {
    id: 952,
    state: 'active',
    firstName: 'Lucas',
    lastName: 'Xavier',
    middleName: 'Catherine',
    phone: '1111111111',
    email: 'lucas@perxtech.com',
    birthDate: undefined,
    gender: 'male',
    joinedDate: '2018-10-31T00:00:00.000Z',
    passwordExpiryDate: '2019-09-01T08:35:13.801Z',
    customProperties: {
        mi: 'A',
        city: 'PASIG CITY',
        home: '',
        work: '',
        addr1: 'Blk 1A street 13',
        gender: 'Female',
        company: '',
        barangay: 'CHRISTINE VILL',
        birthday: '19900317',
        lastname: 'Xavier',
        mobileno: '1111111111',
        firstname: 'ARTEMIO',
        spouse_mi: '',
        cardnumber: '123123123123',
        last_visit: '20181031',
        branch_code: '11008',
        branch_name: 'CAINTA 1',
        customer_id: '8010111109440',
        total_visit: '2',
        civil_status: 'SINGLE',
        company_code: '2',
        spouse_first: '',
        email_address: '',
        spouse_lastname: '',
        application_date: '20181031',
        digital_cardnumber: '8720561141910783'
    }
};


/***/ }),

/***/ "./src/app/mock/rewards.mock.ts":
/*!**************************************!*\
  !*** ./src/app/mock/rewards.mock.ts ***!
  \**************************************/
/*! exports provided: rewards */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "rewards", function() { return rewards; });
var rewards = [
    {
        id: 1,
        name: 'Get a Free Coke',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        subtitle: 'string',
        validFrom: new Date('2018-12-16T03:24:00'),
        validTo: new Date('2019-11-17T03:24:00'),
        rewardThumbnail: 'https://picsum.photos/300/200?random=1',
        rewardBanner: 'https://picsum.photos/300/200?random=2',
        merchantImg: 'https://picsum.photos/300/200?random=3',
        merchantName: 'Pizza Hut',
        termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        merchantId: 2
    },
    {
        id: 2,
        name: '1 for 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        subtitle: 'string',
        validFrom: new Date('2019-12-17T03:24:00'),
        validTo: new Date('2020-03-16T03:24:00'),
        rewardThumbnail: 'https://picsum.photos/300/200?random=4',
        rewardBanner: 'https://picsum.photos/300/200?random=5',
        merchantImg: 'https://picsum.photos/300/200?random=6',
        merchantName: 'Starbucks',
        termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        merchantId: 3
    },
    {
        id: 3,
        name: '1 for 1',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        subtitle: 'string',
        validFrom: new Date('2017-12-17T03:24:00'),
        validTo: new Date('2021-01-16T03:24:00'),
        rewardThumbnail: 'https://picsum.photos/300/200?random=4',
        rewardBanner: 'https://picsum.photos/300/200?random=5',
        merchantImg: 'https://picsum.photos/300/200?random=6',
        merchantName: 'Macdonalds',
        termsAndConditions: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        howToRedeem: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
        merchantId: 3
    }
];


/***/ }),

/***/ "./src/app/mock/vouchers.mock.ts":
/*!***************************************!*\
  !*** ./src/app/mock/vouchers.mock.ts ***!
  \***************************************/
/*! exports provided: vouchers */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "vouchers", function() { return vouchers; });
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");

var vouchers = [
    {
        id: 1,
        rewardId: 1,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["VoucherState"].issued,
        name: '10% OFF Total Bill',
        redemptionType: _perx_core__WEBPACK_IMPORTED_MODULE_0__["RedemptionType"].txtCode,
        code: 'GFY2019',
        thumbnailImg: 'https://picsum.photos/50/50?random=1',
        rewardBanner: 'https://picsum.photos/400/200?random=20',
        merchantImg: 'https://picsum.photos/100/100?random=21',
        merchantName: 'Starbucks',
        expiry: new Date(),
        merchantId: 2,
        description: [
            {
                title: 'How to use',
                // tslint:disable-next-line: max-line-length
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                tag: ['how_to_use']
            }
        ],
        redemptionSuccessTxt: '',
        redemptionSuccessImg: '',
    },
    {
        id: 2,
        rewardId: 2,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["VoucherState"].issued,
        name: 'Free Frapuccino',
        redemptionType: _perx_core__WEBPACK_IMPORTED_MODULE_0__["RedemptionType"].pin,
        thumbnailImg: 'https://picsum.photos/50/50?random=2',
        rewardBanner: 'https://picsum.photos/400/200?random=20',
        merchantImg: '',
        merchantName: '',
        expiry: null,
        description: [],
        redemptionSuccessTxt: '',
        redemptionSuccessImg: '',
    },
    {
        id: 3,
        rewardId: 3,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["VoucherState"].issued,
        name: '10% OFF Total Bill',
        redemptionType: _perx_core__WEBPACK_IMPORTED_MODULE_0__["RedemptionType"].txtCode,
        code: 'GFY2019',
        thumbnailImg: 'https://picsum.photos/50/50?random=1',
        rewardBanner: 'https://picsum.photos/400/200?random=20',
        merchantImg: 'https://picsum.photos/100/100?random=21',
        merchantName: 'Starbucks',
        expiry: new Date(),
        merchantId: 2,
        description: [
            {
                title: 'How to use',
                // tslint:disable-next-line: max-line-length
                content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
                tag: ['how_to_use']
            }
        ],
        redemptionSuccessTxt: '',
        redemptionSuccessImg: '',
    },
    {
        id: 4,
        rewardId: 4,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["VoucherState"].issued,
        name: 'Free Frapuccino',
        redemptionType: _perx_core__WEBPACK_IMPORTED_MODULE_0__["RedemptionType"].pin,
        thumbnailImg: 'https://picsum.photos/50/50?random=2',
        rewardBanner: 'https://picsum.photos/400/200?random=20',
        merchantImg: '',
        merchantName: '',
        expiry: null,
        description: [],
        redemptionSuccessTxt: '',
        redemptionSuccessImg: '',
    },
    {
        id: 5,
        rewardId: 5,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["VoucherState"].expired,
        name: '10% OFF Total Bill',
        redemptionType: _perx_core__WEBPACK_IMPORTED_MODULE_0__["RedemptionType"].qr,
        thumbnailImg: 'https://picsum.photos/50/50?random=3',
        rewardBanner: 'https://picsum.photos/400/200?random=20',
        merchantImg: '',
        merchantName: '',
        expiry: null,
        description: [],
        redemptionSuccessTxt: '',
        redemptionSuccessImg: '',
    },
    {
        id: 6,
        rewardId: 6,
        state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["VoucherState"].redeemed,
        name: 'Free Frapuccino',
        redemptionType: _perx_core__WEBPACK_IMPORTED_MODULE_0__["RedemptionType"].qr,
        thumbnailImg: 'https://picsum.photos/50/50?random=4',
        rewardBanner: '',
        merchantImg: '',
        merchantName: 'Starbucks',
        expiry: null,
        description: [],
        redemptionSuccessTxt: '',
        redemptionSuccessImg: '',
    }
];


/***/ }),

/***/ "./src/app/redeem/redeem.component.scss":
/*!**********************************************!*\
  !*** ./src/app/redeem/redeem.component.scss ***!
  \**********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".parent-container {\n  height: 90vh;\n}\n\n.redemption-result {\n  margin-top: 10rem;\n  height: 100%;\n}\n\n.redemption-result .result-text {\n  font-size: 1.8rem;\n  color: #212B36;\n  margin-top: 1rem;\n}\n\n.redemption-result .result-reward-text {\n  font-size: 1.2rem;\n  line-height: 1.4rem;\n  color: #6B6B6B;\n  margin-top: 1rem;\n}\n\n.redemption-result .result-top-container {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-align-items: center;\n          align-items: center;\n}\n\n.full-page-container-white, .redemption-result {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: flex-start;\n          justify-content: flex-start;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-align-items: center;\n          align-items: center;\n  height: 100%;\n}\n\nh1 {\n  font-weight: bold;\n  font-size: 1.8rem;\n  line-height: 2.2rem;\n  text-align: center;\n  margin: 3.2rem;\n}\n\np {\n  text-align: center;\n  margin: 8rem 3.2rem 0 3.2rem;\n  font-style: normal;\n  font-weight: normal;\n  font-size: 1.4rem;\n  line-height: 1.7rem;\n}\n\nperx-core-bcode-redemption {\n  margin-top: 7rem;\n}\n\nperx-core-pin-input {\n  margin-top: 7rem;\n}\n\n.qrcode-container {\n  margin-top: 8rem;\n}\n\n.redeem-btn {\n  width: 100%;\n  margin-top: 4rem;\n  color: #2665EE;\n  border-block-color: #2665EE;\n  background: white;\n}\n\n.back-to-wallet {\n  position: absolute;\n  bottom: 0;\n  margin-bottom: 2rem;\n  width: 90%;\n  color: #2665ee;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvcmVkZWVtL3JlZGVlbS5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvcmVkZWVtL3JlZGVlbS5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7QUNDRjs7QURFQTtFQUNFLGlCQUFBO0VBQ0EsWUFBQTtBQ0NGOztBRENFO0VBQ0UsaUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUNDSjs7QURFRTtFQUNFLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsZ0JBQUE7QUNBSjs7QURHRTtFQUNFLHFCQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0VBQ0EsMkJBQUE7VUFBQSxtQkFBQTtBQ0RKOztBREtBO0VBQ0UscUJBQUE7RUFBQSxhQUFBO0VBQ0EsbUNBQUE7VUFBQSwyQkFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSwyQkFBQTtVQUFBLG1CQUFBO0VBQ0EsWUFBQTtBQ0ZGOztBREtBO0VBQ0UsaUJBQUE7RUFDQSxpQkFBQTtFQUNBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FDRkY7O0FES0E7RUFDRSxrQkFBQTtFQUNBLDRCQUFBO0VBQ0Esa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7QUNGRjs7QURLQTtFQUNFLGdCQUFBO0FDRkY7O0FES0E7RUFDRSxnQkFBQTtBQ0ZGOztBREtBO0VBQ0UsZ0JBQUE7QUNGRjs7QURLQTtFQUNFLFdBQUE7RUFDQSxnQkFBQTtFQUNBLGNBQUE7RUFDQSwyQkFBQTtFQUNBLGlCQUFBO0FDRkY7O0FES0E7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxtQkFBQTtFQUNBLFVBQUE7RUFDQSxjQUFBO0FDRkYiLCJmaWxlIjoic3JjL2FwcC9yZWRlZW0vcmVkZWVtLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnBhcmVudC1jb250YWluZXIge1xuICBoZWlnaHQ6IDkwdmg7XG59XG5cbi5yZWRlbXB0aW9uLXJlc3VsdCB7XG4gIG1hcmdpbi10b3A6IDEwcmVtO1xuICBoZWlnaHQ6IDEwMCU7XG5cbiAgLnJlc3VsdC10ZXh0IHtcbiAgICBmb250LXNpemU6IDEuOHJlbTtcbiAgICBjb2xvcjogIzIxMkIzNjtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICB9XG5cbiAgLnJlc3VsdC1yZXdhcmQtdGV4dCB7XG4gICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgbGluZS1oZWlnaHQ6IDEuNHJlbTtcbiAgICBjb2xvcjogIzZCNkI2QjtcbiAgICBtYXJnaW4tdG9wOiAxcmVtO1xuICB9XG5cbiAgLnJlc3VsdC10b3AtY29udGFpbmVyIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgfVxufVxuXG4uZnVsbC1wYWdlLWNvbnRhaW5lci13aGl0ZSwgLnJlZGVtcHRpb24tcmVzdWx0IHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LXN0YXJ0O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG59XG5cbmgxIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGZvbnQtc2l6ZTogMS44cmVtO1xuICBsaW5lLWhlaWdodDogMi4ycmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMy4ycmVtO1xufVxuXG5wIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDhyZW0gMy4ycmVtIDAgMy4ycmVtO1xuICBmb250LXN0eWxlOiBub3JtYWw7XG4gIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gIGZvbnQtc2l6ZTogMS40cmVtO1xuICBsaW5lLWhlaWdodDogMS43cmVtO1xufVxuXG5wZXJ4LWNvcmUtYmNvZGUtcmVkZW1wdGlvbiB7XG4gIG1hcmdpbi10b3A6IDdyZW07XG59XG5cbnBlcngtY29yZS1waW4taW5wdXQge1xuICBtYXJnaW4tdG9wOiA3cmVtO1xufVxuXG4ucXJjb2RlLWNvbnRhaW5lciB7XG4gIG1hcmdpbi10b3A6IDhyZW07XG59XG5cbi5yZWRlZW0tYnRuIHtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbi10b3A6IDRyZW07XG4gIGNvbG9yOiAjMjY2NUVFO1xuICBib3JkZXItYmxvY2stY29sb3I6ICMyNjY1RUU7XG4gIGJhY2tncm91bmQ6IHdoaXRlO1xufVxuXG4uYmFjay10by13YWxsZXQge1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbiAgd2lkdGg6IDkwJTtcbiAgY29sb3I6ICMyNjY1ZWU7XG59XG4iLCIucGFyZW50LWNvbnRhaW5lciB7XG4gIGhlaWdodDogOTB2aDtcbn1cblxuLnJlZGVtcHRpb24tcmVzdWx0IHtcbiAgbWFyZ2luLXRvcDogMTByZW07XG4gIGhlaWdodDogMTAwJTtcbn1cbi5yZWRlbXB0aW9uLXJlc3VsdCAucmVzdWx0LXRleHQge1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgY29sb3I6ICMyMTJCMzY7XG4gIG1hcmdpbi10b3A6IDFyZW07XG59XG4ucmVkZW1wdGlvbi1yZXN1bHQgLnJlc3VsdC1yZXdhcmQtdGV4dCB7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBsaW5lLWhlaWdodDogMS40cmVtO1xuICBjb2xvcjogIzZCNkI2QjtcbiAgbWFyZ2luLXRvcDogMXJlbTtcbn1cbi5yZWRlbXB0aW9uLXJlc3VsdCAucmVzdWx0LXRvcC1jb250YWluZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cblxuLmZ1bGwtcGFnZS1jb250YWluZXItd2hpdGUsIC5yZWRlbXB0aW9uLXJlc3VsdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1zdGFydDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG5oMSB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgbGluZS1oZWlnaHQ6IDIuMnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW46IDMuMnJlbTtcbn1cblxucCB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiA4cmVtIDMuMnJlbSAwIDMuMnJlbTtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IDEuNHJlbTtcbiAgbGluZS1oZWlnaHQ6IDEuN3JlbTtcbn1cblxucGVyeC1jb3JlLWJjb2RlLXJlZGVtcHRpb24ge1xuICBtYXJnaW4tdG9wOiA3cmVtO1xufVxuXG5wZXJ4LWNvcmUtcGluLWlucHV0IHtcbiAgbWFyZ2luLXRvcDogN3JlbTtcbn1cblxuLnFyY29kZS1jb250YWluZXIge1xuICBtYXJnaW4tdG9wOiA4cmVtO1xufVxuXG4ucmVkZWVtLWJ0biB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXJnaW4tdG9wOiA0cmVtO1xuICBjb2xvcjogIzI2NjVFRTtcbiAgYm9yZGVyLWJsb2NrLWNvbG9yOiAjMjY2NUVFO1xuICBiYWNrZ3JvdW5kOiB3aGl0ZTtcbn1cblxuLmJhY2stdG8td2FsbGV0IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBib3R0b206IDA7XG4gIG1hcmdpbi1ib3R0b206IDJyZW07XG4gIHdpZHRoOiA5MCU7XG4gIGNvbG9yOiAjMjY2NWVlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/redeem/redeem.component.ts":
/*!********************************************!*\
  !*** ./src/app/redeem/redeem.component.ts ***!
  \********************************************/
/*! exports provided: RedeemComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RedeemComponent", function() { return RedeemComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");






var RedeemComponent = /** @class */ (function () {
    function RedeemComponent(route, vouchersService, dialog, router) {
        this.route = route;
        this.vouchersService = vouchersService;
        this.dialog = dialog;
        this.router = router;
    }
    RedeemComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.voucher$ = this.route.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (params) { return params.has('id'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (params) {
            var id = params.get('id');
            _this.voucherId = Number.parseInt(id, 10);
            return _this.vouchersService.get(_this.voucherId);
        }));
        this.voucher$.subscribe(function (voucher) {
            _this.redemptionType = voucher.redemptionType;
        });
    };
    RedeemComponent.prototype.pinInputSuccess = function () {
        this.popup({
            title: 'Redeem Successfully',
            text: 'ID: ' + this.voucherId
        });
    };
    RedeemComponent.prototype.errorHandler = function (status) {
        if (status === 401) {
            this.needLoginPopup();
        }
        else {
            this.errorPopup();
        }
    };
    RedeemComponent.prototype.needLoginPopup = function () {
        var _this = this;
        var goToLoginDialog = this.popup({
            title: 'You need to login to redeem the voucher',
            buttonTxt: 'Go to login'
        });
        goToLoginDialog.afterClosed().subscribe(function () { _this.router.navigate(['/login']); });
    };
    RedeemComponent.prototype.errorPopup = function () {
        this.popup({
            title: 'Error occur, please try again later'
        });
    };
    RedeemComponent.prototype.popup = function (data) {
        return this.dialog
            .open(_perx_core__WEBPACK_IMPORTED_MODULE_3__["PopupComponent"], { data: data });
    };
    RedeemComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-redeem',
            template: __webpack_require__(/*! raw-loader!./redeem.component.html */ "../../node_modules/raw-loader/index.js!./src/app/redeem/redeem.component.html"),
            styles: [__webpack_require__(/*! ./redeem.component.scss */ "./src/app/redeem/redeem.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _perx_core__WEBPACK_IMPORTED_MODULE_3__["IVoucherService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_5__["MatDialog"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"]])
    ], RedeemComponent);
    return RedeemComponent;
}());



/***/ }),

/***/ "./src/app/voucher-detail/voucher-detail.component.scss":
/*!**************************************************************!*\
  !*** ./src/app/voucher-detail/voucher-detail.component.scss ***!
  \**************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".prize-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  width: 100%;\n  height: 100%;\n}\n\n.voucher-container {\n  height: 100%;\n  -webkit-flex: 1;\n          flex: 1;\n  overflow-y: scroll;\n}\n\n.actions-container {\n  padding: 1rem 1.2rem;\n  background-color: white;\n  border-top: 0.1rem solid darkgray;\n}\n\n.actions-container button {\n  width: 80%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvdm91Y2hlci1kZXRhaWwvdm91Y2hlci1kZXRhaWwuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3ZvdWNoZXItZGV0YWlsL3ZvdWNoZXItZGV0YWlsLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UscUJBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLFdBQUE7RUFDQSxZQUFBO0FDQ0Y7O0FERUE7RUFDRSxZQUFBO0VBQ0EsZUFBQTtVQUFBLE9BQUE7RUFDQSxrQkFBQTtBQ0NGOztBREVBO0VBQ0Usb0JBQUE7RUFDQSx1QkFBQTtFQUNBLGlDQUFBO0FDQ0Y7O0FEQ0U7RUFDRSxVQUFBO0FDQ0oiLCJmaWxlIjoic3JjL2FwcC92b3VjaGVyLWRldGFpbC92b3VjaGVyLWRldGFpbC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5wcml6ZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgd2lkdGg6IDEwMCU7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLnZvdWNoZXItY29udGFpbmVyIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG59XG5cbi5hY3Rpb25zLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDFyZW0gMS4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYm9yZGVyLXRvcDogMC4xcmVtIHNvbGlkIGRhcmtncmF5O1xuXG4gIGJ1dHRvbiB7XG4gICAgd2lkdGg6IDgwJTtcbiAgfVxufVxuIiwiLnByaXplLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xufVxuXG4udm91Y2hlci1jb250YWluZXIge1xuICBoZWlnaHQ6IDEwMCU7XG4gIGZsZXg6IDE7XG4gIG92ZXJmbG93LXk6IHNjcm9sbDtcbn1cblxuLmFjdGlvbnMtY29udGFpbmVyIHtcbiAgcGFkZGluZzogMXJlbSAxLjJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBib3JkZXItdG9wOiAwLjFyZW0gc29saWQgZGFya2dyYXk7XG59XG4uYWN0aW9ucy1jb250YWluZXIgYnV0dG9uIHtcbiAgd2lkdGg6IDgwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/voucher-detail/voucher-detail.component.ts":
/*!************************************************************!*\
  !*** ./src/app/voucher-detail/voucher-detail.component.ts ***!
  \************************************************************/
/*! exports provided: VoucherDetailComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VoucherDetailComponent", function() { return VoucherDetailComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");





var VoucherDetailComponent = /** @class */ (function () {
    function VoucherDetailComponent(router, activeRoute, vouchersService) {
        this.router = router;
        this.activeRoute = activeRoute;
        this.vouchersService = vouchersService;
    }
    VoucherDetailComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.voucher$ = this.activeRoute.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (params) { return params.has('id'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (params) {
            var id = params.get('id');
            var idN = Number.parseInt(id, 10);
            return _this.vouchersService.get(idN);
        }));
    };
    VoucherDetailComponent.prototype.onRedeem = function () {
        var _this = this;
        this.voucher$.subscribe(function (v) {
            _this.router.navigate(['redeem', v.id]);
        });
    };
    VoucherDetailComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-voucher-detail',
            template: __webpack_require__(/*! raw-loader!./voucher-detail.component.html */ "../../node_modules/raw-loader/index.js!./src/app/voucher-detail/voucher-detail.component.html"),
            styles: [__webpack_require__(/*! ./voucher-detail.component.scss */ "./src/app/voucher-detail/voucher-detail.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"],
            _perx_core__WEBPACK_IMPORTED_MODULE_3__["IVoucherService"]])
    ], VoucherDetailComponent);
    return VoucherDetailComponent;
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

module.exports = __webpack_require__(/*! /Users/perx/Documents/GitHub/microsite-apps-ng/apps/abenson/src/main.ts */"./src/main.ts");


/***/ })

},[[0,"runtime","vendor"]]]);
//# sourceMappingURL=main-es5.js.map