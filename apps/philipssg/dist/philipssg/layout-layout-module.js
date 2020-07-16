(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["layout-layout-module"],{

/***/ "./src/app/layout/layout-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/layout/layout-routing.module.ts ***!
  \*************************************************/
/*! exports provided: LayoutRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutRoutingModule", function() { return LayoutRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var ngx_auth__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ngx-auth */ "../../node_modules/ngx-auth/fesm5/ngx-auth.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _perxtech_blackcomb_pages__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @perxtech/blackcomb-pages */ "../../libs/blackcomb-pages/dist/perx-blackcomb-pages/fesm5/perxtech-blackcomb-pages.js");





var routes = [
    {
        path: '',
        component: _perxtech_blackcomb_pages__WEBPACK_IMPORTED_MODULE_4__["LayoutComponent"],
        children: [
            { path: '', pathMatch: 'full', redirectTo: 'wallet' },
            {
                path: 'wallet', loadChildren: function () { return __webpack_require__.e(/*! import() | wallet-wallet-module */ "wallet-wallet-module").then(__webpack_require__.bind(null, /*! ../wallet/wallet.module */ "./src/app/wallet/wallet.module.ts")).then(function (mod) { return mod.WalletModule; }); },
                canActivate: [ngx_auth__WEBPACK_IMPORTED_MODULE_1__["ProtectedGuard"]]
            },
            {
                path: 'history', loadChildren: function () { return __webpack_require__.e(/*! import() | history-history-module */ "history-history-module").then(__webpack_require__.bind(null, /*! ../history/history.module */ "./src/app/history/history.module.ts")).then(function (mod) { return mod.HistoryModule; }); },
                canActivate: [ngx_auth__WEBPACK_IMPORTED_MODULE_1__["ProtectedGuard"]]
            },
            {
                path: 'game/:id',
                loadChildren: function () { return __webpack_require__.e(/*! import() | game-game-module */ "game-game-module").then(__webpack_require__.bind(null, /*! ../game/game.module */ "./src/app/game/game.module.ts")).then(function (mod) { return mod.GameModule; }); },
                canActivate: [ngx_auth__WEBPACK_IMPORTED_MODULE_1__["ProtectedGuard"]]
            },
            {
                path: 'voucher-detail/:id',
                loadChildren: function () { return __webpack_require__.e(/*! import() | voucher-detail-voucher-detail-module */ "voucher-detail-voucher-detail-module").then(__webpack_require__.bind(null, /*! ../voucher-detail/voucher-detail.module */ "./src/app/voucher-detail/voucher-detail.module.ts")).then(function (mod) { return mod.VoucherDetailModule; }); },
                canActivate: [ngx_auth__WEBPACK_IMPORTED_MODULE_1__["ProtectedGuard"]]
            },
            {
                path: 'redeem/:id', loadChildren: function () { return __webpack_require__.e(/*! import() | redeem-redeem-module */ "redeem-redeem-module").then(__webpack_require__.bind(null, /*! ../redeem/redeem.module */ "./src/app/redeem/redeem.module.ts")).then(function (mod) { return mod.RedeemModule; }); },
                canActivate: [ngx_auth__WEBPACK_IMPORTED_MODULE_1__["ProtectedGuard"]]
            },
        ]
    }
];
var LayoutRoutingModule = /** @class */ (function () {
    function LayoutRoutingModule() {
    }
    LayoutRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_2__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_3__["RouterModule"]]
        })
    ], LayoutRoutingModule);
    return LayoutRoutingModule;
}());



/***/ }),

/***/ "./src/app/layout/layout.module.ts":
/*!*****************************************!*\
  !*** ./src/app/layout/layout.module.ts ***!
  \*****************************************/
/*! exports provided: LayoutModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LayoutModule", function() { return LayoutModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perxtech_blackcomb_pages__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perxtech/blackcomb-pages */ "../../libs/blackcomb-pages/dist/perx-blackcomb-pages/fesm5/perxtech-blackcomb-pages.js");
/* harmony import */ var _layout_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./layout-routing.module */ "./src/app/layout/layout-routing.module.ts");




var LayoutModule = /** @class */ (function () {
    function LayoutModule() {
    }
    LayoutModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [
                // LayoutRoutingModule must be listed first to use its '' routing paths
                _layout_routing_module__WEBPACK_IMPORTED_MODULE_3__["LayoutRoutingModule"],
                _perxtech_blackcomb_pages__WEBPACK_IMPORTED_MODULE_2__["LayoutModule"]
            ]
        })
    ], LayoutModule);
    return LayoutModule;
}());



/***/ })

}]);
//# sourceMappingURL=layout-layout-module.js.map