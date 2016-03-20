'use strict';

class MainController {
  constructor(Auth, $state) {
    this.user = {};
    this.errors = {};
    this.submitted = false;

    this.Auth = Auth;
    this.$state = $state;
  }

  login(form) {
    this.submitted = true;

    if (form.$valid) {
      this.Auth.login({
        email: this.user.email,
        password: this.user.password
      })
      .then(() => {
        // Logged in, redirect to home
        this.$state.go('home');
      })
      .catch(err => {
        this.errors.other = err.message;
      });
    }
  }
}
//
//angular.module('graphTrackApp')
//  .controller('LoginController', LoginController);

angular.module('graphTrackApp')
  .component('main', {
    templateUrl: 'app/main/main.html',
    controller: MainController,
    controllerAs: 'vm',
  });