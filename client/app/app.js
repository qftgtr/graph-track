'use strict';

angular.module('graphTrackApp', [
  'graphTrackApp.auth',
  'graphTrackApp.admin',
  'graphTrackApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'ui.router',
  'ui.bootstrap',
  'validation.match'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
  });
