(window["webpackJsonp"] = window["webpackJsonp"] || []).push([["home-home-module"],{

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/campaigns/campaigns.component.html":
/*!*********************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/campaigns/campaigns.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"campaigns && campaigns.length > 0\" class=\"main-container\">\n    <h1>Games for you</h1>\n    <div class=\"cards\">\n        <mat-card *ngFor=\"let campaign of campaigns\" (click)=\"selected(campaign)\" matRipple>\n            <img mat-card-image [src]=\"campaign.thumbnailUrl\">\n            <mat-card-content>\n                <div>\n                    <h1>{{campaign.name}}</h1>\n                </div>\n                <div class=\"icon\">\n                    <img src=\"assets/forward-arrow.svg\" alt=\"\">\n                </div>\n            </mat-card-content>\n            <mat-card-footer></mat-card-footer>\n        </mat-card>\n    </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/catalogs/catalogs.component.html":
/*!*******************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/catalogs/catalogs.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"(catalogs$ | async) as catalogs\" class=\"main-container\">\n    <h1 *ngIf=\"catalogs.length > 0\">More to enjoy</h1>\n    <div *ngIf=\"catalogs.length > 0\" class=\"cards\">\n        <mat-card *ngFor=\"let catalog of catalogs\" (click)=\"selected(catalog)\" matRipple>\n            <img mat-card-image [src]=\"catalog.catalogBanner\">\n            <mat-card-content>\n                <div>\n                    <h1>{{catalog.name}}</h1>\n                    <h2>{{catalog.description}}</h2>\n                    <!-- <h3>{{catalog.rewardCount}} Rewards</h3> -->\n                </div>\n                <div class=\"icon\">\n                    <img src=\"assets/forward-arrow.svg\" alt=\"\">\n                </div>\n            </mat-card-content>\n            <mat-card-footer></mat-card-footer>\n        </mat-card>\n    </div>\n</div>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/categories/categories.component.html":
/*!***********************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/categories/categories.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\">\n    <perx-core-rewards-list-tabbed [tabs$]=\"tabs$\" (tapped)=\"rewardClickedHandler($event)\">\n    </perx-core-rewards-list-tabbed>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/discover/discover.component.html":
/*!*******************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/discover/discover.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<perx-core-loyalty-summary [profile]=\"profile\" [loyalty]=\"loyalty\"></perx-core-loyalty-summary>\n<h1>Snapping Saturday</h1>\n<app-rewards-cards (tapped)=\"rewardSelected($event)\"></app-rewards-cards>\n<app-catalogs (tapped)=\"catalogSelected($event)\"></app-catalogs>\n<app-campaigns (tapped)=\"campaignSelected($event)\"></app-campaigns>\n<app-categories></app-categories>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/home/home.component.html":
/*!***********************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/home/home.component.html ***!
  \***********************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"app\">\n  <mat-toolbar>\n    <mat-toolbar-row mat-tab-nav-bar>\n      <a mat-tab-link routerLink=\"discover\" routerLinkActive #disco=\"routerLinkActive\"\n        [active]=\"disco.isActive\">Discover</a>\n      <a mat-tab-link routerLink=\"vouchers\" routerLinkActive #vouch=\"routerLinkActive\" [active]=\"vouch.isActive\">My\n        Rewards</a>\n    </mat-toolbar-row>\n  </mat-toolbar>\n  <div class=\"content\">\n    <router-outlet></router-outlet>\n  </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/news-feed/news-feed.component.html":
/*!*********************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/news-feed/news-feed.component.html ***!
  \*********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"cdk-virtual-scroll-data-source\" (window:resize)=\"onResize()\">\n  <cdk-virtual-scroll-viewport (scrolledIndexChange)=\"updateScrollIndex($event)\" [itemSize]=\"itemSize\"\n    orientation=\"horizontal\">\n    <mat-card *cdkVirtualFor=\"let item of items\" class=\"mat-item mat-elevation-z2\"\n      [ngStyle]=\"{'width': ((itemSize-48) / 10)+'rem'}\">\n      <img mat-card-image [src]=\"item.image\" *ngIf=\"item.image\">\n      <mat-card-content>\n        <p>{{ getFirstLine((item.description)).length > 120 ? getFirstLine((item.description | slice:0:120)) + '...' : getFirstLine((item.description)) }}</p>\n      </mat-card-content>\n      <mat-card-actions>\n        <button mat-button color=\"primary\" (click)=\"readMore(item)\">Read More</button>\n      </mat-card-actions>\n    </mat-card>\n  </cdk-virtual-scroll-viewport>\n</div>\n\n<div class=\"dots\">\n  <div class=\"container\">\n    <span class=\"gray-dot\" *ngFor=\"let i of newsBeforeScroll\"></span>\n    <span class=\"green-bar\"></span>\n    <span class=\"gray-dot\" *ngFor=\"let i of newsAfterScroll\"></span>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/news-feed/popup/popup.component.html":
/*!***********************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/news-feed/popup/popup.component.html ***!
  \***********************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"main-container\">\n    <div class=\"header\" mat-dialog-title>\n        <button class=\"icon\" mat-dialog-close>\n            <mat-icon>close</mat-icon>\n        </button>\n        <img [src]=\"item.image\" *ngIf=\"item.image\">\n    </div>\n    <p mat-dialog-content>\n        {{item.description}}\n    </p>\n    <div class=\"spacer\"></div>\n    <div mat-dialog-actions>\n        <a mat-flat-button color=\"primary\" [href]=\"item.link\">{{item.title}}</a>\n    </div>\n</div>"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/rewards-cards/rewards-cards.component.html":
/*!*****************************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/rewards-cards/rewards-cards.component.html ***!
  \*****************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<mat-card\n\t*ngFor=\"let reward of rewards | async\"\n\tmatRipple (click)=\"selected(reward)\">\n\t<div class=\"featured-image\">\n\t\t<img mat-card-image [src]=\"reward.rewardBanner\">\n\t\t<div *ngIf=\"getMacaron(reward) as macaron\" class=\"macaron-container\">\n\t\t\t<span [ngClass]=\"macaron.class\">{{macaron.label}}</span>\n\t\t</div>\n\t</div>\n\t<mat-card-content>\n\t\t<div class=\"card-description\">\n\t\t\t<h1>{{reward.name}}</h1>\n\t\t\t<h2>{{reward.merchantName}}</h2>\n\t\t</div>\n\t\t<div class=\"icon\">\n\t\t\t<img src=\"assets/forward-arrow.svg\" alt=\"\">\n\t\t</div>\n\t</mat-card-content>\n\t<mat-card-footer></mat-card-footer>\n</mat-card>\n"

/***/ }),

/***/ "../../node_modules/raw-loader/index.js!./src/app/home/vouchers/vouchers.component.html":
/*!*******************************************************************************************************************!*\
  !*** /home/andy/WebstormProjects/my-perx/node_modules/raw-loader!./src/app/home/vouchers/vouchers.component.html ***!
  \*******************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "<div class=\"rewards-container\" *ngIf=\"savedVouchers || redeemedVouchers\">\n  <div class=\"saved-rewards\" *ngIf=\"savedVouchers\">\n    <h1 *ngIf=\"savedVouchers.length > 0\">Saved rewards</h1>\n    <perx-core-vouchers [data]=\"getObservableSavedVouchers()\"\n      [showExpireDate]=\"true\"\n      [mapping]=\"mapping\"\n      [showRedeemedDate]=\"false\"\n      (tapped)=\"voucherSelected($event)\">           \n    </perx-core-vouchers>\n    <button *ngIf=\"!hideSeeMore && (savedVouchers.length > defaultNbVouchers)\" (click)=\"seeMoreClicked()\">See more</button>\n  </div>\n\n  <div class=\"past-rewards\" *ngIf=\"(redeemedVouchers | async) as vouchers\">\n    <h1 *ngIf=\"vouchers.length > 0\">Past rewards</h1>\n    <perx-core-vouchers \n      [data]=\"redeemedVouchers\"\n      [showExpireDate]=\"false\"\n      [mapping]=\"mapping\"\n      [showRedeemedDate]=\"true\">\n    </perx-core-vouchers>\n   </div>\n  <div class=\"empty-wallet\" *ngIf=\"!(savedVouchers)?.length && !(redeemedVouchers | async)?.length\">\n    <img src=\"assets/search.png\">\n    <h1>It’s empty here</h1>\n    <p>Take your pick from our list of rewards. After you’ve saved them, they will appear here.</p>\n  </div>\n</div>\n"

/***/ }),

/***/ "./src/app/home/campaigns/campaigns.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/home/campaigns/campaigns.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  max-width: 28rem;\n}\nmat-card .mat-card-image {\n  margin-bottom: 0;\n}\n.mat-card {\n  -webkit-box-flex: 0;\n          flex: 0 0 0;\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  flex-basis: 75%;\n  margin: 0 0.5rem 1rem 0.5rem;\n}\n.mat-card .mat-card-image {\n  height: 15rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.mat-card mat-card-actions a {\n  color: #1862b8;\n}\nmat-card-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  margin: 1.4rem 0 1.9rem 0;\n}\nmat-card-content .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\nmat-card-content div h1 {\n  font-size: 1.6rem;\n  color: #666666;\n  margin: 0;\n}\nmat-card-content div h2 {\n  font-size: 1.6rem;\n  text-overflow: ellipsis;\n  color: #666666;\n  font-weight: normal;\n  margin: 0.2rem 0 0 0;\n}\nmat-card-content div h3 {\n  margin-top: 0;\n  font-weight: normal;\n  color: #666666;\n  font-size: 1.2rem;\n  margin-bottom: 0;\n}\n.main-container {\n  margin-left: 0.5rem;\n}\n.main-container h1 {\n  font-size: 2.5rem;\n  color: #666666;\n  margin: 1rem;\n}\n.main-container .cards {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  overflow-x: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9jYW1wYWlnbnMvY2FtcGFpZ25zLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ob21lL2NhbXBhaWducy9jYW1wYWlnbnMuY29tcG9uZW50LnNjc3MiLCIvaG9tZS9hbmR5L1dlYnN0b3JtUHJvamVjdHMvbXktcGVyeC9hcHBzL2ZlYXR1cmUtZGVtby9zcmMvYXBwL2ljb24uc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3N0ZGluIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsZ0JBQUE7QUNERjtBREdFO0VBQ0UsZ0JBQUE7QUNESjtBREtBO0VBQ0UsbUJBQUE7VUFBQSxXQUFBO0VBQ0EsbUJBQUE7VUFBQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLDRCQUFBO0FDRkY7QURJRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0FDRko7QURNSTtFQUNFLGNBQUE7QUNKTjtBRFNBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7QUNORjtBRFFFO0VFbkNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUxxQjtFQU1yQixjQU5xQjtFQU9yQixrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkFWcUI7RUFXckIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FEOEJGO0FERkk7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FDSU47QURESTtFQUNFLGlCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtBQ0dOO0FEQUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQ0VOO0FFNURBO0VBQ0UsbUJBQUE7QUYrREY7QUU3REU7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxZQUFBO0FGK0RKO0FFNURFO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0Esa0JBQUE7QUY4REoiLCJmaWxlIjoic3JjL2FwcC9ob21lL2NhbXBhaWducy9jYW1wYWlnbnMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi9pY29uLnNjc3MnO1xuXG5tYXQtY2FyZCB7XG4gIG1heC13aWR0aDogMjhyZW07XG5cbiAgLm1hdC1jYXJkLWltYWdlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi5tYXQtY2FyZCB7XG4gIGZsZXg6IDAgMCAwO1xuICBmbGV4LWdyb3c6IDE7XG4gIGZsZXgtYmFzaXM6IDc1JTtcbiAgbWFyZ2luOiAwIDAuNXJlbSAxcmVtIDAuNXJlbTtcblxuICAubWF0LWNhcmQtaW1hZ2Uge1xuICAgIGhlaWdodDogMTVyZW07XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gIH1cblxuICBtYXQtY2FyZC1hY3Rpb25zIHtcbiAgICBhIHtcbiAgICAgIGNvbG9yOiAjMTg2MmI4O1xuICAgIH1cbiAgfVxufVxuXG5tYXQtY2FyZC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAxLjRyZW0gMCAxLjlyZW0gMDtcblxuICAuaWNvbiB7XG4gICAgQGluY2x1ZGUgaWNvbjtcbiAgfVxuXG4gIGRpdiB7XG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICBoMiB7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgY29sb3I6ICM2NjY2NjY7XG4gICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgbWFyZ2luOiAwLjJyZW0gMCAwIDA7XG4gICAgfVxuXG4gICAgaDMge1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cbn1cbiIsIm1hdC1jYXJkIHtcbiAgbWF4LXdpZHRoOiAyOHJlbTtcbn1cbm1hdC1jYXJkIC5tYXQtY2FyZC1pbWFnZSB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5tYXQtY2FyZCB7XG4gIGZsZXg6IDAgMCAwO1xuICBmbGV4LWdyb3c6IDE7XG4gIGZsZXgtYmFzaXM6IDc1JTtcbiAgbWFyZ2luOiAwIDAuNXJlbSAxcmVtIDAuNXJlbTtcbn1cbi5tYXQtY2FyZCAubWF0LWNhcmQtaW1hZ2Uge1xuICBoZWlnaHQ6IDE1cmVtO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5tYXQtY2FyZCBtYXQtY2FyZC1hY3Rpb25zIGEge1xuICBjb2xvcjogIzE4NjJiODtcbn1cblxubWF0LWNhcmQtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMS40cmVtIDAgMS45cmVtIDA7XG59XG5tYXQtY2FyZC1jb250ZW50IC5pY29uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDMuMnJlbTtcbiAgaGVpZ2h0OiAzLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgY29sb3I6ICMxODYyYjg7XG4gIG1pbi13aWR0aDogMy4ycmVtO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG5tYXQtY2FyZC1jb250ZW50IGRpdiBoMSB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgbWFyZ2luOiAwO1xufVxubWF0LWNhcmQtY29udGVudCBkaXYgaDIge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDAuMnJlbSAwIDAgMDtcbn1cbm1hdC1jYXJkLWNvbnRlbnQgZGl2IGgzIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4ubWFpbi1jb250YWluZXIge1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xufVxuLm1haW4tY29udGFpbmVyIGgxIHtcbiAgZm9udC1zaXplOiAyLjVyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBtYXJnaW46IDFyZW07XG59XG4ubWFpbi1jb250YWluZXIgLmNhcmRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xufSIsIkBtaXhpbiBpY29uKCRkaWFtZXRlcjogMy4ycmVtLCAkYmFja2dyb3VuZDogIzhkYjVlMywgJGNvbG9yOiAjMTg2MmI4KSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAkZGlhbWV0ZXI7XG4gIGhlaWdodDogJGRpYW1ldGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGNvbG9yO1xuICBtaW4td2lkdGg6ICRkaWFtZXRlcjtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuIiwiQGltcG9ydCAnLi4vY2FyZHMnO1xuXG4ubWFpbi1jb250YWluZXIge1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgICBjb2xvcjogIzY2NjY2NjtcbiAgICBtYXJnaW46IDFyZW07XG4gIH1cblxuICAuY2FyZHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/home/campaigns/campaigns.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/home/campaigns/campaigns.component.ts ***!
  \*******************************************************/
/*! exports provided: CampaignsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CampaignsComponent", function() { return CampaignsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");





var CampaignsComponent = /** @class */ (function () {
    function CampaignsComponent(campaignService, gameService) {
        this.campaignService = campaignService;
        this.gameService = gameService;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    CampaignsComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.campaignService.getCampaigns().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (campaigns) { return campaigns.filter(function (campaign) { return campaign.type === _perx_core__WEBPACK_IMPORTED_MODULE_2__["CampaignType"].game; }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["tap"])(function (campaigns) { return _this.campaigns = campaigns; }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["switchMap"])(function (campaigns) { return rxjs__WEBPACK_IMPORTED_MODULE_4__["combineLatest"].apply(void 0, campaigns.map(function (campaign) { return _this.gameService.getGamesFromCampaign(campaign.id); })); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_3__["map"])(function (games) { return [].concat.apply([], games); }))
            .subscribe(function (games) {
            _this.games = games;
            _this.campaigns = _this.campaigns.filter(function (campaign) {
                return ((games.filter(function (game) { return game.campaignId === campaign.id; }).length) > 0);
            });
        });
    };
    CampaignsComponent.prototype.selected = function (campaign) {
        var gameWithCampaign = this.games.find(function (game) { return game.campaignId === campaign.id; });
        if (gameWithCampaign) {
            this.tapped.emit(gameWithCampaign.id);
        }
    };
    CampaignsComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["ICampaignService"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["IGameService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], CampaignsComponent.prototype, "tapped", void 0);
    CampaignsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-campaigns',
            template: __webpack_require__(/*! raw-loader!./campaigns.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/campaigns/campaigns.component.html"),
            styles: [__webpack_require__(/*! ./campaigns.component.scss */ "./src/app/home/campaigns/campaigns.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["ICampaignService"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["IGameService"]])
    ], CampaignsComponent);
    return CampaignsComponent;
}());



/***/ }),

/***/ "./src/app/home/catalogs/catalogs.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/home/catalogs/catalogs.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  max-width: 28rem;\n}\nmat-card .mat-card-image {\n  margin-bottom: 0;\n}\n.mat-card {\n  -webkit-box-flex: 0;\n          flex: 0 0 0;\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  flex-basis: 75%;\n  margin: 0 0.5rem 1rem 0.5rem;\n}\n.mat-card .mat-card-image {\n  height: 15rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.mat-card mat-card-actions a {\n  color: #1862b8;\n}\nmat-card-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  margin: 1.4rem 0 1.9rem 0;\n}\nmat-card-content .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\nmat-card-content div h1 {\n  font-size: 1.6rem;\n  color: #666666;\n  margin: 0;\n}\nmat-card-content div h2 {\n  font-size: 1.6rem;\n  text-overflow: ellipsis;\n  color: #666666;\n  font-weight: normal;\n  margin: 0.2rem 0 0 0;\n}\nmat-card-content div h3 {\n  margin-top: 0;\n  font-weight: normal;\n  color: #666666;\n  font-size: 1.2rem;\n  margin-bottom: 0;\n}\n.main-container {\n  margin-left: 0.5rem;\n}\n.main-container h1 {\n  font-size: 2.5rem;\n  color: #666666;\n  margin: 1rem;\n}\n.main-container .cards {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  overflow-x: scroll;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9jYXRhbG9ncy9jYXRhbG9ncy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS9jYXRhbG9ncy9jYXRhbG9ncy5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaWNvbi5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3RkaW4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxnQkFBQTtBQ0RGO0FER0U7RUFDRSxnQkFBQTtBQ0RKO0FES0E7RUFDRSxtQkFBQTtVQUFBLFdBQUE7RUFDQSxtQkFBQTtVQUFBLFlBQUE7RUFDQSxlQUFBO0VBQ0EsNEJBQUE7QUNGRjtBRElFO0VBQ0UsYUFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUNGSjtBRE1JO0VBQ0UsY0FBQTtBQ0pOO0FEU0E7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7RUFDQSx5QkFBQTtVQUFBLDhCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLFdBQUE7RUFDQSx5QkFBQTtBQ05GO0FEUUU7RUVuQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxrQkFBQTtFQUNBLGFBTHFCO0VBTXJCLGNBTnFCO0VBT3JCLGtCQUFBO0VBQ0EsbUJBUjBDO0VBUzFDLGNBVDJEO0VBVTNELGlCQVZxQjtFQVdyQixTQUFBO0VBQ0EsYUFBQTtFQUNBLFVBQUE7QUQ4QkY7QURGSTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFNBQUE7QUNJTjtBRERJO0VBQ0UsaUJBQUE7RUFDQSx1QkFBQTtFQUNBLGNBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0FDR047QURBSTtFQUNFLGFBQUE7RUFDQSxtQkFBQTtFQUNBLGNBQUE7RUFDQSxpQkFBQTtFQUNBLGdCQUFBO0FDRU47QUU1REE7RUFDRSxtQkFBQTtBRitERjtBRTdERTtFQUNFLGlCQUFBO0VBQ0EsY0FBQTtFQUNBLFlBQUE7QUYrREo7QUU1REU7RUFDRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw4QkFBQTtFQUFBLDZCQUFBO1VBQUEsbUJBQUE7RUFDQSxrQkFBQTtBRjhESiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvY2F0YWxvZ3MvY2F0YWxvZ3MuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi9pY29uLnNjc3MnO1xuXG5tYXQtY2FyZCB7XG4gIG1heC13aWR0aDogMjhyZW07XG5cbiAgLm1hdC1jYXJkLWltYWdlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi5tYXQtY2FyZCB7XG4gIGZsZXg6IDAgMCAwO1xuICBmbGV4LWdyb3c6IDE7XG4gIGZsZXgtYmFzaXM6IDc1JTtcbiAgbWFyZ2luOiAwIDAuNXJlbSAxcmVtIDAuNXJlbTtcblxuICAubWF0LWNhcmQtaW1hZ2Uge1xuICAgIGhlaWdodDogMTVyZW07XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gIH1cblxuICBtYXQtY2FyZC1hY3Rpb25zIHtcbiAgICBhIHtcbiAgICAgIGNvbG9yOiAjMTg2MmI4O1xuICAgIH1cbiAgfVxufVxuXG5tYXQtY2FyZC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAxLjRyZW0gMCAxLjlyZW0gMDtcblxuICAuaWNvbiB7XG4gICAgQGluY2x1ZGUgaWNvbjtcbiAgfVxuXG4gIGRpdiB7XG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICBoMiB7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgY29sb3I6ICM2NjY2NjY7XG4gICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgbWFyZ2luOiAwLjJyZW0gMCAwIDA7XG4gICAgfVxuXG4gICAgaDMge1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cbn1cbiIsIm1hdC1jYXJkIHtcbiAgbWF4LXdpZHRoOiAyOHJlbTtcbn1cbm1hdC1jYXJkIC5tYXQtY2FyZC1pbWFnZSB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5tYXQtY2FyZCB7XG4gIGZsZXg6IDAgMCAwO1xuICBmbGV4LWdyb3c6IDE7XG4gIGZsZXgtYmFzaXM6IDc1JTtcbiAgbWFyZ2luOiAwIDAuNXJlbSAxcmVtIDAuNXJlbTtcbn1cbi5tYXQtY2FyZCAubWF0LWNhcmQtaW1hZ2Uge1xuICBoZWlnaHQ6IDE1cmVtO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5tYXQtY2FyZCBtYXQtY2FyZC1hY3Rpb25zIGEge1xuICBjb2xvcjogIzE4NjJiODtcbn1cblxubWF0LWNhcmQtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMS40cmVtIDAgMS45cmVtIDA7XG59XG5tYXQtY2FyZC1jb250ZW50IC5pY29uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDMuMnJlbTtcbiAgaGVpZ2h0OiAzLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgY29sb3I6ICMxODYyYjg7XG4gIG1pbi13aWR0aDogMy4ycmVtO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG5tYXQtY2FyZC1jb250ZW50IGRpdiBoMSB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgbWFyZ2luOiAwO1xufVxubWF0LWNhcmQtY29udGVudCBkaXYgaDIge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDAuMnJlbSAwIDAgMDtcbn1cbm1hdC1jYXJkLWNvbnRlbnQgZGl2IGgzIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG4ubWFpbi1jb250YWluZXIge1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xufVxuLm1haW4tY29udGFpbmVyIGgxIHtcbiAgZm9udC1zaXplOiAyLjVyZW07XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBtYXJnaW46IDFyZW07XG59XG4ubWFpbi1jb250YWluZXIgLmNhcmRzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xufSIsIkBtaXhpbiBpY29uKCRkaWFtZXRlcjogMy4ycmVtLCAkYmFja2dyb3VuZDogIzhkYjVlMywgJGNvbG9yOiAjMTg2MmI4KSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAkZGlhbWV0ZXI7XG4gIGhlaWdodDogJGRpYW1ldGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGNvbG9yO1xuICBtaW4td2lkdGg6ICRkaWFtZXRlcjtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuIiwiQGltcG9ydCAnLi4vY2FyZHMnO1xuXG4ubWFpbi1jb250YWluZXIge1xuICBtYXJnaW4tbGVmdDogMC41cmVtO1xuXG4gIGgxIHtcbiAgICBmb250LXNpemU6IDIuNXJlbTtcbiAgICBjb2xvcjogIzY2NjY2NjtcbiAgICBtYXJnaW46IDFyZW07XG4gIH1cblxuICAuY2FyZHMge1xuICAgIGRpc3BsYXk6IGZsZXg7XG4gICAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgICBvdmVyZmxvdy14OiBzY3JvbGw7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/home/catalogs/catalogs.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/home/catalogs/catalogs.component.ts ***!
  \*****************************************************/
/*! exports provided: CatalogsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CatalogsComponent", function() { return CatalogsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");



var CatalogsComponent = /** @class */ (function () {
    function CatalogsComponent(rewardsService) {
        this.rewardsService = rewardsService;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
        this.catalogs$ = this.rewardsService.getAllCatalogs();
    }
    CatalogsComponent.prototype.selected = function (catalog) {
        this.tapped.emit(catalog);
    };
    CatalogsComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["RewardsService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], CatalogsComponent.prototype, "tapped", void 0);
    CatalogsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-catalogs',
            template: __webpack_require__(/*! raw-loader!./catalogs.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/catalogs/catalogs.component.html"),
            styles: [__webpack_require__(/*! ./catalogs.component.scss */ "./src/app/home/catalogs/catalogs.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["RewardsService"]])
    ], CatalogsComponent);
    return CatalogsComponent;
}());



/***/ }),

/***/ "./src/app/home/categories/categories.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/home/categories/categories.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  overflow-x: scroll;\n  padding: 1rem 0;\n}\n\n.main-container {\n  width: 98%;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9jYXRlZ29yaWVzL2NhdGVnb3JpZXMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2hvbWUvY2F0ZWdvcmllcy9jYXRlZ29yaWVzLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0Esa0JBQUE7RUFDQSxlQUFBO0FDQ0Y7O0FERUE7RUFDRSxVQUFBO0FDQ0YiLCJmaWxlIjoic3JjL2FwcC9ob21lL2NhdGVnb3JpZXMvY2F0ZWdvcmllcy5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xuICBwYWRkaW5nOiAxcmVtIDA7XG59XG5cbi5tYWluLWNvbnRhaW5lciB7XG4gIHdpZHRoOiA5OCU7XG59XG4iLCI6aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcbiAgcGFkZGluZzogMXJlbSAwO1xufVxuXG4ubWFpbi1jb250YWluZXIge1xuICB3aWR0aDogOTglO1xufSJdfQ== */"

/***/ }),

/***/ "./src/app/home/categories/categories.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/home/categories/categories.component.ts ***!
  \*********************************************************/
/*! exports provided: CategoriesComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "CategoriesComponent", function() { return CategoriesComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _category_mock__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../category.mock */ "./src/app/category.mock.ts");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");






var CategoriesComponent = /** @class */ (function () {
    function CategoriesComponent(rewardService, router) {
        this.rewardService = rewardService;
        this.router = router;
        this.tabs$ = new rxjs__WEBPACK_IMPORTED_MODULE_4__["Subject"]();
        this.tabs = [];
        this.categories = _category_mock__WEBPACK_IMPORTED_MODULE_2__["categories"];
    }
    CategoriesComponent.prototype.ngOnInit = function () {
        this.createTabsFromCategories();
        this.fetchDataForEachTab();
    };
    CategoriesComponent.prototype.createTabsFromCategories = function () {
        var _this = this;
        _category_mock__WEBPACK_IMPORTED_MODULE_2__["categories"].forEach(function (category) {
            _this.tabs.push({
                filterKey: null,
                filterValue: null,
                tabName: category.name,
                rewardsList: null
            });
        });
    };
    CategoriesComponent.prototype.fetchDataForEachTab = function () {
        var _this = this;
        this.tabs.forEach(function (tab) {
            var category = tab.tabName === 'All' ? null : [tab.tabName];
            _this.rewardService.getAllRewards(null, category).subscribe(function (rewards) {
                tab.rewardsList = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(rewards);
                _this.tabs$.next(_this.tabs);
            });
        });
    };
    CategoriesComponent.prototype.rewardClickedHandler = function (reward) {
        this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
    };
    CategoriesComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_3__["RewardsService"] },
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] }
    ]; };
    CategoriesComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-categories',
            template: __webpack_require__(/*! raw-loader!./categories.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/categories/categories.component.html"),
            styles: [__webpack_require__(/*! ./categories.component.scss */ "./src/app/home/categories/categories.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_3__["RewardsService"],
            _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"]])
    ], CategoriesComponent);
    return CategoriesComponent;
}());



/***/ }),

/***/ "./src/app/home/discover/discover.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/home/discover/discover.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ":host {\n  height: 100%;\n  width: 100%;\n  overflow-x: hidden;\n}\n\nh1 {\n  font-size: 25px;\n  color: #666666;\n  margin: 1rem;\n}\n\napp-rewards-cards, app-campaigns {\n  margin-left: 0.5rem;\n}\n\napp-categories {\n  margin-left: 0.9rem;\n}\n\napp-news-feed::-webkit-scrollbar,\napp-categories::-webkit-scrollbar,\napp-rewards-cards::-webkit-scrollbar,\napp-catalogs::-webkit-scrollbar,\napp-campaigns::-webkit-scrollbar {\n  display: none;\n  scrollbar-width: none;\n  /* Firefox */\n  -ms-overflow-style: none;\n  /* IE 10+ */\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9kaXNjb3Zlci9kaXNjb3Zlci5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS9kaXNjb3Zlci9kaXNjb3Zlci5jb21wb25lbnQuc2NzcyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQTtFQUNFLFlBQUE7RUFDQSxXQUFBO0VBQ0Esa0JBQUE7QUNDRjs7QURFQTtFQUNFLGVBQUE7RUFDQSxjQUFBO0VBQ0EsWUFBQTtBQ0NGOztBREVBO0VBQ0UsbUJBQUE7QUNDRjs7QURFQTtFQUNFLG1CQUFBO0FDQ0Y7O0FET0U7Ozs7O0VBQ0UsYUFBQTtFQUNBLHFCQUFBO0VBQXVCLFlBQUE7RUFDdkIsd0JBQUE7RUFBMkIsV0FBQTtBQ0UvQiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvZGlzY292ZXIvZGlzY292ZXIuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyI6aG9zdCB7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIG92ZXJmbG93LXg6IGhpZGRlbjtcbn1cblxuaDEge1xuICBmb250LXNpemU6IDI1cHg7XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBtYXJnaW46IDFyZW07XG59XG5cbmFwcC1yZXdhcmRzLWNhcmRzLCBhcHAtY2FtcGFpZ25zIHtcbiAgbWFyZ2luLWxlZnQ6IDAuNXJlbTtcbn1cblxuYXBwLWNhdGVnb3JpZXMge1xuICBtYXJnaW4tbGVmdDogMC45cmVtO1xufVxuXG5hcHAtbmV3cy1mZWVkLFxuYXBwLWNhdGVnb3JpZXMsXG5hcHAtcmV3YXJkcy1jYXJkcyxcbmFwcC1jYXRhbG9ncyxcbmFwcC1jYW1wYWlnbnMge1xuICAmOjotd2Via2l0LXNjcm9sbGJhciB7XG4gICAgZGlzcGxheTogbm9uZTtcbiAgICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7IC8qIEZpcmVmb3ggKi9cbiAgICAtbXMtb3ZlcmZsb3ctc3R5bGU6IG5vbmU7ICAvKiBJRSAxMCsgKi9cbiAgfVxufVxuIiwiOmhvc3Qge1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBvdmVyZmxvdy14OiBoaWRkZW47XG59XG5cbmgxIHtcbiAgZm9udC1zaXplOiAyNXB4O1xuICBjb2xvcjogIzY2NjY2NjtcbiAgbWFyZ2luOiAxcmVtO1xufVxuXG5hcHAtcmV3YXJkcy1jYXJkcywgYXBwLWNhbXBhaWducyB7XG4gIG1hcmdpbi1sZWZ0OiAwLjVyZW07XG59XG5cbmFwcC1jYXRlZ29yaWVzIHtcbiAgbWFyZ2luLWxlZnQ6IDAuOXJlbTtcbn1cblxuYXBwLW5ld3MtZmVlZDo6LXdlYmtpdC1zY3JvbGxiYXIsXG5hcHAtY2F0ZWdvcmllczo6LXdlYmtpdC1zY3JvbGxiYXIsXG5hcHAtcmV3YXJkcy1jYXJkczo6LXdlYmtpdC1zY3JvbGxiYXIsXG5hcHAtY2F0YWxvZ3M6Oi13ZWJraXQtc2Nyb2xsYmFyLFxuYXBwLWNhbXBhaWduczo6LXdlYmtpdC1zY3JvbGxiYXIge1xuICBkaXNwbGF5OiBub25lO1xuICBzY3JvbGxiYXItd2lkdGg6IG5vbmU7XG4gIC8qIEZpcmVmb3ggKi9cbiAgLW1zLW92ZXJmbG93LXN0eWxlOiBub25lO1xuICAvKiBJRSAxMCsgKi9cbn0iXX0= */"

/***/ }),

/***/ "./src/app/home/discover/discover.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/home/discover/discover.component.ts ***!
  \*****************************************************/
/*! exports provided: DiscoverComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "DiscoverComponent", function() { return DiscoverComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");






var DiscoverComponent = /** @class */ (function () {
    function DiscoverComponent(router, loyaltyService, profileService) {
        this.router = router;
        this.loyaltyService = loyaltyService;
        this.profileService = profileService;
    }
    DiscoverComponent.prototype.ngOnInit = function () {
        var _this = this;
        Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["forkJoin"])(this.profileService.whoAmI(), this.loyaltyService.getLoyalties().pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_5__["map"])(function (loyalties) { return loyalties && loyalties.length > 0 && loyalties[0]; }))).subscribe(function (_a) {
            var profile = _a[0], loyalty = _a[1];
            _this.profile = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(profile);
            _this.loyalty = Object(rxjs__WEBPACK_IMPORTED_MODULE_4__["of"])(loyalty);
        });
    };
    DiscoverComponent.prototype.categorySelected = function (category) {
        this.router.navigate(['/category'], { queryParams: { category: category.name } });
    };
    DiscoverComponent.prototype.rewardSelected = function (reward) {
        this.router.navigate(['/reward'], { queryParams: { id: reward.id } });
    };
    DiscoverComponent.prototype.catalogSelected = function (catalog) {
        this.router.navigate(['/category'], { queryParams: { catalog: catalog.id } });
    };
    DiscoverComponent.prototype.campaignSelected = function (gameId) {
        this.router.navigate(['/game'], { queryParams: { id: gameId } });
    };
    DiscoverComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_3__["LoyaltyService"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_3__["ProfileService"] }
    ]; };
    DiscoverComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-discover',
            template: __webpack_require__(/*! raw-loader!./discover.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/discover/discover.component.html"),
            styles: [__webpack_require__(/*! ./discover.component.scss */ "./src/app/home/discover/discover.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_2__["Router"],
            _perx_core__WEBPACK_IMPORTED_MODULE_3__["LoyaltyService"], _perx_core__WEBPACK_IMPORTED_MODULE_3__["ProfileService"]])
    ], DiscoverComponent);
    return DiscoverComponent;
}());



/***/ }),

/***/ "./src/app/home/home-routing.module.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home-routing.module.ts ***!
  \*********************************************/
/*! exports provided: HomeRoutingModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeRoutingModule", function() { return HomeRoutingModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");
/* harmony import */ var _discover_discover_component__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./discover/discover.component */ "./src/app/home/discover/discover.component.ts");
/* harmony import */ var _vouchers_vouchers_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./vouchers/vouchers.component */ "./src/app/home/vouchers/vouchers.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home/home.component.ts");






var routes = [
    {
        path: '', component: _home_home_component__WEBPACK_IMPORTED_MODULE_5__["HomeComponent"], children: [
            { path: '', pathMatch: 'full', redirectTo: 'discover' },
            { path: 'discover', component: _discover_discover_component__WEBPACK_IMPORTED_MODULE_3__["DiscoverComponent"] },
            { path: 'vouchers', component: _vouchers_vouchers_component__WEBPACK_IMPORTED_MODULE_4__["VouchersComponent"] }
        ]
    }
];
var HomeRoutingModule = /** @class */ (function () {
    function HomeRoutingModule() {
    }
    HomeRoutingModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            imports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"].forChild(routes)],
            exports: [_angular_router__WEBPACK_IMPORTED_MODULE_2__["RouterModule"]]
        })
    ], HomeRoutingModule);
    return HomeRoutingModule;
}());



/***/ }),

/***/ "./src/app/home/home.module.ts":
/*!*************************************!*\
  !*** ./src/app/home/home.module.ts ***!
  \*************************************/
/*! exports provided: HomeModule */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeModule", function() { return HomeModule; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_common__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/common */ "../../node_modules/@angular/common/fesm5/common.js");
/* harmony import */ var _home_routing_module__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./home-routing.module */ "./src/app/home/home-routing.module.ts");
/* harmony import */ var _discover_discover_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./discover/discover.component */ "./src/app/home/discover/discover.component.ts");
/* harmony import */ var _vouchers_vouchers_component__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./vouchers/vouchers.component */ "./src/app/home/vouchers/vouchers.component.ts");
/* harmony import */ var _home_home_component__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./home/home.component */ "./src/app/home/home/home.component.ts");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _news_feed_news_feed_component__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./news-feed/news-feed.component */ "./src/app/home/news-feed/news-feed.component.ts");
/* harmony import */ var _categories_categories_component__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./categories/categories.component */ "./src/app/home/categories/categories.component.ts");
/* harmony import */ var _rewards_cards_rewards_cards_component__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./rewards-cards/rewards-cards.component */ "./src/app/home/rewards-cards/rewards-cards.component.ts");
/* harmony import */ var _catalogs_catalogs_component__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./catalogs/catalogs.component */ "./src/app/home/catalogs/catalogs.component.ts");
/* harmony import */ var _campaigns_campaigns_component__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./campaigns/campaigns.component */ "./src/app/home/campaigns/campaigns.component.ts");
/* harmony import */ var ngx_multi_line_ellipsis__WEBPACK_IMPORTED_MODULE_13__ = __webpack_require__(/*! ngx-multi-line-ellipsis */ "../../node_modules/ngx-multi-line-ellipsis/index.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_14__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_15__ = __webpack_require__(/*! @angular/cdk/scrolling */ "./node_modules/@angular/cdk/esm5/scrolling.es5.js");
/* harmony import */ var _no_renewale_in_name_pipe__WEBPACK_IMPORTED_MODULE_16__ = __webpack_require__(/*! ./no-renewale-in-name.pipe */ "./src/app/home/no-renewale-in-name.pipe.ts");
/* harmony import */ var src_environments_environment__WEBPACK_IMPORTED_MODULE_17__ = __webpack_require__(/*! src/environments/environment */ "./src/environments/environment.ts");
/* harmony import */ var _news_feed_popup_popup_component__WEBPACK_IMPORTED_MODULE_18__ = __webpack_require__(/*! ./news-feed/popup/popup.component */ "./src/app/home/news-feed/popup/popup.component.ts");



















var HomeModule = /** @class */ (function () {
    function HomeModule() {
    }
    HomeModule = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["NgModule"])({
            declarations: [
                _discover_discover_component__WEBPACK_IMPORTED_MODULE_4__["DiscoverComponent"],
                _vouchers_vouchers_component__WEBPACK_IMPORTED_MODULE_5__["VouchersComponent"],
                _home_home_component__WEBPACK_IMPORTED_MODULE_6__["HomeComponent"],
                _news_feed_news_feed_component__WEBPACK_IMPORTED_MODULE_8__["NewsFeedComponent"],
                _categories_categories_component__WEBPACK_IMPORTED_MODULE_9__["CategoriesComponent"],
                _rewards_cards_rewards_cards_component__WEBPACK_IMPORTED_MODULE_10__["RewardsCardsComponent"],
                _catalogs_catalogs_component__WEBPACK_IMPORTED_MODULE_11__["CatalogsComponent"],
                _campaigns_campaigns_component__WEBPACK_IMPORTED_MODULE_12__["CampaignsComponent"],
                _no_renewale_in_name_pipe__WEBPACK_IMPORTED_MODULE_16__["NoRenewaleInNamePipe"],
                _news_feed_popup_popup_component__WEBPACK_IMPORTED_MODULE_18__["PopupComponent"],
            ],
            imports: [
                _perx_core__WEBPACK_IMPORTED_MODULE_14__["ConfigModule"].forRoot(tslib__WEBPACK_IMPORTED_MODULE_0__["__assign"]({}, src_environments_environment__WEBPACK_IMPORTED_MODULE_17__["environment"])),
                _angular_common__WEBPACK_IMPORTED_MODULE_2__["CommonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatToolbarModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatTabsModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatCardModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatButtonModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatIconModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatRippleModule"],
                _angular_material__WEBPACK_IMPORTED_MODULE_7__["MatDialogModule"],
                _home_routing_module__WEBPACK_IMPORTED_MODULE_3__["HomeRoutingModule"],
                ngx_multi_line_ellipsis__WEBPACK_IMPORTED_MODULE_13__["NgxMultiLineEllipsisModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_14__["UtilsModule"],
                _angular_cdk_scrolling__WEBPACK_IMPORTED_MODULE_15__["ScrollingModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_14__["LoyaltyModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_14__["RewardsModule"],
                _perx_core__WEBPACK_IMPORTED_MODULE_14__["VouchersModule"]
            ],
            bootstrap: [],
            providers: [
                _no_renewale_in_name_pipe__WEBPACK_IMPORTED_MODULE_16__["NoRenewaleInNamePipe"],
            ],
            entryComponents: [
                _news_feed_popup_popup_component__WEBPACK_IMPORTED_MODULE_18__["PopupComponent"]
            ]
        })
    ], HomeModule);
    return HomeModule;
}());



/***/ }),

/***/ "./src/app/home/home/home.component.scss":
/*!***********************************************!*\
  !*** ./src/app/home/home/home.component.scss ***!
  \***********************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".app {\n  width: 100%;\n  height: 100%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\nmat-toolbar {\n  background-color: white;\n  width: 100%;\n  height: 100;\n  color: #666666;\n  border-bottom: 1px solid #979797;\n}\n\n.content {\n  -webkit-box-flex: 1;\n          flex: 1;\n  overflow-y: scroll;\n  height: 100%;\n  width: 100%;\n}\n\n.mat-tab-nav-bar {\n  height: 4.9rem;\n  border-bottom: 0;\n}\n\n.mat-tab-nav-bar a {\n  height: 1.6rem;\n  font-size: 1.8rem;\n  font-weight: 500;\n  font-style: normal;\n  font-stretch: normal;\n  line-height: 0.89;\n  letter-spacing: normal;\n  text-align: center;\n  color: #666666;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  margin: 0 2.4rem;\n  min-width: 0;\n  padding: 2.4rem 1rem;\n  width: auto;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9ob21lL2hvbWUuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2hvbWUvaG9tZS9ob21lLmNvbXBvbmVudC5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0VBQ0UsV0FBQTtFQUNBLFlBQUE7RUFDQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSw0QkFBQTtFQUFBLDZCQUFBO1VBQUEsc0JBQUE7QUNDRjs7QURFQTtFQUNFLHVCQUFBO0VBQ0EsV0FBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0VBQ0EsZ0NBQUE7QUNDRjs7QURFQTtFQUNFLG1CQUFBO1VBQUEsT0FBQTtFQUNBLGtCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7QUNDRjs7QURHQTtFQUNFLGNBQUE7RUFDQSxnQkFBQTtBQ0FGOztBREVFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxrQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSxzQkFBQTtFQUNBLGtCQUFBO0VBQ0EsY0FBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxZQUFBO0VBQ0Esb0JBQUE7RUFDQSxXQUFBO0FDQUoiLCJmaWxlIjoic3JjL2FwcC9ob21lL2hvbWUvaG9tZS5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5hcHAge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5tYXQtdG9vbGJhciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDA7XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzk3OTc5Nztcbn1cblxuLmNvbnRlbnQge1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG4gIC8vIHBhZGRpbmc6IDEuMnJlbTtcbn1cblxuLm1hdC10YWItbmF2LWJhciB7XG4gIGhlaWdodDogNC45cmVtO1xuICBib3JkZXItYm90dG9tOiAwO1xuXG4gIGEge1xuICAgIGhlaWdodDogMS42cmVtO1xuICAgIGZvbnQtc2l6ZTogMS44cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiA1MDA7XG4gICAgZm9udC1zdHlsZTogbm9ybWFsO1xuICAgIGZvbnQtc3RyZXRjaDogbm9ybWFsO1xuICAgIGxpbmUtaGVpZ2h0OiAwLjg5O1xuICAgIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gICAgdGV4dC1hbGlnbjogY2VudGVyO1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gICAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gICAgbWFyZ2luOiAwIDIuNHJlbTtcbiAgICBtaW4td2lkdGg6IDA7XG4gICAgcGFkZGluZzogMi40cmVtIDFyZW07XG4gICAgd2lkdGg6IGF1dG87XG4gIH1cbn1cbiIsIi5hcHAge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG5tYXQtdG9vbGJhciB7XG4gIGJhY2tncm91bmQtY29sb3I6IHdoaXRlO1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDA7XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzk3OTc5Nztcbn1cblxuLmNvbnRlbnQge1xuICBmbGV4OiAxO1xuICBvdmVyZmxvdy15OiBzY3JvbGw7XG4gIGhlaWdodDogMTAwJTtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5tYXQtdGFiLW5hdi1iYXIge1xuICBoZWlnaHQ6IDQuOXJlbTtcbiAgYm9yZGVyLWJvdHRvbTogMDtcbn1cbi5tYXQtdGFiLW5hdi1iYXIgYSB7XG4gIGhlaWdodDogMS42cmVtO1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgZm9udC13ZWlnaHQ6IDUwMDtcbiAgZm9udC1zdHlsZTogbm9ybWFsO1xuICBmb250LXN0cmV0Y2g6IG5vcm1hbDtcbiAgbGluZS1oZWlnaHQ6IDAuODk7XG4gIGxldHRlci1zcGFjaW5nOiBub3JtYWw7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBtYXJnaW46IDAgMi40cmVtO1xuICBtaW4td2lkdGg6IDA7XG4gIHBhZGRpbmc6IDIuNHJlbSAxcmVtO1xuICB3aWR0aDogYXV0bztcbn0iXX0= */"

/***/ }),

/***/ "./src/app/home/home/home.component.ts":
/*!*********************************************!*\
  !*** ./src/app/home/home/home.component.ts ***!
  \*********************************************/
/*! exports provided: HomeComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "HomeComponent", function() { return HomeComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _no_renewale_in_name_pipe__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../no-renewale-in-name.pipe */ "./src/app/home/no-renewale-in-name.pipe.ts");




var HomeComponent = /** @class */ (function () {
    function HomeComponent(noRenewalePipe, loyaltyService, profileService) {
        this.noRenewalePipe = noRenewalePipe;
        this.loyaltyService = loyaltyService;
        this.profileService = profileService;
    }
    HomeComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.loyaltyService.getLoyalty().subscribe(function (loyalty) { return _this.loyalty = loyalty; });
        this.profileService.whoAmI().subscribe(function (p) { return _this.profile = p; });
    };
    HomeComponent.prototype.getBadge = function (tier) {
        tier = tier !== null ? this.noRenewalePipe.transform(tier.toLowerCase()) : null;
        switch (tier) {
            case 'gold':
                return 'assets/gold-icon.svg';
            case 'platinum':
                return 'assets/plat-icon.svg';
            case 'green':
            default:
                return 'assets/green-icon.svg';
        }
    };
    HomeComponent.ctorParameters = function () { return [
        { type: _no_renewale_in_name_pipe__WEBPACK_IMPORTED_MODULE_3__["NoRenewaleInNamePipe"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["LoyaltyService"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["ProfileService"] }
    ]; };
    HomeComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-home',
            template: __webpack_require__(/*! raw-loader!./home.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/home/home.component.html"),
            styles: [__webpack_require__(/*! ./home.component.scss */ "./src/app/home/home/home.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_no_renewale_in_name_pipe__WEBPACK_IMPORTED_MODULE_3__["NoRenewaleInNamePipe"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["LoyaltyService"],
            _perx_core__WEBPACK_IMPORTED_MODULE_2__["ProfileService"]])
    ], HomeComponent);
    return HomeComponent;
}());



/***/ }),

/***/ "./src/app/home/news-feed/news-feed.component.scss":
/*!*********************************************************!*\
  !*** ./src/app/home/news-feed/news-feed.component.scss ***!
  \*********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".dots {\n  text-align: center;\n  margin-bottom: 2rem;\n}\n.dots .container {\n  margin: 0 auto;\n  position: relative;\n}\n.dots .container span {\n  height: 1rem;\n  border-radius: 5rem;\n  display: inline-block;\n  margin: 0 0.4rem;\n}\n.dots .container span.gray-dot {\n  width: 1rem;\n  background-color: #d2d8e2;\n}\n.dots .container span.green-bar {\n  width: 2.8rem;\n  background-color: #1862b8;\n}\ncdk-virtual-scroll-viewport {\n  height: 30rem;\n  margin-top: 3rem;\n}\n.cdk-virtual-scroll-data-source .mat-item {\n  height: 100%;\n}\n.card {\n  border: 2rem;\n}\n.mat-card {\n  margin: 0 1rem;\n}\n.mat-card .mat-card-content {\n  padding: 1rem;\n  min-height: 5rem;\n  margin-bottom: 0;\n}\n.mat-card .mat-card-content p {\n  white-space: pre-line;\n}\n.mat-card .mat-card-image {\n  height: 15rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.mat-card mat-card-actions {\n  padding-top: 0;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9uZXdzLWZlZWQvbmV3cy1mZWVkLmNvbXBvbmVudC5zY3NzIiwic3JjL2FwcC9ob21lL25ld3MtZmVlZC9uZXdzLWZlZWQuY29tcG9uZW50LnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFDRSxrQkFBQTtFQUNBLG1CQUFBO0FDQ0Y7QURDRTtFQUNFLGNBQUE7RUFDQSxrQkFBQTtBQ0NKO0FEQ0k7RUFDRSxZQUFBO0VBQ0EsbUJBQUE7RUFDQSxxQkFBQTtFQUNBLGdCQUFBO0FDQ047QURDTTtFQUNFLFdBQUE7RUFDQSx5QkFBQTtBQ0NSO0FERU07RUFDRSxhQUFBO0VBQ0EseUJBQUE7QUNBUjtBRE1BO0VBQ0UsYUFBQTtFQUNBLGdCQUFBO0FDSEY7QURNQTtFQUNFLFlBQUE7QUNIRjtBRE1BO0VBQ0UsWUFBQTtBQ0hGO0FETUE7RUFDRSxjQUFBO0FDSEY7QURLRTtFQUNFLGFBQUE7RUFDQSxnQkFBQTtFQUNBLGdCQUFBO0FDSEo7QURLSTtFQUNFLHFCQUFBO0FDSE47QURPRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0FDTEo7QURRRTtFQUNFLGNBQUE7QUNOSiIsImZpbGUiOiJzcmMvYXBwL2hvbWUvbmV3cy1mZWVkL25ld3MtZmVlZC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIi5kb3RzIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiAycmVtO1xuXG4gIC5jb250YWluZXIge1xuICAgIG1hcmdpbjogMCBhdXRvO1xuICAgIHBvc2l0aW9uOiByZWxhdGl2ZTtcblxuICAgIHNwYW4ge1xuICAgICAgaGVpZ2h0OiAxcmVtO1xuICAgICAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgICAgIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgICAgIG1hcmdpbjogMCAwLjRyZW07XG5cbiAgICAgICYuZ3JheS1kb3Qge1xuICAgICAgICB3aWR0aDogMXJlbTtcbiAgICAgICAgYmFja2dyb3VuZC1jb2xvcjogI2QyZDhlMjtcbiAgICAgIH1cblxuICAgICAgJi5ncmVlbi1iYXIge1xuICAgICAgICB3aWR0aDogMi44cmVtO1xuICAgICAgICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg2MmI4O1xuICAgICAgfVxuICAgIH1cbiAgfVxufVxuXG5jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQge1xuICBoZWlnaHQ6IDMwcmVtO1xuICBtYXJnaW4tdG9wOiAzcmVtO1xufVxuXG4uY2RrLXZpcnR1YWwtc2Nyb2xsLWRhdGEtc291cmNlIC5tYXQtaXRlbSB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IDJyZW07XG59XG5cbi5tYXQtY2FyZCB7XG4gIG1hcmdpbjogMCAxcmVtO1xuXG4gIC5tYXQtY2FyZC1jb250ZW50IHtcbiAgICBwYWRkaW5nOiAxcmVtO1xuICAgIG1pbi1oZWlnaHQ6IDVyZW07XG4gICAgbWFyZ2luLWJvdHRvbTogMDtcblxuICAgIHAge1xuICAgICAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xuICAgIH1cbiAgfVxuXG4gIC5tYXQtY2FyZC1pbWFnZSB7XG4gICAgaGVpZ2h0OiAxNXJlbTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgfVxuXG4gIG1hdC1jYXJkLWFjdGlvbnMge1xuICAgIHBhZGRpbmctdG9wOiAwO1xuICB9XG59XG4iLCIuZG90cyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgbWFyZ2luLWJvdHRvbTogMnJlbTtcbn1cbi5kb3RzIC5jb250YWluZXIge1xuICBtYXJnaW46IDAgYXV0bztcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmRvdHMgLmNvbnRhaW5lciBzcGFuIHtcbiAgaGVpZ2h0OiAxcmVtO1xuICBib3JkZXItcmFkaXVzOiA1cmVtO1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1hcmdpbjogMCAwLjRyZW07XG59XG4uZG90cyAuY29udGFpbmVyIHNwYW4uZ3JheS1kb3Qge1xuICB3aWR0aDogMXJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2QyZDhlMjtcbn1cbi5kb3RzIC5jb250YWluZXIgc3Bhbi5ncmVlbi1iYXIge1xuICB3aWR0aDogMi44cmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMTg2MmI4O1xufVxuXG5jZGstdmlydHVhbC1zY3JvbGwtdmlld3BvcnQge1xuICBoZWlnaHQ6IDMwcmVtO1xuICBtYXJnaW4tdG9wOiAzcmVtO1xufVxuXG4uY2RrLXZpcnR1YWwtc2Nyb2xsLWRhdGEtc291cmNlIC5tYXQtaXRlbSB7XG4gIGhlaWdodDogMTAwJTtcbn1cblxuLmNhcmQge1xuICBib3JkZXI6IDJyZW07XG59XG5cbi5tYXQtY2FyZCB7XG4gIG1hcmdpbjogMCAxcmVtO1xufVxuLm1hdC1jYXJkIC5tYXQtY2FyZC1jb250ZW50IHtcbiAgcGFkZGluZzogMXJlbTtcbiAgbWluLWhlaWdodDogNXJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cbi5tYXQtY2FyZCAubWF0LWNhcmQtY29udGVudCBwIHtcbiAgd2hpdGUtc3BhY2U6IHByZS1saW5lO1xufVxuLm1hdC1jYXJkIC5tYXQtY2FyZC1pbWFnZSB7XG4gIGhlaWdodDogMTVyZW07XG4gIG9iamVjdC1maXQ6IGNvdmVyO1xufVxuLm1hdC1jYXJkIG1hdC1jYXJkLWFjdGlvbnMge1xuICBwYWRkaW5nLXRvcDogMDtcbn0iXX0= */"

/***/ }),

/***/ "./src/app/home/news-feed/news-feed.component.ts":
/*!*******************************************************!*\
  !*** ./src/app/home/news-feed/news-feed.component.ts ***!
  \*******************************************************/
/*! exports provided: NewsFeedComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NewsFeedComponent", function() { return NewsFeedComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");
/* harmony import */ var _popup_popup_component__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./popup/popup.component */ "./src/app/home/news-feed/popup/popup.component.ts");





var NewsFeedComponent = /** @class */ (function () {
    function NewsFeedComponent(reader, dialog) {
        this.reader = reader;
        this.dialog = dialog;
    }
    NewsFeedComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.reader.getFromUrl('https://cdn.perxtech.io/content/starhub/rss.xml')
            .subscribe(function (items) { return _this.items = items; });
        this.itemSize = window.innerWidth;
    };
    NewsFeedComponent.prototype.updateScrollIndex = function (index) {
        this.newsBeforeScroll = Array(index);
        if (this.items && this.items.length > 0) {
            this.newsAfterScroll = Array(this.items.length - index - 1);
        }
        else {
            this.newsAfterScroll = [];
        }
    };
    NewsFeedComponent.prototype.onResize = function () {
        this.itemSize = window.innerWidth;
    };
    NewsFeedComponent.prototype.readMore = function (item) {
        this.dialog.open(_popup_popup_component__WEBPACK_IMPORTED_MODULE_4__["PopupComponent"], { panelClass: 'app-full-bleed-dialog', data: item, height: '85vh' });
    };
    NewsFeedComponent.prototype.getFirstLine = function (text) {
        var lines = text.match(/[^\r\n]+/g);
        return lines[0];
    };
    NewsFeedComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["FeedReaderService"] },
        { type: _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["HostListener"])('window:resize', ['$event']),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", Function),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", []),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:returntype", void 0)
    ], NewsFeedComponent.prototype, "onResize", null);
    NewsFeedComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-news-feed',
            template: __webpack_require__(/*! raw-loader!./news-feed.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/news-feed/news-feed.component.html"),
            styles: [__webpack_require__(/*! ./news-feed.component.scss */ "./src/app/home/news-feed/news-feed.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["FeedReaderService"],
            _angular_material__WEBPACK_IMPORTED_MODULE_3__["MatDialog"]])
    ], NewsFeedComponent);
    return NewsFeedComponent;
}());



/***/ }),

/***/ "./src/app/home/news-feed/popup/popup.component.scss":
/*!***********************************************************!*\
  !*** ./src/app/home/news-feed/popup/popup.component.scss ***!
  \***********************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = ".main-container {\n  height: 95%;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n}\n\n.spacer {\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n}\n\n.header {\n  overflow: hidden;\n  border-radius: 1rem 1rem 0 0;\n}\n\n.header img {\n  width: 100%;\n  max-height: 20.7rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n\n.header button {\n  position: absolute;\n  right: 1rem;\n  top: 1rem;\n}\n\n.header .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\n.mat-dialog-actions {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n}\n\n.mat-dialog-actions a {\n  width: 80%;\n  padding: 0.5rem;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n\n.mat-dialog-content {\n  font-size: 1.6rem;\n  white-space: pre-line;\n  margin: 0 0.5rem;\n  color: #666666;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9uZXdzLWZlZWQvcG9wdXAvcG9wdXAuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2hvbWUvbmV3cy1mZWVkL3BvcHVwL3BvcHVwLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBRUE7RUFDRSxXQUFBO0VBQ0Esb0JBQUE7RUFBQSxhQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0FDREY7O0FESUE7RUFDRSxtQkFBQTtVQUFBLFlBQUE7QUNERjs7QURJQTtFQUNFLGdCQUFBO0VBQ0EsNEJBQUE7QUNERjs7QURHRTtFQUNFLFdBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0tBQUEsaUJBQUE7QUNESjs7QURJRTtFQUNFLGtCQUFBO0VBQ0EsV0FBQTtFQUNBLFNBQUE7QUNGSjs7QURLRTtFRTNCQSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUFMcUI7RUFNckIsY0FOcUI7RUFPckIsa0JBQUE7RUFDQSxtQkFSMEM7RUFTMUMsY0FUMkQ7RUFVM0QsaUJBVnFCO0VBV3JCLFNBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtBRHlCRjs7QURMQTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7QUNRRjs7QURORTtFQUNFLFVBQUE7RUFDQSxlQUFBO0VBQ0EsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FDUUo7O0FESkE7RUFDRSxpQkFBQTtFQUNBLHFCQUFBO0VBQ0EsZ0JBQUE7RUFDQSxjQUFBO0FDT0YiLCJmaWxlIjoic3JjL2FwcC9ob21lL25ld3MtZmVlZC9wb3B1cC9wb3B1cC5jb21wb25lbnQuc2NzcyIsInNvdXJjZXNDb250ZW50IjpbIkBpbXBvcnQgXCIuLi8uLi8uLi9pY29uLnNjc3NcIjtcblxuLm1haW4tY29udGFpbmVyIHtcbiAgaGVpZ2h0OiA5NSU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG59XG5cbi5zcGFjZXIge1xuICBmbGV4LWdyb3c6IDE7XG59XG5cbi5oZWFkZXIge1xuICBvdmVyZmxvdzogaGlkZGVuO1xuICBib3JkZXItcmFkaXVzOiAxcmVtIDFyZW0gMCAwO1xuXG4gIGltZyB7XG4gICAgd2lkdGg6IDEwMCU7XG4gICAgbWF4LWhlaWdodDogMjAuN3JlbTtcbiAgICBvYmplY3QtZml0OiBjb3ZlcjtcbiAgfVxuXG4gIGJ1dHRvbiB7XG4gICAgcG9zaXRpb246IGFic29sdXRlO1xuICAgIHJpZ2h0OiAxcmVtO1xuICAgIHRvcDogMXJlbTtcbiAgfVxuXG4gIC5pY29uIHtcbiAgICBAaW5jbHVkZSBpY29uKCk7XG4gIH1cbn1cblxuLm1hdC1kaWFsb2ctYWN0aW9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuXG4gIGEge1xuICAgIHdpZHRoOiA4MCU7XG4gICAgcGFkZGluZzogMC41cmVtO1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgfVxufVxuXG4ubWF0LWRpYWxvZy1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbiAgbWFyZ2luOiAwIDAuNXJlbTtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG4iLCIubWFpbi1jb250YWluZXIge1xuICBoZWlnaHQ6IDk1JTtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbn1cblxuLnNwYWNlciB7XG4gIGZsZXgtZ3JvdzogMTtcbn1cblxuLmhlYWRlciB7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIGJvcmRlci1yYWRpdXM6IDFyZW0gMXJlbSAwIDA7XG59XG4uaGVhZGVyIGltZyB7XG4gIHdpZHRoOiAxMDAlO1xuICBtYXgtaGVpZ2h0OiAyMC43cmVtO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5oZWFkZXIgYnV0dG9uIHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICByaWdodDogMXJlbTtcbiAgdG9wOiAxcmVtO1xufVxuLmhlYWRlciAuaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICM4ZGI1ZTM7XG4gIGNvbG9yOiAjMTg2MmI4O1xuICBtaW4td2lkdGg6IDMuMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4ubWF0LWRpYWxvZy1hY3Rpb25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG59XG4ubWF0LWRpYWxvZy1hY3Rpb25zIGEge1xuICB3aWR0aDogODAlO1xuICBwYWRkaW5nOiAwLjVyZW07XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufVxuXG4ubWF0LWRpYWxvZy1jb250ZW50IHtcbiAgZm9udC1zaXplOiAxLjZyZW07XG4gIHdoaXRlLXNwYWNlOiBwcmUtbGluZTtcbiAgbWFyZ2luOiAwIDAuNXJlbTtcbiAgY29sb3I6ICM2NjY2NjY7XG59IiwiQG1peGluIGljb24oJGRpYW1ldGVyOiAzLjJyZW0sICRiYWNrZ3JvdW5kOiAjOGRiNWUzLCAkY29sb3I6ICMxODYyYjgpIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6ICRkaWFtZXRlcjtcbiAgaGVpZ2h0OiAkZGlhbWV0ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogJGJhY2tncm91bmQ7XG4gIGNvbG9yOiAkY29sb3I7XG4gIG1pbi13aWR0aDogJGRpYW1ldGVyO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG4iXX0= */"

/***/ }),

/***/ "./src/app/home/news-feed/popup/popup.component.ts":
/*!*********************************************************!*\
  !*** ./src/app/home/news-feed/popup/popup.component.ts ***!
  \*********************************************************/
/*! exports provided: PopupComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "PopupComponent", function() { return PopupComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _angular_material__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @angular/material */ "../../node_modules/@angular/material/esm5/material.es5.js");



var PopupComponent = /** @class */ (function () {
    function PopupComponent(item) {
        this.item = item;
    }
    PopupComponent.ctorParameters = function () { return [
        { type: undefined, decorators: [{ type: _angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"], args: [_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"],] }] }
    ]; };
    PopupComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-popup',
            template: __webpack_require__(/*! raw-loader!./popup.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/news-feed/popup/popup.component.html"),
            styles: [__webpack_require__(/*! ./popup.component.scss */ "./src/app/home/news-feed/popup/popup.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__param"](0, Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Inject"])(_angular_material__WEBPACK_IMPORTED_MODULE_2__["MAT_DIALOG_DATA"])),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [Object])
    ], PopupComponent);
    return PopupComponent;
}());



/***/ }),

/***/ "./src/app/home/no-renewale-in-name.pipe.ts":
/*!**************************************************!*\
  !*** ./src/app/home/no-renewale-in-name.pipe.ts ***!
  \**************************************************/
/*! exports provided: NoRenewaleInNamePipe */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "NoRenewaleInNamePipe", function() { return NoRenewaleInNamePipe; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");


var NoRenewaleInNamePipe = /** @class */ (function () {
    function NoRenewaleInNamePipe() {
    }
    NoRenewaleInNamePipe.prototype.transform = function (name) {
        if (name === null) {
            return name;
        }
        return name.toLowerCase().endsWith('(renewal)') ? name.substring(0, name.length - ' (Renewal)'.length) : name;
    };
    NoRenewaleInNamePipe = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Pipe"])({ name: 'noRenewaleInName' })
    ], NoRenewaleInNamePipe);
    return NoRenewaleInNamePipe;
}());



/***/ }),

/***/ "./src/app/home/rewards-cards/rewards-cards.component.scss":
/*!*****************************************************************!*\
  !*** ./src/app/home/rewards-cards/rewards-cards.component.scss ***!
  \*****************************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "mat-card {\n  max-width: 28rem;\n}\nmat-card .mat-card-image {\n  margin-bottom: 0;\n}\n.mat-card {\n  -webkit-box-flex: 0;\n          flex: 0 0 0;\n  -webkit-box-flex: 1;\n          flex-grow: 1;\n  flex-basis: 75%;\n  margin: 0 0.5rem 1rem 0.5rem;\n}\n.mat-card .mat-card-image {\n  height: 15rem;\n  -o-object-fit: cover;\n     object-fit: cover;\n}\n.mat-card mat-card-actions a {\n  color: #1862b8;\n}\nmat-card-content {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  -webkit-box-pack: justify;\n          justify-content: space-between;\n  -webkit-box-align: center;\n          align-items: center;\n  width: 100%;\n  margin: 1.4rem 0 1.9rem 0;\n}\nmat-card-content .icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\nmat-card-content div h1 {\n  font-size: 1.6rem;\n  color: #666666;\n  margin: 0;\n}\nmat-card-content div h2 {\n  font-size: 1.6rem;\n  text-overflow: ellipsis;\n  color: #666666;\n  font-weight: normal;\n  margin: 0.2rem 0 0 0;\n}\nmat-card-content div h3 {\n  margin-top: 0;\n  font-weight: normal;\n  color: #666666;\n  font-size: 1.2rem;\n  margin-bottom: 0;\n}\n:host {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-orient: horizontal;\n  -webkit-box-direction: normal;\n          flex-direction: row;\n  overflow-x: scroll;\n}\n.featured-image {\n  position: relative;\n}\n.featured-image .macaron-container {\n  position: absolute;\n  top: 0;\n  right: 0;\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  text-transform: capitalize;\n}\n.featured-image .just-added, .featured-image .coming-soon {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #1862b8;\n  color: #ffffff;\n}\n.featured-image .expiring, .featured-image .running-out {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #FFDB1B;\n  color: #4d4d4c;\n}\n.featured-image .expired, .featured-image .fully-redeemed {\n  border-radius: 5rem;\n  padding: 0.5rem 1rem;\n  font-size: 1.2rem;\n  background-color: #ffffff;\n  color: #4d4d4c;\n}\n.card-description {\n  width: 85%;\n}\n.card-description h1, .card-description h2 {\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS9yZXdhcmRzLWNhcmRzL3Jld2FyZHMtY2FyZHMuY29tcG9uZW50LnNjc3MiLCJzcmMvYXBwL2hvbWUvcmV3YXJkcy1jYXJkcy9yZXdhcmRzLWNhcmRzLmNvbXBvbmVudC5zY3NzIiwiL2hvbWUvYW5keS9XZWJzdG9ybVByb2plY3RzL215LXBlcngvYXBwcy9mZWF0dXJlLWRlbW8vc3JjL2FwcC9pY29uLnNjc3MiLCIvaG9tZS9hbmR5L1dlYnN0b3JtUHJvamVjdHMvbXktcGVyeC9hcHBzL2ZlYXR1cmUtZGVtby9zdGRpbiIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvbWFjYXJvbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0UsZ0JBQUE7QUNERjtBREdFO0VBQ0UsZ0JBQUE7QUNESjtBREtBO0VBQ0UsbUJBQUE7VUFBQSxXQUFBO0VBQ0EsbUJBQUE7VUFBQSxZQUFBO0VBQ0EsZUFBQTtFQUNBLDRCQUFBO0FDRkY7QURJRTtFQUNFLGFBQUE7RUFDQSxvQkFBQTtLQUFBLGlCQUFBO0FDRko7QURNSTtFQUNFLGNBQUE7QUNKTjtBRFNBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0EseUJBQUE7VUFBQSw4QkFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSxXQUFBO0VBQ0EseUJBQUE7QUNORjtBRFFFO0VFbkNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhQUxxQjtFQU1yQixjQU5xQjtFQU9yQixrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkFWcUI7RUFXckIsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FEOEJGO0FERkk7RUFDRSxpQkFBQTtFQUNBLGNBQUE7RUFDQSxTQUFBO0FDSU47QURESTtFQUNFLGlCQUFBO0VBQ0EsdUJBQUE7RUFDQSxjQUFBO0VBQ0EsbUJBQUE7RUFDQSxvQkFBQTtBQ0dOO0FEQUk7RUFDRSxhQUFBO0VBQ0EsbUJBQUE7RUFDQSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxnQkFBQTtBQ0VOO0FFM0RBO0VBQ0Usb0JBQUE7RUFBQSxhQUFBO0VBQ0EsOEJBQUE7RUFBQSw2QkFBQTtVQUFBLG1CQUFBO0VBQ0Esa0JBQUE7QUY4REY7QUUzREE7RUFDRSxrQkFBQTtBRjhERjtBRTVERTtFQUNFLGtCQUFBO0VBQ0EsTUFBQTtFQUNBLFFBQUE7RUFDQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSwwQkFBQTtBRjhESjtBR3hFRTtFQVJBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQU1tQjtFQUxuQixjQUs0QjtBSDhFOUI7QUczRUU7RUFaQSxtQkFBQTtFQUNBLG9CQUFBO0VBQ0EsaUJBQUE7RUFDQSx5QkFVbUI7RUFUbkIsY0FTNEI7QUhpRjlCO0FHOUVFO0VBaEJBLG1CQUFBO0VBQ0Esb0JBQUE7RUFDQSxpQkFBQTtFQUNBLHlCQWNtQjtFQWJuQixjQWE0QjtBSG9GOUI7QUU3RUE7RUFDRSxVQUFBO0FGZ0ZGO0FFOUVFO0VBQ0UsbUJBQUE7RUFDQSxnQkFBQTtFQUNBLHVCQUFBO0FGZ0ZKIiwiZmlsZSI6InNyYy9hcHAvaG9tZS9yZXdhcmRzLWNhcmRzL3Jld2FyZHMtY2FyZHMuY29tcG9uZW50LnNjc3MiLCJzb3VyY2VzQ29udGVudCI6WyJAaW1wb3J0ICcuLi9pY29uLnNjc3MnO1xuXG5tYXQtY2FyZCB7XG4gIG1heC13aWR0aDogMjhyZW07XG5cbiAgLm1hdC1jYXJkLWltYWdlIHtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG59XG5cbi5tYXQtY2FyZCB7XG4gIGZsZXg6IDAgMCAwO1xuICBmbGV4LWdyb3c6IDE7XG4gIGZsZXgtYmFzaXM6IDc1JTtcbiAgbWFyZ2luOiAwIDAuNXJlbSAxcmVtIDAuNXJlbTtcblxuICAubWF0LWNhcmQtaW1hZ2Uge1xuICAgIGhlaWdodDogMTVyZW07XG4gICAgb2JqZWN0LWZpdDogY292ZXI7XG4gIH1cblxuICBtYXQtY2FyZC1hY3Rpb25zIHtcbiAgICBhIHtcbiAgICAgIGNvbG9yOiAjMTg2MmI4O1xuICAgIH1cbiAgfVxufVxuXG5tYXQtY2FyZC1jb250ZW50IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB3aWR0aDogMTAwJTtcbiAgbWFyZ2luOiAxLjRyZW0gMCAxLjlyZW0gMDtcblxuICAuaWNvbiB7XG4gICAgQGluY2x1ZGUgaWNvbjtcbiAgfVxuXG4gIGRpdiB7XG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAxLjZyZW07XG4gICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICAgIG1hcmdpbjogMDtcbiAgICB9XG5cbiAgICBoMiB7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICAgIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xuICAgICAgY29sb3I6ICM2NjY2NjY7XG4gICAgICBmb250LXdlaWdodDogbm9ybWFsO1xuICAgICAgbWFyZ2luOiAwLjJyZW0gMCAwIDA7XG4gICAgfVxuXG4gICAgaDMge1xuICAgICAgbWFyZ2luLXRvcDogMDtcbiAgICAgIGZvbnQtd2VpZ2h0OiBub3JtYWw7XG4gICAgICBjb2xvcjogIzY2NjY2NjtcbiAgICAgIGZvbnQtc2l6ZTogMS4ycmVtO1xuICAgICAgbWFyZ2luLWJvdHRvbTogMDtcbiAgICB9XG4gIH1cbn1cbiIsIm1hdC1jYXJkIHtcbiAgbWF4LXdpZHRoOiAyOHJlbTtcbn1cbm1hdC1jYXJkIC5tYXQtY2FyZC1pbWFnZSB7XG4gIG1hcmdpbi1ib3R0b206IDA7XG59XG5cbi5tYXQtY2FyZCB7XG4gIGZsZXg6IDAgMCAwO1xuICBmbGV4LWdyb3c6IDE7XG4gIGZsZXgtYmFzaXM6IDc1JTtcbiAgbWFyZ2luOiAwIDAuNXJlbSAxcmVtIDAuNXJlbTtcbn1cbi5tYXQtY2FyZCAubWF0LWNhcmQtaW1hZ2Uge1xuICBoZWlnaHQ6IDE1cmVtO1xuICBvYmplY3QtZml0OiBjb3Zlcjtcbn1cbi5tYXQtY2FyZCBtYXQtY2FyZC1hY3Rpb25zIGEge1xuICBjb2xvcjogIzE4NjJiODtcbn1cblxubWF0LWNhcmQtY29udGVudCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYmV0d2VlbjtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIG1hcmdpbjogMS40cmVtIDAgMS45cmVtIDA7XG59XG5tYXQtY2FyZC1jb250ZW50IC5pY29uIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgd2lkdGg6IDMuMnJlbTtcbiAgaGVpZ2h0OiAzLjJyZW07XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYmFja2dyb3VuZDogIzhkYjVlMztcbiAgY29sb3I6ICMxODYyYjg7XG4gIG1pbi13aWR0aDogMy4ycmVtO1xuICBib3JkZXI6IDA7XG4gIG91dGxpbmU6IG5vbmU7XG4gIHotaW5kZXg6IDE7XG59XG5tYXQtY2FyZC1jb250ZW50IGRpdiBoMSB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICBjb2xvcjogIzY2NjY2NjtcbiAgbWFyZ2luOiAwO1xufVxubWF0LWNhcmQtY29udGVudCBkaXYgaDIge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBmb250LXdlaWdodDogbm9ybWFsO1xuICBtYXJnaW46IDAuMnJlbSAwIDAgMDtcbn1cbm1hdC1jYXJkLWNvbnRlbnQgZGl2IGgzIHtcbiAgbWFyZ2luLXRvcDogMDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBtYXJnaW4tYm90dG9tOiAwO1xufVxuXG46aG9zdCB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIG92ZXJmbG93LXg6IHNjcm9sbDtcbn1cblxuLmZlYXR1cmVkLWltYWdlIHtcbiAgcG9zaXRpb246IHJlbGF0aXZlO1xufVxuLmZlYXR1cmVkLWltYWdlIC5tYWNhcm9uLWNvbnRhaW5lciB7XG4gIHBvc2l0aW9uOiBhYnNvbHV0ZTtcbiAgdG9wOiAwO1xuICByaWdodDogMDtcbiAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICB0ZXh0LXRyYW5zZm9ybTogY2FwaXRhbGl6ZTtcbn1cbi5mZWF0dXJlZC1pbWFnZSAuanVzdC1hZGRlZCwgLmZlYXR1cmVkLWltYWdlIC5jb21pbmctc29vbiB7XG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzE4NjJiODtcbiAgY29sb3I6ICNmZmZmZmY7XG59XG4uZmVhdHVyZWQtaW1hZ2UgLmV4cGlyaW5nLCAuZmVhdHVyZWQtaW1hZ2UgLnJ1bm5pbmctb3V0IHtcbiAgYm9yZGVyLXJhZGl1czogNXJlbTtcbiAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gIGZvbnQtc2l6ZTogMS4ycmVtO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjRkZEQjFCO1xuICBjb2xvcjogIzRkNGQ0Yztcbn1cbi5mZWF0dXJlZC1pbWFnZSAuZXhwaXJlZCwgLmZlYXR1cmVkLWltYWdlIC5mdWxseS1yZWRlZW1lZCB7XG4gIGJvcmRlci1yYWRpdXM6IDVyZW07XG4gIHBhZGRpbmc6IDAuNXJlbSAxcmVtO1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgYmFja2dyb3VuZC1jb2xvcjogI2ZmZmZmZjtcbiAgY29sb3I6ICM0ZDRkNGM7XG59XG5cbi5jYXJkLWRlc2NyaXB0aW9uIHtcbiAgd2lkdGg6IDg1JTtcbn1cbi5jYXJkLWRlc2NyaXB0aW9uIGgxLCAuY2FyZC1kZXNjcmlwdGlvbiBoMiB7XG4gIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gIG92ZXJmbG93OiBoaWRkZW47XG4gIHRleHQtb3ZlcmZsb3c6IGVsbGlwc2lzO1xufSIsIkBtaXhpbiBpY29uKCRkaWFtZXRlcjogMy4ycmVtLCAkYmFja2dyb3VuZDogIzhkYjVlMywgJGNvbG9yOiAjMTg2MmI4KSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAkZGlhbWV0ZXI7XG4gIGhlaWdodDogJGRpYW1ldGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGNvbG9yO1xuICBtaW4td2lkdGg6ICRkaWFtZXRlcjtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuIiwiQGltcG9ydCBcIi4uL2NhcmRzXCI7XG5AaW1wb3J0IFwiLi4vLi4vbWFjYXJvbi5zY3NzXCI7XG5cbjpob3N0IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAgb3ZlcmZsb3cteDogc2Nyb2xsO1xufVxuXG4uZmVhdHVyZWQtaW1hZ2Uge1xuICBwb3NpdGlvbjogcmVsYXRpdmU7XG5cbiAgLm1hY2Fyb24tY29udGFpbmVyIHtcbiAgICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gICAgdG9wOiAwO1xuICAgIHJpZ2h0OiAwO1xuICAgIGJvcmRlci1yYWRpdXM6IDVyZW07XG4gICAgcGFkZGluZzogMC41cmVtIDFyZW07XG4gICAgZm9udC1zaXplOiAxLjJyZW07XG4gICAgdGV4dC10cmFuc2Zvcm06IGNhcGl0YWxpemU7XG4gIH1cblxuICBAaW5jbHVkZSBtYWNhcm9uU3R5bGVzKCk7XG59XG5cbi5jYXJkLWRlc2NyaXB0aW9uIHtcbiAgd2lkdGg6IDg1JTtcblxuICBoMSwgaDIge1xuICAgIHdoaXRlLXNwYWNlOiBub3dyYXA7XG4gICAgb3ZlcmZsb3c6IGhpZGRlbjtcbiAgICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgfVxufVxuIiwiQG1peGluIG1hY2Fyb24oJGJhY2tncm91bmRDb2xvciwgJGZvbnRDb2xvcikge1xuICBib3JkZXItcmFkaXVzOiA1cmVtO1xuICBwYWRkaW5nOiAwLjVyZW0gMXJlbTtcbiAgZm9udC1zaXplOiAxLjJyZW07XG4gIGJhY2tncm91bmQtY29sb3I6ICRiYWNrZ3JvdW5kQ29sb3I7XG4gIGNvbG9yOiAkZm9udENvbG9yO1xufVxuXG5AbWl4aW4gbWFjYXJvblN0eWxlcyB7XG4gIC5qdXN0LWFkZGVkLCAuY29taW5nLXNvb24ge1xuICAgIEBpbmNsdWRlIG1hY2Fyb24oIzE4NjJiOCwgI2ZmZmZmZik7XG4gIH1cblxuICAuZXhwaXJpbmcsIC5ydW5uaW5nLW91dCB7XG4gICAgQGluY2x1ZGUgbWFjYXJvbigjRkZEQjFCLCAjNGQ0ZDRjKTtcbiAgfVxuXG4gIC5leHBpcmVkLCAuZnVsbHktcmVkZWVtZWQge1xuICAgIEBpbmNsdWRlIG1hY2Fyb24oI2ZmZmZmZiwgIzRkNGQ0Yyk7XG4gIH1cbn1cbiJdfQ== */"

/***/ }),

/***/ "./src/app/home/rewards-cards/rewards-cards.component.ts":
/*!***************************************************************!*\
  !*** ./src/app/home/rewards-cards/rewards-cards.component.ts ***!
  \***************************************************************/
/*! exports provided: RewardsCardsComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "RewardsCardsComponent", function() { return RewardsCardsComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var _services_macaron_service__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../../services/macaron.service */ "./src/app/services/macaron.service.ts");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");





var RewardsCardsComponent = /** @class */ (function () {
    function RewardsCardsComponent(rewardsService, macaronService) {
        this.rewardsService = rewardsService;
        this.macaronService = macaronService;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    RewardsCardsComponent.prototype.ngOnInit = function () {
        this.rewards = this.rewardsService.getAllRewards(['featured'])
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (rewards) { return rewards.sort(function (a, b) {
            if (!a.sellingFrom) {
                return 1;
            }
            if (!b.sellingFrom) {
                return -1;
            }
            return a.sellingFrom.getTime() - b.sellingFrom.getTime();
        }); }));
    };
    RewardsCardsComponent.prototype.getMacaron = function (reward) {
        return this.macaronService.getMacaron(reward);
    };
    RewardsCardsComponent.prototype.selected = function (reward) {
        this.tapped.emit(reward);
    };
    RewardsCardsComponent.ctorParameters = function () { return [
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["RewardsService"] },
        { type: _services_macaron_service__WEBPACK_IMPORTED_MODULE_3__["MacaronService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], RewardsCardsComponent.prototype, "tapped", void 0);
    RewardsCardsComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-rewards-cards',
            template: __webpack_require__(/*! raw-loader!./rewards-cards.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/rewards-cards/rewards-cards.component.html"),
            styles: [__webpack_require__(/*! ./rewards-cards.component.scss */ "./src/app/home/rewards-cards/rewards-cards.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_perx_core__WEBPACK_IMPORTED_MODULE_2__["RewardsService"],
            _services_macaron_service__WEBPACK_IMPORTED_MODULE_3__["MacaronService"]])
    ], RewardsCardsComponent);
    return RewardsCardsComponent;
}());



/***/ }),

/***/ "./src/app/home/vouchers/vouchers.component.scss":
/*!*******************************************************!*\
  !*** ./src/app/home/vouchers/vouchers.component.scss ***!
  \*******************************************************/
/*! no static exports found */
/***/ (function(module, exports) {

module.exports = "button {\n  background: rgba(255, 255, 255, 0);\n  border: 1px solid #1862b8;\n  box-sizing: border-box;\n  border-radius: 5px;\n  text-transform: uppercase;\n  font-size: 1.8rem;\n  height: 5rem;\n  width: 100%;\n  color: #666666;\n}\n\n.icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #8db5e3;\n  color: #1862b8;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\n.disabled-icon {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-pack: center;\n          justify-content: center;\n  text-align: center;\n  width: 3.2rem;\n  height: 3.2rem;\n  border-radius: 50%;\n  background: #D4D4D4;\n  color: white;\n  min-width: 3.2rem;\n  border: 0;\n  outline: none;\n  z-index: 1;\n}\n\nh1 {\n  color: #666666;\n  font-size: 2.5rem;\n}\n\n.mat-card {\n  margin-bottom: 1rem;\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-align: center;\n          align-items: center;\n}\n\n.mat-card-header {\n  -webkit-box-align: center;\n          align-items: center;\n  -webkit-box-flex: 1;\n          flex: 1;\n  width: 18rem;\n  display: block;\n}\n\n.mat-card-header .mat-card-title {\n  font-size: 1.6rem;\n  font-weight: bold;\n  color: #666666;\n}\n\n.mat-card-header .mat-card-subtitle {\n  font-size: 1.2rem;\n  margin-bottom: 0;\n}\n\n.mat-card-header .mat-card-subtitle.less-three-days {\n  color: #D8127D;\n}\n\n.mat-card-header .mat-card-subtitle.greater-three-days {\n  color: #666666;\n}\n\n.rewards-container {\n  padding: 0 1.5rem;\n}\n\n.rewards-container .empty-wallet {\n  display: -webkit-box;\n  display: flex;\n  -webkit-box-pack: center;\n          justify-content: center;\n  width: 100%;\n  -webkit-box-orient: vertical;\n  -webkit-box-direction: normal;\n          flex-direction: column;\n  -webkit-box-align: center;\n          align-items: center;\n  margin-top: 7rem;\n}\n\n.rewards-container .empty-wallet h1 {\n  font-size: 2.5rem;\n}\n\n.rewards-container .empty-wallet p {\n  font-size: 1.6rem;\n  text-align: center;\n  color: #666666;\n}\n\n.past-rewards {\n  margin-top: 3rem;\n}\n\n.no-rewards {\n  text-align: center;\n  padding: 0 1.5rem;\n  margin-top: 4rem;\n}\n\n.no-rewards p.title {\n  color: #666666;\n  font-size: 2.5rem;\n  margin-top: 0;\n}\n\n.no-rewards p.sub-title {\n  color: #666666;\n  font-size: 1.6rem;\n}\n/*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaG9tZS92b3VjaGVycy92b3VjaGVycy5jb21wb25lbnQuc2NzcyIsInNyYy9hcHAvaG9tZS92b3VjaGVycy92b3VjaGVycy5jb21wb25lbnQuc2NzcyIsIi9ob21lL2FuZHkvV2Vic3Rvcm1Qcm9qZWN0cy9teS1wZXJ4L2FwcHMvZmVhdHVyZS1kZW1vL3NyYy9hcHAvaWNvbi5zY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUVBO0VBQ0Usa0NBQUE7RUFDQSx5QkFBQTtFQUNBLHNCQUFBO0VBQ0Esa0JBQUE7RUFDQSx5QkFBQTtFQUNBLGlCQUFBO0VBQ0EsWUFBQTtFQUNBLFdBQUE7RUFDQSxjQUFBO0FDREY7O0FESUE7RUViRSxvQkFBQTtFQUFBLGFBQUE7RUFDQSx5QkFBQTtVQUFBLG1CQUFBO0VBQ0Esd0JBQUE7VUFBQSx1QkFBQTtFQUNBLGtCQUFBO0VBQ0EsYUZVYztFRVRkLGNGU2M7RUVSZCxrQkFBQTtFQUNBLG1CQVIwQztFQVMxQyxjQVQyRDtFQVUzRCxpQkZLYztFRUpkLFNBQUE7RUFDQSxhQUFBO0VBQ0EsVUFBQTtBRGFGOztBRFJBO0VFakJFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7RUFDQSx3QkFBQTtVQUFBLHVCQUFBO0VBQ0Esa0JBQUE7RUFDQSxhRmNjO0VFYmQsY0ZhYztFRVpkLGtCQUFBO0VBQ0EsbUJGV3NCO0VFVnRCLFlGVStCO0VFVC9CLGlCRlNjO0VFUmQsU0FBQTtFQUNBLGFBQUE7RUFDQSxVQUFBO0FENkJGOztBRHBCQTtFQUNFLGNBQUE7RUFDQSxpQkFBQTtBQ3VCRjs7QURwQkE7RUFDRSxtQkFBQTtFQUNBLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHlCQUFBO1VBQUEsbUJBQUE7QUN1QkY7O0FEcEJBO0VBQ0UseUJBQUE7VUFBQSxtQkFBQTtFQUNBLG1CQUFBO1VBQUEsT0FBQTtFQUNBLFlBQUE7RUFDQSxjQUFBO0FDdUJGOztBRHJCRTtFQUNFLGlCQUFBO0VBQ0EsaUJBQUE7RUFDQSxjQUFBO0FDdUJKOztBRHBCRTtFQUNFLGlCQUFBO0VBQ0EsZ0JBQUE7QUNzQko7O0FEbkJFO0VBQ0UsY0FBQTtBQ3FCSjs7QURsQkU7RUFDRSxjQUFBO0FDb0JKOztBRGhCQTtFQUNFLGlCQUFBO0FDbUJGOztBRGpCRTtFQUNFLG9CQUFBO0VBQUEsYUFBQTtFQUNBLHdCQUFBO1VBQUEsdUJBQUE7RUFDQSxXQUFBO0VBQ0EsNEJBQUE7RUFBQSw2QkFBQTtVQUFBLHNCQUFBO0VBQ0EseUJBQUE7VUFBQSxtQkFBQTtFQUNBLGdCQUFBO0FDbUJKOztBRGpCSTtFQUNFLGlCQUFBO0FDbUJOOztBRGhCSTtFQUNFLGlCQUFBO0VBQ0Esa0JBQUE7RUFDQSxjQUFBO0FDa0JOOztBRGJBO0VBQ0UsZ0JBQUE7QUNnQkY7O0FEYkE7RUFDRSxrQkFBQTtFQUNBLGlCQUFBO0VBQ0EsZ0JBQUE7QUNnQkY7O0FEZEU7RUFDRSxjQUFBO0VBQ0EsaUJBQUE7RUFDQSxhQUFBO0FDZ0JKOztBRGJFO0VBQ0UsY0FBQTtFQUNBLGlCQUFBO0FDZUoiLCJmaWxlIjoic3JjL2FwcC9ob21lL3ZvdWNoZXJzL3ZvdWNoZXJzLmNvbXBvbmVudC5zY3NzIiwic291cmNlc0NvbnRlbnQiOlsiQGltcG9ydCAnLi4vLi4vaWNvbi5zY3NzJztcblxuYnV0dG9uIHtcbiAgYmFja2dyb3VuZDogcmdiYSgyNTUsIDI1NSwgMjU1LCAwKTtcbiAgYm9yZGVyOiAxcHggc29saWQgIzE4NjJiODtcbiAgYm94LXNpemluZzogYm9yZGVyLWJveDtcbiAgYm9yZGVyLXJhZGl1czogNXB4O1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBmb250LXNpemU6IDEuOHJlbTtcbiAgaGVpZ2h0OiA1cmVtO1xuICB3aWR0aDogMTAwJTtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG5cbi5pY29uIHtcbiAgQGluY2x1ZGUgaWNvbigzLjJyZW0pO1xufVxuXG4uZGlzYWJsZWQtaWNvbiB7XG4gIEBpbmNsdWRlIGljb24oMy4ycmVtLCAjRDRENEQ0LCB3aGl0ZSk7XG59XG5cbmgxIHtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xufVxuXG4ubWF0LWNhcmQge1xuICBtYXJnaW4tYm90dG9tOiAxcmVtO1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4ubWF0LWNhcmQtaGVhZGVyIHtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgZmxleDogMTtcbiAgd2lkdGg6IDE4cmVtO1xuICBkaXNwbGF5OiBibG9jaztcblxuICAubWF0LWNhcmQtdGl0bGUge1xuICAgIGZvbnQtc2l6ZTogMS42cmVtO1xuICAgIGZvbnQtd2VpZ2h0OiBib2xkO1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICB9XG5cbiAgLm1hdC1jYXJkLXN1YnRpdGxlIHtcbiAgICBmb250LXNpemU6IDEuMnJlbTtcbiAgICBtYXJnaW4tYm90dG9tOiAwO1xuICB9XG5cbiAgLm1hdC1jYXJkLXN1YnRpdGxlLmxlc3MtdGhyZWUtZGF5cyB7XG4gICAgY29sb3I6ICNEODEyN0Q7XG4gIH1cblxuICAubWF0LWNhcmQtc3VidGl0bGUuZ3JlYXRlci10aHJlZS1kYXlzIHtcbiAgICBjb2xvcjogIzY2NjY2NjtcbiAgfVxufVxuXG4ucmV3YXJkcy1jb250YWluZXIge1xuICBwYWRkaW5nOiAwIDEuNXJlbTtcblxuICAuZW1wdHktd2FsbGV0IHtcbiAgICBkaXNwbGF5OiBmbGV4O1xuICAgIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICAgIHdpZHRoOiAxMDAlO1xuICAgIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gICAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAgICBtYXJnaW4tdG9wOiA3cmVtO1xuXG4gICAgaDEge1xuICAgICAgZm9udC1zaXplOiAyLjVyZW07XG4gICAgfVxuXG4gICAgcCB7XG4gICAgICBmb250LXNpemU6IDEuNnJlbTtcbiAgICAgIHRleHQtYWxpZ246IGNlbnRlcjtcbiAgICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIH1cbiAgfVxufVxuXG4ucGFzdC1yZXdhcmRzIHtcbiAgbWFyZ2luLXRvcDogM3JlbTtcbn1cblxuLm5vLXJld2FyZHMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAgMS41cmVtO1xuICBtYXJnaW4tdG9wOiA0cmVtO1xuXG4gIHAudGl0bGUge1xuICAgIGNvbG9yOiAjNjY2NjY2O1xuICAgIGZvbnQtc2l6ZTogMi41cmVtO1xuICAgIG1hcmdpbi10b3A6IDA7XG4gIH1cblxuICBwLnN1Yi10aXRsZSB7XG4gICAgY29sb3I6ICM2NjY2NjY7XG4gICAgZm9udC1zaXplOiAxLjZyZW07XG4gIH1cbn1cbiIsImJ1dHRvbiB7XG4gIGJhY2tncm91bmQ6IHJnYmEoMjU1LCAyNTUsIDI1NSwgMCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkICMxODYyYjg7XG4gIGJveC1zaXppbmc6IGJvcmRlci1ib3g7XG4gIGJvcmRlci1yYWRpdXM6IDVweDtcbiAgdGV4dC10cmFuc2Zvcm06IHVwcGVyY2FzZTtcbiAgZm9udC1zaXplOiAxLjhyZW07XG4gIGhlaWdodDogNXJlbTtcbiAgd2lkdGg6IDEwMCU7XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4uaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICM4ZGI1ZTM7XG4gIGNvbG9yOiAjMTg2MmI4O1xuICBtaW4td2lkdGg6IDMuMnJlbTtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuXG4uZGlzYWJsZWQtaWNvbiB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAzLjJyZW07XG4gIGhlaWdodDogMy4ycmVtO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICNENEQ0RDQ7XG4gIGNvbG9yOiB3aGl0ZTtcbiAgbWluLXdpZHRoOiAzLjJyZW07XG4gIGJvcmRlcjogMDtcbiAgb3V0bGluZTogbm9uZTtcbiAgei1pbmRleDogMTtcbn1cblxuaDEge1xuICBjb2xvcjogIzY2NjY2NjtcbiAgZm9udC1zaXplOiAyLjVyZW07XG59XG5cbi5tYXQtY2FyZCB7XG4gIG1hcmdpbi1ib3R0b206IDFyZW07XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5tYXQtY2FyZC1oZWFkZXIge1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBmbGV4OiAxO1xuICB3aWR0aDogMThyZW07XG4gIGRpc3BsYXk6IGJsb2NrO1xufVxuLm1hdC1jYXJkLWhlYWRlciAubWF0LWNhcmQtdGl0bGUge1xuICBmb250LXNpemU6IDEuNnJlbTtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuLm1hdC1jYXJkLWhlYWRlciAubWF0LWNhcmQtc3VidGl0bGUge1xuICBmb250LXNpemU6IDEuMnJlbTtcbiAgbWFyZ2luLWJvdHRvbTogMDtcbn1cbi5tYXQtY2FyZC1oZWFkZXIgLm1hdC1jYXJkLXN1YnRpdGxlLmxlc3MtdGhyZWUtZGF5cyB7XG4gIGNvbG9yOiAjRDgxMjdEO1xufVxuLm1hdC1jYXJkLWhlYWRlciAubWF0LWNhcmQtc3VidGl0bGUuZ3JlYXRlci10aHJlZS1kYXlzIHtcbiAgY29sb3I6ICM2NjY2NjY7XG59XG5cbi5yZXdhcmRzLWNvbnRhaW5lciB7XG4gIHBhZGRpbmc6IDAgMS41cmVtO1xufVxuLnJld2FyZHMtY29udGFpbmVyIC5lbXB0eS13YWxsZXQge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGNlbnRlcjtcbiAgd2lkdGg6IDEwMCU7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi10b3A6IDdyZW07XG59XG4ucmV3YXJkcy1jb250YWluZXIgLmVtcHR5LXdhbGxldCBoMSB7XG4gIGZvbnQtc2l6ZTogMi41cmVtO1xufVxuLnJld2FyZHMtY29udGFpbmVyIC5lbXB0eS13YWxsZXQgcCB7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIGNvbG9yOiAjNjY2NjY2O1xufVxuXG4ucGFzdC1yZXdhcmRzIHtcbiAgbWFyZ2luLXRvcDogM3JlbTtcbn1cblxuLm5vLXJld2FyZHMge1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHBhZGRpbmc6IDAgMS41cmVtO1xuICBtYXJnaW4tdG9wOiA0cmVtO1xufVxuLm5vLXJld2FyZHMgcC50aXRsZSB7XG4gIGNvbG9yOiAjNjY2NjY2O1xuICBmb250LXNpemU6IDIuNXJlbTtcbiAgbWFyZ2luLXRvcDogMDtcbn1cbi5uby1yZXdhcmRzIHAuc3ViLXRpdGxlIHtcbiAgY29sb3I6ICM2NjY2NjY7XG4gIGZvbnQtc2l6ZTogMS42cmVtO1xufSIsIkBtaXhpbiBpY29uKCRkaWFtZXRlcjogMy4ycmVtLCAkYmFja2dyb3VuZDogIzhkYjVlMywgJGNvbG9yOiAjMTg2MmI4KSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG4gIHdpZHRoOiAkZGlhbWV0ZXI7XG4gIGhlaWdodDogJGRpYW1ldGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJhY2tncm91bmQ6ICRiYWNrZ3JvdW5kO1xuICBjb2xvcjogJGNvbG9yO1xuICBtaW4td2lkdGg6ICRkaWFtZXRlcjtcbiAgYm9yZGVyOiAwO1xuICBvdXRsaW5lOiBub25lO1xuICB6LWluZGV4OiAxO1xufVxuIl19 */"

/***/ }),

/***/ "./src/app/home/vouchers/vouchers.component.ts":
/*!*****************************************************!*\
  !*** ./src/app/home/vouchers/vouchers.component.ts ***!
  \*****************************************************/
/*! exports provided: VouchersComponent */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "VouchersComponent", function() { return VouchersComponent; });
/* harmony import */ var tslib__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! tslib */ "../../node_modules/tslib/tslib.es6.js");
/* harmony import */ var _angular_core__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! @angular/core */ "../../node_modules/@angular/core/fesm5/core.js");
/* harmony import */ var _perx_core__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! @perx/core */ "../../libs/perx-core/dist/perx-core/fesm5/perx-core.js");
/* harmony import */ var rxjs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! rxjs */ "../../node_modules/rxjs/_esm5/index.js");
/* harmony import */ var rxjs_operators__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! rxjs/operators */ "../../node_modules/rxjs/_esm5/operators/index.js");
/* harmony import */ var _angular_router__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! @angular/router */ "../../node_modules/@angular/router/fesm5/router.js");






var VouchersComponent = /** @class */ (function () {
    function VouchersComponent(router, vouchersService) {
        this.router = router;
        this.vouchersService = vouchersService;
        this.defaultNbVouchers = 5;
        this.hideSeeMore = false;
        this.tapped = new _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"]();
    }
    VouchersComponent.prototype.ngOnInit = function () {
        var _this = this;
        var feed = this.vouchersService.getAll();
        feed.pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (vouchs) {
            return vouchs.filter(function (voucher) { return voucher.state === _perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].issued; });
        }))
            .subscribe(function (vouchs) {
            _this.savedVouchers = vouchs;
        });
        this.redeemedVouchers = feed
            .pipe(Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (vouchers) { return vouchers.filter(function (voucher) { return voucher.state !== _perx_core__WEBPACK_IMPORTED_MODULE_2__["VoucherState"].issued; }); }), Object(rxjs_operators__WEBPACK_IMPORTED_MODULE_4__["map"])(function (vouchers) { return vouchers.filter(function (voucher) { return _this.daysSince(voucher.redemptionDate); }); }));
    };
    VouchersComponent.prototype.getObservableSavedVouchers = function () {
        if (!this.hideSeeMore && this.savedVouchers.length > this.defaultNbVouchers) {
            return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(this.savedVouchers.slice(0, this.defaultNbVouchers));
        }
        return Object(rxjs__WEBPACK_IMPORTED_MODULE_3__["of"])(this.savedVouchers);
    };
    VouchersComponent.prototype.voucherSelected = function (voucher) {
        this.router.navigate(['/voucher'], { queryParams: { id: voucher.id } });
    };
    VouchersComponent.prototype.seeMoreClicked = function () {
        this.hideSeeMore = true;
    };
    VouchersComponent.prototype.getDifferenceWithCurrentInDays = function (inputDate) {
        if (!inputDate) {
            // TODO: not sure about vouchers with null expiry
            return 0;
        }
        var oneDay = 24 * 60 * 60 * 1000;
        var currentDate = new Date();
        return (inputDate.getTime() - currentDate.getTime()) / oneDay;
    };
    VouchersComponent.prototype.getTextColorClass = function (voucher) {
        var days = this.getDifferenceWithCurrentInDays(voucher.expiry);
        return days >= 3 ? 'greater-three-days' : 'less-three-days';
    };
    VouchersComponent.prototype.getNumberOfDays = function (voucher) {
        var daysDifference = Math.floor(this.getDifferenceWithCurrentInDays(voucher.expiry));
        return daysDifference < 0 ? '' : "Expires in " + daysDifference + " days";
    };
    VouchersComponent.prototype.daysSince = function (expiryDate) {
        var daysElapsed = Math.abs(this.getDifferenceWithCurrentInDays(expiryDate));
        var daysToDisplay = 30;
        return daysToDisplay > daysElapsed;
    };
    VouchersComponent.ctorParameters = function () { return [
        { type: _angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"] },
        { type: _perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"] }
    ]; };
    tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Output"])(),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:type", _angular_core__WEBPACK_IMPORTED_MODULE_1__["EventEmitter"])
    ], VouchersComponent.prototype, "tapped", void 0);
    VouchersComponent = tslib__WEBPACK_IMPORTED_MODULE_0__["__decorate"]([
        Object(_angular_core__WEBPACK_IMPORTED_MODULE_1__["Component"])({
            selector: 'app-vouchers',
            template: __webpack_require__(/*! raw-loader!./vouchers.component.html */ "../../node_modules/raw-loader/index.js!./src/app/home/vouchers/vouchers.component.html"),
            styles: [__webpack_require__(/*! ./vouchers.component.scss */ "./src/app/home/vouchers/vouchers.component.scss")]
        }),
        tslib__WEBPACK_IMPORTED_MODULE_0__["__metadata"]("design:paramtypes", [_angular_router__WEBPACK_IMPORTED_MODULE_5__["Router"], _perx_core__WEBPACK_IMPORTED_MODULE_2__["IVoucherService"]])
    ], VouchersComponent);
    return VouchersComponent;
}());



/***/ })

}]);
//# sourceMappingURL=home-home-module.js.map