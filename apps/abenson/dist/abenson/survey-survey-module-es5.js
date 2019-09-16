(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["survey-survey-module"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/survey/survey/survey.component.html":
/*!****************************************************************************************************************************!*\
  !*** /Users/perx/Documents/GitHub/microsite-apps-ng/node_modules/raw-loader!./src/app/survey/survey/survey.component.html ***!
  \****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"survey-page\">\n    <div class=\"progress-bar\">\n        <mat-progress-bar mode=\"determinate\" color=\"warn\" [value]=\"progressBarValue\"></mat-progress-bar>\n        <div class=\"progress-bar-label\">\n            {{ progressBarValue }}% Complete\n        </div>\n    </div>\n    <mat-card class=\"survey-card mat-elevation-z2\" *ngIf=\"data$ | async as data\">\n        <h1>Headline</h1>\n        <h2>Sub-headline</h2>\n        <perx-core-survey \n            [data]=\"data$\"\n            (surveyDone)=\"updateSurveyStatus($event)\"\n            (totalLength)=\"setTotalLength($event)\"\n            (currentPointer)=\"setCurrentPointer($event)\"\n            ></perx-core-survey>\n        <button *ngIf=\"surveyComplete\" mat-flat-button color=\"primary\" (click)=\"onSubmit()\">Submit</button>\n    </mat-card>\n</div>"

/***/ }),

/***/ "./src/app/mock/survey.mock.ts":
/*!*************************************!*\
  !*** ./src/app/mock/survey.mock.ts ***!
  \*************************************/
/*! exports provided: survey */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "survey", function() { return survey; });
var survey = {
    title: 'Please help us knowing you better',
    questions: [
        {
            question: 'Which color you like?',
            description: 'Please select',
            id: '1',
            required: false,
            payload: {
                type: 'select',
                multiple: false,
                choices: [
                    'blue',
                    'white',
                    'red'
                ]
            }
        },
        {
            question: 'How can we reach you?',
            description: 'No offence taken',
            id: '9',
            required: false,
            payload: {
                type: 'picture-select',
                multiple: true,
                choices: [
                    {
                        img_url: 'https://picsum.photos/600/900',
                        text: 'The first'
                    },
                    {
                        img_url: 'https://picsum.photos/600/900',
                        text: 'The second'
                    },
                    {
                        img_url: 'https://picsum.photos/600/900',
                        text: 'The second'
                    },
                    {
                        img_url: 'https://picsum.photos/600/900',
                        text: 'The second'
                    }
                ]
            }
        },
        {
            question: 'When were you born?',
            description: 'It\'s between us',
            id: '2',
            required: true,
            payload: {
                duration: true,
                type: 'date'
            }
        },
        {
            question: 'How can we reach you?',
            description: 'No offence taken',
            id: '8',
            required: false,
            payload: {
                type: 'phone',
                default_country_code: 'SG'
            }
        },
        {
            question: 'How likely are you to recommend our service?',
            description: 'Please rate us',
            id: '11',
            required: false,
            payload: {
                type: 'rating',
                color: 'primary',
                left_label: 'not much',
                right_label: 'a lot',
                scale: 6,
                shape: 'circle'
            }
        },
        {
            question: 'Tell us more about us',
            description: 'No offence taken',
            id: '7',
            required: true,
            payload: {
                type: 'group',
                questions: [
                    {
                        question: 'What\'s your favorite color 1',
                        description: 'We love blue',
                        id: '7.1',
                        required: false,
                        payload: {
                            type: 'select',
                            choices: [
                                'blue',
                                'white',
                                'red'
                            ]
                        }
                    },
                    {
                        question: 'What\'s your favorite color 2',
                        description: 'We love blue',
                        id: '7.2',
                        required: true,
                        payload: {
                            type: 'select',
                            choices: [
                                'blue',
                                'white',
                                'red'
                            ]
                        }
                    }
                ]
            }
        },
        {
            question: 'From when to when was your first job?',
            description: 'Compliance',
            id: '3',
            required: false,
            payload: {
                type: 'date',
                period: true
            }
        },
        {
            question: 'From when to when was your first job?',
            description: 'Compliance',
            id: '4',
            required: false,
            payload: {
                type: 'date',
                period: true
            }
        },
        {
            question: 'Tell us more about you',
            description: 'Be frank',
            id: '5',
            required: false,
            payload: {
                type: 'long-text',
                'max-length': 20
            }
        },
        {
            question: 'Tell us more about us',
            description: 'No offence taken',
            id: '6',
            required: false,
            payload: {
                type: 'long-text'
            }
        }
    ]
};


/***/ }),

/***/ "./src/app/survey/survey-routing.module.ts":
/*!*************************************************!*\
  !*** ./src/app/survey/survey-routing.module.ts ***!
  \*************************************************/
/*! exports provided: SurveyRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyRoutingModule", function() { return SurveyRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./survey/survey.component */ "./src/app/survey/survey/survey.component.ts");




var routes = [
    { path: '', pathMatch: 'full', component: _survey_survey_component__WEBPACK_IMPORTED_MODULE_3__["SurveyComponent"] },
    { path: '*', redirectTo: '' }
];
var SurveyRoutingModule = /** @class */ (function () {
    function SurveyRoutingModule() {
    }
    SurveyRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], SurveyRoutingModule);
    return SurveyRoutingModule;
}());



/***/ }),

/***/ "./src/app/survey/survey.module.ts":
/*!*****************************************!*\
  !*** ./src/app/survey/survey.module.ts ***!
  \*****************************************/
/*! exports provided: SurveyModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyModule", function() { return SurveyModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _survey_routing_module__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./survey-routing.module */ "./src/app/survey/survey-routing.module.ts");
/* harmony import */ var _survey_survey_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./survey/survey.component */ "./src/app/survey/survey/survey.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _mock_survey_mock__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ../mock/survey.mock */ "./src/app/mock/survey.mock.ts");









var surveyServiceStub = {
    // @ts-ignore
    getSurveyFromCampaign: function (id) { return Object(rxjs__WEBPACK_IMPORTED_MODULE_7__["of"])(_mock_survey_mock__WEBPACK_IMPORTED_MODULE_8__["survey"]); }
};
var SurveyModule = /** @class */ (function () {
    function SurveyModule() {
    }
    SurveyModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [_survey_survey_component__WEBPACK_IMPORTED_MODULE_5__["SurveyComponent"]],
            imports: [
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatProgressBarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatDatepickerModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatRadioModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_6__["MatCheckboxModule"],
                _survey_routing_module__WEBPACK_IMPORTED_MODULE_4__["SurveyRoutingModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_3__["SurveyModule"]
            ],
            providers: [
                { provide: _perx_core__WEBPACK_IMPORTED_MODULE_3__["SurveyService"], useValue: surveyServiceStub },
            ]
        })
    ], SurveyModule);
    return SurveyModule;
}());



/***/ }),

/***/ "./src/app/survey/survey/survey.component.scss":
/*!*****************************************************!*\
  !*** ./src/app/survey/survey/survey.component.scss ***!
  \*****************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".survey-page {\n  height: 100%;\n  width: 100%;\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-align-items: center;\n          align-items: center;\n  background: linear-gradient(180deg, #3a6186 0%, #89243e 100%);\n  padding: 1rem;\n  box-sizing: border-box;\n}\n.survey-page .progress-bar {\n  width: 100%;\n}\n.survey-page .progress-bar .progress-bar-label {\n  width: 100%;\n  font-size: 1.2rem;\n  line-height: 1.6rem;\n  color: #fff;\n  letter-spacing: 0.4px;\n  text-align: left;\n}\n.survey-page .survey-card {\n  display: -webkit-flex;\n  display: flex;\n  -webkit-flex-direction: column;\n          flex-direction: column;\n  -webkit-align-items: center;\n          align-items: center;\n  min-width: 34rem;\n  max-width: 80%;\n  margin-top: 2rem;\n}\n.survey-page .survey-card h1 {\n  font-style: normal;\n  font-weight: 500;\n  font-size: 2rem;\n  text-align: center;\n}\n.survey-page .survey-card h2 {\n  font-style: normal;\n  font-weight: normal;\n  font-size: 1.6rem;\n  text-align: center;\n  color: #666666;\n}\n.survey-page .survey-card button {\n  width: 80%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9Vc2Vycy9wZXJ4L0RvY3VtZW50cy9HaXRIdWIvbWljcm9zaXRlLWFwcHMtbmcvYXBwcy9hYmVuc29uL3NyYy9hcHAvc3VydmV5L3N1cnZleS9zdXJ2ZXkuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL3N1cnZleS9zdXJ2ZXkvc3VydmV5LmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsWUFBQTtFQUNBLFdBQUE7RUFDQSxxQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsMkJBQUE7VUFBQSxtQkFBQTtFQUNBLDZEQUFBO0VBQ0EsYUFBQTtFQUNBLHNCQUFBO0FDQ0Y7QURDRTtFQUNFLFdBQUE7QUNDSjtBRENJO0VBQ0UsV0FBQTtFQUNBLGlCQUFBO0VBQ0EsbUJBQUE7RUFDQSxXQUFBO0VBQ0EscUJBQUE7RUFDQSxnQkFBQTtBQ0NOO0FER0U7RUFDRSxxQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtVQUFBLHNCQUFBO0VBQ0EsMkJBQUE7VUFBQSxtQkFBQTtFQUNBLGdCQUFBO0VBQ0EsY0FBQTtFQUNBLGdCQUFBO0FDREo7QURHSTtFQUNFLGtCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxlQUFBO0VBQ0Esa0JBQUE7QUNETjtBRElJO0VBQ0Usa0JBQUE7RUFDQSxtQkFBQTtFQUNBLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FDRk47QURLSTtFQUNFLFVBQUE7QUNITiIsImZpbGUiOiJzcmMvYXBwL3N1cnZleS9zdXJ2ZXkvc3VydmV5LmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiLnN1cnZleS1wYWdlIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNhNjE4NiAwJSwgIzg5MjQzZSAxMDAlKTtcbiAgcGFkZGluZzogMXJlbTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcblxuICAucHJvZ3Jlc3MtYmFyIHtcbiAgICB3aWR0aDogMTAwJTtcblxuICAgIC5wcm9ncmVzcy1iYXItbGFiZWwge1xuICAgICAgd2lkdGg6IDEwMCU7XG4gICAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICAgIGxpbmUtaGVpZ2h0OiAxLjZyZW07XG4gICAgICBjb2xvcjogI2ZmZjtcbiAgICAgIGxldHRlci1zcGFjaW5nOiAwLjRweDtcbiAgICAgIHRleHQtYWxpZ246IGxlZnQ7XG4gICAgfVxuICB9XG5cbiAgLnN1cnZleS1jYXJkIHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtaW4td2lkdGg6IDM0cmVtO1xuICAgIG1heC13aWR0aDogODAlO1xuICAgIG1hcmdpbi10b3A6IDJyZW07XG5cbiAgICBoMSB7XG4gICAgICBmb250LXN0eWxlOiBub3JtYWw7XG4gICAgICBmb250LXdlaWdodDogNTAwO1xuICAgICAgZm9udC1zaXplOiAycmVtO1xuICAgICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIH1cblxuICAgIGgyIHtcbiAgICAgIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIH1cblxuICAgIGJ1dHRvbiB7XG4gICAgICB3aWR0aDogODAlO1xuICAgIH1cbiAgfVxufVxuIiwiLnN1cnZleS1wYWdlIHtcbiAgaGVpZ2h0OiAxMDAlO1xuICB3aWR0aDogMTAwJTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgYmFja2dyb3VuZDogbGluZWFyLWdyYWRpZW50KDE4MGRlZywgIzNhNjE4NiAwJSwgIzg5MjQzZSAxMDAlKTtcbiAgcGFkZGluZzogMXJlbTtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbn1cbi5zdXJ2ZXktcGFnZSAucHJvZ3Jlc3MtYmFyIHtcbiAgd2lkdGg6IDEwMCU7XG59XG4uc3VydmV5LXBhZ2UgLnByb2dyZXNzLWJhciAucHJvZ3Jlc3MtYmFyLWxhYmVsIHtcbiAgd2lkdGg6IDEwMCU7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBsaW5lLWhlaWdodDogMS42cmVtO1xuICBjb2xvcjogI2ZmZjtcbiAgbGV0dGVyLXNwYWNpbmc6IDAuNHB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xufVxuLnN1cnZleS1wYWdlIC5zdXJ2ZXktY2FyZCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1pbi13aWR0aDogMzRyZW07XG4gIG1heC13aWR0aDogODAlO1xuICBtYXJnaW4tdG9wOiAycmVtO1xufVxuLnN1cnZleS1wYWdlIC5zdXJ2ZXktY2FyZCBoMSB7XG4gIGZvbnQtc3R5bGU6IG5vcm1hbDtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zaXplOiAycmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG4uc3VydmV5LXBhZ2UgLnN1cnZleS1jYXJkIGgyIHtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjb2xvcjogIzY2NjY2Njtcbn1cbi5zdXJ2ZXktcGFnZSAuc3VydmV5LWNhcmQgYnV0dG9uIHtcbiAgd2lkdGg6IDgwJTtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/survey/survey/survey.component.ts":
/*!***************************************************!*\
  !*** ./src/app/survey/survey/survey.component.ts ***!
  \***************************************************/
/*! exports provided: SurveyComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "SurveyComponent", function() { return SurveyComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");





var SurveyComponent = /** @class */ (function () {
    function SurveyComponent(notificationService, router, route, surveyService) {
        this.notificationService = notificationService;
        this.router = router;
        this.route = route;
        this.surveyService = surveyService;
    }
    SurveyComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.data$ = this.route.paramMap
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["filter"])(function (params) { return params.has('id'); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["switchMap"])(function (params) {
            var id = params.get('id');
            var idN = Number.parseInt(id, 10);
            return _this.surveyService.getSurveyFromCampaign(idN);
        }));
    };
    Object.defineProperty(SurveyComponent.prototype, "progressBarValue", {
        get: function () {
            return Math.round(this.currentPointer / this.totalLength * 100) || 0;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(SurveyComponent.prototype, "surveyComplete", {
        get: function () {
            return this.currentPointer === this.totalLength;
        },
        enumerable: true,
        configurable: true
    });
    SurveyComponent.prototype.onSubmit = function () {
        this.router.navigate(['/wallet']);
        this.notificationService.addPopup({
            text: 'Here is a reward for you.',
            title: 'Thanks for completing the survey.',
            buttonTxt: 'View Reward',
            imageUrl: 'assets/congrats_image.png'
        });
    };
    SurveyComponent.prototype.setTotalLength = function (totalLength) {
        this.totalLength = totalLength;
    };
    SurveyComponent.prototype.setCurrentPointer = function (currentPointer) {
        this.currentPointer = currentPointer;
    };
    SurveyComponent.prototype.updateSurveyStatus = function (answers) {
        this.answers = answers;
    };
    SurveyComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-survey',
            template: __webpack_require__(/*! raw-loader!./survey.component.html */ "../../node_modules/raw-loader/index.js!./src/app/survey/survey/survey.component.html"),
            styles: [__webpack_require__(/*! ./survey.component.scss */ "./src/app/survey/survey/survey.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["NotificationService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["Router"],
            _angular_router__WEBPACK_IMPORTED_MODULE_3__["ActivatedRoute"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["SurveyService"]])
    ], SurveyComponent);
    return SurveyComponent;
}());



/***/ })

}]);
//# sourceMappingURL=survey-survey-module-es5.js.map