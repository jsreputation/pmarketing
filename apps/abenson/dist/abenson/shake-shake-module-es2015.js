(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["shake-shake-module"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/shake/shake/shake.component.html":
/*!*************************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/shake/shake/shake.component.html ***!
  \*************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-puzzle-container\" *ngIf=\"game$ | async as game\">\n  <div>\n    <h1>{{game.texts.title}}</h1>\n    <h3>{{game.texts.subTitle}}</h3>\n  </div>\n  <div class=\"game-wrapper\">\n    <perx-core-shake-tree\n      [treeImg]=\"game.config.treeImg\"\n      [giftImg]=\"game.config.giftImg\"\n      [nbHangedGifts]=\"game.config.nbHangedGift\"\n      [nbFallingGifts]=\"game.config.nbGiftsToDrop\"\n      (completed)=\"gameCompleted()\"\n      [enabled]=\"isEnabled\"\n      [nbShakes]=\"game.config.nbTaps\">\n    </perx-core-shake-tree>\n  </div>  \n  <button\n    mat-flat-button\n    color=\"primary\"\n    (click)=\"isEnabled = true\"\n    [ngStyle]=\"{ 'visibility': isEnabled ? 'hidden': 'visible'}\">\n    {{ game.texts.button }}\n  </button>\n</div>"

/***/ }),

/***/ "./src/app/shake/shake-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/shake/shake-routing.module.ts ***!
  \***********************************************/
/*! exports provided: ShakeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShakeRoutingModule", function() { return ShakeRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _shake_shake_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shake/shake.component */ "./src/app/shake/shake/shake.component.ts");




const routes = [
    { path: '', pathMatch: 'full', component: _shake_shake_component__WEBPACK_IMPORTED_MODULE_3__["ShakeComponent"] },
    { path: '*', redirectTo: '' }
];
let ShakeRoutingModule = class ShakeRoutingModule {
};
ShakeRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], ShakeRoutingModule);



/***/ }),

/***/ "./src/app/shake/shake.module.ts":
/*!***************************************!*\
  !*** ./src/app/shake/shake.module.ts ***!
  \***************************************/
/*! exports provided: ShakeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShakeModule", function() { return ShakeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _shake_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./shake-routing.module */ "./src/app/shake/shake-routing.module.ts");
/* harmony import */ var _shake_shake_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./shake/shake.component */ "./src/app/shake/shake/shake.component.ts");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm2015/perx-core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");
/* harmony import */ var _mock_games_mock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mock/games.mock */ "./src/app/mock/games.mock.ts");









const gameServiceStub = {
    get: (id) => Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(_mock_games_mock__WEBPACK_IMPORTED_MODULE_8__["games"][id]),
    getGamesFromCampaign: (id) => Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(_mock_games_mock__WEBPACK_IMPORTED_MODULE_8__["games"].filter(game => game.campaignId === id))
};
let ShakeModule = class ShakeModule {
};
ShakeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [
            _shake_shake_component__WEBPACK_IMPORTED_MODULE_4__["ShakeComponent"]
        ],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _perx_core__WEBPACK_IMPORTED_MODULE_5__["GameModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _shake_routing_module__WEBPACK_IMPORTED_MODULE_3__["ShakeRoutingModule"]
        ],
        providers: [
            { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["IGameService"], useValue: gameServiceStub },
        ]
    })
], ShakeModule);



/***/ }),

/***/ "./src/app/shake/shake/shake.component.scss":
/*!**************************************************!*\
  !*** ./src/app/shake/shake/shake.component.scss ***!
  \**************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-puzzle-container {\n  -webkit-flex: 2;\n          flex: 2;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  -webkit-align-items: center;\n          align-items: center;\n  height: 100%;\n  background: linear-gradient(180deg, #3a6186 0%, #89243e 100%);\n}\n.main-puzzle-container h1 {\n  color: white;\n  text-align: center;\n  font-family: Roboto, sans-serif;\n  padding: 2rem 0 0 0;\n}\n.main-puzzle-container h3 {\n  color: white;\n  text-align: center;\n  margin: 0;\n}\n.game-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  width: 100%;\n}\nbutton {\n  max-width: 31.5rem;\n  min-width: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvc2hha2Uvc2hha2Uvc2hha2UuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3NoYWtlL3NoYWtlL3NoYWtlLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBO0VBQ0UsZUFBQTtVQUFBLE9BQUE7RUFDQSxxQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EscUNBQUE7VUFBQSw2QkFBQTtFQUNBLDJCQUFBO1VBQUEsbUJBQUE7RUFFQSxZQUFBO0VBQ0EsNkRBQUE7QUNERjtBREdFO0VBQ0UsWUFBQTtFQUNBLGtCQUFBO0VBQ0EsK0JBQUE7RUFDQSxtQkFBQTtBQ0RKO0FESUU7RUFDRSxZQUFBO0VBQ0Esa0JBQUE7RUFDQSxTQUFBO0FDRko7QURNQTtFQUNFLHFCQUFBO0VBQUEsYUFBQTtFQUNBLCtCQUFBO1VBQUEsdUJBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsV0FBQTtBQ0hGO0FETUE7RUFDRSxrQkFBQTtFQUNBLGNBQUE7QUNIRiIsImZpbGUiOiJzcmMvYXBwL3NoYWtlL3NoYWtlL3NoYWtlLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiXG4ubWFpbi1wdXp6bGUtY29udGFpbmVyIHtcbiAgZmxleDogMjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIC8vIG1hcmdpbjogMnJlbSAtMS4ycmVtO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICMzYTYxODYgMCUsICM4OTI0M2UgMTAwJSk7XG5cbiAgaDEge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcbiAgICBwYWRkaW5nOiAycmVtIDAgMCAwO1xuICB9XG5cbiAgaDMge1xuICAgIGNvbG9yOiB3aGl0ZTtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gICAgbWFyZ2luOiAwO1xuICB9XG59XG5cbi5nYW1lLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbmJ1dHRvbiB7XG4gIG1heC13aWR0aDogMzEuNXJlbTtcbiAgbWluLXdpZHRoOiA1MCU7XG59XG4iLCIubWFpbi1wdXp6bGUtY29udGFpbmVyIHtcbiAgZmxleDogMjtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1hcm91bmQ7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGhlaWdodDogMTAwJTtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNhNjE4NiAwJSwgIzg5MjQzZSAxMDAlKTtcbn1cbi5tYWluLXB1enpsZS1jb250YWluZXIgaDEge1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcbiAgcGFkZGluZzogMnJlbSAwIDAgMDtcbn1cbi5tYWluLXB1enpsZS1jb250YWluZXIgaDMge1xuICBjb2xvcjogd2hpdGU7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luOiAwO1xufVxuXG4uZ2FtZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAxMDAlO1xufVxuXG5idXR0b24ge1xuICBtYXgtd2lkdGg6IDMxLjVyZW07XG4gIG1pbi13aWR0aDogNTAlO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/shake/shake/shake.component.ts":
/*!************************************************!*\
  !*** ./src/app/shake/shake/shake.component.ts ***!
  \************************************************/
/*! exports provided: ShakeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "ShakeComponent", function() { return ShakeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm2015/perx-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");





let ShakeComponent = class ShakeComponent {
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
        }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])((games) => games.filter(game => game.type === _perx_core__WEBPACK_IMPORTED_MODULE_3__["GameType"].shakeTheTree)[0]));
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
ShakeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
        selector: 'app-shake',
        template: __webpack_require__(/*! raw-loader!./shake.component.html */ "../../node_modules/raw-loader/index.js!./src/app/shake/shake/shake.component.html"),
        styles: [__webpack_require__(/*! ./shake.component.scss */ "./src/app/shake/shake/shake.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
        _perx_core__WEBPACK_IMPORTED_MODULE_3__["NotificationService"],
        _perx_core__WEBPACK_IMPORTED_MODULE_3__["IGameService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_2__["ActivatedRoute"]])
], ShakeComponent);



/***/ })

}]);
//# sourceMappingURL=shake-shake-module-es2015.js.map