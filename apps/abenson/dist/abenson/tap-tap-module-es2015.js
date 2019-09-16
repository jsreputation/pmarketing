(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["tap-tap-module"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/tap/tap/tap.component.html":
/*!*******************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/tap/tap/tap.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-puzzle-container\" *ngIf=\"game$ | async as game\">\n  <div>\n    <h1>{{game.texts.title}}</h1>\n    <h3>{{game.texts.subTitle}}</h3>\n  </div>\n  <div class=\"game-wrapper\">\n    <div class=\"pinata-wrapper\">\n      <perx-core-pinata\n        [stillImg]=\"game.config.stillImg\"\n        [openedImg]=\"game.config.openedImg\" \n        (broken)=\"gameCompleted()\" \n        [enabled]=\"isEnabled\">\n        [nbTaps]=\"game.config.nbTaps\"\n      </perx-core-pinata>\n    </div>\n  </div>\n  <button mat-flat-button color=\"primary\" (click)=\"isEnabled = true\"\n    [ngStyle]=\"{ 'visibility': isEnabled ? 'hidden': 'visible'}\">\n    {{ game.texts.button }}\n  </button>\n</div>"

/***/ }),

/***/ "./src/app/tap/tap-routing.module.ts":
/*!*******************************************!*\
  !*** ./src/app/tap/tap-routing.module.ts ***!
  \*******************************************/
/*! exports provided: TapRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TapRoutingModule", function() { return TapRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _tap_tap_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tap/tap.component */ "./src/app/tap/tap/tap.component.ts");




const routes = [
    { path: '', pathMatch: 'full', component: _tap_tap_component__WEBPACK_IMPORTED_MODULE_3__["TapComponent"] },
    { path: '*', redirectTo: '' }
];
let TapRoutingModule = class TapRoutingModule {
};
TapRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], TapRoutingModule);



/***/ }),

/***/ "./src/app/tap/tap.module.ts":
/*!***********************************!*\
  !*** ./src/app/tap/tap.module.ts ***!
  \***********************************/
/*! exports provided: TapModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TapModule", function() { return TapModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _tap_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./tap-routing.module */ "./src/app/tap/tap-routing.module.ts");
/* harmony import */ var _tap_tap_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./tap/tap.component */ "./src/app/tap/tap/tap.component.ts");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm2015/perx-core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _mock_games_mock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mock/games.mock */ "./src/app/mock/games.mock.ts");









const gameServiceStub = {
    get: (id) => Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(_mock_games_mock__WEBPACK_IMPORTED_MODULE_8__["games"][id]),
    getGamesFromCampaign: (id) => Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(_mock_games_mock__WEBPACK_IMPORTED_MODULE_8__["games"].filter(game => game.campaignId === id))
};
let TapModule = class TapModule {
};
TapModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_tap_tap_component__WEBPACK_IMPORTED_MODULE_4__["TapComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _perx_core__WEBPACK_IMPORTED_MODULE_5__["GameModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _tap_routing_module__WEBPACK_IMPORTED_MODULE_3__["TapRoutingModule"]
        ],
        providers: [
            { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["IGameService"], useValue: gameServiceStub },
        ]
    })
], TapModule);



/***/ }),

/***/ "./src/app/tap/tap/tap.component.scss":
/*!********************************************!*\
  !*** ./src/app/tap/tap/tap.component.scss ***!
  \********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-puzzle-container {\n  -webkit-flex: 2;\n          flex: 2;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  -webkit-align-items: center;\n          align-items: center;\n  height: 100%;\n  background: linear-gradient(180deg, #3a6186 0%, #89243e 100%);\n}\n.main-puzzle-container h1 {\n  color: white;\n  text-align: center;\n  font-family: Roboto, sans-serif;\n  padding: 2rem 0 0 0;\n}\n.main-puzzle-container h3 {\n  color: white;\n  text-align: center;\n  margin: 0;\n}\n.game-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  width: 100%;\n}\n.game-wrapper .pinata-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-align-items: center;\n          align-items: center;\n  width: 100%;\n}\nbutton {\n  max-width: 31.5rem;\n  min-width: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvdGFwL3RhcC90YXAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3RhcC90YXAvdGFwLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsZUFBQTtVQUFBLE9BQUE7RUFDQSxxQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EscUNBQUE7VUFBQSw2QkFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7RUFFQSxZQUFBO0VBQ0EsNkRBQUE7QUNERjtBREdFO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxtQkFBQTtBQ0RKO0FESUU7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0FDRko7QURNQTtFQUNFLHFCQUFBO0VBQUEsYUFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsV0FBQTtBQ0hGO0FES0U7RUFDRSxxQkFBQTtFQUFBLGFBQUE7RUFDQSwrQkFBQTtVQUFBLHVCQUFBO0VBQ0EsOEJBQUE7VUFBQSxzQkFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7RUFDQSxXQUFBO0FDSEo7QURPQTtFQUNFLGtCQUFBO0VBQ0EsY0FBQTtBQ0pGIiwiZmlsZSI6InNyYy9hcHAvdGFwL3RhcC90YXAuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJcbi5tYWluLXB1enpsZS1jb250YWluZXIge1xuICBmbGV4OiAyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgLy8gbWFyZ2luOiAycmVtIC0xLjJyZW07XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNhNjE4NiAwJSwgIzg5MjQzZSAxMDAlKTtcblxuICBoMSB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBmb250LWZhbWlseTogUm9ib3RvLCBzYW5zLXNlcmlmO1xuICAgIHBhZGRpbmc6IDJyZW0gMCAwIDA7XG4gIH1cblxuICBoMyB7XG4gICAgY29sb3I6IHdoaXRlO1xuICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICBtYXJnaW46IDA7XG4gIH1cbn1cblxuLmdhbWUtd3JhcHBlciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICB3aWR0aDogMTAwJTtcblxuICAucGluYXRhLXdyYXBwZXIge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgICBhbGlnbi1pdGVtczogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICB9XG59XG5cbmJ1dHRvbiB7XG4gIG1heC13aWR0aDogMzEuNXJlbTtcbiAgbWluLXdpZHRoOiA1MCU7XG59XG4iLCIubWFpbi1wdXp6bGUtY29udGFpbmVyIHtcbiAgZmxleDogMjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNhNjE4NiAwJSwgIzg5MjQzZSAxMDAlKTtcbn1cbi5tYWluLXB1enpsZS1jb250YWluZXIgaDEge1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcbiAgcGFkZGluZzogMnJlbSAwIDAgMDtcbn1cbi5tYWluLXB1enpsZS1jb250YWluZXIgaDMge1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAwO1xufVxuXG4uZ2FtZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAxMDAlO1xufVxuLmdhbWUtd3JhcHBlciAucGluYXRhLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmJ1dHRvbiB7XG4gIG1heC13aWR0aDogMzEuNXJlbTtcbiAgbWluLXdpZHRoOiA1MCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/tap/tap/tap.component.ts":
/*!******************************************!*\
  !*** ./src/app/tap/tap/tap.component.ts ***!
  \******************************************/
/*! exports provided: TapComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "TapComponent", function() { return TapComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm2015/perx-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");





let TapComponent = class TapComponent {
    constructor(router, notificationService, gameService, route) {
        this.router = router;
        this.notificationService = notificationService;
        this.gameService = gameService;
        this.route = route;
        this.isEnabled = false;
        this.congratsDetailText = 'You just won 2 rewards';
    }
    ngOnInit() {
        this.game$ = this.route.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((params) => params.has('id')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((params) => {
            const id = params.get('id');
            const idN = Number.parseInt(id, 10);
            return this.gameService.getGamesFromCampaign(idN);
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((games) => games.filter(game => game.type === _perx_core__WEBPACK_IMPORTED_MODULE_3__["GameType"].pinata)[0]));
        this.actionOnGameStatus();
    }
    actionOnGameStatus() {
        this.game$.subscribe(game => {
            if (game.remainingNumberOfTries <= 0) {
                this.router.navigate(['/wallet']);
            }
        }, () => {
            this.router.navigate(['/wallet']);
        });
    }
    gameCompleted() {
        setTimeout(() => {
            this.router.navigate(['/wallet']);
            this.notificationService.addPopup({
                title: 'Congratulations!',
                text: this.congratsDetailText,
                buttonTxt: 'View Rewards',
                imageUrl: 'assets/congrats_image.png',
            });
        }, 2000);
    }
};
TapComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-tap',
        template: __webpack_require__(/*! raw-loader!./tap.component.html */ "../../node_modules/raw-loader/index.js!./src/app/tap/tap/tap.component.html"),
        styles: [__webpack_require__(/*! ./tap.component.scss */ "./src/app/tap/tap/tap.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _perx_core__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
        _perx_core__WEBPACK_IMPORTED_MODULE_3__["IGameService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
], TapComponent);



/***/ })

}]);
//# sourceMappingURL=tap-tap-module-es2015.js.map