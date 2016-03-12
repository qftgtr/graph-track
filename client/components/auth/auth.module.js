'use strict';

angular.module('graphTrackApp.auth', [
  'graphTrackApp.constants',
  'graphTrackApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
