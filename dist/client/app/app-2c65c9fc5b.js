"use strict";function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function GraphTrackForceLayout(n,t,e){function r(n){var t=[];return n.forEach(function(n){"launch"!==n.state&&(w[n.state]=t.length,k[n.state]=n.launch,y[n.state]={ins:[],outs:[]},t.push({state:n.state,count:n.count,launch:n.launch,exit:n.exit,group:1}))}),t}function a(n){return n.map(function(n){return k[n.state_from]-=n.count,k[n.state_to]+=n.count,y[n.state_to].ins.push(n),y[n.state_from].outs.push(n),C[n.state_to+":"+n.state_from]=n,{source:w[n.state_from],target:w[n.state_to],count:n.count}})}function o(n){return 1.5*Math.sqrt(n)}function s(n){var t=v.selectAll(".gt-force-external").data(n).enter().append("g").attr("class","gt-force-external").call(f.drag);return t.append("line").attr("class","gt-force-external-launch").style("stroke-width",function(n){return o(n.launch)}).attr("x1",0).attr("y1",-e).attr("x2",0).attr("y2",0),t.append("line").attr("class","gt-force-external-exit").style("stroke-width",function(n){return o(k[n.state])}).attr("x1",0).attr("y1",0).attr("x2",0).attr("y2",e),t}function i(n){return v.selectAll(".gt-force-link").data(n).enter().append("line").attr("class","gt-force-link").style("stroke-width",function(n){return o(n.count)}).on("mouseover",d).on("mouseout",m)}function l(n){var t=v.selectAll(".gt-force-node").data(n).enter().append("g").attr("class","gt-force-node").call(f.drag);return t.append("circle").attr("r",function(n){return Math.sqrt(n.count)}).style("fill",function(n){return g(n.group)}).on("mouseover",u).on("mouseout",m),t.append("text").attr("dy",".3em").text(function(n){return n.state}).on("mouseover",u).on("mouseout",m),t}function c(n){var t='<pre class="gt-force-tooltip-box"><kbd style="background:cornflowerblue;color:white;"><b>'+n.state+'</b></kbd> <span class="text-muted">x</span> '+n.count+"</pre>";return t+='<pre class="gt-force-tooltip-box gt-force-tooltip-box-in success">',t+="<p>流入</p>",n.launch&&(t+='<p><kbd style="background:green;color:white;">启动</kbd> <span class="text-muted">x</span> '+n.launch+"</p>"),t+="<p>"+_.sortBy(y[n.state].ins,"count").reverse().map(function(n){return"<kbd>"+n.state_from+'</kbd> <span class="text-muted">x</span> '+n.count+"</p>"}).join(""),t+="</p></pre>",t+='<pre class="gt-force-tooltip-box gt-force-tooltip-box-out">',t+="<p>流出</p>",k[n.state]&&(t+='<p><kbd style="background:coral;color:white;">退出</kbd> <span class="text-muted">x</span> '+k[n.state]+"</p>"),t+="<p>"+_.sortBy(y[n.state].outs,"count").reverse().map(function(n){return"<kbd>"+n.state_to+'</kbd> <span class="text-muted">x</span> '+n.count+"</p>"}).join(""),t+="</p></pre>"}function u(n){b.transition().style("display","block").duration(200).style("opacity",.9),b.html(c(n)).style("left",d3.event.pageX+"px").style("top",d3.event.pageY+20+"px")}function p(n){var t="<p><kbd>"+n.source.state+" -> "+n.target.state+'</kbd> <span class="text-muted">x</span> '+n.count+"</p>",e=C[n.source.state+":"+n.target.state];if(e){var r="<p><kbd>"+e.state_from+" -> "+e.state_to+'</kbd> <span class="text-muted">x</span> '+e.count+"</p>";e.count<n.count?t+=r:t=r+t}return'<pre class="gt-force-tooltip-box">'+t+"</pre>"}function d(n){b.transition().style("display","block").duration(200).style("opacity",.9),b.html(p(n)).style("left",d3.event.pageX+"px").style("top",d3.event.pageY+20+"px")}function m(n){b.transition().duration(200).style("opacity",0).transition().style("display","none")}function h(n){d3.json(n,function(n,t){if(n)throw n;var e=r(t[0]),o=a(t[1]);f.nodes(e).links(o).start();var c=s(e),u=i(o),p=l(e);f.on("tick",function(){u.attr("x1",function(n){return n.source.x}).attr("y1",function(n){return n.source.y}).attr("x2",function(n){return n.target.x}).attr("y2",function(n){return n.target.y}),p.attr("transform",function(n){return"translate("+n.x+","+n.y+")"}),c.attr("transform",function(n){return"translate("+n.x+","+n.y+")"})})})}var g=d3.scale.category20(),f=d3.layout.force().charge(-1e3).linkDistance(100).size([t,e]),v=d3.select(n).append("svg").attr("width",t).attr("height",e),b=d3.select(n).append("div").attr("class","gt-force-tooltip").style("opacity",0),w={},k={},y={},C={};return{render:h}}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}function _classCallCheck(n,t){if(!(n instanceof t))throw new TypeError("Cannot call a class as a function")}angular.module("graphTrackApp",["graphTrackApp.auth","graphTrackApp.admin","graphTrackApp.constants","ngCookies","ngResource","ngSanitize","ui.router","ui.bootstrap","validation.match"]).config(["$urlRouterProvider","$locationProvider",function(n,t){n.otherwise("/"),t.html5Mode(!0)}]),angular.module("graphTrackApp.admin",["graphTrackApp.auth","ui.router"]),angular.module("graphTrackApp.auth",["graphTrackApp.constants","graphTrackApp.util","ngCookies","ui.router"]).config(["$httpProvider",function(n){n.interceptors.push("authInterceptor")}]),angular.module("graphTrackApp.util",[]),angular.module("graphTrackApp").config(["$stateProvider",function(n){n.state("login",{url:"/login",templateUrl:"app/account/login/login.html",controller:"LoginController",controllerAs:"vm"}).state("logout",{url:"/logout?referrer",referrer:"main",template:"",controller:["$state","Auth",function(n,t){var e=n.params.referrer||n.current.referrer||"main";t.logout(),n.go(e)}]}).state("signup",{url:"/signup",templateUrl:"app/account/signup/signup.html",controller:"SignupController",controllerAs:"vm"}).state("settings",{url:"/settings",templateUrl:"app/account/settings/settings.html",controller:"SettingsController",controllerAs:"vm",authenticate:!0}).state("home",{url:"/home",template:"<main2></main2>"}).state("graph",{url:"/graph/:id",templateUrl:"app/account/graph/graph.html",controller:"GraphController"})}]).run(["$rootScope",function(n){n.$on("$stateChangeStart",function(n,t,e,r){"logout"===t.name&&r&&r.name&&!r.authenticate&&(t.referrer=r.name)})}]);var GraphController=function n(t){_classCallCheck(this,n),this.GraphTrackForceLayout=GraphTrackForceLayout;var e=$(".gt-d3-target").width(),r=GraphTrackForceLayout(".gt-d3-target",e,640);r.render("/api/track/graph?appVersion=0.1&appId="+t.params.id)};GraphController.$inject=["$state"],angular.module("graphTrackApp").controller("GraphController",GraphController);var _createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),HomeController=function(){function n(t){_classCallCheck(this,n),this.$http=t,this.awesomeThings=[]}return n.$inject=["$http"],_createClass(n,[{key:"$onInit",value:function(){var n=this;this.$http.get("/api/track").then(function(t){n.appList=t.data})}},{key:"addApp",value:function(){this.newThing&&(this.$http.post("/api/track",{name:this.newThing}),this.newThing="")}},{key:"deleteApp",value:function(n){this.$http["delete"]("/api/track/"+n._id)}}]),n}();angular.module("graphTrackApp").component("main2",{templateUrl:"app/account/home/home.html",controller:HomeController});var _createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),SettingsController=function(){function n(t){_classCallCheck(this,n),this.errors={},this.submitted=!1,this.Auth=t}return n.$inject=["Auth"],_createClass(n,[{key:"changePassword",value:function(n){var t=this;this.submitted=!0,n.$valid&&this.Auth.changePassword(this.user.oldPassword,this.user.newPassword).then(function(){t.message="Password successfully changed."})["catch"](function(){n.password.$setValidity("mongoose",!1),t.errors.other="Incorrect password",t.message=""})}}]),n}();angular.module("graphTrackApp").controller("SettingsController",SettingsController);var _createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),SignupController=function(){function n(t,e){_classCallCheck(this,n),this.user={},this.errors={},this.submitted=!1,this.Auth=t,this.$state=e}return n.$inject=["Auth","$state"],_createClass(n,[{key:"register",value:function(n){var t=this;this.submitted=!0,n.$valid&&this.Auth.createUser({name:this.user.name,email:this.user.email,password:this.user.password}).then(function(){t.$state.go("main")})["catch"](function(e){e=e.data,t.errors={},angular.forEach(e.errors,function(e,r){n[r].$setValidity("mongoose",!1),t.errors[r]=e.message})})}}]),n}();angular.module("graphTrackApp").controller("SignupController",SignupController);var _createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}();!function(){var n=function(){function n(t){_classCallCheck(this,n),this.users=t.query()}return n.$inject=["User"],_createClass(n,[{key:"delete",value:function(n){n.$remove(),this.users.splice(this.users.indexOf(n),1)}}]),n}();angular.module("graphTrackApp.admin").controller("AdminController",n)}(),angular.module("graphTrackApp.admin").config(["$stateProvider",function(n){n.state("admin",{url:"/admin",templateUrl:"app/admin/admin.html",controller:"AdminController",controllerAs:"admin",authenticate:"admin"})}]),function(n,t){n.module("graphTrackApp.constants",[]).constant("appConfig",{userRoles:["guest","user","admin"]})}(angular);var _createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}(),MainController=function(){function n(t,e){_classCallCheck(this,n),this.user={},this.errors={},this.submitted=!1,this.Auth=t,this.$state=e}return n.$inject=["Auth","$state"],_createClass(n,[{key:"login",value:function(n){var t=this;this.submitted=!0,n.$valid&&this.Auth.login({email:this.user.email,password:this.user.password}).then(function(){t.$state.go("home")})["catch"](function(n){t.errors.other=n.message})}}]),n}();angular.module("graphTrackApp").component("main",{templateUrl:"app/main/main.html",controller:MainController,controllerAs:"vm"});var _createClass=function(){function n(n,t){for(var e=0;e<t.length;e++){var r=t[e];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(n,r.key,r)}}return function(t,e,r){return e&&n(t.prototype,e),r&&n(t,r),t}}();!function(){(function(){function n(t){_classCallCheck(this,n),this.$http=t,this.awesomeThings=[]}return _createClass(n,[{key:"$onInit",value:function(){var n=this;this.$http.get("/api/things").then(function(t){n.awesomeThings=t.data})}},{key:"addThing",value:function(){this.newThing&&(this.$http.post("/api/things",{name:this.newThing}),this.newThing="")}},{key:"deleteThing",value:function(n){this.$http["delete"]("/api/things/"+n._id)}}]),n})()}(),angular.module("graphTrackApp").config(["$stateProvider",function(n){n.state("main",{url:"/",template:"<main></main>"})}]),function(){function n(n,t,e,r,a,o,s){var i=o.safeCb,l={},c=a.userRoles||[];e.get("token")&&"/logout"!==n.path()&&(l=s.get());var u={login:function(n,a){var o=n.email,c=n.password;return t.post("/auth/local",{email:o,password:c}).then(function(n){return e.put("token",n.data.token),l=s.get(),l.$promise}).then(function(n){return i(a)(null,n),n})["catch"](function(n){return u.logout(),i(a)(n.data),r.reject(n.data)})},logout:function(){e.remove("token"),l={}},createUser:function(n,t){return s.save(n,function(r){return e.put("token",r.token),l=s.get(),i(t)(null,n)},function(n){return u.logout(),i(t)(n)}).$promise},changePassword:function(n,t,e){return s.changePassword({id:l._id},{oldPassword:n,newPassword:t},function(){return i(e)(null)},function(n){return i(e)(n)}).$promise},getCurrentUser:function(n){if(0===arguments.length)return l;var t=l.hasOwnProperty("$promise")?l.$promise:l;return r.when(t).then(function(t){return i(n)(t),t},function(){return i(n)({}),{}})},isLoggedIn:function(n){return 0===arguments.length?l.hasOwnProperty("role"):u.getCurrentUser(null).then(function(t){var e=t.hasOwnProperty("role");return i(n)(e),e})},hasRole:function p(n,t){var p=function(n,t){return c.indexOf(n)>=c.indexOf(t)};return arguments.length<2?p(l.role,n):u.getCurrentUser(null).then(function(e){var r=e.hasOwnProperty("role")?p(e.role,n):!1;return i(t)(r),r})},isAdmin:function(){return u.hasRole.apply(u,[].concat.apply(["admin"],arguments))},getToken:function(){return e.get("token")}};return u}n.$inject=["$location","$http","$cookies","$q","appConfig","Util","User"],angular.module("graphTrackApp.auth").factory("Auth",n)}(),function(){function n(n,t,e,r,a){var o;return{request:function(n){return n.headers=n.headers||{},e.get("token")&&a.isSameOrigin(n.url)&&(n.headers.Authorization="Bearer "+e.get("token")),n},responseError:function(n){return 401===n.status&&((o||(o=r.get("$state"))).go("main"),e.remove("token")),t.reject(n)}}}n.$inject=["$rootScope","$q","$cookies","$injector","Util"],angular.module("graphTrackApp.auth").factory("authInterceptor",n)}(),function(){angular.module("graphTrackApp.auth").run(["$rootScope","$state","Auth",function(n,t,e){n.$on("$stateChangeStart",function(n,r){r.authenticate&&("string"==typeof r.authenticate?e.hasRole(r.authenticate,_.noop).then(function(r){return r?void 0:(n.preventDefault(),e.isLoggedIn(_.noop).then(function(n){t.go(n?"main":"login")}))}):e.isLoggedIn(_.noop).then(function(e){e||(n.preventDefault(),t.go("main"))}))})}])}(),function(){function n(n){return n("/api/users/:id/:controller",{id:"@_id"},{changePassword:{method:"PUT",params:{controller:"password"}},get:{method:"GET",params:{id:"me"}}})}n.$inject=["$resource"],angular.module("graphTrackApp.auth").factory("User",n)}(),angular.module("graphTrackApp").directive("footer",function(){return{templateUrl:"components/footer/footer.html",restrict:"E",link:function(n,t){t.addClass("footer")}}}),angular.module("graphTrackApp").factory("Modal",["$rootScope","$uibModal",function(n,t){function e(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],r=arguments.length<=1||void 0===arguments[1]?"modal-default":arguments[1],a=n.$new();return angular.extend(a,e),t.open({templateUrl:"components/modal/modal.html",windowClass:r,scope:a})}return{confirm:{"delete":function(){var n=arguments.length<=0||void 0===arguments[0]?angular.noop:arguments[0];return function(){var t,r=Array.prototype.slice.call(arguments),a=r.shift();t=e({modal:{dismissable:!0,title:"Confirm Delete",html:"<p>Are you sure you want to delete <strong>"+a+"</strong> ?</p>",buttons:[{classes:"btn-danger",text:"Delete",click:function(n){t.close(n)}},{classes:"btn-default",text:"Cancel",click:function(n){t.dismiss(n)}}]}},"modal-danger"),t.result.then(function(t){n.apply(t,r)})}}}}}]),angular.module("graphTrackApp").directive("mongooseError",function(){return{restrict:"A",require:"ngModel",link:function(n,t,e,r){t.on("keydown",function(){return r.$setValidity("mongoose",!0)})}}});var NavbarController=function t(n){_classCallCheck(this,t),this.menu=[{title:"Home",state:"main"}],this.isCollapsed=!0,this.isLoggedIn=n.isLoggedIn,this.isAdmin=n.isAdmin,this.getCurrentUser=n.getCurrentUser};NavbarController.$inject=["Auth"],angular.module("graphTrackApp").controller("NavbarController",NavbarController),angular.module("graphTrackApp").directive("navbar",function(){return{templateUrl:"components/navbar/navbar.html",restrict:"E",controller:"NavbarController",controllerAs:"nav"}}),function(){function n(n){var t={safeCb:function(n){return angular.isFunction(n)?n:angular.noop},urlParse:function(n){var t=document.createElement("a");return t.href=n,""===t.host&&(t.href=t.href),t},isSameOrigin:function(e,r){return e=t.urlParse(e),r=r&&[].concat(r)||[],r=r.map(t.urlParse),r.push(n.location),r=r.filter(function(n){return e.hostname===n.hostname&&e.port===n.port&&e.protocol===n.protocol}),r.length>=1}};return t}n.$inject=["$window"],angular.module("graphTrackApp.util").factory("Util",n)}(),angular.module("graphTrackApp").run(["$templateCache",function(n){n.put("app/admin/admin.html",'<div class="container">\n  <p>The delete user and user index api routes are restricted to users with the \'admin\' role.</p>\n  <ul class="list-group user-list">\n    <li class="list-group-item" ng-repeat="user in admin.users">\n	    <div class="user-info">\n	        <strong>{{user.name}}</strong><br>\n	        <span class="text-muted">{{user.email}}</span>\n	    </div>\n        <a ng-click="admin.delete(user)" class="trash"><span class="fa fa-trash fa-2x"></span></a>\n    </li>\n  </ul>\n</div>\n'),n.put("app/main/main.html",'<header class="hero-unit" id="banner">\n  <div class="container">\n    <h1>Graph Track</h1>\n    <p class="lead">Kick-start your next web app with Graph Track</p>\n    <img src="assets/images/yeoman-462ccecbb1.png" alt="I\'m Yeoman">\n  </div>\n</header>\n\n<div class="container">\n  <div class="row">\n    <div class="col-lg-12">\n      <div class="panel panel-info" style="width: 320px; margin: 10px auto;">\n        <div class="panel-body">\n          <form class="form" name="form" ng-submit="vm.login(form)" novalidate>\n            <div class="form-group">\n              <label>Email</label>\n              <input type="email" name="email" class="form-control" ng-model="vm.user.email" required>\n            </div>\n            \n            <div class="form-group">\n              <label>Password</label>\n              <input type="password" name="password" class="form-control" ng-model="vm.user.password" required>\n            </div>\n            \n            <div class="form-group has-error">\n              <p class="help-block" ng-show="form.email.$error.required && form.password.$error.required && vm.submitted">\n                 Please enter your email and password.\n              </p>\n              <p class="help-block" ng-show="form.email.$error.email && vm.submitted">\n                 Please enter a valid email.\n              </p>\n              <p class="help-block">{{ vm.errors.other }}</p>\n            </div>\n            \n            <div>\n              <button class="btn btn-block btn-primary btn-login" type="submit">\n                Login\n              </button>\n              <a class="btn btn-block btn-default btn-register" ui-sref="signup">\n                Register\n              </a>\n            </div>\n          </form>\n        </div>\n      </div>\n    </div>\n  </div>\n</div>'),n.put("components/footer/footer.html",'<div class="container">\n  <p>Graph Track v0.1.0</p>\n</div>\n'),n.put("components/modal/modal.html",'<div class="modal-header">\n  <button ng-if="modal.dismissable" type="button" ng-click="$dismiss()" class="close">&times;</button>\n  <h4 ng-if="modal.title" ng-bind="modal.title" class="modal-title"></h4>\n</div>\n<div class="modal-body">\n  <p ng-if="modal.text" ng-bind="modal.text"></p>\n  <div ng-if="modal.html" ng-bind-html="modal.html"></div>\n</div>\n<div class="modal-footer">\n  <button ng-repeat="button in modal.buttons" ng-class="button.classes" ng-click="button.click($event)" ng-bind="button.text" class="btn"></button>\n</div>\n'),n.put("components/navbar/navbar.html",'<div class="navbar navbar-default navbar-static-top" ng-controller="NavbarController">\n  <div class="container">\n    <div class="navbar-header">\n      <button class="navbar-toggle" type="button" ng-click="nav.isCollapsed = !nav.isCollapsed">\n        <span class="sr-only">Toggle navigation</span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n        <span class="icon-bar"></span>\n      </button>\n      <a href="/" class="navbar-brand">Graph Track</a>\n    </div>\n    <div uib-collapse="nav.isCollapsed" class="navbar-collapse collapse" id="navbar-main">\n      <ul class="nav navbar-nav">\n        <li ng-repeat="item in nav.menu" ui-sref-active="active">\n            <a ui-sref="home">{{item.title}}</a>\n        </li>\n        <li ng-show="nav.isAdmin()" ui-sref-active="active"><a ui-sref="admin">Admin</a></li>\n      </ul>\n\n      <ul class="nav navbar-nav navbar-right">\n<!--\n        <li ng-hide="nav.isLoggedIn()" ui-sref-active="active"><a ui-sref="signup">Sign up</a></li>\n        <li ng-hide="nav.isLoggedIn()" ui-sref-active="active"><a ui-sref="login">Login</a></li>\n        <li ng-show="nav.isLoggedIn()"><p class="navbar-text">Hello {{ nav.getCurrentUser().name }}</p> </li>\n        <li ng-show="nav.isLoggedIn()" ui-sref-active="active"><a ui-sref="settings"><span class="glyphicon glyphicon-cog"></span></a></li>\n        <li ng-show="nav.isLoggedIn()"><a ui-sref="logout">Logout</a></li>\n-->\n        <li><a ui-sref="logout">Logout</a></li>\n      </ul>\n    </div>\n  </div>\n</div>\n'),n.put("app/account/graph/graph.html",'<div class="gt-d3-target"></div>'),n.put("app/account/home/home.html",'<div class="container">  \n  <div class="row">\n    <div class="col-lg-6">\n      <div class="input-group">\n        <input type="text" class="form-control" ng-model=\'$ctrl.newThing\' placeholder="Name of the new App">\n        <span class="input-group-btn">\n          <button class="btn btn-primary" type="button" ng-click="$ctrl.addApp()">New App</button>\n        </span>\n      </div>\n    </div>\n  </div>\n  \n  <div class="row">\n    <ul class="list-group user-list">\n      <li class="list-group-item" ng-repeat="app in $ctrl.appList">\n          <div class="user-info">\n              <strong><a ui-sref="graph({id:\'{{app._id}}\'})">{{app.name}}</a></strong><br>\n              appId: <span class="text-muted">{{app._id}}</span>\n          </div>\n          <a ng-click="$ctrl.deleteApp(app)" class="trash"><span class="fa fa-trash fa-2x"></span></a>\n      </li>\n    </ul>\n  </div>\n</div>\n'),n.put("app/account/login/login.html",'<div class="container">\n  <div class="row">\n    <div class="col-sm-12">\n      <h1>Login</h1>\n      <p>Accounts are reset on server restart from <code>server/config/seed.js</code>. Default account is <code>test@example.com</code> / <code>test</code></p>\n      <p>Admin account is <code>admin@example.com</code> / <code>admin</code></p>\n    </div>\n    <div class="col-sm-12">\n      <form class="form" name="form" ng-submit="vm.login(form)" novalidate>\n\n        <div class="form-group">\n          <label>Email</label>\n\n          <input type="email" name="email" class="form-control" ng-model="vm.user.email" required>\n        </div>\n\n        <div class="form-group">\n          <label>Password</label>\n\n          <input type="password" name="password" class="form-control" ng-model="vm.user.password" required>\n        </div>\n\n        <div class="form-group has-error">\n          <p class="help-block" ng-show="form.email.$error.required && form.password.$error.required && vm.submitted">\n             Please enter your email and password.\n          </p>\n          <p class="help-block" ng-show="form.email.$error.email && vm.submitted">\n             Please enter a valid email.\n          </p>\n\n          <p class="help-block">{{ vm.errors.other }}</p>\n        </div>\n\n        <div>\n          <button class="btn btn-inverse btn-lg btn-login" type="submit">\n            Login\n          </button>\n          <a class="btn btn-default btn-lg btn-register" ui-sref="signup">\n            Register\n          </a>\n        </div>\n\n      </form>\n    </div>\n  </div>\n  <hr>\n</div>\n'),n.put("app/account/settings/settings.html",'<div class="container">\n  <div class="row">\n    <div class="col-sm-12">\n      <h1>Change Password</h1>\n    </div>\n    <div class="col-sm-12">\n      <form class="form" name="form" ng-submit="vm.changePassword(form)" novalidate>\n\n        <div class="form-group">\n          <label>Current Password</label>\n\n          <input type="password" name="password" class="form-control" ng-model="vm.user.oldPassword"\n                 mongoose-error/>\n          <p class="help-block" ng-show="form.password.$error.mongoose">\n              {{ vm.errors.other }}\n          </p>\n        </div>\n\n        <div class="form-group">\n          <label>New Password</label>\n\n          <input type="password" name="newPassword" class="form-control" ng-model="vm.user.newPassword"\n                 ng-minlength="3"\n                 required/>\n          <p class="help-block"\n             ng-show="(form.newPassword.$error.minlength || form.newPassword.$error.required) && (form.newPassword.$dirty || vm.submitted)">\n            Password must be at least 3 characters.\n          </p>\n        </div>\n\n        <div class="form-group">\n          <label>Confirm New Password</label>\n\n          <input type="password" name="confirmPassword" class="form-control" ng-model="vm.user.confirmPassword"\n                 match="vm.user.newPassword"\n                 ng-minlength="3"\n                 required=""/>\n          <p class="help-block"\n             ng-show="form.confirmPassword.$error.match && vm.submitted">\n            Passwords must match.\n          </p>\n\n        </div>\n\n        <p class="help-block"> {{ vm.message }} </p>\n\n        <button class="btn btn-lg btn-primary" type="submit">Save changes</button>\n      </form>\n    </div>\n  </div>\n</div>\n'),n.put("app/account/signup/signup.html",'<div class="container">\n  <div class="row">\n    <div class="col-sm-12">\n      <h1>Sign up</h1>\n    </div>\n    <div class="col-sm-12">\n      <form class="form" name="form" ng-submit="vm.register(form)" novalidate>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.name.$valid && vm.submitted,\n                                            \'has-error\': form.name.$invalid && vm.submitted }">\n          <label>Name</label>\n\n          <input type="text" name="name" class="form-control" ng-model="vm.user.name"\n                 required/>\n          <p class="help-block" ng-show="form.name.$error.required && vm.submitted">\n            A name is required\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.email.$valid && vm.submitted,\n                                            \'has-error\': form.email.$invalid && vm.submitted }">\n          <label>Email</label>\n\n          <input type="email" name="email" class="form-control" ng-model="vm.user.email"\n                 required\n                 mongoose-error/>\n          <p class="help-block" ng-show="form.email.$error.email && vm.submitted">\n            Doesn\'t look like a valid email.\n          </p>\n          <p class="help-block" ng-show="form.email.$error.required && vm.submitted">\n            What\'s your email address?\n          </p>\n          <p class="help-block" ng-show="form.email.$error.mongoose">\n            {{ vm.errors.email }}\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.password.$valid && vm.submitted,\n                                            \'has-error\': form.password.$invalid && vm.submitted }">\n          <label>Password</label>\n\n          <input type="password" name="password" class="form-control" ng-model="vm.user.password"\n                 ng-minlength="3"\n                 required\n                 mongoose-error/>\n          <p class="help-block"\n             ng-show="(form.password.$error.minlength || form.password.$error.required) && vm.submitted">\n            Password must be at least 3 characters.\n          </p>\n          <p class="help-block" ng-show="form.password.$error.mongoose">\n            {{ vm.errors.password }}\n          </p>\n        </div>\n\n        <div class="form-group" ng-class="{ \'has-success\': form.confirmPassword.$valid && vm.submitted,\n                                            \'has-error\': form.confirmPassword.$invalid && vm.submitted }">\n          <label>Confirm Password</label>\n          <input type="password" name="confirmPassword" class="form-control" ng-model="vm.user.confirmPassword"\n                 match="vm.user.password"\n                 ng-minlength="3" required/>\n          <p class="help-block"\n             ng-show="form.confirmPassword.$error.match && vm.submitted">\n            Passwords must match.\n          </p>\n        </div>\n\n        <div>\n          <button class="btn btn-inverse btn-lg btn-register" type="submit">\n            Sign up\n          </button>\n          <a class="btn btn-default btn-lg btn-login" ui-sref="login">\n            Login\n          </a>\n        </div>\n\n      </form>\n    </div>\n  </div>\n  <hr>\n</div>\n')}]);