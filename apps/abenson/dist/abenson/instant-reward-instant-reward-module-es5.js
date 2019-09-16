(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["instant-reward-instant-reward-module"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/instant-reward/reward/reward.component.html":
/*!************************************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/instant-reward/reward/reward.component.html ***!
  \************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-puzzle-container\">\n  <div class=\"game-wrapper\">\n    <div>\n      <h1>{{this.title}}</h1>\n      <h3>{{this.subTitle}}</h3>\n    </div>\n    <perx-core-rewards-collection [rewardsList]=\"rewards$\" (tapped)=\"rewardClickedHandler($event)\">\n    </perx-core-rewards-collection>\n  </div>\n  <button mat-flat-button color=\"primary\" routerLink=\"['/wallet']\">\n    View wallet\n  </button>\n</div>"

/***/ }),

/***/ "./src/app/instant-reward/instant-reward-routing.module.ts":
/*!*****************************************************************!*\
  !*** ./src/app/instant-reward/instant-reward-routing.module.ts ***!
  \*****************************************************************/
/*! exports provided: InstantRewardRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstantRewardRoutingModule", function() { return InstantRewardRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _reward_reward_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./reward/reward.component */ "./src/app/instant-reward/reward/reward.component.ts");




var routes = [
    { path: '', pathMatch: 'full', component: _reward_reward_component__WEBPACK_IMPORTED_MODULE_3__["RewardComponent"] },
    { path: '*', redirectTo: '' }
];
var InstantRewardRoutingModule = /** @class */ (function () {
    function InstantRewardRoutingModule() {
    }
    InstantRewardRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], InstantRewardRoutingModule);
    return InstantRewardRoutingModule;
}());



/***/ }),

/***/ "./src/app/instant-reward/instant-reward.module.ts":
/*!*********************************************************!*\
  !*** ./src/app/instant-reward/instant-reward.module.ts ***!
  \*********************************************************/
/*! exports provided: InstantRewardModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "InstantRewardModule", function() { return InstantRewardModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _instant_reward_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./instant-reward-routing.module */ "./src/app/instant-reward/instant-reward-routing.module.ts");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _reward_reward_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./reward/reward.component */ "./src/app/instant-reward/reward/reward.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");







var InstantRewardModule = /** @class */ (function () {
    function InstantRewardModule() {
    }
    InstantRewardModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_reward_reward_component__WEBPACK_IMPORTED_MODULE_5__["RewardComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_4__["RewardsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _instant_reward_routing_module__WEBPACK_IMPORTED_MODULE_3__["InstantRewardRoutingModule"]
            ]
        })
    ], InstantRewardModule);
    return InstantRewardModule;
}());



/***/ }),

/***/ "./src/app/instant-reward/reward/reward.component.scss":
/*!*************************************************************!*\
  !*** ./src/app/instant-reward/reward/reward.component.scss ***!
  \*************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-puzzle-container {\n  -webkit-flex: 2;\n          flex: 2;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  -webkit-align-items: center;\n          align-items: center;\n  height: 100%;\n  background: linear-gradient(180deg, #3a6186 0%, #89243e 100%);\n}\n\n.game-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  width: 34.5rem;\n  background-color: white;\n  -webkit-align-items: center;\n          align-items: center;\n  border-radius: 0.8rem;\n  padding: 1rem;\n  overflow-x: scroll;\n}\n\n.game-wrapper h1 {\n  font-style: normal;\n  font-weight: 500;\n  font-size: 20px;\n  font-family: Roboto, sans-serif;\n  text-align: center;\n}\n\n.game-wrapper h3 {\n  text-align: center;\n  margin: 0;\n  color: #666666;\n}\n\nbutton {\n  width: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvaW5zdGFudC1yZXdhcmQvcmV3YXJkL3Jld2FyZC5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaW5zdGFudC1yZXdhcmQvcmV3YXJkL3Jld2FyZC5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLGVBQUE7VUFBQSxPQUFBO0VBQ0EscUJBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLHFDQUFBO1VBQUEsNkJBQUE7RUFDQSwyQkFBQTtVQUFBLG1CQUFBO0VBQ0EsWUFBQTtFQUNBLDZEQUFBO0FDQ0Y7O0FERUE7RUFDRSxxQkFBQTtFQUFBLGFBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLGNBQUE7RUFDQSx1QkFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGFBQUE7RUFDQSxrQkFBQTtBQ0NGOztBRENFO0VBQ0Usa0JBQUE7RUFDQSxnQkFBQTtFQUNBLGVBQUE7RUFFQSwrQkFBQTtFQUNBLGtCQUFBO0FDQUo7O0FER0U7RUFDRSxrQkFBQTtFQUNBLFNBQUE7RUFDQSxjQUFBO0FDREo7O0FES0E7RUFDRSxVQUFBO0FDRkYiLCJmaWxlIjoic3JjL2FwcC9pbnN0YW50LXJld2FyZC9yZXdhcmQvcmV3YXJkLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLm1haW4tcHV6emxlLWNvbnRhaW5lciB7XG4gIGZsZXg6IDI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICMzYTYxODYgMCUsICM4OTI0M2UgMTAwJSk7XG59XG5cbi5nYW1lLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgd2lkdGg6IDM0LjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAwLjhyZW07XG4gIHBhZGRpbmc6IDFyZW07XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcblxuICBoMSB7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgZm9udC1zaXplOiAyMHB4O1xuICAgIC8vIGxpbmUtaGVpZ2h0OiAyM3B4O1xuICAgIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHNhbnMtc2VyaWY7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICB9XG5cbiAgaDMge1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW46IDA7XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gIH1cbn1cblxuYnV0dG9uIHtcbiAgd2lkdGg6IDUwJTtcbn1cbiIsIi5tYWluLXB1enpsZS1jb250YWluZXIge1xuICBmbGV4OiAyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjM2E2MTg2IDAlLCAjODkyNDNlIDEwMCUpO1xufVxuXG4uZ2FtZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAzNC41cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMC44cmVtO1xuICBwYWRkaW5nOiAxcmVtO1xuICBvdmVyZmxvdy14OiBzY3JvbGw7XG59XG4uZ2FtZS13cmFwcGVyIGgxIHtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHNhbnMtc2VyaWY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5nYW1lLXdyYXBwZXIgaDMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG5cbmJ1dHRvbiB7XG4gIHdpZHRoOiA1MCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/instant-reward/reward/reward.component.ts":
/*!***********************************************************!*\
  !*** ./src/app/instant-reward/reward/reward.component.ts ***!
  \***********************************************************/
/*! exports provided: RewardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardComponent", function() { return RewardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");




var RewardComponent = /** @class */ (function () {
    function RewardComponent(rewardsService, dialog) {
        this.rewardsService = rewardsService;
        this.dialog = dialog;
        this.title = 'Headline';
        this.subTitle = 'Sub-Headline';
    }
    RewardComponent.prototype.ngOnInit = function () {
        this.getRewards();
    };
    RewardComponent.prototype.getRewards = function () {
        this.rewards$ = this.rewardsService.getAllRewards();
    };
    RewardComponent.prototype.rewardClickedHandler = function (reward) {
        var data = {
            title: 'Clicked!',
            text: 'ID: ' + reward.id + '\n' +
                'Reward Name: ' + reward.name,
        };
        this.dialog.open(_perx_core__WEBPACK_IMPORTED_MODULE_2__["PopupComponent"], { data: data });
    };
    RewardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-reward',
            template: __webpack_require__(/*! raw-loader!./reward.component.html */ "../../node_modules/raw-loader/index.js!./src/app/instant-reward/reward/reward.component.html"),
            styles: [__webpack_require__(/*! ./reward.component.scss */ "./src/app/instant-reward/reward/reward.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["RewardsService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], RewardComponent);
    return RewardComponent;
}());



/***/ })

}]);
//# sourceMappingURL=instant-reward-instant-reward-module-es5.js.map