"use strict";function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,e){if(!(n instanceof e))throw new TypeError("Cannot call a class as a function")}angular.module("graphTrackApp",["graphTrackApp.auth","graphTrackApp.admin","graphTrackApp.constants","ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","validation.match"]).config(["$urlRouterProvider","$locationProvider",function(n,e){n.otherwise("/"),e.html5Mode(!0)}]),angular.module("graphTrackApp.admin",["graphTrackApp.auth","ui.router"]),angular.module("graphTrackApp.auth",["graphTrackApp.constants","graphTrackApp.util","ngCookies","ui.router"]).config(["$httpProvider",function(n){n.interceptors.push("authInterceptor")}]),angular.module("graphTrackApp.util",[]),angular.module("graphTrackApp").config(["$stateProvider",function(n){n.state("login",{url:"/login",templateUrl:"app/account/login/login.html",controller:"LoginController",controllerAs:"vm"}).state("logout",{url:"/logout?referrer",referrer:"main",template:"",controller:["$state","Auth",function(n,e){var r=n.params.referrer||n.current.referrer||"main";e.logout(),n.go(r)}]}).state("signup",{url:"/signup",templateUrl:"app/account/signup/signup.html",controller:"SignupController",controllerAs:"vm"}).state("settings",{url:"/settings",templateUrl:"app/account/settings/settings.html",controller:"SettingsController",controllerAs:"vm",authenticate:!0})}]).run(["$rootScope",function(n){n.$on("$stateChangeStart",function(n,e,r,t){"logout"===e.name&&t&&t.name&&!t.authenticate&&(e.referrer=t.name)})}]);var _createClass=function(){function n(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}(),LoginController=function(){function n(e,r){_classCallCheck(this,n),this.user={},this.errors={},this.submitted=!1,this.Auth=e,this.$state=r}return n.$inject=["Auth","$state"],_createClass(n,[{key:"login",value:function(n){var e=this;this.submitted=!0,n.$valid&&this.Auth.login({email:this.user.email,password:this.user.password}).then(function(){e.$state.go("main")})["catch"](function(n){e.errors.other=n.message})}}]),n}();angular.module("graphTrackApp").controller("LoginController",LoginController);var _createClass=function(){function n(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}(),SettingsController=function(){function n(e){_classCallCheck(this,n),this.errors={},this.submitted=!1,this.Auth=e}return n.$inject=["Auth"],_createClass(n,[{key:"changePassword",value:function(n){var e=this;this.submitted=!0,n.$valid&&this.Auth.changePassword(this.user.oldPassword,this.user.newPassword).then(function(){e.message="Password successfully changed."})["catch"](function(){n.password.$setValidity("mongoose",!1),e.errors.other="Incorrect password",e.message=""})}}]),n}();angular.module("graphTrackApp").controller("SettingsController",SettingsController);var _createClass=function(){function n(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}(),SignupController=function(){function n(e,r){_classCallCheck(this,n),this.user={},this.errors={},this.submitted=!1,this.Auth=e,this.$state=r}return n.$inject=["Auth","$state"],_createClass(n,[{key:"register",value:function(n){var e=this;this.submitted=!0,n.$valid&&this.Auth.createUser({name:this.user.name,email:this.user.email,password:this.user.password}).then(function(){e.$state.go("main")})["catch"](function(r){r=r.data,e.errors={},angular.forEach(r.errors,function(r,t){n[t].$setValidity("mongoose",!1),e.errors[t]=r.message})})}}]),n}();angular.module("graphTrackApp").controller("SignupController",SignupController);var _createClass=function(){function n(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}();!function(){var n=function(){function n(e){_classCallCheck(this,n),this.users=e.query()}return n.$inject=["User"],_createClass(n,[{key:"delete",value:function(n){n.$remove(),this.users.splice(this.users.indexOf(n),1)}}]),n}();angular.module("graphTrackApp.admin").controller("AdminController",n)}(),angular.module("graphTrackApp.admin").config(["$stateProvider",function(n){n.state("admin",{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"admin",authenticate:"admin"})}]),function(n,e){n.module("graphTrackApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);var _createClass=function(){function n(n,e){for(var r=0;r<e.length;r++){var t=e[r];t.enumerable=t.enumerable||!1,t.configurable=!0,"value"in t&&(t.writable=!0),Object.defineProperty(n,t.key,t)}}return function(e,r,t){return r&&n(e.prototype,r),t&&n(e,t),e}}();!function(){var n=function(){function n(e){_classCallCheck(this,n),this.$http=e,this.awesomeThings=[]}return n.$inject=["$http"],_createClass(n,[{key:"$onInit",value:function(){var n=this;this.$http.get("/api/things").then(function(e){n.awesomeThings=e.data})}},{key:"addThing",value:function(){this.newThing&&(this.$http.post("/api/things",{name:this.newThing}),this.newThing="")}},{key:"deleteThing",value:function(n){this.$http["delete"]("/api/things/"+n._id)}}]),n}();angular.module("graphTrackApp").component("main",{templateUrl:"app/main/main.html",controller:n})}(),angular.module("graphTrackApp").config(["$stateProvider",function(n){n.state("main",{url:"/",template:"<main></main>"})}]),function(){function n(n,e,r,t,a,o,s){var i=o.safeCb,l={},c=a.userRoles||[];r.get("token")&&"/logout"!==n.path()&&(l=s.get());var u={login:function(n,a){var o=n.email,c=n.password;return e.post("/auth/local",{email:o,password:c}).then(function(n){return r.put("token",n.data.token),l=s.get(),l.$promise}).then(function(n){return i(a)(null,n),n})["catch"](function(n){return u.logout(),i(a)(n.data),t.reject(n.data)})},logout:function(){r.remove("token"),l={}},createUser:function(n,e){return s.save(n,function(t){return r.put("token",t.token),l=s.get(),i(e)(null,n)},function(n){return u.logout(),i(e)(n)}).$promise},changePassword:function(n,e,r){return s.changePassword({id:l._id},{oldPassword:n,newPassword:e},function(){return i(r)(null)},function(n){return i(r)(n)}).$promise},getCurrentUser:function(n){if(0===arguments.length)return l;var e=l.hasOwnProperty("$promise")?l.$promise:l;return t.when(e).then(function(e){return i(n)(e),e},function(){return i(n)({}),{}})},isLoggedIn:function(n){return 0===arguments.length?l.hasOwnProperty("role"):u.getCurrentUser(null).then(function(e){var r=e.hasOwnProperty("role");return i(n)(r),r})},hasRole:function m(n,e){var m=function(n,e){return c.indexOf(n)>=c.indexOf(e)};return arguments.length<2?m(l.role,n):u.getCurrentUser(null).then(function(r){var t=r.hasOwnProperty("role")?m(r.role,n):!1;return i(e)(t),t})},isAdmin:function(){return u.hasRole.apply(u,[].concat.apply(["admin"],arguments))},getToken:function(){return r.get("token")}};return u}n.$inject=["$location","$http","$cookies","$q","appConfig","Util","User"],angular.module("graphTrackApp.auth").factory("Auth",n)}(),function(){function n(n,e,r,t,a){var o;return{request:function(n){return n.headers=n.headers||{},r.get("token")&&a.isSameOrigin(n.url)&&(n.headers.Authorization="Bearer "+r.get("token")),n},responseError:function(n){return 401===n.status&&((o||(o=t.get("$state"))).go("login"),r.remove("token")),e.reject(n)}}}n.$inject=["$rootScope","$q","$cookies","$injector","Util"],angular.module("graphTrackApp.auth").factory("authInterceptor",n)}(),function(){angular.module("graphTrackApp.auth").run(["$rootScope","$state","Auth",function(n,e,r){n.$on("$stateChangeStart",function(n,t){t.authenticate&&("string"==typeof t.authenticate?r.hasRole(t.authenticate,_.noop).then(function(t){return t?void 0:(n.preventDefault(),r.isLoggedIn(_.noop).then(function(n){e.go(n?"main":"login")}))}):r.isLoggedIn(_.noop).then(function(r){r||(n.preventDefault(),e.go("main"))}))})}])}(),function(){function n(n){return n("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}n.$inject=["$resource"],angular.module("graphTrackApp.auth").factory("User",n)}(),angular.module("graphTrackApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(n,e){e.addClass("footer")}}}),angular.module("graphTrackApp").factory("Modal",["$rootScope","$uibModal",function(n,e){function r(){var r=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=arguments.length<=1||void 0===arguments[1]?"modal-default":arguments[1],a=n.$new();return angular.extend(a,r),e.open({templateUrl:"components/modal/modal.html",windowClass:t,scope:a})}return{confirm:{"delete":function(){var n=arguments.length<=0||void 0===arguments[0]?angular.noop:arguments[0];return function(){var e,t=Array.prototype.slice.call(arguments),a=t.shift();e=r({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+a+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(n){e.close(n)}},{classes:"btn-default",text:"Cancel",click:function(n){e.dismiss(n)}}]}},"modal-danger"),e.result.then(function(e){n.apply(e,t)})}}}}}]),angular.module("graphTrackApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(n,e,r,t){e.on("keydown",function(){return t.$setValidity("mongoose",!0)})}}});var NavbarController=function n(e){_classCallCheck(this,n),this.menu=[{title:"Home",state:"main"}],this.isCollapsed=!0,this.isLoggedIn=e.isLoggedIn,this.isAdmin=e.isAdmin,this.getCurrentUser=e.getCurrentUser};NavbarController.$inject=["Auth"],angular.module("graphTrackApp").controller("NavbarController",NavbarController),angular.module("graphTrackApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),function(){function n(n){var e={safeCb:function(n){return angular.isFunction(n)?n:angular.noop},urlParse:function(n){var e=document.createElement("a");return e.href=n,""===e.host&&(e.href=e.href),e},isSameOrigin:function(r,t){return r=e.urlParse(r),t=t&&[].concat(t)||[],t=t.map(e.urlParse),t.push(n.location),t=t.filter(function(n){return r.hostname===n.hostname&&r.port===n.port&&r.protocol===n.protocol}),t.length>=1}};return e}n.$inject=["$window"],angular.module("graphTrackApp.util").factory("Util",n)}(),angular.module("graphTrackApp").run(["$templateCache",function(n){n.put("app/admin/admin.html",'<div class="container">\n  <p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p>\n  <ul class="list-group user-list">\n    <li class="list-group-item" ng-repeat="user in admin.users">\n	    <div class="user-info">\n	        <strong>{{user.name}}</strong><br>\n	        <span class="text-muted">{{user.email}}</span>\n	    </div>\n        <a ng-click="admin.delete(user)" class="trash"><span class="fa fa-trash fa-2x"></span></a>\n    </li>\n  </ul>\n</div>\n'),n.put("app/main/main.html",'<header class="hero-unit" id="banner">\n  <div class="container">\n    <h1>\'Allo, \'Allo!</h1>\n    <p class="lead">Kick-start your next web app with Angular Fullstack</p>\n    <img src="assets/images/yeoman-462ccecbb1.png" alt="I\'m Yeoman">\n  </div>\n</header>\n\n<div class="container">\n  <div class="row">\n    <div class="col-lg-12">\n      <h1 class="page-header">Features:</h1>\n      <ul class="nav nav-tabs nav-stacked col-md-4 col-lg-4 col-sm-6" ng-repeat="thing in $ctrl.awesomeThings">\n        <li><a href="#" uib-tooltip="{{thing.info}}">{{thing.name}}</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n'),n.put("components/footer/footer.html",'<div class="container">\n  <p>Angular Fullstack v3.4.1 |\n    <a href="https://twitter.com/tyhenkel">@tyhenkel</a> |\n    <a href="https://github.com/DaftMonk/generator-angular-fullstack/issues?state=open">Issues</a>\n  </p>\n</div>\n'),n.put("components/modal/modal.html",'<div class="modal-header">\n  <button ng-if="modal.dismissable" type="button" ng-click="$dismiss()" class="close">&times;</button>\n  <h4 ng-if="modal.title" ng-bind="modal.title" class="modal-title"></h4>\n</div>\n<div class="modal-body">\n  <p ng-if="modal.text" ng-bind="modal.text"></p>\n  <div ng-if="modal.html" ng-bind-html="modal.html"></div>\n</div>\n<div class="modal-footer">\n  <button ng-repeat="button in modal.buttons" ng-class="button.classes" ng-click="button.click($event)" ng-bind="button.text" class="btn"></button>\n</div>\n'),n.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller="NavbarController">\n  <div class="container">\n    <div class="navbar-header">\n      <button class="navbar-toggle" type="button" ng-click="nav.isCollapsed = !nav.isCollapsed">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a href="/" class="navbar-brand">graph-track</a>\n    </div>\n    <div uib-collapse="nav.isCollapsed" class="navbar-collapse collapse" id="navbar-main">\n      <ul class="nav navbar-nav">\n        <li ng-repeat="item in nav.menu" ui-sref-active="active">\n            <a ui-sref="{{item.state}}">{{item.title}}</a>\n        </li>\n        <li ng-show="nav.isAdmin()" ui-sref-active="active"><a ui-sref="admin">Admin</a></li>\n      </ul>\n\n      <ul class="nav navbar-nav navbar-right">\n        <li ng-hide="nav.isLoggedIn()" ui-sref-active="active"><a ui-sref="signup">Sign up</a></li>\n        <li ng-hide="nav.isLoggedIn()" ui-sref-active="active"><a ui-sref="login">Login</a></li>\n        <li ng-show="nav.isLoggedIn()"><p class="navbar-text">Hello {{ nav.getCurrentUser().name }}</p> </li>\n        <li ng-show="nav.isLoggedIn()" ui-sref-active="active"><a ui-sref="settings"><span class="glyphicon glyphicon-cog"></span></a></li>\n        <li ng-show="nav.isLoggedIn()"><a ui-sref="logout">Logout</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n'),n.put("app/account/login/login.html",'<div class="container">\n  <div class="row">\n    <div class="col-sm-12">\n      <h1>Login</h1>\n      <p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@example.com</code> / <code>test</code></p>\n      <p>Admin account is <code>admin@example.com</code> / <code>admin</code></p>\n    </div>\n    <div class="col-sm-12">\n      <form class="form" name="form" ng-submit="vm.login(form)" novalidate>\n\n        <div class="form-group">\n          <label>Email</label>\n\n          <input type="email" name="email" class="form-control" ng-model="vm.user.email" required>\n        </div>\n\n        <div class="form-group">\n          <label>Password</label>\n\n          <input type="password" name="password" class="form-control" ng-model="vm.user.password" required>\n        </div>\n\n        <div class="form-group has-error">\n          <p class="help-block" ng-show="form.email.$error.required && form.password.$error.required && vm.submitted">\n             Please enter your email and password.\n          </p>\n          <p class="help-block" ng-show="form.email.$error.email && vm.submitted">\n             Please enter a valid email.\n          </p>\n\n          <p class="help-block">{{ vm.errors.other }}</p>\n        </div>\n\n        <div>\n          <button class="btn btn-inverse btn-lg btn-login" type="submit">\n            Login\n          </button>\n          <a class="btn btn-default btn-lg btn-register" ui-sref="signup">\n            Register\n          </a>\n        </div>\n\n      </form>\n    </div>\n  </div>\n  <hr>\n</div>\n'),n.put("app/account/settings/settings.html",'<div class="container">\n  <div class="row">\n    <div class="col-sm-12">\n      <h1>Change Password</h1>\n    </div>\n    <div class="col-sm-12">\n      <form class="form" name="form" ng-submit="vm.changePassword(form)" novalidate>\n\n        <div class="form-group">\n          <label>Current Password</label>\n\n          <input type="password" name="password" class="form-control" ng-model="vm.user.oldPassword"\n                 mongoose-error/>\n          <p class="help-block" ng-show="form.password.$error.mongoose">\n              {{ vm.errors.other }}\n          </p>\n        </div>\n\n        <div class="form-group">\n          <label>New Password</label>\n\n          <input type="password" name="newPassword" class="form-control" ng-model="vm.user.newPassword"\n                 ng-minlength="3"\n                 required/>\n          <p class="help-block"\n             ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || vm.submitted)">\n            Password must be at least 3 characters.\n          </p>\n        </div>\n\n        <div class="form-group">\n          <label>Confirm New Password</label>\n\n          <input type="password" name="confirmPassword" class="form-control" ng-model="vm.user.confirmPassword"\n                 match="vm.user.newPassword"\n                 ng-minlength="3"\n                 required=""/>\n          <p class="help-block"\n             ng-show="form.confirmPassword.$error.match && vm.submitted">\n            Passwords must match.\n          </p>\n\n        </div>\n\n        <p class="help-block"> {{ vm.message }} </p>\n\n        <button class="btn btn-lg btn-primary" type="submit">Save changes</button>\n      </form>\n    </div>\n  </div>\n</div>\n'),n.put("app/account/signup/signup.html",'<div class="container">\n  <div class="row">\n    <div class="col-sm-12">\n      <h1>Sign up</h1>\n    </div>\n    <div class="col-sm-12">\n      <form class="form" name="form" ng-submit="vm.register(form)" novalidate>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.name.$valid && vm.submitted,\n                                            \'has-error\': form.name.$invalid && vm.submitted }">\n          <label>Name</label>\n\n          <input type="text" name="name" class="form-control" ng-model="vm.user.name"\n                 required/>\n          <p class="help-block" ng-show="form.name.$error.required && vm.submitted">\n            A name is required\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.email.$valid && vm.submitted,\n                                            \'has-error\': form.email.$invalid && vm.submitted }">\n          <label>Email</label>\n\n          <input type="email" name="email" class="form-control" ng-model="vm.user.email"\n                 required\n                 mongoose-error/>\n          <p class="help-block" ng-show="form.email.$error.email && vm.submitted">\n            Doesn\'t look like a valid email.\n          </p>\n          <p class="help-block" ng-show="form.email.$error.required && vm.submitted">\n            What\'s your email address?\n          </p>\n          <p class="help-block" ng-show="form.email.$error.mongoose">\n            {{ vm.errors.email }}\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.password.$valid && vm.submitted,\n                                            \'has-error\': form.password.$invalid && vm.submitted }">\n          <label>Password</label>\n\n          <input type="password" name="password" class="form-control" ng-model="vm.user.password"\n                 ng-minlength="3"\n                 required\n                 mongoose-error/>\n          <p class="help-block"\n             ng-show="(form.password.$error.minlength || form.password.$error.required) && vm.submitted">\n            Password must be at least 3 characters.\n          </p>\n          <p class="help-block" ng-show="form.password.$error.mongoose">\n            {{ vm.errors.password }}\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.confirmPassword.$valid && vm.submitted,\n                                            \'has-error\': form.confirmPassword.$invalid && vm.submitted }">\n          <label>Confirm Password</label>\n          <input type="password" name="confirmPassword" class="form-control" ng-model="vm.user.confirmPassword"\n                 match="vm.user.password"\n                 ng-minlength="3" required/>\n          <p class="help-block"\n             ng-show="form.confirmPassword.$error.match && vm.submitted">\n            Passwords must match.\n          </p>\n        </div>\n\n        <div>\n          <button class="btn btn-inverse btn-lg btn-register" type="submit">\n            Sign up\n          </button>\n          <a class="btn btn-default btn-lg btn-login" ui-sref="login">\n            Login\n          </a>\n        </div>\n\n      </form>\n    </div>\n  </div>\n  <hr>\n</div>\n')}]);