(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["stamp-stamp-module"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/stamp/card/card.component.html":
/*!***********************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/stamp/card/card.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-puzzle-container\" *ngIf=\"stampCard$ | async as stampCard\">\n  <div class=\"game-wrapper\">\n    <div>\n      <h1>{{this.title}}</h1>\n      <h3>{{this.subTitle}}</h3>\n    </div>\n    <perx-core-puzzle-collect-stamps \n      [nbSlots]=\"stampCard.campaignConfig.totalSlots\" \n      [stamps]=\"stampCard.collectionStamps\" \n      [rewards]=\"stampCard.campaignConfig.collectionRewards\"\n      [preStampImg]=\"stampCard.displayProperties.preStampImg\" \n      [postStampImg]=\"stampCard.displayProperties.postStampImg\"\n      [rewardPreStamp]=\"stampCard.displayProperties.rewardPostStamp\" \n      [rewardPostStamp]=\"stampCard.displayProperties.rewardPostStamp\">\n    </perx-core-puzzle-collect-stamps>\n  </div>\n</div>"

/***/ }),

/***/ "./src/app/mock/stamp.mock.ts":
/*!************************************!*\
  !*** ./src/app/mock/stamp.mock.ts ***!
  \************************************/
/*! exports provided: stampCard */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "stampCard", function() { return stampCard; });
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm2015/perx-core.js");

const stampCard = {
    id: 1,
    userAccountId: 1,
    state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["StampCardState"].active,
    campaignId: 1,
    cardNumber: 1,
    campaignConfig: {
        totalSlots: 10,
        rewards: [],
        collectionRewards: [
            { rewardPosition: 0 },
            { rewardPosition: 2 }
        ]
    },
    displayProperties: {
        numberOfCols: 1,
        numberOfRows: 1,
        cardImage: {
            value: {
                imageUrl: 'string'
            }
        },
        preStampImg: 'assets/stamps/pre_stamp.png',
        postStampImg: 'assets/stamps/post_stamp_redeemed.png',
        rewardPreStamp: 'assets/stamps/pre_reward.png',
        rewardPostStamp: 'assets/stamps/post_reward.png',
        totalSlots: 1,
    },
    collectionStamps: [
        { id: 1, state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["PuzzleCollectStampState"].redeemed },
        { id: 2, state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["PuzzleCollectStampState"].redeemed },
        { id: 3, state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["PuzzleCollectStampState"].redeemed },
        { id: 3, state: _perx_core__WEBPACK_IMPORTED_MODULE_0__["PuzzleCollectStampState"].issued }
    ]
};


/***/ }),

/***/ "./src/app/stamp/card/card.component.scss":
/*!************************************************!*\
  !*** ./src/app/stamp/card/card.component.scss ***!
  \************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-puzzle-container {\n  -webkit-flex: 2;\n          flex: 2;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-justify-content: space-around;\n          justify-content: space-around;\n  -webkit-align-items: center;\n          align-items: center;\n  height: 100%;\n  background: linear-gradient(180deg, #3a6186 0%, #89243e 100%);\n}\n\n.game-wrapper {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-justify-content: center;\n          justify-content: center;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  width: 34.5rem;\n  background-color: white;\n  -webkit-align-items: center;\n          align-items: center;\n  border-radius: 0.8rem;\n  padding: 1rem;\n}\n\n.game-wrapper h1 {\n  font-style: normal;\n  font-weight: 500;\n  font-size: 20px;\n  font-family: Roboto, sans-serif;\n  text-align: center;\n}\n\n.game-wrapper h3 {\n  text-align: center;\n  margin: 0;\n  color: #666666;\n}\n\nbutton {\n  width: 50%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvc3RhbXAvY2FyZC9jYXJkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9zdGFtcC9jYXJkL2NhcmQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxlQUFBO1VBQUEsT0FBQTtFQUNBLHFCQUFBO0VBQUEsYUFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSxxQ0FBQTtVQUFBLDZCQUFBO0VBQ0EsMkJBQUE7VUFBQSxtQkFBQTtFQUNBLFlBQUE7RUFDQSw2REFBQTtBQ0NGOztBREVBO0VBQ0UscUJBQUE7RUFBQSxhQUFBO0VBQ0EsK0JBQUE7VUFBQSx1QkFBQTtFQUNBLDhCQUFBO1VBQUEsc0JBQUE7RUFDQSxjQUFBO0VBQ0EsdUJBQUE7RUFDQSwyQkFBQTtVQUFBLG1CQUFBO0VBQ0EscUJBQUE7RUFDQSxhQUFBO0FDQ0Y7O0FEQ0U7RUFDRSxrQkFBQTtFQUNBLGdCQUFBO0VBQ0EsZUFBQTtFQUVBLCtCQUFBO0VBQ0Esa0JBQUE7QUNBSjs7QURHRTtFQUNFLGtCQUFBO0VBQ0EsU0FBQTtFQUNBLGNBQUE7QUNESjs7QURLQTtFQUNFLFVBQUE7QUNGRiIsImZpbGUiOiJzcmMvYXBwL3N0YW1wL2NhcmQvY2FyZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5tYWluLXB1enpsZS1jb250YWluZXIge1xuICBmbGV4OiAyO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWFyb3VuZDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgaGVpZ2h0OiAxMDAlO1xuICBiYWNrZ3JvdW5kOiBsaW5lYXItZ3JhZGllbnQoMTgwZGVnLCAjM2E2MTg2IDAlLCAjODkyNDNlIDEwMCUpO1xufVxuXG4uZ2FtZS13cmFwcGVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIHdpZHRoOiAzNC41cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiB3aGl0ZTtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYm9yZGVyLXJhZGl1czogMC44cmVtO1xuICBwYWRkaW5nOiAxcmVtO1xuXG4gIGgxIHtcbiAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgICBmb250LXNpemU6IDIwcHg7XG4gICAgLy8gbGluZS1oZWlnaHQ6IDIzcHg7XG4gICAgZm9udC1mYW1pbHk6IFJvYm90bywgc2Fucy1zZXJpZjtcbiAgICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIH1cblxuICBoMyB7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIG1hcmdpbjogMDtcbiAgICBjb2xvcjogIzY2NjY2NjtcbiAgfVxufVxuXG5idXR0b24ge1xuICB3aWR0aDogNTAlO1xufVxuIiwiLm1haW4tcHV6emxlLWNvbnRhaW5lciB7XG4gIGZsZXg6IDI7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBoZWlnaHQ6IDEwMCU7XG4gIGJhY2tncm91bmQ6IGxpbmVhci1ncmFkaWVudCgxODBkZWcsICMzYTYxODYgMCUsICM4OTI0M2UgMTAwJSk7XG59XG5cbi5nYW1lLXdyYXBwZXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgd2lkdGg6IDM0LjVyZW07XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBib3JkZXItcmFkaXVzOiAwLjhyZW07XG4gIHBhZGRpbmc6IDFyZW07XG59XG4uZ2FtZS13cmFwcGVyIGgxIHtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogNTAwO1xuICBmb250LXNpemU6IDIwcHg7XG4gIGZvbnQtZmFtaWx5OiBSb2JvdG8sIHNhbnMtc2VyaWY7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cbi5nYW1lLXdyYXBwZXIgaDMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIG1hcmdpbjogMDtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG5cbmJ1dHRvbiB7XG4gIHdpZHRoOiA1MCU7XG59Il19 */"

/***/ }),

/***/ "./src/app/stamp/card/card.component.ts":
/*!**********************************************!*\
  !*** ./src/app/stamp/card/card.component.ts ***!
  \**********************************************/
/*! exports provided: CardComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CardComponent", function() { return CardComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm2015/perx-core.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm2015/operators/index.js");





let CardComponent = class CardComponent {
    constructor(stampService, route) {
        this.stampService = stampService;
        this.route = route;
        this.title = 'Scratch & Win!';
        this.subTitle = 'Collect all 10 stickers and win a reward!';
        this.isEnabled = false;
        this.congratsDetailText = 'You just won 2 rewards';
    }
    ngOnInit() {
        this.stampCard$ = this.route.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])((params) => params.has('id')), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])((params) => {
            const id = params.get('id');
            const idN = Number.parseInt(id, 10);
            return this.stampService.getCurrentCard(idN);
        }));
    }
};
CardComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_3__["Component"])({
        selector: 'app-card',
        template: __webpack_require__(/*! raw-loader!./card.component.html */ "../../node_modules/raw-loader/index.js!./src/app/stamp/card/card.component.html"),
        styles: [__webpack_require__(/*! ./card.component.scss */ "./src/app/stamp/card/card.component.scss")]
    }),
    tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["StampService"],
        _angular_router__WEBPACK_IMPORTED_MODULE_1__["ActivatedRoute"]])
], CardComponent);



/***/ }),

/***/ "./src/app/stamp/stamp-routing.module.ts":
/*!***********************************************!*\
  !*** ./src/app/stamp/stamp-routing.module.ts ***!
  \***********************************************/
/*! exports provided: StampRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampRoutingModule", function() { return StampRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm2015/router.js");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./card/card.component */ "./src/app/stamp/card/card.component.ts");




const routes = [
    { path: '', pathMatch: 'full', component: _card_card_component__WEBPACK_IMPORTED_MODULE_3__["CardComponent"] },
    { path: '*', redirectTo: '' }
];
let StampRoutingModule = class StampRoutingModule {
};
StampRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
        exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
    })
], StampRoutingModule);



/***/ }),

/***/ "./src/app/stamp/stamp.module.ts":
/*!***************************************!*\
  !*** ./src/app/stamp/stamp.module.ts ***!
  \***************************************/
/*! exports provided: StampModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "StampModule", function() { return StampModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm2015/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm2015/common.js");
/* harmony import */ var _stamp_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./stamp-routing.module */ "./src/app/stamp/stamp-routing.module.ts");
/* harmony import */ var _card_card_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./card/card.component */ "./src/app/stamp/card/card.component.ts");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm2015/perx-core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm2015/material.js");
/* harmony import */ var _mock_stamp_mock__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./../mock/stamp.mock */ "./src/app/mock/stamp.mock.ts");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm2015/index.js");









const stampServiceStub = {
    // @ts-ignore
    getCurrentCard: (id) => Object(rxjs__WEBPACK_IMPORTED_MODULE_8__["of"])(_mock_stamp_mock__WEBPACK_IMPORTED_MODULE_7__["stampCard"])
};
let StampModule = class StampModule {
};
StampModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
    Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
        declarations: [_card_card_component__WEBPACK_IMPORTED_MODULE_4__["CardComponent"]],
        imports: [
            _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
            _perx_core__WEBPACK_IMPORTED_MODULE_5__["PuzzlesModule"],
            _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
            _stamp_routing_module__WEBPACK_IMPORTED_MODULE_3__["StampRoutingModule"]
        ],
        providers: [
            { provide: _perx_core__WEBPACK_IMPORTED_MODULE_5__["StampService"], useValue: stampServiceStub }
        ]
    })
], StampModule);



/***/ })

}]);
//# sourceMappingURL=stamp-stamp-module-es2015.js.map