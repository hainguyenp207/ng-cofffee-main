webpackJsonp([0,6],{

/***/ 658:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_common__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__login_component__ = __webpack_require__(659);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_app_components_alert_alert_component__ = __webpack_require__(660);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_app_services_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__login_routing__ = __webpack_require__(661);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "LoginModule", function() { return LoginModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};







var LoginModule = (function () {
    function LoginModule() {
    }
    return LoginModule;
}());
LoginModule = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["NgModule"])({
        imports: [
            __WEBPACK_IMPORTED_MODULE_1__angular_common__["CommonModule"],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["b" /* ReactiveFormsModule */],
            __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
            __WEBPACK_IMPORTED_MODULE_6__login_routing__["a" /* routing */],
        ],
        declarations: [
            __WEBPACK_IMPORTED_MODULE_3__login_component__["a" /* LoginComponent */],
            __WEBPACK_IMPORTED_MODULE_4_app_components_alert_alert_component__["a" /* AlertComponent */]
        ],
        providers: [
            __WEBPACK_IMPORTED_MODULE_5_app_services_index__["a" /* AuthenticationService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_index__["g" /* AlertService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_index__["b" /* UserService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_index__["c" /* RoleService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_index__["d" /* OrganizationService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_index__["e" /* ActivityService */],
            __WEBPACK_IMPORTED_MODULE_5_app_services_index__["f" /* RegisterService */]
        ],
    })
], LoginModule);

//# sourceMappingURL=login.module.js.map

/***/ }),

/***/ 659:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_app_services_index__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_app_models_index__ = __webpack_require__(56);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoginComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var LoginComponent = (function () {
    function LoginComponent(route, router, authenticationService, alertService) {
        this.route = route;
        this.router = router;
        this.authenticationService = authenticationService;
        this.alertService = alertService;
        this.user = new __WEBPACK_IMPORTED_MODULE_3_app_models_index__["a" /* User */];
        this.loading = false;
    }
    LoginComponent.prototype.ngOnInit = function () {
        // reset login status
        this.authenticationService.logout();
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['return_url'] || '/';
    };
    LoginComponent.prototype.login = function () {
        var _this = this;
        this.loading = true;
        this.authenticationService.login(this.user.username, this.user.password)
            .subscribe(function (data) {
            console.log("Return url", _this.returnUrl);
            var token = localStorage.getItem("token");
            var dataUser = JSON.parse(localStorage.getItem("data"));
            if (_this.returnUrl === "/") {
                _this.router.navigate([_this.returnUrl]);
            }
            else {
                window.location.href = _this.returnUrl + "/#/?access_token=" + token + "&user_name=" + dataUser.name + "&user_id=" + dataUser.username;
            }
        }, function (error) {
            var detail = error.json();
            if (detail)
                _this.alertService.error(detail.message);
            else {
                _this.alertService.error(error);
            }
            _this.loading = false;
        });
    };
    return LoginComponent;
}());
LoginComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-login',
        template: __webpack_require__(665),
        styles: [__webpack_require__(663)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === "function" && _a || Object, typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__angular_router__["b" /* Router */]) === "function" && _b || Object, typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_index__["a" /* AuthenticationService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_index__["a" /* AuthenticationService */]) === "function" && _c || Object, typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_2_app_services_index__["g" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_app_services_index__["g" /* AlertService */]) === "function" && _d || Object])
], LoginComponent);

var _a, _b, _c, _d;
//# sourceMappingURL=login.component.js.map

/***/ }),

/***/ 660:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__services_index__ = __webpack_require__(13);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AlertComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AlertComponent = (function () {
    function AlertComponent(alertService) {
        this.alertService = alertService;
    }
    AlertComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.alertService.getMessage().subscribe(function (message) { _this.message = message; });
    };
    return AlertComponent;
}());
AlertComponent = __decorate([
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
        selector: 'app-alert',
        template: __webpack_require__(664),
        styles: [__webpack_require__(662)]
    }),
    __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__services_index__["g" /* AlertService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__services_index__["g" /* AlertService */]) === "function" && _a || Object])
], AlertComponent);

var _a;
//# sourceMappingURL=alert.component.js.map

/***/ }),

/***/ 661:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__login_component__ = __webpack_require__(659);
/* unused harmony export routes */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return routing; });


// noinspection TypeScriptValidateTypes
var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_1__login_component__["a" /* LoginComponent */]
    }
];
var routing = __WEBPACK_IMPORTED_MODULE_0__angular_router__["d" /* RouterModule */].forChild(routes);
//# sourceMappingURL=login.routing.js.map

/***/ }),

/***/ 662:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 663:
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(2)(false);
// imports


// module
exports.push([module.i, "", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ 664:
/***/ (function(module, exports) {

module.exports = "<div *ngIf=\"message\" [ngClass]=\"{ 'alert alert-dismissable fade in': message, 'alert-success': message.type === 'success', 'alert-danger': message.type === 'error' }\">\n  {{message.text}}\n</div>"

/***/ }),

/***/ 665:
/***/ (function(module, exports) {

module.exports = "<div class=\"account-pages\">\n</div>\n<div class=\"clearfix\"></div>\n<div class=\"wrapper-page\">\n  <div class=\"card-box\">\n    <div class=\"panel-heading\">\n      <h3 class=\"text-center\"> Đăng nhập</h3>\n    </div>\n    <div class=\"panel-body\">\n      <form class=\"form-horizontal m-t-20\" (ngSubmit)=\"f.form.valid && login()\" #f=\"ngForm\" novalidate>\n        <app-alert></app-alert>\n        <div class=\"form-group \">\n          <div class=\"col-xs-12\">\n            <input name=\"username\" [ngClass]=\"{ 'parsley-error': f.submitted && !username.valid }\" class=\"form-control\" [(ngModel)]=\"user.username\"\n              #username=\"ngModel\" type=\"text\" required=\"\" placeholder=\"Tên đăng nhập\">\n            <ul *ngIf=\"f.submitted && !username.valid\" class=\"parsley-errors-list filled\" id=\"parsley-id-5\">\n              <li class=\"parsley-required\">Tên đăng nhập không được để trống.</li>\n            </ul>\n          </div>\n        </div>\n\n        <div class=\"form-group\">\n          <div class=\"col-xs-12\">\n            <input name=\"password\" class=\"form-control\" [ngClass]=\"{ 'parsley-error': f.submitted && !password.valid }\" [(ngModel)]=\"user.password\"\n              #password=\"ngModel\" type=\"password\" required=\"\" placeholder=\"Mật khẩu\">\n            <ul *ngIf=\"f.submitted && !password.valid\" class=\"parsley-errors-list filled\" id=\"parsley-id-5\">\n              <li class=\"parsley-required\">Mật khẩu không được để trống.</li>\n            </ul>\n          </div>\n        </div>\n\n        <div class=\"form-group \">\n          <div class=\"col-xs-12\">\n            <div class=\"checkbox checkbox-primary\">\n              <input id=\"checkbox-signup\" type=\"checkbox\">\n              <label for=\"checkbox-signup\">\n                  Nhớ tài khoản\n              </label>\n            </div>\n          </div>\n        </div>\n        <div class=\"form-group text-center m-t-40\">\n          <div class=\"col-xs-12\">\n            <button class=\"btn btn-info btn-block text-uppercase waves-effect waves-light\" style=\"background-color: #0e76bc\" type=\"submit\">Đăng nhập</button>\n          </div>\n        </div>\n      </form>\n\n    </div>\n  </div>\n\n</div>"

/***/ })

});
//# sourceMappingURL=0.chunk.js.map