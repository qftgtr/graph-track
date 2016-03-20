'use strict';

class HomeController {
  constructor($http) {
    this.$http = $http;
    this.awesomeThings = [];
  }

  $onInit() {
    this.$http.get('/api/track').then(response => {
      this.appList = response.data;
    });
  }

  addApp() {
    if (this.newThing) {
      this.$http.post('/api/track', { name: this.newThing });
      this.newThing = '';
    }
  }

  deleteApp(app) {
    this.$http.delete('/api/track/' + app._id);
  }
}

angular.module('graphTrackApp')
  .component('main2', {
    templateUrl: 'app/account/home/home.html',
    controller: HomeController
  });
//
//angular.module('graphTrackApp')
//  .controller('HomeController', HomeController);
